import * as React from "react";
import { useState, useEffect } from "react";
import AuditDashboard from "./components/AuditDashboard";
import JDGeneratorDashboard from "./components/JDGeneratorDashboard";
import FractionalCHRODashboard from "./components/FractionalCHRODashboard";
import {
  Briefcase,
  Users,
  ShieldCheck,
  TrendingDown,
  MessageSquare,
  Sparkles,
  Search,
  FileSpreadsheet,
  Calendar,
  HelpCircle,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Send,
  Building2,
  FileText,
  UserCheck,
  ChevronRight,
  RefreshCw,
  Scale,
  BookOpen,
  Wallet,
  LogOut,
  CheckSquare,
  ClipboardCheck,
  FileBox,
  PieChart
} from "lucide-react";
import { mockCompanies, mockCandidates, mockJobs, mockEmployees, mockComplianceFilings, mockAgents, mockOnboardingExitTasks, mockVendors, mockTrainingManuals } from "./data/mockData.ts";
import { Company, Candidate, Employee, JobOpening, ComplianceFiling, Agent, Message } from "./types.ts";

export default function App() {
  // Navigation categories
  const [activeTab, setActiveTab] = useState<"workspace" | "screener" | "hrbp" | "compliance" | "jobs" | "onboarding" | "payroll" | "training" | "hraudit" | "jdgen" | "chro">("workspace");

  // Company Selection State
  const [selectedCompany, setSelectedCompany] = useState<Company>(mockCompanies[0]);

  // Hyderabad target industry filters
  const [industryFilter, setIndustryFilter] = useState<"ALL" | "IT" | "Pharma" | "SME">("ALL");

  // Agent Workshop Chat State
  const [selectedAgent, setSelectedAgent] = useState<Agent>(mockAgents[0]);
  const [chatHistories, setChatHistories] = useState<Record<string, Message[]>>({
    "agent-sourcing": [
      { id: "s-1", sender: "agent", text: "Hello! I am your Candidate Sourcing Agent. I scan technical directories around Gachibowli, specialized scientific talent pools in Genome Valley, and local SME hubs. Tell me the kind of candidate role or skillset you need sourced!", timestamp: "09:00 AM", agentName: "Candidate Sourcing Agent" }
    ],
    "agent-resume": [
      { id: "r-1", sender: "agent", text: "Welcome. As your Resume Evaluation Agent, I look at competencies, detect skill inflation, assess tenure stability, and map compensation to Cyberabad benchmarks. Try running a match in the Resume Evaluation Lab tab, or paste details here!", timestamp: "09:00 AM", agentName: "Resume Evaluation Agent" }
    ],
    "agent-engagement": [
      { id: "en-1", sender: "agent", text: "Sourcing is just step one—closing requires the perfect outreach. I am ready to write high-converting, localized WhatsApp messages or dynamic LinkedIn templates mentioning Hyderabad landmarks and office complexes like Mindspace or Knowledge City.", timestamp: "09:01 AM", agentName: "Candidate Engagement Agent" }
    ],
    "agent-interview": [
      { id: "in-1", sender: "agent", text: "Ready to coordinate! I synchronize panel availability across Office 365 or Google Workspace, issue tokenized slot requests, and auto-remind candidates via SMS/WhatsApp to keep no-shows below 3%.", timestamp: "09:01 AM", agentName: "Interview Coordination Agent" }
    ],
    "agent-offer": [
      { id: "of-1", sender: "agent", text: "Offer Management active. Ask me how to draft an attractive compensation breakdown (LPA), handle notice buyout requests, or structure variable bonuses to secure candidates.", timestamp: "09:02 AM", agentName: "Offer Management Agent" }
    ],
    "agent-helpdesk": [
      { id: "h-1", sender: "agent", text: "Greetings. I am the 24/7 Employee Helpdesk Agent. I can provide clarification on standard Indian employment policies, provident funds, Telangana model holidays, maternity/paternity support, or insurance schemes.", timestamp: "09:02 AM", agentName: "Employee Helpdesk Agent" }
    ],
    "agent-compliance": [
      { id: "co-1", sender: "agent", text: "Telangana Statutory Audit & Compliance Bot initialized. Ask me about EPF, ESIC, the Telangana Shops & Establishments Act, or filing Form XXIV Half Yearly Returns.", timestamp: "09:03 AM", agentName: "Compliance Monitoring Agent" }
    ],
    "agent-attrition": [
      { id: "at-1", sender: "agent", text: "Neural Attrition simulation operational. Send me employee pulse feedback or current Gachibowli salary benchmarks to estimate flight risk and receive custom retention recipes.", timestamp: "09:03 AM", agentName: "Attrition Prediction Agent" }
    ],
    "agent-analytics": [
      { id: "an-1", sender: "agent", text: "Operational statistics reporting active. I am programmed to design cost-per-hire models, calculate yield metrics, and break down employee satisfaction indexes.", timestamp: "09:04 AM", agentName: "Workforce Analytics Agent" }
    ]
  });

  const [currentMessage, setCurrentMessage] = useState("");
  const [isAgentTyping, setIsAgentTyping] = useState(false);

  // App Jobs State
  const [appJobs, setAppJobs] = useState<JobOpening[]>(mockJobs);
  const [showJobForm, setShowJobForm] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', department: '', experienceRange: '', salaryRange: '', location: '', keySkills: '' });

  const [onboardingTasks, setOnboardingTasks] = useState(mockOnboardingExitTasks);
  const [vendors, setVendors] = useState(mockVendors);
  const [trainings, setTrainings] = useState(mockTrainingManuals);

  // Resume screener state
  const [selectedJob, setSelectedJob] = useState<JobOpening>(mockJobs[0]);
  const [candidateName, setCandidateName] = useState("Aarav Reddy");
  const [candidateIndustry, setCandidateIndustry] = useState<"IT" | "Pharma" | "SME">("IT");
  const [resumeText, setResumeText] = useState(
    `AARAV REDDY\nMobile: +91 98480 12345 | Email: aarav.reddy@hyderabadtech.io\nLocation: HITEC City, Hyderabad\n\nPROFESSIONAL SUMMARY:\nHighly skilled Senior Frontend Developer with 6.5+ years of experience specialized in building responsive web applications using React.js, TypeScript, and modern frontend tools. Well-versed with high-traffic enterprise architectures based in Cyberabad.\n\nTECHNICAL SKILLS:\n* Languages: JavaScript (ES6+), TypeScript, HTML5, CSS3\n* Frameworks/Libraries: React, Tailwind CSS, GraphQL, Redux Toolkit, Node.js, Express\n* Testing & Tools: Jest, Git, Webpack, Docker\n\nEXPERIENCE:\nSenior Software Engineer | Asteria IT Solutions, Madhapur, Hyderabad\nOctober 2022 - Present\n* Architected standard design system components using React & Tailwind, boosting performance by 35%.\n* Collaborated with offshore UI/UX teams on real-time data visualizers.\n* Engineered low-latency interfaces utilizing lazy-loading and state optimizations.\n\nFrontend Engineer | CyberCore Tech Hub, Gachibowli, Hyderabad\nJune 2019 - September 2022\n* Developed consumer-facing modular dashboard components in standard React.\n* Integrated REST and GraphQL APIs into responsive web applications.`
  );

  const [loadingScreening, setLoadingScreening] = useState(false);
  const [screeningResult, setScreeningResult] = useState<{
    suitabilityScore: number;
    skillsMatched: string[];
    skillsMissing: string[];
    stabilityReview: string;
    noticePeriodAssessment: string;
    summaryReport: string;
  } | null>(null);

  // Quick Action: Pre-populate candidate resume
  const prefillResume = (index: number) => {
    if (index === 0) {
      setCandidateName("Aarav Reddy");
      setCandidateIndustry("IT");
      setResumeText(
        `AARAV REDDY\nMobile: +91 98480 12345 | Email: aarav.reddy@hyderabadtech.io\nLocation: HITEC City, Hyderabad\n\nReact, TypeScript, Tailwind CSS, GraphQL, Redux Toolkit, Node.js.\nExperience: 6.5 Years at Asteria IT Solutions, Madhapur, Hyderabad.\nHighly capable, looking for 18 LPA.`
      );
    } else if (index === 1) {
      setCandidateName("Dr. Sai Kiran");
      setCandidateIndustry("Pharma");
      setResumeText(
        `DR. SAI KIRAN\nMobile: +91 91234 56789 | Email: dr.sai.kiran@pharmalabs.in\nLocation: Genome Valley, Hyderabad\n\nHPLC, GMP Compliance, Analytical Chemistry, FDA Auditing, Method Validation.\nExperience: 8 Years at Apex Biopharma Laboratories.\nDeep experience leading global lab standardizations.`
      );
    } else {
      setCandidateName("Nandini Krishnan");
      setCandidateIndustry("SME");
      setResumeText(
        `NANDINI KRISHNAN\nMobile: +91 90000 11122 | Email: nandini.krish@smeproduction.com\nLocation: Patancheru, Hyderabad\n\nInventory Management, Lean Manufacturing, Supply Chain Control, Safety Protocols, Warehouse Logistics.\nExperience: 7 Years supervising local manufacturing plants.`
      );
    }
    setScreeningResult(null);
  };

  // Chat Submission handler
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    const userMsg: Message = {
      id: `m-${Date.now()}`,
      sender: "user",
      text: currentMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const agentId = selectedAgent.id;
    const currentHistory = chatHistories[agentId] || [];
    const updatedHistory = [...currentHistory, userMsg];

    setChatHistories(prev => ({
      ...prev,
      [agentId]: updatedHistory
    }));
    setCurrentMessage("");
    setIsAgentTyping(true);

    try {
      const response = await fetch("/api/agent-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: agentId,
          message: userMsg.text,
          history: updatedHistory.slice(-10) // Limit context window for speed
        })
      });

      let resData;
      try {
        resData = await response.json();
      } catch (e) {}

      if (!response.ok) {
        throw new Error(resData?.error || "Failed to contact agent server.");
      }

      const agentMsg: Message = {
        id: `m-${Date.now() + 1}`,
        sender: "agent",
        text: resData.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        agentName: selectedAgent.name
      };

      setChatHistories(prev => ({
        ...prev,
        [agentId]: [...prev[agentId], agentMsg]
      }));
    } catch (err: any) {
      console.error(err);
      const errorMsg: Message = {
        id: `m-error-${Date.now()}`,
        sender: "agent",
        text: err.message || "System response degraded: Connection lost or API key missing.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        agentName: selectedAgent.name
      };
      setChatHistories(prev => ({
        ...prev,
        [agentId]: [...prev[agentId], errorMsg]
      }));
    } finally {
      setIsAgentTyping(false);
    }
  };

  // Run resume evaluation
  const handleEvaluateResume = async () => {
    setLoadingScreening(true);
    setScreeningResult(null);

    try {
      const response = await fetch("/api/evaluate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateName,
          targetRole: selectedJob.title,
          resumeText,
          jobDescription: `Job Title: ${selectedJob.title}
Department: ${selectedJob.department}
Location: ${selectedJob.location}
Required Experience: ${selectedJob.experienceRange}
Target Compensation: ${selectedJob.salaryRange}
Core Skills Requested: ${selectedJob.keySkills.join(", ")}`,
          industry: candidateIndustry
        })
      });

      if (!response.ok) {
        throw new Error("Resume screening engine encountered a failure.");
      }

      const result = await response.json();
      setScreeningResult(result);
    } catch (err) {
      console.error(err);
      // Hard fallback structured layout showing user error gracefully
      setScreeningResult({
        suitabilityScore: 78,
        skillsMatched: selectedJob.keySkills.slice(0, 2),
        skillsMissing: [selectedJob.keySkills[selectedJob.keySkills.length - 1] || "Leadership Core"],
        stabilityReview: "Simulated Review: Candidate shows stable duration blocks exceeding 3 years. Notice structure looks standard for local Hyderabad corridors.",
        noticePeriodAssessment: "30 days (Standard / Notice buyout possible). Matches regional SLA benchmarks.",
        summaryReport: "Live Gemini Engine offline: Utilizing local cached expert index. Sourced candidate possesses suitable foundational qualifications, but further technical architecture clearance is advised."
      });
    } finally {
      setLoadingScreening(false);
    }
  };

  // Attrition Risk - Query Agent Trigger
  const consultAttritionAgent = (employee: Employee) => {
    const promptText = `Can you provide a Retention Plan & localized recipe for ${employee.name}? 
Tenure: ${employee.tenureMonths} Months. 
Industry Segment: ${employee.industry}. 
Performance Index: ${employee.performanceScore}/5. 
Current Salary Percentile: ${employee.salaryPercentile}th percentile.
Flight Risk Classification: ${employee.flightRisk}.
Risk Context: ${employee.riskDetails}`;

    // Switch to compliance / attrition agent
    const attritionAgent = mockAgents.find(a => a.id === "agent-attrition") || mockAgents[7];
    setSelectedAgent(attritionAgent);
    setActiveTab("workspace");

    // Pre-insert user message in chat
    const agentId = attritionAgent.id;
    const history = chatHistories[agentId] || [];

    const simulatedUserMsg: Message = {
      id: `qm-${Date.now()}`,
      sender: "user",
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistories(prev => ({
      ...prev,
      [agentId]: [...history, simulatedUserMsg]
    }));

    // Trigger API call directly
    setIsAgentTyping(true);
    fetch("/api/agent-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        agentId: "agent-attrition",
        message: promptText,
        history: [...history, simulatedUserMsg].slice(-10)
      })
    })
      .then(res => res.json())
      .then(data => {
        const agentResponse: Message = {
          id: `qm-res-${Date.now()}`,
          sender: "agent",
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          agentName: "Attrition Prediction Agent"
        };
        setChatHistories(prev => ({
          ...prev,
          ["agent-attrition"]: [...prev["agent-attrition"], agentResponse]
        }));
      })
      .catch(() => {
        const fallbackMsg: Message = {
          id: `qm-err-${Date.now()}`,
          sender: "agent",
          text: `Retention Recipe for ${employee.name}:\n1. Immediate compensation check to bridge the ${employee.salaryPercentile < 50 ? 'serious salary gap' : 'market alignment'}.\n2. Address technical alignment feedback.\n3. Explore hybrid structure/subsidized shuttle alternatives to mitigate Hyderabad layout traffic burnout.\n(Please configure GEMINI_API_KEY in Secrets for custom live recipes).`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          agentName: "Attrition Prediction Agent"
        };
        setChatHistories(prev => ({
          ...prev,
          ["agent-attrition"]: [...prev["agent-attrition"], fallbackMsg]
        }));
      })
      .finally(() => {
        setIsAgentTyping(false);
      });
  };

  // Helper render for Agent icons
  const getAgentIcon = (id: string) => {
    switch (id) {
      case "agent-sourcing": return <Search className="w-5 h-5" />;
      case "agent-resume": return <FileSpreadsheet className="w-5 h-5" />;
      case "agent-engagement": return <MessageSquare className="w-5 h-5" />;
      case "agent-interview": return <Calendar className="w-5 h-5" />;
      case "agent-offer": return <Briefcase className="w-5 h-5" />;
      case "agent-helpdesk": return <HelpCircle className="w-5 h-5" />;
      case "agent-compliance": return <ShieldCheck className="w-5 h-5" />;
      case "agent-attrition": return <TrendingDown className="w-5 h-5" />;
      default: return <BarChart3 className="w-5 h-5" />;
    }
  };

  // Pre-compute dynamic metrics for selectedCompany
  const companyCompliance = mockComplianceFilings.filter(f => !f.companyId || f.companyId === selectedCompany.id);
  const overdueFilings = companyCompliance.filter(c => c.status === "overdue").length;
  const compliantPercent = companyCompliance.length > 0 
    ? Math.round(((companyCompliance.length - overdueFilings) / companyCompliance.length) * 100) 
    : 100;
  
  const companyJobs = appJobs.filter(j => !j.companyId || j.companyId === selectedCompany.id);
  const openJobsCount = companyJobs.length;

  const companyEmployees = mockEmployees.filter(e => !e.companyId || e.companyId === selectedCompany.id);
  const highRiskEmployees = companyEmployees.filter(e => e.flightRisk === "High").length;
  const attritionRate = companyEmployees.length > 0 ? ((highRiskEmployees / companyEmployees.length) * 100).toFixed(1) : "0";

  const companyCandidates = mockCandidates.filter(c => !c.companyId || c.companyId === selectedCompany.id);
  
  const compTrainings = trainings.filter(t => !t.companyId || t.companyId === selectedCompany.id);
  
  // Deterministic mock generation based on company id for stable view
  const seed = selectedCompany.id.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  const hiringTat = (12 + (seed % 15)).toFixed(1);
  const offerRate = Math.min(98, 70 + (seed % 28));

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-100 flex flex-col font-sans selection:bg-teal-500 selection:text-[#0d1117] antialiased">
      {/* Top Professional Header */}
      <header className="border-b border-slate-800 bg-[#0d1117]/90 backdrop-blur sticky top-0 z-50 px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-teal-500 to-cyan-500 p-2.5 rounded-xl shadow-lg shadow-teal-500/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#0d1117]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight text-white">INSIGHTHR AI</h1>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  Hyderabad Hub
                </span>
              </div>
              <p className="text-xs text-slate-400">Agentic HR Operating System for IT, Pharma & Emerging SMEs</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-slate-900/60 border border-slate-800/80 rounded-lg px-3 py-1.5 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>9 Autonomous Agents Online</span>
            </div>
            <div className="text-xs bg-teal-900/40 border border-teal-500/30 text-teal-300 rounded-lg px-3 py-1.5 font-mono">
              ₹1.2Cr MRR Run-rate target reached
            </div>
          </div>
        </div>
      </header>

      {/* Main Container Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        
        {/* Brand Focus Section */}
        <section className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-teal-400" />
              SME Regional Focus: Telangana Corporate Corridors
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Serving the unique demands of heavy technologist pipelines in <strong className="text-teal-300">HITEC City & Gachibowli</strong>, complex scientific validation systems in the <strong className="text-teal-300">Genome Valley Pharma Cluster</strong>, and logistics scalability constraints within industrial manufacturing divisions in <strong className="text-cyan-300">Patancheru & Jeedimetla</strong>.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full lg:w-1/3">
            <div className="flex flex-wrap gap-2 w-full lg:w-auto">
              {["ALL", "IT", "Pharma", "SME"].map((ind) => (
                <button
                  key={ind}
                  onClick={() => setIndustryFilter(ind as any)}
                  className={`flex-1 lg:flex-none text-xs font-semibold px-3 py-1.5 rounded-lg transition-all border ${
                    industryFilter === ind
                      ? "bg-teal-500 text-[#0d1117] border-teal-400 shadow-lg shadow-teal-500/10 font-bold"
                      : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700"
                  }`}
                >
                  {ind === "ALL" ? "All Sectors" : ind === "IT" ? "IT" : ind === "Pharma" ? "Pharma" : "SME"}
                </button>
              ))}
            </div>
            <div className="w-full">
               <label className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Active Company Context</label>
               <select 
                 className="w-full bg-slate-900/60 border border-slate-700 text-slate-200 text-sm rounded-lg px-3 py-2 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                 value={selectedCompany.id}
                 onChange={(e) => {
                   const c = mockCompanies.find(comp => comp.id === e.target.value);
                   if (c) setSelectedCompany(c);
                 }}
               >
                 {mockCompanies
                   .filter(c => industryFilter === "ALL" || c.sector === industryFilter)
                   .map(c => (
                   <option key={c.id} value={c.id}>
                     {c.name} ({c.area})
                   </option>
                 ))}
               </select>
            </div>
          </div>
        </section>

        {/* Global Key Operating Metrics Grid */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-4 space-y-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Hiring Turnaround Time</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-white">{hiringTat} Days</span>
              {parseFloat(hiringTat) < 15 ? <span className="text-[10px] text-emerald-400 font-semibold">-xx vs avg</span> : <span className="text-[10px] text-orange-400 font-semibold">avg TAT</span>}
            </div>
            <p className="text-[11px] text-slate-500">SME IT & Pharma index</p>
          </div>
          <div className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-4 space-y-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Offer Acceptance rate</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-white">{offerRate}%</span>
              <span className="text-[10px] text-emerald-400 font-semibold">Healthy</span>
            </div>
            <p className="text-[11px] text-slate-500">Backed by localized engagement</p>
          </div>
          <div className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-4 space-y-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Statutory Settings</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-white">{overdueFilings > 0 ? overdueFilings : "Safe"}</span>
              <span className={`text-[10px] ${overdueFilings === 0 ? "text-teal-400" : "text-red-400"} font-semibold`}>{compliantPercent}% Compliant</span>
            </div>
            <p className="text-[11px] text-slate-500">Telangana EPFO & labor acts</p>
          </div>
          <div className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-4 space-y-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">AI Sourced Candidates</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-white">{companyCandidates.length}</span>
              <span className="text-[10px] text-cyan-400 font-semibold">Pipelines active</span>
            </div>
            <p className="text-[11px] text-slate-500">Mining regional bio & tech indexes</p>
          </div>
          <div className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-4 space-y-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Open Requsitions</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-white">{openJobsCount}</span>
              <span className="text-[10px] text-teal-400 font-semibold">Active Jobs</span>
            </div>
            <p className="text-[11px] text-slate-500">From AI Job Board</p>
          </div>
          <div className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-4 space-y-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">High Attrition Risk</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-white">{highRiskEmployees}</span>
              <span className={`text-[10px] ${parseFloat(attritionRate) > 15 ? "text-orange-400" : "text-teal-400"} font-semibold`}>{attritionRate}%</span>
            </div>
            <p className="text-[11px] text-slate-500">Predicted flight risk flags</p>
          </div>
          <div className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-4 space-y-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Payroll & Vendors</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-white">{vendors.filter(v => !v.companyId || v.companyId === selectedCompany.id).length}</span>
              <span className="text-[10px] text-emerald-400 font-semibold">Processed</span>
            </div>
            <p className="text-[11px] text-slate-500">Active staffing/payroll partners</p>
          </div>
          <div className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-4 space-y-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Training Modules</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-white">{compTrainings.length}</span>
              <span className="text-[10px] text-cyan-400 font-semibold">Available</span>
            </div>
            <p className="text-[11px] text-slate-500">Contextual SME learnings</p>
          </div>
          <div className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-4 space-y-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Audit Score</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-white">{seed % 2 === 0 ? "A-" : "B+"}</span>
              <span className={`text-[10px] ${seed % 2 === 0 ? 'text-teal-400' : 'text-orange-400'} font-semibold`}>Current Rating</span>
            </div>
            <p className="text-[11px] text-slate-500">Annual HR Audit Results</p>
          </div>
          <div className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-4 space-y-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Headcount</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-white">{companyEmployees.length}</span>
              <span className="text-[10px] text-emerald-400 font-semibold">Employees</span>
            </div>
            <p className="text-[11px] text-slate-500">Managed in active system</p>
          </div>
        </section>

        {/* Workspace Operations Navigation Tabs */}
        <section className="flex flex-col gap-4">
          <div className="flex border-b border-slate-800 overflow-x-auto scroller-flat">
            <button
              onClick={() => setActiveTab("workspace")}
              className={`py-3 px-5 text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === "workspace"
                  ? "border-teal-500 text-teal-400 font-bold"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              AI Agent Dialog Workspace
            </button>
            <button
              onClick={() => setActiveTab("screener")}
              className={`py-3 px-5 text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === "screener"
                  ? "border-teal-500 text-teal-400 font-bold"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <FileText className="w-4 h-4" />
              Resume Evaluation Lab
              <span className="text-[10px] bg-teal-500/20 text-teal-300 font-semibold px-1.5 py-0.5 rounded">NEW</span>
            </button>
            <button
              onClick={() => setActiveTab("hrbp")}
              className={`py-3 px-5 text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === "hrbp"
                  ? "border-teal-500 text-teal-400 font-bold"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <TrendingDown className="w-4 h-4" />
              Virtual HRBP Attrition Radar
            </button>
            <button
              onClick={() => setActiveTab("compliance")}
              className={`py-3 px-5 text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === "compliance"
                  ? "border-teal-500 text-teal-400 font-bold"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Scale className="w-4 h-4" />
              Telangana Statutory Gaps
            </button>
            <button
              onClick={() => setActiveTab("jobs")}
              className={`py-3 px-5 text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === "jobs"
                  ? "border-teal-500 text-teal-400 font-bold"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Active Job Board
            </button>
            <button
              onClick={() => setActiveTab("onboarding")}
              className={`py-3 px-5 text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === "onboarding"
                  ? "border-teal-500 text-teal-400 font-bold"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              Onboarding & Exit
            </button>
            <button
              onClick={() => setActiveTab("payroll")}
              className={`py-3 px-5 text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === "payroll"
                  ? "border-teal-500 text-teal-400 font-bold"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Wallet className="w-4 h-4" />
              Payroll & Vendor
            </button>
            <button
              onClick={() => setActiveTab("training")}
              className={`py-3 px-5 text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === "training"
                  ? "border-teal-500 text-teal-400 font-bold"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Training Manuals
            </button>
            <button
              onClick={() => setActiveTab("hraudit")}
              className={`py-3 px-5 text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === "hraudit"
                  ? "border-orange-500 text-orange-400 font-bold"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <ClipboardCheck className="w-4 h-4" />
              HR Audit
            </button>
            <button
              onClick={() => setActiveTab("jdgen")}
              className={`py-3 px-5 text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === "jdgen"
                  ? "border-indigo-500 text-indigo-400 font-bold"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <FileBox className="w-4 h-4" />
              JD & KRA Generator
            </button>
            <button
              onClick={() => setActiveTab("chro")}
              className={`py-3 px-5 text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === "chro"
                  ? "border-blue-500 text-blue-400 font-bold"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <PieChart className="w-4 h-4" />
              Virtual CHRO
            </button>
          </div>

          {/* ACTIVE TAB MAIN RENDER CONTAINER */}
          <div className="min-h-[500px]">

            {activeTab === "hraudit" && <AuditDashboard company={selectedCompany} />}
            {activeTab === "jdgen" && <JDGeneratorDashboard company={selectedCompany} />}
            {activeTab === "chro" && <FractionalCHRODashboard company={selectedCompany} />}

            {/* TAB 1: WORKSPACE */}
            {activeTab === "workspace" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Agent Selector Column */}
                <div className="lg:col-span-4 flex flex-col gap-3">
                  <div className="p-1">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Select HR Agent Specialist</h3>
                    <p className="text-xs text-slate-500">Each agent represents a custom specialized model logic for small businesses.</p>
                  </div>

                  <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                    {mockAgents.map((agent) => (
                      <button
                        key={agent.id}
                        onClick={() => setSelectedAgent(agent)}
                        className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 group relative ${
                          selectedAgent.id === agent.id
                            ? "bg-slate-900 border-teal-500/60 shadow-lg shadow-teal-500/5"
                            : "bg-slate-950/40 border-slate-800/80 hover:border-slate-700/80"
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${
                          selectedAgent.id === agent.id
                            ? "bg-teal-500/10 text-teal-400"
                            : "bg-slate-900 text-slate-400 group-hover:text-slate-200"
                        }`}>
                          {getAgentIcon(agent.id)}
                        </div>

                        <div className="space-y-0.5 flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1.5">
                            <h4 className="font-semibold text-xs sm:text-sm text-slate-200 truncate group-hover:text-white">
                              {agent.name}
                            </h4>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${
                              agent.status === "active" ? "bg-emerald-500/10 text-emerald-400" :
                              agent.status === "working" ? "bg-cyan-500/10 text-cyan-400" : "bg-slate-800 text-slate-400"
                            }`}>
                              {agent.status}
                            </span>
                          </div>
                          
                          <p className="text-[11px] text-slate-400 line-clamp-1 truncate block">
                            {agent.role}
                          </p>

                          <div className="text-[10px] text-slate-500 flex items-center gap-1 pt-1 font-mono">
                            <span className="text-teal-500">▸</span> {agent.metric}
                          </div>
                        </div>

                        {selectedAgent.id === agent.id && (
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded bg-teal-500" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Agent Chat Area Column */}
                <div className="lg:col-span-8 flex flex-col bg-slate-900/30 border border-slate-800/80 rounded-2xl overflow-hidden min-h-[500px]">
                  
                  {/* Current Active Agent Banner */}
                  <div className="bg-slate-900/80 border-b border-slate-800/80 p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-teal-500/10 text-teal-400 p-2.5 rounded-xl border border-teal-500/20">
                        {getAgentIcon(selectedAgent.id)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-base">{selectedAgent.name}</h3>
                          <span className="text-[10px] bg-slate-800 border border-slate-700 font-mono text-slate-400 px-2 py-0.5 rounded-lg">
                            {selectedAgent.role}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{selectedAgent.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Messaging Dialogue Area */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[360px] min-h-[280px]">
                    {(chatHistories[selectedAgent.id] || []).map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex flex-col max-w-[85%] ${
                          msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                        }`}
                      >
                        {msg.sender === "agent" && (
                          <span className="text-[10px] text-teal-400 font-bold mb-1 font-sans">
                            ● {msg.agentName} (InsightHR AI)
                          </span>
                        )}
                        <div
                          className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                            msg.sender === "user"
                              ? "bg-teal-500 text-[#0d1117] font-semibold rounded-tr-none"
                              : "bg-slate-900 border border-slate-800/80 text-slate-200 rounded-tl-none whitespace-pre-line"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[9px] text-slate-500 mt-1 px-1 font-mono">
                          {msg.timestamp}
                        </span>
                      </div>
                    ))}

                    {isAgentTyping && (
                      <div className="flex flex-col items-start max-w-[40%]">
                        <span className="text-[10px] text-teal-400 font-bold mb-1">
                          ● {selectedAgent.name} is computing...
                        </span>
                        <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Message Form Box */}
                  <form onSubmit={handleSendMessage} className="p-4 bg-slate-900/60 border-t border-slate-800/80 flex items-center gap-2">
                    <input
                      type="text"
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      placeholder={`Ask the ${selectedAgent.name} (e.g. specialized templates or compliance steps)...`}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                    />
                    <button
                      type="submit"
                      disabled={isAgentTyping || !currentMessage.trim()}
                      className="bg-teal-500 hover:bg-teal-400 text-[#0d1117] transition-all p-3 rounded-xl font-bold flex items-center justify-center disabled:opacity-40 disabled:hover:bg-teal-500 shadow-md shadow-teal-500/5 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* TAB 2: RESUME EVALUATION LAB */}
            {activeTab === "screener" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Form Column */}
                <div className="lg:col-span-5 bg-slate-900/30 border border-slate-800/80 rounded-2xl p-4 sm:p-6 space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4.5 h-4.5 text-teal-400" />
                      Live AI Competency Screening Portal
                    </h3>
                    <p className="text-xs text-slate-400">Evaluate regional candidates based block-checks and compliance algorithms.</p>
                  </div>

                  {/* One-Click Candidate Pickers */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Quick Prefill Test Cases</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => prefillResume(0)}
                        className={`py-1.5 px-2 rounded border text-xs font-semibold text-center truncate ${
                          candidateName === "Aarav Reddy"
                            ? "bg-teal-500/15 border-teal-500 text-teal-300"
                            : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        Aarav (React/IT)
                      </button>
                      <button
                        onClick={() => prefillResume(1)}
                        className={`py-1.5 px-2 rounded border text-xs font-semibold text-center truncate ${
                          candidateName === "Dr. Sai Kiran"
                            ? "bg-teal-500/15 border-teal-500 text-teal-300"
                            : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        Sai (Pharma QC)
                      </button>
                      <button
                        onClick={() => prefillResume(2)}
                        className={`py-1.5 px-2 rounded border text-xs font-semibold text-center truncate ${
                          candidateName === "Nandini Krishnan"
                            ? "bg-teal-500/15 border-teal-500 text-teal-300"
                            : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        Nandini (SME Op)
                      </button>
                    </div>
                  </div>

                  {/* Form inputs */}
                  <div className="space-y-3 pt-2">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-1">Candidate Name</label>
                        <input
                          type="text"
                          value={candidateName}
                          onChange={(e) => setCandidateName(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 block mb-1">Target Sector</label>
                        <select
                          value={candidateIndustry}
                          onChange={(e) => setCandidateIndustry(e.target.value as any)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-teal-500"
                        >
                          <option value="IT">IT (Cyberabad)</option>
                          <option value="Pharma">Pharma (Genome Valley)</option>
                          <option value="SME">SME Sector</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 block mb-1">Target Job Opening Match</label>
                      <select
                        value={selectedJob.id}
                        onChange={(e) => {
                          const job = mockJobs.find((j) => j.id === e.target.value);
                          if (job) setSelectedJob(job);
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-teal-500"
                      >
                        {appJobs.filter(j => !j.companyId || j.companyId === selectedCompany.id).map((job) => (
                          <option key={job.id} value={job.id}>
                            [{job.industry}] {job.title} ({job.salaryRange})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] font-bold text-slate-400">Candidate Resume / CV Details</label>
                        <div className="flex gap-2">
                           <input type="file" id="cv-upload" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => {
                             if(e.target.files && e.target.files[0]) {
                               setResumeText(`[Uploaded File: ${e.target.files[0].name}]\n\nDetails parsed automatically...`);
                             }
                           }} />
                           <button onClick={() => document.getElementById("cv-upload")?.click()} className="text-[10px] bg-slate-800 text-teal-400 px-2 py-0.5 rounded cursor-pointer hover:bg-slate-700">
                             Upload CV Form
                           </button>
                           <span className="text-[10px] text-slate-500">or type directly</span>
                        </div>
                      </div>
                      <textarea
                        rows={10}
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 font-mono"
                        placeholder="Paste resume content here..."
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleEvaluateResume}
                    disabled={loadingScreening || !resumeText.trim()}
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-[#0d1117] py-3 rounded-lg font-bold text-xs sm:text-sm transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-teal-500/10"
                  >
                    {loadingScreening ? (
                      <>
                        <RefreshCw className="w-4.5 h-4.5 animate-spin" />
                        Analyzing via Resume Evaluation Agent...
                      </>
                    ) : (
                      <>
                        <PlayIcon className="w-4.5 h-4.5" />
                        Run AI Competency Match
                      </>
                    )}
                  </button>
                </div>

                {/* Right Result Column */}
                <div className="lg:col-span-7 space-y-4">
                  {loadingScreening ? (
                    <div className="bg-slate-900/10 border border-dashed border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-4 min-h-[450px]">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-teal-500 animate-spin" />
                        <Sparkles className="w-5 h-5 text-teal-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      <div className="space-y-1 max-w-sm">
                        <h4 className="font-bold text-slate-200">Evaluating against JD requirements...</h4>
                        <p className="text-xs text-slate-500">The agent is evaluating skills coverage, tenure stability, notice timelines, and estimating compatibility scoring indexes.</p>
                      </div>
                    </div>
                  ) : screeningResult ? (
                    <div className="bg-slate-900/20 border border-slate-800 rounded-2xl overflow-hidden min-h-[450px] flex flex-col">
                      
                      {/* Top Banner and Score */}
                      <div className="bg-slate-900 border-b border-slate-800 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-lg text-white">{candidateName}</h4>
                            <span className="text-[10px] bg-teal-500/10 border border-teal-500/20 text-teal-400 font-semibold px-2 py-0.5 rounded">
                              {candidateIndustry} Sector Profile
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">Match Target: {selectedJob.title}</p>
                        </div>

                        {/* Suitability Circle Gauge */}
                        <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
                          <div className="text-right">
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Suitability Score</p>
                            <p className="text-xs text-slate-500">Competence Index</p>
                          </div>
                          <div className={`text-2xl font-black ${
                            screeningResult.suitabilityScore >= 80 ? "text-emerald-400" :
                            screeningResult.suitabilityScore >= 60 ? "text-amber-400" : "text-rose-400"
                          }`}>
                            {screeningResult.suitabilityScore}%
                          </div>
                        </div>
                      </div>

                      {/* Diagnostic breakdown components */}
                      <div className="p-5 flex-1 space-y-6">
                        
                        {/* Skills Chips */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-900 space-y-2">
                            <h5 className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5" />
                              Skills Identified
                            </h5>
                            <div className="flex flex-wrap gap-1.5">
                              {screeningResult.skillsMatched.length > 0 ? (
                                screeningResult.skillsMatched.map((sk) => (
                                  <span key={sk} className="text-xs bg-emerald-500/10 text-emerald-300 font-semibold border border-emerald-500/20 px-2 py-0.5 rounded">
                                    {sk}
                                  </span>
                                ))
                              ) : (
                                <span className="text-xs text-slate-500 italic">No exact matched keywords</span>
                              )}
                            </div>
                          </div>

                          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-900 space-y-2">
                            <h5 className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              Auxiliary Gaps to Check
                            </h5>
                            <div className="flex flex-wrap gap-1.5">
                              {screeningResult.skillsMissing.length > 0 ? (
                                screeningResult.skillsMissing.map((sk) => (
                                  <span key={sk} className="text-xs bg-amber-500/10 text-amber-300 font-semibold border border-amber-500/20 px-2 py-0.5 rounded">
                                    {sk}
                                  </span>
                                ))
                              ) : (
                                <span className="text-xs text-slate-500 italic">No critical missing skill gaps</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Stability Review and Notice Period */}
                        <div className="space-y-4">
                          <div className="flex gap-3 items-start">
                            <div className="bg-teal-500/10 text-teal-400 p-2 rounded-lg border border-teal-500/20 mt-0.5">
                              <ShieldCheck className="w-4 h-4" />
                            </div>
                            <div className="space-y-0.5 flex-1">
                              <h5 className="text-xs font-bold text-slate-200">Employment Stability Assessment</h5>
                              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{screeningResult.stabilityReview}</p>
                            </div>
                          </div>

                          <div className="flex gap-3 items-start">
                            <div className="bg-cyan-500/10 text-cyan-400 p-2 rounded-lg border border-cyan-500/20 mt-0.5">
                              <Calendar className="w-4 h-4" />
                            </div>
                            <div className="space-y-0.5 flex-1">
                              <h5 className="text-xs font-bold text-slate-200">Notice Period & Joining Integrity</h5>
                              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{screeningResult.noticePeriodAssessment}</p>
                            </div>
                          </div>
                        </div>

                        {/* Summary Block */}
                        <div className="bg-slate-950 border border-slate-900 rounded-xl p-4 space-y-2">
                          <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
                            AI Agent Executive Verdict
                          </h5>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic whitespace-pre-line">
                            "{screeningResult.summaryReport}"
                          </p>
                        </div>

                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-900/10 border border-dashed border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3 min-h-[450px]">
                      <FileText className="w-10 h-10 text-slate-600" />
                      <div className="space-y-1 max-w-sm">
                        <h4 className="font-bold text-slate-400">Screening Result Pending</h4>
                        <p className="text-xs text-slate-500">Configure parameters or select a test candidate on the left, then click "Run Competency Match" to run active Gemini screening analysis.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 3: HRBP ATTRITION RADAR */}
            {activeTab === "hrbp" && (
              <div className="space-y-6">
                <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-5 space-y-2">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-teal-400" />
                    InsightHR Virtual HRBP Flight Risk Radar
                  </h3>
                  <p className="text-xs text-slate-400 max-w-4xl">
                    Our AI models utilize satisfaction indices, local Hyderabad tech corridor compensation ratios, commute stress, and pulse notes to flag high-value employees likely to jump. Consult the Attrition Agent instantly with one click.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockEmployees
                    .filter((emp) => !emp.companyId || emp.companyId === selectedCompany.id)
                    .map((emp) => (
                      <div key={emp.id} className="bg-slate-900/20 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8.5 h-8.5 rounded-full bg-slate-800 text-slate-300 font-bold flex items-center justify-center text-xs">
                                {emp.name.split(" ").map(n => n[0]).join("")}
                              </div>
                              <div>
                                <h4 className="font-bold text-sm text-white">{emp.name}</h4>
                                <p className="text-[11px] text-slate-500">{emp.role} • {emp.department}</p>
                              </div>
                            </div>

                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                              emp.flightRisk === "High" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" :
                              emp.flightRisk === "Medium" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                              "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            }`}>
                              Risk: {emp.flightRisk}
                            </span>
                          </div>

                          {/* Stats Grid */}
                          <div className="grid grid-cols-3 gap-2 bg-slate-950/60 border border-slate-900 rounded-lg p-2 text-center">
                            <div>
                              <p className="text-[9px] text-slate-500 uppercase font-bold">Retention Tenure</p>
                              <p className="text-xs font-semibold text-slate-300">{emp.tenureMonths} Months</p>
                            </div>
                            <div>
                              <p className="text-[9px] text-slate-500 uppercase font-bold">Performance Index</p>
                              <p className="text-xs font-semibold text-slate-300">{emp.performanceScore} / 5</p>
                            </div>
                            <div>
                              <p className="text-[9px] text-slate-500 uppercase font-bold">Market Pay Bench</p>
                              <p className={`text-xs font-semibold ${emp.salaryPercentile < 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                                {emp.salaryPercentile}th %tile
                              </p>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Flight Risk Context & Diagnostics</p>
                            <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/20 p-2.5 rounded border border-slate-900/60 font-serif italic text-slate-300">
                              "{emp.riskDetails}"
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => consultAttritionAgent(emp)}
                          className="w-full bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-all text-xs font-bold py-2 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <TrendingDown className="w-3.5 h-3.5 text-teal-400" />
                          Consult AI Agent for Retention Plan
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* TAB 4: TELANGANA STATUTORY COMPLIANCE PORTAL */}
            {activeTab === "compliance" && (
              <div className="space-y-6">
                <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-5 space-y-2">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Scale className="w-5 h-5 text-teal-400" />
                    Telangana Statutory & Labor Law Compliance Track
                  </h3>
                  <p className="text-xs text-slate-400">
                    Small and Medium Enterprises in Hyderabad must adhere strictly to model labor regulations, professional tax records, contract staff registrations (Form XXIV), and online portals. Check warnings or non-compliance trends below.
                  </p>
                </div>

                <div className="space-y-3">
                  {mockComplianceFilings
                    .filter((filing) => !filing.companyId || filing.companyId === selectedCompany.id)
                    .map((filing) => (
                    <div key={filing.id} className="bg-slate-900/10 border border-slate-800/80 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-slate-400">
                            {filing.type} filing
                          </span>
                          <h4 className="font-bold text-sm sm:text-base text-white">{filing.name}</h4>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            filing.status === "compliant" ? "bg-emerald-500/15 text-emerald-400" :
                            filing.status === "warning" ? "bg-amber-500/15 text-amber-400" :
                            "bg-rose-500/15 text-rose-400"
                          }`}>
                            {filing.status.toUpperCase()}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-400">
                          <p>Authority: <strong className="text-slate-300">{filing.authority}</strong></p>
                          <p>Regulatory Cycle: <strong className="text-slate-300">{filing.deadline}</strong></p>
                        </div>

                        <div className="bg-slate-950/40 p-3 rounded border border-slate-900 text-xs text-slate-300 space-y-1.5 leading-relaxed">
                          <p><strong className="text-rose-400 font-semibold">[Non-compliance Penalty]</strong> {filing.penaltyInfo}</p>
                          <p><strong className="text-teal-400 font-semibold">[Statutory Remedy]</strong> {filing.remedyAction}</p>
                        </div>
                      </div>

                      {/* Diagnostic Action Button */}
                      <div className="w-full md:w-auto self-stretch md:self-auto flex items-center">
                        <button
                          onClick={() => {
                            const compAgent = mockAgents.find((a) => a.id === "agent-compliance") || mockAgents[6];
                            setSelectedAgent(compAgent);
                            setActiveTab("workspace");
                            const promptText = `Can you provide a step-by-step guideline checklist and upload documentation requirements for: "${filing.name}" under ${filing.authority}? What registers must an Hyderabad SME maintain to ensure zero defaults?`;
                            
                            const agentId = compAgent.id;
                            const history = chatHistories[agentId] || [];

                            const simulatedUserMsg: Message = {
                              id: `qm-comp-${Date.now()}`,
                              sender: "user",
                              text: promptText,
                              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            };

                            setChatHistories(prev => ({
                              ...prev,
                              [agentId]: [...history, simulatedUserMsg]
                            }));

                            setIsAgentTyping(true);
                            fetch("/api/agent-chat", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                agentId: "agent-compliance",
                                message: promptText,
                                history: [...history, simulatedUserMsg].slice(-10)
                              })
                            })
                              .then(res => res.json())
                              .then(data => {
                                const agentResponse: Message = {
                                  id: `qm-comp-res-${Date.now()}`,
                                  sender: "agent",
                                  text: data.text,
                                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                  agentName: "Compliance Monitoring Agent"
                                };
                                setChatHistories(prev => ({
                                  ...prev,
                                  ["agent-compliance"]: [...prev["agent-compliance"], agentResponse]
                                }));
                              })
                              .catch(() => {
                                const fallbackMsg: Message = {
                                  id: `qm-comp-err-${Date.now()}`,
                                  sender: "agent",
                                  text: `Statutory Checklists for ${filing.name}:\n1. Log in to the Telangana e-District integrated labor department credentials.\n2. Prepare salaries disbursement log sheet matching S&E registration numbers.\n3. Keep copies of processing challan receipts for physical / digital audits.\n(Please define a GEMINI_API_KEY in Secrets for live detailed guidelines).`,
                                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                  agentName: "Compliance Monitoring Agent"
                                };
                                setChatHistories(prev => ({
                                  ...prev,
                                  ["agent-compliance"]: [...prev["agent-compliance"], fallbackMsg]
                                }));
                              })
                              .finally(() => {
                                setIsAgentTyping(false);
                              });
                          }}
                          className="w-full md:w-auto bg-slate-900 border border-slate-800 text-slate-300 font-bold px-4 py-2.5 rounded-lg text-xs hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-teal-400" />
                          Resolve filing via Agent
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: ACTIVE JOB BOARD */}
            {activeTab === "jobs" && (
              <div className="space-y-6">
                <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-teal-400" />
                      Client Job Openings Under Management
                    </h3>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-slate-400">Total: {appJobs.filter(j => !j.companyId || j.companyId === selectedCompany.id).length} Positions open</span>
                      <button 
                        onClick={() => setShowJobForm(!showJobForm)}
                        className="bg-teal-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-teal-700"
                      >
                        {showJobForm ? "Cancel" : "Post New Job"}
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">
                    Sourcing channels are currently online extracting pipeline candidates from local directories and routing them to our Resume Evaluation Agent.
                  </p>
                  
                  {showJobForm && (
                     <div className="border border-slate-700 p-4 rounded-xl space-y-3 bg-slate-900/80 mt-4">
                         <h4 className="text-sm font-bold text-teal-400">Post Job for {selectedCompany.name}</h4>
                         <div className="grid grid-cols-2 gap-3">
                           <div><label className="text-xs text-slate-400">Job Title</label><input type="text" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-xs text-white" /></div>
                           <div><label className="text-xs text-slate-400">Department</label><input type="text" value={newJob.department} onChange={e => setNewJob({...newJob, department: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-xs text-white" /></div>
                           <div><label className="text-xs text-slate-400">Experience Range</label><input type="text" value={newJob.experienceRange} onChange={e => setNewJob({...newJob, experienceRange: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-xs text-white" /></div>
                           <div><label className="text-xs text-slate-400">Salary Range</label><input type="text" value={newJob.salaryRange} onChange={e => setNewJob({...newJob, salaryRange: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-xs text-white" /></div>
                           <div><label className="text-xs text-slate-400">Location</label><input type="text" value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-xs text-white" /></div>
                           <div><label className="text-xs text-slate-400">Key Skills (comma separated)</label><input type="text" value={newJob.keySkills} onChange={e => setNewJob({...newJob, keySkills: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-xs text-white" /></div>
                         </div>
                         <button onClick={() => {
                           setAppJobs([...appJobs, {
                             id: "job-"+Date.now(),
                             companyId: selectedCompany.id,
                             title: newJob.title,
                             department: newJob.department,
                             experienceRange: newJob.experienceRange,
                             salaryRange: newJob.salaryRange,
                             location: newJob.location,
                             keySkills: newJob.keySkills.split(",").map(k => k.trim()),
                             status: 'open',
                             industry: selectedCompany.sector
                           }]);
                           setNewJob({ title: '', department: '', experienceRange: '', salaryRange: '', location: '', keySkills: '' });
                           setShowJobForm(false);
                         }} className="bg-teal-600 text-white px-4 py-2 rounded text-xs font-bold hover:bg-teal-700 mt-2">Publish Job</button>
                     </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {appJobs.filter(j => !j.companyId || j.companyId === selectedCompany.id).map((job) => (
                    <div key={job.id} className="bg-slate-900/20 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                            job.industry === "IT" ? "bg-teal-500/10 border-teal-500/20 text-teal-400" :
                            job.industry === "Pharma" ? "bg-purple-500/10 border-purple-500/20 text-purple-400" :
                            "bg-amber-500/10 border-amber-500/20 text-amber-400"
                          }`}>
                            {job.industry} Segment
                          </span>
                          <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded text-slate-500 font-mono font-bold">
                            {job.status.toUpperCase()}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-bold text-base text-white hover:text-teal-400 transition-colors leading-tight">
                            {job.title}
                          </h4>
                          <p className="text-xs text-slate-500 font-mono mt-1">{job.department} Dept</p>
                        </div>

                        <div className="space-y-1 pt-2 border-t border-slate-900 text-xs text-slate-400">
                          <p>Location: <strong className="text-slate-300 font-sans">{job.location}</strong></p>
                          <p>Experience Block: <strong className="text-slate-300 font-sans">{job.experienceRange}</strong></p>
                          <p>Annual Package: <strong className="text-teal-400 font-mono">{job.salaryRange}</strong></p>
                        </div>

                        <div className="space-y-1">
                          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Required Competence Skills</p>
                          <div className="flex flex-wrap gap-1">
                            {job.keySkills.map((sk) => (
                              <span key={sk} className="text-[10px] bg-slate-950/80 text-teal-300 border border-slate-900 px-1.5 py-0.5 rounded">
                                {sk}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedJob(job);
                          setActiveTab("screener");
                        }}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white transition-all text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-1 cursor-pointer border border-slate-800"
                      >
                        <FileText className="w-3.5 h-3.5 text-teal-400" />
                        Evaluate Candidate for Job
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ONBOARDING & EXIT TAB */}
            {activeTab === "onboarding" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                      <CheckSquare className="w-5 h-5 text-teal-400" />
                      Onboarding & Exit Workflows for {selectedCompany.name}
                    </h2>
                    <p className="text-sm text-slate-400">
                      Standardized checklists for rapid inductions and compliant offboarding.
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                       const name = window.prompt("Enter Employee Name:");
                       if(name) {
                          setOnboardingTasks([
                            {
                              id: "task-"+Date.now(),
                              companyId: selectedCompany.id,
                              employeeName: name,
                              role: "New Hire",
                              type: "onboarding",
                              status: "pending",
                              tasks: [{name: "Provide equipment", completed: false}, {name: "Setup email", completed: false}]
                            },
                            ...onboardingTasks
                          ]);
                       }
                    }}
                    className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-[0_0_15px_-3px_rgba(20,184,166,0.3)] shadow-teal-500/20"
                  >
                    + New Workflow
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {onboardingTasks.filter(w => !w.companyId || w.companyId === selectedCompany.id).map((workflow) => (
                    <div key={workflow.id} className="bg-slate-950/40 p-5 rounded-2xl border border-slate-900 hover:border-slate-800 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-white text-base">{workflow.employeeName}</h4>
                          <p className="text-xs text-slate-500">{workflow.role}</p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                          workflow.type === "onboarding" ? "bg-teal-500/10 border-teal-500/20 text-teal-400" : "bg-red-500/10 border-red-500/20 text-red-400"
                        }`}>
                          {workflow.type}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        {workflow.tasks.map((t, i) => (
                          <div key={i} className="flex flex-row items-center gap-3 cursor-pointer" onClick={() => {
                             const updated = onboardingTasks.map(w => {
                               if(w.id === workflow.id) {
                                  const newTasks = [...w.tasks];
                                  newTasks[i].completed = !newTasks[i].completed;
                                  // Update status based on tasks
                                  const allDone = newTasks.every(x => x.completed);
                                  const someDone = newTasks.some(x => x.completed);
                                  const newStatus = allDone ? "completed" : someDone ? "in-progress" : "pending";
                                  return {...w, tasks: newTasks, status: newStatus};
                               }
                               return w;
                             });
                             setOnboardingTasks(updated as any);
                          }}>
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center border text-[8px] ${
                              t.completed ? "bg-teal-500/20 border-teal-500/50 text-teal-400" : "bg-slate-900 border-slate-700 text-transparent"
                            }`}>
                              ✓
                            </div>
                            <span className={`text-sm ${t.completed ? "text-slate-400 line-through" : "text-slate-200"}`}>{t.name}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-900 flex justify-between items-center">
                        <span className={`text-xs font-bold px-2 py-1 rounded ${
                          workflow.status === "completed" ? "text-slate-500" :
                          workflow.status === "in-progress" ? "bg-blue-500/10 text-blue-400" : "bg-slate-800 text-slate-400"
                        }`}>
                          {workflow.status.toUpperCase()}
                        </span>
                        <button onClick={() => {
                             if(window.confirm("Delete request?")) {
                                 setOnboardingTasks(onboardingTasks.filter(w => w.id !== workflow.id));
                             }
                        }} className="text-xs text-red-400 hover:text-red-300 font-bold flex items-center gap-1">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PAYROLL & VENDOR TAB */}
            {activeTab === "payroll" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                      <Wallet className="w-5 h-5 text-teal-400" />
                      Payroll & Vendor Management for {selectedCompany.name}
                    </h2>
                    <p className="text-sm text-slate-400">
                      Manage 3rd party vendors, off-roll staffing, and monthly payroll operations.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => {
                        const name = window.prompt("New Vendor Name:");
                        if(name) {
                            setVendors([...vendors, {
                               id: "ven-"+Date.now(),
                               companyId: selectedCompany.id,
                               name: name,
                               type: "Contractor",
                               activeEmployees: 1,
                               lastInvoice: "₹ 0",
                               status: "active"
                            }]);
                        }
                    }} className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all border border-slate-800">
                      + Add Vendor
                    </button>
                    <button className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-[0_0_15px_-3px_rgba(20,184,166,0.3)] shadow-teal-500/20" onClick={() => alert("Payroll processed successfully for " + selectedCompany.name)}>
                      Run Payroll
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {vendors.filter(v => !v.companyId || v.companyId === selectedCompany.id).map((vendor) => (
                    <div key={vendor.id} className="bg-slate-950/40 p-5 rounded-2xl border border-slate-900 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-white text-lg">{vendor.name}</h4>
                          <span className={`w-2 h-2 rounded-full ${vendor.status === "active" ? "bg-teal-500" : "bg-amber-500"}`} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-900 px-2 py-1 rounded inline-block mb-4">
                          {vendor.type}
                        </span>
                        
                        <div className="space-y-2 mb-6">
                          <div className="flex justify-between items-end border-b border-slate-800/50 pb-2">
                            <span className="text-xs text-slate-500">Active Employees</span>
                            <span className="font-mono text-white text-sm">{vendor.activeEmployees}</span>
                          </div>
                          <div className="flex justify-between items-end pb-2">
                            <span className="text-xs text-slate-500">Last Invoice Amount</span>
                            <span className="font-mono text-teal-400 text-sm">{vendor.lastInvoice}</span>
                          </div>
                        </div>
                      </div>
                      <button className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white rounded-lg transition-colors">
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TRAINING MANUALS TAB */}
            {activeTab === "training" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-teal-400" />
                      Industry Standard Training for {selectedCompany.name}
                    </h2>
                    <p className="text-sm text-slate-400">
                      Pre-built, compliant training manuals for corporate orientations and skills.
                    </p>
                  </div>
                  <button onClick={() => {
                      const title = window.prompt("New Training Title:");
                      if(title) {
                          setTrainings([...trainings, {
                             id: "tr-"+Date.now(),
                             companyId: selectedCompany.id,
                             title: title,
                             description: "Custom internal training guide.",
                             industry: selectedCompany.sector,
                             readTime: "15 min view"
                          }]);
                      }
                  }} className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 font-bold text-xs py-2.5 px-4 rounded-xl transition-all text-teal-400 flex items-center gap-1">
                    + Add Custom Guide
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trainings.filter(t => !t.companyId || t.companyId === selectedCompany.id).map((manual) => (
                    <div key={manual.id} className="bg-slate-950/40 p-5 rounded-2xl border border-slate-900 hover:border-slate-800 transition-all flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-base text-white pr-4">{manual.title}</h4>
                        <span className="text-[10px] whitespace-nowrap bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-bold">
                          {manual.industry}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-1">
                        {manual.description}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-900">
                        <span className="text-xs text-slate-500 font-mono">⏱ {manual.readTime}</span>
                        <div className="flex gap-2">
                           <button onClick={() => {
                                if(window.confirm("Remove training module?")) {
                                    setTrainings(trainings.filter(t => t.id !== manual.id));
                                }
                           }} className="text-xs text-red-500 hover:text-red-400 px-3 py-1.5 rounded-lg border border-red-900">
                             Remove
                           </button>
                           <button onClick={() => alert("Assigned to staff")} className="text-xs text-white bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded-lg font-bold border border-slate-800 transition-colors">
                             Assign to Employee
                           </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>

        {/* Corporate blueprint documentation block */}
        <footer className="mt-8 border-t border-slate-900 pt-6">
          <div className="bg-slate-950/40 border border-slate-900 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">InsightHR AI • Operational Guidelines Blueprint</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-400 leading-relaxed">
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-300">Recruitment-as-a-Service</h4>
                <p>Contingency based, subscription-desk model supporting 20-500 sized tech & biological research departments. Accelerated via real-time sourcing pipelines.</p>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-300">Outsourced HR Operations</h4>
                <p>Handling compliance filings, pf/esi reconciliations, Telangana e-district licensing audit validations, and local dispute mediations with 24x7 automated helpdesks.</p>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-300">Advanced Talent Intelligence</h4>
                <p>Attrition estimation engines computing compensation benchmarks across Cyberabad to counter candidate flight-risks with custom retention checklists.</p>
              </div>
            </div>
            <div className="text-center text-[10px] text-slate-600 font-mono border-t border-slate-900/60 pt-3">
              Copyright © 2026 Instinctive HR Operations. Proudly established in Hyderabad, Telangana. Powered by elite autonomous agents.
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}

// Simple internal icon layout components since standard lucide handles other icons
function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
