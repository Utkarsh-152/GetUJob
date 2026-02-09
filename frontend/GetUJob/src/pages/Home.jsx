import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Hero from '../components/Hero';
import WMap from '../components/WMap';
import { Search, Handshake, GraduationCap, ArrowRight } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-black font-sans selection:bg-white/20">
      {/* Hero Section */}
      {/* <WMap /> */}
      <Hero />

      {/* Network Map Section */}

      {/* Primary Paths Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center mb-10">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-400"
            >
              Choose how you use GetUJob
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="mt-4 text-3xl md:text-4xl font-semibold text-white"
            >
              One platform, three ways to grow.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="mt-3 max-w-2xl text-sm md:text-base text-neutral-400"
            >
              Whether you&apos;re hunting for your next role, opening doors for others, or
              levelling up your skills, GetUJob gives you a clean place to start.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Job Seeker Card */}
            <Link to="/seeker" className="group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="relative h-full overflow-hidden rounded-3xl border border-neutral-800 bg-linear-to-br from-neutral-900/90 via-neutral-950 to-neutral-900/90 p-7 shadow-[0_18px_60px_rgba(0,0,0,0.8)] backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-2 group-hover:border-blue-500/60 group-hover:shadow-[0_22px_70px_rgba(37,99,235,0.45)]"
              >
                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-blue-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-900 border border-neutral-700 group-hover:border-blue-400/70 group-hover:bg-blue-500/15 transition-colors">
                      <Search className="w-6 h-6 text-neutral-400 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <div className="text-xs font-medium uppercase tracking-[0.18em] text-blue-300/70">
                      For job seekers
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    I&apos;m a Job Seeker
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-5">
                    Build a sharp profile, share your story, and get warm introductions from
                    people already inside top companies.
                  </p>
                  <ul className="mb-6 space-y-1.5 text-xs text-neutral-400">
                    <li>• Profile that&apos;s built for referrals, not just applications</li>
                    <li>• Upload your resume once, share with curated referrers</li>
                    <li>• Track who&apos;s opened and acted on your request</li>
                  </ul>

                  <div className="mt-auto flex items-center text-sm font-medium text-neutral-200 group-hover:text-blue-300 transition-colors">
                    Find referrals
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Referral Giver Card */}
            <Link to="/giver" className="group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative h-full overflow-hidden rounded-3xl border border-neutral-800 bg-linear-to-br from-neutral-900/90 via-neutral-950 to-neutral-900/90 p-7 shadow-[0_18px_60px_rgba(0,0,0,0.8)] backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-2 group-hover:border-emerald-500/60 group-hover:shadow-[0_22px_70px_rgba(16,185,129,0.45)]"
              >
                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-900 border border-neutral-700 group-hover:border-emerald-400/70 group-hover:bg-emerald-500/15 transition-colors">
                      <Handshake className="w-6 h-6 text-neutral-400 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <div className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-300/70">
                      For referrers
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    I Give Referrals
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-5">
                    Offer a clear number of referral slots, review requests quickly, and get
                    credit for the people you help hire.
                  </p>
                  <ul className="mb-6 space-y-1.5 text-xs text-neutral-400">
                    <li>• Set how many people you&apos;re open to helping at a time</li>
                    <li>• Inbox designed for referral requests, not spam</li>
                    <li>• Keep a lightweight history of the people you&apos;ve helped</li>
                  </ul>

                  <div className="mt-auto flex items-center text-sm font-medium text-neutral-200 group-hover:text-emerald-300 transition-colors">
                    Start referring
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Skill Up Card */}
            <Link to="/skillup" className="group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="relative h-full overflow-hidden rounded-3xl border border-neutral-800 bg-linear-to-br from-neutral-900/90 via-neutral-950 to-neutral-900/90 p-7 shadow-[0_18px_60px_rgba(0,0,0,0.8)] backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-2 group-hover:border-purple-500/60 group-hover:shadow-[0_22px_70px_rgba(168,85,247,0.45)]"
              >
                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-purple-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-900 border border-neutral-700 group-hover:border-purple-400/70 group-hover:bg-purple-500/15 transition-colors">
                      <GraduationCap className="w-6 h-6 text-neutral-400 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <div className="text-xs font-medium uppercase tracking-[0.18em] text-purple-300/70">
                      For learning
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    Skill Up
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-5">
                    Discover curated resources and pathways that make you more referable for
                    the roles you actually want.
                  </p>
                  <ul className="mb-6 space-y-1.5 text-xs text-neutral-400">
                    <li>• Shortlists for skills that map to real roles</li>
                    <li>• Guidance on what referrers want to see</li>
                    <li>• Stay on the radar of people hiring in your space</li>
                  </ul>

                  <div className="mt-auto flex items-center text-sm font-medium text-neutral-200 group-hover:text-purple-300 transition-colors">
                    Start learning
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Lightweight footer / trust strip */}
      <section className="border-t border-neutral-900/80 bg-black/80">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
              BUILT FOR REAL-WORLD REFERRALS
            </p>
            <p className="mt-1 text-sm text-neutral-400">
              Private by default. You decide who sees your profile and how many people you
              help.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-neutral-500">
            <span className="rounded-full border border-neutral-800 px-3 py-1">
              No spam outreach
            </span>
            <span className="rounded-full border border-neutral-800 px-3 py-1">
              Transparent referral slots
            </span>
            <span className="rounded-full border border-neutral-800 px-3 py-1">
              Simple, clean dashboard
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;