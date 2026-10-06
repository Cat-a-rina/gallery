// One entry per design. To add a design:
//   1. build it in /designs/<slug>/index.html (a standalone homepage, no subpages)
//   2. fill in the entry below and set status to "built"
const DESIGNS = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  slug: null,          // folder name inside /designs, e.g. "butter-and-flour"
  title: "Untitled",   // working name of the design
  mood: "",            // e.g. "warm", "brutalist", "playful", "luxe"
  type: "",            // typography direction, e.g. "serif display + mono"
  layout: "",          // layout idea, e.g. "asymmetric split", "horizontal scroll"
  emphasis: "",        // what the design foregrounds: "photo", "process", "ingredients"...
  palette: ["#e8e4dc", "#c9c3b6", "#a69f90"], // swatches shown on the tile
  status: "planned",   // "planned" | "built"
}));

const BUILT = {
  1: {
    slug: "polka-pantry", title: "Polka Pantry", mood: "noir, black and white polka dot",
    type: "Abril Fatface + Josefin Sans", layout: "alternating dark and light dotted sections", emphasis: "contrast and numerals",
    palette: ["#0a0a0a", "#f7f5f0", "#8c8a85"],
  },
  2: {
    slug: "kitchen-shelf-cookbook", title: "The Kitchen Shelf Cookbook", mood: "nostalgic, homey",
    type: "IM Fell English + Caveat", layout: "open book spread with bookmark tabs", emphasis: "handwritten, tick-off ingredients",
    palette: ["#f6ecd6", "#7a2e22", "#6b4a2f"],
  },
  3: {
    slug: "noir-boulangerie", title: "Maison Noir", mood: "elegant, dark, hushed",
    type: "Cormorant Garamond + Jost", layout: "centered hero, accordion list", emphasis: "restraint and whitespace",
    palette: ["#0b0a09", "#c9a96a", "#e9e2d3"],
  },
  4: {
    slug: "chalk-menu", title: "Today's Bakes", mood: "friendly, handmade, cafe",
    type: "Caveat Brush + Patrick Hand", layout: "framed menu board, three columns", emphasis: "menu-style at-a-glance info",
    palette: ["#26332d", "#f6df8b", "#f4a6b8"],
  },
  5: {
    slug: "bake-poster", title: "BAKE.", mood: "bold, brutalist, minimal",
    type: "Archivo Black + Space Mono", layout: "rigid rows with giant numerals", emphasis: "typography and structure",
    palette: ["#f1efe8", "#ff3b1f", "#0d0d0d"],
  },
};
Object.assign(BUILT, {
  6: {
    slug: "sprinkle-sundae", title: "Sprinkle Sundae", mood: "whimsical, candy-bright",
    type: "Bagel Fat One + Quicksand", layout: "horizontal sticker-card carousel", emphasis: "playful characters",
    palette: ["#19c3c9", "#ff4f9a", "#ffd23f"],
  },
  7: {
    slug: "bubble-bakery", title: "Bubble Bakery", mood: "whimsical, soft pastel",
    type: "Sniglet + Fredoka", layout: "floating blobs that pop open", emphasis: "touch and play",
    palette: ["#c9b8ff", "#ffcfb3", "#b6f2dd"],
  },
  8: {
    slug: "recipe-box", title: "The Recipe Box", mood: "nostalgic, typewritten",
    type: "Special Elite + Homemade Apple", layout: "index cards sliding out of a tin", emphasis: "one card at a time",
    palette: ["#fbf4e2", "#d9534f", "#8a5a3c"],
  },
  9: {
    slug: "scrapbook-supper", title: "Scrapbook Supper", mood: "nostalgic, collage",
    type: "Libre Baskerville + Gaegu", layout: "overlapping clippings on gingham", emphasis: "handmade keepsake",
    palette: ["#c9a27a", "#c8342c", "#e1b84f"],
  },
  10: {
    slug: "velvet-hour", title: "Velvet Hour", mood: "luxurious, deco, dark",
    type: "Bodoni Moda + Raleway", layout: "sticky split screen, scroll-driven", emphasis: "editorial drama",
    palette: ["#1c0a14", "#e8d3a8", "#c98b7b"],
  },
  11: {
    slug: "midnight-tasting", title: "Midnight Tasting", mood: "formal, hushed, dark",
    type: "Cinzel + EB Garamond", layout: "narrow prix-fixe menu card", emphasis: "courses and pairings",
    palette: ["#07151a", "#c9d1d3", "#3ea58a"],
  },
  12: {
    slug: "kraft-market", title: "Kraft Market", mood: "artisan, farmers-market",
    type: "Permanent Marker + Kalam", layout: "hanging price tags and stuck-on labels", emphasis: "stamps and packing lists",
    palette: ["#c8a273", "#c0392b", "#4d7c3a"],
  },
  13: {
    slug: "pastry-case", title: "The Pastry Case", mood: "charming, shop-front",
    type: "Yellowtail + Josefin Sans", layout: "awning over shelves with pull-out drawers", emphasis: "browsing a display",
    palette: ["#c8553d", "#fff4e0", "#9db08a"],
  },
  14: {
    slug: "quiet-grid", title: "Quiet Grid", mood: "calm, Swiss, minimal",
    type: "Work Sans + IBM Plex Mono", layout: "asymmetric 12-col grid, sticky index", emphasis: "whitespace and precision",
    palette: ["#ffffff", "#111111", "#e10600"],
  },
  15: {
    slug: "acid-spec", title: "Acid Spec", mood: "raw, loud, technical",
    type: "Anton + JetBrains Mono", layout: "keyboard-driven spec-sheet tabs", emphasis: "data and attitude",
    palette: ["#000000", "#c6ff00", "#ffffff"],
  },
  16: {
    slug: "shape-shop", title: "Shape Shop", mood: "geometric, Bauhaus",
    type: "League Spartan + DM Sans", layout: "modular blocks with CSS-shape emblems", emphasis: "form and color",
    palette: ["#e63329", "#1f4eb4", "#f7c614"],
  },
  17: {
    slug: "disco-diner", title: "Disco Diner", mood: "retro, 1970s groovy",
    type: "Shrikhand + Karla", layout: "sunburst hero, record-sleeve cards", emphasis: "nostalgia and a palette knob",
    palette: ["#e8541c", "#f2a900", "#6b7d2a"],
  },
  18: {
    slug: "winter-hearth", title: "Winter Hearth", mood: "cozy, holiday, snowy",
    type: "Fraunces + Lato", layout: "garland timeline of ornaments and gift tags", emphasis: "seasonal occasions",
    palette: ["#0f3b2e", "#b3202f", "#d9a441"],
  },
  19: {
    slug: "still-life", title: "Still Life", mood: "quiet, warm minimalism",
    type: "Shippori Mincho + Mulish", layout: "off-center, vertical-text titles, ensō drawings", emphasis: "space and stillness",
    palette: ["#ece4d6", "#3a342c", "#c8623b"],
  },
  20: {
    slug: "the-bake-issue", title: "The Bake Issue", mood: "editorial, confident",
    type: "Playfair Display + Inter", layout: "magazine cover, then column article spreads", emphasis: "typographic hierarchy",
    palette: ["#f3efe8", "#111111", "#e4492f"],
  },
  21: {
    slug: "night-market", title: "Night Market", mood: "neon, electric, after dark",
    type: "Monoton + Space Grotesk", layout: "horizontal street of lit stalls, parallax", emphasis: "glow and atmosphere",
    palette: ["#0a0b14", "#ff2e93", "#19e6ff"],
  },
  22: {
    slug: "bake-timer", title: "Bake Timer", mood: "functional, focused, app-like",
    type: "Manrope", layout: "dashboard with progress rings and cook mode", emphasis: "working timers and scaling",
    palette: ["#f5f7fa", "#1b2430", "#2bd4a0"],
  },
  23: {
    slug: "specimen-plates", title: "Specimen Plates", mood: "scholarly, curious, naturalist",
    type: "IM Fell DW Pica + Courier Prime", layout: "annotated plates with numbered callouts", emphasis: "diagram and key",
    palette: ["#e9dfc4", "#4a3b2a", "#a8432a"],
  },
  24: {
    slug: "pow-bake", title: "Pow! Bake", mood: "loud, funny, pop-art comic",
    type: "Bangers + Comic Neue", layout: "comic panels with speech bubbles and bursts", emphasis: "one panel per step",
    palette: ["#ffe600", "#e8202a", "#00a6e0"],
  },
  25: {
    slug: "terrace-tiles", title: "Terrace Tiles", mood: "sunny, Mediterranean, relaxed",
    type: "DM Serif Display + Figtree", layout: "azulejo-framed bands with arched windows", emphasis: "warmth and openness",
    palette: ["#1d4fa3", "#f6d44c", "#d9683a"],
  },
});
DESIGNS.forEach((d) => { if (BUILT[d.id]) Object.assign(d, BUILT[d.id], { status: "built" }); });

// Tile customization: the display font each design uses (so the title previews its type)
// and the kind of layout sketch drawn on its tile (see gallery.js SKETCHES).
const TILE_LOOK = {
  1: ["Abril Fatface", "dots"],           2: ["IM Fell English", "book"],
  3: ["Cormorant Garamond", "accordion"], 4: ["Caveat Brush", "columns"],
  5: ["Archivo Black", "rows"],      6: ["Bagel Fat One", "carousel"],
  7: ["Sniglet", "bubbles"],         8: ["Special Elite", "cards"],
  9: ["Libre Baskerville", "collage"], 10: ["Bodoni Moda", "split"],
  11: ["Cinzel", "column"],          12: ["Permanent Marker", "tags"],
  13: ["Yellowtail", "shelves"],     14: ["Work Sans", "index"],
  15: ["Anton", "tabs"],             16: ["League Spartan", "shapes"],
  17: ["Shrikhand", "sunburst"],     18: ["Fraunces", "garland"],
  19: ["Shippori Mincho", "vertical"], 20: ["Playfair Display", "magazine"],
  21: ["Monoton", "street"],         22: ["Manrope", "dashboard"],
  23: ["IM Fell DW Pica", "plate"],  24: ["Bangers", "comic"],
  25: ["DM Serif Display", "tiles"],
};
DESIGNS.forEach((d) => { const l = TILE_LOOK[d.id]; if (l) { d.font = l[0]; d.kind = l[1]; } });
