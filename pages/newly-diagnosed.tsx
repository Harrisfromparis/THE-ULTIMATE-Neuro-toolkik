import Head from 'next/head';

export default function NewlyDiagnosedPage() {
  return (
    <div className="min-h-screen bg-secondary">
      <Head>
        <title>Newly Diagnosed - What Next? | Autism Resources</title>
        <meta name="description" content="Comprehensive guide to therapies and services available after receiving an autism diagnosis in Ireland." />
      </Head>
      
      <header className="bg-gradient-to-r from-cyan-500 to-purple-600 p-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Newly Diagnosed - What Next?</h1>
        <p className="text-white/90 text-lg max-w-3xl mx-auto">
          A comprehensive guide to therapies, services, and support available after receiving an autism diagnosis in Ireland.
        </p>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {/* Introduction Section */}
        <section className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Getting Started After Diagnosis</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Receiving an autism diagnosis can feel overwhelming, but you're not alone. This guide outlines the comprehensive 
            support services, therapies, and resources available to help you navigate the next steps and access the best 
            possible care and support.
          </p>
        </section>

  {/* Educational Support */}
  <section id="education" className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-cyan-600 mb-6">🎓 Educational Support</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-cyan-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-cyan-800 mb-3">School Placement</h3>
              <p className="text-gray-700 mb-3">Placement in preschool with AIMS worker and mainstream school autism classes.</p>
              <ul className="text-gray-700 space-y-1">
                <li>• AIMS (Autism Intervention and Monitoring Service) support</li>
                <li>• Specialized autism classes in mainstream schools</li>
                <li>• Transition planning and support</li>
              </ul>
            </div>
            <div id="iep" className="bg-cyan-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-cyan-800 mb-3">Individual Education Plan (IEP)</h3>
              <p className="text-gray-700 mb-3">Tailored educational plans based on assessment recommendations.</p>
              <ul className="text-gray-700 space-y-1">
                <li>• Personalized learning goals</li>
                <li>• Accommodations and modifications</li>
                <li>• Regular review and updates</li>
              </ul>
            </div>
          </div>
        </section>

  {/* Therapeutic Interventions */}
  <section id="therapies" className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-purple-600 mb-6">🩺 Therapeutic Interventions</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div id="ot" className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Occupational Therapy (OT)</h3>
              <p className="text-gray-700 mb-3">Supports for daily living skills and sensory needs.</p>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• Sensory diet development</li>
                <li>• Potty training support</li>
                <li>• Fine motor skills development</li>
                <li>• Daily living skills training</li>
              </ul>
              <a href="http://www.aoti.ie/" target="_blank" rel="noopener noreferrer" 
                 className="inline-block mt-3 bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700 transition-colors">
                Find Private OT
              </a>
            </div>
            <div id="speech" className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Speech & Language Therapy</h3>
              <p className="text-gray-700 mb-3">Communication skills and PECS implementation.</p>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• Communication skill development</li>
                <li>• PECS (Picture Exchange) system</li>
                <li>• Language comprehension</li>
                <li>• Social communication</li>
              </ul>
              <a href="https://isti.ie/" target="_blank" rel="noopener noreferrer" 
                 className="inline-block mt-3 bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700 transition-colors">
                Find Private SLT
              </a>
            </div>
            <div id="aba" className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Applied Behavior Analysis (ABA)</h3>
              <p className="text-gray-700 mb-3">Develops flexible processing and resilience.</p>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• Behavioral intervention strategies</li>
                <li>• Skill acquisition programs</li>
                <li>• Flexible thinking development</li>
                <li>• Positive behavior support</li>
              </ul>
            </div>
          </div>
        </section>

  {/* Social Skills & Movement Support */}
  <section id="social-movement" className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-orange-600 mb-6">🤝 Social Skills & Movement Support</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">Social Skills Programs</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• In-school social strategy programs</li>
                <li>• Peer interaction training</li>
                <li>• Social story development</li>
                <li>• Group therapy sessions</li>
              </ul>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">Movement & Sensory Support</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Motor Cortex and PDA planning</li>
                <li>• Scheduled movement breaks</li>
                <li>• Sensory room access</li>
                <li>• Demand avoidance accommodations</li>
              </ul>
            </div>
          </div>
        </section>

  {/* Health & Wellness */}
  <section id="health" className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-green-600 mb-6">🏥 Health & Wellness</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">GP Support</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Sleep issue management</li>
                <li>• Melatonin prescription when appropriate</li>
                <li>• Regular health monitoring</li>
                <li>• Referrals to specialists</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">Nutritional Support</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Vitamin B-Complex supplements</li>
                <li>• Fish Oils for brain development</li>
                <li>• Multi-vitamin support</li>
                <li>• Iron supplementation if needed</li>
              </ul>
            </div>
          </div>
        </section>

  {/* Financial Support */}
  <section id="funding" className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">💰 Funding & Financial Support</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Domiciliary Care Allowance</h3>
              <p className="text-gray-700 text-sm mb-3">Non-means-tested funding for private therapy.</p>
              <a href="https://www.gov.ie/en/service/30fac9-domiciliary-care-allowance/" target="_blank" rel="noopener noreferrer" 
                 className="inline-block bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                Apply Now
              </a>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Carers Allowance</h3>
              <p className="text-gray-700 text-sm mb-3">Financial support for caregivers.</p>
              <a href="https://www.gov.ie/en/service/2432ba-carers-allowance/" target="_blank" rel="noopener noreferrer" 
                 className="inline-block bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                Learn More
              </a>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Tax Credit</h3>
              <p className="text-gray-700 text-sm mb-3">Tax credit for disabled children with GP signature.</p>
              <a href="https://www.financialwellbeing.ie/incapacitated-child-tax-credit-faq-2024/" target="_blank" rel="noopener noreferrer" 
                 className="inline-block bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                Details
              </a>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Home Tuition Grant</h3>
              <p className="text-gray-700 text-sm mb-3">If suitable preschool options unavailable.</p>
              <a href="https://assets.gov.ie/229645/9ada99ec-9151-481a-952a-4fc612e1364f.pdf" target="_blank" rel="noopener noreferrer" 
                 className="inline-block bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                Download
              </a>
            </div>
          </div>
        </section>

  {/* Special Resources */}
  <section id="programs" className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-6">🎯 Special Programs & Resources</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-red-800 mb-3">Speech Programs</h3>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• Gemiini Speech Program</li>
                <li>• PECS Resources</li>
                <li>• Language development apps</li>
              </ul>
              <a href="https://gemiini.org/solutions/autism" target="_blank" rel="noopener noreferrer" 
                 className="inline-block bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition-colors">
                Gemiini Program
              </a>
            </div>
            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-red-800 mb-3">Travel Support</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Fast Pass for theme parks</li>
                <li>• Sunflower Autism ID Card</li>
                <li>• Dublin Airport autism supports</li>
                <li>• Queue exemptions</li>
              </ul>
            </div>
            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-red-800 mb-3">Community Resources</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Support organizations</li>
                <li>• Parent groups</li>
                <li>• Online communities</li>
                <li>• Educational websites</li>
              </ul>
            </div>
          </div>
        </section>

  {/* Action Steps */}
  <section id="next-steps" className="bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">🎯 Next Steps to Take</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3">1. Immediate Actions</h3>
              <ul className="space-y-2">
                <li>• Contact your GP for referrals</li>
                <li>• Apply for Domiciliary Care Allowance</li>
                <li>• Research school options</li>
              </ul>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3">2. Within 1-3 Months</h3>
              <ul className="space-y-2">
                <li>• Start therapy interventions</li>
                <li>• Implement IEP if school-age</li>
                <li>• Connect with support groups</li>
              </ul>
            </div>
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3">3. Ongoing Support</h3>
              <ul className="space-y-2">
                <li>• Regular therapy reviews</li>
                <li>• Monitor progress</li>
                <li>• Adjust support as needed</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
