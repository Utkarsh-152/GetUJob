import React from 'react'

const LoginSeeker = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-4 selection:bg-emerald-500/30">
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
            Sign in to access your job seeker dashboard.
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginSeeker