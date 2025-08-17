// pages/programs.js
import { getAllPrograms, categories, countries, stats } from '../data/programs';
import ProgramGrid from '../components/ProgramGrid';
import LinkHealthBanner from '../components/LinkHealthBanner';
import ProgramCard from '../components/ProgramCard';

export default function Programs() {
  const allPrograms = getAllPrograms();
  const freeSpeechComm = allPrograms
    .filter(p => Array.isArray(p.tags) && p.tags.includes('free-speech-comm'))
    .sort((a, b) => (a.title || '').localeCompare(b.title || ''));
  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-primary p-6 text-center">
        <img 
          src="/pictures/autismandme-logo.jpg" 
          alt="Autism and Me logo" 
          className="h-16 w-auto mx-auto mb-4" 
        />
        <h1 className="text-4xl font-bold text-textPrimary">
          Global Autism Support Programs
        </h1>
        <p className="text-textPrimary mt-2 text-lg">
          Discover 300+ verified resources from worldwide sources
        </p>
        <p className="text-textPrimary mt-1">
          Every link checked & working • Research-backed tools • Professional resources
        </p>
      </header>
      <LinkHealthBanner />
      
      <main>
        {/* Featured: Free Speech & Communication Software */}
        {freeSpeechComm.length > 0 && (
          <section className="max-w-7xl mx-auto p-6">
            <div className="bg-white border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-primary">Free Speech & Communication Software</h2>
                <a href="#free-speech-comm" className="text-primary underline">Jump to list</a>
              </div>
              <p className="text-textSecondary mb-4">A curated, global set of notable free tools that support speech, AAC, and live captions. All links verified.</p>
              <div id="free-speech-comm" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {freeSpeechComm.map(p => (
                  <ProgramCard key={`fsc-${p.id}`} program={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        <ProgramGrid 
          programs={allPrograms} 
          categories={categories} 
          countries={countries}
          stats={stats}
        />
      </main>

      <footer className="text-center p-6 bg-primary text-white mt-8">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold mb-2">Unlike platforms with thousands of broken links...</h3>
          <p className="mb-4">
            We maintain a comprehensive verification system for all 300+ resource links. Every single URL in our collection 
            undergoes regular automated testing to ensure it actually works when you click on it.
          </p>
          <p className="text-sm opacity-90">
            Our collection includes verified resources from trusted organizations like Cambridge University, Harvard University, 
            MIT, Stanford, University of Toronto, ETH Zurich, University of Tokyo, CDC, Autism Speaks, Oxford University Press, 
            Microsoft, and 31 research institutions worldwide.
          </p>
          <p className="mt-4">&copy; 2025 www.autismandme.ie</p>
        </div>
      </footer>
    </div>
  );
}
