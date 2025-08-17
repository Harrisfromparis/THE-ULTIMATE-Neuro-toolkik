// tools/export/programs-to-csv.js
// Usage: node tools/export/programs-to-csv.js > tools/programs-export.csv

const fs = require('fs');
const path = require('path');

const HEADERS = [
  'title','description','category','country','website','featured','tags','price','rating','platforms','ageGroup','researchBacked','imageUrl'
];

function csvEscape(value) {
  if (value == null) return '';
  const s = String(value);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

function toCSV(rows) {
  const header = HEADERS.join(',');
  const lines = rows.map(row => {
    return HEADERS
      .map(h => {
        let v = row[h];
        if (Array.isArray(v)) {
          // platforms/tags -> pipe-separated
          v = v.join('|');
        }
        return csvEscape(v);
      })
      .join(',');
  });
  return [header, ...lines].join('\n');
}

function main() {
  const extraPath = path.resolve(__dirname, '../../data/programs-extra.json');
  let data = [];
  if (fs.existsSync(extraPath)) {
    data = JSON.parse(fs.readFileSync(extraPath, 'utf8'));
  }
  const csv = toCSV(data);
  process.stdout.write(csv);
}

if (require.main === module) {
  main();
}

module.exports = { toCSV };
