const grid = document.getElementById("grid");
const pad = (n) => String(n).padStart(2, "0");

// Tiny layout sketches (viewBox 200x90), one per design "kind".
// a = background, b = main shapes, c = accent. Each mirrors the real page's structure.
const SKETCHES = {
  dots: (b, c) => `${[0, 1, 2, 3, 4, 5].map((i) => [0, 1, 2].map((j) => `<circle cx="${12 + i * 32 + (j % 2) * 16}" cy="${12 + j * 28}" r="6" fill="${c}" opacity=".35"/>`).join("")).join("")}<rect x="14" y="14" width="74" height="62" fill="${b}"/><rect x="22" y="22" width="30" height="5" fill="${c}"/><rect x="22" y="34" width="56" height="3" fill="${c}" opacity=".7"/><rect x="22" y="42" width="48" height="3" fill="${c}" opacity=".7"/><rect x="104" y="14" width="82" height="62" fill="${c}"/><path d="M114 24h62M114 36h50M114 48h58" stroke="${b}" stroke-width="3" stroke-dasharray="1 6" stroke-linecap="round"/><circle cx="170" cy="64" r="6" fill="${b}"/>`,
  book: (b, c) => `<rect x="18" y="10" width="80" height="70" rx="3" fill="${b}"/><rect x="102" y="10" width="80" height="70" rx="3" fill="${b}"/><rect x="28" y="22" width="48" height="5" fill="${c}"/>${[36,46,56,66].map((y) => `<rect x="28" y="${y}" width="60" height="2" fill="${c}" opacity=".6"/>`).join("")}${[22,34,46,58].map((y) => `<rect x="112" y="${y}" width="60" height="2" fill="${c}" opacity=".6"/>`).join("")}<rect x="176" y="14" width="10" height="26" fill="${c}"/>`,
  accordion: (b, c) => [14, 38, 62].map((y, i) => `<rect x="14" y="${y}" width="172" height="1.5" fill="${b}"/><rect x="14" y="${y + 6}" width="12" height="6" fill="${c}"/><rect x="34" y="${y + 5}" width="${i ? 80 : 110}" height="9" fill="${b}"/>${i ? "" : `<rect x="34" y="${y + 18}" width="60" height="2" fill="${c}"/>`}`).join(""),
  columns: (b, c) => [14, 74, 134].map((x, i) => `<rect x="${x}" y="12" width="52" height="66" fill="none" stroke="${b}" stroke-width="1.5" stroke-dasharray="3 3"/><rect x="${x + 6}" y="18" width="30" height="6" fill="${i % 2 ? c : b}"/>${[32, 40, 48, 56].map((y) => `<rect x="${x + 6}" y="${y}" width="38" height="2" fill="${b}" opacity=".7"/>`).join("")}`).join(""),
  venn: (b, c) => `<circle cx="72" cy="36" r="30" fill="${c}" opacity=".35" stroke="${b}" stroke-width="2.5"/><circle cx="108" cy="36" r="30" fill="${b}" opacity=".2" stroke="${b}" stroke-width="2.5"/><circle cx="90" cy="58" r="30" fill="none" stroke="${b}" stroke-width="2.5"/><circle cx="90" cy="58" r="30" fill="${b}" opacity=".12"/><path d="M148 20h40M148 32h30M148 44h36" stroke="${b}" stroke-width="3" stroke-dasharray="1 6" stroke-linecap="round" opacity=".6"/><circle cx="30" cy="70" r="8" fill="${c}"/>`,
  carousel: (b, c) => `<rect x="8" y="22" width="38" height="52" rx="6" fill="${b}" opacity=".6" transform="rotate(-6 27 48)"/><rect x="154" y="22" width="38" height="52" rx="6" fill="${b}" opacity=".6" transform="rotate(6 173 48)"/><rect x="60" y="8" width="80" height="68" rx="10" fill="${c}" transform="rotate(-3 100 42)"/><circle cx="100" cy="36" r="14" fill="${b}"/>${[88, 100, 112].map((x, i) => `<circle cx="${x}" cy="84" r="3" fill="${i === 1 ? c : b}"/>`).join("")}`,
  bubbles: (b, c) => `<circle cx="42" cy="34" r="24" fill="${b}"/><circle cx="104" cy="28" r="18" fill="${c}"/><circle cx="160" cy="38" r="26" fill="${b}" opacity=".75"/><rect x="28" y="62" width="144" height="20" rx="10" fill="${c}"/><path d="M96 62l6-7 6 7z" fill="${c}"/>`,
  collage: (b, c) => `<rect x="14" y="14" width="64" height="48" fill="${b}" transform="rotate(-7 46 38)"/><rect x="70" y="26" width="52" height="56" fill="${c}" transform="rotate(5 96 54)"/><rect x="118" y="10" width="68" height="44" fill="${b}" opacity=".8" transform="rotate(4 152 32)"/><rect x="40" y="8" width="26" height="8" fill="${c}" opacity=".8" transform="rotate(-20 53 12)"/>`,
  deck: (b, c) => `<rect x="44" y="8" width="112" height="13" fill="${c}"/><path d="M100 28l3 3-3 3-3-3z" fill="${b}"/><rect x="50" y="40" width="100" height="46" fill="none" stroke="${b}" stroke-width="1.6"/><rect x="54" y="44" width="92" height="38" fill="none" stroke="${b}" stroke-width=".6"/>${[0, 1, 2, 3].map((i) => `<rect x="60" y="${52 + i * 7}" width="${i % 2 ? 28 : 34}" height="1.8" fill="${b}" opacity=".7"/><rect x="100" y="${52 + i * 7}" width="${i % 2 ? 38 : 30}" height="1.8" fill="${b}" opacity=".7"/>`).join("")}<circle cx="28" cy="63" r="9" fill="none" stroke="${b}" stroke-width="1.4"/><path d="M30 59l-5 4 5 4" fill="none" stroke="${c}" stroke-width="1.6"/><circle cx="172" cy="63" r="9" fill="none" stroke="${b}" stroke-width="1.4"/><path d="M170 59l5 4-5 4" fill="none" stroke="${c}" stroke-width="1.6"/>`,
  column: (b, c) => `<path d="M100 8l6 8-6 8-6-8z" fill="${c}"/><rect x="70" y="32" width="60" height="1.5" fill="${b}"/>${[40, 50, 60, 70, 80].map((y, i) => `<rect x="${i % 2 ? 78 : 72}" y="${y}" width="${i % 2 ? 44 : 56}" height="${i % 2 ? 2 : 5}" fill="${i % 2 ? b : c}" opacity="${i % 2 ? .6 : 1}"/>`).join("")}`,
  tags: (b, c) => `<path d="M6 12q94 14 188 0" stroke="${b}" stroke-width="2" fill="none"/>${[30, 82, 134].map((x, i) => `<path d="M${x} 18v10" stroke="${b}"/><path d="M${x - 12} 28h24l4 10v22h-32V38z" fill="${i === 1 ? c : b}"/><circle cx="${x}" cy="34" r="2.5" fill="none" stroke="${i === 1 ? b : c}"/>`).join("")}<rect x="46" y="68" width="108" height="16" fill="${c}" transform="rotate(-2 100 76)"/>`,
  shelves: (b, c) => `${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<rect x="${i * 25}" y="0" width="12.5" height="12" fill="${i % 2 ? b : c}"/>`).join("")}${[34, 54, 74].map((y) => `<rect x="10" y="${y}" width="180" height="3" fill="${b}"/><ellipse cx="42" cy="${y - 6}" rx="14" ry="6" fill="${c}"/><rect x="82" y="${y - 10}" width="24" height="10" rx="2" fill="${c}"/><circle cx="140" cy="${y - 5}" r="5" fill="${c}"/>`).join("")}`,
  index: (b, c) => `${[16, 38, 60].map((y, i) => `<rect x="10" y="${y}" width="14" height="2" fill="${b}"/>${i === 0 ? `<circle cx="32" cy="${y + 1}" r="3" fill="${c}"/>` : ""}`).join("")}<rect x="70" y="14" width="116" height=".8" fill="${b}"/><rect x="70" y="20" width="60" height="6" fill="${b}"/>${[34, 42, 50, 58, 66].map((y) => `<rect x="${y % 16 ? 94 : 70}" y="${y}" width="${y % 16 ? 90 : 70}" height="2" fill="${b}" opacity=".6"/>`).join("")}`,
  tabs: (b, c) => `${[10, 70, 130].map((x, i) => `<rect x="${x}" y="8" width="56" height="14" fill="${i === 1 ? c : "none"}" stroke="${b}" stroke-width="2"/>`).join("")}<rect x="10" y="26" width="180" height="58" fill="none" stroke="${b}" stroke-width="2"/><rect x="18" y="34" width="90" height="16" fill="${c}"/>${[58, 66, 74].map((y) => `<rect x="18" y="${y}" width="${y === 66 ? 110 : 140}" height="3" fill="${b}"/>`).join("")}<rect x="160" y="34" width="6" height="12" fill="${c}"/>`,
  shapes: (b, c) => `<circle cx="42" cy="46" r="30" fill="${b}"/><rect x="82" y="16" width="52" height="52" fill="${c}"/><path d="M146 74l22-52 22 52z" fill="${b}"/><path d="M82 68a52 52 0 0 1 52 0" fill="none"/>`,
  sunburst: (b, c) => `${Array.from({ length: 9 }, (_, i) => { const a1 = Math.PI * (1 + i / 8) - .08, a2 = a1 + .17; return `<path d="M100 90L${100 + 120 * Math.cos(a1)} ${90 + 120 * Math.sin(a1)}L${100 + 120 * Math.cos(a2)} ${90 + 120 * Math.sin(a2)}z" fill="${i % 2 ? b : c}" opacity=".8"/>`; }).join("")}<circle cx="100" cy="90" r="30" fill="${c}"/><circle cx="100" cy="90" r="18" fill="${b}"/>`,
  garland: (b, c) => `<path d="M0 10Q50 34 100 10T200 10" stroke="${b}" stroke-width="3" fill="none"/>${[[28, 24], [70, 28], [130, 28], [172, 24]].map(([x, y], i) => `<path d="M${x} ${y}v12" stroke="${b}"/><circle cx="${x}" cy="${y + 20}" r="9" fill="${i % 2 ? c : b}"/>`).join("")}<rect x="60" y="62" width="80" height="22" rx="4" fill="${c}"/>`,
  vertical: (b, c) => `<path d="M150 70C128 56 128 28 150 12c22 16 22 44 0 58zM150 74V20" fill="none" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>${[96, 112].map((x) => `<rect x="${x}" y="14" width="5" height="${x === 96 ? 60 : 44}" fill="${b}"/>`).join("")}${[130, 138].map((x) => `<rect x="${x}" y="70" width="2" height="14" fill="${b}" opacity=".5"/>`).join("")}<rect x="176" y="68" width="10" height="10" fill="${c}"/>`,
  magazine: (b, c) => `<rect x="8" y="8" width="184" height="18" fill="${b}"/><rect x="8" y="30" width="184" height="2" fill="${c}"/>${[8, 74, 140].map((x, i) => `<rect x="${x}" y="38" width="${i === 0 ? 20 : 52}" height="${i === 0 ? 18 : 3}" fill="${i === 0 ? c : b}"/>${[44, 52, 60, 68, 76].map((y) => `<rect x="${i === 0 ? x : x}" y="${y + (i === 0 ? 12 : 0)}" width="52" height="2" fill="${b}" opacity=".5"/>`).join("")}`).join("")}`,
  street: (b, c) => `<path d="M0 50h12v-16h14v22h10v-30h14v24h12v-12h14v18h12v-26h12v20h14v-14h12v22h14v-18h14v24h12v-12h14V90H0z" fill="${b}" opacity=".35"/>${[14, 76, 138].map((x, i) => `<rect x="${x}" y="22" width="48" height="10" fill="none" stroke="${i === 1 ? c : b}" stroke-width="2.5"/><path d="M${x} 36h48l-4 10h-40z" fill="${i === 1 ? b : c}" opacity=".85"/><rect x="${x + 4}" y="50" width="40" height="30" fill="${b}" opacity=".5"/>`).join("")}<path d="M184 8l10 5-10 5" stroke="${c}" stroke-width="2.5" fill="none"/>`,
  dashboard: (b, c) => `<rect x="6" y="6" width="44" height="78" rx="6" fill="${b}" opacity=".5"/>${[16, 38, 60].map((y, i) => `<circle cx="20" cy="${y + 6}" r="7" fill="none" stroke="${i === 0 ? c : b}" stroke-width="3" stroke-dasharray="${i === 0 ? "30 14" : "14 30"}"/><rect x="31" y="${y + 3}" width="14" height="3" rx="1.5" fill="${b}"/>`).join("")}<rect x="58" y="6" width="136" height="20" rx="8" fill="${b}" opacity=".5"/><rect x="58" y="32" width="66" height="52" rx="8" fill="${b}" opacity=".5"/><rect x="130" y="32" width="64" height="52" rx="8" fill="${b}" opacity=".5"/><rect x="138" y="66" width="48" height="10" rx="5" fill="${c}"/>`,
  plate: (b, c) => `<rect x="30" y="6" width="140" height="78" fill="none" stroke="${b}" stroke-width="1.5"/><rect x="35" y="11" width="130" height="68" fill="none" stroke="${b}" stroke-width=".8"/><ellipse cx="100" cy="46" rx="32" ry="20" fill="none" stroke="${b}" stroke-width="2"/><path d="M82 46q18-10 36 0" stroke="${b}" fill="none"/>${[[44, 22, 76, 38], [158, 28, 128, 42], [48, 72, 80, 54]].map(([x1, y1, x2, y2], i) => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="1.2"/><circle cx="${x1}" cy="${y1}" r="3" fill="${c}"/>`).join("")}`,
  comic: (b, c) => `<path d="M6 6h86l-4 40H4z" fill="${b}"/><path d="M98 6h96v34H94z" fill="${c}"/><path d="M4 52h60l-3 32H6z" fill="${c}"/><path d="M70 46h124v38H66z" fill="${b}" opacity=".8"/><path d="M160 14l4 8 9-3-5 8 8 5-9 2 1 9-7-6-6 7-2-9-9-1 7-6-5-8 9 3z" fill="none" stroke="${b}" stroke-width="1.6"/><ellipse cx="128" cy="64" rx="26" ry="11" fill="${c}"/><path d="M110 72l-6 8 14-4z" fill="${c}"/>`,
  letter: (b, c) => `${[0, 1, 2].map((i) => `<rect x="${14 + i * 62}" y="${i === 1 ? 10 : 16}" width="56" height="38" fill="${i === 1 ? c : b}" opacity="${i === 1 ? 1 : .55}" transform="rotate(${[-4, 2, -2][i]} ${42 + i * 62} 30)"/><path d="M${14 + i * 62} ${i === 1 ? 10 : 16}l28 17 28-17" fill="none" stroke="${i === 1 ? b : c}" stroke-width="1.2" transform="rotate(${[-4, 2, -2][i]} ${42 + i * 62} 30)"/>`).join("")}<rect x="46" y="56" width="108" height="32" fill="${c}"/>${[62, 68, 74, 80].map((y, i) => `<rect x="${i ? 56 : 54}" y="${y}" width="${[60, 90, 82, 50][i]}" height="1.4" fill="${b}" opacity="${i ? .7 : 1}"/>`).join("")}<circle cx="136" cy="30" r="5" fill="${b}"/>`,
  tiles: (b, c) => `${Array.from({ length: 10 }, (_, i) => `<rect x="${i * 20 + 1}" y="1" width="18" height="18" fill="${(i % 2) ? b : c}"/><path d="M${i * 20 + 10} 4l3 6-3 6-3-6z" fill="${(i % 2) ? c : b}"/>`).join("")}<path d="M30 84V52a30 30 0 0 1 60 0v32z" fill="${b}" opacity=".75"/><rect x="104" y="30" width="72" height="54" fill="${c}" opacity=".85"/><rect x="112" y="40" width="48" height="4" fill="${b}"/><rect x="112" y="50" width="56" height="3" fill="${b}"/>`,
};

function renderSketch(d) {
  const draw = SKETCHES[d.kind];
  if (!draw) return "";
  const [bg, b, c] = d.palette;
  return `<svg class="sketch" viewBox="0 0 200 90" aria-hidden="true" preserveAspectRatio="xMidYMid meet" style="background:${bg}">${draw(b, c)}</svg>`;
}

function renderTile(d) {
  const built = d.status === "built" && d.slug;
  const li = document.createElement("li");
  li.className = `tile ${built ? "built" : "planned"}`;
  li.dataset.status = built ? "built" : "planned";

  const body = document.createElement(built ? "a" : "div");
  body.className = "tile-body";
  if (built) body.href = `designs/${d.slug}/index.html`;

  const tags = [d.mood, d.type, d.layout].filter(Boolean).join(" · ");
  body.innerHTML = `
    ${renderSketch(d)}
    <div class="tile-meta"><span>${built ? "Built" : "Planned"}</span><span>${built ? "View →" : ""}</span></div>
    <p class="tile-number">${pad(d.id)}</p>
    <h2></h2>
    <p class="tile-tags"></p>
    <div class="swatches">${d.palette.map((c) => `<span style="background:${c}"></span>`).join("")}</div>
  `;
  const h2 = body.querySelector("h2");
  h2.textContent = d.title;
  if (d.font) h2.style.fontFamily = `"${d.font}", Georgia, serif`;
  body.querySelector(".tile-tags").textContent = tags || "Direction to be decided";

  li.dataset.id = d.id;
  li.appendChild(body);

  // sibling of the link (not inside it) so the star is a valid, separate control
  const star = document.createElement("button");
  star.type = "button";
  star.className = "star";
  star.addEventListener("click", () => toggleSaved(d.id));
  li.appendChild(star);
  syncStar(li, star);
  return li;
}

// ---- saved / starred designs, remembered in this browser ----
const STORAGE_KEY = "bake-gallery-saved";
let saved = new Set();
try { saved = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")); } catch (e) { /* storage unavailable: session-only */ }
let activeFilter = "all";

function syncStar(li, star = li.querySelector(".star")) {
  const on = saved.has(Number(li.dataset.id));
  const title = DESIGNS.find((x) => x.id === Number(li.dataset.id)).title;
  star.textContent = on ? "★" : "☆";
  star.classList.toggle("on", on);
  star.setAttribute("aria-pressed", on);
  star.setAttribute("aria-label", `${on ? "Remove" : "Save"} ${pad(Number(li.dataset.id))} ${title} ${on ? "from" : "to"} saved`);
}

function toggleSaved(id) {
  saved.has(id) ? saved.delete(id) : saved.add(id);
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...saved])); } catch (e) { /* ignore */ }
  applyFilter();
}

function applyFilter() {
  let shown = 0;
  grid.querySelectorAll(".tile").forEach((t) => {
    syncStar(t);
    const match = activeFilter === "all"
      || (activeFilter === "saved" ? saved.has(Number(t.dataset.id)) : t.dataset.status === activeFilter);
    t.hidden = !match;
    if (match) shown++;
  });
  document.getElementById("saved-count").textContent = saved.size;
  document.getElementById("empty").hidden = !(activeFilter === "saved" && shown === 0);
}

DESIGNS.forEach((d) => grid.appendChild(renderTile(d)));

document.getElementById("total-count").textContent = DESIGNS.length;
document.getElementById("built-count").textContent = grid.querySelectorAll(".built").length;

document.querySelector(".filters").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-filter]");
  if (!btn) return;
  document.querySelectorAll(".filters button").forEach((b) => b.setAttribute("aria-pressed", b === btn));
  activeFilter = btn.dataset.filter;
  applyFilter();
});

applyFilter();
