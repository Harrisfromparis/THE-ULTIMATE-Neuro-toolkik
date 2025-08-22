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

export default function FullResourcesCataloguePage({ data, hadFile }: Props) {
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
  const [sortBy, setSortBy] = useState<string>('Title A–Z');
  const [groupByCategory, setGroupByCategory] = useState<boolean>(true);

  const filtered = useMemo(() => {
    const qNorm = q.trim().toLowerCase();
    let result = items.filter((it) => {
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

    // Apply sorting
    if (sortBy === 'Title A–Z') {
      result.sort((a, b) => (a.title || a.url).localeCompare(b.title || b.url));
    } else if (sortBy === 'Title Z–A') {
      result.sort((a, b) => (b.title || b.url).localeCompare(a.title || a.url));
    }

    return result;
  }, [items, category, subCategory, source, q, sortBy]);

  const grouped = useMemo(() => groupByCategory ? (() => {
    const map: Record<string, LinkItem[]> = {};
    for (const it of filtered) {
      const cat = it.category || it.source || 'Other';
      if (!map[cat]) map[cat] = [];
      map[cat].push(it);
    }
    return map;
  })() : { 'All Resources': filtered }, [filtered, groupByCategory]);

  const groupKeys = useMemo(() => Object.keys(grouped).sort(), [grouped]);

  return (
    <div className="min-h-screen" style={{backgroundColor: '#eaf8f7', fontFamily: 'Maven Pro, sans-serif'}}>
      <Head>
        <title>Resources Catalogue | Autism and Me</title>
        <meta name="description" content="Clean, neutral embed. No logo, no dynamic app chrome. Complete A-Z catalogue of 501+ autism and neurodiversity resources." />
      </Head>

      <header className="py-6 px-4" style={{backgroundColor: '#71d0c8', color: '#eaf8f7'}}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Resources Catalogue</h1>
          <p className="mt-2 opacity-90">Clean, neutral embed. No logo, no dynamic app chrome.</p>
          {data.updatedAt && (
            <p className="mt-1 text-sm opacity-80">
              Updated {new Date(data.updatedAt).toLocaleDateString('en-GB')} • {data.total || items.length} items
            </p>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by title, URL, label..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                style={{fontFamily: 'Maven Pro, sans-serif'}}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                style={{fontFamily: 'Maven Pro, sans-serif'}}
              >
                <option>All</option>
                {allCategories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Subcategory */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                style={{fontFamily: 'Maven Pro, sans-serif'}}
              >
                <option>All</option>
                {allSubCategories.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Source */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                style={{fontFamily: 'Maven Pro, sans-serif'}}
              >
                <option>All</option>
                {allSources.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                style={{fontFamily: 'Maven Pro, sans-serif'}}
              >
                <option>Title A–Z</option>
                <option>Title Z–A</option>
              </select>
            </div>
          </div>

          {/* Toggle and Clear */}
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={groupByCategory}
                onChange={(e) => setGroupByCategory(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700" style={{fontFamily: 'Maven Pro, sans-serif'}}>Group by category</span>
            </label>
            <button
              onClick={() => {
                setQ('');
                setCategory('All');
                setSubCategory('All');
                setSource('All');
              }}
              className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              style={{fontFamily: 'Maven Pro, sans-serif'}}
            >
              Clear filters
            </button>
            <span className="text-sm text-gray-600" style={{fontFamily: 'Maven Pro, sans-serif'}}>
              Showing {filtered.length} of {items.length}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {!hadFile ? (
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-gray-600">
              <p>No generated catalogue found. Run: <code className="bg-gray-100 px-2 py-1 rounded">npm run export:links</code> to create <code className="bg-gray-100 px-2 py-1 rounded">public/links-catalogue.json</code>.</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-gray-600">
              <p>No results. Try adjusting filters.</p>
            </div>
          ) : (
            groupKeys.map((cat) => (
              <div key={cat} className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4" style={{color: '#71d0c8', fontFamily: 'Maven Pro, sans-serif'}}>
                  {cat}
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    {grouped[cat].length} items
                  </span>
                </h2>
                
                <div className="space-y-3">
                  {grouped[cat].map((item, idx) => (
                    <div key={`${item.url}-${idx}`} className="border-l-4 border-teal-500 pl-4 py-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1" style={{fontFamily: 'Maven Pro, sans-serif'}}>
                            {item.title || new URL(item.url).hostname}
                          </h3>
                          <div className="flex flex-wrap gap-2 text-xs">
                            <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {item.source}
                            </span>
                            {item.subCategory && (
                              <span className="inline-block bg-teal-100 text-teal-800 px-2 py-1 rounded">
                                {item.subCategory}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="inline-block px-4 py-2 text-sm text-white rounded hover:opacity-90 transition-opacity"
                            style={{backgroundColor: '#71d0c8', fontFamily: 'Maven Pro, sans-serif'}}
                          >
                            {item.label || 'Website'}
                          </a>
                          <span className="text-xs text-gray-500">
                            {new URL(item.url).hostname}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
