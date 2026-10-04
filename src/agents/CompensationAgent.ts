import { BaseAgent } from './BaseAgent';
import { Type } from "@google/genai";

export class CompensationAgent extends BaseAgent {
  async processRequest(prompt: string, context: any): Promise<any> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: {
        systemInstruction: "You are a total rewards and compensation expert. Output structured JSON for salary benchmark, offer recommendation, retention risk, and pay equity analysis based on role, grade, location, and industry.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
             salaryBenchmark: { type: Type.STRING },
             offerRecommendation: { type: Type.STRING },
             retentionRisk: { type: Type.STRING },
             payEquityAnalysis: { type: Type.STRING }
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
