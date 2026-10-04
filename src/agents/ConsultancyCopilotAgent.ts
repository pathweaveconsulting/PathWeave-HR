import { BaseAgent } from './BaseAgent';
import { Type } from "@google/genai";

export class ConsultancyCopilotAgent extends BaseAgent {
  async processRequest(prompt: string, context: any): Promise<any> {
    const inputContent = `
    Client Data/Context:
    ${JSON.stringify(context, null, 2)}
    User Query: ${prompt}
    `;

    const response = await this.ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: inputContent,
      config: {
        systemInstruction: "You are an elite Fractional CHRO, Organizational Transformation Consultant, HR Strategist, Executive Coach, Workforce Planning Expert, and AI Architect. Generate a monthly CHRO report and strategic deliverables based on the inputs.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
             monthlyReport: {
               type: Type.OBJECT,
               properties: {
                 peopleHighlights: { type: Type.ARRAY, items: { type: Type.STRING } },
                 keyRisks: { type: Type.ARRAY, items: { type: Type.STRING } },
                 criticalVacancies: { type: Type.ARRAY, items: { type: Type.STRING } },
                 leadershipRisks: { type: Type.ARRAY, items: { type: Type.STRING } },
                 attritionRisks: { type: Type.ARRAY, items: { type: Type.STRING } },
                 hiringForecast: { type: Type.STRING },
                 trainingRecommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
                 compensationInsights: { type: Type.STRING }
               }
             },
             strategicDeliverables: {
               type: Type.OBJECT,
               properties: {
                 hrStrategy: { type: Type.STRING },
                 workforcePlan: { type: Type.STRING },
                 orgDesignRecommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
                 capabilityBuildingRoadmap: { type: Type.STRING },
                 transformationRoadmap: { type: Type.STRING }
               }
             },
             actionEngine: {
               type: Type.OBJECT,
               properties: {
                 immediateActions: { type: Type.ARRAY, items: { type: Type.STRING } },
                 actions30Day: { type: Type.ARRAY, items: { type: Type.STRING } },
                 actions90Day: { type: Type.ARRAY, items: { type: Type.STRING } },
                 actions12Month: { type: Type.ARRAY, items: { type: Type.STRING } }
               }
             }
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

