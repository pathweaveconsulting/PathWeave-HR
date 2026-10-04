import { Company, Candidate, JobOpening, Employee, ComplianceFiling, Agent, OnboardingTask, PayrollVendor, TrainingManual } from "../types.ts";

export const mockCompanies: Company[] = [
  { id: "comp-it-1", name: "Asteria IT Solutions", sector: "IT", area: "Madhapur", description: "Enterprise IT Services" },
  { id: "comp-it-2", name: "CyberCore Tech Hub", sector: "IT", area: "Gachibowli", description: "SaaS Development" },
  { id: "comp-it-3", name: "Quantum Data Systems", sector: "IT", area: "Financial District", description: "AI & Data Analytics" },
  { id: "comp-pharma-1", name: "Apex Biopharma Laboratories", sector: "Pharma", area: "Genome Valley", description: "R&D and Quality Control" },
  { id: "comp-pharma-2", name: "MTS Lifesciences", sector: "Pharma", area: "Bollaram", description: "Formulations" },
  { id: "comp-sme-1", name: "Paramount Manufacturing", sector: "SME", area: "Patancheru", description: "Industrial Parts" },
  { id: "comp-sme-2", name: "Zenith Logistics", sector: "SME", area: "Jeedimetla", description: "Warehousing & Supply Chain" },
];

export const mockCandidates: Candidate[] = [
  {
    id: "cand-1",
    companyId: "comp-it-1",
    name: "Aarav Reddy",
    role: "Senior React Developer",
    industry: "IT",
    location: "HITEC City, Hyderabad",
    skills: ["React", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL"],
    experienceYears: 6.5,
    currentSalary: "14 LPA",
    expectedSalary: "18 LPA",
    noticePeriodDays: 30,
    status: "sourced",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
  },
  {
    id: "cand-2",
    companyId: "comp-pharma-1",
    name: "Dr. Sai Kiran",
    role: "Pharma QC Specialist",
    industry: "Pharma",
    location: "Genome Valley, Hyderabad",
    skills: ["HPLC", "GMP", "Analytical Chemistry", "FDA Auditing", "Method Validation"],
    experienceYears: 8,
    currentSalary: "9.5 LPA",
    expectedSalary: "12 LPA",
    noticePeriodDays: 60,
    status: "screened",
    avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150"
  },
  {
    id: "cand-3",
    companyId: "comp-it-2",
    name: "Ananya Rao",
    role: "Full-Stack Engineer",
    industry: "IT",
    location: "Gachibowli, Hyderabad",
    skills: ["Next.js", "Express", "PostgreSQL", "AWS", "Docker"],
    experienceYears: 4,
    currentSalary: "11 LPA",
    expectedSalary: "14.5 LPA",
    noticePeriodDays: 15,
    status: "interviewing",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
  },
  {
    id: "cand-4",
    name: "Mohammad Fazal",
    role: "Formulation R&D Associate",
    industry: "Pharma",
    location: "Bollaram Industrial Area, Hyderabad",
    skills: ["Liquid Formulations", "Tableting", "Dissolution Testing", "ICH Guidelines"],
    experienceYears: 5,
    currentSalary: "7.2 LPA",
    expectedSalary: "9 LPA",
    noticePeriodDays: 45,
    status: "sourced",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150"
  },
  {
    id: "cand-5",
    name: "Nandini Krishnan",
    role: "Operations Supervisor",
    industry: "SME",
    location: "Patancheru, Hyderabad",
    skills: ["Inventory Management", "Lean Manufacturing", "Supply Chain Control", "Safety Protocols"],
    experienceYears: 7,
    currentSalary: "6.5 LPA",
    expectedSalary: "8.2 LPA",
    noticePeriodDays: 30,
    status: "offered",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
  },
  {
    id: "cand-6",
    companyId: "comp-it-3",
    name: "Vikram Sarabhai",
    role: "Data Scientist",
    industry: "IT",
    location: "Financial District, Hyderabad",
    skills: ["Python", "Machine Learning", "PyTorch", "Data Science", "SQL"],
    experienceYears: 5,
    currentSalary: "18 LPA",
    expectedSalary: "24 LPA",
    noticePeriodDays: 60,
    status: "interviewing",
    avatarUrl: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=150"
  }
];

export const mockJobs: JobOpening[] = [
  {
    id: "job-1",
    companyId: "comp-it-1",
    title: "Lead Frontend Engineer (Next.js)",
    department: "Engineering",
    industry: "IT",
    location: "MADHAPUR, Hyderabad (Hybrid)",
    experienceRange: "5-8 Years",
    salaryRange: "16 - 22 LPA",
    keySkills: ["Next.js", "TypeScript", "Tailwind CSS", "Team Leadership"],
    status: "open"
  },
  {
    id: "job-2",
    companyId: "comp-pharma-1",
    title: "Senior Executive - Quality Assurance Operations",
    department: "Quality Assurance",
    industry: "Pharma",
    location: "GENOME VALLEY, Hyderabad (Onsite)",
    experienceRange: "6-10 Years",
    salaryRange: "10 - 15 LPA",
    keySkills: ["GMP Compliance", "SOP Drafting", "USFDA Guidelines", "Quality Audits"],
    status: "open"
  },
  {
    id: "job-3",
    companyId: "comp-sme-1",
    title: "Sourcing & Logistics Lead",
    department: "Operations",
    industry: "SME",
    location: "JEEDIMETLA Phase-III, Hyderabad (Onsite)",
    experienceRange: "4-7 Years",
    salaryRange: "7 - 10 LPA",
    keySkills: ["Warehouse Logistics", "ERP Systems", "Vendor Negotiation"],
    status: "open"
  },
  {
    id: "job-4",
    companyId: "comp-it-3",
    title: "Senior AI Researcher",
    department: "Data Science",
    industry: "IT",
    location: "Financial District, Hyderabad (Onsite)",
    experienceRange: "4-8 Years",
    salaryRange: "20 - 30 LPA",
    keySkills: ["Deep Learning", "NLP", "LLMs", "Python"],
    status: "open"
  }
];

export const mockEmployees: Employee[] = [
  {
    id: "emp-101",
    companyId: "comp-it-1",
    name: "Praveen Tej",
    department: "Software Engineering",
    role: "Senior Angular Developer",
    industry: "IT",
    tenureMonths: 14,
    performanceScore: 4.2,
    satisfactionScore: 2.1,
    salaryPercentile: 38,
    flightRisk: "High",
    riskDetails: "Underpaid relative to the rapid Gachibowli tech corridor benchmarks (-25% gap). Expressed frustration with manual release documentation in recent pulse survey."
  },
  {
    id: "emp-102",
    companyId: "comp-pharma-1",
    name: "Vandana Sharma",
    department: "Stability Testing",
    role: "QC Associate Analyst",
    industry: "Pharma",
    tenureMonths: 36,
    performanceScore: 3.9,
    satisfactionScore: 4.5,
    salaryPercentile: 72,
    flightRisk: "Low",
    riskDetails: "Highly stable. Strong integration with technical leads in Genome Valley lab. Solid progression curve."
  },
  {
    id: "emp-103",
    name: "Karthik Subramanian",
    department: "Security Operations",
    role: "DevOps Lead",
    industry: "IT",
    tenureMonths: 8,
    performanceScore: 4.8,
    satisfactionScore: 3.2,
    salaryPercentile: 85,
    flightRisk: "Medium",
    riskDetails: "Critical talent. High external demand from competing Hyderabad IT firms. Desires faster remote structure."
  },
  {
    id: "emp-104",
    name: "Ramesh Jha",
    department: "Production Line B",
    role: "Formulation Executive",
    industry: "Pharma",
    tenureMonths: 48,
    performanceScore: 3.5,
    satisfactionScore: 2.5,
    salaryPercentile: 45,
    flightRisk: "Medium",
  },
  {
    id: "emp-104",
    companyId: "comp-it-3",
    name: "Sanjana Mehta",
    department: "Data Engineering",
    role: "Data Engineer",
    industry: "IT",
    tenureMonths: 24,
    performanceScore: 4.8,
    satisfactionScore: 4.5,
    salaryPercentile: 75,
    flightRisk: "Low",
    riskDetails: "Excellent continuous integration improvements. Top talent."
  }
];

export const mockComplianceFilings: ComplianceFiling[] = [
  {
    id: "comp-1",
    companyId: "comp-it-1",
    name: "EPF Statutory Monthly Return Filing (Form 12A)",
    type: "PF",
    deadline: "15th of Every Month",
    authority: "Employees' Provident Fund Organisation (EPFO)",
    status: "compliant",
    penaltyInfo: "Interest under Section 7Q (12% p.a.) & damages under Section 14B (up to 25% p.a.).",
    remedyAction: "Review salary register inputs and reconcile with electronic challan-cum-return (ECR) portal."
  },
  {
    id: "comp-2",
    companyId: "comp-pharma-1",
    name: "ESIC Contribution Submission & Filing",
    type: "ESI",
    deadline: "15th of Every Month",
    authority: "Employees' State Insurance Corporation (ESIC)",
    status: "compliant",
    penaltyInfo: "12% interest p.a. for delayed payments; imprisonment up to 3 years for non-payment.",
    remedyAction: "Verify newly registered employees on Portal and file electronic contributions by local deadline."
  },
  {
    id: "comp-3",
    name: "Telangana Shops & Establishments License Renewal",
    type: "Shops Act",
    deadline: "31st December (Annual)",
    authority: "Labour Department, Government of Telangana",
    status: "warning",
    penaltyInfo: "25% extra late fee; fine up to ₹10,000 for non-renewal/unregistered operations in Hyderabad.",
    remedyAction: "Submit Online Form-I under Telangana S&E Act on the integrated registration portal with receipt of processing fees."
  },
  {
    id: "comp-4",
    name: "Form XXIV: Half Yearly Return (Contractor Employment)",
    type: "Labour Law",
    deadline: "30th June / 31st December",
    authority: "Assistant Labour Commissioner, Hyderabad Circle",
    status: "overdue",
    penaltyInfo: "Penalty of ₹5,000 to ₹25,000 and potential cancellation of contract license/audit flag.",
  },
  {
    id: "comp-5",
    companyId: "comp-it-3",
    name: "TDS Quarterly Return (Q2)",
    type: "TDS",
    deadline: "End of Quarter",
    authority: "Income Tax Department",
    status: "compliant",
    penaltyInfo: "200 INR per day",
    remedyAction: "Submit returns"
  }
];

export const mockAgents: Agent[] = [
  {
    id: "agent-sourcing",
    name: "Candidate Sourcing Agent",
    role: "Database Miner & Sourcing Automation",
    description: "Automates multi-channel talent mining across LinkedIn, local job boards, and passive resume indexes. Perfect fit for finding technical IT engineers and heavy pharma scientists in Hyderabad.",
    status: "active",
    avatar: "Scan",
    metric: "Sourced: 420+ Candidates this month"
  },
  {
    id: "agent-resume",
    name: "Resume Evaluation Agent",
    role: "Gemini-Powered Resume & Competency Screener",
    description: "Deep-checks skills, longevity, tech stacks, notice periods, and financial benchmarks against customized JD guidelines. Produces definitive Suitability Scores with detailed reports.",
    status: "active",
    avatar: "FileSpreadsheet",
    metric: "Screening rate: 1.2s per CV"
  },
  {
    id: "agent-engagement",
    name: "Candidate Engagement Agent",
    role: "Outreach & Interview Brand Ambassador",
    description: "Nurtures candidate pipelines. Auto-generates personalized Hyderabad regional, context-heavy outreach drafts (WhatsApp details, office locations in HITEC, transport links).",
    status: "idle",
    avatar: "MessageSquare",
    metric: "Response Rate: 68% (vs 32% industry)"
  },
  {
    id: "agent-interview",
    name: "Interview Coordination Agent",
    role: "Multi-Calendar Slot Reconciler",
    description: "Synchronizes busy panel schedules, issues secure link tokens, sends SMS/WhatsApp reminders, and dynamically tracks panel feedback submission times.",
    status: "working",
    avatar: "Calendar",
    metric: "No-show rate: reduced to <3%"
  },
  {
    id: "agent-offer",
    name: "Offer Management Agent",
    role: "Compensation Benchmark & Negotiation Assist",
    description: "Tracks offer acceptances, negotiates notice buyouts, and predicts joining state based on geographic factors, local travel patterns, and competitive counter-offers.",
    status: "idle",
    avatar: "Briefcase",
    metric: "Acceptance rate: 84%"
  },
  {
    id: "agent-helpdesk",
    name: "Employee Helpdesk Agent",
    role: "Gemini-Powered 24/7 Policy and FAQ Advisor",
    description: "Provides instant resolutions regarding employee leave policies, benefits, local holidays, and general HR handbook FAQs. Available 24x7 to support corporate staff.",
    status: "active",
    avatar: "HelpCircle",
    metric: "Resolutions: 94.8% first-contact"
  },
  {
    id: "agent-compliance",
    name: "Compliance Monitoring Agent",
    role: "Telangana Statutory Audit & Reminder Bot",
    description: "Tracks deadlines for ECRs, PF, ESIC, professional tax, S&E filings, and sends predictive escalation pings when documents or mandatory licenses are expiring.",
    status: "working",
    avatar: "ShieldCheck",
    metric: "Risk rating: Excellent (0 defaults)"
  },
  {
    id: "agent-attrition",
    name: "Attrition Prediction Agent",
    role: "Flight-Risk Neural Simulator",
    description: "Examines pulse surveys, tenure data, performance reviews, and market salary differences to warn HR leadership about high-value key contributors ready to make the jump.",
    status: "active",
    avatar: "TrendingDown",
    metric: "Prediction Accuracy: 91.2%"
  },
  {
    id: "agent-analytics",
    name: "Workforce Analytics Agent",
    role: "Executive Dashboard Generator",
    description: "Generates high-level summaries of cost metrics, talent indices, performance quadrants, and recruitment yield funnels for quick board presentations.",
    status: "idle",
    avatar: "BarChart3",
    metric: "Daily digest delivery: 09:00 AM"
  }
];

export const mockOnboardingExitTasks: OnboardingTask[] = [
  {
    id: "task-1",
    companyId: "comp-it-1",
    employeeName: "Rohan Patel",
    role: "Backend Engineer",
    type: "onboarding",
    status: "in-progress",
    tasks: [
      { name: "Background Verification", completed: true },
      { name: "Equipment Allocation", completed: true },
      { name: "Provident Fund UAN Registration", completed: false },
      { name: "ESIC Enrollment (If Applicable)", completed: false },
      { name: "Bank Account Setup", completed: true }
    ]
  },
  {
    id: "task-2",
    companyId: "comp-pharma-1",
    employeeName: "Sonia Mirza",
    role: "Sales Manager",
    type: "exit",
    status: "pending",
  },
  {
    id: "task-4",
    companyId: "comp-it-3",
    employeeName: "Aditya Verma",
    role: "Machine Learning Engineer",
    type: "onboarding",
    status: "in-progress",
    tasks: [
      { name: "Provision GPU Instance", completed: true },
      { name: "Sign NDA", completed: false },
      { name: "Dataset Access Request", completed: false }
    ]
  }
];

export const mockVendors: PayrollVendor[] = [
  {
    id: "ven-1",
    companyId: "comp-it-1",
    name: "StaffingCore India",
    type: "Off-roll Agency",
    activeEmployees: 45,
    lastInvoice: "₹ 8,45,000",
    status: "active"
  },
  {
    id: "ven-2",
    name: "FlexiWorks Hyderabad",
    type: "Contractor",
    activeEmployees: 120,
    lastInvoice: "₹ 18,20,000",
    status: "active"
  },
  {
  },
  {
    id: "ven-4",
    companyId: "comp-it-3",
    name: "CloudScale Staffing",
    type: "Off-roll Agency",
    activeEmployees: 12,
    status: "active",
    lastInvoice: "₹ 11,20,000"
  }
];

export const mockTrainingManuals: TrainingManual[] = [
  {
    id: "train-1",
    companyId: "comp-it-1",
    title: "POSH (Prevention of Sexual Harassment) Guidelines",
    industry: "All",
    description: "Standard industry compliance training as per the POSH Act, 2013. Includes committee setup, complaint mechanisms, and safe workplace practices.",
    readTime: "45 mins"
  },
  {
    id: "train-2",
    title: "Good Manufacturing Practices (GMP) Refresher",
    industry: "Pharma",
    description: "Essential training on USFDA guidelines, documentation, sanitation, and contamination control for Genome Valley lab technicians.",
    readTime: "120 mins"
  },
  {
    id: "train-3",
    title: "Data Privacy & GDPR Basics for Developers",
    industry: "IT",
    description: "Cyberabad IT corridor standards for Handling PII, secure coding, and client data protection guidelines.",
    readTime: "60 mins"
  },
  {
    id: "train-4",
    title: "Workplace Safety & First Aid",
    industry: "SME",
    description: "Manufacturing & operations center safety protocols, hazard identification, and emergency evacuation.",
  },
  {
    id: "train-5",
    companyId: "comp-it-3",
    title: "Data Privacy & GDPR Handbook",
    industry: "IT",
    description: "Guidelines on handling PII and compliance with GDPR and Indian Data Privacy regulations.",
    readTime: "40 mins"
  }
];
