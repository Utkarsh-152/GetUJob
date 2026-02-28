import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, BadgeCheck, Mail, User, ExternalLink } from 'lucide-react';

const SeekerDashboard = () => {
  const [referrals, setReferrals] = useState([
    // TODO: replace with real API data
    {
      id: '1',
      company: 'Acme Corp',
      role: 'Frontend Engineer',
      referrerName: 'Ayush (Referral Giver)',
      status: 'in-review',
      date: '2025-01-05',
    },
    {
      id: '2',
      company: 'Nimbus Labs',
      role: 'Backend Engineer',
      referrerName: 'Priya',
      status: 'shortlisted',
      date: '2025-01-10',
    },
    {
      id: '3',
      company: 'PixelStack',
      role: 'Full Stack Developer',
      referrerName: 'Rohan',
      status: 'applied',
      date: '2025-01-14',
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Placeholder route for when your backend is ready
  const referralsUrl = useMemo(
    () => `${import.meta.env.VITE_BACKEND_URL}/api/jobSeeker/my-referrals`, // change when API exists
    []
  );

  useEffect(() => {
    const fetchReferrals = async () => {
      setLoading(true);
      setError('');
      try {
        // Uncomment and adjust when backend is ready
        // const { data } = await axios.get(referralsUrl, { withCredentials: true });
        // setReferrals(data?.referrals ?? []);
      } catch (err) {
        console.error('Failed to load referrals:', err);
        setError(
          err.response?.data?.message ||
            'Could not load your referrals. Showing demo data for now.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, [referralsUrl]);

  const statusPill = (status) => {
    const base =
      'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] border';
    switch (status) {
      case 'shortlisted':
        return `${base} bg-emerald-500/10 text-emerald-300 border-emerald-500/50`;
      case 'in-review':
        return `${base} bg-sky-500/10 text-sky-300 border-sky-500/40`;
      case 'rejected':
        return `${base} bg-red-500/10 text-red-300 border-red-500/40`;
      default:
        return `${base} bg-neutral-900/60 text-neutral-300 border-neutral-700`;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      {/* Top nav */}
      <header className="border-b border-neutral-800 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2 text-sm font-medium text-white">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300 text-xs">
              GJ
            </span>
            <span className="hidden sm:inline text-neutral-200">GetUJob · Seeker</span>
          </Link>

          <nav className="flex items-center gap-3 text-[12px] text-neutral-400">
            <Link
              to="/seeker"
              className="rounded-full border border-neutral-800 bg-neutral-900/70 px-3 py-1 hover:border-emerald-500/60 hover:text-white transition-colors"
            >
              Update details
            </Link>
            <Link
              to="/loginSeeker"
              className="inline-flex items-center gap-1 rounded-full border border-neutral-800 bg-neutral-900/70 px-3 py-1 hover:border-red-500/60 hover:text-red-300 transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              Logout
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 md:px-6 py-5">
        <div className="mx-auto w-full max-w-6xl space-y-5">
          {/* Hero row */}
          <section className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] gap-4">
            <div className="rounded-3xl border border-neutral-800 bg-neutral-950/70 p-4 md:p-5 shadow-[0_18px_45px_rgba(0,0,0,0.7)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Your referrals
                  </p>
                  <h1 className="mt-2 text-xl md:text-2xl font-semibold text-white">
                    Track where your referrals are going.
                  </h1>
                  <p className="mt-1 text-[12px] text-neutral-400">
                    See which companies have your profile, and what stage each referral is at.
                  </p>
                </div>
                <div className="hidden sm:flex flex-col items-end text-right text-[11px] text-neutral-400">
                  <p className="flex items-center gap-1">
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Simple, focused dashboard
                  </p>
                  <p className="mt-1 text-neutral-500">
                    Scroll is minimal • All key info visible
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-800 bg-neutral-950/70 p-4 md:p-5 flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">
                    Summary
                  </p>
                  <p className="mt-1 text-[13px] text-neutral-200">
                    {referrals.length} referral
                    {referrals.length === 1 ? '' : 's'} currently visible.
                  </p>
                </div>
              </div>
              <div className="mt-3 flex gap-2 text-[11px] text-neutral-400">
                <span className="rounded-full border border-neutral-700 bg-neutral-900/70 px-2.5 py-1">
                  Replace demo data with your API when ready.
                </span>
              </div>
            </div>
          </section>

          {/* Referrals table */}
          <section className="rounded-3xl border border-neutral-800 bg-neutral-950/80 backdrop-blur-xl shadow-[0_18px_45px_rgba(0,0,0,0.75)] overflow-hidden">
            <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-neutral-800/80 text-[12px] text-neutral-400">
              <span>Referrals you have received</span>
              {loading && <span className="text-emerald-300">Loading…</span>}
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-[13px]">
                <thead className="bg-neutral-900/80 text-neutral-400">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left font-medium">Company / Role</th>
                    <th className="px-4 md:px-6 py-3 text-left font-medium hidden sm:table-cell">
                      Referrer
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left font-medium hidden md:table-cell">
                      Date
                    </th>
                    <th className="px-4 md:px-6 py-3 text-left font-medium">Status</th>
                    <th className="px-4 md:px-6 py-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.length === 0 ? (
                    <tr>
                      <td
                        className="px-4 md:px-6 py-6 text-center text-[12px] text-neutral-500"
                        colSpan={5}
                      >
                        No referrals yet.
                      </td>
                    </tr>
                  ) : (
                    referrals.map((r) => (
                      <tr
                        key={r.id}
                        className="border-t border-neutral-800/80 hover:bg-neutral-900/60 transition-colors"
                      >
                        <td className="px-4 md:px-6 py-3">
                          <div>
                            <p className="font-medium text-white">{r.company}</p>
                            <p className="text-[12px] text-neutral-400">{r.role}</p>
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-3 hidden sm:table-cell text-neutral-300">
                          {r.referrerName}
                        </td>
                        <td className="px-4 md:px-6 py-3 hidden md:table-cell text-neutral-400 text-[12px]">
                          {r.date}
                        </td>
                        <td className="px-4 md:px-6 py-3">
                          <span className={statusPill(r.status)}>
                            {r.status === 'shortlisted'
                              ? 'Shortlisted'
                              : r.status === 'in-review'
                              ? 'In review'
                              : r.status === 'rejected'
                              ? 'Rejected'
                              : 'Applied'}
                          </span>
                        </td>
                        <td className="px-4 md:px-6 py-3 text-right">
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 rounded-full border border-neutral-700 bg-neutral-900/70 px-2.5 py-1.5 text-[11px] text-neutral-200 hover:border-emerald-500/60 hover:text-white"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            View details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default SeekerDashboard;