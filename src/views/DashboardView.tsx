import React, { useState } from 'react';
import { CandidateProfile, JobListing } from '../types.ts';

interface DashboardViewProps {
  candidate: CandidateProfile;
  jobs: JobListing[];
  onNavigate: (path: string) => void;
  onOpenActionPlan: () => void;
  onOpenEligibilityModal: () => void;
  onExportReport: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  candidate,
  jobs,
  onNavigate,
  onOpenActionPlan,
  onOpenEligibilityModal,
  onExportReport,
}) => {
  const [downloading, setDownloading] = useState(false);

  const handleExport = () => {
    setDownloading(true);
    onExportReport();
    setTimeout(() => {
      setDownloading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Dynamic Greeting & Career Horizon Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#4338ca]/10 text-[#4338ca] text-[11px] uppercase tracking-wider font-semibold">
              {candidate.cohort}
            </span>
            <span className="text-[#777586] text-[11px]">•</span>
            <span className="text-[#777586] text-[11px]">Updated 14 mins ago</span>
          </div>
          <h1 className="font-['Manrope'] text-[2.25rem] text-[#0b1c30] tracking-tight font-extrabold">
            Good morning, {candidate.name.split(' ')[0]} 👋
          </h1>
          <p className="text-[15px] text-[#464554] max-w-2xl">
            Let's improve your job readiness. You are{' '}
            <span className="text-[#4338ca] font-bold">12% away</span> from unlocking your target{' '}
            {candidate.targetRole} role.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={() => onNavigate('settings')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white shadow-sm hover:shadow text-[#0b1c30] text-[13px] font-semibold border border-[#c7c4d7]/40 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-[#777586]">tune</span>
            <span>Target Preferences</span>
          </button>
          <button
            onClick={handleExport}
            disabled={downloading}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#4338ca] hover:bg-[#2a14b4] text-white text-[13px] font-semibold shadow-sm hover:shadow transition-all cursor-pointer disabled:opacity-75"
          >
            <span className={`material-symbols-outlined text-[18px] ${downloading ? 'animate-spin' : ''}`}>
              {downloading ? 'refresh' : 'file_download'}
            </span>
            <span>{downloading ? 'Exporting...' : 'Export Readiness Report'}</span>
          </button>
        </div>
      </header>

      {/* Metric Quadrant: KPI Overview Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Profile Integrity */}
        <div className="flex flex-col justify-between p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow border border-[#c7c4d7]/20">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-[#777586] uppercase tracking-wider">
                Profile Integrity
              </span>
              <span className="font-['Manrope'] text-[2rem] font-extrabold text-[#0b1c30] mt-1 tabular-nums">
                {candidate.profileIntegrity}%
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#4338ca]">
              <span className="material-symbols-outlined text-[22px]">account_circle</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-[#eff4ff] rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#4338ca] h-full rounded-full transition-all duration-700"
                style={{ width: `${candidate.profileIntegrity}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between mt-2 text-[11px]">
              <span className="text-[#464554]">Upload latest certificate</span>
              <span className="text-[#4338ca] font-bold">+7% Target</span>
            </div>
          </div>
        </div>

        {/* Card 2: Average Match */}
        <div className="flex flex-col justify-between p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow border border-[#c7c4d7]/20">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-[#777586] uppercase tracking-wider">
                Average Match
              </span>
              <span className="font-['Manrope'] text-[2rem] font-extrabold text-[#0b1c30] mt-1 tabular-nums">
                {candidate.averageMatch}%
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#eaddff]/40 flex items-center justify-center text-[#712ae2]">
              <span className="material-symbols-outlined text-[22px]">target</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#eaddff] text-[#25005a] text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#712ae2]"></span>
              <span>Software Developer Target</span>
            </div>
          </div>
        </div>

        {/* Card 3: Critical Gaps */}
        <div className="flex flex-col justify-between p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow border border-[#c7c4d7]/20">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-[#777586] uppercase tracking-wider">
                Critical Gaps
              </span>
              <span className="font-['Manrope'] text-[2rem] font-extrabold text-[#ba1a1a] mt-1 tabular-nums">
                {candidate.criticalGapsCount} Skills
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#ffdad6]/50 flex items-center justify-center text-[#ba1a1a]">
              <span className="material-symbols-outlined text-[22px]">warning</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-[12px] text-[#464554] truncate font-medium" title="Node.js, MongoDB, Advanced DSA">
              Node.js, MongoDB, Adv. DSA
            </p>
          </div>
        </div>

        {/* Card 4: Active Pipeline */}
        <div className="flex flex-col justify-between p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow border border-[#c7c4d7]/20">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-[#777586] uppercase tracking-wider">
                Pipeline Status
              </span>
              <span className="font-['Manrope'] text-[2rem] font-extrabold text-[#0b1c30] mt-1 tabular-nums">
                {candidate.activeApplicationsCount} Active
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#005f26]">
              <span className="material-symbols-outlined text-[22px]">send</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#7ffc97]/30 text-[#002109] text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#005f26]"></span>
              <span>{candidate.shortlistedCount} Shortlisted Candidates</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Benchmark Spotlight Card */}
      <section className="relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-md transition-all p-6 lg:p-8 border border-[#c7c4d7]/30">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-gradient-to-br from-[#c3c0ff]/30 via-[#eaddff]/20 to-transparent blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left: Comprehensive Data Rubric */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-[#712ae2]/10 text-[#712ae2] text-[11px] font-bold tracking-wide uppercase">
                Benchmark Analysis
              </span>
              <span className="px-2.5 py-0.5 rounded bg-[#eff4ff] text-[#464554] text-[11px] font-medium">
                Target Role: Software Developer
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="font-['Manrope'] text-[1.75rem] text-[#0b1c30] font-bold tracking-tight">
                Your Career Readiness Benchmark
              </h2>
              <p className="text-[14px] text-[#464554] leading-relaxed max-w-3xl">
                You have strong fundamentals (
                <span className="text-[#0b1c30] font-semibold">C++, SQL, Git, OOP, 8.4 CGPA</span>), but
                lack <span className="text-[#ba1a1a] font-semibold">Backend API & Database stack</span>{' '}
                required by top tech recruiters.
              </p>
            </div>

            {/* Metric Vector Progress Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-[#eff4ff] flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold text-[#777586]">Current Standing</span>
                <span className="font-['Manrope'] text-[1.25rem] font-bold text-[#4338ca] tabular-nums">
                  {candidate.readinessScore}% Match
                </span>
                <span className="text-[11px] text-[#464554]">Baseline Verified</span>
              </div>

              <div className="p-3 rounded-lg bg-[#eff4ff] flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold text-[#777586]">Interview Threshold</span>
                <span className="font-['Manrope'] text-[1.25rem] font-bold text-[#005f26] tabular-nums">
                  90% Target
                </span>
                <span className="text-[11px] text-[#005f26] font-semibold">
                  {Math.max(0, 90 - candidate.readinessScore)}% to Shortlist
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#eff4ff] flex flex-col gap-0.5">
                <span className="text-[11px] font-semibold text-[#777586]">Key Company Focus</span>
                <span className="font-['Manrope'] text-[1.25rem] font-bold text-[#0b1c30]">
                  ABC Tech
                </span>
                <span className="text-[11px] text-[#464554]">Tier-1 Partner</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('skill-gap')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#4338ca] text-white text-[13px] font-semibold hover:bg-[#2a14b4] transition-all shadow-sm cursor-pointer"
              >
                <span>View Skill Gap Analysis</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <button
                onClick={onOpenEligibilityModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-[13px] font-semibold transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-[#777586]">fact_check</span>
                <span>Check Eligibility Score</span>
              </button>

              <button
                onClick={() => onNavigate('recommendations')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#4338ca] text-[13px] font-semibold transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">route</span>
                <span>Explore Recommended Roadmap</span>
              </button>
            </div>
          </div>

          {/* Right: Circular Gauge & Status Card */}
          <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-[#eff4ff]/80 w-full sm:w-auto min-w-[280px]">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  className="text-[#dce9ff]"
                  cx="60"
                  cy="60"
                  fill="transparent"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="10"
                />
                <circle
                  className="text-[#4338ca] transition-all duration-1000 ease-out"
                  cx="60"
                  cy="60"
                  fill="transparent"
                  r="50"
                  stroke="currentColor"
                  strokeDasharray="314.159"
                  strokeDashoffset={314.159 - (314.159 * candidate.readinessScore) / 100}
                  strokeLinecap="round"
                  strokeWidth="10"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-['Manrope'] text-[2.25rem] font-extrabold text-[#0b1c30] leading-none tabular-nums">
                  {candidate.readinessScore}%
                </span>
                <span className="text-[11px] text-[#777586] mt-1 font-bold uppercase tracking-wider">
                  Readiness
                </span>
              </div>
            </div>

            <div className="mt-3 text-center flex flex-col items-center">
              <span className="px-2.5 py-1 rounded-full bg-[#eaddff] text-[#25005a] text-[11px] font-bold tracking-wider uppercase">
                Partially Eligible
              </span>
              <span className="text-[#777586] text-[13px] mt-1 font-medium">
                Software Dev @ ABC Technologies
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Opportunities Section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="font-['Manrope'] text-[1.75rem] text-[#0b1c30] font-bold">
              Recommended Jobs for Your Profile
            </h2>
            <p className="text-[13px] text-[#777586]">
              Tailored algorithmically to your current coursework, technical stack, and gap recovery potential
            </p>
          </div>
          <button
            onClick={() => onNavigate('search-jobs')}
            className="inline-flex items-center gap-1 text-[13px] text-[#4338ca] font-semibold hover:underline cursor-pointer"
          >
            <span>View all 42 matched positions</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Job Cards List */}
        <div className="flex flex-col gap-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-5 rounded-xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 border border-[#c7c4d7]/30"
            >
              <div className="flex items-start gap-4 min-w-0">
                <div className="w-13 h-13 rounded-xl bg-[#eff4ff] flex-shrink-0 flex items-center justify-center font-bold text-[#4338ca] text-[16px] border border-[#c7c4d7]/20">
                  {job.companyLogo}
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-['Manrope'] text-[1.125rem] font-bold text-[#0b1c30] truncate">
                      {job.title}
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[11px] text-[#464554] font-medium">
                      {job.company}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                        job.statusTag === 'PARTIALLY ELIGIBLE'
                          ? 'bg-[#eaddff] text-[#25005a]'
                          : job.statusTag === 'POTENTIAL FIT'
                          ? 'bg-[#dce9ff] text-[#2a14b4]'
                          : 'bg-[#ffdad6] text-[#ba1a1a]'
                      }`}
                    >
                      {job.statusTag}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-[#777586] text-[13px] mt-1">
                    <span className="inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">location_on</span>
                      {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">payments</span>
                      {job.salary}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">work</span>
                      {job.jobType}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                    <span className="text-[12px] text-[#777586] mr-1">Evaluated Skills:</span>
                    {job.evaluatedSkills.map((s, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                          s.status === 'met'
                            ? 'bg-[#dce9ff] text-[#2a14b4]'
                            : 'bg-[#ffdad6]/60 text-[#ba1a1a] font-semibold'
                        }`}
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#c7c4d7]/20">
                <div className="flex items-center gap-2">
                  <span className="font-['Manrope'] text-[1.25rem] font-extrabold text-[#4338ca] tabular-nums">
                    {job.matchPercent}%
                  </span>
                  <span className="text-[12px] text-[#777586]">Match</span>
                </div>
                <button
                  onClick={() => onNavigate('skill-gap')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-[13px] font-semibold transition-all cursor-pointer"
                >
                  <span>View Job & Eligibility</span>
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Continue Your Growth Journey */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="font-['Manrope'] text-[1.75rem] text-[#0b1c30] font-bold">
            Continue Your Growth Journey
          </h2>
          <p className="text-[13px] text-[#777586]">
            Direct interventions to bridge your remaining 12% skill discrepancy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Growth 1: Course */}
          <div className="flex flex-col justify-between rounded-xl bg-white shadow-sm hover:shadow-md p-4 transition-all border border-[#c7c4d7]/30">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-[#e3dfff] text-[#100069] text-[11px] font-semibold">
                  Self-Paced Module
                </span>
                <span className="inline-flex items-center gap-1 text-[#005f26] text-[11px] font-bold">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span> +8% Match Boost
                </span>
              </div>
              <h3 className="font-['Manrope'] text-[1.125rem] font-bold text-[#0b1c30] mt-1">
                Learn Node.js & Express
              </h3>
              <p className="text-[13px] text-[#464554]">
                Master architectural routing, middleware pipeline patterns, and secure REST design principles.
              </p>
              <div className="flex items-center gap-4 text-[#777586] text-[12px] pt-1">
                <span className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">school</span> JobFit Labs
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">schedule</span> 8 hrs total
                </span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#c7c4d7]/20 flex items-center justify-between">
              <span className="text-[12px] text-[#0b1c30] font-medium">Beginner to Pro</span>
              <button
                onClick={() => onNavigate('courses')}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#4338ca] text-white text-[12px] font-semibold hover:bg-[#2a14b4] transition-colors cursor-pointer"
              >
                <span>Start Module</span>
                <span className="material-symbols-outlined text-[16px]">play_arrow</span>
              </button>
            </div>
          </div>

          {/* Growth 2: Mentor */}
          <div className="flex flex-col justify-between rounded-xl bg-white shadow-sm hover:shadow-md p-4 transition-all border border-[#c7c4d7]/30">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-[#eaddff] text-[#25005a] text-[11px] font-semibold">
                  1:1 Architecture Review
                </span>
                <span className="inline-flex items-center gap-1 text-[#464554] text-[11px] font-semibold">
                  <span className="material-symbols-outlined text-[14px] text-amber-500 fill-current-icon">star</span>{' '}
                  4.8 (94 reviews)
                </span>
              </div>
              <h3 className="font-['Manrope'] text-[1.125rem] font-bold text-[#0b1c30] mt-1">
                Book Rahul Sharma
              </h3>
              <p className="text-[13px] text-[#464554]">
                Senior Backend Mentor @ Razorpay. Specializing in concurrency pipelines and system interview preparation.
              </p>
              <div className="flex items-center gap-4 text-[#777586] text-[12px] pt-1">
                <span className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">video_chat</span> 45 Min Session
                </span>
                <span className="text-[#0b1c30] font-bold">₹499/session</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#c7c4d7]/20 flex items-center justify-between">
              <span className="text-[11px] text-[#005f26] font-semibold">Available Tomorrow</span>
              <button
                onClick={() => onNavigate('mentorship')}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-[12px] font-semibold transition-colors cursor-pointer"
              >
                <span>Book Slot</span>
                <span className="material-symbols-outlined text-[16px]">event</span>
              </button>
            </div>
          </div>

          {/* Growth 3: Portfolio & ATS Calibration */}
          <div className="flex flex-col justify-between rounded-xl bg-white shadow-sm hover:shadow-md p-4 transition-all border border-[#c7c4d7]/30">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-[#7ffc97]/40 text-[#002109] text-[11px] font-semibold">
                  ATS Calibration
                </span>
                <span className="inline-flex items-center gap-1 text-[#005f26] text-[11px] font-bold">
                  <span className="material-symbols-outlined text-[14px]">verified</span> 89/100 Index
                </span>
              </div>
              <h3 className="font-['Manrope'] text-[1.125rem] font-bold text-[#0b1c30] mt-1">
                ATS Resume & Portfolio Audit
              </h3>
              <p className="text-[13px] text-[#464554]">
                Semantic token validation against Tier-1 campus hiring portals, keyword density, and gatekeeper checks.
              </p>
              <div className="flex items-center gap-4 text-[#777586] text-[12px] pt-1">
                <span className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">badge</span> 5 Skills Verified
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">fact_check</span> Recruiter Ready
                </span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#c7c4d7]/20 flex items-center justify-between">
              <span className="text-[11px] text-[#005f26] font-semibold">Updated 14m ago</span>
              <button
                onClick={() => onNavigate('my-profile-resume')}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-[12px] font-semibold transition-colors cursor-pointer"
              >
                <span>View Audit</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
