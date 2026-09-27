import React, { useState } from 'react';
import { CandidateProfile } from '../types.ts';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
  onLoginSuccess: (candidate: CandidateProfile, sessionInfo?: { token: string; welcomeMessage: string }) => void;
}

export const PRESET_ACCOUNTS: Record<string, CandidateProfile> = {
  rahul: {
    name: 'Rahul Sharma',
    email: 'myjeetarget2025@gmail.com',
    cohort: 'Cohort 2025 • B.Tech CSE',
    degree: 'B.Tech Computer Science & Engineering',
    cgpa: 8.4,
    readinessScore: 78,
    targetScore: 92,
    shortlistCutoff: 85,
    targetRole: 'Software Developer',
    targetCompany: 'ABC Technologies',
    division: 'Technology & Platforms Division',
    location: 'Pune, India',
    salaryRange: '₹6.0 – 10.0 LPA',
    experienceLevel: '0–2 Yrs Exp (Entry/Associate)',
    profileIntegrity: 78,
    averageMatch: 78,
    criticalGapsCount: 3,
    activeApplicationsCount: 5,
    shortlistedCount: 2,
    sprintEnrolled: false,
    sprintStep: 1,
    verifiedSkills: [
      { name: 'C++ Programming', description: 'Core Competency • Standard Library & Memory Management', level: 'Advanced', score: 88, verified: true },
      { name: 'SQL & Relational Schema', description: 'PostgreSQL • Joins, Normalization & Indexing', level: 'Intermediate', score: 82, verified: true },
      { name: 'Git & Version Control', description: 'Branching Models • PR Reviews • Merge Conflict Resolution', level: 'Proficient', score: 90, verified: true },
      { name: 'Object Oriented Programming', description: 'Design Patterns • SOLID Principles • Encapsulation', level: 'Advanced', score: 85, verified: true },
      { name: 'Data Structures Fundamentals', description: 'Trees, Graphs, Queues & Heaps Implementation', level: 'Intermediate', score: 76, verified: true },
    ],
    missingSkills: [
      { name: 'Node.js & Express Runtime', description: 'Server-side I/O • Event Loop • Middleware Architecture', status: 'Missing', severity: 'High', weight: 35, currentLevel: 'Novice (18%)', targetLevel: 'Production Grade (65%+)', boost: '+8%' },
      { name: 'MongoDB & NoSQL Document Modeling', description: 'Aggregation Pipelines • Mongoose Schemas • Sharding Basics', status: 'Missing', severity: 'High', weight: 25, currentLevel: 'Queries Only (35%)', targetLevel: 'Schema Design (70%+)', boost: '+6%' },
      { name: 'RESTful API Design & Authentication', description: 'JWT / OAuth2 • HTTP Status Specs • Swagger Documentation', status: 'Partial / Unverified', severity: 'Medium', weight: 15, currentLevel: '58 Solved (Medium)', targetLevel: 'Hard Graph/Trees', boost: '+4%' },
    ],
    gatekeeperCriteria: [
      { id: 'degree', label: 'Education Degree', detail: 'B.Tech Computer Eng. (Met)', met: true },
      { id: 'experience', label: 'Work Experience', detail: '0–2 Yrs (Fresh/Intern Met)', met: true },
      { id: 'cgpa', label: 'Academic Cutoff', detail: '8.4 / 10.0 (Threshold > 7.0 Met)', met: true },
      { id: 'tech_stack', label: 'Technical Stack Index', detail: '65% Stack Match (Missing Backend)', met: false },
    ],
  },
  priya: {
    name: 'Priya Patel',
    email: 'priya.patel@engineering.edu',
    cohort: 'Cohort 2025 • B.Tech IT',
    degree: 'B.Tech Information Technology',
    cgpa: 8.9,
    readinessScore: 83,
    targetScore: 94,
    shortlistCutoff: 85,
    targetRole: 'Full Stack Engineer',
    targetCompany: 'Razorpay',
    division: 'Payments Core Infrastructure',
    location: 'Bengaluru, India',
    salaryRange: '₹14.0 – 20.0 LPA',
    experienceLevel: '0–1 Yrs Exp (Associate)',
    profileIntegrity: 84,
    averageMatch: 83,
    criticalGapsCount: 2,
    activeApplicationsCount: 4,
    shortlistedCount: 3,
    sprintEnrolled: true,
    sprintStep: 2,
    verifiedSkills: [
      { name: 'React & TypeScript', description: 'Component Architecture • Custom Hooks • State Optimization', level: 'Advanced', score: 92, verified: true },
      { name: 'Tailwind CSS', description: 'Responsive Layouts & Design Systems', level: 'Proficient', score: 88, verified: true },
      { name: 'REST API Integration', description: 'Axios, Fetch, Error Boundaries & Interceptors', level: 'Advanced', score: 85, verified: true },
      { name: 'Git & Collaboration', description: 'CI/CD Pipelines & GitHub Actions', level: 'Intermediate', score: 80, verified: true },
    ],
    missingSkills: [
      { name: 'Redis Caching & Queue Worker', description: 'BullMQ • Distributed Locking • Cache Invalidation', status: 'Missing', severity: 'High', weight: 30, currentLevel: 'Theory Only', targetLevel: 'Production (60%+)', boost: '+7%' },
      { name: 'Docker & Containerization', description: 'Multi-stage Dockerfiles • Compose for Microservices', status: 'Partial / Unverified', severity: 'Medium', weight: 20, currentLevel: 'Basic Images', targetLevel: 'Compose Mastery', boost: '+4%' },
    ],
    gatekeeperCriteria: [
      { id: 'degree', label: 'Education Degree', detail: 'B.Tech IT (Met)', met: true },
      { id: 'experience', label: 'Work Experience', detail: '0–1 Yrs (Met)', met: true },
      { id: 'cgpa', label: 'Academic Cutoff', detail: '8.9 / 10.0 (Met)', met: true },
      { id: 'tech_stack', label: 'Technical Stack Index', detail: '82% Match (Need Distributed Systems)', met: false },
    ],
  },
  vikram: {
    name: 'Vikram Malhotra',
    email: 'vikram.m@techcollege.ac.in',
    cohort: 'Cohort 2025 • B.Tech ECE',
    degree: 'B.Tech Electronics & Computer Eng.',
    cgpa: 7.9,
    readinessScore: 74,
    targetScore: 90,
    shortlistCutoff: 85,
    targetRole: 'Cloud & DevOps Engineer',
    targetCompany: 'Zeta Platforms',
    division: 'Cloud Architecture & Reliability',
    location: 'Hyderabad, India',
    salaryRange: '₹10.0 – 16.0 LPA',
    experienceLevel: 'Fresh Graduate',
    profileIntegrity: 75,
    averageMatch: 74,
    criticalGapsCount: 3,
    activeApplicationsCount: 6,
    shortlistedCount: 1,
    sprintEnrolled: false,
    sprintStep: 1,
    verifiedSkills: [
      { name: 'Linux System Administration', description: 'Bash Scripting, Systemd & Networking', level: 'Advanced', score: 86, verified: true },
      { name: 'Python Automation', description: 'Scripting, OS Module & HTTP Requests', level: 'Intermediate', score: 78, verified: true },
      { name: 'Networking Fundamentals', description: 'TCP/IP, DNS, Subnets & TLS Handshake', level: 'Advanced', score: 84, verified: true },
    ],
    missingSkills: [
      { name: 'Kubernetes Cluster Administration', description: 'Deployments, Services, Ingress & Helm Charts', status: 'Missing', severity: 'High', weight: 40, currentLevel: 'Novice', targetLevel: 'CKA Baseline', boost: '+11%' },
      { name: 'Terraform IaC', description: 'State Management, Modules & AWS Provider', status: 'Missing', severity: 'High', weight: 25, currentLevel: 'Basic Syntax', targetLevel: 'Module Design', boost: '+5%' },
    ],
    gatekeeperCriteria: [
      { id: 'degree', label: 'Education Degree', detail: 'B.Tech ECE (Met)', met: true },
      { id: 'experience', label: 'Work Experience', detail: '0 Yrs (Fresh Graduate Met)', met: true },
      { id: 'cgpa', label: 'Academic Cutoff', detail: '7.9 / 10.0 (Threshold > 7.0 Met)', met: true },
      { id: 'tech_stack', label: 'Technical Stack Index', detail: '60% Match (K8s & Terraform Gap)', met: false },
    ],
  },
};

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('myjeetarget2025@gmail.com');
  const [loginPassword, setLoginPassword] = useState('••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regDegree, setRegDegree] = useState('B.Tech Computer Science');
  const [regTargetRole, setRegTargetRole] = useState('Software Developer');
  const [regTargetCompany, setRegTargetCompany] = useState('ABC Technologies');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regAgreed, setRegAgreed] = useState(true);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleQuickLogin = (presetKey: 'rahul' | 'priya' | 'vikram') => {
    setLoginLoading(true);
    setLoginError(null);
    setTimeout(() => {
      const preset = PRESET_ACCOUNTS[presetKey];
      setLoginLoading(false);
      onLoginSuccess(preset, {
        token: `demo-session-${presetKey}-${Date.now()}`,
        welcomeMessage: `Welcome back, ${preset.name}! Target ${preset.targetRole} diagnostic loaded.`,
      });
      onClose();
    }, 400);
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setLoginError('Please enter your registered email address.');
      return;
    }
    if (!loginPassword) {
      setLoginError('Please enter your password.');
      return;
    }

    setLoginLoading(true);
    setLoginError(null);

    setTimeout(() => {
      setLoginLoading(false);
      // Check if matches known presets or create matching candidate
      const foundPreset = Object.values(PRESET_ACCOUNTS).find(
        (p) => p.email.toLowerCase() === loginEmail.toLowerCase()
      );

      const candidateToLoad = foundPreset || {
        ...PRESET_ACCOUNTS.rahul,
        name: loginEmail.split('@')[0].replace('.', ' ').replace(/^./, (c) => c.toUpperCase()),
        email: loginEmail,
      };

      onLoginSuccess(candidateToLoad, {
        token: `session-${Date.now()}`,
        welcomeMessage: `Welcome back, ${candidateToLoad.name}!`,
      });
      onClose();
    }, 500);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError(null);

    if (!regName.trim()) {
      setRegisterError('Please enter your full name.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setRegisterError('Please enter a valid university or personal email address.');
      return;
    }
    if (regPassword.length < 6) {
      setRegisterError('Password must be at least 6 characters long.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegisterError('Passwords do not match. Please re-check.');
      return;
    }
    if (!regAgreed) {
      setRegisterError('Please accept the ATS Diagnostic Terms to continue.');
      return;
    }

    setRegisterLoading(true);

    setTimeout(() => {
      setRegisterLoading(false);

      const newCandidate: CandidateProfile = {
        name: regName.trim(),
        email: regEmail.trim(),
        cohort: 'Cohort 2025 • ' + regDegree,
        degree: regDegree,
        cgpa: 8.2,
        readinessScore: 72,
        targetScore: 90,
        shortlistCutoff: 85,
        targetRole: regTargetRole,
        targetCompany: regTargetCompany,
        division: 'Core Engineering Group',
        location: 'Bengaluru / Pune, India',
        salaryRange: '₹8.0 – 14.0 LPA',
        experienceLevel: '0–1 Yrs Exp (Associate)',
        profileIntegrity: 72,
        averageMatch: 72,
        criticalGapsCount: 3,
        activeApplicationsCount: 1,
        shortlistedCount: 0,
        sprintEnrolled: false,
        sprintStep: 1,
        verifiedSkills: [
          { name: 'Core Programming & Logic', description: 'Syntactic Mastery & Algorithms', level: 'Intermediate', score: 80, verified: true },
          { name: 'Data Structures & Algorithms', description: 'Array, String & Tree Problems', level: 'Intermediate', score: 75, verified: true },
          { name: 'Git & Collaboration', description: 'Version Control & Repositories', level: 'Proficient', score: 82, verified: true },
        ],
        missingSkills: [
          { name: `${regTargetRole} Core Frameworks`, description: 'Key libraries and backend architectural stacks', status: 'Missing', severity: 'High', weight: 35, currentLevel: 'Foundational', targetLevel: 'Production Grade', boost: '+10%' },
          { name: 'Database & System Architecture', description: 'Schema optimization and indexing queries', status: 'Missing', severity: 'High', weight: 25, currentLevel: 'Basic SQL', targetLevel: 'Advanced Queries', boost: '+6%' },
          { name: 'API Design & Testing Suite', description: 'Automated test pipelines and mock integrations', status: 'Partial / Unverified', severity: 'Medium', weight: 15, currentLevel: 'In Progress', targetLevel: 'Full Coverage', boost: '+4%' },
        ],
        gatekeeperCriteria: [
          { id: 'degree', label: 'Education Degree', detail: `${regDegree} (Met)`, met: true },
          { id: 'experience', label: 'Work Experience', detail: '0–1 Yrs (Met)', met: true },
          { id: 'cgpa', label: 'Academic Cutoff', detail: '8.2 / 10.0 (Met)', met: true },
          { id: 'tech_stack', label: 'Technical Stack Index', detail: 'Initial 72% Match', met: false },
        ],
      };

      onLoginSuccess(newCandidate, {
        token: `reg-session-${Date.now()}`,
        welcomeMessage: `Account created successfully! Welcome to JobFit, ${newCandidate.name}.`,
      });
      onClose();
    }, 650);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#c7c4d7]/40 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#1e147e] via-[#4338ca] to-[#712ae2] p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-['Manrope'] text-[18px] font-extrabold tracking-tight">
                Job<span className="text-[#a5b4fc]">Fit</span> Career Intelligence
              </span>
              <span className="text-[11px] text-white/80">
                {mode === 'login' ? 'Sign in to access your ATS diagnostic' : 'Create candidate account & calculate readiness'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex border-b border-[#c7c4d7]/30 bg-[#f8f9ff] shrink-0">
          <button
            onClick={() => {
              setMode('login');
              setLoginError(null);
            }}
            className={`flex-1 py-3 text-center text-[13px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'login'
                ? 'text-[#4338ca] border-b-2 border-[#4338ca] bg-white'
                : 'text-[#777586] hover:text-[#0b1c30]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">lock_open</span>
            <span>Sign In</span>
          </button>
          <button
            onClick={() => {
              setMode('register');
              setRegisterError(null);
            }}
            className={`flex-1 py-3 text-center text-[13px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mode === 'register'
                ? 'text-[#4338ca] border-b-2 border-[#4338ca] bg-white'
                : 'text-[#777586] hover:text-[#0b1c30]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            <span>Register Free</span>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {mode === 'login' ? (
            <div className="flex flex-col gap-4">
              {/* Demo Accounts Quick-Select */}
              <div className="bg-[#eff4ff] p-3.5 rounded-xl border border-[#c7c4d7]/30">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#4338ca] block mb-2">
                  ⚡ Quick Demo Login (One-Click)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('rahul')}
                    className="p-2 bg-white rounded-lg border border-[#c7c4d7]/30 hover:border-[#4338ca] hover:shadow-xs transition-all text-left cursor-pointer group"
                  >
                    <div className="text-[12px] font-bold text-[#0b1c30] group-hover:text-[#4338ca] truncate">
                      Rahul Sharma
                    </div>
                    <div className="text-[10px] text-[#777586] truncate">ABC Tech • 78%</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('priya')}
                    className="p-2 bg-white rounded-lg border border-[#c7c4d7]/30 hover:border-[#4338ca] hover:shadow-xs transition-all text-left cursor-pointer group"
                  >
                    <div className="text-[12px] font-bold text-[#0b1c30] group-hover:text-[#4338ca] truncate">
                      Priya Patel
                    </div>
                    <div className="text-[10px] text-[#777586] truncate">Razorpay • 83%</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('vikram')}
                    className="p-2 bg-white rounded-lg border border-[#c7c4d7]/30 hover:border-[#4338ca] hover:shadow-xs transition-all text-left cursor-pointer group"
                  >
                    <div className="text-[12px] font-bold text-[#0b1c30] group-hover:text-[#4338ca] truncate">
                      Vikram M.
                    </div>
                    <div className="text-[10px] text-[#777586] truncate">Zeta Cloud • 74%</div>
                  </button>
                </div>
              </div>

              <div className="flex items-center my-1">
                <div className="flex-1 h-px bg-[#c7c4d7]/30"></div>
                <span className="px-3 text-[11px] text-[#777586] uppercase font-semibold">Or use credentials</span>
                <div className="flex-1 h-px bg-[#c7c4d7]/30"></div>
              </div>

              {loginError && (
                <div className="p-3 rounded-lg bg-[#ffdad6] text-[#ba1a1a] text-[12px] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleCustomLogin} className="flex flex-col gap-3.5">
                <div>
                  <label className="block text-[12px] font-semibold text-[#464554] mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#777586] text-[18px]">
                      mail
                    </span>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="student@college.edu or rahul@example.com"
                      className="w-full pl-9 pr-3 py-2 bg-[#f8f9ff] rounded-lg text-[13px] border border-[#c7c4d7]/40 focus:border-[#4338ca] focus:bg-white focus:outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[12px] font-semibold text-[#464554]">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Demo Mode: Any password or quick demo profile will log in successfully.')}
                      className="text-[11px] text-[#4338ca] hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#777586] text-[18px]">
                      lock
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-10 py-2 bg-[#f8f9ff] rounded-lg text-[13px] border border-[#c7c4d7]/40 focus:border-[#4338ca] focus:bg-white focus:outline-none transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777586] hover:text-[#0b1c30]"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[12px] text-[#464554] pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#4338ca] focus:ring-[#4338ca]" />
                    <span>Keep me signed in</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-2.5 mt-2 rounded-xl bg-[#4338ca] hover:bg-[#2a14b4] text-white font-semibold text-[13px] shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {loginLoading ? (
                    <>
                      <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                      <span>Verifying Credentials...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In & Open Dashboard</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>

              <div className="text-center pt-2">
                <span className="text-[12px] text-[#777586]">
                  Don't have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('register')}
                    className="text-[#4338ca] font-semibold hover:underline cursor-pointer"
                  >
                    Register free candidate profile
                  </button>
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {registerError && (
                <div className="p-3 rounded-lg bg-[#ffdad6] text-[#ba1a1a] text-[12px] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  <span>{registerError}</span>
                </div>
              )}

              <form onSubmit={handleRegister} className="flex flex-col gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#464554] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Ananya Rao"
                      className="w-full px-3 py-2 bg-[#f8f9ff] rounded-lg text-[13px] border border-[#c7c4d7]/40 focus:border-[#4338ca] focus:bg-white focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-[#464554] mb-1">
                      University Email *
                    </label>
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="ananya@college.edu"
                      className="w-full px-3 py-2 bg-[#f8f9ff] rounded-lg text-[13px] border border-[#c7c4d7]/40 focus:border-[#4338ca] focus:bg-white focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#464554] mb-1">
                      Degree & Branch
                    </label>
                    <select
                      value={regDegree}
                      onChange={(e) => setRegDegree(e.target.value)}
                      className="w-full px-3 py-2 bg-[#f8f9ff] rounded-lg text-[13px] border border-[#c7c4d7]/40 focus:border-[#4338ca] focus:bg-white focus:outline-none"
                    >
                      <option value="B.Tech Computer Science">B.Tech Computer Science</option>
                      <option value="B.Tech Information Technology">B.Tech Information Technology</option>
                      <option value="B.Tech Electronics & Comm">B.Tech Electronics & Comm</option>
                      <option value="B.E. Software Engineering">B.E. Software Engineering</option>
                      <option value="MCA Computer Applications">MCA Computer Applications</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-[#464554] mb-1">
                      Target Role
                    </label>
                    <select
                      value={regTargetRole}
                      onChange={(e) => setRegTargetRole(e.target.value)}
                      className="w-full px-3 py-2 bg-[#f8f9ff] rounded-lg text-[13px] border border-[#c7c4d7]/40 focus:border-[#4338ca] focus:bg-white focus:outline-none"
                    >
                      <option value="Software Developer">Software Developer</option>
                      <option value="Full Stack Engineer">Full Stack Engineer</option>
                      <option value="Cloud & DevOps Engineer">Cloud & DevOps Engineer</option>
                      <option value="Backend Systems Engineer">Backend Systems Engineer</option>
                      <option value="AI/Data Engineer">AI/Data Engineer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-semibold text-[#464554] mb-1">
                    Dream Target Company
                  </label>
                  <input
                    type="text"
                    value={regTargetCompany}
                    onChange={(e) => setRegTargetCompany(e.target.value)}
                    placeholder="e.g. ABC Technologies, Google, Razorpay"
                    className="w-full px-3 py-2 bg-[#f8f9ff] rounded-lg text-[13px] border border-[#c7c4d7]/40 focus:border-[#4338ca] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#464554] mb-1">
                      Password *
                    </label>
                    <input
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full px-3 py-2 bg-[#f8f9ff] rounded-lg text-[13px] border border-[#c7c4d7]/40 focus:border-[#4338ca] focus:bg-white focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-[#464554] mb-1">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full px-3 py-2 bg-[#f8f9ff] rounded-lg text-[13px] border border-[#c7c4d7]/40 focus:border-[#4338ca] focus:bg-white focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <label className="flex items-start gap-2 text-[12px] text-[#464554] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={regAgreed}
                      onChange={(e) => setRegAgreed(e.target.checked)}
                      className="mt-0.5 rounded border-gray-300 text-[#4338ca] focus:ring-[#4338ca]"
                    />
                    <span>
                      I agree to allow JobFit to analyze my academic curriculum and GitHub profile against ATS placement benchmarks.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={registerLoading}
                  className="w-full py-2.5 mt-2 rounded-xl bg-[#4338ca] hover:bg-[#2a14b4] text-white font-semibold text-[13px] shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {registerLoading ? (
                    <>
                      <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                      <span>Calibrating Your ATS Score...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                      <span>Complete Registration & Launch Profile</span>
                    </>
                  )}
                </button>
              </form>

              <div className="text-center pt-1">
                <span className="text-[12px] text-[#777586]">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-[#4338ca] font-semibold hover:underline cursor-pointer"
                  >
                    Sign in here
                  </button>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
