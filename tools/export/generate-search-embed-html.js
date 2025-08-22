#!/usr/bin/env node
/**
 * Generate a standalone search embed (no external app).
 * - Inlines search-index.json and a compact UI with results list
 * - Output: public/search-embed.html
 *
 * Tip: In the generated HTML, set data-base on the container to prefix internal routes
 * e.g., <div id="search-embed" data-base="https://your-netlify-site.com"></div>
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const PUBLIC = path.join(ROOT, 'public');
const SRC_JSON = path.join(PUBLIC, 'search-index.json');
const OUT_HTML = path.join(PUBLIC, 'search-embed.html');

function escapeForScriptTag(jsonText) {
  return String(jsonText).replace(/<\/(script)/gi, '<\\/$1');
}

function buildHtml(payload) {
  const dataJson = JSON.stringify(payload);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Search Resources</title>
  <style>
    :root {
      --accent:#62c2b3; /* teal */
      --bg:#f8fafc; --panel:#ffffff; --border:#e2e8f0; --text:#0f172a; --muted:#64748b;
    }
    html, body { margin:0; padding:0; }
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial; background:var(--bg); color:var(--text); }
    .container { max-width: 960px; margin: 0 auto; padding: 16px; }
    .header { border-bottom:1px solid var(--border); padding:16px 0; }
    .title { margin:0; font-size: 24px; font-weight:800; }
    .subtitle { margin:6px 0 0 0; color:var(--muted); font-size:13px; }
    .panel { background:var(--panel); border:1px solid var(--border); border-radius:10px; padding:12px; }
    .bar { display:flex; align-items:center; gap:8px; }
    .query { flex:1; border:1px solid var(--border); border-radius:8px; padding:10px 12px; font-size:16px; background:#fff; }
    .count { display:inline-block; min-width: 34px; text-align:center; border:1px solid var(--border); border-radius:999px; padding:4px 8px; color:var(--muted); font-size:12px; }
    .filters { margin-top:8px; display:flex; flex-wrap:wrap; gap:8px; }
    .chip { display:inline-flex; align-items:center; gap:6px; background:#eef6f5; border:1px solid #d7eee9; color:#065f46; border-radius:999px; padding:4px 10px; font-size:12px; }
    .chip input { width:16px; height:16px; }
    .res { margin-top:12px; display:grid; gap:10px; }
    .item { display:block; text-decoration:none; color:inherit; background:#fff; border:1px solid var(--border); border-radius:10px; padding:12px; }
    .top { display:flex; align-items:center; gap:6px; margin-bottom:6px; }
    .badge { display:inline-block; font-size: 11px; border:1px solid var(--border); background:#f9fafb; padding:2px 6px; border-radius:999px; text-transform: capitalize; }
    .title2 { font-weight:700; font-size:15px; }
    .desc { color:var(--muted); font-size:13px; margin-top:2px; }
    .url { color:#0e7490; font-size:12px; overflow-wrap:anywhere; margin-top:4px; }
    .footer { color:var(--muted); font-size:12px; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="title">Search</h1>
      <div id="meta" class="subtitle"></div>
    </div>
    <div class="panel">
      <div class="bar">
        <input id="query" class="query" placeholder="Search e.g. DCA application, autism unit, OT, IEP, SNA, RACE, PLU, PECS" />
        <span class="count" id="count">0</span>
      </div>
      <div id="filters" class="filters"></div>
    </div>
    <div id="results" class="res"></div>
    <div class="footer">Self-contained search. Paste into WordPress (Custom HTML) or Squarespace (Code) blocks. Optional: set data-base for internal links.</div>
  </div>

  <div id="search-embed" data-base=""></div>
  <script id="search-data" type="application/json">${escapeForScriptTag(dataJson)}</script>
  <script>
    function resolveUrl(u) {
      try {
        if (!u) return '#';
        if (u.startsWith('http')) return u;
        var base = (document.getElementById('search-embed').dataset.base || '').replace(/\/$/, '');
        if (!base) return u; // leave relative as-is if base not provided
        return base + u;
      } catch(e) { return u; }
    }

    let index = { items: [], updatedAt: null };
    try { index = JSON.parse(document.getElementById('search-data').textContent || '{}'); } catch(e) {}

    const qEl = document.getElementById('query');
    const metaEl = document.getElementById('meta');
    const countEl = document.getElementById('count');
    const resEl = document.getElementById('results');
    const filtersEl = document.getElementById('filters');

    if (index.updatedAt && metaEl) {
      try { metaEl.textContent = 'Index updated ' + new Date(index.updatedAt).toLocaleString() + ' • ' + (index.total || (index.items || []).length) + ' items'; } catch(e) {}
    }

    function scoreItem(it, terms) {
      var s = 0;
      var hay = (it.title + ' ' + (it.description||'') + ' ' + ((it.tags||[]).join(' ')) + ' ' + ((it.keywords||[]).join(' '))).toLowerCase();
      for (var i=0;i<terms.length;i++) {
        var t = terms[i];
        if (!t) continue;
        if (hay.indexOf(t) !== -1) s += 2;
        if ((it.title||'').toLowerCase().indexOf(t) !== -1) s += 3;
      }
      if (it.type === 'section' || it.type === 'entitlement') s += 1;
      if (it.type === 'page') s += 0.5;
      return s;
    }

    // Type filter chips
    var allTypes = Array.from(new Set((index.items||[]).map(function(i){ return i.type; }))).filter(Boolean).sort();
    if (allTypes.length === 0) allTypes = ['page','section','entitlement','link'];
    var typeState = {};
    allTypes.forEach(function(t){ typeState[t] = true; });
    function renderTypeFilters(){
      filtersEl.innerHTML = '';
      allTypes.forEach(function(t){
        var label = document.createElement('label');
        label.className = 'chip';
        var cb = document.createElement('input'); cb.type = 'checkbox'; cb.checked = !!typeState[t]; cb.addEventListener('change', function(){ typeState[t] = cb.checked; runSearch(); });
        label.appendChild(cb);
        var span = document.createElement('span'); span.textContent = t; label.appendChild(span);
        filtersEl.appendChild(label);
      });
    }
    renderTypeFilters();

    function render(list) {
      countEl.textContent = list.length;
      resEl.innerHTML = '';
      if (!list.length) {
        var empty = document.createElement('div');
        empty.className = 'panel';
        empty.textContent = 'No results. Try different keywords (e.g., SNA, DCA, IEP, PLU, Autism unit).';
        resEl.appendChild(empty);
        return;
      }
      for (var i=0;i<list.length;i++) {
        var r = list[i];
        var a = document.createElement('a');
        a.className = 'item';
        a.href = resolveUrl(r.url);
        a.target = r.type === 'link' ? '_blank' : '_self';
        a.rel = 'noopener noreferrer';

        var top = document.createElement('div');
        top.className = 'top';
        var type = document.createElement('span'); type.className = 'badge'; type.textContent = r.type; top.appendChild(type);
        if (r.tags && r.tags[0]) { var tag = document.createElement('span'); tag.className = 'badge'; tag.textContent = r.tags[0]; top.appendChild(tag); }
        a.appendChild(top);

        var title = document.createElement('div'); title.className = 'title2'; title.textContent = r.title; a.appendChild(title);
        if (r.description) { var desc = document.createElement('div'); desc.className = 'desc'; desc.textContent = r.description; a.appendChild(desc); }
        var url = document.createElement('div'); url.className = 'url'; url.textContent = r.url; a.appendChild(url);

        resEl.appendChild(a);
      }
    }

    function runSearch() {
      var q = (qEl.value || '').trim().toLowerCase();
      var source = (index.items || []).filter(function(it){ return !!typeState[it.type]; });
      if (!q) {
        var defaults = source.slice(0, 30);
        render(defaults);
        return;
      }
      var terms = q.split(/\s+/).filter(Boolean);
      var scored = source.map(function(it){ return { it: it, s: scoreItem(it, terms) } });
      var out = scored.filter(function(x){ return x.s > 0 }).sort(function(a,b){ return b.s - a.s }).slice(0, 60).map(function(x){ return x.it });
      render(out);
    }

    qEl.addEventListener('input', runSearch);
    runSearch();
  </script>
</body>
</html>`;
}

function main() {
  if (!fs.existsSync(SRC_JSON)) {
    console.error('Missing index:', SRC_JSON, '\nRun: node tools/export/build-search-index.js');
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
