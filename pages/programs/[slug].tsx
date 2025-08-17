import type { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { getAllPrograms } from '../../data/programs';

function toSlug(title: string) {
  return (title || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function ProgramDetail({ program }: { program: any }) {
  const normalizeUrl = (url?: string) => {
    if (!url) return '#';
    const t = url.trim();
    if (/^https?:\/\//i.test(t)) return t;
    return `https://${t}`;
  };
  const isFree = (price?: string) => {
    const p = (price || '').toLowerCase();
    if (!p) return true;
    if (p.includes('free') || p.includes('open source')) return true;
    if (p.replace(/[^0-9]/g, '') === '0') return true;
    return false;
  };
  if (!program) {
    return (
      <main className="min-h-screen bg-secondary p-8 text-center">
        <h1 className="text-2xl font-bold">Program not found</h1>
        <Link href="/programs" className="text-primary underline">Back to programs</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-secondary p-6">
      <Head>
        <title>{`${program.title} | Autism and Me`}</title>
        <meta name="description" content={program.description?.slice(0, 155)} />
      </Head>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg border border-border shadow-sm">
        <div className="flex items-start gap-4">
          <img src={program.imageUrl || '/images/placeholder.svg'} alt={program.title} className="w-28 h-28 rounded-lg object-cover" loading="lazy" decoding="async" />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-primary">{program.title}</h1>
            <div className="mt-2 text-sm text-textSecondary">
              <span className="mr-2">Category: {program.category}</span>
              <span className="mr-2">Country: {program.country}</span>
              {program.platforms?.length ? (<span>Platforms: {program.platforms.join(', ')}</span>) : null}
            </div>
          </div>
        </div>

        <p className="mt-4 text-textPrimary">{program.description}</p>

        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          {program.researchBacked && (<span className="bg-green-100 text-green-800 px-2 py-1 rounded">Research-backed</span>)}
          {program.featured && (<span className="bg-accent text-white px-2 py-1 rounded">Featured</span>)}
          {program.price && (<span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{program.price}</span>)}
          {isFree(program.price) && (<span className="bg-green-100 text-green-800 px-2 py-1 rounded">Free</span>)}
        </div>

        <div className="mt-6 flex gap-3">
          {program.website && (
            <a href={normalizeUrl(program.website)} rel="noopener noreferrer nofollow" className="bg-primary hover:bg-accent text-white px-4 py-2 rounded">Visit Website</a>
          )}
          <Link href="/programs" className="bg-gray-100 hover:bg-gray-200 text-textPrimary px-4 py-2 rounded">Back</Link>
        </div>
      </div>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const programs = getAllPrograms();
  const paths = programs.map((p: any) => ({ params: { slug: toSlug(p.title) } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = String(ctx.params?.slug || '');
  const programs = getAllPrograms();
  const program = programs.find((p: any) => toSlug(p.title) === slug) || null;
  if (!program) {
    return { notFound: true };
  }
  return { props: { program }, revalidate: 3600 };
};
