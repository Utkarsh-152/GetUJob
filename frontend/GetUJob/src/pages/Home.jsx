import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import WMap from '../components/WMap';
import { Search, Handshake, GraduationCap, ArrowRight } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-black font-sans selection:bg-white/20">
      
      {/* Hero Section - Full Screen */}
      <Hero/>
      <WMap/>

      {/* Call to Action Cards */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Job Seeker Card */}
            <Link 
              to="/seeker"
              className="group relative bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-8 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="p-3 bg-neutral-800 w-fit rounded-2xl mb-6 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors duration-300">
                   <Search className="w-8 h-8 text-neutral-400 group-hover:text-blue-400 transition-colors" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  I’m a Job Seeker
                </h2>
                <p className="text-neutral-400 mb-8 leading-relaxed">
                  Build your profile, upload your resume, and request top-tier referrals.
                </p>
                <div className="mt-auto flex items-center text-sm font-medium text-neutral-300 group-hover:text-blue-400 transition-colors">
                  Find Referrals <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Referral Giver Card */}
            <Link 
              to="/giver"
              className="group relative bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-8 rounded-3xl overflow-hidden hover:border-emerald-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="p-3 bg-neutral-800 w-fit rounded-2xl mb-6 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors duration-300">
                  <Handshake className="w-8 h-8 text-neutral-400 group-hover:text-emerald-400 transition-colors" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  I Give Referrals
                </h2>
                <p className="text-neutral-400 mb-8 leading-relaxed">
                  Refer talent, earn rewards, and help your company grow.
                </p>
                <div className="mt-auto flex items-center text-sm font-medium text-neutral-300 group-hover:text-emerald-400 transition-colors">
                  Start Referring <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Skill Up Card */}
            <Link 
              to="/skillup"
              className="group relative bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-8 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="p-3 bg-neutral-800 w-fit rounded-2xl mb-6 group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors duration-300">
                  <GraduationCap className="w-8 h-8 text-neutral-400 group-hover:text-purple-400 transition-colors" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                  Skill Up
                </h2>
                <p className="text-neutral-400 mb-8 leading-relaxed">
                   Learn new skills, get certified, and stand out to recruiters.
                </p>
                <div className="mt-auto flex items-center text-sm font-medium text-neutral-300 group-hover:text-purple-400 transition-colors">
                  Start Learning <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home