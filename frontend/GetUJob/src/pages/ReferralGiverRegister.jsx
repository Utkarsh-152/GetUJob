import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ReferralGiverRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    companyName: '',
    companyEmail: '',
    companyWebsite: '',
    profilePhoto: null,
  });
  
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === 'profilePhoto') {
      const file = e.target.files[0];
      if (file) {
        setFormData({ ...formData, profilePhoto: file });
        setPreviewUrl(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    console.log('Referral Giver Registration Data (FormData):', data);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white font-sans">
      
      {/* Left Side - Brand (35% width) - Compact content */}
      <div className="hidden md:flex w-[35%] bg-emerald-900 relative flex-col justify-between p-8 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <circle cx="0" cy="0" r="40" fill="white" />
                <circle cx="100" cy="100" r="50" fill="white" />
            </svg>
        </div>

        <div className="relative z-10">
           <Link to="/" className="inline-flex items-center text-emerald-200 hover:text-white transition-colors text-sm">
               <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
               Back home
            </Link>
            <div className="mt-8">
                <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-3">
                    Elite Network.
                </h1>
                <p className="text-base text-emerald-100 font-light opacity-90">
                    Shape the future of tech hiring.
                </p>
            </div>
        </div>

        <div className="relative z-10 space-y-3 text-sm">
             <div className="flex items-center gap-3 text-emerald-100">
                <div className="w-6 h-6 rounded-full bg-emerald-800 flex items-center justify-center text-xs">1</div>
                <span>Create profile</span>
             </div>
             <div className="flex items-center gap-3 text-emerald-100">
                <div className="w-6 h-6 rounded-full bg-emerald-800 flex items-center justify-center text-xs">2</div>
                <span>Verify credentials</span>
             </div>
             <div className="flex items-center gap-3 text-emerald-100">
                <div className="w-6 h-6 rounded-full bg-emerald-800 flex items-center justify-center text-xs">3</div>
                <span>Start earning</span>
             </div>
        </div>
      </div>

      {/* Right Side - Form (65%) - Perfectly Centered, No Scroll */}
      <div className="w-full md:w-[65%] h-full flex flex-col justify-center items-center bg-gray-50 px-4 sm:px-8">
        <div className="w-full max-w-3xl bg-white md:bg-transparent rounded-2xl shadow-xl md:shadow-none p-6 md:p-0">
          
          <div className="flex items-center justify-between mb-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
                <p className="text-gray-500 text-sm">Referral Giver Registration</p>
            </div>
            
            {/* Compact Profile Picture Upload */}
            <div className="relative group">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-100 shadow-sm bg-gray-100 flex items-center justify-center cursor-pointer">
                    {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    )}
                </div>
                <label htmlFor="profilePhoto" className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full shadow-md cursor-pointer hover:bg-emerald-700 transition-colors">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                </label>
                <input type="file" id="profilePhoto" name="profilePhoto" accept="image/*" className="hidden" onChange={handleChange} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            
            {/* Personal Details Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  required
                  className="w-full px-3 py-2 rounded border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm transition-all"
                  placeholder="John Doe"
                  value={formData.fullname}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Username</label>
                <input
                  type="text"
                  name="username"
                  required
                  className="w-full px-3 py-2 rounded border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm transition-all"
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Account Details Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Personal Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 rounded border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm transition-all"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full px-3 py-2 rounded border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="border-t border-gray-200 my-2"></div>

            {/* Company Details Row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  required
                  className="w-full px-3 py-2 rounded border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm transition-all"
                  placeholder="Acme Corp"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-1">
                 <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Website</label>
                 <input
                  type="url"
                  name="companyWebsite"
                  className="w-full px-3 py-2 rounded border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm transition-all"
                  placeholder="acme.com"
                  value={formData.companyWebsite}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Company Email</label>
              <input
                type="email"
                name="companyEmail"
                required
                className="w-full px-3 py-2 rounded border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-sm transition-all"
                placeholder="hr@acme.com"
                value={formData.companyEmail}
                onChange={handleChange}
              />
            </div>

            <div className="pt-2">
                <button
                type="submit"
                className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-emerald-700 hover:shadow-lg transition-all duration-300 text-sm tracking-wide"
                  >
              
                Register Account
                </button>
            </div>

            <p className="text-center text-gray-400 text-xs mt-2">
              Have an account?{' '}
              <Link to="/login" className="text-emerald-600 font-semibold hover:underline">
                Sign in
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ReferralGiverRegister;
