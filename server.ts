import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

import morgan from 'morgan';
import apiRouter from './src/api';
import { setupSwagger } from './src/api/swagger';
import { errorHandler } from './src/api/middlewares';
import { logger } from './src/utils/logger';

// Setup basic request logging
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Setup Swagger UI Documentation
setupSwagger(app);

// Mount main API Router
app.use('/api', apiRouter);

// Ensure the local environment knows about Gemini configuration
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("InsightHR Server: GoogleGenAI initialized successfully.");
  } catch (err) {
    console.error("InsightHR Server: Failed to initialize GoogleGenAI. Details:", err);
  }
} else {
  console.warn("InsightHR Server WARNING: GEMINI_API_KEY represents a null reference. Live server features will simulate feedback.");
}

// -------------------------------------------------------------
// Endpoint 1: Evaluate Candidate Resume (Resume Evaluation Agent)
// -------------------------------------------------------------
app.post("/api/evaluate-resume", async (req, res) => {
  const { candidateName, targetRole, resumeText, jobDescription, industry } = req.body;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({ error: "Missing required fields: resumeText and jobDescription." });
  }

  const prompt = `
Evaluate the following candidate resume for the target role against the provided Job Description.

Candidate Name: ${candidateName || "Unnamed Candidate"}
Target Role: ${targetRole || "Specified Position"}
Industry Segment: ${industry || "IT/Pharma/SME"}

--- CANDIDATE RESUME ---
${resumeText}

--- JOB DESCRIPTION ---
${jobDescription}

Please perform a rigorous competency match, check skills alignment, review employment stability, assess typical notice periods in India, and score the candidate out of 100 on cultural, technical, and experience suitability.
`;

  if (!ai) {
    // Elegant realistic simulation when API Key is missing
    const simulatedScore = Math.floor(Math.random() * 25) + 65; // Stable random score
    return res.json({
      suitabilityScore: simulatedScore,
      skillsMatched: ["React", "TypeScript", "Tailwind CSS", "REST APIs"],
      skillsMissing: ["Next.js SSR optimization", "AWS Deployment"],
      stabilityReview: "Candidate has spent 3.5 years in their last organization (HITEC City based). Clean transition history indicating high stability and growth.",
      noticePeriodAssessment: "30 days (negotiable/notice buyout possible), which fits standard Hyderabad hiring timelines.",
      summaryReport: `SIMULATED MATCH (API Key offline): ${candidateName || "Candidate"} shows strong core alignment (${simulatedScore}% suitability score). Sourced skills in frontend logic are highly relevant, but lacks specialized server components. We suggest setting up an screening call to gauge readiness.`
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: {
        systemInstruction: "You are an elite Recruitment AI Agent specialized in the Indian market, specifically IT (Cyberabad/Gachibowli), Biotech & Pharma (Genome Valley), and manufacturing sectors. You assess competencies, stability, notice periods, and score suitability objectively. You MUST respond with valid raw JSON adhering directly to the requested schema. Do not wrap in markdown boxes.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suitabilityScore: { 
              type: Type.INTEGER, 
              description: "Value between 0 and 100 indicating fit level." 
            },
            skillsMatched: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Strict skills found in the resume matching the JD."
            },
            skillsMissing: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Crucial or auxiliary skills on the JD that are not present in the resume."
            },
            stabilityReview: { 
              type: Type.STRING, 
              description: "Analysis of employment durations, gaps, and job-hopping tendencies." 
            },
            noticePeriodAssessment: { 
              type: Type.STRING, 
              description: "Evaluation of Notice Period constraints vs standard business timeline." 
            },
            summaryReport: { 
              type: Type.STRING, 
              description: "Executive narrative detailing pros, cons, and direct recommendations." 
            }
          },
          required: [
            "suitabilityScore", 
            "skillsMatched", 
            "skillsMissing", 
            "stabilityReview", 
            "noticePeriodAssessment", 
            "summaryReport"
          ]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    return res.json(parsedData);
  } catch (error: any) {
    console.error("Error in evaluate-resume handler:", error);
    return res.status(500).json({ error: error.message || "Failed to process evaluation with Gemini" });
  }
});

import { AuditAgent } from "./src/agents/AuditAgent";
import { JDGeneratorAgent } from "./src/agents/JDGeneratorAgent";
import { ConsultancyCopilotAgent } from "./src/agents/ConsultancyCopilotAgent";

// -------------------------------------------------------------
// Endpoint 2: Agent Custom Dialogue Workshop
// -------------------------------------------------------------
app.post("/api/agent-chat", async (req, res) => {
  const { agentId, message, history, ...contextData } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message prompt is required." });
  }

  // Handle the specialized agents built using the new structured output design
  if (agentId === "audit" || agentId === "jdGenerator" || agentId === "consultancy") {
      try {
          let specificAgent;
          if (agentId === "audit") specificAgent = new AuditAgent();
          else if (agentId === "jdGenerator") specificAgent = new JDGeneratorAgent();
          else specificAgent = new ConsultancyCopilotAgent();

          const response = await specificAgent.processRequest(message, contextData);
          return res.json({ text: JSON.stringify(response) });
      } catch (err: any) {
          console.error("Specialized agent error:", err);
          return res.status(500).json({ error: "Failed to run specialized agent" });
      }
  }

  // Set system instructions based on which generic agent we are communicating with
  let sysInstruction = "You are an advanced HR companion agent.";

  switch (agentId) {
    case "agent-sourcing":
      sysInstruction = `You are a high-speed Candidate Sourcing Agent for InsightHR. 
Your expertise lies in finding highly specific tech, bio, and operational talent in Hyderabad (HITEC City, Gachibowli, Genome Valley).
Guide the user regarding search strings (Boolean: AND, OR, NOT), LinkedIn sourcing approaches, X-ray searching, and locating regional talent pools. Always be practical and technical.`;
      break;
    case "agent-resume":
      sysInstruction = `You are the Resume Evaluation Agent. You scrutinize CVs, identify red flags (short tenures, frequent jumps, skill inflation), and compare them with technical specs in IT and Pharma.`;
      break;
    case "agent-engagement":
      sysInstruction = `You are the Candidate Engagement Agent.
Your role is to craft extremely engaging, warm, professional candidate outreach templates (WhatsApp, LinkedIn, emails) tailored for the Indian landscape.
Specifically represent Hyderabad's booming business ecosystem (mention transport facilities like Mindspace phase hubs, outer ring road, local corporate campuses) to make offers highly compelling.`;
      break;
    case "agent-interview":
      sysInstruction = `You are the Interview Coordination Agent. You focus on scheduling logistics, panel feedback collection techniques, calendar sync (Outlook/GCal), and reducing candidate no-shows (WhatsApp alerts, pre-interview checks).`;
      break;
    case "agent-offer":
      sysInstruction = `You are the Offer Management Agent. You are a negotiation guru. Help the HR manager outline salaries in LPA (Lakhs Per Annum), structure variables, assess joining probability, evaluate notice buyout terms, and counter competing offers.`;
      break;
    case "agent-helpdesk":
      sysInstruction = `You are the AI Employee Helpdesk Agent for InsightHR.
You provide clear, accurate guidance on typical Indian SME and corporate policies, statutory rules in Telangana, leave metrics (casual leave, sick leave, earned leave cycles), employee wellness benefits, ESI, PF deductions, and payroll queries.
Always speak with a polite, empathetic, and HRbp-aligned tone.`;
      break;
    case "agent-compliance":
      sysInstruction = `You are the Compliance Monitoring Agent for InsightHR.
You are a statutory law expert in Telangana/India. Help small businesses handle:
- Employees Provident Fund (EPF Act)
- Employee State Insurance (ESIC)
- Telangana Shops & Establishments Act (licensing, timings, closures)
- Contract Labor Regulation and Abolition Act (CLRA) - Form XXIV registers.
Provide highly detailed compliance steps, statutory rates (e.g. EPF 12%, ESI 0.75% / 3.25%), and penalties for late filings.`;
      break;
    case "agent-attrition":
      sysInstruction = `You are the Attrition Prediction Agent. You specialize in behavioral analytics, employee sentiment assessment, and pulse statistics.
Help HR managers identify flight risk parameters (salary benchmark gap, poor relationship with leads, high commute times, lack of remote flexibility) and build targeted retention recipes.`;
      break;
    case "agent-analytics":
      sysInstruction = `You are the Workforce Analytics Agent.
Provide instructions or code suggestions regarding metrics formulation: Attrition rates (Leavers/Average headcount), Yield ratios, Time to Fill, Sourcing Cost per Hire, and Human Capital Contribution.`;
      break;
  }

  if (!ai) {
    // Simulated dialogue when API Key is offline
    let simText = "";
    if (agentId === "agent-helpdesk") {
      simText = `Greetings! I am your Employee Helpdesk Agent. Under Telangana statutory guidelines and model company rules, employees are generally entitled to 12 Sick Leaves, 12 Casual Leaves, and Earned Leaves accrued at 1 day for every 20 working days. Casual leaves cannot be carried forward, whereas earned leaves can typically be accumulated up to 30-45 days depending on your HR policy. Is there another benefit or deduction you would like to clarify?`;
    } else if (agentId === "agent-compliance") {
      simText = `Under the Telangana Shops & Establishments rules, every employer must file their yearly statements and register returns under Form I or Form XXIV (for contract labour) online via the Telangana Labour e-District portal. Late renewals carry a 25% surcharge. Let me know if you need help auto-drafting a compliance status sheet or need rates!`;
    } else {
      simText = `Welcome! As the ${agentId.replace("agent-", "").toUpperCase().replace("-", " ")} Agent, I am ready to automate your HR routine. Sourced locally in Hyderabad, I can recommend optimized actions, outline hiring bottlenecks, or draft documents for you. Please supply an API key in Secrets panel for live responses!`;
    }
    return res.json({ text: simText });
  }

  try {
    // Build Chat History
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    }));

    // Start a chat using the recommended chats API
    const chat = ai.chats.create({
      model: "gemini-3.1-flash-lite",
      config: {
        systemInstruction: sysInstruction,
        temperature: 0.7,
      },
      history: formattedHistory
    });

    const response = await chat.sendMessage({ message: message });
    return res.json({ text: response.text });
  } catch (error: any) {
    console.error("Error in agent-chat handler:", error);
    return res.status(500).json({ error: error.message || "Failed to generate AI response" });
  }
});

// Global Error Handler
app.use(errorHandler);

// -------------------------------------------------------------
// Vite and Static Assets Routing Setup
// -------------------------------------------------------------
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve index.html for all page loads in production (SPA fallback)
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`InsightHR Server currently operating at http://localhost:${PORT}`);
  });
}

bootstrap();
