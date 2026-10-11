# Danish net salary calculator

Static English/Danish monthly cash-salary estimate for tax year 2026. Uses the visitor's current tax-card withholding rate and monthly allowance. This does not calculate the annual tax card or municipal/church tax bands. No tracking, uploads or paid services.

## Run
Node 20+. `npm run check` runs unit tests then writes `dist/`. Set `SITE_URL` to the actual HTTPS origin before building. Publish `dist/` to Cloudflare Pages as static assets, with no Functions. CI uses only `[self-hosted, Linux, X64]`.

## Grounding
- https://skat.dk/borger/am-bidrag
- https://skat.dk/erhverv/ansatte-og-loen/indberet-loen-eindkomst/skat-af-ansattes-loen
- https://skat.dk/borger/hovedkort-bikort-og-frikort
- https://skat.dk/borger/forskudsopgoerelse/regn-ud-hvad-du-faar-udbetalt

Official live comparator checked 11 October 2026: synthetic salary 30000, rate 38%, monthly deduction 5000, hovedkort. Skat returned net 19012, AM 2400, A-skat 8588, matching our test. This is an interactive comparator, not an officially published worked example. Youth, pension/ATP, invalid input and bikort cases also have tests. Payroll rounding can differ.

## Ads and contact
Empty labeled ad space only. A real consent manager and an updated legal notice must precede any optional third-party script. No program enrollment or revenue promise. No public operator contact identity was supplied; do not invent one or publish a private email.
