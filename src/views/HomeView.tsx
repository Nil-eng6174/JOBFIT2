import React, { useState } from 'react';
import { CandidateProfile } from '../types.ts';
import { AuthModal, PRESET_ACCOUNTS } from '../components/AuthModal.tsx';

interface HomeViewProps {
  currentCandidate: CandidateProfile;
  onNavigate: (path: string) => void;
  onLoginSuccess: (candidate: CandidateProfile, sessionInfo?: { token: string; welcomeMessage: string }) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currentCandidate,
  onNavigate,
  onLoginSuccess,
}) => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Embedded Interactive Simulator State
  const [hasNodeJs, setHasNodeJs] = useState(false);
  const [hasMongoDb, setHasMongoDb] = useState(false);
  const [hasRestSecurity, setHasRestSecurity] = useState(false);

  // Interactive inline auth tab state
  const [inlineAuthTab, setInlineAuthTab] = useState<'demo' | 'login' | 'register'>('demo');
  const [inlineEmail, setInlineEmail] = useState('');
  const [inlinePassword, setInlinePassword] = useState('');
  const [inlineRegName, setInlineRegName] = useState('');
  const [inlineRegRole, setInlineRegRole] = useState('Software Developer');
  const [inlineRegCompany, setInlineRegCompany] = useState('ABC Technologies');

  // Calculate dynamic simulator score
  const baseScore = 78;
  const simulatedScore = Math.min(
    96,
    baseScore +
      (hasNodeJs ? 8 : 0) +
      (hasMongoDb ? 6 : 0) +
      (hasRestSecurity ? 4 : 0)
  );

  const openAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    setMobileNavOpen(false);
  };

  const handleSelectPreset = (key: 'rahul' | 'priya' | 'vikram') => {
    const candidate = PRESET_ACCOUNTS[key];
    onLoginSuccess(candidate, {
      token: `demo-${key}-${Date.now()}`,
      welcomeMessage: `Logged in as ${candidate.name}! Redirecting to ATS Dashboard...`,
    });
    onNavigate('dashboard');
  };

  const handleInlineLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const candidate = {
      ...PRESET_ACCOUNTS.rahul,
      email: inlineEmail || PRESET_ACCOUNTS.rahul.email,
    };
    onLoginSuccess(candidate, {
      token: `inline-${Date.now()}`,
      welcomeMessage: `Welcome back, ${candidate.name}!`,
    });
    onNavigate('dashboard');
  };

  const handleInlineRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineRegName.trim()) return;
    const newCand: CandidateProfile = {
      ...PRESET_ACCOUNTS.rahul,
      name: inlineRegName.trim(),
      email: inlineEmail || `${inlineRegName.toLowerCase().replace(/\s+/g, '.')}@college.edu`,
      targetRole: inlineRegRole,
      targetCompany: inlineRegCompany || 'ABC Technologies',
      readinessScore: 72,
    };
    onLoginSuccess(newCand, {
      token: `reg-${Date.now()}`,
      welcomeMessage: `Welcome, ${newCand.name}! Your profile is ready.`,
    });
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-['Inter',sans-serif]">
      {/* 1. TOP RESPONSIVE NAVBAR */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#c7c4d7]/30 shadow-xs">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Brand Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#4338ca] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-['Manrope'] text-[21px] font-extrabold text-[#2a14b4] tracking-tight leading-none">
                Job<span className="text-[#712ae2]">Fit</span>
              </span>
              <span className="text-[9px] font-bold text-[#777586] tracking-widest uppercase mt-0.5">
                Career Intelligence
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-[13px] font-semibold text-[#464554]">
            <a href="#features" className="hover:text-[#4338ca] transition-colors">Features</a>
            <a href="#simulator" className="hover:text-[#4338ca] transition-colors">Readiness Simulator</a>

            <a href="#mentors" className="hover:text-[#4338ca] transition-colors">Mentorship</a>
            <a href="#stories" className="hover:text-[#4338ca] transition-colors">Placements</a>
            <a href="#faq" className="hover:text-[#4338ca] transition-colors">FAQ</a>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => openAuth('login')}
              className="px-3.5 py-2 rounded-lg text-[13px] font-semibold text-[#464554] hover:text-[#4338ca] hover:bg-[#eff4ff] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">login</span>
              <span>Sign In</span>
            </button>

            <button
              onClick={() => openAuth('register')}
              className="px-4 py-2 rounded-lg text-[13px] font-semibold bg-[#eff4ff] text-[#4338ca] hover:bg-[#e0e7ff] transition-all cursor-pointer border border-[#c7c4d7]/40 flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              <span>Register Free</span>
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className="px-4.5 py-2 rounded-lg text-[13px] font-semibold bg-[#4338ca] hover:bg-[#2a14b4] text-white shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Launch Dashboard</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => openAuth('login')}
              className="p-2 text-[12px] font-bold text-[#4338ca] bg-[#eff4ff] rounded-lg"
            >
              Sign In
            </button>
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="p-2 text-[#464554] hover:text-[#0b1c30] rounded-lg hover:bg-[#eff4ff]"
              aria-label="Toggle mobile menu"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileNavOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileNavOpen && (
          <div className="md:hidden border-t border-[#c7c4d7]/30 bg-white px-4 py-4 flex flex-col gap-3 animate-in slide-in-from-top-2 duration-150 shadow-lg">
            <a
              href="#features"
              onClick={() => setMobileNavOpen(false)}
              className="py-2 text-[14px] font-semibold text-[#464554] hover:text-[#4338ca]"
            >
              Features & Platform Tools
            </a>
            <a
              href="#simulator"
              onClick={() => setMobileNavOpen(false)}
              className="py-2 text-[14px] font-semibold text-[#464554] hover:text-[#4338ca]"
            >
              Readiness Simulator
            </a>

            <a
              href="#mentors"
              onClick={() => setMobileNavOpen(false)}
              className="py-2 text-[14px] font-semibold text-[#464554] hover:text-[#4338ca]"
            >
              Staff Engineering Mentors
            </a>
            <a
              href="#faq"
              onClick={() => setMobileNavOpen(false)}
              className="py-2 text-[14px] font-semibold text-[#464554] hover:text-[#4338ca]"
            >
              Frequently Asked Questions
            </a>

            <div className="pt-3 border-t border-[#c7c4d7]/20 flex flex-col gap-2">
              <button
                onClick={() => openAuth('register')}
                className="w-full py-2.5 rounded-lg bg-[#4338ca] text-white text-[13px] font-semibold flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">person_add</span>
                <span>Register Candidate Profile</span>
              </button>
              <button
                onClick={() => {
                  setMobileNavOpen(false);
                  onNavigate('dashboard');
                }}
                className="w-full py-2.5 rounded-lg bg-[#eff4ff] text-[#4338ca] text-[13px] font-semibold flex items-center justify-center gap-1.5 border border-[#c7c4d7]/40"
              >
                <span>Launch Demo Dashboard</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-[#c7c4d7]/30 bg-gradient-to-b from-white via-[#f4f7ff] to-[#f8f9ff]">
        {/* Glow backdrop shapes */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#4338ca]/15 via-[#712ae2]/10 to-transparent blur-3xl pointer-events-none rounded-full"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-[#c3c0ff]/20 blur-3xl pointer-events-none rounded-full"></div>

        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Headline & Value Prop */}
            <div className="lg:col-span-7 flex flex-col gap-5 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e3dfff] text-[#1e147e] text-[12px] font-bold tracking-wide w-fit border border-[#c7c4d7]/40 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#005f26] animate-pulse"></span>
                <span>Campus Hiring Cohort 2025/2026 • Live ATS Engine</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-['Manrope'] text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem] font-extrabold text-[#0b1c30] tracking-tight leading-[1.12]">
                Close Your Technical Gaps.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2a14b4] via-[#4338ca] to-[#712ae2]">
                  Beat Placement Gatekeepers.
                </span>
              </h1>

              {/* Description */}
              <p className="text-[15px] sm:text-[17px] text-[#464554] leading-relaxed max-w-2xl">
                JobFit benchmarks your university coursework, verified code, and live contest submissions against real ATS filter criteria used by <strong className="text-[#0b1c30]">ABC Technologies</strong>, <strong className="text-[#0b1c30]">Razorpay</strong>, and top tech employers. Elevate your interview readiness above the 85% cutoff in 14 days.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => openAuth('register')}
                  className="px-6 py-3 rounded-xl bg-[#4338ca] hover:bg-[#2a14b4] text-white text-[14px] font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">person_add</span>
                  <span>Register Free Account</span>
                </button>

                <button
                  onClick={() => openAuth('login')}
                  className="px-5 py-3 rounded-xl bg-white hover:bg-[#f8f9ff] text-[#0b1c30] text-[14px] font-bold border border-[#c7c4d7]/50 shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px] text-[#4338ca]">lock_open</span>
                  <span>Sign In</span>
                </button>

                <button
                  onClick={() => onNavigate('dashboard')}
                  className="px-5 py-3 rounded-xl bg-[#eff4ff] hover:bg-[#e0e7ff] text-[#4338ca] text-[14px] font-bold border border-[#c7c4d7]/40 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Demo (Rahul Sharma)</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>

              {/* Key Proof Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#c7c4d7]/30 mt-2">
                <div className="flex flex-col">
                  <span className="text-[24px] sm:text-[28px] font-black text-[#0b1c30] font-['Manrope']">85%+</span>
                  <span className="text-[11px] text-[#777586] font-semibold uppercase tracking-wider">Shortlist Cutoff</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[24px] sm:text-[28px] font-black text-[#005f26] font-['Manrope']">98.4%</span>
                  <span className="text-[11px] text-[#777586] font-semibold uppercase tracking-wider">ATS Precision</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[24px] sm:text-[28px] font-black text-[#4338ca] font-['Manrope']">14 Days</span>
                  <span className="text-[11px] text-[#777586] font-semibold uppercase tracking-wider">Sprint Velocity</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[24px] sm:text-[28px] font-black text-[#712ae2] font-['Manrope']">4,500+</span>
                  <span className="text-[11px] text-[#777586] font-semibold uppercase tracking-wider">Offers Placed</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Embedded Auth & Quick Access Widget */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl shadow-xl border border-[#c7c4d7]/40 overflow-hidden">
                {/* Header with Switcher */}
                <div className="bg-[#eff4ff] p-4 border-b border-[#c7c4d7]/30 flex items-center justify-between">
                  <div>
                    <span className="text-[13px] font-bold text-[#0b1c30] block">
                      Quick Access Hub
                    </span>
                    <span className="text-[11px] text-[#777586]">
                      Sign in, register, or choose a pre-calibrated candidate
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#4338ca] text-white text-[10px] font-bold uppercase">
                    Live Session
                  </span>
                </div>

                {/* Tab Switcher */}
                <div className="flex border-b border-[#c7c4d7]/30 bg-white">
                  <button
                    onClick={() => setInlineAuthTab('demo')}
                    className={`flex-1 py-2.5 text-center text-[12px] font-bold transition-all cursor-pointer ${
                      inlineAuthTab === 'demo'
                        ? 'text-[#4338ca] border-b-2 border-[#4338ca] bg-[#f8f9ff]'
                        : 'text-[#777586] hover:text-[#0b1c30]'
                    }`}
                  >
                    ⚡ Demo Profiles
                  </button>
                  <button
                    onClick={() => setInlineAuthTab('login')}
                    className={`flex-1 py-2.5 text-center text-[12px] font-bold transition-all cursor-pointer ${
                      inlineAuthTab === 'login'
                        ? 'text-[#4338ca] border-b-2 border-[#4338ca] bg-[#f8f9ff]'
                        : 'text-[#777586] hover:text-[#0b1c30]'
                    }`}
                  >
                    🔑 Sign In
                  </button>
                  <button
                    onClick={() => setInlineAuthTab('register')}
                    className={`flex-1 py-2.5 text-center text-[12px] font-bold transition-all cursor-pointer ${
                      inlineAuthTab === 'register'
                        ? 'text-[#4338ca] border-b-2 border-[#4338ca] bg-[#f8f9ff]'
                        : 'text-[#777586] hover:text-[#0b1c30]'
                    }`}
                  >
                    ✨ Register
                  </button>
                </div>

                {/* Tab Content */}
                <div className="p-5">
                  {inlineAuthTab === 'demo' && (
                    <div className="flex flex-col gap-3">
                      <p className="text-[12px] text-[#464554]">
                        Select any candidate archetype to inspect realistic ATS diagnostics, live test arenas, and gatekeeper checklists:
                      </p>

                      <div
                        onClick={() => handleSelectPreset('rahul')}
                        className="p-3 rounded-xl border border-[#c7c4d7]/40 bg-[#f8f9ff] hover:bg-[#eff4ff] hover:border-[#4338ca] transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#4338ca] text-white flex items-center justify-center font-bold text-[13px]">
                            RS
                          </div>
                          <div>
                            <div className="text-[13px] font-bold text-[#0b1c30] group-hover:text-[#4338ca]">
                              Rahul Sharma
                            </div>
                            <div className="text-[11px] text-[#777586]">
                              Software Developer • ABC Tech
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[14px] font-black text-[#4338ca]">78%</span>
                          <span className="text-[10px] text-[#777586] block">Gap: -7%</span>
                        </div>
                      </div>

                      <div
                        onClick={() => handleSelectPreset('priya')}
                        className="p-3 rounded-xl border border-[#c7c4d7]/40 bg-[#f8f9ff] hover:bg-[#eff4ff] hover:border-[#4338ca] transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#712ae2] text-white flex items-center justify-center font-bold text-[13px]">
                            PP
                          </div>
                          <div>
                            <div className="text-[13px] font-bold text-[#0b1c30] group-hover:text-[#712ae2]">
                              Priya Patel
                            </div>
                            <div className="text-[11px] text-[#777586]">
                              Full Stack Engineer • Razorpay
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[14px] font-black text-[#005f26]">83%</span>
                          <span className="text-[10px] text-[#777586] block">Sprint Active</span>
                        </div>
                      </div>

                      <div
                        onClick={() => handleSelectPreset('vikram')}
                        className="p-3 rounded-xl border border-[#c7c4d7]/40 bg-[#f8f9ff] hover:bg-[#eff4ff] hover:border-[#4338ca] transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#1e147e] text-white flex items-center justify-center font-bold text-[13px]">
                            VM
                          </div>
                          <div>
                            <div className="text-[13px] font-bold text-[#0b1c30] group-hover:text-[#1e147e]">
                              Vikram Malhotra
                            </div>
                            <div className="text-[11px] text-[#777586]">
                              Cloud & DevOps • Zeta
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[14px] font-black text-[#ba1a1a]">74%</span>
                          <span className="text-[10px] text-[#777586] block">Gap: -11%</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {inlineAuthTab === 'login' && (
                    <form onSubmit={handleInlineLogin} className="flex flex-col gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#464554] mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={inlineEmail}
                          onChange={(e) => setInlineEmail(e.target.value)}
                          placeholder="myjeetarget2025@gmail.com"
                          className="w-full px-3 py-2 bg-[#f8f9ff] rounded-lg text-[13px] border border-[#c7c4d7]/40 focus:border-[#4338ca] focus:bg-white focus:outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-[#464554] mb-1">
                          Password
                        </label>
                        <input
                          type="password"
                          value={inlinePassword}
                          onChange={(e) => setInlinePassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full px-3 py-2 bg-[#f8f9ff] rounded-lg text-[13px] border border-[#c7c4d7]/40 focus:border-[#4338ca] focus:bg-white focus:outline-none"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2.5 mt-1 rounded-xl bg-[#4338ca] hover:bg-[#2a14b4] text-white text-[13px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <span>Sign In to Dashboard</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => openAuth('register')}
                        className="text-[11px] text-center text-[#4338ca] hover:underline"
                      >
                        New student? Create an account instead
                      </button>
                    </form>
                  )}

                  {inlineAuthTab === 'register' && (
                    <form onSubmit={handleInlineRegister} className="flex flex-col gap-2.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#464554] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={inlineRegName}
                          onChange={(e) => setInlineRegName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-3 py-1.5 bg-[#f8f9ff] rounded-lg text-[12px] border border-[#c7c4d7]/40 focus:border-[#4338ca] focus:bg-white focus:outline-none"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-[#464554] mb-1">
                            Target Role
                          </label>
                          <select
                            value={inlineRegRole}
                            onChange={(e) => setInlineRegRole(e.target.value)}
                            className="w-full px-2 py-1.5 bg-[#f8f9ff] rounded-lg text-[12px] border border-[#c7c4d7]/40 focus:border-[#4338ca] focus:bg-white focus:outline-none"
                          >
                            <option value="Software Developer">Software Developer</option>
                            <option value="Full Stack Engineer">Full Stack Engineer</option>
                            <option value="Cloud/DevOps">Cloud/DevOps</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-[#464554] mb-1">
                            Dream Company
                          </label>
                          <input
                            type="text"
                            value={inlineRegCompany}
                            onChange={(e) => setInlineRegCompany(e.target.value)}
                            placeholder="ABC Technologies"
                            className="w-full px-2 py-1.5 bg-[#f8f9ff] rounded-lg text-[12px] border border-[#c7c4d7]/40 focus:border-[#4338ca] focus:bg-white focus:outline-none"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2.5 mt-1 rounded-xl bg-[#4338ca] hover:bg-[#2a14b4] text-white text-[13px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[16px]">verified</span>
                        <span>Register & Start Diagnostic</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RECRUITER & HIRING PARTNERS BAR */}
      <section className="py-8 bg-white border-b border-[#c7c4d7]/30">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#777586] block mb-5">
            Calibrated Against Official Hiring Gatekeepers & Rubrics
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2 font-['Manrope'] font-extrabold text-[18px] text-[#0b1c30]">
              <span className="w-8 h-8 rounded-lg bg-[#4338ca] text-white flex items-center justify-center text-[12px]">ABC</span>
              ABC Technologies
            </div>
            <div className="flex items-center gap-2 font-['Manrope'] font-extrabold text-[18px] text-[#0b1c30]">
              <span className="w-8 h-8 rounded-lg bg-[#0c2340] text-white flex items-center justify-center text-[12px]">RZP</span>
              Razorpay Core
            </div>
            <div className="flex items-center gap-2 font-['Manrope'] font-extrabold text-[18px] text-[#0b1c30]">
              <span className="w-8 h-8 rounded-lg bg-[#1e147e] text-white flex items-center justify-center text-[12px]">ZT</span>
              Zeta Platforms
            </div>
            <div className="flex items-center gap-2 font-['Manrope'] font-extrabold text-[18px] text-[#0b1c30]">
              <span className="w-8 h-8 rounded-lg bg-[#0078d4] text-white flex items-center justify-center text-[12px]">MS</span>
              Microsoft Azure
            </div>
            <div className="flex items-center gap-2 font-['Manrope'] font-extrabold text-[18px] text-[#0b1c30]">
              <span className="w-8 h-8 rounded-lg bg-[#ff9900] text-white flex items-center justify-center text-[12px]">AWS</span>
              Amazon Cloud
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE READINESS SIMULATOR SECTION */}
      <section id="simulator" className="py-16 lg:py-20 bg-[#eff4ff]/60 border-b border-[#c7c4d7]/30">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
            <span className="px-3 py-1 rounded-full bg-[#e3dfff] text-[#1e147e] text-[11px] font-bold uppercase tracking-wider mb-3">
              Interactive ATS Simulation
            </span>
            <h2 className="font-['Manrope'] text-[2rem] sm:text-[2.5rem] font-extrabold text-[#0b1c30] tracking-tight">
              See How Closing Skill Gaps Unlocks Interview Invites
            </h2>
            <p className="text-[14px] sm:text-[16px] text-[#464554] mt-2">
              Toggle the missing skills below to see how our deterministic ATS matching algorithm recalculates candidate readiness in real-time.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-[#c7c4d7]/40 p-6 sm:p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left: Interactive Toggles */}
              <div className="md:col-span-7 flex flex-col gap-4">
                <span className="text-[12px] font-bold uppercase tracking-wider text-[#777586]">
                  Candidate: Rahul Sharma (Target: ABC Technologies)
                </span>

                <div 
                  onClick={() => setHasNodeJs(!hasNodeJs)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    hasNodeJs ? 'bg-[#dce9ff]/60 border-[#4338ca]' : 'bg-[#f8f9ff] border-[#c7c4d7]/40 hover:bg-[#eff4ff]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`material-symbols-outlined text-[20px] ${hasNodeJs ? 'text-[#4338ca]' : 'text-[#777586]'}`}>
                      {hasNodeJs ? 'check_box' : 'check_box_outline_blank'}
                    </span>
                    <div>
                      <div className="text-[13px] font-bold text-[#0b1c30]">
                        Build Node.js & Express Token Bucket Rate Limiter
                      </div>
                      <div className="text-[11px] text-[#777586]">
                        Verified in Contest Arena #01 • Token Bucket Algorithm
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#005f26]/10 text-[#005f26] text-[11px] font-bold">
                    +8% Boost
                  </span>
                </div>

                <div 
                  onClick={() => setHasMongoDb(!hasMongoDb)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    hasMongoDb ? 'bg-[#dce9ff]/60 border-[#4338ca]' : 'bg-[#f8f9ff] border-[#c7c4d7]/40 hover:bg-[#eff4ff]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`material-symbols-outlined text-[20px] ${hasMongoDb ? 'text-[#4338ca]' : 'text-[#777586]'}`}>
                      {hasMongoDb ? 'check_box' : 'check_box_outline_blank'}
                    </span>
                    <div>
                      <div className="text-[13px] font-bold text-[#0b1c30]">
                        Complete MongoDB Schema & Aggregation Pipeline
                      </div>
                      <div className="text-[11px] text-[#777586]">
                        Document modeling & compound index optimization
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#005f26]/10 text-[#005f26] text-[11px] font-bold">
                    +6% Boost
                  </span>
                </div>

                <div 
                  onClick={() => setHasRestSecurity(!hasRestSecurity)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    hasRestSecurity ? 'bg-[#dce9ff]/60 border-[#4338ca]' : 'bg-[#f8f9ff] border-[#c7c4d7]/40 hover:bg-[#eff4ff]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`material-symbols-outlined text-[20px] ${hasRestSecurity ? 'text-[#4338ca]' : 'text-[#777586]'}`}>
                      {hasRestSecurity ? 'check_box' : 'check_box_outline_blank'}
                    </span>
                    <div>
                      <div className="text-[13px] font-bold text-[#0b1c30]">
                        JWT / OAuth2 Authentication & Test Suite
                      </div>
                      <div className="text-[11px] text-[#777586]">
                        1:1 Architecture review completed with Senior Mentor
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#005f26]/10 text-[#005f26] text-[11px] font-bold">
                    +4% Boost
                  </span>
                </div>
              </div>

              {/* Right: Live Gauge Score */}
              <div className="md:col-span-5 flex flex-col items-center justify-center bg-[#f8f9ff] p-6 rounded-2xl border border-[#c7c4d7]/40">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#777586] mb-2">
                  Simulated Readiness Score
                </span>

                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                    <circle
                      className="text-[#dce9ff]"
                      cx="80"
                      cy="80"
                      r="65"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="12"
                    />
                    <circle
                      className="text-[#4338ca] transition-all duration-700 ease-out"
                      cx="80"
                      cy="80"
                      r="65"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="12"
                      strokeDasharray={408.4}
                      strokeDashoffset={408.4 - (408.4 * simulatedScore) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="font-['Manrope'] text-[2.5rem] font-black text-[#0b1c30] leading-none">
                      {simulatedScore}%
                    </span>
                    <span className="text-[11px] text-[#777586] font-bold mt-1">
                      Cutoff: 85%
                    </span>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  {simulatedScore >= 85 ? (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#005f26]/10 text-[#005f26] text-[12px] font-bold">
                      <span className="material-symbols-outlined text-[16px]">verified</span>
                      <span>Eligible For Direct Interview Shortlist!</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ba1a1a]/10 text-[#ba1a1a] text-[12px] font-bold">
                      <span className="material-symbols-outlined text-[16px]">warning</span>
                      <span>{85 - simulatedScore}% gap to interview cutoff</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => onNavigate('dashboard')}
                  className="mt-4 w-full py-2 rounded-lg bg-[#4338ca] hover:bg-[#2a14b4] text-white text-[12px] font-semibold transition-colors cursor-pointer"
                >
                  Inspect Full Diagnostic in App
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CORE PLATFORM PILLARS */}
      <section id="features" className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
            <span className="px-3 py-1 rounded-full bg-[#e3dfff] text-[#1e147e] text-[11px] font-bold uppercase tracking-wider mb-3">
              Full-Spectrum Placement Architecture
            </span>
            <h2 className="font-['Manrope'] text-[2rem] sm:text-[2.5rem] font-extrabold text-[#0b1c30] tracking-tight">
              Engineered For Every Stage of Campus Recruitment
            </h2>
            <p className="text-[14px] sm:text-[16px] text-[#464554] mt-2">
              From automated resume parsing to senior mentor bookings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-[#f8f9ff] border border-[#c7c4d7]/30 hover:border-[#4338ca] hover:shadow-md transition-all flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#4338ca] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">tune</span>
                </div>
                <h3 className="font-['Manrope'] text-[1.25rem] font-bold text-[#0b1c30]">
                  Deterministic Skill Gap Audit
                </h3>
                <p className="text-[13px] text-[#464554] leading-relaxed">
                  Pinpoints exact missing runtime technologies, database patterns, and architectural paradigms separating your profile from shortlist cutoff.
                </p>
              </div>
              <button
                onClick={() => onNavigate('skill-gap')}
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#4338ca] hover:underline cursor-pointer"
              >
                <span>View Skill Matrix</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>



            {/* Card 3 */}
            <div id="mentors" className="p-6 rounded-2xl bg-[#f8f9ff] border border-[#c7c4d7]/30 hover:border-[#4338ca] hover:shadow-md transition-all flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#005f26] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">diversity_3</span>
                </div>
                <h3 className="font-['Manrope'] text-[1.25rem] font-bold text-[#0b1c30]">
                  Staff Engineering 1:1 Reviews
                </h3>
                <p className="text-[13px] text-[#464554] leading-relaxed">
                  Book 45-minute live mock interviews and architecture audits with mentors who work directly at top product firms like Razorpay, Zeta, and Google.
                </p>
              </div>
              <button
                onClick={() => onNavigate('mentorship')}
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#005f26] hover:underline cursor-pointer"
              >
                <span>Browse Mentor Slots</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl bg-[#f8f9ff] border border-[#c7c4d7]/30 hover:border-[#4338ca] hover:shadow-md transition-all flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#1e147e] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">badge</span>
                </div>
                <h3 className="font-['Manrope'] text-[1.25rem] font-bold text-[#0b1c30]">
                  ATS Keyword & Gatekeeper Audit
                </h3>
                <p className="text-[13px] text-[#464554] leading-relaxed">
                  Audits your resume formatting, CGPA barrier compliance, and degree accreditation to ensure your profile isn't silently discarded by recruitment bots.
                </p>
              </div>
              <button
                onClick={() => onNavigate('my-profile-resume')}
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#1e147e] hover:underline cursor-pointer"
              >
                <span>Calibrate Resume</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>

            {/* Card 5 */}
            <div className="p-6 rounded-2xl bg-[#f8f9ff] border border-[#c7c4d7]/30 hover:border-[#4338ca] hover:shadow-md transition-all flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#4338ca] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">school</span>
                </div>
                <h3 className="font-['Manrope'] text-[1.25rem] font-bold text-[#0b1c30]">
                  Curated 3-Pillar Sprints
                </h3>
                <p className="text-[13px] text-[#464554] leading-relaxed">
                  No wasted hours on generic video tutorials. Follow targeted project blueprints that solve the specific gaps in your candidate matrix.
                </p>
              </div>
              <button
                onClick={() => onNavigate('recommendations')}
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#4338ca] hover:underline cursor-pointer"
              >
                <span>View Sprint Roadmap</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>

            {/* Card 6 */}
            <div className="p-6 rounded-2xl bg-[#f8f9ff] border border-[#c7c4d7]/30 hover:border-[#4338ca] hover:shadow-md transition-all flex flex-col justify-between">
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#ba1a1a] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px]">work</span>
                </div>
                <h3 className="font-['Manrope'] text-[1.25rem] font-bold text-[#0b1c30]">
                  Match-Indexed Job Board
                </h3>
                <p className="text-[13px] text-[#464554] leading-relaxed">
                  Over 40 engineering vacancies ranked automatically by how closely your evaluated profile satisfies their live gatekeeper criteria.
                </p>
              </div>
              <button
                onClick={() => onNavigate('search-jobs')}
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-[#ba1a1a] hover:underline cursor-pointer"
              >
                <span>Search 40+ Matches</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PLACEMENT STORIES & TESTIMONIALS */}
      <section id="stories" className="py-16 lg:py-20 bg-[#eff4ff]/40 border-y border-[#c7c4d7]/30">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4338ca] block mb-1">
              Verified Placement Outcomes
            </span>
            <h2 className="font-['Manrope'] text-[2rem] font-bold text-[#0b1c30]">
              Students Placed in Dream Tech Positions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#c7c4d7]/30 shadow-sm flex flex-col justify-between">
              <p className="text-[13px] text-[#464554] italic leading-relaxed">
                "I was getting rejected from 5 campus drives without feedback. JobFit showed me my Express rate-limiter and Mongoose queries were missing from my resume radar. Boosted my score from 71% to 89% and got selected at ABC Technologies!"
              </p>
              <div className="mt-5 pt-4 border-t border-[#c7c4d7]/20 flex items-center justify-between">
                <div>
                  <div className="text-[13px] font-bold text-[#0b1c30]">Kavya Deshmukh</div>
                  <div className="text-[11px] text-[#777586]">Placed @ ABC Technologies (₹9.5 LPA)</div>
                </div>
                <span className="text-[12px] font-extrabold text-[#005f26] bg-[#005f26]/10 px-2 py-0.5 rounded">
                  +18% Score
                </span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#c7c4d7]/30 shadow-sm flex flex-col justify-between">
              <p className="text-[13px] text-[#464554] italic leading-relaxed">
                "The Live Coding Arena gave me the exact confidence I needed. The test cases test real edge conditions like burst throttling and memory leak prevention, which came up verbatim in my Razorpay technical round."
              </p>
              <div className="mt-5 pt-4 border-t border-[#c7c4d7]/20 flex items-center justify-between">
                <div>
                  <div className="text-[13px] font-bold text-[#0b1c30]">Arjun Singhal</div>
                  <div className="text-[11px] text-[#777586]">Placed @ Razorpay (₹16.0 LPA)</div>
                </div>
                <span className="text-[12px] font-extrabold text-[#005f26] bg-[#005f26]/10 px-2 py-0.5 rounded">
                  +14% Score
                </span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#c7c4d7]/30 shadow-sm flex flex-col justify-between">
              <p className="text-[13px] text-[#464554] italic leading-relaxed">
                "My mentor on JobFit reviewed my distributed system design and pointed out 3 critical bottlenecks. That 45-minute call literally saved my interview round at Zeta Platforms."
              </p>
              <div className="mt-5 pt-4 border-t border-[#c7c4d7]/20 flex items-center justify-between">
                <div>
                  <div className="text-[13px] font-bold text-[#0b1c30]">Neha Verma</div>
                  <div className="text-[11px] text-[#777586]">Placed @ Zeta (₹14.5 LPA)</div>
                </div>
                <span className="text-[12px] font-extrabold text-[#005f26] bg-[#005f26]/10 px-2 py-0.5 rounded">
                  +16% Score
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section id="faq" className="py-16 lg:py-20 bg-white">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#4338ca] block mb-1">
              Common Queries
            </span>
            <h2 className="font-['Manrope'] text-[2rem] font-bold text-[#0b1c30]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <details className="group bg-[#f8f9ff] p-5 rounded-xl border border-[#c7c4d7]/30 open:bg-[#eff4ff]/60 transition-colors">
              <summary className="font-['Manrope'] font-bold text-[15px] text-[#0b1c30] cursor-pointer flex items-center justify-between">
                <span>How does the 85% Interview Shortlist Cutoff work?</span>
                <span className="material-symbols-outlined text-[20px] text-[#777586] group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <p className="text-[13px] text-[#464554] mt-3 leading-relaxed">
                Top recruitment systems rank candidates across 4 core vectors: academic threshold (CGPA), verified core skills, absence of critical runtime gaps, and hands-on coding arena performance. Profiles scoring 85%+ receive direct invitations to technical assessment rounds.
              </p>
            </details>

            <details className="group bg-[#f8f9ff] p-5 rounded-xl border border-[#c7c4d7]/30 open:bg-[#eff4ff]/60 transition-colors">
              <summary className="font-['Manrope'] font-bold text-[15px] text-[#0b1c30] cursor-pointer flex items-center justify-between">
                <span>Can I register with my college or personal email?</span>
                <span className="material-symbols-outlined text-[20px] text-[#777586] group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <p className="text-[13px] text-[#464554] mt-3 leading-relaxed">
                Yes! Both institutional (.edu / .ac.in) and personal email accounts are supported. Institutional accounts automatically link your college placement cell roster.
              </p>
            </details>

            <details className="group bg-[#f8f9ff] p-5 rounded-xl border border-[#c7c4d7]/30 open:bg-[#eff4ff]/60 transition-colors">
              <summary className="font-['Manrope'] font-bold text-[15px] text-[#0b1c30] cursor-pointer flex items-center justify-between">
                <span>Are the coding tests and mentorship sessions simulated?</span>
                <span className="material-symbols-outlined text-[20px] text-[#777586] group-open:rotate-180 transition-transform">expand_more</span>
              </summary>
              <p className="text-[13px] text-[#464554] mt-3 leading-relaxed">
                The coding tests execute against real automated test runners with hidden edge cases. The mentorship booking connects to calibrated mentor profiles with real-time slot scheduling and feedback loops.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="mt-auto bg-[#0b1c30] text-white pt-14 pb-8 border-t border-[#1e147e]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
            {/* Col 1 */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#4338ca] flex items-center justify-center text-white">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <span className="font-['Manrope'] text-[20px] font-bold text-white tracking-tight">
                  Job<span className="text-[#a5b4fc]">Fit</span>
                </span>
              </div>
              <p className="text-[12px] text-white/70 leading-relaxed">
                Placement & ATS Career Intelligence Platform. Designed for university engineering cohorts and product company hiring drives.
              </p>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col gap-2 text-[12px]">
              <span className="font-bold uppercase tracking-wider text-white/90 mb-1">Platform Tools</span>
              <button onClick={() => onNavigate('dashboard')} className="text-left text-white/70 hover:text-white transition-colors cursor-pointer">Candidate Dashboard</button>
              <button onClick={() => onNavigate('skill-gap')} className="text-left text-white/70 hover:text-white transition-colors cursor-pointer">Skill Gap Diagnostic</button>

              <button onClick={() => onNavigate('recommendations')} className="text-left text-white/70 hover:text-white transition-colors cursor-pointer">14-Day Sprint</button>
              <button onClick={() => onNavigate('mentorship')} className="text-left text-white/70 hover:text-white transition-colors cursor-pointer">Book Mentor</button>
            </div>

            {/* Col 3 */}
            <div className="flex flex-col gap-2 text-[12px]">
              <span className="font-bold uppercase tracking-wider text-white/90 mb-1">Account & Access</span>
              <button onClick={() => openAuth('login')} className="text-left text-white/70 hover:text-white transition-colors cursor-pointer">Sign In to Existing Account</button>
              <button onClick={() => openAuth('register')} className="text-left text-white/70 hover:text-white transition-colors cursor-pointer">Register Free Candidate</button>
              <button onClick={() => onNavigate('settings')} className="text-left text-white/70 hover:text-white transition-colors cursor-pointer">Target Role Preferences</button>
              <button onClick={() => onNavigate('my-profile-resume')} className="text-left text-white/70 hover:text-white transition-colors cursor-pointer">Resume Calibration</button>
            </div>

            {/* Col 4 */}
            <div className="flex flex-col gap-2 text-[12px]">
              <span className="font-bold uppercase tracking-wider text-white/90 mb-1">System Health</span>
              <div className="flex items-center gap-2 text-white/80">
                <span className="w-2 h-2 rounded-full bg-[#00e676]"></span>
                <span>All ATS Match Engines Operational</span>
              </div>
              <span className="text-white/60 text-[11px] mt-2">
                Version 2.4.0 • Enterprise Placement Edition
              </span>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/50 gap-4">
            <span>© 2026 JobFit Career Intelligence Systems. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <span className="hover:text-white/80 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white/80 cursor-pointer">ATS Terms of Evaluation</span>
              <span className="hover:text-white/80 cursor-pointer">Campus Liaison Support</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        onLoginSuccess={(candidate, sessionInfo) => {
          onLoginSuccess(candidate, sessionInfo);
          onNavigate('dashboard');
        }}
      />
    </div>
  );
};
