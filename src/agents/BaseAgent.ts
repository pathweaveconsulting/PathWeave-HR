import { GoogleGenAI, Type } from "@google/genai";
import { logger } from '../utils/logger';

export abstract class BaseAgent {
  protected ai: GoogleGenAI;
  
  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set");
    }
    this.ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: { 'User-Agent': 'aistudio-build' }
      }
    });
  }

  abstract processRequest(prompt: string, context: any): Promise<any>;
}
