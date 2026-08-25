# -*- coding: utf-8 -*-
"""Build the static commercial-comps dataset for the Market panel.

Sources (both local, both APN-keyed, 99.7% join verified):
  1. 5 years of recorded LA County sales (TitlePro/Fidelity, deduped):
     Downloads/south-bay-turnover-hub/sales_history_clean.parquet
     -> 362,116 sales, 2021-05-05 .. 2026-04-22, ~29k of them commercial.
  2. The LA Regrid parquet (2.4M parcels, assessor attributes):
     building SF, lot SF, units, year built, use code, site city -
     plus last-sale rows AFTER the history window, which extend freshness.
  3. Optional --gap: a TitlePro export of sales recorded after the history
     window (first drop: commercial-bucket sales 2026-04-23 .. 2026-08-14).
     The gap file and the Regrid tail overlap on purpose; dedupe on
     (APN, date) AFTER date normalisation keeps one copy of each deed.

The site is static and the Render backend sleeps, so nothing is served live:
this precomputes per-city JSON (comps + medians by type and year) that the
Market panel fetches like market_local.json. Re-run whenever either source
refreshes; freshness is stamped into the index so the UI can display it.

    python scripts/build_commercial_comps.py          # build comps/cc/*.json
    python scripts/build_commercial_comps.py --stats  # QC report only
"""
import argparse
import json
import re
import sys
from datetime import date
from pathlib import Path

import duckdb

REPO = Path(__file__).resolve().parent.parent
OUT_DIR = REPO / "comps" / "cc"
INDEX = REPO / "comps" / "cc_index.json"
HIST = r"C:\Users\Steve Carollo.MiniReem\Downloads\south-bay-turnover-hub\sales_history_clean.parquet"
REGRID = r"C:\Users\Steve Carollo.MiniReem\Desktop\mutual\regrid_la_parcels\ca_los_angeles.parquet"

# ---- taxonomy: assessor language -> what a commercial broker calls it ----
# Regrid usedesc is canonical (it is the parcel's CURRENT assessor use);
# the sales file's land_use is the fallback for the 0.3% that do not join.
TYPES = ["Multifamily 5+", "Retail", "Office", "Industrial", "Mixed-Use",
         "Hospitality", "Auto & Service", "Commercial Land", "Other Commercial"]

USEDESC_MAP = [
    ("Residential - Five or more apartments", "Multifamily 5+"),
    ("Commercial - Store Combination", "Mixed-Use"),          # store + residence
    ("Commercial - Department Stores", "Retail"),
    ("Commercial - Supermarkets", "Retail"),
    ("Commercial - Shopping Centers", "Retail"),
    ("Commercial - Stores", "Retail"),
    ("Commercial - Office Buildings", "Office"),
    ("Commercial - Professional Buildings", "Office"),
    ("Commercial - Banks Savings & Loan", "Office"),
    ("Commercial - Hotel & Motels", "Hospitality"),
    ("Commercial - Service Stations", "Auto & Service"),
    ("Commercial - Srvc Shps", "Auto & Service"),
    ("Commercial - Auto, Recreation EQPT", "Auto & Service"),
    ("Commercial - Animal Kennels", "Other Commercial"),
    ("Commercial - Nurseries", "Other Commercial"),
    ("Commercial - Wholesale & Manufacturing", "Other Commercial"),
    ("Industrial - ", "Industrial"),
    ("Commercial - ", "Other Commercial"),                    # generic catch-all LAST
]

LANDUSE_MAP = [
    ("Apartment house (5+ units)", "Multifamily 5+"),
    ("Retail Stores", "Retail"),
    ("Store/Office (mixed use)", "Mixed-Use"),
    ("Commercial/Office/Residential (mixed use)", "Mixed-Use"),
    ("Office Bldg", "Office"),
    ("Manufacturing", "Industrial"),
    ("Warehouse", "Industrial"),
    ("Industrial - Vacant Land", "Commercial Land"),
    ("Commercial - Vacant Land", "Commercial Land"),
    ("Restaurant", "Retail"),
    ("Auto repair", "Auto & Service"),
    ("Parking Lot", "Commercial Land"),
    ("Hotel", "Hospitality"),
    ("Motel", "Hospitality"),
]

# arm's-length + sanity rails: recorded intra-family transfers ($0/$1) and
# per-SF absurdities must never reach a broker's medians
MIN_PRICE = 50_000
PSF_LO, PSF_HI = 30, 3_000        # $/SF building
PPU_LO, PPU_HI = 25_000, 2_000_000  # $/unit, multifamily


def classify(usedesc, land_use):
    for prefix, t in USEDESC_MAP:
        if usedesc and usedesc.startswith(prefix):
            return t
    for frag, t in LANDUSE_MAP:
        if land_use and frag in land_use:
            return t
    return None


def slugify(city):
    return re.sub(r"[^a-z0-9]+", "-", city.lower()).strip("-")


def load(con):
    """One row per (APN, sale date): the 5-year history, extended by Regrid
    last-sales recorded after the history window closed."""
    return con.execute(f"""
      WITH r AS (
        SELECT lpad(CAST(CAST(parcelnumb_no_formatting AS BIGINT) AS VARCHAR),10,'0') ap,
               parcelnumb, usedesc, scity, szip5, address,
               TRY_CAST(area_building AS DOUBLE)  bldg_sf,
               TRY_CAST(recrdareano AS DOUBLE)    rec_sf,
               TRY_CAST(ll_gissqft AS DOUBLE)     lot_sf,
               TRY_CAST(numunits AS DOUBLE)       units,
               TRY_CAST(yearbuilt AS INTEGER)     yb,
               TRY_CAST(saledate AS DATE)         r_sd,
               TRY_CAST(saleprice AS DOUBLE)      r_price
        FROM read_parquet('{REGRID}')
        WHERE parcelnumb_no_formatting IS NOT NULL
      ),
      h AS (
        SELECT substr(regexp_replace(CAST(apn AS VARCHAR),'[^0-9]','','g'),1,10) ap,
               sd, TRY_CAST(sale_price AS DOUBLE) price, land_use,
               street h_addr, city h_city, CAST(zip AS VARCHAR) h_zip
        FROM read_parquet('{HIST}')
        WHERE sale_price IS NOT NULL AND TRY_CAST(sale_price AS DOUBLE) >= {MIN_PRICE}
      ),
      hist AS (        -- the 5-year record, with parcel attributes attached
        SELECT h.ap, h.sd, h.price, h.land_use, h.h_addr, h.h_city, h.h_zip,
               r.parcelnumb, r.usedesc, r.scity, r.szip5, r.address,
               r.bldg_sf, r.rec_sf, r.lot_sf, r.units, r.yb
        FROM h LEFT JOIN r USING (ap)
      ),
      tail AS (        -- Regrid last-sales AFTER the history window: fresher
        SELECT ap, r_sd sd, r_price price, CAST(NULL AS VARCHAR) land_use,
               CAST(NULL AS VARCHAR) h_addr, CAST(NULL AS VARCHAR) h_city,
               CAST(NULL AS VARCHAR) h_zip,
               parcelnumb, usedesc, scity, szip5, address,
               bldg_sf, rec_sf, lot_sf, units, yb
        FROM r
        WHERE r_sd > (SELECT max(sd) FROM h) AND r_price >= {MIN_PRICE}
      )
      SELECT * FROM hist UNION ALL SELECT * FROM tail
    """).fetchdf()


def load_gap(con, path):
    """A TitlePro gap drop (CSV or XLSX) closing the window after the 5-year
    history ends: needs APN, a sale/recording date, a price; land use and
    address/city/zip help but the Regrid join fills most of it. Column names
    are matched loosely because every TitlePro export names them differently."""
    import pandas as pd
    raw = pd.read_excel(path) if str(path).lower().endswith((".xlsx", ".xls")) else pd.read_csv(path)
    cols = {c.lower().strip(): c for c in raw.columns}

    def pick(*frags):
        for f in frags:
            for lc, c in cols.items():
                if f in lc:
                    return c
        return None

    c_apn = pick("apn", "parcel")
    c_dt = pick("recording date", "sale date", "saledate", "date")
    c_pr = pick("sale price", "price", "amount")
    c_lu = pick("land use", "use")
    c_st = pick("street", "address", "situs")
    c_ct = pick("city")
    c_zp = pick("zip")
    if not (c_apn and c_dt and c_pr):
        raise SystemExit(f"gap file must carry APN, date and price - found: {list(raw.columns)}")
    out = pd.DataFrame({
        "ap": raw[c_apn].astype(str).str.replace(r"[^0-9]", "", regex=True).str[:10],
        "sd": pd.to_datetime(raw[c_dt], errors="coerce").dt.date,
        "price": pd.to_numeric(raw[c_pr], errors="coerce"),
        # .astype(str) turns a missing cell into the literal string "nan",
        # which then title-cases into an address of "Nan" - keep NaN as NaN
        "land_use": raw[c_lu].where(raw[c_lu].notna(), None).astype(object) if c_lu else None,
        "h_addr": raw[c_st].where(raw[c_st].notna(), None).astype(object) if c_st else None,
        "h_city": raw[c_ct].where(raw[c_ct].notna(), None).astype(object) if c_ct else None,
        "h_zip": raw[c_zp].where(raw[c_zp].notna(), None).astype(object) if c_zp else None,
    })
    out = out[(out["price"] >= MIN_PRICE) & out["sd"].notna() & (out["ap"].str.len() == 10)]
    print(f"gap file: {len(out):,} usable sales, "
          f"{out['sd'].min()} .. {out['sd'].max()}")
    # attach Regrid attributes exactly like the history rows get
    con.register("gap", out)
    return con.execute(f"""
      WITH r AS (
        SELECT lpad(CAST(CAST(parcelnumb_no_formatting AS BIGINT) AS VARCHAR),10,'0') ap,
               parcelnumb, usedesc, scity, szip5, address,
               TRY_CAST(area_building AS DOUBLE)  bldg_sf,
               TRY_CAST(recrdareano AS DOUBLE)    rec_sf,
               TRY_CAST(ll_gissqft AS DOUBLE)     lot_sf,
               TRY_CAST(numunits AS DOUBLE)       units,
               TRY_CAST(yearbuilt AS INTEGER)     yb
        FROM read_parquet('{REGRID}') WHERE parcelnumb_no_formatting IS NOT NULL)
      SELECT g.ap, CAST(g.sd AS VARCHAR) sd, g.price, g.land_use, g.h_addr, g.h_city, g.h_zip,
             r.parcelnumb, r.usedesc, r.scity, r.szip5, r.address,
             r.bldg_sf, r.rec_sf, r.lot_sf, r.units, r.yb
      FROM gap g LEFT JOIN r USING (ap)
    """).fetchdf()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--stats", action="store_true")
    ap.add_argument("--gap", help="TitlePro CSV/XLSX of sales after the history window")
    args = ap.parse_args()

    con = duckdb.connect()
    df = load(con)
    if args.gap:
        import pandas as pd
        g = load_gap(con, args.gap)
        g["sd"] = g["sd"].astype(str)
        df = pd.concat([df, g], ignore_index=True)
    print(f"loaded {len(df):,} priced sales (>= ${MIN_PRICE:,})")

    df["type"] = [classify(u, l) for u, l in zip(df["usedesc"], df["land_use"])]
    df = df[df["type"].notna()].copy()
    # normalise the date BEFORE deduping: the history rows carry Timestamps and
    # the gap rows carry strings, and Timestamp('2026-07-06') != '2026-07-06' -
    # the same deed from both sources would otherwise survive as two comps
    df["sd"] = df["sd"].astype(str).str[:10]
    df = df.drop_duplicates(subset=["ap", "sd"], keep="first")
    print(f"commercial universe: {len(df):,} sales")

    # building SF: assessor area first, recorded-area fallback
    df["sf"] = df["bldg_sf"].where(df["bldg_sf"] > 0, df["rec_sf"])
    df["city"] = df["scity"].fillna(df["h_city"]).fillna("").str.strip().str.title()
    df["city"] = df["city"].str.replace(r"La County", "LA County", regex=True)
    df.loc[df["city"] == "", "city"] = "Unincorporated LA County"
    df["addr"] = (df["address"].fillna(df["h_addr"]).fillna("").str.strip().str.title()
                  # .title() capitalises street ordinals ("227Th St") - undo it
                  .str.replace(r"(\d)(St|Nd|Rd|Th)\b", lambda m: m.group(1)+m.group(2).lower(), regex=True))
    df["zip"] = df["szip5"].fillna(df["h_zip"]).fillna("")
    df["yr"] = df["sd"].str[:4].astype(int)

    # derived metrics, rails applied at computation - a wild number is shown as
    # a sale but never pollutes a median
    import numpy as np
    sf = df["sf"].to_numpy(dtype=float)
    price = df["price"].to_numpy(dtype=float)
    units = df["units"].to_numpy(dtype=float)
    with np.errstate(divide="ignore", invalid="ignore"):
        psf = np.where(sf >= 300, price / sf, np.nan)
        ppu = np.where(units >= 5, price / units, np.nan)
    df["psf"] = np.where((psf >= PSF_LO) & (psf <= PSF_HI), psf, np.nan)
    df["ppu"] = np.where((ppu >= PPU_LO) & (ppu <= PPU_HI), ppu, np.nan)
    # land trades on lot SF, not building SF - $5..$2000/lot-SF rails
    lot = df["lot_sf"].to_numpy(dtype=float)
    with np.errstate(divide="ignore", invalid="ignore"):
        plsf = np.where(lot >= 1000, price / lot, np.nan)
    df["plsf"] = np.where((plsf >= 5) & (plsf <= 2000), plsf, np.nan)

    latest = df["sd"].max()
    earliest = df["sd"].min()
    print(f"coverage {earliest} .. {latest}")

    if args.stats:
        rep = df.groupby("type").agg(n=("price", "size"), med_psf=("psf", "median"),
                                     med_price=("price", "median"))
        print(rep.round(0).to_string())
        print(df.groupby("yr")["price"].count().to_string())
        return

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    tidx = {t: i for i, t in enumerate(TYPES)}

    def stats_for(g):
        out = {}
        for t, gg in g.groupby("type"):
            by_year = {}
            for yr, gy in gg.groupby("yr"):
                by_year[str(yr)] = {
                    "n": int(len(gy)),
                    "medPsf": round(float(gy["psf"].median()), 0) if gy["psf"].notna().sum() >= 3 else None,
                    "medPrice": round(float(gy["price"].median()), 0),
                }
            out[t] = {
                "n": int(len(gg)),
                "medPsf": round(float(gg["psf"].median()), 0) if gg["psf"].notna().sum() >= 3 else None,
                "medPpu": round(float(gg["ppu"].median()), 0) if gg["ppu"].notna().sum() >= 3 else None,
                "medPlsf": round(float(gg["plsf"].median()), 0) if t == "Commercial Land" and gg["plsf"].notna().sum() >= 3 else None,
                "medPrice": round(float(gg["price"].median()), 0),
                "byYear": by_year,
            }
        return out

    cities = []
    for city, g in df.groupby("city"):
        slug = slugify(city)
        if not slug:
            continue
        g = g.sort_values("sd", ascending=False)
        # pandas NA is not truthy - flatten to plain floats before serialising
        gv = g.assign(sf_=g["sf"].astype(float).fillna(0),
                      lot_=g["lot_sf"].astype(float).fillna(0),
                      units_=g["units"].astype(float).fillna(0),
                      yb_=g["yb"].astype(float).fillna(0),
                      pn_=g["parcelnumb"].fillna(""))
        comps = [[r.sd, int(r.price),
                  int(r.sf_) if r.sf_ > 0 else 0,
                  int(r.lot_) if r.lot_ > 0 else 0,
                  int(r.units_) if r.units_ > 0 else 0,
                  int(r.yb_) if r.yb_ > 1800 else 0,
                  tidx[r.type], r.addr, str(r.zip), str(r.pn_)]
                 for r in gv.itertuples()]
        (OUT_DIR / f"{slug}.json").write_text(json.dumps({
            "city": city, "types": TYPES,
            "cols": ["date", "price", "bldgSF", "lotSF", "units", "yearBuilt",
                     "typeIdx", "address", "zip", "apn"],
            "stats": stats_for(g), "comps": comps,
        }, separators=(",", ":")), encoding="utf-8")
        cities.append({"name": city, "slug": slug, "n": int(len(g)),
                       "types": {t: int(n) for t, n in g["type"].value_counts().items()}})

    cities.sort(key=lambda c: -c["n"])
    INDEX.write_text(json.dumps({
        "built": date.today().isoformat(),
        "coverage": {"from": earliest, "to": latest},
        "county": "Los Angeles",
        "types": TYPES,
        "countyStats": stats_for(df),
        "cities": cities,
    }, separators=(",", ":")), encoding="utf-8")

    total_kb = sum(f.stat().st_size for f in OUT_DIR.glob("*.json")) // 1024
    print(f"wrote {len(cities)} city files ({total_kb:,} KB) + cc_index.json")


if __name__ == "__main__":
    main()
