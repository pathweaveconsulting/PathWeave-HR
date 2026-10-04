import { BaseAgent } from './BaseAgent';
import { Type } from "@google/genai";

export class HelpdeskAgent extends BaseAgent {
  async processRequest(prompt: string, context: any): Promise<any> {
    const contextPrompt = `Context (Company Policies): ${JSON.stringify(context.policies || {})}\n\nUser Question: ${prompt}`;
    
    const response = await this.ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: contextPrompt,
      config: {
        systemInstruction: "You are an Employee Helpdesk Agent. Answer employee questions based strictly on the provided company policies. If the policy is unclear, suggest an escalation to HR.",
      }
    });

    return { content: response.text };
  }
}
