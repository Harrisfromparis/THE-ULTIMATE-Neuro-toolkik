// pages/index.tsx

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{backgroundColor: '#f0fffe'}}>
      {/* Clean Header */}
      <header className="border-b shadow-sm" style={{backgroundColor: '#7dd3c0', borderColor: '#6db3a0'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Neurodiversity Resources
            </h1>
            <p className="text-white/90 mt-2 text-sm sm:text-base lg:text-lg">
              Comprehensive support and information for neurodiverse families in Ireland
            </p>
          </div>
        </div>
      </header>
      
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Search Button */}
          <div className="mb-8 text-center sm:text-right">
            <a href="/search" className="inline-block text-sm px-4 py-2 text-white rounded-lg hover:opacity-90 transition-all hover:shadow-md" style={{backgroundColor: '#9ca3af'}}>
              🔍 Search Resources
            </a>
          </div>

          {/* Primary Actions Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <a 
              href="/programs" 
              className="text-white font-medium py-4 px-6 rounded-xl text-center transition-all hover:opacity-90 hover:shadow-lg hover:transform hover:scale-105"
              style={{backgroundColor: '#9ca3af'}}
            >
              📖 Explore All Programs
            </a>
            <a href="/studies" className="text-white font-medium py-4 px-6 rounded-xl text-center transition-all hover:opacity-90 hover:shadow-lg hover:transform hover:scale-105" style={{backgroundColor: '#9ca3af'}}>
              📊 Browse Studies
            </a>
            <a href="/strategies" className="text-white font-medium py-4 px-6 rounded-xl text-center transition-all hover:opacity-90 hover:shadow-lg hover:transform hover:scale-105" style={{backgroundColor: '#9ca3af'}}>
              🎯 Autism Strategies & Petition
            </a>
          </div>

          {/* Secondary Resources Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <a href="/educational-resources" className="text-white font-medium py-3 px-4 rounded-lg text-center transition-all hover:opacity-90 hover:shadow-md hover:transform hover:scale-105" style={{backgroundColor: '#9ca3af'}}>
              📚 Educational Resources A-Z
            </a>
            <a href="/disability-entitlements" className="text-white font-medium py-3 px-4 rounded-lg text-center transition-all hover:opacity-90 hover:shadow-md hover:transform hover:scale-105" style={{backgroundColor: '#9ca3af'}}>
              🏛️ Disability Entitlements A-Z
            </a>
            <a href="/games" className="text-white font-medium py-3 px-4 rounded-lg text-center transition-all hover:opacity-90 hover:shadow-md hover:transform hover:scale-105" style={{backgroundColor: '#9ca3af'}}>
              🎮 Free Open-Source Games
            </a>
            <a href="/youtube-channels" className="text-white font-medium py-3 px-4 rounded-lg text-center transition-all hover:opacity-90 hover:shadow-md hover:transform hover:scale-105" style={{backgroundColor: '#9ca3af'}}>
              📺 YouTube Channels
            </a>
          </div>

          {/* Additional Resources Section */}
          <div className="mt-12 pt-8 border-t" style={{borderColor: '#7dd3c0'}}>
            <h2 className="text-xl font-semibold text-center mb-6" style={{color: '#7dd3c0'}}>
              Additional Resources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <a href="/resources-catalogue" className="text-white font-medium py-3 px-4 rounded-lg text-center transition-all hover:opacity-90 hover:shadow-md hover:transform hover:scale-105" style={{backgroundColor: '#9ca3af'}}>
                🔗 Resources Catalogue
              </a>
              <a href="/full-resources-catalogue" className="text-white font-medium py-3 px-4 rounded-lg text-center transition-all hover:opacity-90 hover:shadow-md hover:transform hover:scale-105" style={{backgroundColor: '#9ca3af'}}>
                📋 Full A-Z Catalogue
              </a>
              <a href="/newly-diagnosed" className="text-white font-medium py-3 px-4 rounded-lg text-center transition-all hover:opacity-90 hover:shadow-md hover:transform hover:scale-105" style={{backgroundColor: '#9ca3af'}}>
                🌟 Newly Diagnosed
              </a>
              <a href="/admin/import-programs" className="text-white font-medium py-3 px-4 rounded-lg text-center transition-all hover:opacity-90 hover:shadow-md hover:transform hover:scale-105" style={{backgroundColor: '#9ca3af'}}>
                ⚙️ Admin Tools
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
