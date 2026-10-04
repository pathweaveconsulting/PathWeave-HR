import React, { useState } from 'react';
import { BotIcon, FileTextIcon, PlayIcon, AlertCircleIcon, CheckCircle2Icon, UploadIcon } from 'lucide-react';
import { Company } from '../types.ts';

interface Props {
  company: Company;
}

export default function AuditDashboard({ company }: Props) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const runAudit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/agent-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: "audit",
          message: `Perform a comprehensive HR audit for ${company?.name}.`,
          history: []
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || data.error || data.text || "Failed to generate report.");
      }
      try {
        setResult(JSON.parse(data.text));
      } catch (parseError) {
        setResult({
          executiveSummary: data.text,
          hrMaturityScore: "N/A",
          complianceScore: "N/A",
          peopleRiskScore: "N/A"
        });
      }
    } catch (error: any) {
      console.error(error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BotIcon className="text-orange-500" /> SME HR Audit Agent
          </h2>
          <p className="text-sm text-gray-500 mt-1">AI-powered auditor for evaluating HR structure, compliance, and policies for {company?.name}.</p>
        </div>
      </div>
      
      <div className="bg-white border rounded-xl p-6 shadow-sm mb-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <UploadIcon className="w-4 h-4" /> Upload Context & Questionnaires
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div>
             <label className="text-sm font-medium text-gray-600 block mb-1">Company Handbook / Policies (PDF/DOCX)</label>
             <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 border p-2 rounded-md" />
           </div>
           <div>
             <label className="text-sm font-medium text-gray-600 block mb-1">Audit Questionnaire Responses (CSV/Excel)</label>
             <input type="file" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 border p-2 rounded-md" />
           </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button 
            onClick={runAudit}
            disabled={loading}
            className="bg-orange-600 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:bg-orange-700 disabled:opacity-50"
          >
            {loading ? "Running Audit..." : <><PlayIcon className="w-4 h-4" /> Run Full Audit</>}
          </button>
        </div>
      </div>

      {result && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2">
               <span className="text-sm text-gray-500 font-medium">HR Maturity Score</span>
               <span className="text-3xl font-bold text-gray-900">{result.hrMaturityScore}</span>
             </div>
             <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2">
               <span className="text-sm text-gray-500 font-medium">Compliance Score</span>
               <span className="text-3xl font-bold text-green-600">{result.complianceScore}</span>
             </div>
             <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2">
               <span className="text-sm text-gray-500 font-medium">People Risk Score</span>
               <span className="text-3xl font-bold text-red-600">{result.peopleRiskScore}</span>
             </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Executive Summary</h3>
            <p className="text-gray-700 leading-relaxed">{result.executiveSummary}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Risk Heatmap</h3>
              <div className="space-y-4">
                {result.riskHeatmap?.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between items-start border-b pb-4 last:border-0">
                    <div>
                      <h4 className="font-medium text-gray-900">{item.area}</h4>
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.riskLevel === 'High' ? 'bg-red-100 text-red-700' : item.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                      {item.riskLevel} Risk
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><AlertCircleIcon className="text-red-500 w-5 h-5"/> Top Findings</h3>
                <ul className="space-y-2">
                  {result.topFindings?.map((item: string, i: number) => (
                    <li key={i} className="text-sm text-gray-700 list-disc ml-4">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"><CheckCircle2Icon className="text-green-500 w-5 h-5"/> Quick Wins</h3>
                <ul className="space-y-2">
                  {result.quickWins?.map((item: string, i: number) => (
                    <li key={i} className="text-sm text-gray-700 list-disc ml-4">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-4">Transformation Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">30 Day Action Plan</h4>
                <ul className="space-y-2 text-sm text-blue-900/80">
                  {result.actionPlan30Day?.map((item: string, i: number) => <li key={i}>• {item}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">90 Day Plan</h4>
                <ul className="space-y-2 text-sm text-blue-900/80">
                  {result.transformationPlan90Day?.map((item: string, i: number) => <li key={i}>• {item}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">12 Month Roadmap</h4>
                <ul className="space-y-2 text-sm text-blue-900/80">
                  {result.roadmap12Month?.map((item: string, i: number) => <li key={i}>• {item}</li>)}
                </ul>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
