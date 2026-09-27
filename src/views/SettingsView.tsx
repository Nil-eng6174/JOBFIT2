import React, { useState } from 'react';
import { CandidateProfile } from '../types.ts';

interface SettingsViewProps {
  candidate: CandidateProfile;
  onUpdateCandidate?: (updated: Partial<CandidateProfile>) => void;
  onNavigate: (path: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  candidate,
  onUpdateCandidate,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'targets' | 'notifications' | 'privacy'>('profile');
  const [name, setName] = useState(candidate.name);
  const [email, setEmail] = useState(candidate.email);
  const [degree, setDegree] = useState(candidate.degree);
  const [cgpa, setCgpa] = useState(String(candidate.cgpa));
  const [cohort, setCohort] = useState(candidate.cohort);
  const [targetRole, setTargetRole] = useState(candidate.targetRole);
  const [targetCompany, setTargetCompany] = useState(candidate.targetCompany);
  const [locationPref, setLocationPref] = useState(candidate.location);
  const [minSalary, setMinSalary] = useState('₹6.0 – 10.0 LPA');
  
  // Notification states
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [shortlistNotifs, setShortlistNotifs] = useState(true);
  const [mentorReminders, setMentorReminders] = useState(true);
  const [atsGapAlerts, setAtsGapAlerts] = useState(true);

  // Success indicator
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCandidate?.({
      name,
      email,
      degree,
      cgpa: parseFloat(cgpa) || 8.4,
      cohort,
      targetRole,
      targetCompany,
      location: locationPref,
      salaryRange: minSalary,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Settings Header */}
      <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-[#c7c4d7]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#4338ca]/10 text-[#4338ca] text-[11px] font-bold uppercase tracking-wider">
              Account Preferences
            </span>
          </div>
          <h1 className="font-['Manrope'] text-[1.75rem] text-[#0b1c30] font-bold mt-1">
            Settings & Career Preferences
          </h1>
          <p className="text-[13px] text-[#777586]">
            Configure your ATS target roles, academic records, recruiter visibility, and notification preferences.
          </p>
        </div>

        <button
          onClick={() => onNavigate('dashboard')}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-[13px] font-semibold rounded-lg transition-colors self-start md:self-auto cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#c7c4d7]/30 pb-2 overflow-x-auto">
        {[
          { id: 'profile', label: 'Profile & Academics', icon: 'person' },
          { id: 'targets', label: 'Target Roles & ATS', icon: 'target' },
          { id: 'notifications', label: 'Notifications', icon: 'notifications' },
          { id: 'privacy', label: 'Security & Privacy', icon: 'security' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#4338ca] text-white shadow-sm'
                : 'bg-white text-[#464554] hover:bg-[#eff4ff] hover:text-[#0b1c30] border border-[#c7c4d7]/30'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {savedSuccess && (
        <div className="p-4 bg-[#7ffc97]/30 border border-[#005f26]/30 text-[#002109] rounded-xl flex items-center justify-between text-[13px] font-semibold animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#005f26] text-[20px]">check_circle</span>
            <span>Your preferences have been saved successfully to the JobFit database.</span>
          </div>
          <span className="text-[11px] text-[#005f26] uppercase font-bold">Synchronized</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="bg-white rounded-xl shadow-sm border border-[#c7c4d7]/30 p-6 md:p-8 flex flex-col gap-6">
        {/* Tab 1: Profile & Academics */}
        {activeTab === 'profile' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#c7c4d7]/20">
              <div>
                <h3 className="font-['Manrope'] text-[1.125rem] text-[#0b1c30] font-bold">
                  Personal & Academic Records
                </h3>
                <p className="text-[12px] text-[#777586]">
                  Calibrate the baseline ATS parameters checked by recruiters during resume screening.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-[#0b1c30]">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-3.5 py-2.5 bg-[#eff4ff] border border-transparent focus:border-[#4338ca] focus:bg-white rounded-lg text-[13px] text-[#0b1c30] outline-none transition-all"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-[#0b1c30]">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3.5 py-2.5 bg-[#eff4ff] border border-transparent focus:border-[#4338ca] focus:bg-white rounded-lg text-[13px] text-[#0b1c30] outline-none transition-all"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-[#0b1c30]">Degree Program</label>
                <input
                  type="text"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="px-3.5 py-2.5 bg-[#eff4ff] border border-transparent focus:border-[#4338ca] focus:bg-white rounded-lg text-[13px] text-[#0b1c30] outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-[#0b1c30]">Cumulative CGPA</label>
                <input
                  type="text"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  placeholder="e.g. 8.4"
                  className="px-3.5 py-2.5 bg-[#eff4ff] border border-transparent focus:border-[#4338ca] focus:bg-white rounded-lg text-[13px] text-[#0b1c30] outline-none transition-all"
                />
                <span className="text-[11px] text-[#777586]">ABC Tech Minimum Cutoff: &gt; 7.0 CGPA</span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-[#0b1c30]">Graduating Cohort</label>
                <input
                  type="text"
                  value={cohort}
                  onChange={(e) => setCohort(e.target.value)}
                  className="px-3.5 py-2.5 bg-[#eff4ff] border border-transparent focus:border-[#4338ca] focus:bg-white rounded-lg text-[13px] text-[#0b1c30] outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-[#0b1c30]">Preferred Work Location</label>
                <input
                  type="text"
                  value={locationPref}
                  onChange={(e) => setLocationPref(e.target.value)}
                  className="px-3.5 py-2.5 bg-[#eff4ff] border border-transparent focus:border-[#4338ca] focus:bg-white rounded-lg text-[13px] text-[#0b1c30] outline-none transition-all"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Target Roles & ATS */}
        {activeTab === 'targets' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#c7c4d7]/20">
              <div>
                <h3 className="font-['Manrope'] text-[1.125rem] text-[#0b1c30] font-bold">
                  Target Role Calibration & ATS Preferences
                </h3>
                <p className="text-[12px] text-[#777586]">
                  These parameters guide the JobFit AI engine to compute skill gaps and recommend specific boost modules.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-[#0b1c30]">Primary Target Role</label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="px-3.5 py-2.5 bg-[#eff4ff] border border-transparent focus:border-[#4338ca] focus:bg-white rounded-lg text-[13px] text-[#0b1c30] outline-none transition-all cursor-pointer"
                >
                  <option>Software Developer</option>
                  <option>Junior Full Stack Engineer</option>
                  <option>Backend Trainee / Engineer</option>
                  <option>Cloud & DevOps Associate</option>
                  <option>Systems & Concurrency Engineer</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-[#0b1c30]">Primary Dream Employer</label>
                <input
                  type="text"
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  className="px-3.5 py-2.5 bg-[#eff4ff] border border-transparent focus:border-[#4338ca] focus:bg-white rounded-lg text-[13px] text-[#0b1c30] outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-[#0b1c30]">Salary Expectation</label>
                <input
                  type="text"
                  value={minSalary}
                  onChange={(e) => setMinSalary(e.target.value)}
                  className="px-3.5 py-2.5 bg-[#eff4ff] border border-transparent focus:border-[#4338ca] focus:bg-white rounded-lg text-[13px] text-[#0b1c30] outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-[#0b1c30]">ATS Shortlist Cutoff Benchmark</label>
                <div className="p-2.5 bg-[#eff4ff] rounded-lg text-[13px] text-[#0b1c30] font-semibold flex items-center justify-between border border-[#c7c4d7]/20">
                  <span>85% Readiness Required for Direct Shortlist</span>
                  <span className="text-[#005f26] font-bold">Standard Tier-1</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Notifications */}
        {activeTab === 'notifications' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#c7c4d7]/20">
              <div>
                <h3 className="font-['Manrope'] text-[1.125rem] text-[#0b1c30] font-bold">
                  Notification & Communication Alerts
                </h3>
                <p className="text-[12px] text-[#777586]">
                  Control alerts regarding recruiter shortlisting, mentor slot openings, and diagnostic score changes.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {[
                {
                  id: 'shortlist',
                  title: 'Recruiter Shortlist Invites',
                  desc: 'Receive immediate email and push alerts when an employer ATS flags your profile as eligible.',
                  checked: shortlistNotifs,
                  setter: setShortlistNotifs,
                },
                {
                  id: 'gaps',
                  title: 'Skill Gap & Readiness Updates',
                  desc: 'Notify when completed bootcamp modules increase your match score toward the 92% benchmark.',
                  checked: atsGapAlerts,
                  setter: setAtsGapAlerts,
                },
                {
                  id: 'mentors',
                  title: '1-on-1 Mentor Slot Releases',
                  desc: 'Alert when Razorpay and ABC Tech mentors publish new review slots for your target roles.',
                  checked: mentorReminders,
                  setter: setMentorReminders,
                },
                {
                  id: 'digest',
                  title: 'Weekly Readiness Digest',
                  desc: 'A consolidated weekly diagnostic summary of hiring trends in Pune and Bengaluru.',
                  checked: emailAlerts,
                  setter: setEmailAlerts,
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-[#eff4ff] rounded-lg border border-[#c7c4d7]/20"
                >
                  <div className="flex flex-col max-w-xl">
                    <span className="text-[13px] font-bold text-[#0b1c30]">{item.title}</span>
                    <span className="text-[12px] text-[#464554] mt-0.5">{item.desc}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={(e) => item.setter(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-[#dce9ff] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#c7c4d7] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#4338ca]"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Security & Privacy */}
        {activeTab === 'privacy' && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#c7c4d7]/20">
              <div>
                <h3 className="font-['Manrope'] text-[1.125rem] text-[#0b1c30] font-bold">
                  Security, Privacy & Data Export
                </h3>
                <p className="text-[12px] text-[#777586]">
                  Manage your confidential portfolio data and recruiter access levels.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="p-4 bg-[#eff4ff] rounded-lg border border-[#c7c4d7]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-[#0b1c30]">Recruiter Talent Pool Discovery</span>
                  <span className="text-[12px] text-[#464554]">
                    Permit partner companies (ABC Tech, Infosys, Zeta) to discover your profile when match &gt; 80%.
                  </span>
                </div>
                <span className="px-3 py-1 bg-[#7ffc97]/40 text-[#002109] rounded-full text-[11px] font-bold uppercase tracking-wider self-start sm:self-auto">
                  Active
                </span>
              </div>

              <div className="p-4 bg-[#eff4ff] rounded-lg border border-[#c7c4d7]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-[#0b1c30]">Session Tokens & Passkey</span>
                  <span className="text-[12px] text-[#464554]">
                    Authenticated via JobFit Single Sign-On (Express JWT). Last active 14 minutes ago.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to ' + email)}
                  className="px-3.5 py-1.5 bg-white hover:bg-[#dce9ff] text-[#0b1c30] text-[12px] font-semibold rounded-lg border border-[#c7c4d7]/40 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-[#c7c4d7]/20">
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="px-4 py-2 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] text-[13px] font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 bg-[#4338ca] hover:bg-[#2a14b4] text-white text-[13px] font-bold rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">save</span>
            <span>Save Settings Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
