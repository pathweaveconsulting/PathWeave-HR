import { pgTable, text, serial, timestamp, integer, jsonb, boolean, uuid, date, numeric } from "drizzle-orm/pg-core";

// MODULE 1: TENANT MANAGEMENT
export const companies = pgTable("companies", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  industry: text("industry"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const locations = pgTable("locations", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").references(() => companies.id),
  name: text("name").notNull(),
  address: text("address"),
});

export const departments = pgTable("departments", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").references(() => companies.id),
  name: text("name").notNull(),
});

export const roles = pgTable("roles", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").references(() => companies.id),
  name: text("name").notNull(),
  permissions: jsonb("permissions"), // JSON array of permission strings
});

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").references(() => companies.id),
  roleId: uuid("role_id").references(() => roles.id),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash"),
  createdAt: timestamp("created_at").defaultNow(),
});

// MODULE 2: COMPANY MEMORY ENGINE
export const companyMemory = pgTable("company_memory", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").references(() => companies.id),
  memoryType: text("memory_type").notNull(), // e.g. 'vision', 'mission', 'policies', 'competencies'
  content: text("content"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
});

// CORE HR DATA
export const employees = pgTable("employees", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  companyId: uuid("company_id").references(() => companies.id),
  departmentId: uuid("department_id").references(() => departments.id),
  locationId: uuid("location_id").references(() => locations.id),
  jobTitle: text("job_title"),
  salary: numeric("salary"),
  salaryPercentile: integer("salary_percentile"),
  performanceScore: numeric("performance_score"), // 1.0 to 5.0
  flightRisk: text("flight_risk"), // 'Low', 'Medium', 'High'
  dateOfJoin: date("date_of_join"),
});

// MODULE 3 & 4: RECRUITMENT AND JD GENERATOR
export const jobs = pgTable("jobs", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").references(() => companies.id),
  departmentId: uuid("department_id").references(() => departments.id),
  title: text("title").notNull(),
  description: text("description"),
  skills: jsonb("skills"),
  salaryRange: text("salary_range"),
  experienceRequired: text("experience_required"),
  status: text("status").default("open"), // 'open', 'filled', 'draft'
  createdAt: timestamp("created_at").defaultNow(),
});

export const candidates = pgTable("candidates", {
  id: uuid("id").defaultRandom().primaryKey(),
  jobId: uuid("job_id").references(() => jobs.id),
  companyId: uuid("company_id").references(() => companies.id),
  name: text("name").notNull(),
  email: text("email"),
  resumeUrl: text("resume_url"),
  resumeText: text("resume_text"),
  skills: jsonb("skills"),
  suitabilityScore: integer("suitability_score"),
  status: text("status").default("sourced"), // 'sourced', 'screened', 'interviewing', 'offered', 'rejected'
  createdAt: timestamp("created_at").defaultNow(),
});

// MODULE 5: HR POLICY AGENT
export const policies = pgTable("policies", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").references(() => companies.id),
  title: text("title").notNull(),
  content: text("content"),
  version: text("version"),
  status: text("status"), // 'draft', 'published'
  createdAt: timestamp("created_at").defaultNow(),
});

// MODULE 6: PERFORMANCE MANAGEMENT
export const performanceGoals = pgTable("performance_goals", {
  id: uuid("id").defaultRandom().primaryKey(),
  employeeId: uuid("employee_id").references(() => employees.id),
  title: text("title").notNull(),
  description: text("description"),
  kpis: jsonb("kpis"),
  status: text("status"),
  dueDate: date("due_date"),
});

// MODULE 8: HR AUDIT
export const hrAudits = pgTable("hr_audits", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").references(() => companies.id),
  title: text("title").notNull(),
  complianceScore: integer("compliance_score"),
  riskScore: integer("risk_score"),
  findings: jsonb("findings"), // Structured audit outcomes
  actionPlan: text("action_plan"),
  createdAt: timestamp("created_at").defaultNow(),
});

// MODULE 10: LEARNING AGENT
export const trainingManuals = pgTable("training_manuals", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").references(() => companies.id),
  title: text("title").notNull(),
  description: text("description"),
  content: text("content"),
  industry: text("industry"),
});

// MODULE 11: FRACTIONAL CHRO DELIVERABLES
export const chroDeliverables = pgTable("chro_deliverables", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").references(() => companies.id),
  reportMonth: text("report_month").notNull(),
  monthlyReport: jsonb("monthly_report"),
  strategicDeliverables: jsonb("strategic_deliverables"),
  actionEngine: jsonb("action_engine"),
  createdAt: timestamp("created_at").defaultNow(),
});
export const payroll = pgTable("payroll", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").references(() => companies.id),
  employeeId: uuid("employee_id").references(() => employees.id),
  month: text("month").notNull(), // e.g., '2026-06'
  baseSalary: numeric("base_salary"),
  deductions: numeric("deductions"),
  netPay: numeric("net_pay"),
  status: text("status"), // 'pending', 'paid'
});
