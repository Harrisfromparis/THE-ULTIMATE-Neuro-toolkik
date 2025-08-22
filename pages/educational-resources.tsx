import Head from 'next/head';

export default function EducationalResourcesPage() {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#f0fffe'}}>
      <Head>
        <title>Educational Resources A-Z | Irish Educational System Guide</title>
        <meta name="description" content="Comprehensive guide to Irish educational resources, supports, applications, and entitlements for autism and special needs education." />
      </Head>
      
      <header className="p-8 text-center" style={{backgroundColor: '#7dd3c0'}}>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Educational Resources A-Z</h1>
        <p className="text-white/90 text-lg max-w-4xl mx-auto">
          Complete guide to Irish educational provision, resources, applications, and supports for autism and special needs education - everything parents, caregivers, teachers, and principals need to know.
        </p>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        
        {/* Quick Navigation */}
        <section className="bg-white rounded-lg p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🔍 Quick Navigation</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {['Applications', 'Autism Units', 'Curriculum', 'DARE', 'Exemptions', 'Funding', 'Grants', 'IEP', 'JCT', 'Learning Support', 'Miltown Hub', 'NCSE', 'PLU', 'Resources', 'SEN', 'Transitions', 'Universities', 'Zones'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} 
                 className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded text-center text-sm font-medium transition-colors">
                {item}
              </a>
            ))}
          </div>
        </section>

        {/* Applications & Forms */}
        <section id="applications" className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold text-green-600 mb-6">📋 Applications & Forms</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">School Applications</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Primary school enrolment forms</li>
                <li>• Secondary school applications</li>
                <li>• Special school applications</li>
                <li>• Autism unit applications</li>
                <li>• Home tuition applications</li>
              </ul>
              <a href="https://www.gov.ie/en/service/cc026-school-enrolment/" target="_blank" rel="noopener noreferrer" 
                 className="inline-block mt-3 bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors">
                School Enrolment Info
              </a>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">Educational Assessments</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Educational psychological assessment applications</li>
                <li>• NCSE resource teaching applications</li>
                <li>• SNA (Special Needs Assistant) applications</li>
                <li>• Assistive technology applications</li>
                <li>• Transport grant applications</li>
              </ul>
              <a href="https://ncse.ie/" target="_blank" rel="noopener noreferrer" 
                 className="inline-block mt-3 bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors">
                NCSE Applications
              </a>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">Third Level Applications</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• CAO applications with accommodations</li>
                <li>• DARE (Disability Access) applications</li>
                <li>• HEAR (Higher Education Access) applications</li>
                <li>• University disability support applications</li>
                <li>• Student grant applications (SUSI)</li>
              </ul>
              <a href="https://www.cao.ie/index.php?page=disability&s=dare" target="_blank" rel="noopener noreferrer" 
                 className="inline-block mt-3 bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors">
                DARE Applications
              </a>
            </div>
          </div>
        </section>

  {/* Curriculum & Learning Support */}
  <section id="curriculum" className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold text-blue-600 mb-6">📚 Curriculum & Learning Support</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 id="iep" className="text-xl font-semibold text-blue-800 mb-3">Curriculum.ie Resources</h3>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• Primary curriculum guidelines</li>
                <li>• Junior cycle specifications</li>
                <li>• Senior cycle programs</li>
                <li>• Level 1 and Level 2 Learning Programs (L1LP & L2LP)</li>
                <li>• Special education curriculum adaptations</li>
                <li>• Assessment guidelines</li>
                <li>• Inclusive education resources</li>
              </ul>
              <a href="https://curriculum.gov.ie/" target="_blank" rel="noopener noreferrer" 
                 className="inline-block bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                Visit Curriculum.ie
              </a>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Priority Learning Units (PLU)</h3>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• <strong>PLU1:</strong> Foundational learning for students with significant needs</li>
                <li>• <strong>PLU2:</strong> Extended learning opportunities</li>
                <li>• Individualized learning outcomes</li>
                <li>• Functional skills development</li>
                <li>• Life skills curriculum</li>
                <li>• Social skills programs</li>
                <li>• Transition planning resources</li>
              </ul>
              <a href="https://curriculum.gov.ie/senior-cycle/senior-cycle-subjects/priority-learning-units/" target="_blank" rel="noopener noreferrer" 
                 className="inline-block bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                PLU Guidelines
              </a>
            </div>
          </div>
        </section>

        {/* Professional Development */}
        <section id="jct" className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold text-purple-600 mb-6">🎓 Professional Development & Training</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">JCT.ie Resources</h3>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• Junior Cycle for Teachers</li>
                <li>• Professional learning networks</li>
                <li>• Inclusive education training</li>
                <li>• Assessment and feedback strategies</li>
                <li>• Digital learning resources</li>
                <li>• Special educational needs CPD</li>
              </ul>
              <a href="https://www.jct.ie/" target="_blank" rel="noopener noreferrer" 
                 className="inline-block bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700 transition-colors">
                JCT Resources
              </a>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">SESS Ireland</h3>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• Special Education Support Service</li>
                <li>• Autism-specific training</li>
                <li>• Behavior support strategies</li>
                <li>• Sensory processing workshops</li>
                <li>• Communication supports</li>
                <li>• Family support programs</li>
              </ul>
              <a href="https://www.sess.ie/" target="_blank" rel="noopener noreferrer" 
                 className="inline-block bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700 transition-colors">
                SESS Training
              </a>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">Miltown Educational Hub</h3>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• Research-based educational resources</li>
                <li>• Evidence-informed practices</li>
                <li>• Teacher professional development</li>
                <li>• Educational leadership programs</li>
                <li>• Special needs education research</li>
                <li>• Policy development support</li>
              </ul>
              <a href="https://miltowneducationhub.ie/" target="_blank" rel="noopener noreferrer" 
                 className="inline-block bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700 transition-colors">
                Miltown Hub
              </a>
            </div>
          </div>
        </section>

        {/* Autism Units & Special Education */}
        <section id="autism-units" className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold text-orange-600 mb-6">🏫 Autism Units & Special Education Provision</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">Applying for Autism Units</h3>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• <strong>Step 1:</strong> Obtain formal autism diagnosis</li>
                <li>• <strong>Step 2:</strong> Educational psychological assessment</li>
                <li>• <strong>Step 3:</strong> NCSE application for placement</li>
                <li>• <strong>Step 4:</strong> School placement meeting</li>
                <li>• <strong>Step 5:</strong> Individual Education Plan development</li>
                <li>• Appeals process if application denied</li>
                <li>• Alternative placement options</li>
              </ul>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">Autism Unit Resources</h3>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• Structured teaching approaches (TEACCH)</li>
                <li>• Visual supports and schedules</li>
                <li>• Sensory regulation resources</li>
                <li>• Social skills curricula</li>
                <li>• Communication support systems</li>
                <li>• Transition planning tools</li>
                <li>• Parent collaboration frameworks</li>
              </ul>
            </div>
          </div>

          <div className="bg-orange-100 p-6 rounded-lg mt-6">
            <h3 className="text-xl font-semibold text-orange-800 mb-3">🎯 Staffing Requirements for Autism Units</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h4 className="font-semibold text-orange-700 mb-2">Teaching Staff</h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Qualified primary/secondary teachers</li>
                  <li>• Special education qualifications</li>
                  <li>• Autism-specific training</li>
                  <li>• Ongoing professional development</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-700 mb-2">Support Staff</h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Special Needs Assistants (SNAs)</li>
                  <li>• Speech and Language Therapists</li>
                  <li>• Occupational Therapists</li>
                  <li>• Behavioral support specialists</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-700 mb-2">Leadership</h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Special Education Coordinators</li>
                  <li>• Unit coordinators/managers</li>
                  <li>• Principal/Deputy Principal oversight</li>
                  <li>• NCSE liaison coordination</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Funding & Grants */}
        <section id="funding" className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold text-red-600 mb-6">💰 Funding, Grants & Financial Support</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-red-800 mb-3">School Funding</h3>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• Capitation grants</li>
                <li>• Special education support grants</li>
                <li>• Autism unit establishment grants</li>
                <li>• Equipment and resources funding</li>
                <li>• Building modification grants</li>
                <li>• Transport grants</li>
              </ul>
              <a href="https://www.gov.ie/en/service/7d7640-school-transport-scheme/" target="_blank" rel="noopener noreferrer" 
                 className="inline-block bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition-colors">
                Transport Scheme
              </a>
            </div>

            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-red-800 mb-3">Technology Grants</h3>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• Assistive technology grants</li>
                <li>• Communication device funding</li>
                <li>• Educational software licenses</li>
                <li>• Computer equipment grants</li>
                <li>• Sensory equipment funding</li>
                <li>• Accessibility modification grants</li>
              </ul>
              <a href="https://www.assistivethought.com/assistive-technology-grants-ireland/" target="_blank" rel="noopener noreferrer" 
                 className="inline-block bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition-colors">
                AT Grants Info
              </a>
            </div>

            <div className="bg-red-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-red-800 mb-3">Student Support</h3>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• Domiciliary Care Allowance</li>
                <li>• Student Universal Support Ireland (SUSI)</li>
                <li>• Disability allowance for students</li>
                <li>• Book grant schemes</li>
                <li>• Exam accommodation funding</li>
                <li>• Third-level disability supports</li>
              </ul>
              <a href="https://susi.ie/" target="_blank" rel="noopener noreferrer" 
                 className="inline-block bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition-colors">
                SUSI Grants
              </a>
            </div>
          </div>
        </section>

        {/* Exemptions & Accommodations */}
        <section id="exemptions" className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold text-teal-600 mb-6">📝 Exemptions & Exam Accommodations</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-teal-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-teal-800 mb-3">State Exam Exemptions</h3>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• <strong>Irish language exemption</strong> - For students with learning difficulties</li>
                <li>• <strong>Subject exemptions</strong> - In exceptional circumstances</li>
                <li>• <strong>Partial exemptions</strong> - Specific components of subjects</li>
                <li>• <strong>Religious education exemption</strong> - Based on conscience</li>
                <li>• Documentation requirements for applications</li>
                <li>• Appeal procedures for denied exemptions</li>
              </ul>
              <a href="https://www.examinations.ie/schools/senterror.html" target="_blank" rel="noopener noreferrer" 
                 className="inline-block bg-teal-600 text-white px-4 py-2 rounded text-sm hover:bg-teal-700 transition-colors">
                SEC Exemptions
              </a>
            </div>

            <div className="bg-teal-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-teal-800 mb-3">Exam Accommodations</h3>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• <strong>Extra time</strong> - Additional time for completion</li>
                <li>• <strong>Rest breaks</strong> - Scheduled breaks during exams</li>
                <li>• <strong>Separate venue</strong> - Alternative exam location</li>
                <li>• <strong>Reader/scribe</strong> - Assistance with reading/writing</li>
                <li>• <strong>Assistive technology</strong> - Computer use, text-to-speech</li>
                <li>• <strong>Modified papers</strong> - Large print, Braille adaptations</li>
                <li>• Application deadlines and procedures</li>
              </ul>
              <a href="https://www.examinations.ie/schools/reasonable_accommodations.html" target="_blank" rel="noopener noreferrer" 
                 className="inline-block bg-teal-600 text-white px-4 py-2 rounded text-sm hover:bg-teal-700 transition-colors">
                Reasonable Accommodations
              </a>
            </div>
          </div>
        </section>

        {/* Third Level & University Support */}
        <section id="universities" className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold text-indigo-600 mb-6">🎓 Third Level & University Support</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-indigo-800 mb-3">DARE Program</h3>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• Disability Access Route to Education</li>
                <li>• Reduced CAO points for eligible students</li>
                <li>• Additional college places reserved</li>
                <li>• Comprehensive application process</li>
                <li>• Supporting documentation requirements</li>
                <li>• Interview and assessment procedures</li>
              </ul>
              <a href="https://accesscollege.ie/dare/" target="_blank" rel="noopener noreferrer" 
                 className="inline-block bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700 transition-colors">
                DARE Details
              </a>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-indigo-800 mb-3">University Disability Services</h3>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• <strong>Trinity College Dublin</strong> - Disability Service</li>
                <li>• <strong>UCD</strong> - AccessUD and Student Advisors</li>
                <li>• <strong>DCU</strong> - Student Support & Development</li>
                <li>• <strong>NUI Galway</strong> - Disability Support Service</li>
                <li>• <strong>UCC</strong> - Disability Support Service</li>
                <li>• <strong>TU Dublin</strong> - Access & Civic Engagement</li>
              </ul>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-indigo-800 mb-3">Support Services Available</h3>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• Academic accommodations and adjustments</li>
                <li>• Assistive technology and equipment</li>
                <li>• Note-taking and transcription services</li>
                <li>• Exam accommodations and alternatives</li>
                <li>• Personal assistance and support workers</li>
                <li>• Counseling and mental health support</li>
                <li>• Transition and orientation programs</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Transition Planning */}
        <section id="transitions" className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold text-pink-600 mb-6">🔄 Transition Planning & Support</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-pink-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-pink-800 mb-3">Primary to Secondary Transition</h3>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• <strong>6th Class Preparation:</strong></li>
                <li>&nbsp;&nbsp;• School visit programs</li>
                <li>&nbsp;&nbsp;• Transition booklets and social stories</li>
                <li>&nbsp;&nbsp;• Meeting secondary school staff</li>
                <li>&nbsp;&nbsp;• Familiarization with new routines</li>
                <li>• <strong>Documentation Transfer:</strong></li>
                <li>&nbsp;&nbsp;• Student Support File transfer</li>
                <li>&nbsp;&nbsp;• IEP continuation planning</li>
                <li>&nbsp;&nbsp;• Medical and therapy reports</li>
                <li>&nbsp;&nbsp;• Accommodation needs documentation</li>
              </ul>
            </div>

            <div className="bg-pink-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-pink-800 mb-3">Secondary to Third Level/Employment</h3>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• <strong>Career Guidance:</strong></li>
                <li>&nbsp;&nbsp;• Interest and aptitude assessments</li>
                <li>&nbsp;&nbsp;• Course selection guidance</li>
                <li>&nbsp;&nbsp;• Work experience placements</li>
                <li>&nbsp;&nbsp;• Interview preparation</li>
                <li>• <strong>Life Skills Development:</strong></li>
                <li>&nbsp;&nbsp;• Independent living skills</li>
                <li>&nbsp;&nbsp;• Money management</li>
                <li>&nbsp;&nbsp;• Travel training</li>
                <li>&nbsp;&nbsp;• Self-advocacy skills</li>
              </ul>
            </div>
          </div>

          <div id="zones" className="bg-pink-100 p-6 rounded-lg mt-6">
            <h3 className="text-xl font-semibold text-pink-800 mb-3">🎯 Zones of Regulation</h3>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="bg-blue-100 p-4 rounded border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-700 mb-2">Blue Zone</h4>
                <p className="text-sm text-gray-700">Low energy, sad, tired, sick, bored</p>
              </div>
              <div className="bg-green-100 p-4 rounded border-l-4 border-green-500">
                <h4 className="font-semibold text-green-700 mb-2">Green Zone</h4>
                <p className="text-sm text-gray-700">Calm, happy, focused, ready to learn</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-700 mb-2">Yellow Zone</h4>
                <p className="text-sm text-gray-700">Frustrated, worried, excited, overwhelmed</p>
              </div>
              <div className="bg-red-100 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-700 mb-2">Red Zone</h4>
                <p className="text-sm text-gray-700">Angry, terrified, elated, out of control</p>
              </div>
            </div>
            <p className="text-gray-700 mt-4 text-sm">
              The Zones of Regulation is a framework for teaching emotional regulation and self-control, 
              widely used in Irish schools to support all students, particularly those with autism and ADHD.
            </p>
          </div>
        </section>

        {/* Resource Teaching & Educational Entitlements */}
        <section id="entitlements" className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-700 mb-6">⚖️ Educational Entitlements & Legal Rights</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Legal Framework & Rights</h3>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• <strong>Education Act 1998</strong> - Right to appropriate education</li>
                <li>• <strong>EPSEN Act 2004</strong> - Special educational needs provision</li>
                <li>• <strong>Disability Act 2005</strong> - Access and accommodation rights</li>
                <li>• <strong>UN Convention on Rights of Persons with Disabilities</strong></li>
                <li>• <strong>Equal Status Acts</strong> - Anti-discrimination protection</li>
                <li>• Individual education plan statutory requirements</li>
                <li>• Appeals procedures and advocacy rights</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Resource Teaching Entitlements</h3>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• <strong>General Allocation Model (GAM)</strong></li>
                <li>&nbsp;&nbsp;• Automatic resource hours for identified needs</li>
                <li>&nbsp;&nbsp;• Graduated approach to intervention</li>
                <li>• <strong>School Support Plus (SS+)</strong></li>
                <li>&nbsp;&nbsp;• Additional hours for complex needs</li>
                <li>&nbsp;&nbsp;• NCSE approval required</li>
                <li>• <strong>Special Needs Assistant (SNA) support</strong></li>
                <li>&nbsp;&nbsp;• Care needs assessment</li>
                <li>&nbsp;&nbsp;• Individual vs shared SNA allocation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Inclusive Practices & Mainstream Support */}
        <section id="inclusive" className="bg-white rounded-lg p-8 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold text-emerald-600 mb-6">🤝 Inclusive Practices & Mainstream Support</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-emerald-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-emerald-800 mb-3">Universal Design for Learning (UDL)</h3>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• Multiple means of representation</li>
                <li>• Multiple means of engagement</li>
                <li>• Multiple means of action/expression</li>
                <li>• Flexible curriculum delivery</li>
                <li>• Accessible learning materials</li>
                <li>• Choice in assessment methods</li>
              </ul>
            </div>

            <div className="bg-emerald-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-emerald-800 mb-3">Classroom Accommodations</h3>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• Preferential seating arrangements</li>
                <li>• Visual supports and schedules</li>
                <li>• Sensory break opportunities</li>
                <li>• Modified instructions and assignments</li>
                <li>• Assistive technology integration</li>
                <li>• Peer support systems</li>
              </ul>
            </div>

            <div className="bg-emerald-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-emerald-800 mb-3">Whole School Approaches</h3>
              <ul className="text-gray-700 space-y-2 mb-4">
                <li>• Autism-friendly school policies</li>
                <li>• Staff training and awareness</li>
                <li>• Sensory-friendly environments</li>
                <li>• Anti-bullying initiatives</li>
                <li>• Parent-school collaboration</li>
                <li>• Community partnership development</li>
              </ul>
            </div>
          </div>
        </section>

  {/* A-Z Quick Reference */}
  <section id="glossary" className="bg-gradient-to-r from-green-500 via-blue-600 to-purple-600 rounded-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">📖 A-Z Quick Reference Guide</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 text-sm">
            <div className="bg-white/10 p-4 rounded backdrop-blur-sm">
              <h3 className="font-semibold mb-2">A-F</h3>
              <ul className="space-y-1">
                <li><strong>ASD:</strong> Autism Spectrum Disorder</li>
                <li><strong>CAO:</strong> Central Applications Office</li>
                <li><strong>DARE:</strong> Disability Access Route to Education</li>
                <li><strong>DCA:</strong> Domiciliary Care Allowance</li>
                <li><strong>EPSEN:</strong> Education for Persons with Special Educational Needs</li>
                <li><strong>GAM:</strong> General Allocation Model</li>
              </ul>
            </div>
            <div className="bg-white/10 p-4 rounded backdrop-blur-sm">
              <h3 className="font-semibold mb-2">G-M</h3>
              <ul className="space-y-1">
                <li><strong>HEAR:</strong> Higher Education Access Route</li>
                <li><strong>IEP:</strong> Individual Education Plan</li>
                <li><strong>JCT:</strong> Junior Cycle for Teachers</li>
                <li><strong>L1LP/L2LP:</strong> Level 1/2 Learning Programs</li>
                <li><strong>NCSE:</strong> National Council for Special Education</li>
                <li><strong>NEPS:</strong> National Educational Psychological Service</li>
              </ul>
            </div>
            <div className="bg-white/10 p-4 rounded backdrop-blur-sm">
              <h3 className="font-semibold mb-2">N-Z</h3>
              <ul className="space-y-1">
                <li><strong>PLU:</strong> Priority Learning Units</li>
                <li><strong>SEC:</strong> State Examinations Commission</li>
                <li><strong>SEN:</strong> Special Educational Needs</li>
                <li><strong>SESS:</strong> Special Education Support Service</li>
                <li><strong>SNA:</strong> Special Needs Assistant</li>
                <li><strong>SUSI:</strong> Student Universal Support Ireland</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Information & Next Steps */}
        <section className="bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📞 Key Contacts & Next Steps</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <h3 className="font-semibold text-gray-800 mb-2">NCSE Regional Offices</h3>
              <p className="text-gray-600 text-sm mb-3">Applications for additional support</p>
              <a href="https://ncse.ie/contact" target="_blank" rel="noopener noreferrer" 
                 className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                Find Your Region
              </a>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-800 mb-2">Department of Education</h3>
              <p className="text-gray-600 text-sm mb-3">Policy and general inquiries</p>
              <a href="https://www.gov.ie/en/organisation/department-of-education/" target="_blank" rel="noopener noreferrer" 
                 className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors">
                Contact Department
              </a>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-800 mb-2">Educational Welfare Services</h3>
              <p className="text-gray-600 text-sm mb-3">School attendance and welfare</p>
              <a href="https://www.tusla.ie/services/educational-welfare-services/" target="_blank" rel="noopener noreferrer" 
                 className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700 transition-colors">
                Tusla EWS
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
