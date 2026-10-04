import { BaseAgent } from './BaseAgent';
import { Type } from "@google/genai";
import { JDGeneratorAgent } from './JDGeneratorAgent';
import { PolicyAgent } from './PolicyAgent';
import { AttritionAgent } from './AttritionAgent';
import { CompensationAgent } from './CompensationAgent';
import { RecruitmentAgent } from './RecruitmentAgent';
import { AuditAgent } from './AuditAgent';
import { HelpdeskAgent } from './HelpdeskAgent';
import { LearningAgent } from './LearningAgent';
import { OrgDesignAgent } from './OrgDesignAgent';
import { ConsultancyCopilotAgent } from './ConsultancyCopilotAgent';
import { logger } from '../utils/logger';

export class OrchestratorAgent extends BaseAgent {
  private customAgents: Record<string, BaseAgent>;

  constructor() {
    super();
    this.customAgents = {
      jdGenerator: new JDGeneratorAgent(),
      policy: new PolicyAgent(),
      attrition: new AttritionAgent(),
      compensation: new CompensationAgent(),
      recruitment: new RecruitmentAgent(),
      audit: new AuditAgent(),
      helpdesk: new HelpdeskAgent(),
      learning: new LearningAgent(),
      orgDesign: new OrgDesignAgent(),
      consultancy: new ConsultancyCopilotAgent(),
    };
  }

  async processRequest(prompt: string, context: any = {}): Promise<any> {
    logger.info(`Orchestrator received prompt: ${prompt}`);

    const routeResponse = await this.ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: `User Prompt: "${prompt}"\n\nWhich agent should handle this request? Available agents: jdGenerator, policy, attrition, compensation, recruitment, audit, helpdesk, learning, orgDesign, consultancy.`,
      config: {
        systemInstruction: "You are an intent router. Respond ONLY with the exact name of the agent matching the intent. Choose exactly one from the list. Return 'unknown' if no match.",
        responseMimeType: "text/plain"
      }
    });

    const targetAgentName = (routeResponse.text || '').trim();
    logger.info(`Orchestrator routing to: ${targetAgentName}`);

    if (this.customAgents[targetAgentName]) {
      const agent = this.customAgents[targetAgentName];
      const result = await agent.processRequest(prompt, context);
      return { agent: targetAgentName, result };
    } else {
      return { agent: 'unknown', result: "Sorry, I could not determine the right agent to handle this request." };
    }
  }
}
