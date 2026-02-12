import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, LogIn } from 'lucide-react';

const LoginReferralGivers = () => {
  const location = useLocation();
  const successMessage = location.state?.successMessage;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // TODO: plug in real login API here when ready
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-4 selection:bg-emerald-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-neutral-400 hover:text-white transition-colors mb-4 text-sm"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-white to-neutral-400 bg-clip-text text-transparent mb-2">
            Welcome back
          </h1>
          <p className="text-neutral-400">
            Sign in to access your referral dashboard.
          </p>
        </div>

        {successMessage && (
          <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/40 rounded-xl text-emerald-400 text-sm text-center">
            {successMessage}
          </div>
        )}

        <div className="bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 rounded-3xl p-6 md:p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-neutral-500" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Work Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-12 py-3 text-white placeholder:text-neutral-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all group-hover:border-emerald-500"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-neutral-500" />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-12 py-3 text-white placeholder:text-neutral-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all group-hover:border-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>Signing you in...</>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </>
              )}
            </button>

            <p className="text-center text-neutral-500 mt-4 text-sm">
              Don&apos;t have an account yet?{' '}
              <Link
                to="/"
                className="text-emerald-500 hover:text-emerald-400 font-medium hover:underline"
              >
                Back to home page
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginReferralGivers;

