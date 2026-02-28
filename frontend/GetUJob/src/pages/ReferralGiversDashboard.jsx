import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle2, XCircle, User, ArrowRight, ExternalLink } from 'lucide-react';

const ReferralGiversDashboard = () => {
  const [candidates, setCandidates] = useState([
    // TODO: Replace this mock data with API response
    {
      id: '1',
      name: 'Ayush Sharma',
      role: 'Frontend Engineer',
      score: 96,
      status: 'pending',
    },
    {
      id: '2',
      name: 'Priya Verma',
      role: 'Backend Engineer',
      score: 93,
      status: 'pending',
    },
    {
      id: '3',
      name: 'Rohan Mehta',
      role: 'Full Stack Developer',
      score: 90,
      status: 'pending',
    },
  ]);

  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState('');

  // Change this when your backend route is ready
  const listUrl = useMemo(
    () => `${import.meta.env.VITE_BACKEND_URL}/api/jobSeeker/top-ten`, // placeholder
    []
  );

  const updateStatusUrl = useMemo(
    () => `${import.meta.env.VITE_BACKEND_URL}/api/jobSeeker/update-status`, // placeholder
    []
  );

  const handleStatusChange = async (id, nextStatus) => {
    setError('');
    setUpdatingId(id);

    try {
      // TODO: Call your real API here.
      // await axios.post(updateStatusUrl, { jobSeekerId: id, status: nextStatus });

      setCandidates((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: nextStatus } : c))
      );
    } catch (err) {
      console.error('Failed to update status:', err);
      setError(
        err.response?.data?.message ||
          'Could not update candidate status. Please try again.'
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const handleOpenProfile = (id) => {
    // TODO: replace with your profile route/navigation, e.g. navigate(`/candidate/${id}`)
    console.log('Open profile for candidate id:', id);
    window.alert('Profile view not wired yet. Plug your route into handleOpenProfile.');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans p-4 md:p-8 selection:bg-emerald-500/30">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-15%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[110px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl space-y-6">
        {/* Top nav */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-medium text-white"
            >
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300 text-xs">
                GJ
              </span>
              <span className="hidden sm:inline text-neutral-200">GetUJob · Referral Giver</span>
            </Link>
          </div>
          <nav className="flex items-center gap-2 text-[12px] text-neutral-400">
            <Link
              to="/giver"
              className="rounded-full border border-neutral-800 bg-neutral-900/70 px-3 py-1 hover:border-emerald-500/60 hover:text-white transition-colors"
            >
              Update details
            </Link>
            <Link
              to="/loginReferralGivers"
              className="inline-flex items-center gap-1 rounded-full border border-neutral-800 bg-neutral-900/70 px-3 py-1 hover:border-red-500/60 hover:text-red-300 transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5 rotate-180" />
              Logout
            </Link>
          </nav>
        </header>

        {/* Heading row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-white">
              Referral Giver Dashboard
            </h1>
            <p className="mt-1 text-[13px] text-neutral-400">
              Top 10 candidates based on your referrals. Quickly select, reject, or open their
              profile.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-neutral-500">
            <span className="inline-flex items-center gap-1 rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1">
              <User className="h-3.5 w-3.5 text-emerald-400" />
              Best-matched candidates
            </span>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-[12px] text-red-300">
            {error}
          </div>
        )}

        <main className="rounded-3xl border border-neutral-800 bg-neutral-950/70 backdrop-blur-xl shadow-[0_22px_60px_rgba(0,0,0,0.75)] overflow-hidden">
          <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-neutral-800/80 text-[12px] text-neutral-400">
            <span>Top candidates</span>
            <span className="flex items-center gap-1">
              Sorted by match score
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-[13px]">
              <thead className="bg-neutral-900/80 text-neutral-400">
                <tr>
                  <th className="px-4 md:px-6 py-3 text-left font-medium">Candidate</th>
                  <th className="px-4 md:px-6 py-3 text-left font-medium hidden sm:table-cell">
                    Role
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left font-medium hidden md:table-cell">
                    Score
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left font-medium">Status</th>
                  <th className="px-4 md:px-6 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {candidates.length === 0 ? (
                  <tr>
                    <td
                      className="px-4 md:px-6 py-6 text-center text-[12px] text-neutral-500"
                      colSpan={6}
                    >
                      No candidates yet. Plug in your API to load real data.
                    </td>
                  </tr>
                ) : (
                  candidates.slice(0, 10).map((c, idx) => (
                    <tr
                      key={c.id}
                      className="border-t border-neutral-800/80 hover:bg-neutral-900/60 transition-colors"
                    >
                      <td className="px-4 md:px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300 text-[13px]">
                            {c.name
                              .split(' ')
                              .map((p) => p[0])
                              .join('')
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>
                          <div>
                            <p className="text-[13px] font-medium text-white">{c.name}</p>
                            <p className="text-[11px] text-neutral-500 sm:hidden">
                              {c.role} • Score {c.score}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-3 text-neutral-300 hidden sm:table-cell">
                        {c.role}
                      </td>
                      <td className="px-4 md:px-6 py-3 hidden md:table-cell">
                        <span className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[11px] text-emerald-300">
                          {c.score}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-3">
                        <span
                          className={
                            'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] ' +
                            (c.status === 'selected'
                              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40'
                              : c.status === 'rejected'
                              ? 'bg-red-500/10 text-red-300 border border-red-500/40'
                              : 'bg-neutral-900/60 text-neutral-300 border border-neutral-700')
                          }
                        >
                          {c.status === 'selected'
                            ? 'Selected'
                            : c.status === 'rejected'
                            ? 'Rejected'
                            : 'Pending'}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleStatusChange(c.id, 'selected')}
                            disabled={updatingId === c.id}
                            className="inline-flex items-center rounded-full border border-emerald-500/50 bg-emerald-500/10 px-2.5 py-1.5 text-[11px] text-emerald-300 hover:bg-emerald-500/20 disabled:opacity-50"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                            Select
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(c.id, 'rejected')}
                            disabled={updatingId === c.id}
                            className="inline-flex items-center rounded-full border border-red-500/50 bg-red-500/10 px-2.5 py-1.5 text-[11px] text-red-300 hover:bg-red-500/20 disabled:opacity-50"
                          >
                            <XCircle className="w-3.5 h-3.5 mr-1" />
                            Reject
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenProfile(c.id)}
                            className="inline-flex items-center rounded-full border border-neutral-700 bg-neutral-900/70 px-2.5 py-1.5 text-[11px] text-neutral-200 hover:border-emerald-500/60 hover:text-white"
                          >
                            <ExternalLink className="w-3.5 h-3.5 mr-1" />
                            Profile
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReferralGiversDashboard;