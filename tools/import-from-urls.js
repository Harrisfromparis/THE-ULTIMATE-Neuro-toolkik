#!/usr/bin/env node
/**
 * Import plain URL list into data/programs-extra.json as minimal program entries.
 * Usage: node tools/import-from-urls.js tools/urls.txt
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const EXTRA = path.join(ROOT, 'data', 'programs-extra.json');

function normalizeUrl(u) {
  if (!u) return '';
  const t = String(u).trim();
  if (!t) return '';
  if (/^https?:\/\//i.test(t)) return t;
  if (/^[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i.test(t)) return `https://${t}`;
  return '';
}

function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/https?:\/\//, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'resource';
}

function titleFromUrl(u) {
  try {
    const { hostname } = new URL(u);
    const base = hostname.replace(/^www\./, '');
    return base
      .split('.')
      .filter((p) => p && p !== 'com' && p !== 'org' && p !== 'net')
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(' ');
  } catch {
    return slugify(u).replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
  }
}

function loadExtra() {
  try {
    return JSON.parse(fs.readFileSync(EXTRA, 'utf8')) || [];
  } catch {
    return [];
  }
}

function main() {
  const file = process.argv[2];
  if (!file) {
    console.error('Usage: node tools/import-from-urls.js tools/urls.txt');
    process.exit(1);
  }
  const input = fs.readFileSync(file, 'utf8');
  const lines = input.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const urls = Array.from(new Set(lines.map(normalizeUrl).filter(Boolean)));

  const existing = loadExtra();
  const existingKeys = new Set(
    existing.map((p) => `${(p.title||'').toLowerCase()}::${(p.website||'').toLowerCase()}`)
  );

  let nextIdBase = (existing.reduce((m, p) => Math.max(m, p.id || 1000), 1000) + 1) || 1001;

  const added = [];
  for (const u of urls) {
    const t = titleFromUrl(u) || 'Resource';
    const key = `${t.toLowerCase()}::${u.toLowerCase()}`;
    if (existingKeys.has(key)) continue;
    const slug = slugify(t);
    const item = {
      id: nextIdBase++,
      title: t,
      description: `${t} — verified resource URL imported from list.`,
      category: 'Information & Support',
      country: 'Global',
      price: 'Free',
      platforms: ['Web'],
      ageGroup: 'All Ages',
      researchBacked: false,
      website: u,
      imageUrl: `/images/programs/${slug}.jpg`,
      featured: false,
      tags: ['imported']
    };
    existing.push(item);
    existingKeys.add(key);
    added.push(item);
  }

  fs.writeFileSync(EXTRA, JSON.stringify(existing, null, 2), 'utf8');
  console.log(`Imported ${added.length} URLs into ${path.relative(ROOT, EXTRA)}.`);
  console.log('Next: npm run check:links');
}

main();
