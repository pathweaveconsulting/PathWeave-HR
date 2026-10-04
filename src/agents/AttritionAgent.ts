import { BaseAgent } from './BaseAgent';
import { Type } from "@google/genai";

export class AttritionAgent extends BaseAgent {
  async processRequest(prompt: string, context: any): Promise<any> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: `Provide an attrition analysis and prediction based on the following input or question: ${prompt}`,
      config: {
        systemInstruction: "You are an HR Analytics expert. Analyze attrition risk, give reasons, and suggest interventions based on tenure, compensation, performance, and engagement data provided. Output structured JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
             attritionRisk: { type: Type.STRING, description: "Low, Medium, or High" },
             reasons: { type: Type.ARRAY, items: { type: Type.STRING } },
             interventions: { type: Type.ARRAY, items: { type: Type.STRING } }
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
