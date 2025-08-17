const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data', 'programs.js');
const EXTRA = path.join(ROOT, 'data', 'programs-extra.json');
const LINK_REPORT = path.join(ROOT, 'tools', 'link-check-report.json');

function loadPrograms() {
  try {
    const src = fs.readFileSync(DATA, 'utf8');
    // Find the start of the array after the export
    const token = 'export const programs';
    const idx = src.indexOf(token);
    if (idx === -1) throw new Error('programs export not found');
    // find first '[' after token
    const start = src.indexOf('[', idx);
    if (start === -1) throw new Error('opening [ not found');
    // find matching closing bracket while respecting strings and escapes
    let i = start;
    let depth = 0;
    let inString = false;
    let stringChar = '';
    let prevChar = '';
    for (; i < src.length; i++) {
      const ch = src[i];
      if (inString) {
        if (ch === stringChar && prevChar !== '\\') {
          inString = false;
          stringChar = '';
        }
      } else {
        if (ch === '"' || ch === "'" || ch === '`') {
          inString = true;
          stringChar = ch;
        } else if (ch === '[') {
          depth++;
        } else if (ch === ']') {
          depth--;
          if (depth === 0) {
            break;
          }
        }
      }
      prevChar = ch;
    }
    if (depth !== 0) throw new Error('Could not find matching closing ] for programs array');
    const arrSrc = src.slice(start, i + 1);
    // evaluate the array source safely
    const programs = eval('(' + arrSrc + ')');
  let extra = [];
  try { extra = JSON.parse(fs.readFileSync(EXTRA, 'utf8')); } catch (e) { extra = []; }
    const map = new Map();
    [...programs, ...extra].forEach((p) => {
      const key = `${(p.title||'').toLowerCase()}::${(p.website||'').toLowerCase()}`;
      if (!map.has(key)) map.set(key, p);
    });
    return Array.from(map.values());
  } catch (e) {
    console.error('Failed to load programs:', e.message || e);
    process.exit(2);
  }
}

function loadLinkReport() {
  try {
    return JSON.parse(fs.readFileSync(LINK_REPORT, 'utf8'));
  } catch (e) {
    return null;
  }
}

function summarize() {
  const programs = loadPrograms();
  const total = programs.length;
  const withWebsite = programs.filter((p) => p.website && String(p.website).trim()).length;
  const withoutWebsite = total - withWebsite;

  const linkReport = loadLinkReport();
  const checkedCount = linkReport ? linkReport.length : 0;
  const okCount = linkReport ? linkReport.filter(r=>r.ok || r.okBrowser).length : 0;
  const bad = linkReport ? linkReport.filter(r=>!r.ok && !r.okBrowser) : [];

  console.log('Programs summary:');
  console.log('- total programs (data + extra, deduped):', total);
  console.log('- programs with website:', withWebsite);
  console.log('- programs missing website:', withoutWebsite);
  console.log('Link checker snapshot:');
  if (!linkReport) console.log('- no link-check report found (run npm run check:links)');
  else {
    console.log('- total URLs checked by checker:', checkedCount);
    console.log('- URLs OK or browser-OK:', okCount);
    console.log('- URLs failing (not browser-OK):', bad.length);
  }

  if (total >= 300 && linkReport && okCount >= 300) {
    console.log('\nGood: you already have 300+ operational program links verified.');
  } else {
    console.log('\nNext steps to reach 300 operational programs:');
    if (total < 300) console.log('- Add more programs (use tools/import-from-csv.js to bulk import CSV into data/programs-extra.json).');
    if (!linkReport) console.log('- Run `npm run check:links` to verify URLs and produce public/link-health.json.');
    else if (okCount < 300) console.log(`- Ensure at least ${300 - okCount} more URLs are operational or browser-OK (update their website fields or replace with working URLs).`);
    console.log('- For missing images, paste program thumbnails into public/images/programs/');
  }
}

summarize();
