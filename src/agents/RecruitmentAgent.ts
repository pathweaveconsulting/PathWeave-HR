import { BaseAgent } from './BaseAgent';
import { Type } from "@google/genai";

export class RecruitmentAgent extends BaseAgent {
  async processRequest(prompt: string, context: any): Promise<any> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert Recruitment Agent. Provide a candidate scoring model, pipeline status, or interview schedule based on the query.",
      }
    });

    return { content: response.text };
  }
}
