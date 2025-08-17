import { GetStaticProps } from 'next';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';

type Country = {
  country: string;
  region: string;
  binding: boolean;
  instrumentTitle: string;
  year: number;
  scope: string;
  summary: string;
  sources?: string[];
};

type Props = {
  updatedAt: string;
  countries: Country[];
};

export default function Strategies({ updatedAt, countries }: Props) {
  const euLaw = [
    { title: 'EU Web Accessibility Directive (EU) 2016/2102', url: 'https://eur-lex.europa.eu/eli/dir/2016/2102/oj' },
    { title: 'European Accessibility Act (EU) 2019/882', url: 'https://eur-lex.europa.eu/eli/dir/2019/882/oj' },
    { title: 'Equal Treatment in Employment Directive 2000/78/EC', url: 'https://eur-lex.europa.eu/eli/dir/2000/78/oj' },
    { title: 'EU approval of UN CRPD (2010/48/EC)', url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32010D0048' }
  ];

  const cases = [
    { title: 'G.L. v. Italy (ECtHR) – Autism and inclusive education', url: 'https://hudoc.echr.coe.int/eng?i=001-204685' },
    { title: 'Enver Şahin v. Turkey (ECtHR) – Accessibility in higher education', url: 'https://hudoc.echr.coe.int/eng?i=001-180491' },
    { title: 'Çam v. Turkey (ECtHR Grand Chamber) – Access to music academy', url: 'https://hudoc.echr.coe.int/eng?i=001-162759' }
  ];

  const euImplications = [
    'Member States must transpose and enforce EU directives. Failure can trigger infringement proceedings by the European Commission, leading to CJEU judgments and potential fines until compliance.',
    'Individuals and NGOs can use national remedies citing EU law (e.g., accessibility and non-discrimination) and the UN CRPD as interpreted by EU law.',
    'Public procurement must include accessibility requirements; products/services covered by the Accessibility Act must meet accessibility standards.',
  ];

  async function submitPetition(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;
    if (btn) btn.disabled = true;
    try {
      const res = await fetch('/api/petition', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const json = await res.json();
      alert(res.ok ? 'Thanks for signing! Current count: ' + json.count : 'Error: ' + (json.error || 'Please try again'));
      if (res.ok) form.reset();
    } catch {
      alert('Network error. Please try again.');
    } finally {
      if (btn) btn.disabled = false;
    }
  }

  return (
    <div className="min-h-screen bg-secondary">
      <Head>
        <title>Legally Binding Autism Strategies and EU Law</title>
        <meta name="description" content="Compare legally binding national autism strategies and EU legal obligations; support Irish legislation with a petition." />
      </Head>

      <header className="bg-primary p-6 text-center">
        <h1 className="text-4xl font-bold text-textPrimary">Autism Strategies, EU Law, and Ireland’s Position</h1>
        <p className="text-textPrimary/80 mt-2">Data last updated: {updatedAt}</p>
      </header>

      <main className="p-6 max-w-6xl mx-auto">
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-2">What is legally binding in the EU?</h2>
          <p className="mb-4 text-textPrimary">Key EU instruments establishing enforceable obligations benefiting neurodivergent individuals:</p>
          <ul className="list-disc ml-6 space-y-1">
            {euLaw.map((l) => (
              <li key={l.url}><a className="text-blue-700 underline" href={l.url} target="_blank" rel="noopener noreferrer">{l.title}</a></li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold mt-4">Implications of non-compliance</h3>
          <ul className="list-disc ml-6 space-y-1">
            {euImplications.map((t, i) => (<li key={i}>{t}</li>))}
          </ul>
          <h3 className="text-xl font-semibold mt-4">Relevant European Court judgments</h3>
          <ul className="list-disc ml-6 space-y-1">
            {cases.map((c) => (
              <li key={c.url}><a className="text-blue-700 underline" href={c.url} target="_blank" rel="noopener noreferrer">{c.title}</a></li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Countries with binding autism legislation vs policy</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {countries.sort((a,b)=> Number(b.binding) - Number(a.binding) || a.country.localeCompare(b.country)).map((c) => (
              <div key={c.country} className={`border rounded p-4 ${c.binding ? 'border-green-500' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{c.country}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${c.binding ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{c.binding ? 'Legally binding' : 'Policy / general law'}</span>
                </div>
                <p className="text-sm text-gray-600">{c.region} • {c.scope} • {c.year}</p>
                <p className="mt-2 font-medium">{c.instrumentTitle}</p>
                <p className="text-sm mt-1">{c.summary}</p>
                {c.sources && c.sources.length > 0 && (
                  <ul className="list-disc ml-6 mt-2">
                    {c.sources.map((s, i) => (
                      <li key={i}><a className="text-blue-700 underline" href={s} target="_blank" rel="noopener noreferrer">Source {i+1}</a></li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-600">Note: Many European countries implement autism through general disability law plus policies; binding autism-specific acts currently include England, Northern Ireland, Wales (statutory code) and Malta; outside Europe, Brazil has a national autism law; the US guarantees rights via ADA/IDEA.</p>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <h3 className="font-semibold">Where Ireland stands</h3>
            <p>Ireland currently has a national autism strategy but not an Autism Act. Enforceable rights depend on equality and education laws and EU obligations. The ask: enact primary legislation that sets clear duties, timelines, and accountability for autism supports.</p>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-2">Petition: Enshrine rights of neurodivergent individuals in Irish law</h2>
          <p className="text-textPrimary mb-4">Add your name to call for urgent, specific legislation that guarantees access, support, and non-discrimination for autistic and other neurodivergent people in Ireland.</p>
          <form onSubmit={submitPetition} className="grid md:grid-cols-3 gap-3 items-end">
            <label className="block">
              <span className="text-sm">Full name</span>
              <input name="name" required minLength={2} className="mt-1 w-full border rounded px-3 py-2" placeholder="Jane Doe" />
            </label>
            <label className="block">
              <span className="text-sm">Email (optional)</span>
              <input type="email" name="email" className="mt-1 w-full border rounded px-3 py-2" placeholder="jane@example.com" />
            </label>
            <label className="block">
              <span className="text-sm">City/Town (optional)</span>
              <input name="city" className="mt-1 w-full border rounded px-3 py-2" placeholder="Dublin" />
            </label>
            <div className="md:col-span-3">
              <button type="submit" className="bg-primary hover:bg-accent text-textPrimary font-medium py-2 px-6 rounded shadow">
                Sign Petition
              </button>
            </div>
          </form>
          <p className="text-xs text-gray-500 mt-2">Your data is used only to count signatures. Replace this demo with a secure database-backed store before going live.</p>
        </section>
      </main>

      <footer className="text-center p-4 bg-primary text-white mt-8">
        <p>&copy; 2025 www.autismandme.ie</p>
      </footer>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(process.cwd(), 'data', 'autism-strategies.json');
  const raw = fs.readFileSync(file, 'utf-8');
  const json = JSON.parse(raw);
  return {
    props: {
      updatedAt: json.updatedAt || '',
      countries: json.countries || [],
    },
  };
};
