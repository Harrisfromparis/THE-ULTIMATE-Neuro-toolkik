import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

type SearchItem = {
  type: 'page' | 'section' | 'entitlement' | 'glossary' | 'link';
  title: string;
  description?: string;
  url: string;
  tags?: string[];
  keywords?: string[];
};

type SearchIndex = {
  updatedAt: string;
  total: number;
  items: SearchItem[];
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<SearchIndex | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    fetch('/search-index.json')
      .then((r) => r.json())
      .then((j: SearchIndex) => { if (isMounted) setData(j); })
      .catch((e) => { if (isMounted) setError('Failed to load search index'); console.error(e); });
    return () => { isMounted = false; };
  }, []);

  // Prefill from ?q=
  useEffect(() => {
    if (!router.isReady) return;
    const q = (router.query.q as string) || '';
    if (q) setQuery(q);
  }, [router.isReady, router.query.q]);

  const results = useMemo(() => {
    if (!data) return [] as SearchItem[];
    const q = query.trim().toLowerCase();
    if (!q) return data.items.slice(0, 30);
    const terms = q.split(/\s+/).filter(Boolean);

    function score(it: SearchItem): number {
      let s = 0;
      const hay = `${it.title} ${it.description || ''} ${(it.tags||[]).join(' ')} ${(it.keywords||[]).join(' ')}`.toLowerCase();
      for (const t of terms) {
        if (hay.includes(t)) s += 2;
        if ((it.title || '').toLowerCase().includes(t)) s += 3;
      }
      // Boost based on type
      if (it.type === 'section' || it.type === 'entitlement') s += 1;
      if (it.type === 'page') s += 0.5;
      return s;
    }

    return data.items
      .map((it) => ({ it, s: score(it) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 50)
      .map((x) => x.it);
  }, [data, query]);

  return (
    <div className="min-h-screen" style={{backgroundColor: '#f0fffe'}}>
      <Head>
        <title>Search | Autism & Education Resources</title>
        <meta name="description" content="Search autism A–Z, newly diagnosed, entitlements, and resources." />
      </Head>

      <header className="border-b p-8 text-center" style={{backgroundColor: '#7dd3c0', borderColor: '#6db3a0'}}>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">Search</h1>
        <p className="text-white/90 text-sm max-w-3xl mx-auto">Search autism resources, entitlements, and educational programs</p>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-lg p-4 shadow border border-slate-200 mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search e.g. DCA application, autism unit, OT, RACE, IEP, SNA, SUSI, PECS..."
            className="w-full p-3 border border-slate-200 rounded focus:outline-none focus:ring"
          />
          {data && (
            <div className="text-xs text-slate-500 mt-2">Index updated {new Date(data.updatedAt).toLocaleString()} • {data.total} items</div>
          )}
          {error && (
            <div className="text-sm text-red-600 mt-2">{error}</div>
          )}
        </div>

        <div className="space-y-3">
          {results.map((r, i) => (
            <a key={i} href={r.url} className="block bg-white rounded-lg p-4 shadow border border-slate-200 hover:shadow-md transition">
              <div className="flex items-center gap-2 text-xs text-slate-600 mb-1">
                <span className="px-2 py-0.5 rounded bg-slate-100 border capitalize">{r.type}</span>
                {r.tags && r.tags.slice(0,3).map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-slate-50 border text-slate-600">{t}</span>
                ))}
              </div>
              <h3 className="text-lg font-semibold text-cyan-700">{r.title}</h3>
              {r.description && <p className="text-sm text-slate-700 mt-1">{r.description}</p>}
              <div className="text-xs text-slate-400 mt-1">{r.url}</div>
            </a>
          ))}
          {!results.length && (
            <div className="text-center text-slate-600">No results. Try different keywords (e.g., "SNA", "DCA", "IEP", "PLU", "Autism unit").</div>
          )}
        </div>
      </main>
    </div>
  );
}
