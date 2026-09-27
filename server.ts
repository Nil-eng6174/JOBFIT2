import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initial In-Memory State
const candidateState = {
  candidate: {
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
  contest: {
    id: 'challenge-01',
    title: 'Backend Challenge #01 — Problem 1 of 3: Express REST API Rate Limiter',
    timeRemainingSeconds: 5055, // 01:24:15
    candidateRank: 14,
    totalParticipants: 428,
    activeProblemId: 'q1',
    problems: [
      { id: 'q1', title: 'Q1: Rate Limiter', difficulty: 'Medium', solved: true, score: 150 },
      { id: 'q2', title: 'Q2: MongoDB Aggregation', difficulty: 'Medium', solved: false, score: 150 },
      { id: 'q3', title: 'Q3: Cache Eviction Engine', difficulty: 'Hard', solved: false, score: 200 },
    ],
    currentCode: `const express = require('express');
const router = express.Router();

// Solution: In-Memory Token Bucket Algorithm
class RateLimiter {
  constructor(capacity, refillRate) {
    this.capacity = capacity;
    this.tokens = capacity;
    this.refillRate = refillRate; // tokens / ms
    this.lastRefill = Date.now();
  }

  allowRequest() {
    const now = Date.now();
    const elapsed = now - this.lastRefill;
    this.tokens = Math.min(
      this.capacity,
      this.tokens + elapsed * this.refillRate
    );
    this.lastRefill = now;

    if (this.tokens >= 1) {
      this.tokens -= 1;
      return true;
    }
    return false;
  }
}

module.exports = { RateLimiter };`,
    topStandings: [
      { rank: 1, name: 'alex_dev', school: 'MIT', points: 300, time: '18m' },
      { rank: 2, name: 'dev_priya', school: 'IIT', points: 300, time: '22m' },
      { rank: 14, name: 'Rahul Sharma (You)', school: 'Candidate', points: 150, time: '35m', isCurrent: true },
    ]
  },
  mentorshipBooking: {
    mentor: 'Rahul Sharma',
    role: 'Senior Backend Engineer @ Razorpay',
    rating: 4.8,
    reviewCount: 94,
    studentsCount: '120+',
    experience: '3+ Yrs Exp',
    price: 499,
    nextSlotToday: '5:00 PM IST',
    availableSlots: ['Today 5:00 PM IST', 'Tomorrow 11:00 AM IST', 'Tomorrow 4:30 PM IST', 'Saturday 2:00 PM IST'],
    bookedSlot: null as string | null
  },
  courseEnrollment: {
    enrolled: false,
    progressPercent: 0,
    title: 'Node.js & Express Backend Bootcamp',
    provider: 'JobFit Labs',
    hours: 8,
    price: 799,
    modulesCompleted: 0,
    totalModules: 6
  }
};

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  app.use(express.json());

  // API Endpoints
  // 0. Authentication Routes
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { email, password } = req.body;
    // Check if matches known profile
    if (email && email.toLowerCase().includes('priya')) {
      return res.json({
        status: 'success',
        token: `jwt-token-priya-${Date.now()}`,
        user: {
          name: 'Priya Patel',
          email: 'priya.patel@engineering.edu',
          targetRole: 'Full Stack Engineer',
          targetCompany: 'Razorpay',
          readinessScore: 83
        }
      });
    }

    if (email && email.toLowerCase().includes('vikram')) {
      return res.json({
        status: 'success',
        token: `jwt-token-vikram-${Date.now()}`,
        user: {
          name: 'Vikram Malhotra',
          email: 'vikram.m@techcollege.ac.in',
          targetRole: 'Cloud & DevOps Engineer',
          targetCompany: 'Zeta Platforms',
          readinessScore: 74
        }
      });
    }

    // Default to Rahul Sharma or custom user
    res.json({
      status: 'success',
      token: `jwt-token-${Date.now()}`,
      user: {
        ...candidateState.candidate,
        email: email || candidateState.candidate.email
      }
    });
  });

  app.post('/api/auth/register', (req: Request, res: Response) => {
    const { name, email, targetRole, targetCompany, degree } = req.body;
    if (!name || !email) {
      return res.status(400).json({ status: 'error', message: 'Name and email are required.' });
    }

    const newUser = {
      name,
      email,
      targetRole: targetRole || 'Software Developer',
      targetCompany: targetCompany || 'ABC Technologies',
      degree: degree || 'B.Tech Computer Science & Engineering',
      readinessScore: 72,
      targetScore: 90,
      shortlistCutoff: 85
    };

    res.json({
      status: 'success',
      message: 'Candidate account created successfully.',
      token: `jwt-token-reg-${Date.now()}`,
      user: newUser
    });
  });

  // 1. Candidate Profile & Diagnostic Overview
  app.get('/api/profile', (req: Request, res: Response) => {
    res.json({
      status: 'success',
      data: candidateState.candidate,
      timestamp: new Date().toISOString()
    });
  });

  // 2. Recommended Jobs
  app.get('/api/jobs', (req: Request, res: Response) => {
    const jobs = [
      {
        id: 'job-1',
        title: 'Software Developer',
        company: 'ABC Technologies',
        companyLogo: 'ABC',
        tag: 'Tier-1 Shortlist Track',
        statusTag: 'PARTIALLY ELIGIBLE',
        matchPercent: candidateState.candidate.readinessScore,
        location: 'Pune · Hybrid',
        salary: '₹6–10 LPA',
        jobType: 'Full Time Graduate',
        evaluatedSkills: [
          { name: 'C++', status: 'met' },
          { name: 'SQL', status: 'met' },
          { name: 'Git', status: 'met' },
          { name: 'Node.js (Missing)', status: 'missing' }
        ],
        description: 'Design and deploy robust microservices in Node.js and maintain high-throughput backend APIs.'
      },
      {
        id: 'job-2',
        title: 'Junior Full Stack Engineer',
        company: 'Infosys Innovations',
        companyLogo: 'INF',
        tag: 'Enterprise Lab',
        statusTag: 'POTENTIAL FIT',
        matchPercent: 72,
        location: 'Bengaluru · Full Time',
        salary: '₹7–11 LPA',
        jobType: '2 Days Ago',
        evaluatedSkills: [
          { name: 'Python', status: 'met' },
          { name: 'SQL', status: 'met' },
          { name: 'REST APIs', status: 'missing' }
        ],
        description: 'Full stack web development across client applications and cloud-native backend integration.'
      },
      {
        id: 'job-3',
        title: 'Backend Trainee',
        company: 'Zeta Systems',
        companyLogo: 'ZET',
        tag: 'Fintech Division',
        statusTag: 'BRIDGING NEEDED',
        matchPercent: 65,
        location: 'Hyderabad · Remote',
        salary: '₹8–12 LPA',
        jobType: 'Fast Track Hiring',
        evaluatedSkills: [
          { name: 'Java', status: 'met' },
          { name: 'DSA', status: 'met' },
          { name: 'System Design', status: 'missing' }
        ],
        description: 'Accelerated development track with focus on concurrency pipelines, database caching, and high reliability.'
      }
    ];

    res.json({
      status: 'success',
      total: 42,
      data: jobs
    });
  });

  // 3. Detailed ATS Diagnostic for ABC Technologies
  app.get('/api/diagnostics/abc-tech', (req: Request, res: Response) => {
    res.json({
      status: 'success',
      data: {
        role: candidateState.candidate.targetRole,
        company: candidateState.candidate.targetCompany,
        division: candidateState.candidate.division,
        matchScore: candidateState.candidate.readinessScore,
        targetScore: candidateState.candidate.targetScore,
        shortlistCutoff: candidateState.candidate.shortlistCutoff,
        shortlistGap: Math.max(0, candidateState.candidate.shortlistCutoff - candidateState.candidate.readinessScore),
        applicantDistribution: {
          total: 248,
          candidatePercentile: '78th Percentile',
          userScore: candidateState.candidate.readinessScore,
          cutoff: candidateState.candidate.shortlistCutoff,
          brackets: [
            { label: '<50%', count: 32, height: 20 },
            { label: '50-60%', count: 48, height: 35 },
            { label: '60-70%', count: 74, height: 60 },
            { label: '70-75%', count: 42, height: 75 },
            { label: 'You (78%)', count: 18, height: 88, isUser: true },
            { label: '80-85%', count: 28, height: 50 },
            { label: 'Cutoff (85%)', count: 14, height: 30, isCutoff: true },
            { label: '>90%', count: 10, height: 15 }
          ]
        },
        verifiedSkills: candidateState.candidate.verifiedSkills,
        missingSkills: candidateState.candidate.missingSkills,
        gatekeeperCriteria: candidateState.candidate.gatekeeperCriteria,
        actionPlan: [
          { step: 1, title: 'Build REST API with Express & Node', description: 'Complete hands-on sprint: auth tokens, CRUD endpoints, and test suite. (+8% Match)', boost: 8 },
          { step: 2, title: 'NoSQL Data Modeling in MongoDB', description: 'Connect database schema with Mongoose, build indexing and aggregation queries. (+4% Match)', boost: 4 },
          { step: 3, title: 'Take ABC Tech Simulated Assessment', description: 'Verify backend mastery through our calibrated 45-minute simulator test. (+2% Match)', boost: 2 }
        ]
      }
    });
  });

  // 4. Live Coding Contest Details & Code Execution Engine
  app.get('/api/arena/contest', (req: Request, res: Response) => {
    res.json({
      status: 'success',
      data: candidateState.contest
    });
  });

  // Execute Public Test Cases (Node.js Rate Limiter)
  app.post('/api/arena/run-tests', (req: Request, res: Response) => {
    const { code, language } = req.body;
    
    // Simulate real sandbox execution of Token Bucket algorithm
    const executionStart = Date.now();
    
    // Check if the user code includes RateLimiter class and allowRequest method
    const codeString = code || candidateState.contest.currentCode;
    const hasRateLimiter = codeString.includes('class RateLimiter') || codeString.includes('function RateLimiter');
    const hasAllowRequest = codeString.includes('allowRequest');

    const duration = 38 + Math.floor(Math.random() * 8); // 38-45ms
    const memory = (41.8 + Math.random() * 1.2).toFixed(1); // ~42.4 MB

    if (hasRateLimiter && hasAllowRequest) {
      res.json({
        status: 'success',
        allPassed: true,
        passedCount: 3,
        totalCount: 3,
        executionTimeMs: duration,
        peakMemoryMb: memory,
        memoryLimitMb: 256,
        testCases: [
          {
            id: 1,
            title: 'Test Case 1: Standard Load',
            input: '40 requests sequentially from 10.0.0.1',
            expected: 'Tokens: 100 → 60',
            actual: 'Tokens: 100 → 60',
            status: '200 OK',
            latencyMs: 12,
            passed: true
          },
          {
            id: 2,
            title: 'Test Case 2: Burst Traffic Limit',
            input: '105 rapid calls in 500ms from single client IP',
            expected: 'Expect 429 on req #101',
            actual: 'Matched 429',
            status: 'Matched 429',
            latencyMs: 15,
            passed: true
          },
          {
            id: 3,
            title: 'Test Case 3: Refill Validation',
            input: 'Bucket emptied, delay 600ms, retry query',
            expected: 'Tokens refilled: +1.0',
            actual: 'Pass (+1 token)',
            status: 'Pass (+1 token)',
            latencyMs: 14,
            passed: true
          }
        ],
        logs: [
          `[Node.js v18.17.0 sandbox] Initialized RateLimiter(capacity=100, refillRate=100/60000)`,
          `[Test 1] Dispatched 40 requests sequentially. Remaining tokens: 60. All 200 OK. [12ms]`,
          `[Test 2] Fired burst load of 105 requests. Requests 1-100 accepted. Request 101 throttled with 429 Too Many Requests. [15ms]`,
          `[Test 3] Refill delta evaluated at +600ms. Restored +1.0 tokens. Success. [14ms]`
        ]
      });
    } else {
      res.json({
        status: 'error',
        allPassed: false,
        passedCount: 0,
        totalCount: 3,
        executionTimeMs: duration,
        peakMemoryMb: memory,
        error: 'Syntax or Implementation Error: RateLimiter class or allowRequest() method missing.'
      });
    }
  });

  // Submit Final Solution & Calculate Score
  app.post('/api/arena/submit', (req: Request, res: Response) => {
    // Hidden tests pass!
    // Boost readiness score from 78% to 84%
    if (candidateState.candidate.readinessScore < 84) {
      candidateState.candidate.readinessScore = 84;
    }
    candidateState.contest.candidateRank = 11;

    res.json({
      status: 'success',
      score: 150,
      totalScore: 300,
      rank: 11,
      totalParticipants: 428,
      newReadinessScore: candidateState.candidate.readinessScore,
      hiddenTestsPassed: 7,
      hiddenTestsTotal: 7,
      message: 'All 10 test cases passed! +150 Points awarded. Candidate Readiness boosted to 84%!'
    });
  });

  // 5. 3-Pillar Sprint Activation
  app.post('/api/sprint/start', (req: Request, res: Response) => {
    candidateState.candidate.sprintEnrolled = true;
    candidateState.courseEnrollment.enrolled = true;
    candidateState.candidate.readinessScore = Math.max(candidateState.candidate.readinessScore, 82);

    res.json({
      status: 'success',
      message: '3-Pillar Sprint Activated! Direct placement pipeline unlocked.',
      projectedScore: 92,
      currentScore: candidateState.candidate.readinessScore,
      estimatedSprintDays: 12
    });
  });

  // 6. Book Mentorship Session
  app.post('/api/mentorship/book', (req: Request, res: Response) => {
    const { slot } = req.body;
    candidateState.mentorshipBooking.bookedSlot = slot || 'Today 5:00 PM IST';

    res.json({
      status: 'success',
      mentor: candidateState.mentorshipBooking.mentor,
      slot: candidateState.mentorshipBooking.bookedSlot,
      message: `Mentorship session confirmed with ${candidateState.mentorshipBooking.mentor} for ${candidateState.mentorshipBooking.bookedSlot}.`
    });
  });

  // 7. Export Readiness Report
  app.get('/api/reports/readiness-export', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="JobFit_Readiness_Report_Rahul_Sharma.json"');
    res.json({
      reportTitle: 'JobFit Candidate Readiness & ATS Calibration Report',
      generatedAt: new Date().toISOString(),
      candidate: candidateState.candidate,
      recommendationSummary: 'Candidate is eligible for expedited interview consideration upon completing Node.js Express rate-limiter and MongoDB schema modules.'
    });
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`JobFit Express server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
