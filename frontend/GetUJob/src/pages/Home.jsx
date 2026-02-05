import { Link } from 'react-router-dom';
import Hero from '../components/Hero';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 font-sans">
        
      {/* Hero Section - Full Screen */}
      <Hero/>

      {/* Call to Action Cards */}
      <div className="py-16 px-6 h-[100vh]">
        <div className="max-w-5xl w-full mx-auto text-center space-y-16">
          <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
            
            {/* Job Seeker Card */}
            <Link 
              to="/seeker"
              className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 text-left flex flex-col justify-between overflow-hidden hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                 <svg className="w-32 h-32 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-blue-200">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  I’m a Job Seeker
                </h2>
                <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                  Build your profile, upload your resume, and request top-tier referrals.
                </p>
              </div>

              <div className="flex items-center font-bold text-blue-600 group-hover:translate-x-2 transition-transform relative z-10 text-sm">
                Find Referrals <span className="ml-2 text-lg">&rarr;</span>
              </div>
            </Link>

            {/* Referral Giver Card */}
            <Link 
              to="/giver"
              className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 text-left flex flex-col justify-between overflow-hidden hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                 <svg className="w-32 h-32 text-emerald-600" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
              </div>

              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-emerald-200">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  I Give Referrals
                </h2>
                <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                  Refer talent, earn rewards, and help your company grow.
                </p>
              </div>

              <div className="flex items-center font-bold text-emerald-600 group-hover:translate-x-2 transition-transform relative z-10 text-sm">
                Start Referring <span className="ml-2 text-lg">&rarr;</span>
              </div>
            </Link>

            {/* Skill Up Card */}
            <Link 
              to="/skillup"
              className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200 text-left flex flex-col justify-between overflow-hidden hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                 <svg className="w-32 h-32 text-purple-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg>
              </div>

              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-purple-200">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  Skill Up
                </h2>
                <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                   Learn new skills, get certified, and stand out to recruiters.
                </p>
              </div>

              <div className="flex items-center font-bold text-purple-600 group-hover:translate-x-2 transition-transform relative z-10 text-sm">
                Start Learning <span className="ml-2 text-lg">&rarr;</span>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home