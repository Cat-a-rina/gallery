# Gallery: 25 homepage explorations

A gallery site holding 25 homepage designs for the same three baking recipes: country sourdough, olive oil focaccia and chocolate chip cookies. The goal is to explore a wide range of moods, typography, layouts and content emphasis, taking cues from traditional websites and hosted web platforms. At least 20 of the 25 must be genuinely unique, so avoid generic, default-looking output.

## Constraints
- Pure HTML, CSS and some JS. No frameworks, no build step, no npm dependencies.
- Homepage only. Do not create subpages. Each design is a single standalone `index.html` page.
- Hosted in a GitHub repo and published on Vercel as a static site.

## Structure
- `index.html`, `gallery.css`, `gallery.js`: the gallery shell. It renders one tile per entry in `designs.js`.
- `designs.js`: the `DESIGNS` array, 25 entries with title, mood, type, layout, emphasis, palette and status (`planned` or `built`).
- `recipes.js`: the `RECIPES` array, the shared content every design must use. Only presentation varies between designs.
- `designs/<slug>/index.html`: one folder per built design (created as designs are built).

## Adding a design
1. Decide its direction first: mood, typography, layout and emphasis. Check it against the existing entries in `designs.js` so it differs meaningfully, not just in color or font.
2. Build it in `designs/<slug>/index.html` with its own CSS and JS inline or alongside it. Load shared content with `<script src="../../recipes.js"></script>`.
3. Update its entry in `designs.js`: set `slug`, the descriptive fields, `palette`, and `status: "built"`.

## Uniqueness
- Vary structure, not just styling: different grids, navigation, scroll behavior, hierarchy and focal points.
- Pair distinct typography with each mood. Avoid repeating font pairings across designs.
- Do not reuse a layout skeleton with a new skin.

## Conventions
- Semantic HTML, a responsive layout, and visible focus states.
- Respect `prefers-reduced-motion`.
- Keep gallery chrome neutral so it doesn't compete with the designs.
- Use relative paths so the site works on Vercel and when opened locally.
