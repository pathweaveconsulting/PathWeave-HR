import { BaseAgent } from './BaseAgent';
import { Type } from "@google/genai";

export class PolicyAgent extends BaseAgent {
  async processRequest(prompt: string, context: any): Promise<any> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert HR Policy Writer. Create an HR policy (e.g. Leave, POSH, Remote Work) based on the query. Format as markdown.",
      }
    });
    return { content: response.text, format: 'markdown' };
  }
}
