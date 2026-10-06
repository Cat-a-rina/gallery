const grid = document.getElementById("grid");
const pad = (n) => String(n).padStart(2, "0");

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
    <div class="tile-meta"><span>${built ? "Built" : "Planned"}</span><span>${built ? "View →" : ""}</span></div>
    <p class="tile-number">${pad(d.id)}</p>
    <h2></h2>
    <p class="tile-tags"></p>
    <div class="swatches">${d.palette.map((c) => `<span style="background:${c}"></span>`).join("")}</div>
  `;
  body.querySelector("h2").textContent = d.title;
  body.querySelector(".tile-tags").textContent = tags || "Direction to be decided";

  li.appendChild(body);
  return li;
}

DESIGNS.forEach((d) => grid.appendChild(renderTile(d)));

document.getElementById("total-count").textContent = DESIGNS.length;
document.getElementById("built-count").textContent = grid.querySelectorAll(".built").length;

document.querySelector(".filters").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-filter]");
  if (!btn) return;
  document.querySelectorAll(".filters button").forEach((b) => b.setAttribute("aria-pressed", b === btn));
  const f = btn.dataset.filter;
  grid.querySelectorAll(".tile").forEach((t) => { t.hidden = f !== "all" && t.dataset.status !== f; });
});
