import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  Building2,
  Globe,
  Briefcase,
  Upload,
  ArrowRight,
  Loader2,
  Hash,
} from 'lucide-react';

import axios from 'axios';

const MAX_PHOTO_SIZE_MB = 5;

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
    referralsLeft: 3, // Default value
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'profilePhoto') {
      const file = e.target.files[0];

      if (!file) return;

      const fileSizeInMb = file.size / (1024 * 1024);
      if (fileSizeInMb > MAX_PHOTO_SIZE_MB) {
        setError(`Profile photo must be less than ${MAX_PHOTO_SIZE_MB}MB.`);
        return;
      }

      setError('');
      setFormData((prev) => ({ ...prev, profilePhoto: file }));
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'referralsLeft' ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Create FormData object for API
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          data.append(key, value);
        }
      });

      data.referralsLeft = Number(formData.referralsLeft);

      await axios.post('http://localhost:8000/api/employer/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // On success, send user to login with a success message
      navigate('/login', {
        state: {
          successMessage: 'Your account is created. Please log in.',
        },
      });
    } catch (err) {
      console.error('Registration failed:', err);
      setError(
        err.response?.data?.message ||
          'Registration failed. Please check your details and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-black text-white font-sans flex items-center justify-center px-4">
      {/* Shell */}
      <div className="relative w-full max-w-5xl h-[560px] rounded-3xl border border-neutral-800 bg-linear-to-br from-neutral-950 via-neutral-900 to-neutral-950 shadow-[0_28px_80px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Accent blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-16 h-56 w-56 rounded-full bg-emerald-500/15 blur-3xl" />
          <div className="absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 flex h-full flex-col md:flex-row">
          {/* Left brand / pitch */}
          <div className="hidden md:flex basis-2/5 flex-col justify-between border-r border-neutral-800/80 bg-linear-to-b from-neutral-900/90 via-neutral-950/40 to-neutral-950/90 px-8 py-7">
            <div>
              <button className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-300">
                <span className="mr-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Referral Giver
              </button>
              <h1 className="mt-4 text-2xl font-semibold leading-tight text-white">
                Open doors for
                <span className="bg-linear-to-r from-emerald-300 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
                  {' '}
                  great talent.
                </span>
              </h1>
              <p className="mt-3 text-[13px] leading-relaxed text-neutral-400">
                Create a referral profile once and share trustworthy recommendations with
                candidates across roles and companies.
              </p>
            </div>

            <div className="space-y-3 text-[12px] text-neutral-300/90">
              <div className="flex items-center justify-between rounded-2xl border border-neutral-800 bg-neutral-900/70 px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">
                      ACTIVE REFERRALS
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {formData.referralsLeft} slots
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-neutral-500">
                <span>Secure by design • No spam</span>
                <span className="text-neutral-400">
                  GetUJob<span className="text-emerald-400">·</span>Network
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-neutral-500">
              <Link
                to="/"
                className="inline-flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
              >
                <ArrowRight className="h-3 w-3 rotate-180" />
                Back to home
              </Link>
              <span className="rounded-full border border-neutral-700/80 bg-neutral-900/80 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                Trusted referrals only
              </span>
            </div>
          </div>

          {/* Right: compact form */}
          <div className="flex-1 px-5 py-6 md:px-8 md:py-7 flex flex-col">
            <div className="mb-4 flex items-start justify-between md:hidden">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Become a referral giver
                </h2>
                <p className="mt-1 text-[12px] text-neutral-400">
                  A short profile so candidates and hiring teams know who you are.
                </p>
              </div>
              <Link
                to="/"
                className="ml-3 rounded-full border border-neutral-700 px-3 py-1 text-[11px] text-neutral-400 hover:text-white"
              >
                Home
              </Link>
            </div>

            <div className="mb-4 flex items-center gap-3">
              <div className="relative">
                <div className="h-14 w-14 rounded-2xl border border-dashed border-neutral-700 bg-neutral-900/70 flex items-center justify-center">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-full w-full rounded-2xl object-cover"
                    />
                  ) : (
                    <Upload className="h-5 w-5 text-neutral-400" />
                  )}
                </div>
                <input
                  type="file"
                  id="profilePhoto"
                  name="profilePhoto"
                  accept="image/*"
                  className="absolute inset-0 h-14 w-14 cursor-pointer opacity-0"
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
                  PROFILE PREVIEW
                </p>
                <p className="text-[13px] text-neutral-300">
                  Add a clear headshot. JPG or PNG, under {MAX_PHOTO_SIZE_MB}MB.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
              {/* Inputs grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[13px]">
                {/* Personal */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Personal
                  </div>

                  <div className="space-y-2.5">
                    <div className="relative group">
                      <User className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                      <input
                        type="text"
                        name="fullname"
                        required
                        placeholder="Full name"
                        value={formData.fullname}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-neutral-800 bg-neutral-950/60 pl-9 pr-3 py-2.5 text-[13px] text-white placeholder:text-neutral-600 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/70 group-hover:border-emerald-500/60"
                      />
                    </div>

                    <div className="relative group">
                      <User className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                      <input
                        type="text"
                        name="username"
                        required
                        placeholder="@username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-neutral-800 bg-neutral-950/60 pl-9 pr-3 py-2.5 text-[13px] text-white placeholder:text-neutral-600 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/70 group-hover:border-emerald-500/60"
                      />
                    </div>

                    <div className="relative group">
                      <Mail className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="Personal email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-neutral-800 bg-neutral-950/60 pl-9 pr-3 py-2.5 text-[13px] text-white placeholder:text-neutral-600 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/70 group-hover:border-emerald-500/60"
                      />
                    </div>

                    <div className="relative group">
                      <Lock className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                      <input
                        type="password"
                        name="password"
                        required
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-neutral-800 bg-neutral-950/60 pl-9 pr-3 py-2.5 text-[13px] text-white placeholder:text-neutral-600 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/70 group-hover:border-emerald-500/60"
                      />
                    </div>
                  </div>
                </div>

                {/* Company */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">
                    <span>Company</span>
                    <span className="text-[10px] text-neutral-500 normal-case">
                      We never share without consent
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="relative group">
                      <Building2 className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                      <input
                        type="text"
                        name="companyName"
                        required
                        placeholder="Company name"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-neutral-800 bg-neutral-950/60 pl-9 pr-3 py-2.5 text-[13px] text-white placeholder:text-neutral-600 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/70 group-hover:border-emerald-500/60"
                      />
                    </div>

                    <div className="relative group">
                      <Briefcase className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                      <input
                        type="email"
                        name="companyEmail"
                        required
                        placeholder="Work email"
                        value={formData.companyEmail}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-neutral-800 bg-neutral-950/60 pl-9 pr-3 py-2.5 text-[13px] text-white placeholder:text-neutral-600 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/70 group-hover:border-emerald-500/60"
                      />
                    </div>

                    <div className="relative group">
                      <Globe className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                      <input
                        type="url"
                        name="companyWebsite"
                        placeholder="Company website"
                        value={formData.companyWebsite}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-neutral-800 bg-neutral-950/60 pl-9 pr-3 py-2.5 text-[13px] text-white placeholder:text-neutral-600 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/70 group-hover:border-emerald-500/60"
                      />
                    </div>

                    <div className="relative group">
                      <Hash className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                      <input
                        type="number"
                        name="referralsLeft"
                        placeholder="Referral slots you want to offer"
                        value={formData.referralsLeft}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-neutral-800 bg-neutral-950/60 pl-9 pr-3 py-2.5 text-[13px] text-white placeholder:text-neutral-600 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/70 group-hover:border-emerald-500/60"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-2 space-y-3">
                {error && (
                  <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-[12px] text-red-300">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 text-[14px] font-semibold text-emerald-950 shadow-[0_18px_45px_rgba(16,185,129,0.35)] transition-all duration-200 hover:-translate-y-px hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating your referral profile...
                    </>
                  ) : (
                    <>
                      Create referral giver account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-[12px] text-neutral-500">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-medium text-emerald-400 hover:text-emerald-300"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralGiverRegister;
