import React, { useState } from 'react';
import { CandidateProfile } from '../types.ts';

interface SkillGapViewProps {
  candidate: CandidateProfile;
  onNavigate: (path: string) => void;
  onOpenActionPlan: () => void;
  onExportReport: () => void;
}

export const SkillGapView: React.FC<SkillGapViewProps> = ({
  candidate,
  onNavigate,
  onOpenActionPlan,
  onExportReport,
}) => {
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [sharedToast, setSharedToast] = useState(false);

  const handleSavePdf = () => {
    setDownloadingPdf(true);
    onExportReport();
    setTimeout(() => {
      setDownloadingPdf(false);
    }, 1800);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setSharedToast(true);
    setTimeout(() => setSharedToast(false), 2000);
  };

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Top Banner: Strategic Job Target Bar */}
      <div className="relative bg-white rounded-xl p-6 shadow-sm border border-[#c7c4d7]/30 overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#4338ca]/5 rounded-full pointer-events-none blur-2xl"></div>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#4338ca] font-['Manrope'] font-bold text-[20px] shrink-0 border border-[#c7c4d7]/30 shadow-sm">
              ABC
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-['Manrope'] text-[1.75rem] text-[#0b1c30] font-extrabold tracking-tight">
                  {candidate.targetRole}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#e3dfff] text-[#2a14b4] text-[11px] font-semibold">
                  Tier-1 Shortlist Track
                </span>
              </div>
              <span className="text-[14px] text-[#464554] font-medium">
                {candidate.targetCompany} • {candidate.division}
              </span>
              <div className="flex items-center gap-x-4 gap-y-1 flex-wrap mt-1 text-[13px] text-[#777586]">
                <span className="inline-flex items-center gap-1 text-[#464554]">
                  <span className="material-symbols-outlined text-[16px] text-[#4338ca]">location_on</span>
                  {candidate.location}
                </span>
                <span className="inline-flex items-center gap-1 text-[#464554]">
                  <span className="material-symbols-outlined text-[16px] text-[#4338ca]">business_center</span>
                  Full Time
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-[#005f26]">
                  <span className="material-symbols-outlined text-[16px]">payments</span>
                  {candidate.salaryRange}
                </span>
                <span className="inline-flex items-center gap-1 text-[#464554]">
                  <span className="material-symbols-outlined text-[16px] text-[#4338ca]">history_edu</span>
                  {candidate.experienceLevel}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch lg:self-auto justify-end">
            <button
              onClick={handleSavePdf}
              disabled={downloadingPdf}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#eff4ff] text-[13px] font-semibold text-[#0b1c30] hover:bg-[#dce9ff] transition-all cursor-pointer border border-[#c7c4d7]/30"
            >
              <span className={`material-symbols-outlined text-[18px] ${downloadingPdf ? 'animate-spin' : ''}`}>
                {downloadingPdf ? 'refresh' : 'download_for_offline'}
              </span>
              <span>{downloadingPdf ? 'Generating PDF...' : 'Save Job Analysis PDF'}</span>
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center justify-center p-2.5 rounded-lg bg-[#eff4ff] text-[#464554] hover:text-[#4338ca] hover:bg-[#dce9ff] transition-all border border-[#c7c4d7]/30 cursor-pointer"
              title="Share Analysis Link"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>
          </div>
        </div>

        {sharedToast && (
          <div className="mt-2 text-[12px] font-semibold text-[#005f26] flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>Link copied to clipboard!</span>
          </div>
        )}
      </div>

      {/* Central Scoring & Hero Benchmark Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Hero: Score Engine Gauge */}
        <div className="lg:col-span-5 bg-white rounded-xl p-6 shadow-sm border border-[#c7c4d7]/30 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between pb-3">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#777586]">
                Fit Decision Engine
              </span>
              <h2 className="font-['Manrope'] text-[1.25rem] text-[#0b1c30] font-bold">
                Eligibility Breakdown
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#eaddff] text-[#25005a] text-[11px] font-bold uppercase tracking-wider">
              Automated Index
            </span>
          </div>

          {/* Large Gauge */}
          <div className="flex flex-col items-center justify-center py-4 relative">
            <div className="relative w-56 h-56 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                <circle
                  className="text-[#dce9ff]"
                  cx="80"
                  cy="80"
                  r="68"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="12"
                />
                <circle
                  className="text-[#712ae2] transition-all duration-1000 ease-out"
                  cx="80"
                  cy="80"
                  r="68"
                  fill="transparent"
                  stroke="currentColor"
                  strokeDasharray="427.26"
                  strokeDashoffset={427.26 - (427.26 * candidate.readinessScore) / 100}
                  strokeLinecap="round"
                  strokeWidth="12"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="font-['Manrope'] text-[2.75rem] font-extrabold text-[#0b1c30] leading-none tabular-nums">
                  {candidate.readinessScore}%
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#777586] mt-1">
                  Calibrated Fit
                </span>
                <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#dce9ff] text-[#2a14b4] text-[11px] font-bold">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span> +14% Potential
                </div>
              </div>
            </div>

            <div className="mt-4 text-center flex flex-col items-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[12px] font-bold uppercase tracking-wide">
                <span className="material-symbols-outlined text-[16px]">warning</span>
                Partially Eligible
              </span>
              <p className="text-[13px] text-[#464554] max-w-xs mt-2 text-center leading-relaxed">
                Your foundational skills meet standards, but specific recruiter-weighted backend requirements create a gap.
              </p>
            </div>
          </div>

          {/* Recruiter Cutoff Marker Gauge */}
          <div className="mt-4 p-3 bg-[#eff4ff] rounded-lg flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-[12px]">
              <span className="text-[#464554] font-medium">Recruiter Baseline Minimum</span>
              <span className="font-bold text-[#0b1c30]">85% Required</span>
            </div>
            <div className="relative w-full h-2.5 bg-[#dce9ff] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#712ae2] rounded-full transition-all duration-700"
                style={{ width: `${candidate.readinessScore}%` }}
              ></div>
              <div
                className="absolute top-0 bottom-0 w-1 bg-[#ba1a1a] rounded-full z-10"
                style={{ left: '85%' }}
                title="Direct Interview Shortlist Cutoff (85%)"
              ></div>
            </div>
            <div className="flex justify-between items-center text-[11px] text-[#777586] pt-0.5">
              <span>Current: {candidate.readinessScore}%</span>
              <span className="font-bold text-[#ba1a1a] flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[12px]">flag</span> Shortlist Gap:{' '}
                {Math.max(0, 85 - candidate.readinessScore)}%
              </span>
            </div>
          </div>
        </div>

        {/* Right: AI Strategic Directive & Gatekeeper Criteria */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* AI Talent Evaluation & Root-Cause Gap */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#c7c4d7]/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#712ae2]/5 rounded-bl-full pointer-events-none"></div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-[#712ae2] text-white rounded-md flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">psychology</span>
              </div>
              <h3 className="font-['Manrope'] text-[1.125rem] text-[#0b1c30] font-bold">
                AI Talent Evaluation & Root-Cause Gap
              </h3>
            </div>

            <div className="mt-2 p-4 bg-[#eaddff]/40 rounded-lg">
              <p className="text-[14px] text-[#0b1c30] leading-relaxed">
                <strong className="font-semibold text-[#712ae2]">What is stopping you?</strong> You already meet the education, experience, and CGPA requirements with an impressive{' '}
                <strong className="font-semibold">8.4 score</strong>. Your primary roadblock is hands-on{' '}
                <strong className="font-semibold text-[#4338ca]">Backend Development (Node.js & MongoDB)</strong>. Bridging this specific deficit will raise your match to{' '}
                <strong className="text-[#005f26] font-bold">92%</strong> and immediately qualify you for automated direct interview recommendation.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="p-3 bg-[#eff4ff] rounded-lg text-center">
                <span className="text-[11px] text-[#777586] font-semibold uppercase">Shortlist Impact</span>
                <div className="font-['Manrope'] text-[1.25rem] text-[#005f26] font-extrabold mt-0.5 tabular-nums">
                  +14% Match
                </div>
              </div>
              <div className="p-3 bg-[#eff4ff] rounded-lg text-center">
                <span className="text-[11px] text-[#777586] font-semibold uppercase">Estimated Effort</span>
                <div className="font-['Manrope'] text-[1.25rem] text-[#4338ca] font-extrabold mt-0.5">
                  14–18 Hours
                </div>
              </div>
              <div className="p-3 bg-[#eff4ff] rounded-lg text-center">
                <span className="text-[11px] text-[#777586] font-semibold uppercase">Shortlist Odds</span>
                <div className="font-['Manrope'] text-[1.25rem] text-[#712ae2] font-extrabold mt-0.5">
                  Top 5% Tier
                </div>
              </div>
            </div>
          </div>

          {/* Hard Eligibility Criteria Checklist */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#c7c4d7]/30 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-1">
              <h3 className="font-['Manrope'] text-[1.125rem] text-[#0b1c30] font-bold">
                Mandatory Gatekeeper Criteria
              </h3>
              <span className="text-[12px] text-[#777586] font-medium">3 of 4 Criteria Satisfied</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              {candidate.gatekeeperCriteria.map((crit) => (
                <div
                  key={crit.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    crit.met
                      ? 'bg-[#eff4ff] border-[#c7c4d7]/20'
                      : 'bg-[#ffdad6]/40 border-[#ffdad6]'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      crit.met ? 'bg-[#005f26] text-white' : 'bg-[#ba1a1a] text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {crit.met ? 'check' : 'priority_high'}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13px] text-[#0b1c30] font-bold truncate">
                      {crit.label}
                    </span>
                    <span
                      className={`text-[11px] font-semibold truncate ${
                        crit.met ? 'text-[#005f26]' : 'text-[#ba1a1a]'
                      }`}
                    >
                      {crit.detail}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-2 text-[11px] text-[#777586]">
              <span className="material-symbols-outlined text-[15px] text-[#4338ca]">verified_user</span>
              <span>
                Verified against ABC Technologies' active Applicant Tracking System (ATS) parsing rules.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparative Technical Matrix: Skills Have vs. Skills Need */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills You Have Column */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#c7c4d7]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-[#005f26] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">task_alt</span>
                </div>
                <h3 className="font-['Manrope'] text-[1.125rem] text-[#0b1c30] font-bold">
                  Skills You Have (5 Verified)
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#7ffc97]/40 text-[#002109] text-[11px] font-bold">
                High Confidence
              </span>
            </div>
            <p className="text-[12px] text-[#777586] mb-4">
              Validated through code evaluations, project repositories, and technical assessments.
            </p>

            <div className="flex flex-col gap-2.5">
              {candidate.verifiedSkills.map((skill, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-[#eff4ff] rounded-lg border border-[#c7c4d7]/20">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#005f26] text-[20px]">check_circle</span>
                    <div className="flex flex-col">
                      <span className="text-[13px] text-[#0b1c30] font-bold">{skill.name}</span>
                      <span className="text-[11px] text-[#777586]">{skill.description}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[12px] font-semibold text-[#005f26]">{skill.level}</span>
                    <span className="px-2 py-0.5 bg-[#dce9ff] text-[11px] font-bold text-[#0b1c30] rounded tabular-nums">
                      {skill.score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#c7c4d7]/20 flex items-center justify-between text-[#464554] text-[12px]">
            <span>Foundational Readiness: <strong className="text-[#0b1c30]">Strong</strong></span>
            <span className="text-[#005f26] font-bold">5 Met / 0 Deficit</span>
          </div>
        </div>

        {/* Skills You Need Column */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#c7c4d7]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-[#ba1a1a] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">cancel</span>
                </div>
                <h3 className="font-['Manrope'] text-[1.125rem] text-[#0b1c30] font-bold">
                  Skills You Need (3 Gaps)
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[11px] font-bold">
                Priority Action
              </span>
            </div>
            <p className="text-[12px] text-[#777586] mb-4">
              Recruiter-required criteria currently missing or insufficiently demonstrated on your profile.
            </p>

            <div className="flex flex-col gap-2.5">
              {candidate.missingSkills.map((gap, idx) => (
                <div key={idx} className="p-3 bg-[#eff4ff] rounded-lg flex flex-col gap-1.5 border border-[#c7c4d7]/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#ba1a1a] text-[20px]">
                        {gap.status === 'Missing' ? 'cancel' : 'published_with_changes'}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-[13px] text-[#0b1c30] font-bold">{gap.name}</span>
                        <span className="text-[11px] text-[#777586]">{gap.description}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-[#ffdad6] text-[#ba1a1a] text-[11px] font-bold rounded">
                      {gap.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-[#464554]">Recruiter Weighting Impact</span>
                    <span className="font-bold text-[#ba1a1a]">{gap.severity}: {gap.weight}% Weight</span>
                  </div>

                  <div className="w-full bg-[#dce9ff] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#ba1a1a] h-full rounded-full"
                      style={{ width: `${gap.weight}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#c7c4d7]/20 flex items-center justify-between text-[#464554] text-[12px]">
            <span>Combined Deficit Influence: <strong className="text-[#0b1c30]">75% Weight</strong></span>
            <span className="text-[#ba1a1a] font-bold">3 Targeted Gaps</span>
          </div>
        </div>
      </div>

      {/* Peer Context & Benchmark Visualization Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#c7c4d7]/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-['Manrope'] text-[1.125rem] text-[#0b1c30] font-bold">
              Applicant Pool Distribution
            </h3>
            <p className="text-[13px] text-[#777586]">
              Comparison across 248 engineering applicants for ABC Technologies Software Developer batch
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[11px] text-[#464554]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#777586]"></span> Applicants
            </span>
            <span className="flex items-center gap-1 text-[11px] text-[#712ae2] font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#712ae2]"></span> You ({candidate.readinessScore}%)
            </span>
            <span className="flex items-center gap-1 text-[11px] text-[#005f26] font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#005f26]"></span> Shortlisted (85%+)
            </span>
          </div>
        </div>

        {/* Inline Distribution Spark / Bar Visualization */}
        <div className="w-full bg-[#eff4ff] rounded-xl p-4">
          <div className="h-16 w-full flex items-end gap-1.5 pt-2">
            <div className="flex-1 bg-[#dce9ff] rounded-t h-[20%] relative group" title="Score: <50% (32 applicants)"></div>
            <div className="flex-1 bg-[#dce9ff] rounded-t h-[35%] relative group" title="Score: 50-60% (48 applicants)"></div>
            <div className="flex-1 bg-[#dce9ff] rounded-t h-[60%] relative group" title="Score: 60-70% (74 applicants)"></div>
            <div className="flex-1 bg-[#dce9ff] rounded-t h-[75%] relative group" title="Score: 70-75% (42 applicants)"></div>
            {/* User Bracket */}
            <div className="flex-1 bg-[#712ae2] rounded-t h-[88%] relative group shadow-sm" title="You are here: 78% (Rahul Sharma)">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#712ae2] text-white text-[10px] font-bold rounded shadow-md whitespace-nowrap">
                You ({candidate.readinessScore}%)
              </div>
            </div>
            {/* Cutoff Marker Zone */}
            <div className="flex-1 bg-[#005f26]/40 rounded-t h-[50%] relative group" title="Score: 80-85% (28 applicants)"></div>
            <div className="flex-1 bg-[#005f26] rounded-t h-[30%] relative group" title="Score: 85-90% (14 applicants - Shortlisted)">
              <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#005f26] text-white text-[10px] font-bold rounded shadow-md whitespace-nowrap">
                Cutoff (85%)
              </div>
            </div>
            <div className="flex-1 bg-[#005f26] rounded-t h-[15%] relative group" title="Score: >90% (10 applicants - Top Tier)"></div>
          </div>
          <div className="flex justify-between items-center text-[#777586] text-[11px] mt-2 pt-1 border-t border-[#c7c4d7]/30">
            <span>Entry Threshold (40%)</span>
            <span>Median Candidate (67%)</span>
            <span className="font-bold text-[#712ae2]">Your Tier: 78th Percentile</span>
            <span className="font-bold text-[#005f26]">Interview Direct Invite (85%+)</span>
          </div>
        </div>
      </div>

      {/* Primary Journey Navigation & Action Hub */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#c7c4d7]/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#4338ca]/10 text-[#4338ca] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[28px]">rocket_launch</span>
            </div>
            <div className="flex flex-col">
              <h4 className="font-['Manrope'] text-[1.125rem] text-[#0b1c30] font-bold">
                Bridge Your 7% Gap to Reach 85%+
              </h4>
              <p className="text-[13px] text-[#464554]">
                Activate the calibrated fast-track curriculum designed strictly around ABC Tech's interview stack.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto flex-wrap justify-end">
            <button
              onClick={onOpenActionPlan}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-lg bg-[#eff4ff] text-[13px] font-bold text-[#0b1c30] hover:bg-[#dce9ff] transition-all cursor-pointer border border-[#c7c4d7]/30"
            >
              <span className="material-symbols-outlined text-[20px] text-[#4338ca]">route</span>
              <span>View Personalized 3-Step Action Plan</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};
