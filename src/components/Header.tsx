import React, { useState } from 'react';
import { CandidateProfile } from '../types.ts';

interface HeaderProps {
  candidate: CandidateProfile;
  onSearch?: (query: string) => void;
  onNavigate: (path: string) => void;
  onOpenMobileSidebar?: () => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
}

export const Header: React.FC<HeaderProps> = ({
  candidate,
  onSearch,
  onNavigate,
  onOpenMobileSidebar,
  onOpenAuth,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'ABC Tech Shortlist Update', desc: 'Readiness at 78%. Close 7% gap to unlock direct interview invite.', time: '14m ago', unread: true },
    { id: 2, title: 'Live Contest #01 Active', desc: 'Backend Rate Limiter arena is open for submission.', time: '1h ago', unread: true },
    { id: 3, title: 'Mentor Slot Available', desc: 'Rahul Sharma (Razorpay) has an open slot today at 5:00 PM IST.', time: '3h ago', unread: false },
  ];

  return (
    <header className="fixed top-0 left-0 lg:left-[250px] right-0 h-16 bg-white/95 backdrop-blur-md border-b border-[#c7c4d7]/30 z-30 flex items-center justify-between px-3 sm:px-6 transition-all">
      {/* Left Area: Mobile Hamburger Button & Search Bar */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1 max-w-xl">
        {/* Mobile Hamburger Toggle */}
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 text-[#464554] hover:text-[#0b1c30] rounded-lg hover:bg-[#eff4ff] transition-colors shrink-0"
          aria-label="Open navigation menu"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        {/* Mobile Logo Mark (Visible only when sidebar is hidden) */}
        <div 
          onClick={() => onNavigate('home')}
          className="flex lg:hidden items-center gap-1.5 cursor-pointer shrink-0"
        >
          <div className="w-7 h-7 rounded-lg bg-[#4338ca] text-white flex items-center justify-center font-bold text-[12px]">
            JF
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-[200px] xs:max-w-xs sm:max-w-sm md:max-w-md">
          <span className="material-symbols-outlined absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 text-[#777586] text-[18px] sm:text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              onSearch?.(e.target.value);
            }}
            placeholder="Search jobs, skills, mentors..."
            className="w-full pl-8 sm:pl-10 pr-3 py-1.5 sm:py-2 bg-[#eff4ff] rounded-lg text-[12px] sm:text-[13px] text-[#0b1c30] placeholder:text-[#777586] border border-transparent focus:border-[#4338ca] focus:bg-white focus:outline-none transition-all truncate"
          />
        </div>
      </div>

      {/* Right Header Controls */}
      <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
        {/* Quick Link to Public Home Landing */}
        <button
          onClick={() => onNavigate('home')}
          className="hidden sm:inline-flex items-center gap-1 text-[12px] sm:text-[13px] font-semibold text-[#464554] hover:text-[#4338ca] transition-colors px-2 py-1 rounded-md hover:bg-[#eff4ff]"
          title="Visit Home Landing Page"
        >
          <span className="material-symbols-outlined text-[17px]">home</span>
          <span>Home</span>
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="relative p-1.5 text-[#464554] hover:text-[#0b1c30] rounded-full hover:bg-[#eff4ff] transition-colors"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[20px] sm:text-[22px]">notifications</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#ba1a1a] rounded-full ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-xl border border-[#c7c4d7]/40 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-[13px] font-bold text-[#0b1c30]">Notifications</span>
                <span className="text-[11px] font-semibold text-[#4338ca] cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="flex flex-col gap-2 mt-2 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2 rounded-lg bg-[#f8f9ff] hover:bg-[#eff4ff] transition-colors cursor-pointer text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-bold text-[#0b1c30]">{n.title}</span>
                      <span className="text-[10px] text-[#777586]">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-[#464554] mt-0.5 leading-snug">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="hidden xs:block h-6 w-px bg-[#c7c4d7]/30"></div>

        {/* Candidate Profile Widget & Dropdown */}
        <div className="relative">
          <div
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 cursor-pointer group p-1 rounded-lg hover:bg-[#eff4ff] transition-colors"
          >
            <div className="relative shrink-0">
              {/* Avatar thumbnail */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#4338ca] to-[#712ae2] text-white flex items-center justify-center font-bold text-[12px] ring-2 ring-[#4338ca]/20 overflow-hidden">
                <img 
                  src="/src/assets/images/mentor_rahul_portrait_1790527344239.jpg" 
                  alt="Candidate Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span>{candidate.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</span>
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#005f26] ring-2 ring-white"></span>
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-[13px] text-[#0b1c30] leading-tight font-semibold group-hover:text-[#4338ca] transition-colors truncate max-w-[130px]">
                {candidate.name}
              </span>
              <span className="text-[10px] text-[#005f26] font-bold uppercase tracking-wider">
                Ready {candidate.readinessScore}%
              </span>
            </div>
            <span className="material-symbols-outlined text-[16px] text-[#777586] hidden sm:block">
              expand_more
            </span>
          </div>

          {/* User Profile Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#c7c4d7]/40 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-2 border-b border-gray-100">
                <div className="text-[13px] font-bold text-[#0b1c30] truncate">{candidate.name}</div>
                <div className="text-[11px] text-[#777586] truncate">{candidate.email}</div>
                <div className="mt-1 px-2 py-0.5 rounded bg-[#eff4ff] text-[#4338ca] text-[10px] font-semibold inline-block">
                  Target: {candidate.targetRole}
                </div>
              </div>

              <div className="flex flex-col gap-1 py-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onNavigate('my-profile-resume');
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-[12px] text-[#464554] hover:bg-[#eff4ff] hover:text-[#0b1c30] rounded-lg transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[16px]">badge</span>
                  <span>View Resume Profile</span>
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onNavigate('settings');
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-[12px] text-[#464554] hover:bg-[#eff4ff] hover:text-[#0b1c30] rounded-lg transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[16px]">settings</span>
                  <span>Preferences & Settings</span>
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    if (onOpenAuth) onOpenAuth('login');
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-[12px] text-[#4338ca] hover:bg-[#eff4ff] rounded-lg transition-colors text-left font-semibold"
                >
                  <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
                  <span>Switch Candidate Profile</span>
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    if (onOpenAuth) onOpenAuth('register');
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-[12px] text-[#464554] hover:bg-[#eff4ff] rounded-lg transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[16px]">person_add</span>
                  <span>Register New Profile</span>
                </button>
              </div>

              <div className="pt-1 border-t border-gray-100">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onNavigate('home');
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 text-[12px] text-[#ba1a1a] hover:bg-[#ffdad6]/40 rounded-lg transition-colors text-left font-semibold"
                >
                  <span className="material-symbols-outlined text-[16px]">logout</span>
                  <span>Sign Out / Return to Home</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
