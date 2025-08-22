#!/usr/bin/env node
/**
 * tools/export/extract-links.js
 *
 * Aggregates all outbound resource links used by the app and outputs:
 * - tools/export/links-catalogue.json (structured by top-level category)
 * - tools/export/links-catalogue.csv (flat table for spreadsheets)
 * - public/links-catalogue.json (public JSON for a future UI page)
 *
 * Sources covered ("links under each button"):
 * - Programs (data/programs.js + data/programs-extra.json): program.website
 * - Games (data/games-open-source.json): website and playUrl
 * - Studies (data/studies-2024-2025.json): url
 * - Strategies (data/autism-strategies.json): sources[] per country entry
 * - YouTube channels (data/youtube-channels.json): channelUrl
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const DATA = path.join(ROOT, 'data');
const OUT_DIR = path.join(ROOT, 'tools', 'export');
const PUBLIC_DIR = path.join(ROOT, 'public');

const OUT_JSON = path.join(OUT_DIR, 'links-catalogue.json');
const OUT_CSV = path.join(OUT_DIR, 'links-catalogue.csv');
const PUBLIC_JSON = path.join(PUBLIC_DIR, 'links-catalogue.json');

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function normalizeUrl(url) {
  if (!url) return null;
  const s = String(url).trim();
  if (!s) return null;
  if (/^https?:\/\//i.test(s)) return s;
  if (/^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(s)) return `https://${s}`;
  return null;
}

function uniqueBy(arr, keyFn) {
  const map = new Map();
  for (const item of arr) {
    const k = keyFn(item);
    if (!map.has(k)) map.set(k, item);
  }
  return Array.from(map.values());
}

function csvEscape(value) {
  if (value == null) return '';
  const s = String(value);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function toCSV(rows) {
  const headers = ['source', 'category', 'subCategory', 'title', 'label', 'url', 'notes'];
  const lines = [headers.join(',')];
  for (const r of rows) {
    lines.push([
      r.source,
      r.category || '',
      r.subCategory || '',
      r.title || '',
      r.label || '',
      r.url || '',
      r.notes || ''
    ].map(csvEscape).join(','));
  }
  return lines.join('\n');
}

function loadJson(file) {
  const p = path.join(DATA, file);
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function loadPrograms() {
  // data/programs.js exports a JS module; we'll parse text to collect website & title/category quickly.
  const file = path.join(DATA, 'programs.js');
  const src = fs.readFileSync(file, 'utf8');
  const entries = [];
  // Very simple regex-based field extraction; robust enough for our controlled file
  const itemRegex = /\{[\s\S]*?title:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"[\s\S]*?website:\s*"([^"]*)"[\s\S]*?\}/g;
  let m;
  while ((m = itemRegex.exec(src)) !== null) {
    const [_, title, category, website] = m;
    const url = normalizeUrl(website);
    if (url) entries.push({ title, category, url });
  }
  // Merge extra JSON if present
  const extra = loadJson('programs-extra.json') || [];
  for (const p of extra) {
    const url = normalizeUrl(p.website);
    if (!url) continue;
    entries.push({ title: p.title || p.website, category: p.category || p.tags?.[0] || 'Programs', url });
  }
  // De-dupe by URL
  return uniqueBy(entries, (e) => e.url);
}

function loadGames() {
  const games = loadJson('games-open-source.json') || [];
  const rows = [];
  for (const g of games) {
    const name = g.name || 'Game';
    const genre = g.genre || 'Game';
    const website = normalizeUrl(g.website);
    const playUrl = normalizeUrl(g.playUrl);
    if (website) rows.push({ title: name, category: 'Games', subCategory: genre, label: 'Website', url: website });
    if (playUrl && playUrl !== website) rows.push({ title: name, category: 'Games', subCategory: genre, label: 'Play', url: playUrl });
  }
  return uniqueBy(rows, (r) => `${r.title}::${r.label}::${r.url}`);
}

function loadStudies() {
  const studies = loadJson('studies-2024-2025.json') || [];
  const rows = [];
  for (const s of studies) {
    const url = normalizeUrl(s.url);
    if (!url) continue;
    rows.push({ title: s.title, category: 'Studies', subCategory: s.region || '', label: 'Direct link', url });
  }
  return uniqueBy(rows, (r) => r.url);
}

function loadStrategies() {
  const strategies = loadJson('autism-strategies.json');
  if (!strategies) return [];
  const rows = [];
  for (const c of strategies.countries || []) {
    const country = c.country || '';
    const region = c.region || '';
    const list = Array.isArray(c.sources) ? c.sources : [];
    for (const u of list) {
      const url = normalizeUrl(u);
      if (!url) continue;
      rows.push({ title: c.instrumentTitle || country, category: 'Strategies & Law', subCategory: region || country, label: country || 'Source', url });
    }
  }
  return uniqueBy(rows, (r) => r.url);
}

function loadYouTube() {
  const channels = loadJson('youtube-channels.json') || [];
  const rows = [];
  for (const ch of channels) {
    const url = normalizeUrl(ch.channelUrl);
    if (!url) continue;
    rows.push({ title: ch.name, category: 'YouTube', subCategory: ch.category || '', label: 'Channel', url });
  }
  return uniqueBy(rows, (r) => r.url);
}

function buildCatalogue() {
  const items = [];
  for (const p of loadPrograms()) items.push({ source: 'Programs', category: p.category || 'Programs', subCategory: '', title: p.title, label: 'Website', url: p.url });
  for (const g of loadGames()) items.push({ source: 'Games', category: g.category, subCategory: g.subCategory, title: g.title, label: g.label, url: g.url });
  for (const s of loadStudies()) items.push({ source: 'Studies', category: s.category, subCategory: s.subCategory, title: s.title, label: s.label, url: s.url });
  for (const st of loadStrategies()) items.push({ source: 'Strategies', category: st.category, subCategory: st.subCategory, title: st.title, label: st.label, url: st.url });
  for (const y of loadYouTube()) items.push({ source: 'YouTube', category: y.category, subCategory: y.subCategory, title: y.title, label: y.label, url: y.url });

  // De-dupe globally by URL while keeping first occurrence
  const deduped = uniqueBy(items, (i) => i.url);
  return deduped;
}

function groupByCategory(items) {
  const grouped = {};
  for (const it of items) {
    const cat = it.category || it.source || 'Other';
    grouped[cat] = grouped[cat] || [];
    grouped[cat].push(it);
  }
  // sort within categories by title
  for (const k of Object.keys(grouped)) {
    grouped[k].sort((a, b) => (a.subCategory || '').localeCompare(b.subCategory || '') || (a.title || '').localeCompare(b.title || ''));
  }
  return grouped;
}

function main() {
  ensureDir(OUT_DIR);
  ensureDir(PUBLIC_DIR);
  const items = buildCatalogue();
  const grouped = groupByCategory(items);

  fs.writeFileSync(OUT_JSON, JSON.stringify({ updatedAt: new Date().toISOString(), total: items.length, items, grouped }, null, 2), 'utf8');
  fs.writeFileSync(OUT_CSV, toCSV(items), 'utf8');
  fs.writeFileSync(PUBLIC_JSON, JSON.stringify({ updatedAt: new Date().toISOString(), total: items.length, items }, null, 2), 'utf8');

  console.log(`Exported ${items.length} links.`);
  console.log(`- ${OUT_JSON}`);
  console.log(`- ${OUT_CSV}`);
  console.log(`- ${PUBLIC_JSON}`);
}

if (require.main === module) {
  main();
}
