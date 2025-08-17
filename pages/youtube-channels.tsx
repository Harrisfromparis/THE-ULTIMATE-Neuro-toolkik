import fs from 'fs';
import path from 'path';
import Head from 'next/head';

type YouTubeChannel = {
  name: string;
  category: string;
  channelUrl: string;
  description: string;
  subscribers?: string;
  featured?: boolean;
};

type Props = { channels: YouTubeChannel[] };

export default function YouTubeChannelsPage({ channels }: Props) {
  const featuredChannels = channels.filter(c => c.featured);
  const byCategory = channels.reduce<Record<string, YouTubeChannel[]>>((acc, c) => {
    const key = c.category || 'Other';
    (acc[key] ||= []).push(c);
    return acc;
  }, {});
  const categories = Object.keys(byCategory).sort((a, b) => a.localeCompare(b));

  return (
    <div className="min-h-screen bg-secondary">
      <Head>
        <title>YouTube Channels - Autism Resources</title>
        <meta name="description" content="Curated YouTube channels focused on autism, advocacy, education, and support." />
      </Head>
      <header className="bg-primary p-6 text-center">
        <h1 className="text-4xl font-bold text-textPrimary">YouTube Channels</h1>
        <p className="text-textPrimary/80 mt-2">Educational and supportive content from autistic creators and autism advocates.</p>
      </header>
      
      <main className="max-w-5xl mx-auto p-6">
        {/* Featured Channels Section */}
        {featuredChannels.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-textPrimary">⭐ Featured Channels</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredChannels.map((channel) => (
                <article key={channel.name} className="bg-white border border-border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-textPrimary">{channel.name}</h3>
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">Featured</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{channel.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">{channel.category}</span>
                    {channel.subscribers && (
                      <span className="text-xs text-gray-600">{channel.subscribers} subscribers</span>
                    )}
                  </div>
                  <a
                    className="inline-block bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-4 rounded w-full text-center transition-colors"
                    href={channel.channelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🎥 Visit Channel
                  </a>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* All Channels by Category */}
        {categories.map((category) => (
          <section key={category} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 text-textPrimary">{category}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {byCategory[category].map((channel) => (
                <article key={channel.name} className="bg-white border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-textPrimary mb-2">{channel.name}</h3>
                  <p className="text-sm text-gray-700 mb-3">{channel.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    {channel.subscribers && (
                      <span className="text-xs text-gray-600">{channel.subscribers} subscribers</span>
                    )}
                  </div>
                  <a
                    className="inline-block bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded w-full text-center transition-colors"
                    href={channel.channelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🎥 Visit Channel
                  </a>
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
  const dataPath = path.join(process.cwd(), 'data', 'youtube-channels.json');
  let channels: YouTubeChannel[] = [];
  
  try {
    const raw = fs.readFileSync(dataPath, 'utf-8');
    channels = JSON.parse(raw);
  } catch (error) {
    console.error('Error loading YouTube channels data:', error);
    channels = [];
  }

  // Normalize and sort channels
  channels = (channels || [])
    .filter((c) => c && c.channelUrl && c.name)
    .map((c) => ({
      ...c,
      channelUrl: c.channelUrl.startsWith('http') ? c.channelUrl : `https://${c.channelUrl}`,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return { props: { channels } };
}
