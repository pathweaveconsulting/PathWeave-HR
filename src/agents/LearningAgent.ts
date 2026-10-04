import { BaseAgent } from './BaseAgent';
import { Type } from "@google/genai";

export class LearningAgent extends BaseAgent {
  async processRequest(prompt: string, context: any): Promise<any> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: {
        systemInstruction: "You are a Learning & Development Expert. Generate a Training Needs Analysis, Learning Path, Competency Matrix, or Leadership Development Plan based on the prompt.",
      }
    });

    return { content: response.text };
  }
}
