#!/usr/bin/env node
/**
 * Generate a standalone search embed (HTML) for WordPress / Squarespace.
 * - Inlines the search index and styles/JS.
 * - Suggests setting a BASE URL so internal "/path#anchor" links point to the correct site.
 * Output: public/search-embed.html
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const PUBLIC = path.join(ROOT, 'public');
const INDEX = path.join(PUBLIC, 'search-index.json');
const OUT = path.join(PUBLIC, 'search-embed.html');

function escapeForScriptTag(jsonString) {
  // Only escape closing script tags to avoid breaking out of the script block.
  return jsonString.replace(/<\/(script)/gi, '<\\/$1');
}

function buildHtml(indexJson) {
  const payload = escapeForScriptTag(JSON.stringify(indexJson));
  const css = `
  /* Scoped styles for the search embed */
  #az-search-embed { font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif; }
  #az-search-embed .az-container { max-width: 960px; margin: 0 auto; }
  #az-search-embed .az-header { background: linear-gradient(90deg,#2563eb,#7c3aed,#059669); color: #fff; padding: 16px; border-radius: 12px; }
  #az-search-embed .az-title { font-size: 24px; font-weight: 800; margin: 0 0 6px; }
  #az-search-embed .az-sub { opacity: .9; margin: 0; }
  #az-search-embed .az-input-wrap { position: relative; margin: 12px 0 16px; }
  #az-search-embed .az-input { width: 100%; padding: 12px 14px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; outline: none; }
  #az-search-embed .az-input:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.15); }
  #az-search-embed .az-sugg { position: absolute; left: 0; right: 0; top: calc(100% + 6px); background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 10px 18px rgba(0,0,0,.06); z-index: 9999; max-height: 320px; overflow: auto; }
  #az-search-embed .az-sugg-item { padding: 10px 12px; border-bottom: 1px solid #f3f4f6; cursor: pointer; }
  #az-search-embed .az-sugg-item:hover, #az-search-embed .az-sugg-item.az-active { background: #eff6ff; }
  #az-search-embed .az-sugg-type { display:inline-block; font-size: 11px; padding: 2px 6px; background:#f3f4f6; border:1px solid #e5e7eb; border-radius: 6px; margin-right:6px; text-transform: capitalize; color:#374151; }
  #az-search-embed .az-sugg-title { font-weight:600; color:#1f2937; }
  #az-search-embed .az-sugg-desc { font-size: 12px; color:#4b5563; }
  #az-search-embed .az-results { margin-top: 14px; display: grid; grid-template-columns: 1fr; gap: 10px; }
  #az-search-embed .az-card { background:#fff; border:1px solid #e5e7eb; border-radius: 10px; padding: 12px; box-shadow: 0 6px 12px rgba(0,0,0,.04); }
  #az-search-embed .az-card:hover { box-shadow: 0 10px 16px rgba(0,0,0,.06); }
  #az-search-embed .az-chip { display:inline-block; font-size: 11px; padding: 2px 6px; background:#f3f4f6; border:1px solid #e5e7eb; border-radius: 6px; margin-right:6px; text-transform: capitalize; color:#374151; }
  #az-search-embed .az-card-title { font-size: 16px; font-weight:700; color:#1d4ed8; margin: 4px 0; }
  #az-search-embed .az-card-desc { font-size: 13px; color:#374151; }
  #az-search-embed .az-card-url { font-size: 12px; color:#6b7280; margin-top: 4px; word-break: break-all; }
  #az-search-embed .az-footer { font-size: 11px; color:#6b7280; margin-top: 8px; }
  `;

  const js = `
  (function(){
    const DATA = (function(){
      const el = document.getElementById('az-search-data');
      if(!el) return {updatedAt: '', total:0, items:[]};
      try{ return JSON.parse(el.textContent || el.innerText || '{}'); }catch(e){ return {updatedAt: '', total:0, items:[]}; }
    })();
    // CONFIG: Set your site base. For relative "/path#anchor" links, we'll prefix with BASE.
    // Example: const BASE = 'https://your-nextjs-site.example';
    const BASE = '';

    function fullUrl(u){
      if(!u) return '#';
      if(/^https?:\/\//i.test(u)) return u;
      if(u.startsWith('/') && BASE) return BASE + u;
      return u; // as-is
    }

    const ROOT = document.getElementById('az-search-embed');
    if(!ROOT) return;
    const input = ROOT.querySelector('#az-input');
    const suggBox = ROOT.querySelector('#az-sugg');
    const results = ROOT.querySelector('#az-results');

    let open = false; let focusIdx = -1;

    function score(it, terms){
      let s = 0;
      const hay = ((it.title||'') + ' ' + (it.description||'') + ' ' + (it.tags||[]).join(' ') + ' ' + (it.keywords||[]).join(' ')).toLowerCase();
      for(const t of terms){
        if(!t) continue;
        if(hay.includes(t)) s += 2;
        if((it.title||'').toLowerCase().includes(t)) s += 3;
      }
      if(it.type==='section' || it.type==='entitlement') s += 1;
      if(it.type==='page') s += 0.5;
      return s;
    }

    function topMatches(q, limit){
      const terms = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
      if(!terms.length) return [];
      return DATA.items.map(it => ({it, s: score(it, terms)}))
        .filter(x => x.s>0)
        .sort((a,b)=>b.s-a.s)
        .slice(0, limit)
        .map(x=>x.it);
    }

    function renderSuggestions(list){
      if(!list.length){ suggBox.innerHTML = '<div class="az-sugg-item">No quick matches. Press Enter to view all…</div>'; return; }
      suggBox.innerHTML = list.map(function(r, idx){
        return '<div class="az-sugg-item" data-idx="' + idx + '\">'
          + '<div><span class="az-sugg-type">' + r.type + '</span><span class="az-sugg-title">' + r.title + '</span></div>'
          + (r.description ? '<div class="az-sugg-desc">' + r.description + '</div>' : '')
          + '</div>';
      }).join('');
    }

    function renderResults(list){
      results.innerHTML = list.map(function(r){
        return '<a href="' + fullUrl(r.url) + '" target="_blank" rel="noopener noreferrer" class="az-card">'
          + '<div class="az-chips">'
          + '<span class="az-chip">' + r.type + '</span>'
          + ((r.tags||[]).slice(0,3).map(function(t){ return '<span class="az-chip">' + t + '</span>'; }).join(''))
          + '</div>'
          + '<div class="az-card-title">' + r.title + '</div>'
          + (r.description ? '<div class="az-card-desc">' + r.description + '</div>' : '')
          + '<div class="az-card-url">' + fullUrl(r.url) + '</div>'
          + '</a>';
      }).join('');
    }

    function openSugg(){ suggBox.style.display='block'; open=true; }
    function closeSugg(){ suggBox.style.display='none'; open=false; focusIdx=-1; }

    input.addEventListener('input', function(){
      const q = input.value;
      if(!q.trim()){ closeSugg(); renderResults(DATA.items.slice(0, 20)); return; }
      const m = topMatches(q, 8); renderSuggestions(m); openSugg();
    });
    input.addEventListener('focus', function(){ if(input.value.trim()){ const m = topMatches(input.value, 8); renderSuggestions(m); openSugg(); } });
    input.addEventListener('keydown', function(e){
      if(e.key==='ArrowDown'){
        e.preventDefault();
        focusIdx = Math.min(focusIdx+1, (suggBox.children.length||1)-1);
        Array.from(suggBox.children).forEach((el,i)=>el.classList.toggle('az-active', i===focusIdx));
      } else if(e.key==='ArrowUp'){
        e.preventDefault();
        focusIdx = Math.max(focusIdx-1, -1);
        Array.from(suggBox.children).forEach((el,i)=>el.classList.toggle('az-active', i===focusIdx));
      } else if(e.key==='Enter'){
        const q = input.value.trim();
        if(focusIdx>=0 && suggBox.children[focusIdx]){
          const idx = focusIdx; const list = topMatches(q, 8); const item = list[idx];
          if(item){ window.open(fullUrl(item.url), '_blank', 'noopener'); }
        } else {
          // Show full results under the box
          const list = topMatches(q, 50);
          renderResults(list);
          closeSugg();
        }
      } else if(e.key==='Escape'){
        closeSugg(); input.blur();
      }
    });

    document.addEventListener('mousedown', function(evt){
      if(!ROOT.contains(evt.target)) closeSugg();
    });

    // Initial results (top items)
    renderResults(DATA.items.slice(0, 20));
  })();
  `;

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Search Embed</title>
<style>${css}</style>
</head>
<body>
  <div id="az-search-embed">
    <div class="az-container">
      <div class="az-header">
        <div class="az-title">Search resources</div>
        <p class="az-sub">Find A–Z lists, how-to-apply guides, newly diagnosed, schools/principals, OT/SLT, programs, and more.</p>
        <div class="az-input-wrap">
          <input id="az-input" class="az-input" placeholder="Search DCA, autism unit, OT, IEP, SNA, RACE, PECS…" />
          <div id="az-sugg" class="az-sugg" style="display:none;"></div>
        </div>
      </div>
      <div id="az-results" class="az-results"></div>
      <div class="az-footer">Index updated ${indexJson.updatedAt} • ${indexJson.total} items • Tip: set BASE in the script to prefix internal links with your site domain.</div>
    </div>
  </div>

  <script type="application/json" id="az-search-data">${payload}</script>
  <script>${js}</script>
</body>
</html>`;
}

function main() {
  const idx = JSON.parse(fs.readFileSync(INDEX, 'utf8'));
  const html = buildHtml(idx);
  fs.writeFileSync(OUT, html, 'utf8');
  console.log('Generated:', OUT);
}

if (require.main === module) main();
