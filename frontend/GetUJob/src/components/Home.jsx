import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex flex-col justify-center items-center p-6 font-sans">
      <div className="max-w-5xl w-full text-center space-y-16">
        
        {/* Hero Section */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Get Referred. <span className="text-blue-600">Get Hired.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The platform connecting ambition with opportunity. Experts refer talent, companies hire stars.
          </p>
        </div>

        {/* Call to Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
          
          {/* Job Seeker Card */}
          <Link 
            to="/seeker"
            className="group relative bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-100 text-left flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
               <svg className="w-32 h-32 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                I’m a Job Seeker
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Build your profile, upload your resume, and request top-tier referrals.
              </p>
            </div>

            <div className="flex items-center font-bold text-blue-600 group-hover:translate-x-2 transition-transform relative z-10">
              Find Referrals <span className="ml-2 text-xl">&rarr;</span>
            </div>
          </Link>

          {/* Referral Giver Card */}
          <Link 
            to="/giver"
            className="group relative bg-white p-10 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-100 text-left flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
               <svg className="w-32 h-32 text-emerald-600" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
            </div>

            <div className="relative z-10">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                I Give Referrals
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Refer talent, earn rewards, and help your company grow.
              </p>
            </div>

            <div className="flex items-center font-bold text-emerald-600 group-hover:translate-x-2 transition-transform relative z-10">
              Start Referring <span className="ml-2 text-xl">&rarr;</span>
            </div>
          </Link>

        </div>
      </div>
    </div>
  )
}

export default Home