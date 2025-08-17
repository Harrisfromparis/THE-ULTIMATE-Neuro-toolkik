#!/usr/bin/env node
/*
  Link checker for program websites (base + extra)
  - Parses website fields from data/programs.js (string regex)
  - Reads data/programs-extra.json
  - Normalizes URLs (adds https:// if missing)
  - Checks with HEAD, falls back to GET on 405/403/Method Not Allowed
  - Outputs tools/link-check-report.json and tools/link-check-report.csv
*/

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data');
const TOOLS_DIR = path.join(ROOT, 'tools');

const PROGRAMS_JS = path.join(DATA_DIR, 'programs.js');
const EXTRA_JSON = path.join(DATA_DIR, 'programs-extra.json');
const OUT_JSON = path.join(TOOLS_DIR, 'link-check-report.json');
const OUT_CSV = path.join(TOOLS_DIR, 'link-check-report.csv');
const PUBLIC_STATUS = path.join(ROOT, 'public', 'link-health.json');
const ALLOW_BROWSER_403 = [
  /(^|\.)calm\.com$/i,
  /(^|\.)wpspublish\.com$/i,
  /(^|\.)sagepub\.com$/i,
  /(^|\.)tandfonline\.com$/i,
  /(^|\.)herts\.ac\.uk$/i,
  /(^|\.)aane\.org$/i,
  /(^|\.)unicef\.org$/i,
  /(^|\.)autismspeaks\.org$/i,
  /(^|\.)openra\.net$/i,
  /(^|\.)supertuxkart\.net$/i,
  /(^|\.)supertux\.org$/i,
  /(^|\.)play2048\.co$/i,
  /(^|\.)hextris\.github\.io$/i,
  /(^|\.)freeciv\.org$/i,
  /(^|\.)play\.freeciv\.org$/i,
  /(^|\.)openttd\.org$/i,
  /(^|\.)wesnoth\.org$/i,
  /(^|\.)wz2100\.net$/i,
  /(^|\.)hedgewars\.org$/i,
  /(^|\.)minetest\.net$/i,
  /(^|\.)veloren\.net$/i,
  /(^|\.)bzflag\.org$/i,
  /(^|\.)lixgame\.com$/i,
  /(^|\.)endless-sky\.github\.io$/i
];
const ALLOW_BROWSER_NETFAIL = [
  /(^|\.)boardmaker\.com$/i,
  /(^|\.)prentrom\.com$/i,
  /(^|\.)autism-society\.org$/i,
  /(^|\.)aacap\.org$/i,
  /(^|\.)modelmekids\.com$/i,
  /(^|\.)autismsa\.org\.au$/i
];

function normalizeUrl(url) {
  if (!url) return null;
  const trimmed = String(url).trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (/^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return null; // ignore mailto:, tel:, and invalids
}

function unique(arr) {
  return Array.from(new Set(arr.filter(Boolean)));
}

function parseWebsitesFromProgramsJs(src) {
  const result = [];
  const websiteRegex = /website:\s*"([^"]+)"/g; // naive but adequate for our file
  let m;
  while ((m = websiteRegex.exec(src)) !== null) {
    result.push(m[1]);
  }
  return result;
}

async function checkUrl(url, { timeoutMs = 12000 } = {}) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  const headers = { 'user-agent': 'AutismAndMe-LinkChecker/1.0 (+https://localhost)' };
  try {
    // Try HEAD first
    let res = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: controller.signal, headers });
    if (!res.ok && [405, 403, 400].includes(res.status)) {
      // Fallback to GET for sites that disallow HEAD or are picky
      res = await fetch(url, { method: 'GET', redirect: 'follow', signal: controller.signal, headers });
    }
    const finalUrl = res.url || url;
    const ok = res.ok;
    const status = res.status;
    clearTimeout(t);
    return { url, finalUrl, ok, status };
  } catch (e) {
    clearTimeout(t);
    return { url, finalUrl: url, ok: false, status: 0, error: e.message || String(e) };
  }
}

function toCsv(rows) {
  const esc = (v) => {
    const s = v == null ? '' : String(v);
    if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  };
  const header = ['url', 'finalUrl', 'ok', 'okBrowser', 'status', 'error'];
  const lines = [header.map(esc).join(',')];
  for (const r of rows) {
    lines.push([r.url, r.finalUrl, r.ok, r.okBrowser, r.status, r.error || ''].map(esc).join(','));
  }
  return lines.join('\n');
}

// Simple CLI args parser
function parseArgs(argv) {
  const args = { flags: new Set(), values: {} };
  for (const a of argv) {
    if (a.startsWith('--')) {
      const [k, v] = a.replace(/^--/, '').split('=');
      if (typeof v === 'undefined') args.flags.add(k);
      else args.values[k] = v;
    }
  }
  return args;
}

(async () => {
  const argv = parseArgs(process.argv.slice(2));
  const isFast = argv.flags.has('fast');
  const limitArg = argv.values.limit ? parseInt(argv.values.limit, 10) : undefined;
  const onlyNew = argv.flags.has('only-new');
  const timeoutArg = argv.values.timeout ? parseInt(argv.values.timeout, 10) : undefined;
  const concurrencyArg = argv.values.concurrency ? parseInt(argv.values.concurrency, 10) : undefined;
  const jsPath = PROGRAMS_JS;
  const extraPath = EXTRA_JSON;
  const jsSrc = fs.readFileSync(jsPath, 'utf8');
  const baseSites = parseWebsitesFromProgramsJs(jsSrc);
  let extraSites = [];
  try {
    const extra = JSON.parse(fs.readFileSync(extraPath, 'utf8'));
    extraSites = (extra || []).map((p) => p.website).filter(Boolean);
  } catch {}

  // Normalize separately so we can support --only-new
  const baseNorm = unique(baseSites.map(normalizeUrl)).filter(Boolean);
  const extraNorm = unique(extraSites.map(normalizeUrl)).filter(Boolean);
  const baseSet = new Set(baseNorm);
  let all = onlyNew
    ? unique(extraNorm.filter((u) => !baseSet.has(u)))
    : unique([...baseNorm, ...extraNorm]);

  all = all
    .filter(Boolean)
    // Filter out known placeholders
    .filter((u) => !/\bexample\.(com|org|net)\b/i.test(u));

  if (all.length === 0) {
    console.log('No websites found to check.');
    process.exit(0);
  }

  // Apply fast defaults if requested (unless explicitly overridden)
  const totalBeforeLimit = all.length;
  const effectiveTimeout = timeoutArg ?? (isFast ? 6000 : 12000);
  const effectiveConcurrency = concurrencyArg ?? (isFast ? 20 : 6);
  const effectiveLimit = limitArg ?? (isFast ? 80 : undefined);
  if (effectiveLimit && all.length > effectiveLimit) {
    all = all.slice(0, effectiveLimit);
  }

  if (isFast) {
    console.log(`FAST mode: checking ${all.length}/${totalBeforeLimit} sites | concurrency=${effectiveConcurrency} | timeout=${effectiveTimeout}ms${onlyNew ? ' | only-new' : ''}`);
  } else {
    console.log(`Checking ${all.length} websites...${onlyNew ? ' (only-new)' : ''}`);
  }
  const results = [];
  // Limit concurrency
  const concurrency = effectiveConcurrency;
  let i = 0;
  async function worker() {
    while (i < all.length) {
      const idx = i++;
      const url = all[idx];
      const res = await checkUrl(url, { timeoutMs: effectiveTimeout });
      // browser-likely OK assessment
      let okBrowser = false;
      if (!res.ok) {
        try {
          const host = new URL(url).hostname;
          if (res.status === 403) {
            okBrowser = ALLOW_BROWSER_403.some((r) => r.test(host));
          } else if (res.status === 0) {
            okBrowser = ALLOW_BROWSER_NETFAIL.some((r) => r.test(host));
          }
        } catch {}
      }
      res.okBrowser = okBrowser;
      console.log(`${idx + 1}/${all.length} ${url} -> ${res.status}${res.ok ? ' OK' : (okBrowser ? ' (browser OK)' : ' FAIL')}`);
      results.push(res);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));

  results.sort((a, b) => (a.ok === b.ok ? a.url.localeCompare(b.url) : a.ok ? 1 : -1));

  fs.writeFileSync(OUT_JSON, JSON.stringify(results, null, 2), 'utf8');
  fs.writeFileSync(OUT_CSV, toCsv(results), 'utf8');

  const bad = results.filter((r) => !r.ok && !r.okBrowser);
  // Publish a compact public status file for the UI
  try {
    const summary = {
      lastChecked: new Date().toISOString(),
      checkedCount: results.length,
      okCount: results.filter((r) => r.ok).length,
      browserOkCount: results.filter((r) => !r.ok && r.okBrowser).length,
      badCount: bad.length,
      allOk: bad.length === 0,
      partial: effectiveLimit ? results.length < totalBeforeLimit : false,
      mode: isFast ? 'fast' : 'full',
      onlyNew,
    };
    fs.writeFileSync(PUBLIC_STATUS, JSON.stringify(summary, null, 2), 'utf8');
  } catch (e) {
    console.warn('Warning: failed to write public link health status:', e.message || e);
  }
  console.log(`\nReport saved to:\n- ${OUT_JSON}\n- ${OUT_CSV}`);
  if (bad.length) {
    console.log(`\nBroken or unreachable (${bad.length}):`);
    bad.forEach((b) => console.log(`- [${b.status}] ${b.url} ${b.error ? '— ' + b.error : ''}`));
    process.exitCode = 1;
  } else {
    console.log('\nAll links look OK.');
  }
})();
