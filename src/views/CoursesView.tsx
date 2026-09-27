import React, { useState } from 'react';

interface CoursesViewProps {
  onNavigate: (path: string) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({ onNavigate }) => {
  const [completedLessons, setCompletedLessons] = useState<Record<number, boolean>>({
    1: true,
    2: true,
  });

  const modules = [
    {
      id: 1,
      title: 'Module 1: Asynchronous Event Loop & Non-Blocking I/O',
      duration: '45 mins',
      topics: ['Call Stack & Event Loop Phases', 'libuv Thread Pool', 'Microtasks vs Macrotasks'],
    },
    {
      id: 2,
      title: 'Module 2: Express.js Middleware Architecture',
      duration: '60 mins',
      topics: ['Custom Router Pipelines', 'Error Handling Next(err)', 'Body Parsers & Stream Buffers'],
    },
    {
      id: 3,
      title: 'Module 3: In-Memory Token Bucket Rate Limiting',
      duration: '90 mins',
      topics: ['Token Refill Mathematics', 'RFC-6585 Headers (429)', 'Concurrent Request Throttling'],
    },
    {
      id: 4,
      title: 'Module 4: JWT Authentication & Role-Based Access Control',
      duration: '75 mins',
      topics: ['Token Signing & Verification', 'Refresh Token Rotation', 'Header Bearer Extraction'],
    },
    {
      id: 5,
      title: 'Module 5: MongoDB Schema Design & Mongoose Aggregation',
      duration: '80 mins',
      topics: ['Index Optimization (B-Tree)', '$lookup & $facet Pipelines', 'ACID Transactions in Replica Sets'],
    },
    {
      id: 6,
      title: 'Module 6: Production Microservice Deployment & Docker',
      duration: '60 mins',
      topics: ['Containerization', 'Health Checks & Graceful Shutdown', 'Cloud Run / Port 3000 Tuning'],
    },
  ];

  const toggleLesson = (id: number) => {
    setCompletedLessons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(completedLessons).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / modules.length) * 100);

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Course Hero Banner */}
      <div className="relative overflow-hidden rounded-xl bg-white shadow-sm border border-[#c7c4d7]/30 p-6 md:p-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#4338ca] text-white text-[11px] font-bold uppercase tracking-wider">
                Pillar 01: Course
              </span>
              <span className="text-[12px] text-[#777586]">JobFit Labs Engineering Academy</span>
            </div>
            <h1 className="font-['Manrope'] text-[2.25rem] text-[#0b1c30] font-extrabold tracking-tight">
              Node.js & Express Backend Bootcamp
            </h1>
            <p className="text-[14px] text-[#464554] leading-relaxed">
              Master the exact architectural skills required by ABC Technologies and top tech employers: asynchronous I/O, middleware pipelines, rate limiting algorithms, and production database integration.
            </p>

            <div className="flex items-center gap-4 text-[12px] text-[#777586] pt-1">
              <span className="flex items-center gap-1 text-[#0b1c30] font-bold">
                <span className="material-symbols-outlined text-[16px] text-amber-500 fill-current-icon">star</span>{' '}
                4.7 (1,248 reviews)
              </span>
              <span>•</span>
              <span>8 Hours Total</span>
              <span>•</span>
              <span className="text-[#005f26] font-bold">+8% Readiness Boost</span>
            </div>
          </div>

          <div className="w-full lg:w-72 bg-[#eff4ff] p-5 rounded-xl border border-[#c7c4d7]/30 flex flex-col gap-3 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-[#0b1c30]">Bootcamp Progress</span>
              <span className="text-[12px] font-extrabold text-[#4338ca] tabular-nums">
                {progressPercent}%
              </span>
            </div>
            <div className="w-full bg-[#dce9ff] h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-[#4338ca] h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <span className="text-[11px] text-[#777586]">
              {completedCount} of {modules.length} modules completed
            </span>

          </div>
        </div>
      </div>

      {/* Modules List */}
      <div className="flex flex-col gap-3">
        <h2 className="font-['Manrope'] text-[1.25rem] text-[#0b1c30] font-bold">
          Curriculum & Hands-on Labs
        </h2>

        {modules.map((m) => {
          const isDone = !!completedLessons[m.id];
          return (
            <div
              key={m.id}
              className="p-5 rounded-xl bg-white shadow-sm border border-[#c7c4d7]/30 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleLesson(m.id)}
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors cursor-pointer ${
                    isDone ? 'bg-[#005f26] text-white' : 'border-2 border-[#777586] text-transparent hover:border-[#4338ca]'
                  }`}
                  title="Toggle Completion"
                >
                  <span className="material-symbols-outlined text-[16px]">check</span>
                </button>
                <div className="flex flex-col">
                  <h3 className="font-['Manrope'] text-[15px] font-bold text-[#0b1c30]">
                    {m.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-[12px] text-[#777586]">
                    <span className="font-medium text-[#464554]">{m.duration}</span>
                    <span>•</span>
                    {m.topics.map((t, idx) => (
                      <span key={idx} className="bg-[#eff4ff] text-[#2a14b4] px-2 py-0.5 rounded text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end md:self-auto">
                <button
                  onClick={() => toggleLesson(m.id)}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors cursor-pointer ${
                    isDone
                      ? 'bg-[#eff4ff] text-[#005f26]'
                      : 'bg-[#4338ca] text-white hover:bg-[#2a14b4]'
                  }`}
                >
                  {isDone ? 'Completed ✓' : 'Mark as Done'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
