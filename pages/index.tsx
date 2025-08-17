// pages/index.tsx
import ImageCompare from '../components/ImageCompare';
import Banner from '../components/Banner';

export default function Home() {
  return (
    <div className="min-h-screen bg-secondary">
      <Banner />
      
      <main className="p-8">
        <section className="intro bg-white p-8 rounded-lg max-w-4xl mx-auto my-4 shadow-md">
          <div className="text-center">
            <p className="text-lg sm:text-xl md:text-2xl font-bold leading-relaxed" 
               style={{
                 background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3, #54a0ff)',
                 backgroundSize: '400% 400%',
                 animation: 'rainbow 3s ease infinite',
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
                 backgroundClip: 'text',
                 fontFamily: 'Comic Sans MS, cursive, system-ui'
               }}>
              Supportive content from a mom of the most wonderfully neurodiverse kids and a student/teacher/advocate for progressing the cause of integration of neurodiversity in a meaningful way in Ireland and the world...
              <span className="block mt-3 text-yellow-500 animate-bounce font-black text-xl sm:text-2xl md:text-3xl">
                sure why not aim high!!!!!
              </span>
            </p>
          </div>
          
          <style jsx>{`
            @keyframes rainbow {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}</style>
        </section>

        {/* Newly Diagnosed Banner */}
        <section className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 p-6 rounded-lg max-w-4xl mx-auto my-8 shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              🎯 Just Received an Autism Diagnosis?
            </h2>
            <p className="text-white/90 text-lg mb-6">
              Get comprehensive guidance on therapies, services, and support available in Ireland
            </p>
            <a 
              href="/newly-diagnosed"
              className="bg-white text-purple-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50 inline-block text-lg"
              style={{boxShadow: '0 0 25px rgba(255, 255, 255, 0.3)'}}
            >
              📋 Newly Diagnosed - What Next?
            </a>
          </div>
        </section>
        
        <div className="text-center mt-10">
          <a 
            href="/programs" 
            className="bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-cyan-400/50 inline-block mr-4 mb-4"
            style={{boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)'}}
          >
            Explore All Programs
          </a>
          <a href="/studies" className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-orange-400/50 inline-block mr-4 mb-4"
             style={{boxShadow: '0 0 20px rgba(255, 107, 53, 0.3)'}}>
            Browse Studies
          </a>
          <a href="/strategies" className="bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-purple-400/50 inline-block mr-4 mb-4"
             style={{boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)'}}>
            Autism Strategies & Petition
          </a>
          <div className="mt-4">
            <a href="/educational-resources" className="bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-emerald-400/50 inline-block mr-4 mb-4"
               style={{boxShadow: '0 0 20px rgba(52, 211, 153, 0.3)'}}>
              📚 Educational Resources A-Z
            </a>
            <a href="/disability-entitlements" className="bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-indigo-400/50 inline-block mr-4 mb-4"
               style={{boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)'}}>
              🏛️ Disability Entitlements A-Z
            </a>
            <a href="/games" className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-green-400/50 inline-block mr-4 mb-4"
               style={{boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)'}}>
              Free Open-Source Games
            </a>
            <a href="/youtube-channels" className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-medium py-3 px-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-red-500/50 inline-block"
               style={{boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)'}}>
              📺 YouTube Channels
            </a>
          </div>
        </div>
        
        {/* Image compare activity inserted below the CTAs */}
        <ImageCompare
          images={[
            'sausage-dog-01.jpg',
            'sausage-dog-02.jpg',
            'sausage-dog-03.jpg',
            'sausage-dog-04.jpg'
          ]}
          caption="Sausage dogs — compare and contrast: what’s the same, what’s different?"
          alt="Several images of a small brown dachshund in different poses and lighting"
        />
      </main>
    </div>
  );
}
