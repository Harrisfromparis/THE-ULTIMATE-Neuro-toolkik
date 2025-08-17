// tools/import-from-csv.js
// Usage: node tools/import-from-csv.js path/to/file.csv > data/programs-extra.json

const fs = require('fs');
const path = require('path');

function parseCSVLine(line) {
  // naive CSV split supporting quoted commas
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

function convertCSVToPrograms(csv) {
  const lines = csv.split(/\r?\n/).filter(Boolean);
  const headers = parseCSVLine(lines[0]);
  const rows = lines.slice(1).map(parseCSVLine);

  const headerIndex = (name) => headers.findIndex(h => h.toLowerCase() === name.toLowerCase());

  const out = rows.map((cols, idx) => {
    const get = (name) => cols[headerIndex(name)] || '';
    return {
      id: idx + 1000,
      title: get('title'),
      description: get('description'),
      category: get('category'),
      country: get('country') || 'Global',
      rating: parseFloat(get('rating')) || undefined,
      price: get('price') || undefined,
      platforms: (get('platforms') || '').split('|').filter(Boolean),
      ageGroup: get('ageGroup') || '',
      researchBacked: /true|yes|1/i.test(get('researchBacked')),
      website: get('website'),
      imageUrl: get('imageUrl') || `/images/programs/${get('title').toLowerCase().replace(/[^a-z0-9]+/g,'-')}.jpg`,
      featured: /true|yes|1/i.test(get('featured')),
      tags: (get('tags') || '').split('|').filter(Boolean),
    };
  });

  return out;
}

function main() {
  const file = process.argv[2];
  if (!file) {
    console.error('Usage: node tools/import-from-csv.js <csv-file>');
    process.exit(1);
  }
  const csv = fs.readFileSync(path.resolve(file), 'utf8');
  const programs = convertCSVToPrograms(csv);
  process.stdout.write(JSON.stringify(programs, null, 2));
}

if (require.main === module) {
  main();
}

module.exports = { convertCSVToPrograms };
