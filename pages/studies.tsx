import Head from 'next/head';
import studies from '../data/studies-2024-2025.json';

type Study = {
  id: number;
  title: string;
  authors: string;
  institution: string;
  year: number;
  region: string;
  summary: string;
  url: string;
};

const regionsOrder = [
  'Global & Europe',
  'United States',
  'Canada',
  'Australia',
  'Asia',
  'Latin America',
];

export default function StudiesPage() {
  const items = (studies as Study[]).slice().sort((a, b) => {
    const rA = regionsOrder.indexOf(a.region);
    const rB = regionsOrder.indexOf(b.region);
    if (rA !== rB) return rA - rB;
    return b.year - a.year;
  });
  const grouped = items.reduce<Record<string, Study[]>>((acc, s) => {
    acc[s.region] = acc[s.region] || [];
    acc[s.region].push(s);
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-secondary p-6">
      <Head>
        <title>Recent Studies (2024–2025) | Autism and Me</title>
        <meta name="description" content="Curated global studies on neurodiversity, autism, belonging, and education (2024–2025)." />
      </Head>
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Recent Studies (2024–2025)</h1>
          <p className="text-textSecondary">Neurodiversity, autism, learning needs, belonging, and education — organized by region.</p>
        </header>

        {regionsOrder.map((region) => (
          <section key={region} className="mb-10">
            <h2 className="text-2xl font-semibold text-primary mb-4">{region}</h2>
            <div className="space-y-4">
              {(grouped[region] || []).map((s) => (
                <article key={s.id} className="bg-white border border-border rounded-lg p-4 shadow-sm">
                  <h3 className="text-xl font-semibold text-textPrimary">{s.title}</h3>
                  <p className="text-sm text-textSecondary mt-1">{s.authors} • {s.institution} • {s.year}</p>
                  <p className="mt-2 text-textPrimary">{s.summary}</p>
                  <div className="mt-3">
                    <a href={s.url} className="text-primary underline" rel="noopener noreferrer nofollow">Direct link</a>
                  </div>
                </article>
              ))}
              {(grouped[region] || []).length === 0 && (
                <p className="text-textSecondary">No entries yet for this region.</p>
              )}
            </div>
          </section>
        ))}

        <footer className="text-center text-sm text-textSecondary mt-12">
          Source list curated from university repositories and journals. Links are provided for convenience.
        </footer>
      </div>
    </main>
  );
}
