import React from 'react';
import { CandidateProfile } from '../types.ts';

interface LeaderboardViewProps {
  candidate: CandidateProfile;
  onNavigate: (path: string) => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ candidate, onNavigate }) => {
  const standings = [
    { rank: 1, name: 'alex_dev', college: 'MIT', points: 300, time: '18m', lang: 'Node.js', solved: '3/3' },
    { rank: 2, name: 'dev_priya', college: 'IIT Bombay', points: 300, time: '22m', lang: 'Node.js', solved: '3/3' },
    { rank: 3, name: 'chen_core', college: 'Stanford', points: 280, time: '25m', lang: 'TypeScript', solved: '3/3' },
    { rank: 4, name: 'nikita_ops', college: 'BITS Pilani', points: 270, time: '28m', lang: 'Go', solved: '3/3' },
    { rank: 5, name: 'sam_arch', college: 'UC Berkeley', points: 260, time: '30m', lang: 'Node.js', solved: '3/3' },
    { rank: 6, name: 'aarav_kumar', college: 'IIT Delhi', points: 240, time: '32m', lang: 'Java', solved: '2/3' },
    { rank: 14, name: `${candidate.name} (You)`, college: 'Candidate Cohort 2025', points: 150, time: '35m', lang: 'Node.js', solved: '1/3', isCurrent: true },
  ];

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#c7c4d7]/30 shadow-sm">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#4338ca] text-white text-[11px] font-bold uppercase tracking-wider">
              Practice Arena
            </span>
          </div>
          <h1 className="font-['Manrope'] text-[1.75rem] text-[#0b1c30] font-bold mt-1">
            Contest Arena Global Standings
          </h1>
          <p className="text-[13px] text-[#777586]">
            Live leaderboard across 428 engineering participants competing in Backend Challenge #01.
          </p>
        </div>

        <button
          onClick={() => onNavigate('coding-contests')}
          className="px-5 py-2.5 bg-[#4338ca] hover:bg-[#2a14b4] text-white text-[13px] font-bold rounded-lg shadow-sm transition-all cursor-pointer"
        >
          Enter Live Arena
        </button>
      </div>

      {/* Standings Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#c7c4d7]/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#eff4ff] text-[#777586] text-[11px] uppercase tracking-wider font-semibold border-b border-[#c7c4d7]/30">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Institution / Program</th>
                <th className="py-3 px-4">Language</th>
                <th className="py-3 px-4">Problems</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4 text-right">Time Taken</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c7c4d7]/20">
              {standings.map((s) => (
                <tr
                  key={s.rank}
                  className={`hover:bg-[#eff4ff]/60 transition-colors ${
                    s.isCurrent ? 'bg-[#e3dfff]/60 font-semibold' : ''
                  }`}
                >
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold ${
                        s.rank === 1
                          ? 'bg-amber-400 text-slate-900'
                          : s.rank === 2
                          ? 'bg-slate-300 text-slate-900'
                          : s.rank === 3
                          ? 'bg-amber-700 text-white'
                          : s.isCurrent
                          ? 'bg-[#4338ca] text-white'
                          : 'bg-[#eff4ff] text-[#464554]'
                      }`}
                    >
                      {s.rank}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#0b1c30] font-bold">
                    {s.name}
                  </td>
                  <td className="py-3.5 px-4 text-[#464554]">{s.college}</td>
                  <td className="py-3.5 px-4 text-[#4338ca] font-mono text-[12px]">{s.lang}</td>
                  <td className="py-3.5 px-4 text-[#005f26] font-semibold">{s.solved}</td>
                  <td className="py-3.5 px-4 font-['Manrope'] font-bold text-[#0b1c30] tabular-nums">
                    {s.points} pts
                  </td>
                  <td className="py-3.5 px-4 text-right text-[#777586] font-mono text-[12px]">
                    {s.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
