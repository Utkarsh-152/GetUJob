import React from 'react';
import heroImage from '../assets/download.jpg';

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 px-6 md:px-16 w-full max-w-7xl mx-auto">
        {/* Text Content */}
        <div className="w-full md:w-1/2 space-y-8 text-left z-10">
          <div className="relative inline-block">
             <span className="absolute -inset-1 bg-blue-100 rounded-lg transform -skew-y-2 opacity-50"></span>
             <span className="relative text-blue-600 font-bold tracking-wider uppercase text-sm">Welcome to GetUJob</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
            Get Referred.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Get Hired.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
            The platform connecting ambition with opportunity. Experts refer talent, companies hire stars.
            <span className="block mt-4 text-gray-500 text-base font-medium">
              Join thousands of professionals advancing their careers today.
            </span>
          </p>
        </div>

        {/* Image Content */}
        <div className="w-full md:w-1/2 relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform transition-transform duration-500 hover:scale-[1.01] hover:rotate-1">
             <img 
               src={heroImage} 
               alt="Professionals connecting" 
               className="w-full h-auto object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 to-transparent mix-blend-overlay"></div>
          </div>

          {/* Floating Badge */}
          {/* <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-50 flex items-center gap-3 animate-pulse hidden md:flex">
             <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>
             </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Hero