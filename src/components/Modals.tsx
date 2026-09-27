import React, { useState } from 'react';
import { CandidateProfile } from '../types.ts';

interface ActionPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: CandidateProfile;
  onStartStep: (stepNumber: number) => void;
}

export const ActionPlanModal: React.FC<ActionPlanModalProps> = ({
  isOpen,
  onClose,
  candidate,
  onStartStep,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#213145]/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full p-6 relative flex flex-col gap-4 border border-[#c7c4d7]/40">
        <div className="flex items-center justify-between pb-2 border-b border-[#c7c4d7]/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#4338ca] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">checklist</span>
            </div>
            <h3 className="font-['Manrope'] text-[1.125rem] text-[#0b1c30] font-bold">
              Personalized 3-Step Action Plan
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#777586] hover:text-[#0b1c30] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <p className="text-[13px] text-[#464554]">
          Complete these tailored milestones to raise your fit score from{' '}
          <strong className="text-[#712ae2]">{candidate.readinessScore}%</strong> to{' '}
          <strong className="text-[#005f26] font-bold">92%</strong> within 3 weeks.
        </p>

        <div className="flex flex-col gap-3">
          <div className="p-3 bg-[#eff4ff] rounded-lg flex items-start gap-3 border border-[#c7c4d7]/20">
            <div className="w-6 h-6 rounded-full bg-[#4338ca] text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
              1
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] text-[#0b1c30] font-bold">
                Build REST API with Express & Node
              </span>
              <span className="text-[12px] text-[#464554]">
                Complete hands-on sprint: auth tokens, CRUD endpoints, and test suite. (+8% Match)
              </span>
            </div>
          </div>

          <div className="p-3 bg-[#eff4ff] rounded-lg flex items-start gap-3 border border-[#c7c4d7]/20">
            <div className="w-6 h-6 rounded-full bg-[#4338ca] text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
              2
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] text-[#0b1c30] font-bold">
                NoSQL Data Modeling in MongoDB
              </span>
              <span className="text-[12px] text-[#464554]">
                Connect database schema with Mongoose, build indexing and aggregation queries. (+4% Match)
              </span>
            </div>
          </div>

          <div className="p-3 bg-[#eff4ff] rounded-lg flex items-start gap-3 border border-[#c7c4d7]/20">
            <div className="w-6 h-6 rounded-full bg-[#4338ca] text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
              3
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] text-[#0b1c30] font-bold">
                Take ABC Tech Simulated Assessment
              </span>
              <span className="text-[12px] text-[#464554]">
                Verify backend mastery through our calibrated 45-minute simulator test. (+2% Match)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#eff4ff] text-[13px] font-semibold text-[#0b1c30] hover:bg-[#dce9ff] transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onStartStep(1);
              onClose();
            }}
            className="px-5 py-2 rounded-lg bg-[#4338ca] text-[13px] font-bold text-white hover:bg-[#2a14b4] shadow-sm transition-colors cursor-pointer"
          >
            Start Step 1 Now
          </button>
        </div>
      </div>
    </div>
  );
};

interface MentorshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (slot: string) => void;
}

export const MentorshipModal: React.FC<MentorshipModalProps> = ({
  isOpen,
  onClose,
  onConfirmBooking,
}) => {
  const [selectedSlot, setSelectedSlot] = useState('Today 5:00 PM IST');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (!isOpen) return null;

  const slots = [
    'Today 5:00 PM IST',
    'Tomorrow 11:00 AM IST',
    'Tomorrow 4:30 PM IST',
    'Saturday 2:00 PM IST',
  ];

  const handleBooking = () => {
    onConfirmBooking(selectedSlot);
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#213145]/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative flex flex-col gap-4 border border-[#c7c4d7]/40">
        <div className="flex items-center justify-between pb-2 border-b border-[#c7c4d7]/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#712ae2] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">calendar_month</span>
            </div>
            <h3 className="font-['Manrope'] text-[1.125rem] text-[#0b1c30] font-bold">
              Book Mentorship Session
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#777586] hover:text-[#0b1c30] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <div className="flex items-center gap-3 p-3 bg-[#eff4ff] rounded-lg border border-[#c7c4d7]/20">
          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-[#712ae2]">
            <img
              src="/src/assets/images/mentor_rahul_portrait_1790527344239.jpg"
              alt="Mentor"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] text-[#0b1c30] font-bold">Rahul Sharma</span>
            <span className="text-[12px] text-[#712ae2] font-semibold">
              Senior Backend Engineer @ Razorpay
            </span>
            <span className="text-[11px] text-[#777586]">₹499 for 45 min architecture review</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[12px] font-bold text-[#0b1c30]">Select Available Time Slot:</span>
          <div className="grid grid-cols-1 gap-2">
            {slots.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSlot(s)}
                className={`p-2.5 rounded-lg text-[13px] font-medium text-left transition-all border cursor-pointer flex items-center justify-between ${
                  selectedSlot === s
                    ? 'bg-[#eaddff] border-[#712ae2] text-[#25005a] font-bold'
                    : 'bg-[#eff4ff] border-transparent text-[#464554] hover:bg-[#dce9ff]'
                }`}
              >
                <span>{s}</span>
                {selectedSlot === s && (
                  <span className="material-symbols-outlined text-[#712ae2] text-[18px]">
                    check_circle
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#eff4ff] text-[13px] font-semibold text-[#0b1c30] hover:bg-[#dce9ff] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleBooking}
            className="px-5 py-2 rounded-lg bg-[#712ae2] text-[13px] font-bold text-white hover:bg-[#5a00c6] shadow-sm transition-colors cursor-pointer"
          >
            {bookingConfirmed ? '✓ Session Confirmed' : 'Confirm & Reserve Slot'}
          </button>
        </div>
      </div>
    </div>
  );
};

interface EligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: CandidateProfile;
  onViewDiagnostic: () => void;
}

export const EligibilityModal: React.FC<EligibilityModalProps> = ({
  isOpen,
  onClose,
  candidate,
  onViewDiagnostic,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#213145]/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative flex flex-col gap-4 border border-[#c7c4d7]/40">
        <div className="flex items-center justify-between pb-2 border-b border-[#c7c4d7]/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#4338ca] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">fact_check</span>
            </div>
            <h3 className="font-['Manrope'] text-[1.125rem] text-[#0b1c30] font-bold">
              Eligibility Verification Engine
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#777586] hover:text-[#0b1c30] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <div className="p-4 bg-[#eff4ff] rounded-xl flex items-center justify-between border border-[#c7c4d7]/20">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase font-bold text-[#777586]">Current Index</span>
            <span className="font-['Manrope'] text-[1.75rem] font-extrabold text-[#4338ca] tabular-nums">
              {candidate.readinessScore}% Match
            </span>
            <span className="text-[12px] text-[#464554]">
              ABC Tech Shortlist Cutoff: <strong>85%</strong>
            </span>
          </div>
          <span className="px-3 py-1 bg-[#ffdad6] text-[#ba1a1a] text-[12px] font-bold rounded-full uppercase tracking-wider">
            Partially Eligible
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[12px] font-bold text-[#0b1c30]">ATS Criteria Status:</span>
          {candidate.gatekeeperCriteria.map((c) => (
            <div key={c.id} className="flex items-center justify-between p-2 rounded-lg bg-[#eff4ff]/60 text-[12px]">
              <span className="text-[#0b1c30] font-medium">{c.label}</span>
              <span className={`font-bold ${c.met ? 'text-[#005f26]' : 'text-[#ba1a1a]'}`}>
                {c.detail}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#eff4ff] text-[13px] font-semibold text-[#0b1c30] hover:bg-[#dce9ff] transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onViewDiagnostic();
            }}
            className="px-5 py-2 rounded-lg bg-[#4338ca] text-[13px] font-bold text-white hover:bg-[#2a14b4] shadow-sm transition-colors cursor-pointer"
          >
            Open Full Diagnostic
          </button>
        </div>
      </div>
    </div>
  );
};
