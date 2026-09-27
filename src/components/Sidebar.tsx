import React from 'react';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  adminMode: boolean;
  onToggleAdmin: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  onOpenAuth?: (mode: 'login' | 'register') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  onNavigate,
  adminMode,
  onToggleAdmin,
  isOpenMobile = false,
  onCloseMobile,
  onOpenAuth,
}) => {
  const navSections = [
    {
      title: 'Portal',
      items: [
        { id: 'home', label: 'Home Page', icon: 'home' },
        { id: 'dashboard', label: 'Dashboard', icon: 'grid_view' },
      ],
    },
    {
      title: 'Jobs',
      items: [
        { id: 'search-jobs', label: 'Search Jobs', icon: 'search' },
        { id: 'saved-jobs', label: 'Saved Jobs', icon: 'bookmark' },
        { id: 'applications', label: 'Applications', icon: 'assignment' },
      ],
    },
    {
      title: 'Career Growth',
      items: [
        { id: 'skill-gap', label: 'Skill Gap', icon: 'tune' },
        { id: 'coding-contests', label: 'Coding Arena', icon: 'terminal', badge: 'LIVE' },
        { id: 'recommendations', label: 'Recommendations', icon: 'auto_awesome', badge: 'NEW' },
        { id: 'mentorship', label: 'Mentorship', icon: 'diversity_3' },
        { id: 'courses', label: 'Courses', icon: 'school' },
      ],
    },
    {
      title: 'Account',
      items: [
        { id: 'my-profile-resume', label: 'My Profile & Resume', icon: 'badge' },
        { id: 'settings', label: 'Settings', icon: 'settings' },
      ],
    },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-xs lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Element */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-[260px] lg:w-[250px] bg-white border-r border-[#c7c4d7]/30 z-50 lg:z-30 flex flex-col justify-between overflow-y-auto select-none transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4">
          {/* Brand Logo Lockup & Mobile Close Button */}
          <div className="flex items-center justify-between pb-4 border-b border-[#c7c4d7]/20 mb-3">
            <div
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 px-1 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#4338ca] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-['Manrope'] text-[20px] leading-tight font-extrabold text-[#2a14b4] tracking-tight">
                  Job<span className="text-[#712ae2]">Fit</span>
                </span>
                <span className="text-[9px] font-bold text-[#777586] tracking-widest uppercase">
                  Career Intelligence
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-[#777586] hover:text-[#0b1c30] hover:bg-[#eff4ff] transition-colors"
              title="Close navigation"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Navigation Groups */}
          <nav className="flex flex-col gap-1">
            {navSections.map((section, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="px-2 py-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#777586]">
                    {section.title}
                  </span>
                </div>
                {section.items.map((item) => {
                  const isActive = currentPath === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-medium transition-all text-left w-full cursor-pointer ${
                        isActive
                          ? 'bg-[#4338ca] text-white font-semibold shadow-sm'
                          : 'text-[#464554] hover:bg-[#eff4ff] hover:text-[#0b1c30]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`material-symbols-outlined text-[19px] shrink-0 ${isActive ? 'text-white' : 'text-[#777586]'}`}>
                          {item.icon}
                        </span>
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.badge === 'LIVE' ? 'bg-[#ba1a1a] text-white animate-pulse' : 'bg-[#712ae2] text-white'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Footer Controls */}
        <div className="p-4 border-t border-[#c7c4d7]/20 bg-white flex flex-col gap-2">
          {/* Quick Sign In / Switch Account Button */}
          {onOpenAuth && (
            <div className="flex items-center gap-2 mb-1">
              <button
                onClick={() => {
                  if (onCloseMobile) onCloseMobile();
                  onOpenAuth('login');
                }}
                className="flex-1 py-1.5 px-2 rounded-lg bg-[#eff4ff] hover:bg-[#e0e7ff] text-[#4338ca] text-[11px] font-bold transition-colors text-center"
              >
                Switch Account
              </button>
              <button
                onClick={() => {
                  if (onCloseMobile) onCloseMobile();
                  onOpenAuth('register');
                }}
                className="py-1.5 px-2 rounded-lg bg-[#f8f9ff] hover:bg-[#eff4ff] text-[#464554] text-[11px] font-semibold border border-[#c7c4d7]/40 text-center"
              >
                Register
              </button>
            </div>
          )}

          <div className="flex items-center justify-between px-1.5 py-1 text-[#464554]">
            <span className="text-[12px] font-medium">Admin Mode</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={adminMode}
                onChange={onToggleAdmin}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-[#dce9ff] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#c7c4d7] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#4338ca]"></div>
            </label>
          </div>

          <button
            onClick={() => handleNavClick('help-support')}
            className="flex items-center gap-2 px-1.5 py-1.5 rounded text-[12px] text-[#464554] hover:text-[#0b1c30] hover:bg-[#eff4ff] transition-colors w-full text-left cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">help</span>
            <span>Help & Support</span>
          </button>

          <button
            onClick={() => {
              handleNavClick('home');
            }}
            className="flex items-center gap-2 px-1.5 py-1.5 rounded text-[12px] text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-colors w-full text-left cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Return to Home & Login</span>
          </button>
        </div>
      </aside>
    </>
  );
};
