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
