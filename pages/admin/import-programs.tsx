import { useMemo, useState } from 'react';

function parseCSV(text: string) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];
  const headers = splitCSVLine(lines[0]);
  return lines.slice(1).map((line, idx) => {
    const cols = splitCSVLine(line);
    const get = (name: string) => cols[headers.findIndex(h => h.toLowerCase() === name.toLowerCase())] || '';
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
      imageUrl: get('imageUrl') || `/images/programs/${(get('title')||'').toLowerCase().replace(/[^a-z0-9]+/g,'-')}.jpg`,
      featured: /true|yes|1/i.test(get('featured')),
      tags: (get('tags') || '').split('|').filter(Boolean),
    };
  });
}

function splitCSVLine(line: string) {
  const res: string[] = [];
  let cur = '';
  let q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { q = !q; continue; }
    if (ch === ',' && !q) { res.push(cur.trim()); cur=''; }
    else { cur += ch; }
  }
  res.push(cur.trim());
  return res;
}

export default function ImportPrograms() {
  const [csv, setCsv] = useState('');
  const data = useMemo(() => parseCSV(csv), [csv]);

  const jsonStr = useMemo(() => JSON.stringify(data, null, 2), [data]);

  return (
    <main className="min-h-screen bg-secondary p-6">
      <section className="max-w-6xl mx-auto space-y-6">
        <header className="bg-primary p-6 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold text-textPrimary">Import Programs (CSV → JSON)</h1>
          <p className="text-textPrimary mt-1">Paste CSV with headers: title, description, category, country, website, featured, tags, price, rating, platforms, ageGroup, researchBacked, imageUrl</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg border border-border">
            <label className="block text-sm font-medium mb-2">CSV Input</label>
            <textarea
              value={csv}
              onChange={(e) => setCsv(e.target.value)}
              className="w-full h-96 p-3 border border-border rounded-lg font-mono text-sm"
              placeholder="Paste CSV here (comma separated, use quotes for commas in text)"
            />
            <div className="text-sm text-textSecondary mt-2">
              Tip: Use | to separate multiple platforms or tags (e.g., iOS|Android|Web)
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">Preview JSON ({data.length} items)</label>
              <button
                onClick={() => {
                  const blob = new Blob([jsonStr], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'programs-extra.json';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="bg-primary hover:bg-accent text-white text-sm px-3 py-1 rounded"
              >
                Download JSON
              </button>
            </div>
            <pre className="w-full h-96 p-3 border border-border rounded-lg overflow-auto text-xs bg-gray-50">{jsonStr}</pre>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-border">
          <h2 className="text-lg font-semibold mb-2">How to use</h2>
          <ol className="list-decimal pl-5 space-y-1 text-sm text-textSecondary">
            <li>Paste your CSV into the left box.</li>
            <li>Click Download JSON.</li>
            <li>Save the file as <code>data/programs-extra.json</code> in your project.</li>
            <li>Refresh <code>/programs</code> — the new resources will appear.</li>
          </ol>
        </div>
      </section>
    </main>
  );
}
