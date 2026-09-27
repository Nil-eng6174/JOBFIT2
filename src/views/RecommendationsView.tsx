import React, { useState } from 'react';
import { CandidateProfile } from '../types.ts';

interface RecommendationsViewProps {
  candidate: CandidateProfile;
  onNavigate: (path: string) => void;
  onOpenMentorshipModal: () => void;
  onStartSprint: () => void;
}

export const RecommendationsView: React.FC<RecommendationsViewProps> = ({
  candidate,
  onNavigate,
  onOpenMentorshipModal,
  onStartSprint,
}) => {
  const [sprintStarting, setSprintStarting] = useState(false);
  const [sprintStarted, setSprintStarted] = useState(candidate.sprintEnrolled);

  const handleSprintClick = () => {
    setSprintStarting(true);
    onStartSprint();
    setTimeout(() => {
      setSprintStarting(false);
      setSprintStarted(true);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Target Context Banner */}
      <div className="relative overflow-hidden bg-white rounded-xl shadow-sm border border-[#c7c4d7]/30 p-6 md:p-8">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-[#4338ca]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-32 -bottom-20 w-64 h-64 bg-[#712ae2]/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-[#e3dfff] text-[#100069] text-[11px] uppercase tracking-wider font-semibold">
                Live Diagnostic
              </span>
              <span className="text-[#777586] text-[11px]">•</span>
              <span className="text-[#777586] text-[11px]">Recruiter Evaluation Calibration</span>
            </div>
            <h1 className="font-['Manrope'] text-[2.25rem] text-[#0b1c30] tracking-tight font-extrabold">
              {candidate.targetRole} <span className="text-[#464554] font-normal">@ {candidate.targetCompany}</span>
            </h1>
            <p className="text-[15px] text-[#464554]">
              System detected 3 addressable skill vectors separating current profile from top 5% applicant percentile.
            </p>
          </div>

          {/* Readiness Delta Gauge & Metas */}
          <div className="flex items-center gap-6 bg-[#eff4ff]/70 p-4 rounded-xl backdrop-blur-sm self-start xl:self-auto border border-[#c7c4d7]/30">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#dce9ff]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  <path
                    className="text-[#4338ca] transition-all duration-1000"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray={`${candidate.readinessScore}, 100`}
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                  <path
                    className="text-[#62df7d]/70"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="92, 100"
                    strokeDashoffset={`-${candidate.readinessScore}`}
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="font-['Manrope'] text-[1.125rem] text-[#0b1c30] font-extrabold leading-none tabular-nums">
                    {candidate.readinessScore}%
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-[11px] text-[#777586] uppercase tracking-wider font-semibold">
                  <span>Readiness Delta</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-['Manrope'] text-[1.25rem] text-[#0b1c30] font-bold tabular-nums">
                    {candidate.readinessScore}%
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-[#4338ca]">arrow_forward</span>
                  <span className="font-['Manrope'] text-[1.25rem] text-[#005f26] font-extrabold tabular-nums">
                    92%+
                  </span>
                </div>
                <span className="text-[11px] text-[#005f26] font-bold">
                  +{92 - candidate.readinessScore}% Growth Sprint
                </span>
              </div>
            </div>

            <div className="h-10 w-px bg-[#c7c4d7]/40 hidden sm:block"></div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
                <span className="text-[12px] text-[#0b1c30] font-semibold">Gap: 2 Core, 1 Logic</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#005f26]"></span>
                <span className="text-[12px] text-[#464554]">Estimated Sprint: 12 Days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Visual Roadmap Pipeline */}
      <div className="bg-white rounded-xl shadow-sm border border-[#c7c4d7]/30 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider text-[#712ae2] font-bold">
              JobFit Intelligence Engine
            </span>
            <h2 className="font-['Manrope'] text-[1.75rem] text-[#0b1c30] font-bold">
              Precision Alignment Pipeline
            </h2>
          </div>
          <span className="text-[12px] text-[#777586]">
            Real-time candidate-role differential workflow
          </span>
        </div>

        {/* Pipeline Visual Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 relative">
          {/* Node 1 */}
          <div className="bg-[#eff4ff]/80 rounded-xl p-4 flex flex-col justify-between hover:bg-[#dce9ff]/60 transition-all border border-[#c7c4d7]/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-bold text-[#777586]">Stage 01</span>
              <span className="material-symbols-outlined text-[18px] text-[#2a14b4]">description</span>
            </div>
            <div>
              <div className="text-[13px] text-[#0b1c30] font-bold mb-1">Job Spec</div>
              <p className="text-[12px] text-[#464554] leading-relaxed">ABC Tech Node.js backend baseline scanned</p>
            </div>
            <div className="mt-4 pt-2 text-[#777586] text-[11px] flex items-center gap-1 border-t border-[#c7c4d7]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00451a]"></span> 42 Parameters
            </div>
          </div>

          {/* Node 2 */}
          <div className="bg-[#eff4ff]/80 rounded-xl p-4 flex flex-col justify-between hover:bg-[#dce9ff]/60 transition-all border border-[#c7c4d7]/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-bold text-[#777586]">Stage 02</span>
              <span className="material-symbols-outlined text-[18px] text-[#2a14b4]">psychology</span>
            </div>
            <div>
              <div className="text-[13px] text-[#0b1c30] font-bold mb-1">Resume Parse</div>
              <p className="text-[12px] text-[#464554] leading-relaxed">Semantic token check against 4 yr curriculum</p>
            </div>
            <div className="mt-4 pt-2 text-[#777586] text-[11px] flex items-center gap-1 border-t border-[#c7c4d7]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00451a]"></span> ATS Index 89/100
            </div>
          </div>

          {/* Node 3 (Match Point) */}
          <div className="bg-[#4338ca] text-white rounded-xl p-4 flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-bold text-[#c1beff]">Stage 03</span>
              <span className="material-symbols-outlined text-[18px] text-[#c1beff]">troubleshoot</span>
            </div>
            <div>
              <div className="font-['Manrope'] text-[1.125rem] text-white font-bold mb-1">
                {candidate.readinessScore}% Match
              </div>
              <p className="text-[12px] text-[#c1beff] leading-relaxed">Benchmark threshold: 88% for priority shortlisting</p>
            </div>
            <div className="mt-4 pt-2 text-white text-[11px] font-semibold flex items-center gap-1 border-t border-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7ffc97]"></span> Delta: -{88 - candidate.readinessScore}% Gap
            </div>
          </div>

          {/* Node 4 (Missing Skills Gap) */}
          <div className="bg-[#ffdad6]/40 rounded-xl p-4 flex flex-col justify-between hover:bg-[#ffdad6]/60 transition-all border border-[#ffdad6]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-bold text-[#ba1a1a]">Stage 04</span>
              <span className="material-symbols-outlined text-[18px] text-[#ba1a1a]">warning</span>
            </div>
            <div>
              <div className="text-[13px] text-[#ba1a1a] font-bold mb-1">Gaps Found</div>
              <p className="text-[12px] text-[#464554] leading-relaxed">Node.js Express runtime + MongoDB schema logic</p>
            </div>
            <div className="mt-4 pt-2 text-[#ba1a1a] text-[11px] font-bold flex items-center gap-1 border-t border-[#ffdad6]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]"></span> 2 Blockers identified
            </div>
          </div>

          {/* Node 5 (Action Plan) */}
          <div className="bg-[#eaddff]/50 rounded-xl p-4 flex flex-col justify-between hover:bg-[#eaddff]/80 transition-all border border-[#eaddff]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-bold text-[#712ae2]">Stage 05</span>
              <span className="material-symbols-outlined text-[18px] text-[#712ae2]">auto_fix_high</span>
            </div>
            <div>
              <div className="text-[13px] text-[#25005a] font-bold mb-1">3-Pillar Sprint</div>
              <p className="text-[12px] text-[#464554] leading-relaxed">Targeted course module + mentor review + arena</p>
            </div>
            <div className="mt-4 pt-2 text-[#712ae2] text-[11px] font-semibold flex items-center gap-1 border-t border-[#eaddff]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#712ae2]"></span> 3 Guided Actions
            </div>
          </div>

          {/* Node 6 (End State) */}
          <div className="bg-[#7ffc97]/30 rounded-xl p-4 flex flex-col justify-between hover:bg-[#7ffc97]/50 transition-all border border-[#7ffc97]/40">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-bold text-[#005f26]">Target</span>
              <span className="material-symbols-outlined text-[18px] text-[#005f26]">verified</span>
            </div>
            <div>
              <div className="font-['Manrope'] text-[1.125rem] text-[#005f26] font-extrabold mb-1">
                92% Ready
              </div>
              <p className="text-[12px] text-[#464554] leading-relaxed">Guaranteed automatic referral push to ABC Tech</p>
            </div>
            <div className="mt-4 pt-2 text-[#005f26] text-[11px] font-bold flex items-center gap-1 border-t border-[#7ffc97]/40">
              <span className="w-1.5 h-1.5 rounded-full bg-[#005f26]"></span> Ready for Interview
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Detailed Missing Skill Cards */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-wider text-[#ba1a1a] font-bold">
                Diagnostic Breakdown
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#dce9ff] text-[#0b1c30] text-[11px] font-semibold">
                Weighted Gap Matrix
              </span>
            </div>
            <h2 className="font-['Manrope'] text-[1.75rem] text-[#0b1c30] font-bold">
              Target Missing Skills
            </h2>
          </div>
          <span className="text-[13px] text-[#777586]">
            Weights calculated from 1,420 ABC Technologies hiring manager rubrics
          </span>
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Skill 1: Node.js & Express */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#c7c4d7]/30 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[11px] font-bold tracking-wide uppercase">
                  High Severity
                </span>
                <span className="text-[12px] text-[#777586] font-semibold">Weight: 35%</span>
              </div>
              <h3 className="font-['Manrope'] text-[1.25rem] text-[#0b1c30] font-bold mb-2">
                Node.js & Express Runtime
              </h3>
              <p className="text-[13px] text-[#464554] mb-4 leading-relaxed">
                Asynchronous event loop, middleware architecture, non-blocking I/O handling, and RESTful routing.
              </p>

              {/* Progress Level */}
              <div className="bg-[#eff4ff] rounded-lg p-3 mb-4 border border-[#c7c4d7]/20">
                <div className="flex justify-between items-center text-[12px] mb-1.5">
                  <span className="text-[#464554]">Profile Proficiency</span>
                  <span className="text-[#0b1c30] font-bold">Beginner → Intermediate Req</span>
                </div>
                <div className="w-full h-2 bg-[#dce9ff] rounded-full overflow-hidden flex">
                  <div className="bg-[#ba1a1a] w-1/5 h-full" title="Current Level"></div>
                  <div className="bg-[#c7c4d7]/50 w-2/5 h-full" title="Required Target"></div>
                </div>
                <div className="flex justify-between text-[10px] text-[#777586] mt-1.5">
                  <span>Current: Novice (18%)</span>
                  <span>Req: Production Grade (65%+)</span>
                </div>
              </div>

              {/* Impact Metric Banner */}
              <div className="flex items-center justify-between py-2 px-3 bg-[#7ffc97]/20 rounded-lg mb-6 border border-[#7ffc97]/30">
                <div className="flex items-center gap-1.5 text-[#005f26]">
                  <span className="material-symbols-outlined text-[18px]">trending_up</span>
                  <span className="text-[12px] font-bold">Projected Readiness Boost</span>
                </div>
                <span className="font-['Manrope'] text-[1.125rem] text-[#005f26] font-extrabold">+8%</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('courses')}
              className="w-full py-2.5 px-4 rounded-lg bg-[#4338ca] hover:bg-[#2a14b4] text-white text-[13px] font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <span>Learn Node.js via Bootcamp</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          {/* Skill 2: MongoDB */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#c7c4d7]/30 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[11px] font-bold tracking-wide uppercase">
                  High Severity
                </span>
                <span className="text-[12px] text-[#777586] font-semibold">Weight: 25%</span>
              </div>
              <h3 className="font-['Manrope'] text-[1.25rem] text-[#0b1c30] font-bold mb-2">
                MongoDB & Document Stores
              </h3>
              <p className="text-[13px] text-[#464554] mb-4 leading-relaxed">
                Mongoose ORM modeling, aggregation pipelines, document indexing, and ACID transaction semantics.
              </p>

              {/* Progress Level */}
              <div className="bg-[#eff4ff] rounded-lg p-3 mb-4 border border-[#c7c4d7]/20">
                <div className="flex justify-between items-center text-[12px] mb-1.5">
                  <span className="text-[#464554]">Profile Proficiency</span>
                  <span className="text-[#0b1c30] font-bold">Beginner → Intermediate Req</span>
                </div>
                <div className="w-full h-2 bg-[#dce9ff] rounded-full overflow-hidden flex">
                  <div className="bg-[#8a4cfc] w-2/5 h-full" title="Current Level"></div>
                  <div className="bg-[#c7c4d7]/50 w-2/5 h-full" title="Required Target"></div>
                </div>
                <div className="flex justify-between text-[10px] text-[#777586] mt-1.5">
                  <span>Current: Queries Only (35%)</span>
                  <span>Req: Schema Design (70%+)</span>
                </div>
              </div>

              {/* Impact Metric Banner */}
              <div className="flex items-center justify-between py-2 px-3 bg-[#7ffc97]/20 rounded-lg mb-6 border border-[#7ffc97]/30">
                <div className="flex items-center gap-1.5 text-[#005f26]">
                  <span className="material-symbols-outlined text-[18px]">trending_up</span>
                  <span className="text-[12px] font-bold">Projected Readiness Boost</span>
                </div>
                <span className="font-['Manrope'] text-[1.125rem] text-[#005f26] font-extrabold">+6%</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('courses')}
              className="w-full py-2.5 px-4 rounded-lg bg-[#dce9ff] hover:bg-[#d3e4fe] text-[#0b1c30] text-[13px] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Build MongoDB Projects</span>
              <span className="material-symbols-outlined text-[18px]">database</span>
            </button>
          </div>

          {/* Skill 3: DSA & System Logic */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#c7c4d7]/30 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#eff4ff] text-[#777586] text-[11px] font-bold tracking-wide uppercase">
                  Medium Severity
                </span>
                <span className="text-[12px] text-[#777586] font-semibold">Weight: 15%</span>
              </div>
              <h3 className="font-['Manrope'] text-[1.25rem] text-[#0b1c30] font-bold mb-2">
                Advanced DSA & System Logic
              </h3>
              <p className="text-[13px] text-[#464554] mb-4 leading-relaxed">
                Dynamic programming paradigms, graph traversals, space complexity limits, and rate-limiting logic.
              </p>

              {/* Progress Level */}
              <div className="bg-[#eff4ff] rounded-lg p-3 mb-4 border border-[#c7c4d7]/20">
                <div className="flex justify-between items-center text-[12px] mb-1.5">
                  <span className="text-[#464554]">Profile Proficiency</span>
                  <span className="text-[#0b1c30] font-bold">Intermediate → Advanced Req</span>
                </div>
                <div className="w-full h-2 bg-[#dce9ff] rounded-full overflow-hidden flex">
                  <div className="bg-[#4338ca] w-3/5 h-full" title="Current Level"></div>
                  <div className="bg-[#c7c4d7]/50 w-1/5 h-full" title="Required Target"></div>
                </div>
                <div className="flex justify-between text-[10px] text-[#777586] mt-1.5">
                  <span>Current: 58 Solved (Medium)</span>
                  <span>Req: Hard Graph/Trees</span>
                </div>
              </div>

              {/* Impact Metric Banner */}
              <div className="flex items-center justify-between py-2 px-3 bg-[#7ffc97]/20 rounded-lg mb-6 border border-[#7ffc97]/30">
                <div className="flex items-center gap-1.5 text-[#005f26]">
                  <span className="material-symbols-outlined text-[18px]">trending_up</span>
                  <span className="text-[12px] font-bold">Projected Readiness Boost</span>
                </div>
                <span className="font-['Manrope'] text-[1.125rem] text-[#005f26] font-extrabold">+4%</span>
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Section 2: 3-Pillar Personalized Action Plan */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#eaddff] text-[#25005a] text-[11px] font-bold uppercase tracking-wide">
                Integrated Solution
              </span>
            </div>
            <h2 className="font-['Manrope'] text-[1.75rem] text-[#0b1c30] font-bold mt-1">
              Your 3-Pillar Personalized Action Plan
            </h2>
          </div>
          <div className="flex items-center gap-2 text-[#777586] text-[12px]">
            <span className="w-2 h-2 rounded-full bg-[#005f26]"></span>
            Curated exclusively for ABC Technologies pipeline
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pillar 1: COURSE */}
          <div className="bg-white rounded-xl shadow-sm border border-[#c7c4d7]/30 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex flex-col">
              <div className="relative h-44 w-full overflow-hidden bg-[#eff4ff]">
                <img
                  src="/src/assets/images/course_nodejs_bootcamp_1790527332497.jpg"
                  alt="Node.js & Express Bootcamp"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#4338ca] text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-[14px]">school</span> Pillar 01: Course
                </div>
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-[#0b1c30] font-['Manrope'] text-[1.125rem] font-bold px-2.5 py-0.5 rounded shadow-sm">
                  ₹799
                </div>
              </div>

              <div className="p-6 flex flex-col">
                <div className="bg-[#eff4ff] p-2 rounded-lg text-[11px] text-[#2a14b4] font-medium mb-3 flex items-start gap-1.5 border border-[#c7c4d7]/20">
                  <span className="material-symbols-outlined text-[16px] shrink-0 text-[#4338ca]">info</span>
                  <span>Directly addresses primary missing skill for ABC Technologies.</span>
                </div>

                <h3 className="font-['Manrope'] text-[1.25rem] text-[#0b1c30] font-bold mb-1">
                  Node.js & Express Backend Bootcamp
                </h3>

                <div className="flex items-center gap-3 flex-wrap text-[#777586] text-[12px] mb-3">
                  <span className="flex items-center gap-1 text-[#0b1c30] font-semibold">
                    <span className="material-symbols-outlined text-[16px] text-amber-500 fill-current-icon">star</span>{' '}
                    4.7 (1.2k)
                  </span>
                  <span>•</span>
                  <span>8 Hours Total</span>
                  <span>•</span>
                  <span>Beginner → Intermediate</span>
                </div>

                <ul className="space-y-1.5 text-[13px] text-[#464554] mb-4">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#005f26]">check_circle</span>
                    <span>Build 3 production-grade REST APIs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#005f26]">check_circle</span>
                    <span>JWT Authentication & Secure Endpoints</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#005f26]">check_circle</span>
                    <span>Live Portfolio Project Deployment</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => onNavigate('courses')}
                className="w-full py-2.5 px-4 rounded-lg bg-[#4338ca] hover:bg-[#2a14b4] text-white text-[13px] font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>View Course Details</span>
                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              </button>
            </div>
          </div>

          {/* Pillar 2: MENTOR */}
          <div className="bg-white rounded-xl shadow-sm border border-[#c7c4d7]/30 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex flex-col">
              <div className="relative h-44 w-full overflow-hidden bg-[#eff4ff]">
                <img
                  src="/src/assets/images/mentor_rahul_portrait_1790527344239.jpg"
                  alt="Mentor Rahul Sharma"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#712ae2] text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-[14px]">person</span> Pillar 02: Mentor
                </div>
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-[#0b1c30] font-['Manrope'] text-[1.125rem] font-bold px-2.5 py-0.5 rounded shadow-sm">
                  ₹499<span className="text-[12px] font-normal text-[#777586]">/session</span>
                </div>
              </div>

              <div className="p-6 flex flex-col">
                <div className="bg-[#eaddff]/40 p-2 rounded-lg text-[11px] text-[#5a00c6] font-medium mb-3 flex items-start gap-1.5 border border-[#eaddff]">
                  <span className="material-symbols-outlined text-[16px] shrink-0 text-[#712ae2]">verified_user</span>
                  <span>1-on-1 resume review & Node.js architecture coaching.</span>
                </div>

                <h3 className="font-['Manrope'] text-[1.25rem] text-[#0b1c30] font-bold mb-0.5">
                  Rahul Sharma
                </h3>
                <p className="text-[12px] text-[#2a14b4] font-semibold mb-2">Senior Backend Engineer @ Razorpay</p>

                <div className="flex items-center gap-3 flex-wrap text-[#777586] text-[12px] mb-3">
                  <span className="flex items-center gap-1 text-[#0b1c30] font-semibold">
                    <span className="material-symbols-outlined text-[16px] text-amber-500 fill-current-icon">star</span>{' '}
                    4.8 (120+ students)
                  </span>
                  <span>•</span>
                  <span>3+ Yrs Exp</span>
                </div>

                <div className="bg-[#eff4ff] p-3 rounded-lg mb-4 flex items-center justify-between border border-[#c7c4d7]/20">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#005f26] animate-pulse"></span>
                    <span className="text-[12px] text-[#0b1c30] font-medium">Next Slot Today</span>
                  </div>
                  <span className="text-[12px] text-[#005f26] font-bold">5:00 PM IST</span>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={onOpenMentorshipModal}
                className="w-full py-2.5 px-4 rounded-lg bg-[#712ae2] hover:bg-[#5a00c6] text-white text-[13px] font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>Book Mentorship Session</span>
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              </button>
            </div>
          </div>

          {/* Pillar 3: PRACTICE CONTEST */}
          <div className="bg-white rounded-xl shadow-sm border border-[#c7c4d7]/30 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex flex-col">
              <div className="relative h-44 w-full overflow-hidden bg-[#eff4ff]">
                <img
                  src="/src/assets/images/arena_coding_terminal_1790527356208.jpg"
                  alt="Arena Coding Terminal"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#005f26] text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  <span className="material-symbols-outlined text-[14px]">military_tech</span> Pillar 03: Arena
                </div>
                <div className="absolute bottom-3 right-3 bg-[#7ffc97] text-[#002109] text-[11px] font-bold px-2.5 py-1 rounded shadow-sm">
                  FREE ENTRY
                </div>
              </div>

              <div className="p-6 flex flex-col">
                <div className="bg-[#eff4ff] p-2 rounded-lg text-[11px] text-[#005f26] font-medium mb-3 flex items-start gap-1.5 border border-[#c7c4d7]/20">
                  <span className="material-symbols-outlined text-[16px] shrink-0 text-[#005f26]">speed</span>
                  <span>Validate Node.js & MongoDB API skills in live simulated contest.</span>
                </div>

                <h3 className="font-['Manrope'] text-[1.25rem] text-[#0b1c30] font-bold mb-1">
                  Backend Coding Challenge #01
                </h3>

                <div className="flex items-center gap-3 flex-wrap text-[#777586] text-[12px] mb-3">
                  <span className="flex items-center gap-1 text-[#0b1c30] font-semibold">
                    <span className="material-symbols-outlined text-[16px]">timer</span> 90 Mins
                  </span>
                  <span>•</span>
                  <span>Medium Tier</span>
                  <span>•</span>
                  <span className="text-[#005f26] font-semibold">248 Enrolled</span>
                </div>

                <div className="bg-[#eff4ff] p-3 rounded-lg mb-4 flex flex-col gap-1 border border-[#c7c4d7]/20">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-[#777586]">Simulated Test Format</span>
                    <span className="text-[11px] text-[#0b1c30] font-bold">Live Auto-grader</span>
                  </div>
                  <p className="text-[12px] text-[#464554]">
                    3 Problem statements: Microservice endpoint, indexing benchmark, data parsing.
                  </p>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Milestone Guaranteed Outcome Banner */}
      <div className="relative overflow-hidden bg-[#2a14b4] text-white rounded-xl p-6 md:p-8 shadow-md border border-[#4338ca]">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#712ae2]/30 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[32px] text-[#7ffc97]">verified</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wider text-[#c3c0ff] font-bold">
                Guaranteed Outcome
              </span>
              <h4 className="font-['Manrope'] text-[1.25rem] text-white font-bold">
                {sprintStarted
                  ? '3-Pillar Sprint Active! You are tracked for 92% readiness'
                  : 'Completing this 3-pillar sprint moves your readiness from 78% to 92%'}
              </h4>
              <p className="text-[13px] text-[#c1beff]">
                Unlocks automated interview scheduling and direct resume placement to the ABC Technologies hiring desk.
              </p>
            </div>
          </div>

          <button
            onClick={handleSprintClick}
            disabled={sprintStarting || sprintStarted}
            className={`whitespace-nowrap px-6 py-3 rounded-lg text-[13px] font-bold shadow-md transition-all shrink-0 cursor-pointer ${
              sprintStarted
                ? 'bg-[#005f26] text-white cursor-default'
                : 'bg-[#7ffc97] hover:bg-[#62df7d] text-[#002109]'
            }`}
          >
            {sprintStarting
              ? 'Activating Sprint...'
              : sprintStarted
              ? '✓ Sprint Active (12 Days Remaining)'
              : 'Start Sprint Now'}
          </button>
        </div>
      </div>
    </div>
  );
};
