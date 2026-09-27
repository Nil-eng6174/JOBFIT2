import React, { useState } from 'react';

interface MentorshipViewProps {
  onOpenBooking: () => void;
}

export const MentorshipView: React.FC<MentorshipViewProps> = ({ onOpenBooking }) => {
  const [selectedTopic, setSelectedTopic] = useState('All');

  const mentors = [
    {
      id: 1,
      name: 'Rahul Sharma',
      role: 'Senior Backend Engineer',
      company: 'Razorpay',
      specialty: 'Distributed Systems & Concurrency Pipelines',
      rating: 4.8,
      reviews: 94,
      students: '120+',
      experience: '3+ Yrs Exp',
      price: '₹499',
      slot: 'Today 5:00 PM IST',
      avatar: '/src/assets/images/mentor_rahul_portrait_1790527344239.jpg',
      tags: ['Node.js', 'Express', 'System Design', 'Redis'],
    },
    {
      id: 2,
      name: 'Priya Iyer',
      role: 'Staff Platform Engineer',
      company: 'Swiggy',
      specialty: 'High-Throughput Microservices & Kafka',
      rating: 4.9,
      reviews: 142,
      students: '200+',
      experience: '6+ Yrs Exp',
      price: '₹699',
      slot: 'Tomorrow 3:00 PM IST',
      avatar: '/src/assets/images/mentor_rahul_portrait_1790527344239.jpg',
      tags: ['Microservices', 'MongoDB', 'AWS', 'Scalability'],
    },
    {
      id: 3,
      name: 'Aditya Kulkarni',
      role: 'Lead Architect',
      company: 'ABC Technologies',
      specialty: 'Campus Hiring Rubrics & Interview Evaluations',
      rating: 4.9,
      reviews: 180,
      students: '310+',
      experience: '8+ Yrs Exp',
      price: '₹799',
      slot: 'Friday 6:00 PM IST',
      avatar: '/src/assets/images/mentor_rahul_portrait_1790527344239.jpg',
      tags: ['ABC Tech Rubric', 'Node.js', 'DSA', 'ATS Review'],
    },
  ];

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#c7c4d7]/30 shadow-sm">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#712ae2] text-white text-[11px] font-bold uppercase tracking-wider">
              Pillar 02: Mentor
            </span>
          </div>
          <h1 className="font-['Manrope'] text-[1.75rem] text-[#0b1c30] font-bold mt-1">
            1-on-1 Engineering Mentorship
          </h1>
          <p className="text-[13px] text-[#777586]">
            Get live code reviews, architecture guidance, and mock technical screens with engineers from top tech companies.
          </p>
        </div>

        <button
          onClick={onOpenBooking}
          className="px-5 py-2.5 bg-[#712ae2] hover:bg-[#5a00c6] text-white text-[13px] font-bold rounded-lg shadow-sm transition-all self-start md:self-auto cursor-pointer"
        >
          Book Instant Review (₹499)
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2">
        {['All', 'ABC Tech Focused', 'Node.js & Express', 'System Design', 'Resume Calibration'].map((topic) => (
          <button
            key={topic}
            onClick={() => setSelectedTopic(topic)}
            className={`px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all cursor-pointer ${
              selectedTopic === topic
                ? 'bg-[#712ae2] text-white'
                : 'bg-white text-[#464554] border border-[#c7c4d7]/30 hover:bg-[#eff4ff]'
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Mentors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mentors.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-xl shadow-sm border border-[#c7c4d7]/30 p-6 flex flex-col justify-between hover:shadow-md transition-all"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#712ae2]/30">
                  <img src={m.avatar} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col min-w-0">
                  <h3 className="font-['Manrope'] text-[1.125rem] font-bold text-[#0b1c30] truncate">
                    {m.name}
                  </h3>
                  <span className="text-[12px] text-[#4338ca] font-semibold truncate">
                    {m.role} @ {m.company}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] text-[#777586] mt-0.5">
                    <span className="flex items-center gap-0.5 text-[#0b1c30] font-bold">
                      <span className="material-symbols-outlined text-[14px] text-amber-500 fill-current-icon">star</span>{' '}
                      {m.rating}
                    </span>
                    <span>•</span>
                    <span>{m.experience}</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#eff4ff] p-3 rounded-lg text-[12px] text-[#464554] border border-[#c7c4d7]/20">
                <span className="font-semibold text-[#0b1c30]">Focus:</span> {m.specialty}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {m.tags.map((t, idx) => (
                  <span key={idx} className="bg-[#eaddff]/50 text-[#25005a] px-2 py-0.5 rounded text-[11px] font-semibold">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#c7c4d7]/20 text-[12px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#005f26] animate-pulse"></span>
                  <span className="text-[#005f26] font-semibold">{m.slot}</span>
                </div>
                <span className="font-['Manrope'] text-[16px] font-bold text-[#0b1c30]">{m.price}<span className="text-[11px] text-[#777586] font-normal">/session</span></span>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="mt-4 w-full py-2.5 bg-[#712ae2] hover:bg-[#5a00c6] text-white text-[13px] font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Book 1-on-1 Session
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
