# Live market data — fetch it, don't guess it

The platform's commercial dataset is served as public JSON on the live site. When the
user asks for actual comps, values, or cap rates for an LA County commercial property,
FETCH these instead of answering from memory. All URLs are under
`https://roundtablehq.vercel.app`. City slugs are lowercase-hyphenated ("El Segundo" →
`el-segundo`).

## Endpoints

| URL | What it holds |
|---|---|
| `/comps/cc_index.json` | Master index: `coverage` (from/to dates), `types` (the 9 property-type names, index order matters), `countyStats` (per-type county medians: n, medPsf, medPpu, medPrice), `cities` [{name, slug, n}], `zips` {zip: [{slug}]} |
| `/comps/cc/<slug>.json` | One city's recorded sales: `{city, types, stats, comps}` — every commercial deed 2021→present for that city |
| `/comps/ccp/<slug>.json` | That city's full assessor parcel roll: `{city, types, parcels}` — EVERY commercial parcel, sold or not (203k countywide), for resolving an address to its type/size/units/year |
| `/comps/cc_bench.json` | Quarterly cap-rate benchmarks: metro averages by type, class deltas, published multifamily submarket ranges by city (see "Cap rates" below) |
| `/market_local.json` | RESIDENTIAL weekly market stats (Altos Research) for 426 LA/Orange County ZIPs and 189 cities: `{updated, zips: {zip: {...}}, cities: {name: {...}}}` |

**Residential stat object** (market_local.json, per ZIP or city):
`p` = median list price · `sf` = list $/SF · `dom` = median days on market ·
`cut` = % of listings with a price decrease · `inv` = inventory count ·
`mai` = Altos Market Action Index (30+ = seller's market, below = buyer's) ·
`rent` = median rental price · `c` = city name (on ZIP entries).
Use for residential scripts and market talk — quote `updated` for freshness. The
commercial endpoints above are the source for anything commercial.

## Row schemas (arrays, position matters)

**Comp row** (`comps` in cc/<slug>.json), 13 elements:
`[date "YYYY-MM-DD", price, bldgSF, lotSF, units, yearBuilt, typeIdx, address, zip, apn, lat, lon, flags]`
- `typeIdx` indexes into the file's `types` array.
- `flags` is a string: `P` = portfolio/allocated sale (same date+price across parcels — the price is an allocation, not a market print), `D` = distressed (REO/auction), `F` = flip (same APN resold ≤18 months). **Exclude P and D rows from any median or average; mention F.** This mirrors institutional comps methodology.

**Parcel-roll row** (`parcels` in ccp/<slug>.json), 9 elements:
`[address, typeIdx, bldgSF, units, yearBuilt, lat, lon, zip, apn]`
- Use when the user names an address that has no recorded sale: match house number + street, then report its assessor profile and pull nearest comps of its type.

## Math rules (match the site exactly)

- A median needs **n ≥ 3** clean rows; below that, list the individual sales instead.
- $/SF only when bldgSF > 0; $/unit only for Multifamily 5+ with units > 0.
- Sanity rails: $/SF must land in 30–3000, $/unit in 25k–2M — outside that, the deed is
  a non-arm's-length transfer; drop it.
- Distance: haversine from subject lat/lon; nearest-first is the default ordering when
  an address anchors the analysis. Report distances in miles, one decimal.

## Cap rates (cc_bench.json)

Resolution order for a given type + city + class (A/B/C, estimated from year built:
2000+ = A, 1975–99 = B, older = C, and say it's an age-based estimate):
1. **Published city row** — `mfCities[city]` (multifamily only): use that range, shifted
   by the class delta `types[t].cls[class]`.
2. **Pricing-adjusted estimate** — `est = (avg + clsDelta) × sqrt(countyMetric / cityMetric)`
   where the metric is medPpu for multifamily, medPsf otherwise (city metric from the
   city file's stats or computed from its clean comps, n ≥ 5; county metric from
   `countyStats`). **Clamp the shift to ±0.75.** Label it "estimated from local pricing."
3. **Metro benchmark** as-is.
- **Office**: never one blended number. `types.Office.classOnly` gives per-class ranges;
  if no class is known, ask, and say LA office is bifurcated by leasing health.
- Value math: value = NOI / cap; implied NOI = price × cap. Always name which cap you
  used and its tier (published / estimated / metro).
- Always close numeric work with: these are survey benchmarks and recorded-sale
  medians — **a guide, not an appraisal**.

## Honesty rules

- Quote the dataset's own coverage dates from cc_index.json; never imply fresher data.
- If a city or address isn't in the files, say so — do not substitute a guess silently.
- Never present the pricing-adjusted cap estimate as a published figure.
