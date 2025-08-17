import fs from 'fs';
import path from 'path';
import Head from 'next/head';

type Game = {
  name: string;
  genre: string;
  website: string;
  playUrl?: string;
  license?: string;
  platforms?: string[];
  blurb?: string;
};

type Props = { games: Game[] };

export default function GamesPage({ games }: Props) {
  const byGenre = games.reduce<Record<string, Game[]>>((acc, g) => {
    const key = g.genre || 'Other';
    (acc[key] ||= []).push(g);
    return acc;
  }, {});
  const genres = Object.keys(byGenre).sort((a, b) => a.localeCompare(b));

  return (
    <div className="min-h-screen bg-secondary">
      <Head>
        <title>Free Open-Source Games</title>
        <meta name="description" content="Curated free and open-source games to play, grouped by genre." />
      </Head>
      <header className="bg-primary p-6 text-center">
        <h1 className="text-4xl font-bold text-textPrimary">Free Open-Source Games</h1>
        <p className="text-textPrimary/80 mt-2">Play without ads, trackers, or paywalls. Family-friendly picks from around the world.</p>
      </header>
      <main className="max-w-5xl mx-auto p-6">
        {genres.map((genre) => (
          <section key={genre} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-textPrimary">{genre}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {byGenre[genre].map((g) => (
                <article key={g.name} className="bg-white border border-border rounded-lg p-4 shadow-sm">
                  <h3 className="text-lg font-semibold text-textPrimary">{g.name}</h3>
                  {g.blurb && <p className="text-sm text-gray-700 mt-1">{g.blurb}</p>}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {g.playUrl && (
                      <a
                        className="inline-block bg-primary hover:bg-accent text-textPrimary text-sm font-medium py-2 px-3 rounded"
                        href={g.playUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Play
                      </a>
                    )}
                    <a
                      className="inline-block bg-white hover:bg-gray-50 text-textPrimary border border-border text-sm font-medium py-2 px-3 rounded"
                      href={g.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Website
                    </a>
                  </div>
                  <div className="mt-3 text-xs text-gray-600">
                    {g.license && <span className="mr-3"><strong>License:</strong> {g.license}</span>}
                    {g.platforms && g.platforms.length > 0 && (
                      <span><strong>Platforms:</strong> {g.platforms.join(', ')}</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const dataPath = path.join(process.cwd(), 'data', 'games-open-source.json');
  const raw = fs.readFileSync(dataPath, 'utf-8');
  let games: Game[] = [];
  try {
    games = JSON.parse(raw);
  } catch {
    games = [];
  }
  // Normalize and sort by name
  games = (games || [])
    .filter((g) => g && (g.website || g.playUrl))
    .map((g) => ({
      ...g,
      website: g.website?.startsWith('http') ? g.website : `https://${g.website}`,
      playUrl: g.playUrl ? (g.playUrl.startsWith('http') ? g.playUrl : `https://${g.playUrl}`) : null,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
  return { props: { games } };
}
