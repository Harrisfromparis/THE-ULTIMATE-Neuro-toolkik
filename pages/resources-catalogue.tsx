import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import { GetStaticProps } from 'next';
import { useMemo, useState } from 'react';

type LinkItem = {
  source: string;
  category?: string;
  subCategory?: string;
  title?: string;
  label?: string;
  url: string;
};

type CatalogueData = {
  updatedAt?: string;
  total?: number;
  items: LinkItem[];
};

type Props = {
  data: CatalogueData;
  hadFile: boolean;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const publicFile = path.join(process.cwd(), 'public', 'links-catalogue.json');
  let hadFile = false;
  let data: CatalogueData = { items: [] };
  try {
    const src = fs.readFileSync(publicFile, 'utf8');
    const parsed = JSON.parse(src);
    if (parsed && Array.isArray(parsed.items)) {
      data = parsed;
      hadFile = true;
    }
  } catch {
    // file missing or invalid; provide empty dataset with hint to generate
    data = { items: [] };
  }
  return { props: { data, hadFile } };
};

function groupByCategory(items: LinkItem[]) {
  const map: Record<string, LinkItem[]> = {};
  for (const it of items) {
    const cat = it.category || it.source || 'Other';
    if (!map[cat]) map[cat] = [];
    map[cat].push(it);
  }
  // sort within groups
  for (const key of Object.keys(map)) {
    map[key].sort((a, b) =>
      (a.subCategory || '').localeCompare(b.subCategory || '') || (a.title || '').localeCompare(b.title || '')
    );
  }
  return map;
}

export default function ResourcesCataloguePage({ data, hadFile }: Props) {
  const items = data.items || [];

  // Derive filter options
  const allCategories = useMemo(
    () => Array.from(new Set(items.map((i) => i.category || i.source || 'Other'))).sort(),
    [items]
  );
  const allSubCategories = useMemo(
    () => Array.from(new Set(items.map((i) => i.subCategory || '').filter(Boolean))).sort(),
    [items]
  );
  const allSources = useMemo(
    () => Array.from(new Set(items.map((i) => i.source))).sort(),
    [items]
  );

  // Filters
  const [category, setCategory] = useState<string>('All');
  const [subCategory, setSubCategory] = useState<string>('All');
  const [source, setSource] = useState<string>('All');
  const [q, setQ] = useState<string>('');

  const filtered = useMemo(() => {
    const qNorm = q.trim().toLowerCase();
    return items.filter((it) => {
      if (category !== 'All') {
        const cat = it.category || it.source || 'Other';
        if (cat !== category) return false;
      }
      if (subCategory !== 'All') {
        if ((it.subCategory || '') !== subCategory) return false;
      }
      if (source !== 'All') {
        if (it.source !== source) return false;
      }
      if (qNorm) {
        const hay = `${it.title || ''} ${it.url} ${it.label || ''} ${it.category || ''} ${it.subCategory || ''}`.toLowerCase();
        if (!hay.includes(qNorm)) return false;
      }
      return true;
    });
  }, [items, category, subCategory, source, q]);

  const grouped = useMemo(() => groupByCategory(filtered), [filtered]);
  const groupKeys = useMemo(() => Object.keys(grouped).sort(), [grouped]);

  return (
    <main className="min-h-screen" style={{backgroundColor: '#f0fffe'}}>
      <Head>
        <title>Resources Catalogue | Autism and Me</title>
        <meta name="description" content="Visual catalogue of all external resources grouped by category with search and filters." />
      </Head>

      <header className="border-b py-8 px-6" style={{backgroundColor: '#7dd3c0', borderColor: '#6db3a0'}}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Resources Catalogue</h1>
          <p className="text-white/90 mt-2 text-sm">Visual catalogue of all external resources grouped by category with search and filters</p>
          {!hadFile && (
            <p className="mt-3 text-white/80 text-sm">
              Hint: No generated catalogue found. Run: <code>npm run export:links</code> to create <code>public/links-catalogue.json</code>.
            </p>
          )}
          {data.updatedAt && (
            <p className="mt-1 text-white/80 text-sm">Last updated: {new Date(data.updatedAt).toLocaleString()}</p>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters */}
        <aside className="bg-white border border-slate-200 rounded-lg p-4 h-max">
          <h2 className="text-lg font-semibold mb-3 text-slate-900">Filters</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Search</label>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by title, URL, label..."
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm bg-white"
              >
                <option>All</option>
                {allCategories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Subcategory</label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm bg-white"
              >
                <option>All</option>
                {allSubCategories.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Source</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm bg-white"
              >
                <option>All</option>
                {allSources.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <button
                onClick={() => {
                  setQ('');
                  setCategory('All');
                  setSubCategory('All');
                  setSource('All');
                }}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 rounded px-3 py-2 text-sm"
              >
                Clear filters
              </button>
            </div>
          </div>
          <div className="mt-4 text-xs text-slate-600">Showing {filtered.length} of {items.length}</div>
        </aside>

        {/* Content */}
        <section className="lg:col-span-3">
          {filtered.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-lg p-6 text-slate-600">No results. Try adjusting filters.</div>
          ) : (
            groupKeys.map((cat) => (
              <div key={cat} className="mb-8">
                <h2 className="text-2xl font-semibold text-teal-600 mb-4">{cat}</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {grouped[cat].map((it, idx) => (
                    <article key={`${it.url}-${idx}`} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-slate-900 line-clamp-2">{it.title || it.url}</h3>
                      <div className="mt-1 text-xs text-slate-600">
                        <span className="inline-block bg-slate-100 border border-slate-200 rounded px-2 py-0.5 mr-2">{it.source}</span>
                        {it.subCategory && (
                          <span className="inline-block bg-slate-100 border border-slate-200 rounded px-2 py-0.5">{it.subCategory}</span>
                        )}
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <a
                          href={it.url}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="inline-block text-sm bg-teal-600 text-white px-3 py-2 rounded hover:bg-teal-700 transition-colors"
                        >
                          {it.label || 'Open'}
                        </a>
                        <a
                          href={it.url}
                          className="text-xs text-cyan-700 underline break-all ml-3"
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                        >
                          {new URL(it.url).hostname}
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
