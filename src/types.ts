export interface VerifiedSkill {
  name: string;
  description: string;
  level: string;
  score: number;
  verified: boolean;
}

export interface MissingSkill {
  name: string;
  description: string;
  status: string;
  severity: 'High' | 'Medium' | 'Low';
  weight: number;
  currentLevel: string;
  targetLevel: string;
  boost: string;
}

export interface GatekeeperCriterion {
  id: string;
  label: string;
  detail: string;
  met: boolean;
}

export interface CandidateProfile {
  name: string;
  email: string;
  cohort: string;
  degree: string;
  cgpa: number;
  readinessScore: number;
  targetScore: number;
  shortlistCutoff: number;
  targetRole: string;
  targetCompany: string;
  division: string;
  location: string;
  salaryRange: string;
  experienceLevel: string;
  profileIntegrity: number;
  averageMatch: number;
  criticalGapsCount: number;
  activeApplicationsCount: number;
  shortlistedCount: number;
  sprintEnrolled: boolean;
  sprintStep: number;
  verifiedSkills: VerifiedSkill[];
  missingSkills: MissingSkill[];
  gatekeeperCriteria: GatekeeperCriterion[];
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  tag: string;
  statusTag: string;
  matchPercent: number;
  location: string;
  salary: string;
  jobType: string;
  evaluatedSkills: { name: string; status: 'met' | 'missing' }[];
  description: string;
}

export interface TestCaseResult {
  id: number;
  title: string;
  input: string;
  expected: string;
  actual: string;
  status: string;
  latencyMs: number;
  passed: boolean;
}

export interface RunTestsResponse {
  status: 'success' | 'error';
  allPassed: boolean;
  passedCount: number;
  totalCount: number;
  executionTimeMs: number;
  peakMemoryMb: string;
  memoryLimitMb: number;
  testCases: TestCaseResult[];
  logs?: string[];
  error?: string;
}
