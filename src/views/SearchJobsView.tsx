import React, { useState } from 'react';
import { JobListing } from '../types.ts';

interface SearchJobsViewProps {
  jobs: JobListing[];
  onNavigate: (path: string) => void;
}

export const SearchJobsView: React.FC<SearchJobsViewProps> = ({ jobs, onNavigate }) => {
  const [filterText, setFilterText] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [appliedJobs, setAppliedJobs] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredJobs = jobs.filter((j) => {
    const matchesText =
      j.title.toLowerCase().includes(filterText.toLowerCase()) ||
      j.company.toLowerCase().includes(filterText.toLowerCase()) ||
      j.location.toLowerCase().includes(filterText.toLowerCase());

    if (selectedTag === 'eligible') return matchesText && j.matchPercent >= 75;
    if (selectedTag === 'backend') return matchesText && (j.title.toLowerCase().includes('backend') || j.title.toLowerCase().includes('developer'));
    return matchesText;
  });

  const handleApply = (id: string, company: string, title: string) => {
    setAppliedJobs((prev) => ({ ...prev, [id]: true }));
    setToastMessage(`Application submitted for ${title} at ${company}! Expedited placement review active.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-[#005f26] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-[13px] animate-in slide-in-from-top-3 duration-200">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-80">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-xl border border-[#c7c4d7]/30 shadow-sm">
        <div className="flex flex-col">
          <h1 className="font-['Manrope'] text-[1.5rem] sm:text-[1.75rem] text-[#0b1c30] font-bold">
            Search Jobs & Campus Openings
          </h1>
          <p className="text-[13px] text-[#777586]">
            Find engineering roles tailored to your B.Tech CSE coursework and evaluated match percentage
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#777586] text-[18px]">
              search
            </span>
            <input
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Search by title, company or city..."
              className="w-full pl-9 pr-3 py-2 bg-[#eff4ff] rounded-lg text-[13px] border border-transparent focus:border-[#4338ca] focus:bg-white focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setSelectedTag('all')}
          className={`px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all cursor-pointer ${
            selectedTag === 'all'
              ? 'bg-[#4338ca] text-white shadow-xs'
              : 'bg-white text-[#464554] border border-[#c7c4d7]/40 hover:bg-[#eff4ff]'
          }`}
        >
          All Openings ({jobs.length})
        </button>
        <button
          onClick={() => setSelectedTag('eligible')}
          className={`px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all cursor-pointer ${
            selectedTag === 'eligible'
              ? 'bg-[#4338ca] text-white shadow-xs'
              : 'bg-white text-[#464554] border border-[#c7c4d7]/40 hover:bg-[#eff4ff]'
          }`}
        >
          Directly Eligible (≥75% Match)
        </button>
        <button
          onClick={() => setSelectedTag('backend')}
          className={`px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all cursor-pointer ${
            selectedTag === 'backend'
              ? 'bg-[#4338ca] text-white shadow-xs'
              : 'bg-white text-[#464554] border border-[#c7c4d7]/40 hover:bg-[#eff4ff]'
          }`}
        >
          Backend & Core Tracks
        </button>
      </div>

      {/* Jobs Grid / List */}
      <div className="flex flex-col gap-4">
        {filteredJobs.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl border border-[#c7c4d7]/30">
            <span className="material-symbols-outlined text-[48px] text-[#777586]">search_off</span>
            <p className="text-[#0b1c30] font-bold text-[16px] mt-2">No jobs match your filter</p>
            <p className="text-[#777586] text-[13px]">Try clearing search keywords or switching filters.</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="p-4 sm:p-5 rounded-xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 border border-[#c7c4d7]/30"
            >
              <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-[#eff4ff] shrink-0 flex items-center justify-center font-bold text-[#4338ca] text-[15px] border border-[#c7c4d7]/20">
                  {job.companyLogo}
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-['Manrope'] text-[1rem] sm:text-[1.125rem] font-bold text-[#0b1c30]">
                      {job.title}
                    </h2>
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

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-[#777586] text-[12px] sm:text-[13px] mt-1">
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

                  <p className="text-[12px] sm:text-[13px] text-[#464554] mt-2 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {job.evaluatedSkills.map((sk, idx) => (
                      <span
                        key={idx}
                        className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded ${
                          sk.status === 'met'
                            ? 'bg-[#eff4ff] text-[#005f26] font-medium'
                            : 'bg-[#ffdad6]/60 text-[#ba1a1a] font-medium'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[12px]">
                          {sk.status === 'met' ? 'check' : 'close'}
                        </span>
                        {sk.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Column */}
              <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#c7c4d7]/20">
                <div className="flex items-center gap-2">
                  <div className="text-left lg:text-right">
                    <div className="text-[11px] text-[#777586]">ATS Match</div>
                    <div className="text-[16px] sm:text-[18px] font-black text-[#4338ca]">
                      {job.matchPercent}%
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('skill-gap')}
                    className="px-3 py-1.5 rounded-lg text-[12px] font-semibold text-[#4338ca] bg-[#eff4ff] hover:bg-[#e0e7ff] transition-colors cursor-pointer"
                  >
                    View Gap
                  </button>
                  <button
                    onClick={() => handleApply(job.id, job.company, job.title)}
                    disabled={appliedJobs[job.id]}
                    className={`px-4 py-1.5 rounded-lg text-[12px] font-semibold transition-all cursor-pointer ${
                      appliedJobs[job.id]
                        ? 'bg-[#005f26] text-white'
                        : 'bg-[#4338ca] hover:bg-[#2a14b4] text-white'
                    }`}
                  >
                    {appliedJobs[job.id] ? 'Applied ✓' : 'Fast-Track Apply'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
