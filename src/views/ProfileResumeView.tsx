import React from 'react';
import { CandidateProfile } from '../types.ts';

interface ProfileResumeViewProps {
  candidate: CandidateProfile;
  onNavigate: (path: string) => void;
}

export const ProfileResumeView: React.FC<ProfileResumeViewProps> = ({ candidate, onNavigate }) => {
  return (
    <div className="flex flex-col w-full gap-6">
      {/* Profile Overview Card */}
      <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-[#c7c4d7]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#4338ca] shadow-md">
              <img
                src="/src/assets/images/mentor_rahul_portrait_1790527344239.jpg"
                alt={candidate.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-[#005f26] rounded-full ring-2 ring-white"></span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-['Manrope'] text-[1.75rem] text-[#0b1c30] font-bold">
                {candidate.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#7ffc97]/40 text-[#002109] text-[11px] font-bold">
                Job Ready {candidate.readinessScore}%
              </span>
            </div>
            <span className="text-[13px] text-[#464554]">
              {candidate.degree} • {candidate.cohort}
            </span>
            <div className="flex items-center gap-3 text-[12px] text-[#777586] mt-1">
              <span>CGPA: <strong className="text-[#0b1c30]">{candidate.cgpa} / 10.0</strong></span>
              <span>•</span>
              <span>Target: <strong className="text-[#4338ca]">{candidate.targetRole} @ {candidate.targetCompany}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => onNavigate('skill-gap')}
            className="px-4 py-2 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] rounded-lg text-[13px] font-semibold transition-colors cursor-pointer"
          >
            View Skill Gap
          </button>
          <button
            onClick={() => alert('Resume uploaded! Semantic tokens updated.')}
            className="px-4 py-2 bg-[#4338ca] hover:bg-[#2a14b4] text-white rounded-lg text-[13px] font-bold shadow-sm transition-colors cursor-pointer"
          >
            Update Resume
          </button>
        </div>
      </div>

      {/* ATS Resume Diagnostic Quadrant */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-[#c7c4d7]/30 flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#777586]">
            ATS Parser Score
          </span>
          <div className="my-2">
            <span className="font-['Manrope'] text-[2.5rem] font-extrabold text-[#4338ca] leading-none tabular-nums">
              89
            </span>
            <span className="text-[14px] text-[#777586]"> / 100</span>
          </div>
          <span className="text-[12px] text-[#005f26] font-semibold">
            Passed Tier-1 corporate ATS filter
          </span>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-[#c7c4d7]/30 flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#777586]">
            Verified Skills Index
          </span>
          <div className="my-2">
            <span className="font-['Manrope'] text-[2.5rem] font-extrabold text-[#005f26] leading-none tabular-nums">
              5
            </span>
            <span className="text-[14px] text-[#777586]"> Met Standards</span>
          </div>
          <span className="text-[12px] text-[#464554]">
            C++, SQL, Git, OOP, Data Structures
          </span>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-[#c7c4d7]/30 flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#777586]">
            Target Gap to Close
          </span>
          <div className="my-2">
            <span className="font-['Manrope'] text-[2.5rem] font-extrabold text-[#ba1a1a] leading-none tabular-nums">
              -7%
            </span>
            <span className="text-[14px] text-[#777586]"> to 85% Cutoff</span>
          </div>
          <span className="text-[12px] text-[#ba1a1a] font-semibold">
            Missing: Node.js, Express & MongoDB
          </span>
        </div>
      </div>

      {/* Verified Skills Breakdown */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#c7c4d7]/30">
        <h2 className="font-['Manrope'] text-[1.25rem] text-[#0b1c30] font-bold mb-4">
          Verified Academic & Repository Skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {candidate.verifiedSkills.map((s, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-[#eff4ff] rounded-lg border border-[#c7c4d7]/20 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#005f26] text-[20px]">
                  verified
                </span>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-[#0b1c30]">{s.name}</span>
                  <span className="text-[11px] text-[#777586]">{s.description}</span>
                </div>
              </div>
              <span className="font-mono text-[12px] font-bold text-[#4338ca] bg-[#dce9ff] px-2 py-0.5 rounded">
                {s.score}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
