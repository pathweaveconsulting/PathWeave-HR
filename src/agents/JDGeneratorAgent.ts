import { BaseAgent } from './BaseAgent';
import { Type } from "@google/genai";

export class JDGeneratorAgent extends BaseAgent {
  async processRequest(prompt: string, context: any): Promise<any> {
    const inputContent = `
    Input Parameters:
    ${JSON.stringify(context, null, 2)}
    User Query: ${prompt}
    `;

    const response = await this.ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: inputContent,
      config: {
        systemInstruction: "You are a Chief Human Resources Officer, HRBP, Talent Acquisition Leader, Competency Architect, and Organizational Design Consultant. Generate an enterprise-grade JD and KRA Generation documentation in JSON format based on the inputs.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
             jobDescription: {
               type: Type.OBJECT,
               properties: {
                 rolePurpose: { type: Type.STRING },
                 keyResponsibilities: { type: Type.ARRAY, items: { type: Type.STRING } },
                 requiredExperience: { type: Type.STRING },
                 requiredSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                 educationalQualification: { type: Type.STRING },
                 behaviouralCompetencies: { type: Type.ARRAY, items: { type: Type.STRING } },
                 technicalCompetencies: { type: Type.ARRAY, items: { type: Type.STRING } },
                 reportingRelationships: { type: Type.STRING },
                 successMetrics: { type: Type.ARRAY, items: { type: Type.STRING } },
               }
             },
             kras: { 
               type: Type.ARRAY, 
               items: { 
                 type: Type.OBJECT, 
                 properties: {
                   objective: { type: Type.STRING },
                   measurementMethod: { type: Type.STRING },
                   weightage: { type: Type.STRING },
                   frequency: { type: Type.STRING },
                   expectedOutcome: { type: Type.STRING }
                 }
               }
             },
             kpis: { type: Type.ARRAY, items: { type: Type.STRING } },
             interviewKit: {
               type: Type.OBJECT,
               properties: {
                 screeningQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
                 behaviouralQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
                 technicalQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
                 caseStudyQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
                 scorecard: { type: Type.ARRAY, items: { type: Type.STRING } }
               }
             },
             compensationInsights: {
               type: Type.OBJECT,
               properties: {
                 salaryBand: { type: Type.STRING },
                 offerRecommendation: { type: Type.STRING },
                 retentionRisk: { type: Type.STRING },
                 criticalityScore: { type: Type.STRING }
               }
             },
             successProfile: {
               type: Type.OBJECT,
               properties: {
                 plan30Day: { type: Type.ARRAY, items: { type: Type.STRING } },
                 plan60Day: { type: Type.ARRAY, items: { type: Type.STRING } },
                 plan90Day: { type: Type.ARRAY, items: { type: Type.STRING } },
                 firstYearSuccessMetrics: { type: Type.ARRAY, items: { type: Type.STRING } }
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

