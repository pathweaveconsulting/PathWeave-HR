export interface Company {
  id: string;
  name: string;
  sector: "IT" | "Pharma" | "SME";
  area: string;
  description: string;
}

export interface Candidate {
  id: string;
  companyId?: string;
  name: string;
  role: string;
  industry: "IT" | "Pharma" | "SME";
  location: string;
  skills: string[];
  experienceYears: number;
  expectedSalary: string;
  currentSalary: string;
  noticePeriodDays: number;
  suitabilityScore?: number;
  aiFeedback?: string;
  avatarUrl?: string;
  status: "sourced" | "screened" | "interviewing" | "offered" | "joined" | "rejected";
}

export interface JobOpening {
  id: string;
  companyId?: string;
  title: string;
  department: string;
  industry: "IT" | "Pharma" | "SME";
  location: string;
  experienceRange: string;
  salaryRange: string;
  keySkills: string[];
  status: "open" | "filled" | "draft";
}

export interface Employee {
  id: string;
  companyId?: string;
  name: string;
  department: string;
  role: string;
  industry: "IT" | "Pharma";
  tenureMonths: number;
  performanceScore: number; // 1-5
  satisfactionScore: number; // 1-5
  salaryPercentile: number; // 1-100 relative to market
  flightRisk: "Low" | "Medium" | "High";
  riskDetails: string;
}

export interface ComplianceFiling {
  id: string;
  companyId?: string;
  name: string;
  type: "PF" | "ESI" | "Shops Act" | "Labour Law" | "Contractor" | "Professional Tax" | "TDS";
  deadline: string;
  authority: string;
  status: "compliant" | "warning" | "overdue";
  penaltyInfo: string;
  remedyAction: string;
}

export interface Message {
  id: string;
  sender: "user" | "agent";
  text: string;
  timestamp: string;
  agentName?: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  status: "active" | "idle" | "working";
  avatar: string;
  metric: string;
}

export interface OnboardingTask {
  id: string;
  companyId?: string;
  employeeName: string;
  role: string;
  type: "onboarding" | "exit";
  tasks: { name: string; completed: boolean }[];
  status: "pending" | "in-progress" | "completed";
}

export interface PayrollVendor {
  id: string;
  companyId?: string;
  name: string;
  type: "Contractor" | "Off-roll Agency" | "Payroll Processing";
  activeEmployees: number;
  lastInvoice: string;
  status: "active" | "review";
}

export interface TrainingManual {
  id: string;
  companyId?: string;
  title: string;
  industry: "All" | "IT" | "Pharma" | "SME";
  description: string;
  readTime: string;
}
