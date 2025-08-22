#!/usr/bin/env node
/**
 * Generate a standalone HTML snippet/page that renders the links catalogue with filters.
 * Output: public/links-catalogue-embed.html
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const PUBLIC = path.join(ROOT, 'public');
const SRC_JSON = path.join(PUBLIC, 'links-catalogue.json');
const OUT_HTML = path.join(PUBLIC, 'links-catalogue-embed.html');

// Safely embed JSON inside a <script type="application/json"> tag.
// We must NOT HTML-escape quotes, otherwise JSON.parse will fail.
// Only escape the closing </script> sequence to avoid prematurely ending the tag.
function escapeForScriptTag(jsonText) {
  // only escape the closing tag sequence
  return String(jsonText).replace(/<\/(script)/gi, '<\\/$1');
}

function buildHtml(payload) {
  const dataJson = JSON.stringify(payload);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Resources Catalogue</title>
  <style>
    :root {
      --accent:#62c2b3; /* teal to match autismandme */
      --bg:#f8fafc; --panel:#ffffff; --border:#e2e8f0; --muted:#64748b; --text:#0f172a;
    }
    html, body { margin:0; padding:0; }
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial; background:var(--bg); color:var(--text); }
    .container { max-width: 1200px; margin: 0 auto; padding: 16px; }
    .header { background: transparent; border-bottom: 1px solid var(--border); }
    .title { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: .2px; color: var(--text); }
    .subtitle { margin: 6px 0 0 0; color: var(--muted); font-size: 14px; }
    .grid { display:grid; grid-template-columns: 1fr; gap: 16px; }
    @media (min-width: 1024px) { .grid { grid-template-columns: 320px 1fr; } }
    .panel { background: var(--panel); border: 1px solid var(--border); border-radius: 10px; padding: 12px; }
    .filters .row { margin-bottom: 12px; }
    .label { display:block; font-size: 12px; color: var(--muted); margin-bottom: 6px; }
    .input, .select { width:100%; border:1px solid var(--border); border-radius: 8px; padding:10px 12px; font-size: 14px; background:#fff; }
    .bar { display:flex; align-items:center; justify-content: space-between; gap: 12px; margin-bottom: 8px; }
    .chips { display:flex; flex-wrap: wrap; gap: 6px; margin: 8px 0; }
    .chip { display:inline-flex; align-items:center; gap:6px; background:#eef6f5; color:#075e54; border:1px solid #d7eee9; border-radius:999px; padding:4px 10px; font-size:12px; }
    .chip button { all: unset; cursor: pointer; color:#065f46; font-weight:700; }
    .btn { background:#fff; border:1px solid var(--border); border-radius: 8px; padding:10px 12px; font-size: 14px; cursor:pointer; }
    .btn.primary { background: var(--accent); color:#083c39; border-color: var(--accent); font-weight:600; }
    .btn:hover { filter: brightness(0.98); }
    .row.inline { display:flex; gap:8px; align-items:center; }
    .row.inline .select { max-width: 50%; }
    .counts { color: var(--muted); font-size: 12px; }
    .toggle { display:flex; align-items:center; gap:8px; font-size: 13px; color: var(--muted); }
    .toggle input { width:16px; height:16px; }
    .cards { display:grid; grid-template-columns: 1fr; gap: 12px; }
    @media (min-width: 640px) { .cards { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @media (min-width: 900px) { .cards { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
    .card { background:#fff; border:1px solid var(--border); border-radius: 10px; padding: 12px; }
    .card h3 { margin:0; font-size: 15px; line-height:1.3; }
    .meta { margin-top:6px; color: var(--muted); font-size: 12px; }
    .actions { display:flex; align-items:center; justify-content: space-between; margin-top: 10px; }
    .host { color:#0e7490; text-decoration: underline; font-size: 12px; overflow-wrap:anywhere; margin-left: 8px; }
    .section-title { display:flex; align-items:baseline; justify-content: space-between; margin: 18px 0 10px; }
    .section-title h2 { margin:0; font-size: 18px; color:#0f766e; }
    details.filt { display:none; }
    @media (max-width: 1023px) { details.filt { display:block; } .filters { display:none; } details.filt[open] + .filters { display:block; } }
  </style>
</head>
<body>
  <div class="header">
    <div class="container">
      <h1 class="title">Resources Catalogue</h1>
      <p class="subtitle">Clean, neutral embed. No logo, no dynamic app chrome.</p>
      <div id="meta" class="subtitle"></div>
    </div>
  </div>
  <div class="container">
    <div class="grid">
      <details class="filt"><summary class="btn" style="margin-bottom:8px;">Filters</summary></details>
      <aside class="panel filters">
        <div class="row">
          <label class="label">Search</label>
          <input id="q" class="input" placeholder="Search by title, URL, label..." />
        </div>
        <div class="row">
          <label class="label">Category</label>
          <select id="cat" class="select"></select>
        </div>
        <div class="row">
          <label class="label">Subcategory</label>
          <select id="sub" class="select"></select>
        </div>
        <div class="row">
          <label class="label">Source</label>
          <select id="src" class="select"></select>
        </div>
        <div class="row inline">
          <label class="label" style="margin:0">Sort</label>
          <select id="sort" class="select">
            <option value="title-asc">Title A–Z</option>
            <option value="title-desc">Title Z–A</option>
            <option value="source-asc">Source A–Z</option>
          </select>
        </div>
        <div class="row toggle"><input type="checkbox" id="group" checked><label for="group">Group by category</label></div>
        <div class="row"><button id="clear" class="btn">Clear filters</button></div>
        <div id="counts" class="counts"></div>
      </aside>
      <section>
        <div id="chips" class="chips"></div>
        <div id="content"></div>
      </section>
    </div>
  </div>

  <noscript><div class="container"><div class="panel">This catalogue requires JavaScript to display.</div></div></noscript>
  <script id="catalogue" type="application/json">${escapeForScriptTag(dataJson)}</script>
  <script>
    let payload = {};
    try {
      const raw = document.getElementById('catalogue').textContent || '{}';
      payload = JSON.parse(raw);
    } catch (e) {
      console.error('Failed to parse embedded JSON:', e);
      payload = { updatedAt: null, items: [] };
    }
    const allItems = Array.isArray(payload.items) ? payload.items : [];
    const metaEl = document.getElementById('meta');
    if (payload.updatedAt) {
      try { metaEl.textContent = 'Updated ' + new Date(payload.updatedAt).toLocaleString() + ' • ' + (payload.total || allItems.length) + ' items'; } catch(e) {}
    }

    const qEl = document.getElementById('q');
    const catEl = document.getElementById('cat');
    const subEl = document.getElementById('sub');
    const srcEl = document.getElementById('src');
    const sortEl = document.getElementById('sort');
    const groupEl = document.getElementById('group');
    const clearEl = document.getElementById('clear');
    const countsEl = document.getElementById('counts');
    const contentEl = document.getElementById('content');
    const chipsEl = document.getElementById('chips');

    const uniq = (arr) => Array.from(new Set(arr));
    const cats = uniq(allItems.map(i => i.category || i.source || 'Other')).sort();
    const subs = uniq(allItems.map(i => i.subCategory || '').filter(Boolean)).sort();
    const srcs = uniq(allItems.map(i => i.source)).sort();

    function fillSelect(sel, opts) {
      sel.innerHTML = '';
      const all = document.createElement('option'); all.textContent = 'All'; sel.appendChild(all);
      for (const o of opts) { const op = document.createElement('option'); op.textContent = o; sel.appendChild(op); }
    }
    fillSelect(catEl, cats); fillSelect(subEl, subs); fillSelect(srcEl, srcs);

    function activeChips(q, cat, sub, src) {
      chipsEl.innerHTML = '';
      const mk = (label, onClear) => { const c = document.createElement('span'); c.className = 'chip'; c.innerHTML = label + ' <button aria-label="Remove">×</button>'; c.querySelector('button').addEventListener('click', onClear); chipsEl.appendChild(c); };
      if (q) mk('Search: ' + q, () => { qEl.value = ''; run(); });
      if (cat && cat !== 'All') mk('Category: ' + cat, () => { catEl.value = 'All'; run(); });
      if (sub && sub !== 'All') mk('Subcategory: ' + sub, () => { subEl.value = 'All'; run(); });
      if (src && src !== 'All') mk('Source: ' + src, () => { srcEl.value = 'All'; run(); });
    }

    function filteredItems() {
      const q = (qEl.value || '').trim().toLowerCase();
      const cat = catEl.value || 'All';
      const sub = subEl.value || 'All';
      const src = srcEl.value || 'All';
      let res = allItems.filter(it => {
        if (cat !== 'All') { const c = it.category || it.source || 'Other'; if (c !== cat) return false; }
        if (sub !== 'All') { if ((it.subCategory || '') !== sub) return false; }
        if (src !== 'All') { if (it.source !== src) return false; }
        if (q) {
          const hay = ((it.title || '') + ' ' + (it.url || '') + ' ' + (it.label || '') + ' ' + (it.category || '') + ' ' + (it.subCategory || '')).toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      });
      // sort
      const s = sortEl.value || 'title-asc';
      const cmpTitle = (a,b) => (a.title||a.url||'').localeCompare(b.title||b.url||'');
      const cmpSource = (a,b) => (a.source||'').localeCompare(b.source||'') || cmpTitle(a,b);
      if (s === 'title-asc') res.sort(cmpTitle);
      if (s === 'title-desc') res.sort((a,b) => cmpTitle(b,a));
      if (s === 'source-asc') res.sort(cmpSource);
      countsEl.textContent = 'Showing ' + res.length + ' of ' + allItems.length;
      activeChips(q, cat, sub, src);
      return res;
    }

    function groupByCat(list) {
      const map = {};
      for (const it of list) {
        const c = it.category || it.source || 'Other';
        (map[c] = map[c] || []).push(it);
      }
      return Object.keys(map).sort().map(k => [k, map[k]]);
    }

    function renderList(list) {
      const cont = document.createElement('div');
      cont.className = 'cards';
      for (const it of list) {
        const card = document.createElement('article'); card.className = 'card'; cont.appendChild(card);
        const h3 = document.createElement('h3'); h3.textContent = it.title || it.url; card.appendChild(h3);
        const meta = document.createElement('div'); meta.className = 'meta'; meta.textContent = (it.source||'') + (it.subCategory ? ' • ' + it.subCategory : ''); card.appendChild(meta);
        const actions = document.createElement('div'); actions.className = 'actions'; card.appendChild(actions);
        const btn = document.createElement('a'); btn.className = 'btn primary'; btn.href = it.url; btn.target = '_blank'; btn.rel = 'noopener noreferrer nofollow'; btn.textContent = it.label || 'Open'; actions.appendChild(btn);
        try { const host = new URL(it.url).hostname; const hostA = document.createElement('a'); hostA.className = 'host'; hostA.href = it.url; hostA.target = '_blank'; hostA.rel = 'noopener noreferrer nofollow'; hostA.textContent = host; actions.appendChild(hostA); } catch {}
      }
      return cont;
    }

    function render() {
      const list = filteredItems();
      contentEl.innerHTML = '';
      if (!list.length) {
        const empty = document.createElement('div'); empty.className = 'panel'; empty.textContent = 'No results. Try adjusting filters.'; contentEl.appendChild(empty); return;
      }
      if (!groupEl.checked) { contentEl.appendChild(renderList(list)); return; }
      const groups = groupByCat(list);
      for (const [cat, arr] of groups) {
        const secT = document.createElement('div'); secT.className = 'section-title';
        const h = document.createElement('h2'); h.textContent = cat; secT.appendChild(h);
        const badge = document.createElement('span'); badge.className = 'counts'; badge.textContent = arr.length + ' items'; secT.appendChild(badge);
        contentEl.appendChild(secT);
        contentEl.appendChild(renderList(arr));
      }
    }

    function run(){ render(); }
    qEl.addEventListener('input', run);
    catEl.addEventListener('change', run);
    subEl.addEventListener('change', run);
    srcEl.addEventListener('change', run);
    sortEl.addEventListener('change', run);
    groupEl.addEventListener('change', run);
    clearEl.addEventListener('click', () => { qEl.value = ''; catEl.value = 'All'; subEl.value = 'All'; srcEl.value = 'All'; sortEl.value = 'title-asc'; run(); });

    run();
  </script>
</body>
</html>`;
}

function main() {
  if (!fs.existsSync(SRC_JSON)) {
    console.error('Missing JSON:', SRC_JSON);
    process.exit(1);
  }
  const json = JSON.parse(fs.readFileSync(SRC_JSON, 'utf8'));
  const html = buildHtml(json);
  fs.writeFileSync(OUT_HTML, html, 'utf8');
  console.log('Generated:', OUT_HTML);
}

if (require.main === module) {
  main();
}
