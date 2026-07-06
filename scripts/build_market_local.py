# -*- coding: utf-8 -*-
"""Build market_local.json for the Scripts Studio localizer.

Pulls the latest altos_market_data snapshot (LA + OC zips/cities) from the
farm-intelligence Supabase and writes a compact static JSON the frontend can
fetch. Re-run whenever fresher Altos data lands.
"""
import os, json, urllib.request, urllib.parse
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(r"C:\Users\Steve Carollo.MiniReem\Desktop\farm-intelligence\.env.local"))
URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL", "").rstrip("/")
KEY = os.environ.get("SUPABASE_SERVICE_KEY") or os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY") or ""
assert URL and KEY, "missing Supabase creds in farm-intelligence .env.local"


def rest(path, params):
    qs = "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(f"{URL}/rest/v1/{path}{qs}",
                                 headers={"apikey": KEY, "Authorization": f"Bearer {KEY}"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read().decode())


cols = ("city,zip,category,median_list_price,price_per_sqft,median_dom,"
        "price_decreased_pct,inventory,market_action_index,rental_price_median,data_date")
rows, off = [], 0
while True:
    batch = rest("altos_market_data", {"select": cols, "limit": 1000, "offset": off, "order": "city.asc"})
    rows.extend(batch)
    if len(batch) < 1000:
        break
    off += 1000


def pack(r):
    def n(v, d=0):
        return round(v, d) if isinstance(v, (int, float)) else None
    return {
        "p": n(r.get("median_list_price")),
        "sf": n(r.get("price_per_sqft")),
        "dom": n(r.get("median_dom")),
        "cut": n(r.get("price_decreased_pct"), 1),
        "inv": r.get("inventory"),
        "mai": r.get("market_action_index"),
        "rent": n(r.get("rental_price_median")),
    }


zips, cities, latest = {}, {}, ""
for r in rows:
    latest = max(latest, r.get("data_date") or "")
    if r["category"] == "ZIP" and r.get("zip") and str(r["zip"]).isdigit() and len(str(r["zip"])) == 5:
        z = str(r["zip"])
        zips[z] = dict(pack(r), c=r["city"].title())
    elif r["category"] == "CITY":
        cities[r["city"].upper()] = pack(r)

# attach zip lists to cities so a city query can show its zips
for z, d in zips.items():
    cu = d["c"].upper()
    cities.setdefault(cu, {})
    cities[cu].setdefault("zips", []).append(z)
for cu in cities:
    cities[cu].get("zips", []).sort()

out = {"updated": latest, "zips": zips, "cities": cities}
dest = Path(__file__).resolve().parent.parent / "market_local.json"
dest.write_text(json.dumps(out, separators=(",", ":")), encoding="utf-8")
print(f"wrote {dest}  zips={len(zips)} cities={len(cities)} updated={latest} size={dest.stat().st_size//1024}KB")
