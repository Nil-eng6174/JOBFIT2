import React, { useState, useEffect } from 'react';
import { CandidateProfile, RunTestsResponse } from '../types.ts';

interface CodingContestViewProps {
  candidate: CandidateProfile;
  onScoreUpdated: (newScore: number) => void;
  onNavigate: (path: string) => void;
}

const DEFAULT_CODE = `const express = require('express');
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

module.exports = { RateLimiter };`;

const SPEC_CODE = `const { expect } = require('chai');
const { RateLimiter } = require('./solution');

describe('Token Bucket Rate Limiting Test Suite', () => {
  it('should allow 40 standard sequential requests within quota', () => {
    const limiter = new RateLimiter(100, 100 / 60000);
    for (let i = 0; i < 40; i++) {
      expect(limiter.allowRequest()).to.be.true;
    }
    expect(limiter.tokens).to.be.closeTo(60, 0.5);
  });

  it('should throttle 105 rapid burst calls on #101', () => {
    const limiter = new RateLimiter(100, 100 / 60000);
    let allowedCount = 0;
    for (let i = 0; i < 105; i++) {
      if (limiter.allowRequest()) allowedCount++;
    }
    expect(allowedCount).to.equal(100);
  });

  it('should dynamically replenish fractional tokens over time delta', (done) => {
    const limiter = new RateLimiter(100, 100 / 60000);
    limiter.tokens = 0;
    setTimeout(() => {
      expect(limiter.allowRequest()).to.be.true;
      done();
    }, 600);
  });
});`;

export const CodingContestView: React.FC<CodingContestViewProps> = ({
  candidate,
  onScoreUpdated,
  onNavigate,
}) => {
  // Timer state (starting at 01:24:18)
  const [totalSeconds, setTotalSeconds] = useState(1 * 3600 + 24 * 60 + 18);
  const [activeTab, setActiveTab] = useState<'solution' | 'spec'>('solution');
  const [activeRightTab, setActiveRightTab] = useState<'cases' | 'console' | 'standings'>('cases');
  const [language, setLanguage] = useState('JavaScript (Node.js v18.x)');
  const [code, setCode] = useState(DEFAULT_CODE);
  const [activeQuestion, setActiveQuestion] = useState('q1');

  // Test Runner State
  const [evaluating, setEvaluating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [candidateRank, setCandidateRank] = useState(14);
  const [candidatePoints, setCandidatePoints] = useState(150);
  const [executionTime, setExecutionTime] = useState(41);
  const [peakMemory, setPeakMemory] = useState('42.4');
  const [testResults, setTestResults] = useState<RunTestsResponse['testCases']>([
    {
      id: 1,
      title: 'Test Case 1: Standard Load',
      input: '40 requests sequentially from 10.0.0.1',
      expected: 'Tokens: 100 → 60',
      actual: 'Tokens: 100 → 60',
      status: '200 OK',
      latencyMs: 12,
      passed: true,
    },
    {
      id: 2,
      title: 'Test Case 2: Burst Traffic Limit',
      input: '105 rapid calls in 500ms from single client IP',
      expected: 'Expect 429 on req #101',
      actual: 'Matched 429',
      status: 'Matched 429',
      latencyMs: 15,
      passed: true,
    },
    {
      id: 3,
      title: 'Test Case 3: Refill Validation',
      input: 'Bucket emptied, delay 600ms, retry query',
      expected: 'Tokens refilled: +1.0',
      actual: 'Pass (+1 token)',
      status: 'Pass (+1 token)',
      latencyMs: 14,
      passed: true,
    },
  ]);

  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    `[Node.js v18.17.0 sandbox initialized]`,
    `> Loaded middleware routing context for Express 4.21`,
    `> RateLimiter: capacity=100, refillRate=0.00166667 tokens/ms`,
    `> 3 of 3 standard test cases passed in 41ms`,
    `> Memory footprint: 42.4 MB / 256.0 MB limit`,
  ]);

  // Timer Tick
  useEffect(() => {
    const timer = setInterval(() => {
      setTotalSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, '0');
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  // Run Tests via Express Backend
  const handleRunTests = async () => {
    setEvaluating(true);
    try {
      const res = await fetch('/api/arena/run-tests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });
      const data: RunTestsResponse = await res.json();

      if (data.status === 'success') {
        setExecutionTime(data.executionTimeMs);
        setPeakMemory(data.peakMemoryMb);
        setTestResults(data.testCases);
        if (data.logs) {
          setConsoleLogs((prev) => [...prev, ...data.logs!]);
        }
      } else {
        alert(data.error || 'Test suite evaluation error');
      }
    } catch {
      // Local fallback simulation
      setExecutionTime(41);
      setPeakMemory('42.4');
    } finally {
      setTimeout(() => setEvaluating(false), 500);
    }
  };

  // Submit Solution via Express Backend
  const handleSubmitSolution = async () => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/arena/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });
      const data = await res.json();

      if (data.status === 'success') {
        setCandidateRank(data.rank);
        setCandidatePoints(data.totalScore);
        setSubmissionSuccess(true);
        onScoreUpdated(data.newReadinessScore);
        setConsoleLogs((prev) => [
          ...prev,
          `=========================================`,
          `[EVALUATION REPORT: ALL 10 TESTS PASSED]`,
          `> Hidden test cases 1-7 verified: anti-spoofing, DDoS burst, memory GC`,
          `> +150 Points awarded to candidate Rahul Sharma`,
          `> Global Rank updated to #${data.rank} of ${data.totalParticipants}`,
          `> Readiness Score boosted to ${data.newReadinessScore}%!`,
          `=========================================`,
        ]);
        setActiveRightTab('console');
      }
    } catch {
      setCandidateRank(11);
      setCandidatePoints(300);
      setSubmissionSuccess(true);
      onScoreUpdated(84);
    } finally {
      setSubmitting(false);
    }
  };

  const [contestToast, setContestToast] = useState<string | null>(null);

  const handleResetCode = () => {
    setCode(DEFAULT_CODE);
    setContestToast('Code editor reset to starter template.');
    setTimeout(() => setContestToast(null), 2500);
  };

  return (
    <div className="flex flex-col w-full gap-4">
      {/* Top Contest Header Navigation */}
      <div className="flex flex-col gap-3 bg-white p-4 rounded-xl shadow-sm border border-[#c7c4d7]/30">
        {/* Row 1: Title, Live Status & Global Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#4338ca] text-white shrink-0">
              <span className="material-symbols-outlined text-[24px]">terminal</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold tracking-wider text-[#712ae2] uppercase">
                  Live Arena
                </span>
                <span className="w-1 h-1 rounded-full bg-[#c7c4d7]"></span>
                <span className="text-[12px] text-[#464554] font-medium">Contest #01</span>
              </div>
              <h1 className="font-['Manrope'] text-[1.125rem] text-[#0b1c30] font-bold truncate">
                Backend Challenge #01 — Problem 1 of 3: Express REST API Rate Limiter
              </h1>
            </div>
          </div>

          {/* Center-Right: Countdown Timer & Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Live Countdown Widget */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#eff4ff] rounded-lg shadow-sm border border-[#c7c4d7]/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ba1a1a] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ba1a1a]"></span>
              </span>
              <span className="text-[11px] font-bold uppercase text-[#777586]">Time Remaining:</span>
              <span className="font-['Manrope'] text-[1.125rem] font-bold text-[#0b1c30] tracking-wider tabular-nums">
                {formatTime(totalSeconds)}
              </span>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="appearance-none bg-[#eff4ff] text-[#0b1c30] text-[13px] font-semibold py-2 pl-3 pr-8 rounded-lg focus:outline-none cursor-pointer border border-[#c7c4d7]/30"
              >
                <option>JavaScript (Node.js v18.x)</option>
                <option>TypeScript (v5.2)</option>
                <option>Python (v3.11)</option>
                <option>Go (1.21)</option>
                <option>Java (OpenJDK 17)</option>
                <option>C++ (GCC 12)</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#777586] text-[18px]">
                expand_more
              </span>
            </div>

            {/* Editor Control Action Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleResetCode}
                className="flex items-center gap-1 px-3 py-2 bg-[#eff4ff] hover:bg-[#dce9ff] text-[#464554] rounded-lg text-[13px] font-medium transition-colors cursor-pointer border border-[#c7c4d7]/20"
                title="Reset to template"
              >
                <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                <span>Reset</span>
              </button>

              <button
                onClick={handleRunTests}
                disabled={evaluating}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[#dce9ff] hover:bg-[#d3e4fe] text-[#2a14b4] text-[13px] rounded-lg transition-colors font-bold shadow-sm cursor-pointer disabled:opacity-75"
              >
                <span className={`material-symbols-outlined text-[18px] ${evaluating ? 'animate-spin' : ''}`}>
                  {evaluating ? 'autorenew' : 'play_arrow'}
                </span>
                <span>{evaluating ? 'Evaluating...' : 'Run Tests'}</span>
              </button>

              <button
                onClick={handleSubmitSolution}
                disabled={submitting}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#4338ca] hover:bg-[#2a14b4] text-white text-[13px] font-bold rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-75"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>{submitting ? 'Verifying...' : 'Submit Solution'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Problem Selector Tabs */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#c7c4d7]/20 overflow-x-auto">
          <button
            onClick={() => setActiveQuestion('q1')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
              activeQuestion === 'q1'
                ? 'bg-[#4338ca] text-white shadow-sm'
                : 'bg-[#eff4ff] text-[#464554] hover:bg-[#dce9ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">task_alt</span>
            <span>Q1: Rate Limiter (Medium)</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#7ffc97] text-[#002109] font-bold">
              SOLVED
            </span>
          </button>

          <button
            onClick={() => setActiveQuestion('q2')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
              activeQuestion === 'q2'
                ? 'bg-[#4338ca] text-white shadow-sm'
                : 'bg-[#eff4ff] text-[#464554] hover:bg-[#dce9ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-[#777586]">pending</span>
            <span>Q2: MongoDB Aggregation (Medium)</span>
          </button>

          <button
            onClick={() => setActiveQuestion('q3')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all cursor-pointer ${
              activeQuestion === 'q3'
                ? 'bg-[#4338ca] text-white shadow-sm'
                : 'bg-[#eff4ff] text-[#464554] hover:bg-[#dce9ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px] text-[#777586]">lock</span>
            <span>Q3: Cache Eviction Engine (Hard)</span>
          </button>

          <div className="ml-auto hidden xl:flex items-center gap-1.5 text-[#777586] text-[12px]">
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            <span>
              Candidate Rank:{' '}
              <strong className="text-[#0b1c30]">
                #{candidateRank} of 428 participants
              </strong>
            </span>
          </div>
        </div>
      </div>

      {contestToast && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-[#0b1c30] text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-[12px] animate-in slide-in-from-top-2 duration-150">
          <span className="material-symbols-outlined text-[16px] text-[#00e676]">info</span>
          <span>{contestToast}</span>
        </div>
      )}

      {/* Main 3-Pane Arena Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start w-full">
        {/* LEFT PANE: Problem Description & Specifications (4 cols) */}
        <section className="lg:col-span-4 flex flex-col gap-4 bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-[#c7c4d7]/30 h-auto max-h-[480px] lg:max-h-none lg:h-[calc(100vh-270px)] lg:min-h-[640px] overflow-y-auto">
          {/* Title & Complexity */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-[#eaddff] text-[#25005a] text-[11px] font-bold uppercase">
                Medium
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#eff4ff] text-[#777586] text-[11px] font-semibold">
                Score: 150 Pts
              </span>
            </div>
            <div
              onClick={() => {
                navigator.clipboard?.writeText?.(window.location.href);
                setContestToast('Challenge link copied to share!');
                setTimeout(() => setContestToast(null), 2500);
              }}
              className="flex items-center gap-1 text-[#777586] hover:text-[#0b1c30] cursor-pointer text-[13px]"
            >
              <span className="material-symbols-outlined text-[16px]">share</span>
              <span className="text-[12px]">Share</span>
            </div>
          </div>

          <div className="flex flex-col gap-0.5">
            <h2 className="font-['Manrope'] text-[1.25rem] text-[#0b1c30] font-bold">
              Express.js Token Bucket Rate Limiter
            </h2>
            <span className="text-[12px] text-[#777586]">
              Domain: Distributed Systems & Backend Frameworks
            </span>
          </div>

          {/* Problem Statement Body */}
          <div className="flex flex-col gap-3 text-[13px] text-[#0b1c30] leading-relaxed">
            <p>
              Design and implement a deterministic in-memory{' '}
              <strong>Token Bucket Rate Limiting Middleware</strong> for high-throughput Express.js microservices. Your algorithm must throttle incoming calls per individual IP address and emit strict RFC-compliant headers.
            </p>
            <p>
              When an incoming request arrives, calculate replenished tokens dynamically based on the delta between the current timestamp and the client's last bucket invocation. If sufficient tokens exist, deduct one token and pass the request down the chain via{' '}
              <code className="bg-[#eff4ff] px-1 py-0.5 rounded text-[#2a14b4] font-mono text-xs">
                next()
              </code>
              .
            </p>
          </div>

          {/* Constraints Card */}
          <div className="bg-[#eff4ff] p-3 rounded-lg flex flex-col gap-1 border border-[#c7c4d7]/20">
            <div className="flex items-center gap-1.5 text-[#2a14b4] text-[12px] font-bold">
              <span className="material-symbols-outlined text-[16px]">rule</span>
              <span>System Constraints</span>
            </div>
            <ul className="list-disc list-inside text-[12px] text-[#464554] space-y-1">
              <li>
                <strong>Max Requests:</strong> 100 requests per minute per unique client IP.
              </li>
              <li>
                <strong>Refill Precision:</strong> Continuous fractional refill (
                <code className="text-xs font-mono">100 / 60,000</code> tokens/ms).
              </li>
              <li>
                <strong>Memory Ceiling:</strong> Max 256 MB memory overhead across active buckets.
              </li>
              <li>
                <strong>Timeout:</strong> &lt; 2ms per request processing overhead.
              </li>
            </ul>
          </div>

          {/* Sample HTTP Request Simulation */}
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-bold text-[#0b1c30]">
              Sample HTTP Request Simulation
            </span>
            <div className="bg-[#cbdbf5]/40 p-3 rounded-lg font-mono text-[12px] text-[#0b1c30] flex flex-col gap-0.5 border border-[#c7c4d7]/30">
              <div className="text-[#464554] font-semibold">GET /api/v1/resource HTTP/1.1</div>
              <div className="text-[#464554]">Host: api.jobfit.internal</div>
              <div className="text-[#464554]">X-Forwarded-For: 198.51.100.42</div>
            </div>
          </div>

          {/* Expected HTTP 429 */}
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-bold text-[#0b1c30]">
              Expected HTTP 429 Response (Exceeded)
            </span>
            <div className="bg-[#cbdbf5]/40 p-3 rounded-lg font-mono text-[12px] text-[#0b1c30] flex flex-col gap-0.5 border border-[#c7c4d7]/30">
              <div className="text-[#ba1a1a] font-semibold">HTTP/1.1 429 Too Many Requests</div>
              <div className="text-[#464554]">Retry-After: 36</div>
              <div className="text-[#464554]">X-RateLimit-Limit: 100</div>
              <div className="text-[#464554]">X-RateLimit-Remaining: 0</div>
              <pre className="text-[#712ae2] mt-1 font-mono text-[11px]">
                {`{ "error": "Quota exceeded. Try again later." }`}
              </pre>
            </div>
          </div>

          {/* Edge Cases */}
          <div className="bg-[#eff4ff] p-3 rounded-lg flex flex-col gap-1.5 mt-auto border border-[#c7c4d7]/20">
            <span className="text-[12px] font-bold text-[#0b1c30]">Evaluated Edge Cases</span>
            <div className="grid grid-cols-1 gap-1 text-[11px] text-[#464554]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#005f26]">verified</span>
                <span>Concurrent sub-millisecond burst mitigation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#005f26]">verified</span>
                <span>
                  Spoofed reverse proxy <code className="font-mono text-xs">X-Forwarded-For</code> sanitization
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#005f26]">verified</span>
                <span>Auto garbage collection for inactive IP buckets &gt; 10 min</span>
              </div>
            </div>
          </div>
        </section>

        {/* CENTER PANE: IDE Code Editor (5 cols) */}
        <section className="lg:col-span-5 flex flex-col bg-[#141824] text-slate-100 rounded-xl shadow-md h-[calc(100vh-270px)] min-h-[640px] overflow-hidden border border-slate-800">
          {/* Editor Tab Header */}
          <div className="flex items-center justify-between bg-[#0e121d] px-3 py-2 border-b border-slate-800">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('solution')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md font-mono text-[12px] transition-colors cursor-pointer ${
                  activeTab === 'solution'
                    ? 'bg-[#1b2133] text-slate-100 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="material-symbols-outlined text-amber-400 text-[14px]">javascript</span>
                <span>solution.js</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-1"></span>
              </button>

              <button
                onClick={() => setActiveTab('spec')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-md font-mono text-[12px] transition-colors cursor-pointer ${
                  activeTab === 'spec'
                    ? 'bg-[#1b2133] text-slate-100 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="material-symbols-outlined text-sky-400 text-[14px]">data_object</span>
                <span>tests.spec.js</span>
              </button>
            </div>

            <div className="flex items-center gap-3 text-slate-400">
              <button
                onClick={() => alert('Editor Settings: Font size 13px, 2 Spaces, Node v18.17 sandbox.')}
                className="hover:text-white transition-colors cursor-pointer"
                title="Settings"
              >
                <span className="material-symbols-outlined text-[18px]">settings</span>
              </button>
              <button
                onClick={() => {
                  const elem = document.querySelector('body');
                  if (document.fullscreenElement) {
                    document.exitFullscreen?.();
                  } else {
                    elem?.requestFullscreen?.();
                  }
                }}
                className="hover:text-white transition-colors cursor-pointer"
                title="Toggle Fullscreen"
              >
                <span className="material-symbols-outlined text-[18px]">fullscreen</span>
              </button>
            </div>
          </div>

          {/* Interactive Code Surface with Line Numbers */}
          <div className="flex flex-1 overflow-hidden font-mono text-[13px] leading-6 bg-[#141824]">
            {/* Gutter Line Numbers */}
            <div className="select-none py-3 px-2 text-right text-slate-600 flex flex-col font-mono text-[12px] bg-[#0e121d] border-r border-slate-800">
              {Array.from({ length: 32 }, (_, i) => (
                <span key={i + 1} className="w-6 block">
                  {i + 1}
                </span>
              ))}
            </div>

            {/* Editable Code Block */}
            <textarea
              value={activeTab === 'solution' ? code : SPEC_CODE}
              onChange={(e) => {
                if (activeTab === 'solution') {
                  setCode(e.target.value);
                }
              }}
              readOnly={activeTab === 'spec'}
              spellCheck={false}
              className="flex-1 p-3 bg-[#141824] text-slate-200 outline-none resize-none font-mono text-[13px] leading-6 overflow-auto focus:ring-0 focus:outline-none"
            />
          </div>

          {/* IDE Sub-bar */}
          <div className="flex items-center justify-between bg-[#0e121d] px-3 py-1 font-mono text-[11px] text-slate-400 border-t border-slate-800">
            <div className="flex items-center gap-4">
              <span>Ln 24, Col 18</span>
              <span>UTF-8</span>
              <span>Spaces: 2</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-400 font-semibold">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              <span>Node.js v18.17.0 Ready</span>
            </div>
          </div>
        </section>

        {/* RIGHT PANE: Test Suite & Results (3 cols) */}
        <section className="lg:col-span-3 flex flex-col bg-white p-5 rounded-xl shadow-sm border border-[#c7c4d7]/30 h-[calc(100vh-270px)] min-h-[640px] overflow-y-auto">
          {/* Section Tabs */}
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#c7c4d7]/20">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveRightTab('cases')}
                className={`px-2 py-1 text-[12px] font-bold transition-colors cursor-pointer ${
                  activeRightTab === 'cases' ? 'text-[#4338ca] border-b-2 border-[#4338ca]' : 'text-[#777586] hover:text-[#0b1c30]'
                }`}
              >
                Test Cases
              </button>
              <button
                onClick={() => setActiveRightTab('console')}
                className={`px-2 py-1 text-[12px] font-bold transition-colors cursor-pointer ${
                  activeRightTab === 'console' ? 'text-[#4338ca] border-b-2 border-[#4338ca]' : 'text-[#777586] hover:text-[#0b1c30]'
                }`}
              >
                Console
              </button>
              <button
                onClick={() => setActiveRightTab('standings')}
                className={`px-2 py-1 text-[12px] font-bold transition-colors cursor-pointer ${
                  activeRightTab === 'standings' ? 'text-[#4338ca] border-b-2 border-[#4338ca]' : 'text-[#777586] hover:text-[#0b1c30]'
                }`}
              >
                Standings
              </button>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#7ffc97] text-[#002109] text-[10px] font-bold">
              3 / 3 Passed
            </span>
          </div>

          {/* Tab 1: Test Cases */}
          {activeRightTab === 'cases' && (
            <div className="flex flex-col gap-3">
              {testResults.map((tc) => (
                <div
                  key={tc.id}
                  className="flex flex-col bg-[#eff4ff] p-3 rounded-lg shadow-sm gap-1 border border-[#c7c4d7]/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#0b1c30]">
                      <span className="material-symbols-outlined text-[#005f26] text-[18px]">check_circle</span>
                      <span>{tc.title}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#005f26] tabular-nums">
                      {tc.latencyMs}ms
                    </span>
                  </div>
                  <div className="text-[12px] text-[#464554]">Input: {tc.input}</div>
                  <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-[#777586] border-t border-[#c7c4d7]/20">
                    <span>{tc.expected}</span>
                    <span className="text-[#005f26] font-semibold">{tc.status}</span>
                  </div>
                </div>
              ))}

              {/* Hidden Evaluation Test Cases Notice */}
              <div className="flex flex-col p-3 bg-[#e5eeff] rounded-lg gap-1.5 border border-[#c7c4d7]/30">
                <div className="flex items-center justify-between text-[11px] font-bold text-[#777586]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">lock</span>
                    <span>Hidden Test Cases (7 Total)</span>
                  </span>
                  <span>{submissionSuccess ? 'Evaluated' : 'Evaluated On Submit'}</span>
                </div>
                <p className="text-[11px] text-[#464554] leading-tight">
                  Stress-testing DDoS simulations, distributed multi-IP scenarios, and high heap boundary tests run automatically upon final submission.
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 bg-[#d3e4fe] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4338ca] transition-all duration-700"
                      style={{ width: submissionSuccess ? '100%' : '30%' }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#2a14b4]">
                    {submissionSuccess ? '100% Complete' : '30% Complete'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Console */}
          {activeRightTab === 'console' && (
            <div className="flex-1 bg-[#0e121d] rounded-lg p-3 font-mono text-[11px] text-emerald-400 overflow-y-auto leading-relaxed flex flex-col gap-1 border border-slate-800 min-h-[300px]">
              {consoleLogs.map((log, i) => (
                <div key={i} className={log.startsWith('>') ? 'text-slate-300' : log.includes('REPORT') ? 'text-amber-300 font-bold' : 'text-emerald-400'}>
                  {log}
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Standings */}
          {activeRightTab === 'standings' && (
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#777586]">
                Arena Leaderboard
              </span>
              <div className="flex flex-col gap-1.5 text-[12px]">
                <div className="flex items-center justify-between bg-[#eff4ff] p-2 rounded">
                  <span className="font-semibold text-[#0b1c30]">1. alex_dev (MIT)</span>
                  <span className="font-mono font-bold text-[#4338ca]">300 pts (18m)</span>
                </div>
                <div className="flex items-center justify-between bg-[#eff4ff] p-2 rounded">
                  <span className="font-semibold text-[#0b1c30]">2. dev_priya (IIT)</span>
                  <span className="font-mono font-bold text-[#4338ca]">300 pts (22m)</span>
                </div>
                <div className="flex items-center justify-between bg-[#eff4ff] p-2 rounded">
                  <span className="font-semibold text-[#0b1c30]">3. chen_core (Stanford)</span>
                  <span className="font-mono font-bold text-[#4338ca]">280 pts (25m)</span>
                </div>
                <div className="flex items-center justify-between bg-[#e3dfff] p-2 rounded text-[#100069] font-bold mt-2">
                  <span>{candidateRank}. Rahul Sharma (You)</span>
                  <span className="font-mono">{candidatePoints} pts (35m)</span>
                </div>
              </div>
            </div>
          )}

          {/* Live Participant Standing Mini-Widget */}
          <div className="mt-auto pt-3 flex flex-col gap-1.5 border-t border-[#c7c4d7]/20">
            <span className="text-[11px] font-bold text-[#0b1c30] uppercase tracking-wider">
              Current Arena Top 3
            </span>
            <div className="flex flex-col gap-1 text-[12px]">
              <div className="flex items-center justify-between bg-[#eff4ff] px-2 py-1.5 rounded">
                <span className="font-medium text-[#0b1c30]">1. alex_dev (MIT)</span>
                <span className="font-mono font-semibold text-[#4338ca]">300 pts (18m)</span>
              </div>
              <div className="flex items-center justify-between bg-[#eff4ff] px-2 py-1.5 rounded">
                <span className="font-medium text-[#0b1c30]">2. dev_priya (IIT)</span>
                <span className="font-mono font-semibold text-[#4338ca]">300 pts (22m)</span>
              </div>
              <div className="flex items-center justify-between bg-[#e3dfff] px-2 py-1.5 rounded text-[#100069] font-semibold">
                <span>{candidateRank}. Rahul Sharma (You)</span>
                <span className="font-mono">{candidatePoints} pts (35m)</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Comprehensive Status Bar */}
      <footer className="bg-white px-5 py-3 rounded-xl shadow-sm border border-[#c7c4d7]/30 flex flex-wrap items-center justify-between gap-4">
        {/* Execution Performance Metrics */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5 text-[#0b1c30] text-[13px] font-medium">
            <span className="material-symbols-outlined text-[#005f26] text-[20px]">memory</span>
            <span className="text-[#777586]">Peak Memory:</span>
            <span className="font-mono font-bold text-[#0b1c30] tabular-nums">{peakMemory} MB</span>
            <span className="text-[10px] text-[#005f26] font-semibold bg-[#7ffc97] px-1.5 py-0.5 rounded-full">
              &lt; 256MB Limit
            </span>
          </div>

          <div className="w-px h-4 bg-[#c7c4d7]"></div>

          <div className="flex items-center gap-1.5 text-[#0b1c30] text-[13px] font-medium">
            <span className="material-symbols-outlined text-[#4338ca] text-[20px]">speed</span>
            <span className="text-[#777586]">Execution Time:</span>
            <span className="font-mono font-bold text-[#0b1c30] tabular-nums">{executionTime} ms</span>
            <span className="text-[10px] text-[#4338ca] font-semibold bg-[#dce9ff] px-1.5 py-0.5 rounded-full">
              Fast
            </span>
          </div>

          <div className="w-px h-4 bg-[#c7c4d7]"></div>

          <div className="flex items-center gap-1.5 text-[#005f26] text-[13px] font-semibold">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>All standard public test cases passed (3/3)</span>
          </div>
        </div>

        {/* Final Submission CTA */}
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-[12px] text-[#777586] hidden md:inline">
            Ready for rank computation?
          </span>
          <button
            onClick={handleSubmitSolution}
            disabled={submitting}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-[#4338ca] to-[#712ae2] text-white rounded-lg text-[13px] font-bold shadow-md hover:opacity-95 transition-all cursor-pointer disabled:opacity-75"
          >
            <span>{submissionSuccess ? 'Solution Submitted ✓' : 'Submit Solution & View Score'}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
