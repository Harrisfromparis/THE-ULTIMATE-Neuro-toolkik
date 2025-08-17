import Head from 'next/head';

export default function DisabilityEntitlementsPage() {
  return (
    <div className="min-h-screen bg-secondary">
      <Head>
        <title>Irish Disability Entitlements A-Z | Complete Guide</title>
        <meta name="description" content="Comprehensive A-Z guide to entitlements, supports, and services available in Ireland for individuals with disabilities, their families, and caregivers." />
      </Head>
      
      <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 p-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Irish Disability Entitlements A-Z</h1>
        <p className="text-white/90 text-lg max-w-4xl mx-auto">
          Complete guide to entitlements, supports, and services available in Ireland for individuals with disabilities, 
          their families, and caregivers - covering health, housing, allowances, and benefits.
        </p>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        
        {/* Primary Resource Banner - autism.ie */}
        <section className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-lg p-8 mb-8 shadow-2xl text-white">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">🌟 PRIMARY RESOURCE FOR NEURODIVERSITY 🌟</h2>
            <p className="text-xl mb-6 text-white/90">
              Before exploring the A-Z guide below, visit <strong>autism.ie</strong> - Ireland's comprehensive one-stop resource 
              for everyone invested in the world of neurodiversity and autism support.
            </p>
            <a href="https://autism.ie" target="_blank" rel="noopener noreferrer" 
               className="bg-white text-emerald-600 font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50 inline-block text-lg transform hover:scale-105"
               style={{boxShadow: '0 0 25px rgba(255, 255, 255, 0.3)'}}>
              🏠 Visit autism.ie - Your Essential Starting Point
            </a>
            <p className="text-sm mt-4 text-white/80">
              ✨ Comprehensive information, resources, and support for individuals, families, professionals, and advocates
            </p>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="bg-white rounded-lg p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🔍 Quick Navigation</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-13 gap-2">
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map((letter) => (
              <a key={letter} href={`#letter-${letter.toLowerCase()}`} 
                 className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded text-center font-bold transition-colors">
                {letter}
              </a>
            ))}
          </div>
        </section>

        {/* A - Assistive Technology */}
        <section id="letter-a" className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">A - Assistive Technology</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">What it covers:</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Funding and grants for assistive devices and technology</li>
                <li>• Communication aids and speech devices</li>
                <li>• Mobility equipment and adaptations</li>
                <li>• Computer access technology</li>
                <li>• Environmental control systems</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Resources:</h3>
              <a href="https://autism.ie" target="_blank" rel="noopener noreferrer" 
                 className="block bg-emerald-600 text-white px-4 py-3 rounded mb-3 hover:bg-emerald-700 transition-colors">
                🌟 autism.ie - Primary Neurodiversity Resource
              </a>
              <a href="https://nda.ie/resources/accessibility-toolkit/assistive-technology.html" target="_blank" rel="noopener noreferrer" 
                 className="block bg-blue-600 text-white px-4 py-3 rounded mb-3 hover:bg-blue-700 transition-colors">
                🔗 NDA Assistive Technology Toolkit
              </a>
              <a href="https://www.assistivethought.com/assistive-technology-grants-ireland/" target="_blank" rel="noopener noreferrer" 
                 className="block bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700 transition-colors">
                💰 AT Grants Information
              </a>
            </div>
          </div>
        </section>

        {/* B - Blind Welfare Allowance */}
        <section id="letter-b" className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">B - Blind Welfare Allowance</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">What it covers:</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Financial support for individuals who are blind or visually impaired</li>
                <li>• Weekly payment to help with additional costs</li>
                <li>• Available regardless of other social welfare payments</li>
                <li>• Non-means tested allowance</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Apply Now:</h3>
              <a href="https://autism.ie" target="_blank" rel="noopener noreferrer" 
                 className="block bg-emerald-600 text-white px-4 py-3 rounded mb-3 hover:bg-emerald-700 transition-colors">
                🌟 autism.ie - Essential Neurodiversity Hub
              </a>
              <a href="https://www.gov.ie/en/service/4d8c0d-blind-welfare-allowance/" target="_blank" rel="noopener noreferrer" 
                 className="block bg-blue-600 text-white px-4 py-3 rounded mb-3 hover:bg-blue-700 transition-colors">
                📋 Blind Welfare Allowance Info
              </a>
              <a href="https://www.gov.ie/en/publication/b7d0c-blind-welfare-allowance-application-form/" target="_blank" rel="noopener noreferrer" 
                 className="block bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700 transition-colors">
                📝 Application Form
              </a>
            </div>
          </div>
        </section>

        {/* C - Carer's Allowance */}
        <section id="letter-c" className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">C - Carer's Allowance</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">What it covers:</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Payment for individuals caring for a person with a disability or illness</li>
                <li>• Must be caring for someone needing full-time care and attention</li>
                <li>• Means tested payment</li>
                <li>• Additional supports available for carers</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Apply Now:</h3>
              <a href="https://autism.ie" target="_blank" rel="noopener noreferrer" 
                 className="block bg-emerald-600 text-white px-4 py-3 rounded mb-3 hover:bg-emerald-700 transition-colors">
                🌟 autism.ie - Complete Neurodiversity Support
              </a>
              <a href="https://www.gov.ie/en/service/2432ba-carers-allowance/" target="_blank" rel="noopener noreferrer" 
                 className="block bg-blue-600 text-white px-4 py-3 rounded mb-3 hover:bg-blue-700 transition-colors">
                💝 Carer's Allowance Overview
              </a>
              <a href="https://www.citizensinformation.ie/en/social-welfare/carers/carers-allowance/" target="_blank" rel="noopener noreferrer" 
                 className="block bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700 transition-colors">
                📋 How to Apply
              </a>
            </div>
          </div>
        </section>

        {/* D - Disability Allowance & Domiciliary Care Allowance */}
        <section id="letter-d" className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">D - Disability Allowance & Domiciliary Care Allowance</h2>
          
          {/* Disability Allowance Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Disability Allowance (Age 16+)</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">What it covers:</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• Monthly payment for individuals with a long-term disability</li>
                  <li>• Available from age 16</li>
                  <li>• Means tested payment</li>
                  <li>• Additional benefits like medical card and free travel</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-3">Apply Now:</h4>
                <a href="https://www.gov.ie/en/service/bba282-disability-allowance/" target="_blank" rel="noopener noreferrer" 
                   className="block bg-blue-600 text-white px-4 py-3 rounded mb-3 hover:bg-blue-700 transition-colors">
                  🦽 Disability Allowance Info
                </a>
                <a href="https://www.citizensinformation.ie/en/social-welfare/disability-and-illness/disability-allowance/" target="_blank" rel="noopener noreferrer" 
                   className="block bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700 transition-colors">
                  📝 Application Guide
                </a>
              </div>
            </div>
          </div>

          {/* Domiciliary Care Allowance Section */}
          <div className="border-t pt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Domiciliary Care Allowance (DCA) - Under 16</h3>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
              <h4 className="text-xl font-bold text-blue-800 mb-3">📋 What is DCA?</h4>
              <p className="text-gray-700 mb-4">
                DCA is a monthly payment (€309.50) for a child under 16 with a severe disability who requires ongoing care and attention 
                that is substantially greater than the care normally required by a child of the same age.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-white p-4 rounded">
                  <h5 className="font-semibold text-blue-700 mb-2">✅ Eligibility</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Child under 16</li>
                    <li>• Severe disability lasting 12+ months</li>
                    <li>• Substantially greater care needs</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded">
                  <h5 className="font-semibold text-green-700 mb-2">💰 Benefits</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• €309.50 per month</li>
                    <li>• Not means tested</li>
                    <li>• Additional supports available</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded">
                  <h5 className="font-semibold text-purple-700 mb-2">⏱️ Timeline</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Apply as early as possible</li>
                    <li>• 3-6 months processing</li>
                    <li>• Backdated from application</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step-by-Step DCA Application Guide */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
              <h4 className="text-2xl font-bold text-green-800 mb-6 text-center">
                📝 Step-by-Step Guide to a Thorough DCA Application
              </h4>
              <p className="text-gray-700 text-center mb-8">
                Follow this comprehensive checklist to maximize your chances of approval. Each step is crucial for building a strong case.
              </p>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                    </div>
                    <div className="flex-grow">
                      <h5 className="text-xl font-semibold text-gray-800 mb-3">
                        <input type="checkbox" className="mr-3 transform scale-125" />
                        Understand Eligibility & Gather Initial Information
                      </h5>
                      <ul className="text-gray-700 space-y-2 ml-6">
                        <li>• Review DCA eligibility criteria thoroughly</li>
                        <li>• Understand what "substantially greater care" means</li>
                        <li>• Compare your child's needs to typical children of same age</li>
                        <li>• Gather basic medical information and diagnoses</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                    </div>
                    <div className="flex-grow">
                      <h5 className="text-xl font-semibold text-gray-800 mb-3">
                        <input type="checkbox" className="mr-3 transform scale-125" />
                        Collect Comprehensive Medical Evidence
                      </h5>
                      <ul className="text-gray-700 space-y-2 ml-6">
                        <li>• <strong>GP reports:</strong> Detailed medical history and current condition</li>
                        <li>• <strong>Specialist reports:</strong> Pediatrician, neurologist, psychiatrist as relevant</li>
                        <li>• <strong>Therapy assessments:</strong> OT, speech therapy, physiotherapy evaluations</li>
                        <li>• <strong>Hospital records:</strong> Admission letters, discharge summaries</li>
                        <li>• <strong>School reports:</strong> SNA applications, psychological assessments</li>
                        <li>• <strong>Diagnostic reports:</strong> Autism diagnosis, developmental assessments</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                    </div>
                    <div className="flex-grow">
                      <h5 className="text-xl font-semibold text-gray-800 mb-3">
                        <input type="checkbox" className="mr-3 transform scale-125" />
                        Document Daily Care Needs in Detail
                      </h5>
                      <ul className="text-gray-700 space-y-2 ml-6">
                        <li>• <strong>Personal care:</strong> Feeding, dressing, toileting, washing assistance</li>
                        <li>• <strong>Safety supervision:</strong> Constant monitoring, wandering prevention</li>
                        <li>• <strong>Mobility assistance:</strong> Transfers, walking support, positioning</li>
                        <li>• <strong>Communication needs:</strong> Interpreting needs, behavior management</li>
                        <li>• <strong>Medical care:</strong> Medication administration, equipment management</li>
                        <li>• <strong>Sleep disturbances:</strong> Night-time supervision and interventions</li>
                        <li>• <strong>Behavioral support:</strong> Meltdown management, sensory needs</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                    </div>
                    <div className="flex-grow">
                      <h5 className="text-xl font-semibold text-gray-800 mb-3">
                        <input type="checkbox" className="mr-3 transform scale-125" />
                        Complete the DCA Application Form Thoroughly
                      </h5>
                      <ul className="text-gray-700 space-y-2 ml-6">
                        <li>• Download official form from <a href="https://www.gov.ie/en/service/c20e1c-carers-allowance/" className="text-blue-600 underline" target="_blank">gov.ie</a></li>
                        <li>• Fill every relevant section completely and accurately</li>
                        <li>• Use specific examples rather than general statements</li>
                        <li>• Attach continuation sheets if more space needed</li>
                        <li>• Have medical professionals review relevant sections</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
                    </div>
                    <div className="flex-grow">
                      <h5 className="text-xl font-semibold text-gray-800 mb-3">
                        <input type="checkbox" className="mr-3 transform scale-125" />
                        Organize Supporting Documentation
                      </h5>
                      <ul className="text-gray-700 space-y-2 ml-6">
                        <li>• Create a comprehensive medical evidence package</li>
                        <li>• Include birth certificate and proof of residence</li>
                        <li>• Add photos/videos showing care needs (if helpful)</li>
                        <li>• Include care diary showing 24/7 needs</li>
                        <li>• Organize chronologically with cover letter</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">6</div>
                    </div>
                    <div className="flex-grow">
                      <h5 className="text-xl font-semibold text-gray-800 mb-3">
                        <input type="checkbox" className="mr-3 transform scale-125" />
                        Submit Application & Keep Records
                      </h5>
                      <ul className="text-gray-700 space-y-2 ml-6">
                        <li>• Make photocopies of everything before submission</li>
                        <li>• Send by registered post with tracking</li>
                        <li>• Keep postal receipts and tracking numbers</li>
                        <li>• Submit to: Domiciliary Care Allowance Unit, Department of Social Protection</li>
                        <li>• Follow up if no acknowledgment received within 2 weeks</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Step 7 */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">7</div>
                    </div>
                    <div className="flex-grow">
                      <h5 className="text-xl font-semibold text-gray-800 mb-3">
                        <input type="checkbox" className="mr-3 transform scale-125" />
                        Prepare for Assessment & Possible Appeal
                      </h5>
                      <ul className="text-gray-700 space-y-2 ml-6">
                        <li>• Be prepared for possible medical assessment request</li>
                        <li>• Continue documenting care needs during processing</li>
                        <li>• If denied, review decision letter carefully</li>
                        <li>• Gather additional evidence for appeal if needed</li>
                        <li>• Contact Citizens Information or advocacy groups for support</li>
                        <li>• Submit appeal within 21 days if necessary</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advocate Tips Box */}
              <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6">
                <h5 className="text-lg font-semibold text-yellow-800 mb-3">💡 Advocate Tips for Success</h5>
                <ul className="text-yellow-700 space-y-2">
                  <li>• <strong>Be specific:</strong> "Needs help eating" vs "Requires full assistance with feeding due to dysphagia and choking risk"</li>
                  <li>• <strong>Compare to peers:</strong> Always reference what typical children of same age can do independently</li>
                  <li>• <strong>24/7 perspective:</strong> Document care needs across entire day and night</li>
                  <li>• <strong>Get professional support:</strong> Contact disability organizations for guidance</li>
                  <li>• <strong>Don't give up:</strong> Many successful applications are appeals - persistence pays off</li>
                </ul>
              </div>

              <div className="mt-6 text-center">
                <a href="https://autism.ie" target="_blank" rel="noopener noreferrer" 
                   className="bg-emerald-600 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-emerald-700 transition-colors text-lg font-semibold mr-4 mb-4 inline-block">
                  🌟 Visit autism.ie First
                </a>
                <a href="https://www.gov.ie/en/service/c20e1c-carers-allowance/" target="_blank" rel="noopener noreferrer" 
                   className="bg-green-600 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-green-700 transition-colors text-lg font-semibold inline-block">
                  📋 Download DCA Application Form
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* E - Early Childhood Care and Education */}
        <section id="letter-e" className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">E - Early Childhood Care and Education (ECCE)</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">What it covers:</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Free pre-school year for children aged 2 years 8 months to 5 years 6 months</li>
                <li>• 15 hours per week for 38 weeks</li>
                <li>• Access in Inclusion (AIM) model for children with disabilities</li>
                <li>• Additional supports for children with special needs</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Apply Now:</h3>
              <a href="https://www.gov.ie/en/service/606e10-early-childhood-care-and-education-ecce-programme/" target="_blank" rel="noopener noreferrer" 
                 className="block bg-blue-600 text-white px-4 py-3 rounded mb-3 hover:bg-blue-700 transition-colors">
                🎓 ECCE Programme Details
              </a>
              <a href="https://www.gov.ie/en/publication/1b2e2e-how-to-apply-for-the-early-childhood-care-and-education-ecce-progr/" target="_blank" rel="noopener noreferrer" 
                 className="block bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700 transition-colors">
                📋 Application Guide
              </a>
            </div>
          </div>
        </section>

        {/* Continue with F through Z... */}
        {/* F - Free Travel Pass */}
        <section id="letter-f" className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">F - Free Travel Pass</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">What it covers:</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Free travel on public transport for eligible individuals with disabilities</li>
                <li>• Includes buses, trains, and Dublin LUAS</li>
                <li>• Companion pass available for those who need assistance</li>
                <li>• Available to those getting certain social welfare payments</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Apply Now:</h3>
              <a href="https://www.gov.ie/en/service/0a7477-free-travel/" target="_blank" rel="noopener noreferrer" 
                 className="block bg-blue-600 text-white px-4 py-3 rounded mb-3 hover:bg-blue-700 transition-colors">
                🚌 Free Travel Information
              </a>
              <a href="https://www.citizensinformation.ie/en/travel-and-recreation/transport-and-disability/free-travel/" target="_blank" rel="noopener noreferrer" 
                 className="block bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700 transition-colors">
                📝 How to Apply
              </a>
            </div>
          </div>
        </section>

        {/* Continue with more sections... Let me add several more key ones */}

        {/* H - Health Service Executive Services */}
        <section id="letter-h" className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">H - Health Service Executive (HSE) Services</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">What it covers:</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Access to healthcare professionals, therapists, and community supports</li>
                <li>• Disability services and assessments</li>
                <li>• Occupational therapy and speech therapy</li>
                <li>• Respite care and day services</li>
                <li>• Personal assistance services</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Access Services:</h3>
              <a href="https://www.hse.ie/eng/services/list/4/disability/" target="_blank" rel="noopener noreferrer" 
                 className="block bg-blue-600 text-white px-4 py-3 rounded mb-3 hover:bg-blue-700 transition-colors">
                🏥 HSE Disability Services
              </a>
              <a href="https://www.hse.ie/eng/about/who/cmo/doh-policy-division/primary-care-reimbursement-service/community-healthcare-organisations.html" target="_blank" rel="noopener noreferrer" 
                 className="block bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700 transition-colors">
                📍 Find Your Local CHO
              </a>
            </div>
          </div>
        </section>

        {/* M - Medical Card */}
        <section id="letter-m" className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">M - Medical Card</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">What it covers:</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Free GP services and prescribed medications</li>
                <li>• Free hospital services (public wards)</li>
                <li>• Free dental, optical, and aural services</li>
                <li>• Free maternity and infant care services</li>
                <li>• Free medical appliances and equipment</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Apply Now:</h3>
              <a href="https://www2.hse.ie/services/medical-cards/medical-card.html" target="_blank" rel="noopener noreferrer" 
                 className="block bg-blue-600 text-white px-4 py-3 rounded mb-3 hover:bg-blue-700 transition-colors">
                💊 Medical Card Information
              </a>
              <a href="https://www2.hse.ie/services/apply-for-a-medical-card/apply-for-a-medical-card.html" target="_blank" rel="noopener noreferrer" 
                 className="block bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700 transition-colors">
                📋 Online Application
              </a>
            </div>
          </div>
        </section>

        {/* S - Special Needs Assistant Support */}
        <section id="letter-s" className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">S - Special Needs Assistant (SNA) Support</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">What it covers:</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Classroom assistance for students with additional care needs</li>
                <li>• Support with personal care tasks</li>
                <li>• Assistance with mobility and safety</li>
                <li>• Help with managing medical conditions</li>
                <li>• Support during breaks and transitions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Get Support:</h3>
              <a href="https://ncse.ie/for-schools/sna-allocation" target="_blank" rel="noopener noreferrer" 
                 className="block bg-blue-600 text-white px-4 py-3 rounded mb-3 hover:bg-blue-700 transition-colors">
                👨‍🏫 SNA Allocation Guidelines
              </a>
              <a href="https://ncse.ie/for-parents/sna-support" target="_blank" rel="noopener noreferrer" 
                 className="block bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700 transition-colors">
                👨‍👩‍👧‍👦 Information for Parents
              </a>
            </div>
          </div>
        </section>

        {/* Quick Reference for remaining letters */}
        <section className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">📖 Complete A-Z Quick Reference</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* G-L */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">G - L</h3>
              <div className="space-y-3 text-sm">
                <div id="letter-g">
                  <h4 className="font-semibold text-blue-700">G - Housing Adaptation Grants</h4>
                  <p className="text-gray-600">Financial assistance to make homes accessible</p>
                  <a href="https://www.housing.gov.ie/housing/housing-adaptation-grant-schemes-older-people-and-people-disabilities" target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800 underline">Housing Grants Info</a>
                </div>
                
                <div id="letter-i">
                  <h4 className="font-semibold text-blue-700">I - Income Supports</h4>
                  <p className="text-gray-600">Supplementary welfare and disability payments</p>
                  <a href="https://www.gov.ie/en/service/e8daee-supplementary-welfare-allowance/" target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800 underline">Income Support Info</a>
                </div>

                <div id="letter-j">
                  <h4 className="font-semibold text-blue-700">J - Job Assistance</h4>
                  <p className="text-gray-600">Employment supports and workplace accommodations</p>
                  <a href="https://www.gov.ie/en/service/186e5c-employment-supports-for-people-with-disabilities/" target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800 underline">Employment Supports</a>
                </div>

                <div id="letter-k">
                  <h4 className="font-semibold text-blue-700">K - Kids' Dental Scheme</h4>
                  <p className="text-gray-600">Free dental care for children up to 16</p>
                  <a href="https://www2.hse.ie/services/dental-treatment-services-scheme/" target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800 underline">Children's Dental Scheme</a>
                </div>

                <div id="letter-l">
                  <h4 className="font-semibold text-blue-700">L - Long-Term Illness Scheme</h4>
                  <p className="text-gray-600">Free medications for specific conditions</p>
                  <a href="https://www.hse.ie/eng/services/list/1/schemes/lti/" target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800 underline">LTI Scheme Info</a>
                </div>
              </div>
            </div>

            {/* N-R */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">N - R</h3>
              <div className="space-y-3 text-sm">
                <div id="letter-n">
                  <h4 className="font-semibold text-blue-700">N - National Advocacy Service</h4>
                  <p className="text-gray-600">Independent advocacy for people with disabilities</p>
                  <a href="https://advocacy.ie/" target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800 underline">Advocacy Service</a>
                </div>

                <div id="letter-o">
                  <h4 className="font-semibold text-blue-700">O - Occupational Therapy</h4>
                  <p className="text-gray-600">Assessments and recommendations for daily living</p>
                  <a href="https://www.hse.ie/eng/services/list/4/disability/progressing-disability/occupational-therapy/" target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800 underline">OT Services</a>
                </div>

                <div id="letter-p">
                  <h4 className="font-semibold text-blue-700">P - Personal Assistance Service</h4>
                  <p className="text-gray-600">Support for independent living</p>
                  <a href="https://www.hse.ie/eng/services/list/4/disability/newpersonalassistance/" target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800 underline">Personal Assistance Info</a>
                </div>

                <div id="letter-q">
                  <h4 className="font-semibold text-blue-700">Q - Quiet/Sensory Room Grants</h4>
                  <p className="text-gray-600">Funding for sensory-friendly spaces</p>
                  <a href="https://ncse.ie/for-schools/sensory-room-grant-scheme" target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800 underline">Sensory Room Grants</a>
                </div>

                <div id="letter-r">
                  <h4 className="font-semibold text-blue-700">R - Respite Care</h4>
                  <p className="text-gray-600">Short-term care relief for family caregivers</p>
                  <a href="https://www.hse.ie/eng/services/list/4/disability/respite/" target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800 underline">Respite Care Services</a>
                </div>
              </div>
            </div>

            {/* T-Z */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">T - Z</h3>
              <div className="space-y-3 text-sm">
                <div id="letter-t">
                  <h4 className="font-semibold text-blue-700">T - Transport Supports</h4>
                  <p className="text-gray-600">Mobility allowance and disabled drivers scheme</p>
                  <a href="https://www.revenue.ie/en/importing-vehicles-duty-free-allowances/guide-to-customs/exemptions-and-relief-from-vehicle-registration-tax/disabled-drivers-and-disabled-passengers-scheme.aspx" target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800 underline">Transport Supports</a>
                </div>

                <div id="letter-u">
                  <h4 className="font-semibold text-blue-700">U - Universal Design Guidelines</h4>
                  <p className="text-gray-600">Creating accessible and inclusive environments</p>
                  <a href="https://universaldesign.ie/Built-Environment/Building-for-Everyone/" target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800 underline">Universal Design</a>
                </div>

                <div id="letter-v">
                  <h4 className="font-semibold text-blue-700">V - Vital Signs Monitoring</h4>
                  <p className="text-gray-600">Home monitoring equipment provision</p>
                  <a href="https://www.hse.ie/eng/services/list/1/schemes/lti/home-monitoring-equipment-scheme.html" target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800 underline">Monitoring Equipment</a>
                </div>

                <div id="letter-w">
                  <h4 className="font-semibold text-blue-700">W - Wheelchair Vehicle Grant</h4>
                  <p className="text-gray-600">Financial assistance for accessible vehicles</p>
                  <a href="https://www.revenue.ie/en/importing-vehicles-duty-free-allowances/guide-to-customs/exemptions-and-relief-from-vehicle-registration-tax/disabled-drivers-and-disabled-passengers-scheme.aspx" target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800 underline">Vehicle Grants</a>
                </div>

                <div id="letter-y">
                  <h4 className="font-semibold text-blue-700">Y - Youth Advocacy Programme</h4>
                  <p className="text-gray-600">Support for young people transitioning to adulthood</p>
                  <a href="https://advocacy.ie/our-services/youth-advocacy-programme/" target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800 underline">Youth Advocacy</a>
                </div>

                <div id="letter-z">
                  <h4 className="font-semibold text-blue-700">Z - Zones of Regulation</h4>
                  <p className="text-gray-600">Emotional management framework for schools</p>
                  <a href="https://www.zonesofregulation.com/index.html" target="_blank" rel="noopener noreferrer" 
                     className="text-blue-600 hover:text-blue-800 underline">Zones Framework</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Contacts & Support */}
        <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">📞 Important Contacts & Next Steps</h2>
          
          {/* autism.ie Primary Resource */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 rounded-lg mb-6 text-center">
            <h3 className="text-2xl font-bold mb-3">🌟 START HERE: autism.ie 🌟</h3>
            <p className="mb-4 text-lg">Ireland's primary one-stop resource for neurodiversity and autism support</p>
            <a href="https://autism.ie" target="_blank" rel="noopener noreferrer" 
               className="bg-white text-emerald-600 px-6 py-3 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors inline-block">
              🏠 Visit autism.ie Now
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3">Citizens Information</h3>
              <p className="mb-3 text-sm">Free information service about public services</p>
              <a href="https://www.citizensinformation.ie/" target="_blank" rel="noopener noreferrer" 
                 className="bg-white text-blue-600 px-4 py-2 rounded text-sm font-medium hover:bg-gray-100 transition-colors">
                📞 0818 07 4000
              </a>
            </div>
            
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3">HSE InfoLine</h3>
              <p className="mb-3 text-sm">Health Service Executive information</p>
              <a href="https://www.hse.ie/" target="_blank" rel="noopener noreferrer" 
                 className="bg-white text-purple-600 px-4 py-2 rounded text-sm font-medium hover:bg-gray-100 transition-colors">
                📞 1850 24 1850
              </a>
            </div>

            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3">Disability Federation</h3>
              <p className="mb-3 text-sm">National umbrella organisation for disability</p>
              <a href="https://www.disability-federation.ie/" target="_blank" rel="noopener noreferrer" 
                 className="bg-white text-green-600 px-4 py-2 rounded text-sm font-medium hover:bg-gray-100 transition-colors">
                🌐 Visit Website
              </a>
            </div>

            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3">Family Resource Centres</h3>
              <p className="mb-3 text-sm">Local community support and information</p>
              <a href="https://www.familyresource.ie/" target="_blank" rel="noopener noreferrer" 
                 className="bg-white text-orange-600 px-4 py-2 rounded text-sm font-medium hover:bg-gray-100 transition-colors">
                📍 Find Local Centre
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
