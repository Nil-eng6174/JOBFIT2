import React, { useState } from 'react';
import { CandidateProfile, JobListing } from './types.ts';
import { Sidebar } from './components/Sidebar.tsx';
import { Header } from './components/Header.tsx';
import { HomeView } from './views/HomeView.tsx';
import { DashboardView } from './views/DashboardView.tsx';
import { SkillGapView } from './views/SkillGapView.tsx';
import { RecommendationsView } from './views/RecommendationsView.tsx';
import { SearchJobsView } from './views/SearchJobsView.tsx';
import { CoursesView } from './views/CoursesView.tsx';
import { MentorshipView } from './views/MentorshipView.tsx';
import { ProfileResumeView } from './views/ProfileResumeView.tsx';
import { SettingsView } from './views/SettingsView.tsx';
import { ActionPlanModal, MentorshipModal, EligibilityModal } from './components/Modals.tsx';
import { AuthModal } from './components/AuthModal.tsx';

export default function App() {
  // Navigation defaults to 'home' landing page so visitors can see registration/login and value proposition
  const [currentPath, setCurrentPath] = useState<string>('home');
  const [adminMode, setAdminMode] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [sessionToast, setSessionToast] = useState<string | null>(null);

  // Interactive View Modals
  const [isActionPlanOpen, setIsActionPlanOpen] = useState<boolean>(false);
  const [isMentorshipOpen, setIsMentorshipOpen] = useState<boolean>(false);
  const [isEligibilityOpen, setIsEligibilityOpen] = useState<boolean>(false);

  // Candidate Profile State
  const [candidate, setCandidate] = useState<CandidateProfile>({
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
  });

  // Available Job Listings Database
  const [jobs] = useState<JobListing[]>([
    {
      id: 'abc-tech',
      title: 'Junior Software Engineer',
      company: 'ABC Technologies',
      companyLogo: 'ABC',
      tag: 'Tier-1 Shortlist Track',
      location: 'Pune / Hybrid',
      salary: '₹6.0 – 10.0 LPA',
      jobType: 'Full-time • Campus Drive',
      matchPercent: 78,
      statusTag: 'PARTIALLY ELIGIBLE',
      description: 'Core platform engineering role focusing on distributed services, microservices APIs, and persistence layers. Requires strong data structures and modern backend proficiency.',
      evaluatedSkills: [
        { name: 'C++', status: 'met' },
        { name: 'SQL', status: 'met' },
        { name: 'Node.js', status: 'missing' },
        { name: 'MongoDB', status: 'missing' },
        { name: 'REST APIs', status: 'missing' },
      ],
    },
    {
      id: 'infosys-assoc',
      title: 'Systems Engineer — Specialist Programmer',
      company: 'Infosys Platforms',
      companyLogo: 'INF',
      tag: 'Enterprise Lab',
      location: 'Bengaluru / Pune',
      salary: '₹9.5 LPA',
      jobType: 'Full-time • Fast Track',
      matchPercent: 88,
      statusTag: 'POTENTIAL FIT',
      description: 'High-performance engineering track for competitive programmers and system architects. Direct shortlisting for candidates scoring >85% in algorithms.',
      evaluatedSkills: [
        { name: 'DSA Hard', status: 'met' },
        { name: 'C++', status: 'met' },
        { name: 'OOP', status: 'met' },
        { name: 'Git', status: 'met' },
      ],
    },
    {
      id: 'razorpay-backend',
      title: 'Associate Backend Engineer',
      company: 'Razorpay',
      companyLogo: 'RZP',
      tag: 'Fintech Tier 1',
      location: 'Bengaluru',
      salary: '₹14.0 – 18.0 LPA',
      jobType: 'Full-time • Product Tier 1',
      matchPercent: 62,
      statusTag: 'CRITICAL GAPS',
      description: 'Payment systems reliability and gateway orchestration. Requires production-grade Go/Node.js experience and high-concurrency database locking primitives.',
      evaluatedSkills: [
        { name: 'SQL', status: 'met' },
        { name: 'Concurrency', status: 'missing' },
        { name: 'Redis', status: 'missing' },
        { name: 'Distributed Systems', status: 'missing' },
      ],
    },
    {
      id: 'zeta-cloud',
      title: 'Cloud Systems Associate',
      company: 'Zeta Platforms',
      companyLogo: 'ZT',
      tag: 'Banking Core',
      location: 'Bengaluru / Hyderabad',
      salary: '₹12.0 – 16.0 LPA',
      jobType: 'Full-time',
      matchPercent: 71,
      statusTag: 'PARTIALLY ELIGIBLE',
      description: 'Core banking platform scaling. Candidate will implement secure API token bucket throttling, event bus listeners, and continuous delivery pipelines.',
      evaluatedSkills: [
        { name: 'Algorithms', status: 'met' },
        { name: 'Linux', status: 'met' },
        { name: 'Docker', status: 'missing' },
        { name: 'Kubernetes', status: 'missing' },
      ],
    },
  ]);

  const handleScoreUpdated = (newScore: number) => {
    setCandidate((prev) => ({
      ...prev,
      readinessScore: newScore,
      missingSkills: prev.missingSkills.map((sk) =>
        sk.name.includes('Node.js')
          ? { ...sk, status: 'Verified in Arena', severity: 'Low', boost: 'Awarded +6%' }
          : sk
      ),
    }));
  };

  const handleStartSprint = () => {
    setCandidate((prev) => ({
      ...prev,
      sprintEnrolled: true,
      sprintStep: 1,
      readinessScore: Math.min(prev.readinessScore + 4, 96),
    }));
    setSessionToast('14-Day Sprint activated! Modules added to your dashboard.');
    setTimeout(() => setSessionToast(null), 4000);
  };

  const handleConfirmBooking = (slot: string) => {
    setIsMentorshipOpen(false);
    setSessionToast(`Mentorship session scheduled for ${slot}!`);
    setTimeout(() => setSessionToast(null), 4500);
  };

  const handleUpdateCandidate = (updated: Partial<CandidateProfile>) => {
    setCandidate((prev) => ({ ...prev, ...updated }));
  };

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (
    newCand: CandidateProfile,
    sessionInfo?: { token: string; welcomeMessage: string }
  ) => {
    setCandidate(newCand);
    setSessionToast(sessionInfo?.welcomeMessage || `Welcome back, ${newCand.name}!`);
    setTimeout(() => setSessionToast(null), 4500);
  };

  const handleExportReport = () => {
    const reportData = {
      title: 'JobFit Candidate Readiness & ATS Calibration Report',
      candidateName: candidate.name,
      cohort: candidate.cohort,
      targetRole: `${candidate.targetRole} @ ${candidate.targetCompany}`,
      readinessScore: `${candidate.readinessScore}%`,
      interviewCutoff: '85%',
      verifiedSkills: candidate.verifiedSkills,
      criticalGaps: candidate.missingSkills,
      actionPlan: [
        '1. Build Node.js & Express Token Bucket Rate Limiter',
        '2. Implement Mongoose Aggregation & Indexing in MongoDB',
        '3. 1-on-1 Architecture Review with Senior Backend Engineer',
      ],
      generatedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `JobFit_Readiness_Report_${candidate.name.replace(/\s+/g, '_')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-['Inter',sans-serif]">
      {/* Session Toast Banner */}
      {sessionToast && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-[#0b1c30] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-[13px] animate-in slide-in-from-top-3 duration-200 border border-[#c7c4d7]/20">
          <span className="material-symbols-outlined text-[18px] text-[#00e676]">verified</span>
          <span className="font-medium">{sessionToast}</span>
          <button onClick={() => setSessionToast(null)} className="ml-2 hover:opacity-75">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Conditionally render Full-Width Home View OR In-App View with Responsive Sidebar/Header */}
      {currentPath === 'home' ? (
        <HomeView
          currentCandidate={candidate}
          onNavigate={setCurrentPath}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : (
        <div className="flex-1 min-h-screen">
          {/* Responsive Sidebar Navigation */}
          <Sidebar
            currentPath={currentPath}
            onNavigate={setCurrentPath}
            adminMode={adminMode}
            onToggleAdmin={() => setAdminMode(!adminMode)}
            isOpenMobile={mobileSidebarOpen}
            onCloseMobile={() => setMobileSidebarOpen(false)}
            onOpenAuth={handleOpenAuth}
          />

          {/* Main Content Area: Responsive Padding */}
          <div className="pl-0 lg:pl-[250px] transition-all min-h-screen flex flex-col">
            {/* Top Header with Hamburger and Profile Controls */}
            <Header
              candidate={candidate}
              onNavigate={setCurrentPath}
              onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
              onOpenAuth={handleOpenAuth}
            />

            {/* Viewport Content */}
            <main className="relative pt-16 min-h-screen bg-[#f8f9ff] flex-1">
              <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 md:px-8 py-5">
                {/* Breadcrumb Navigation */}
                <nav className="flex items-center gap-1.5 sm:gap-2 text-[#777586] text-[11px] sm:text-[12px] mb-4 flex-wrap">
                  <button
                    onClick={() => setCurrentPath('home')}
                    className="hover:text-[#4338ca] transition-colors cursor-pointer font-medium"
                  >
                    Home
                  </button>
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  <button
                    onClick={() => setCurrentPath('dashboard')}
                    className={`transition-colors cursor-pointer ${
                      currentPath === 'dashboard' ? 'text-[#4338ca] font-bold' : 'hover:text-[#4338ca]'
                    }`}
                  >
                    Dashboard
                  </button>
                  {currentPath !== 'dashboard' && (
                    <>
                      <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                      <span className="text-[#464554] font-semibold capitalize truncate max-w-[200px]">
                        {currentPath.replace(/-/g, ' ')}
                      </span>
                    </>
                  )}
                </nav>

                {/* Active View Routing */}
                {currentPath === 'dashboard' && (
                  <DashboardView
                    candidate={candidate}
                    jobs={jobs}
                    onNavigate={setCurrentPath}
                    onOpenActionPlan={() => setIsActionPlanOpen(true)}
                    onOpenEligibilityModal={() => setIsEligibilityOpen(true)}
                    onExportReport={handleExportReport}
                  />
                )}

                {currentPath === 'skill-gap' && (
                  <SkillGapView
                    candidate={candidate}
                    onNavigate={setCurrentPath}
                    onOpenActionPlan={() => setIsActionPlanOpen(true)}
                    onExportReport={handleExportReport}
                  />
                )}

                {currentPath === 'recommendations' && (
                  <RecommendationsView
                    candidate={candidate}
                    onNavigate={setCurrentPath}
                    onOpenMentorshipModal={() => setIsMentorshipOpen(true)}
                    onStartSprint={handleStartSprint}
                  />
                )}



                {(currentPath === 'search-jobs' || currentPath === 'saved-jobs' || currentPath === 'applications') && (
                  <SearchJobsView
                    jobs={jobs}
                    onNavigate={setCurrentPath}
                  />
                )}

                {currentPath === 'courses' && (
                  <CoursesView
                    onNavigate={setCurrentPath}
                  />
                )}

                {currentPath === 'mentorship' && (
                  <MentorshipView
                    onOpenBooking={() => setIsMentorshipOpen(true)}
                  />
                )}

                {currentPath === 'settings' && (
                  <SettingsView
                    candidate={candidate}
                    onUpdateCandidate={handleUpdateCandidate}
                    onNavigate={setCurrentPath}
                  />
                )}

                {(currentPath === 'my-profile-resume' || currentPath === 'help-support') && (
                  <ProfileResumeView
                    candidate={candidate}
                    onNavigate={setCurrentPath}
                  />
                )}
              </div>
            </main>
          </div>
        </div>
      )}

      {/* Global Interactive Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        onLoginSuccess={(newCand, sessionInfo) => {
          handleLoginSuccess(newCand, sessionInfo);
          setCurrentPath('dashboard');
        }}
      />

      <ActionPlanModal
        isOpen={isActionPlanOpen}
        onClose={() => setIsActionPlanOpen(false)}
        candidate={candidate}
        onStartStep={(step) => {
          if (step === 2) setCurrentPath('courses');
        }}
      />

      <MentorshipModal
        isOpen={isMentorshipOpen}
        onClose={() => setIsMentorshipOpen(false)}
        onConfirmBooking={handleConfirmBooking}
      />

      <EligibilityModal
        isOpen={isEligibilityOpen}
        onClose={() => setIsEligibilityOpen(false)}
        candidate={candidate}
        onViewDiagnostic={() => setCurrentPath('skill-gap')}
      />
    </div>
  );
}
