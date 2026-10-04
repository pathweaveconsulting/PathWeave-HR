import { BaseAgent } from './BaseAgent';
import { Type } from "@google/genai";

export class AuditAgent extends BaseAgent {
  async processRequest(prompt: string, context: any): Promise<any> {
    const inputContent = `
    Audit Context/Files:
    ${JSON.stringify(context, null, 2)}
    User Query: ${prompt}
    `;

    const response = await this.ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: inputContent,
      config: {
        systemInstruction: "You are an expert HR Auditor, Labour Law Consultant, Compliance Officer, HRBP, and AI Solution Architect. Build an AI-powered SME HR Audit Agent report for Indian organizations.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
             executiveSummary: { type: Type.STRING },
             hrMaturityScore: { type: Type.STRING, description: "Level 1 (Ad Hoc) to Level 5 (Best Practice)" },
             complianceScore: { type: Type.STRING },
             peopleRiskScore: { type: Type.STRING },
             riskHeatmap: { 
               type: Type.ARRAY, 
               items: { 
                 type: Type.OBJECT, 
                 properties: {
                   area: { type: Type.STRING },
                   riskLevel: { type: Type.STRING, description: "Low, Medium, High" },
                   description: { type: Type.STRING }
                 }
               }
             },
             topFindings: { type: Type.ARRAY, items: { type: Type.STRING } },
             quickWins: { type: Type.ARRAY, items: { type: Type.STRING } },
             actionPlan30Day: { type: Type.ARRAY, items: { type: Type.STRING } },
             transformationPlan90Day: { type: Type.ARRAY, items: { type: Type.STRING } },
             roadmap12Month: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });

    try {
       return JSON.parse(response.text || '{}');
    } catch {
       return { raw: response.text };
    }
  }
}

