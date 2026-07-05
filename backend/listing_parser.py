"""
Listing parser - paste a Zillow / Redfin / Realtor.com / MLS-style link,
get back photos + property facts for the Flyer Studio.

Ported from the FlipAI Flyer Studio netlify/functions/parse-zillow.ts
(multi-source fallback chain), free-tier strategies only:

  1. Pasted URL is Redfin/Realtor/Compass -> fetch it directly
  2. Zillow URL -> slug parse -> Realtor constructed URL (no search needed)
  3. Zillow URL -> DuckDuckGo -> Redfin / Compass listing page
  4. Any other URL -> generic extraction (JSON-LD / __NEXT_DATA__ / og: tags)
  5. Slug-only skeleton -> frontend prompts manual photo upload

Every strategy returns a dict with photos[] or None. First success wins.
"""
import json
import re
from urllib.parse import quote, unquote

import requests

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36")
TIMEOUT = 9

STREET_SUFFIXES = {
    "St", "Street", "Ave", "Avenue", "Rd", "Road", "Dr", "Drive", "Blvd", "Boulevard",
    "Way", "Ln", "Lane", "Ct", "Court", "Pl", "Place", "Cir", "Circle",
    "Pkwy", "Parkway", "Hwy", "Highway", "Ter", "Terrace", "Trl", "Trail",
    "Sq", "Square", "Loop", "Run", "Walk", "Row", "Crossing", "Path",
}


def fetch_html(url):
    r = requests.get(url, headers={"User-Agent": UA, "Accept-Language": "en-US,en;q=0.9"},
                     timeout=TIMEOUT, allow_redirects=True)
    if r.status_code != 200:
        raise RuntimeError(f"HTTP {r.status_code}")
    text = r.text
    if len(text) < 5000 and re.search(r"captcha|verification|press.{0,20}hold|access.{0,20}denied", text, re.I):
        raise RuntimeError("anti-bot challenge served")
    return text


# ---------------------------------------------------------------- slug parse
def parse_zillow_slug(url):
    m = re.search(r"zillow\.com/homedetails/([^/]+)/(\d+)_zpid", url, re.I)
    if not m:
        return None
    slug, zpid = m.group(1), m.group(2)
    t = re.match(r"^(.+?)-([A-Za-z]{2})-(\d{5})$", slug)
    if not t:
        return None
    address_city, state, zipc = t.group(1), t.group(2).upper(), t.group(3)
    tokens = address_city.split("-")
    city_start = len(tokens) - 2
    for i in range(1, len(tokens) - 1):
        if re.match(r"^[A-Z][a-z]+$", tokens[i]) and not re.match(r"^\d", tokens[i - 1]):
            if tokens[i] in STREET_SUFFIXES:
                continue
            city_start = min(city_start, i)
    # If the city boundary landed ON a street suffix ("...Island | Ave Carson"),
    # the suffix belongs to the ADDRESS - push the boundary right.
    while city_start < len(tokens) - 1 and tokens[city_start] in STREET_SUFFIXES:
        city_start += 1
    city = " ".join(tokens[city_start:])
    address = " ".join(tokens[:city_start])
    if not re.match(r"^\d", address):
        city = " ".join(tokens[-2:])
        address = " ".join(tokens[:-2])
    return {"address": address.strip(), "city": city.strip(), "state": state, "zip": zipc, "zpid": zpid}


# ---------------------------------------------------------------- DDG search
def ddg_find_url(slug, site_host):
    query = f"site:{site_host} {slug['address']} {slug['city']} {slug['state']} {slug['zip']}"
    html = None
    for host in ("html.duckduckgo.com/html/", "lite.duckduckgo.com/lite/"):
        try:
            r = requests.get(f"https://{host}?q={quote(query)}",
                             headers={"User-Agent": UA}, timeout=TIMEOUT)
            if r.status_code == 200 and "at DuckDuckGo" in r.text:
                html = r.text
                break
        except Exception:
            continue
    if not html:
        return None
    redirect = [unquote(m.group(1)) for m in re.finditer(r"/l/\?uddg=([^\"&]+)", html)]
    escaped = site_host.replace(".", r"\.")
    direct = re.findall(rf"https?://(?:www\.)?{escaped}/[^\"' >]+", html)
    candidates = []
    for u in redirect + direct:
        if site_host in u and u.startswith("http"):
            candidates.append(u.split("&rut=")[0])
    if not candidates:
        return None
    for u in candidates:
        if slug["zip"] in u:
            return u
    return candidates[0]


# ---------------------------------------------------------------- extractors
def _jsonld_blocks(html):
    out = []
    for m in re.finditer(r'<script[^>]*type="application/ld\+json"[^>]*>([\s\S]*?)</script>', html):
        try:
            b = json.loads(m.group(1))
            out.extend(b if isinstance(b, list) else [b])
        except Exception:
            pass
    return out


def extract_redfin(html, url, slug):
    blocks = _jsonld_blocks(html)
    listing = None
    for b in blocks:
        t = b.get("@type")
        if (isinstance(t, list) and "RealEstateListing" in t) or t == "RealEstateListing":
            listing = b
            break
    photos = []
    if listing:
        main = listing.get("mainEntity", {}) or {}
        for img in (main.get("image") or []):
            u = img if isinstance(img, str) else (img or {}).get("url")
            if u:
                photos.append(u)
    if not photos:
        photos = list(dict.fromkeys(re.findall(
            r"https://ssl\.cdn-redfin\.com/photo/\d+/[a-z]+/\d+/[\d-]+_\d+(?:_\d+)?\.jpg", html)))
    if not photos:
        return None
    main = (listing or {}).get("mainEntity", {}) or {}
    offer = (listing or {}).get("offers", {}) or {}
    addr = main.get("address", {}) or {}
    sqft = ((main.get("floorSize") or {}).get("value"))
    try:
        price = int(float(offer.get("price") or 0))
    except Exception:
        price = 0
    return {
        "source": "redfin", "sourceUrl": url,
        "address": addr.get("streetAddress") or slug.get("address", ""),
        "city": addr.get("addressLocality") or slug.get("city", ""),
        "state": addr.get("addressRegion") or slug.get("state", ""),
        "zip": addr.get("postalCode") or slug.get("zip", ""),
        "beds": main.get("numberOfBedrooms") or "",
        "baths": main.get("numberOfBathroomsTotal") or "",
        "sqft": sqft or "",
        "yearBuilt": main.get("yearBuilt"),
        "listPrice": price,
        "description": (listing or {}).get("description", ""),
        "photos": photos[:24],
    }


def _find_first_with(obj, key, depth=0):
    if depth > 8:
        return None
    if isinstance(obj, dict):
        if key in obj and obj[key]:
            return obj
        for v in obj.values():
            r = _find_first_with(v, key, depth + 1)
            if r is not None:
                return r
    elif isinstance(obj, list):
        for v in obj[:40]:
            r = _find_first_with(v, key, depth + 1)
            if r is not None:
                return r
    return None


def extract_realtor(html, url, slug):
    m = re.search(r'<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)</script>', html)
    prop = None
    if m:
        try:
            data = json.loads(m.group(1))
            holder = _find_first_with(data, "property") or _find_first_with(data, "listing")
            prop = (holder or {}).get("property") or (holder or {}).get("listing")
            if prop is None:
                prop = _find_first_with(data, "photos")
        except Exception:
            prop = None
    photos = []
    if prop:
        for p in (prop.get("photos") or prop.get("media") or []):
            u = (p or {}).get("href") or (p or {}).get("url") or (p or {}).get("original_url")
            if isinstance(u, str):
                photos.append(u)
    if not photos:
        photos = list(dict.fromkeys(re.findall(r'https?://[^"]*rdcpix\.com/[^"]+\.jpg', html)))
    if not photos:
        return None
    prop = prop or {}
    desc = prop.get("description") if isinstance(prop.get("description"), dict) else {}
    description = prop.get("description") if isinstance(prop.get("description"), str) else (desc.get("text") or "")
    loc = ((prop.get("location") or {}).get("address") or {})
    return {
        "source": "realtor", "sourceUrl": url,
        "address": loc.get("line") or slug.get("address", ""),
        "city": loc.get("city") or slug.get("city", ""),
        "state": loc.get("state_code") or slug.get("state", ""),
        "zip": loc.get("postal_code") or slug.get("zip", ""),
        "beds": desc.get("beds") or prop.get("beds") or "",
        "baths": desc.get("baths_total") or desc.get("baths") or prop.get("baths") or "",
        "sqft": desc.get("sqft") or prop.get("sqft") or "",
        "yearBuilt": desc.get("year_built") or prop.get("year_built"),
        "listPrice": prop.get("list_price") or prop.get("price") or 0,
        "description": description or "",
        "photos": photos[:24],
    }


def extract_generic(html, url, slug):
    """Best-effort for MLS portals / IDX pages / anything else:
    JSON-LD -> og:image -> big JPG harvest."""
    blocks = _jsonld_blocks(html)
    photos, description, price, beds, baths, sqft, addr_line, city = [], "", 0, "", "", "", "", ""
    for b in blocks:
        t = b.get("@type")
        tset = set(t) if isinstance(t, list) else {t}
        if tset & {"RealEstateListing", "SingleFamilyResidence", "House", "Product", "Residence", "Apartment", "Offer"}:
            main = b.get("mainEntity", b)
            imgs = main.get("image") or b.get("image") or []
            if isinstance(imgs, str):
                imgs = [imgs]
            for img in imgs:
                u = img if isinstance(img, str) else (img or {}).get("url")
                if u:
                    photos.append(u)
            description = description or b.get("description", "") or main.get("description", "")
            offer = b.get("offers", {}) or {}
            try:
                price = price or int(float(offer.get("price") or 0))
            except Exception:
                pass
            a = (main.get("address") or b.get("address") or {})
            if isinstance(a, dict):
                addr_line = addr_line or a.get("streetAddress", "")
                city = city or a.get("addressLocality", "")
            beds = beds or main.get("numberOfBedrooms", "")
            baths = baths or main.get("numberOfBathroomsTotal", "")
            sqft = sqft or ((main.get("floorSize") or {}).get("value") if isinstance(main.get("floorSize"), dict) else "")
    if not photos:
        photos = re.findall(r'<meta[^>]+property="og:image"[^>]+content="([^"]+)"', html)
        photos += re.findall(r'<meta[^>]+content="([^"]+)"[^>]+property="og:image"', html)
    if not photos:
        jpgs = re.findall(r'https?://[^"\' >]+\.(?:jpg|jpeg|webp)[^"\' >]*', html)
        seen = []
        for j in jpgs:
            if not re.search(r"logo|icon|avatar|sprite|badge|agent|headshot", j, re.I) and j not in seen:
                seen.append(j)
        photos = seen[:12]
    if not photos:
        return None
    if not description:
        dm = re.search(r'<meta[^>]+name="description"[^>]+content="([^"]+)"', html)
        description = dm.group(1) if dm else ""
    return {
        "source": "generic", "sourceUrl": url,
        "address": addr_line or slug.get("address", ""),
        "city": city or slug.get("city", ""),
        "state": slug.get("state", ""), "zip": slug.get("zip", ""),
        "beds": beds, "baths": baths, "sqft": sqft,
        "listPrice": price, "description": description[:1200],
        "photos": list(dict.fromkeys(photos))[:24],
    }


# ---------------------------------------------------------------- chain
def parse_listing(url):
    url = (url or "").strip()
    attempts = []
    slug = parse_zillow_slug(url) or {}

    def attempt(name, fn):
        try:
            r = fn()
            if r and r.get("photos"):
                attempts.append({"strategy": name, "outcome": f"success ({len(r['photos'])} photos)"})
                r["_source"] = name
                r["_attempts"] = attempts
                return r
            attempts.append({"strategy": name, "outcome": "no photos"})
        except Exception as e:
            attempts.append({"strategy": name, "outcome": f"error: {str(e)[:90]}"})
        return None

    # 1) Direct: user pasted the target site itself
    if "redfin.com" in url:
        r = attempt("redfin-direct", lambda: extract_redfin(fetch_html(url), url, slug))
        if r:
            return r
    if "realtor.com" in url:
        r = attempt("realtor-direct", lambda: extract_realtor(fetch_html(url), url, slug))
        if r:
            return r

    # 2) Zillow URL -> constructed Realtor URL (no search step needed)
    if slug:
        street = slug["address"].replace(" ", "-")
        city = slug["city"].replace(" ", "-")
        rurl = f"https://www.realtor.com/realestateandhomes-detail/{street}_{city}_{slug['state']}_{slug['zip']}"
        r = attempt("realtor-constructed", lambda: extract_realtor(fetch_html(rurl), rurl, slug))
        if r:
            return r

        # 3) DDG -> Redfin
        def _redfin_via_ddg():
            u = ddg_find_url(slug, "redfin.com")
            if not u or not re.search(r"redfin\.com/[A-Z]{2}/[\w-]+/[\w-]+/home/\d+", u, re.I):
                return None
            return extract_redfin(fetch_html(u), u, slug)
        r = attempt("redfin-ddg", _redfin_via_ddg)
        if r:
            return r

        # 3b) DDG -> generic on whatever site surfaced (compass etc.)
        def _compass_via_ddg():
            u = ddg_find_url(slug, "compass.com")
            if not u or "/listing/" not in u:
                return None
            return extract_generic(fetch_html(u), u, slug)
        r = attempt("compass-ddg", _compass_via_ddg)
        if r:
            return r

    # 4) Generic extraction of whatever URL was pasted (MLS portals, IDX sites)
    if url.startswith("http") and "zillow.com" not in url:
        r = attempt("generic", lambda: extract_generic(fetch_html(url), url, slug))
        if r:
            return r

    # 5) Skeleton
    return {
        "source": "slug-only", "sourceUrl": url,
        "address": slug.get("address", ""), "city": slug.get("city", ""),
        "state": slug.get("state", ""), "zip": slug.get("zip", ""),
        "beds": "", "baths": "", "sqft": "", "listPrice": 0,
        "description": "", "photos": [],
        "incomplete": True, "_source": "slug-only", "_attempts": attempts,
        "note": "Photo sources unavailable from the server - details filled where possible; add photos manually.",
    }
