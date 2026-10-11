# CalcFjord identity

A small family of everyday calculators. Use the same name, mark and layout across the sites; put the tool name below the wordmark.

## Visual rules

- Original geometric F: two horizontal ledges, an open channel and a clay datum. Use the SVG, not a letter typed in another font.
- Fjord green #183f3c for text, buttons and the result panel. Paper #f6f4ee for the page. White for editable input surfaces. Clay #a24f36 for the small accent and keyboard focus. Secondary text #4f615b; rules #c9d0c8.
- Georgia for the wordmark and headings. Arial, Helvetica and sans-serif fallbacks for forms and body text. These system fonts add no download or font-service tracking. Font appearance varies slightly by device.
- Controls have 3px corners and visible borders. The result is the strongest block. Supporting explanations sit on the page with rules, rather than inside more stock cards.
- Use tabular figures for results and breakdowns. Keep units with their figures. Minimum 44px interactive targets.
- Clear calculator titles, visible labels and short instructions. No slogans, fake testimonials, decorative emoji, glowing blobs, gradient text, glass effects or stock hero artwork.

## Assets

The build writes brand-mark.svg, favicon.svg, logo.svg and social.svg. The mark works independently of fonts. The wordmark uses system Georgia in SVG; it is not outlined. The browser header uses live text for accessibility.

## Changes

Preserve calculator IDs and logic, EN/DA copy, labelled advertisement areas and consent controls. Do not invent certifications, usage numbers or claims of human authorship. A deliberate identity is a design choice, not proof that no AI was used.

## Verification

Run npm run check and tests/browser-check.cjs with Playwright installed. Check 320, 390 and 1280px in both languages. Inspect the actual screenshots, including the mark, long labels, result units, footer and legal pages. Keep all brand assets same-origin. Check the deployed pages again after publishing.
