import { BaseAgent } from './BaseAgent';
import { Type } from "@google/genai";

export class OrgDesignAgent extends BaseAgent {
  async processRequest(prompt: string, context: any): Promise<any> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: {
        systemInstruction: "You are an Org Design Expert. Output JSON representing Org Structures, Span of Control recommendations, and Reporting Hierarchy based on the query.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
             structure: { type: Type.ARRAY, items: { type: Type.STRING } },
             spanOfControl: { type: Type.STRING },
             recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
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
