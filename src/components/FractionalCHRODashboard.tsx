import React, { useState } from 'react';
import { BotIcon, BarChart2Icon, UsersIcon, ShieldIcon, BriefcaseIcon } from 'lucide-react';
import { Company } from '../types.ts';

interface Props {
  company: Company;
}

export default function FractionalCHRODashboard({ company }: Props) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const requestCHRO = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/agent-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: "consultancy",
          message: `Act as Fractional CHRO. Generate the Monthly CHRO Report and Strategic deliverables for ${company?.name}.`,
          companyData: {
             name: company?.name,
             sector: company?.sector,
             industry: company?.sector,
             recentAttrition: "15%"
          }
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
          monthlyReport: {
            peopleHighlights: ["Raw text output generated"],
            keyRisks: [data.text]
          }
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
      <div className="flex justify-between items-center bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-xl">
        <div className="text-white">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BriefcaseIcon className="text-blue-400" /> Fractional CHRO Copilot
          </h2>
          <p className="text-sm text-gray-400 mt-1">Virtual Chief Human Resources Officer and Strategy Advisor for {company?.name}.</p>
        </div>
        <button 
          onClick={requestCHRO}
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Generate Monthly CHRO Pack"}
        </button>
      </div>

      {result && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Monthly Report Summary */}
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white border p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2">
                <BarChart2Icon className="w-5 h-5" /> Executive Monthly Report
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <h4 className="font-semibold text-gray-800 mb-2">People Highlights</h4>
                   <ul className="list-disc ml-5 space-y-2 text-sm text-gray-600">
                     {result.monthlyReport?.peopleHighlights?.map((item: string, i: number) => <li key={i}>{item}</li>)}
                   </ul>
                 </div>
                 <div>
                   <h4 className="font-semibold text-red-700 mb-2">Key Risks & Attrition</h4>
                   <ul className="list-disc ml-5 space-y-2 text-sm text-gray-600">
                     {result.monthlyReport?.keyRisks?.map((item: string, i: number) => <li key={i}>{item}</li>)}
                     {result.monthlyReport?.attritionRisks?.map((item: string, i: number) => <li key={i}>{item}</li>)}
                   </ul>
                 </div>
              </div>

              <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                 <div className="bg-gray-50 p-4 rounded-lg">
                   <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Hiring Forecast</p>
                   <p className="mt-1 font-semibold text-gray-900">{result.monthlyReport?.hiringForecast}</p>
                 </div>
                 <div className="bg-gray-50 p-4 rounded-lg">
                   <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Critical Vacancies</p>
                   <p className="mt-1 font-semibold text-gray-900">{result.monthlyReport?.criticalVacancies?.length || 0} Open</p>
                 </div>
                 <div className="bg-gray-50 p-4 rounded-lg">
                   <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Comp Insights</p>
                   <p className="mt-1 font-medium text-sm text-gray-900">{result.monthlyReport?.compensationInsights}</p>
                 </div>
              </div>
            </div>

            {/* Strategic Deliverables */}
            <div className="bg-gradient-to-br from-indigo-900 to-blue-900 p-6 rounded-xl shadow-lg text-white">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ShieldIcon className="w-5 h-5 text-indigo-300" /> Strategic Deliverables
              </h3>
              <div className="space-y-6">
                 <div>
                   <h4 className="text-indigo-200 font-medium text-sm uppercase tracking-wider mb-2">HR Strategy</h4>
                   <p className="text-sm leading-relaxed">{result.strategicDeliverables?.hrStrategy}</p>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <h4 className="text-indigo-200 font-medium text-sm uppercase tracking-wider mb-2">Org Design Recs</h4>
                     <ul className="list-disc ml-4 space-y-1 text-sm text-indigo-50">
                        {result.strategicDeliverables?.orgDesignRecommendations?.map((item: string, i: number) => <li key={i}>{item}</li>)}
                     </ul>
                   </div>
                   <div>
                     <h4 className="text-indigo-200 font-medium text-sm uppercase tracking-wider mb-2">Transformation Roadmap</h4>
                     <p className="text-sm leading-relaxed text-indigo-50">{result.strategicDeliverables?.transformationRoadmap}</p>
                   </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Action Engine */}
          <div className="xl:col-span-1 border bg-white p-6 rounded-xl shadow-sm">
             <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2">CHRO Action Engine</h3>
             
             <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                
                {/* Immediate */}
                <div className="relative flex items-start group">
                  <div className="h-6 w-6 rounded-full bg-red-100 border-2 border-red-500 absolute left-0 flex items-center justify-center shrink-0 shadow">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  </div>
                  <div className="pl-10">
                    <h4 className="font-bold text-gray-900 flex items-center gap-2 text-sm uppercase">Immediate</h4>
                    <ul className="mt-2 text-sm text-gray-600">
                      {result.actionEngine?.immediateActions?.map((act: string, i: number) => (
                        <li key={i} className="flex flex-col gap-1 py-1 border-b border-gray-100 last:border-0 group/item">
                          <span>• {act}</span>
                          <button onClick={() => alert("Task assigned in Jira/Asana: " + act)} className="text-[10px] text-blue-600 font-bold self-start mt-1 hidden group-hover/item:block">
                            + Create Action Item
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 30 Day */}
                <div className="relative flex items-start group">
                  <div className="h-6 w-6 rounded-full bg-orange-100 border-2 border-orange-500 absolute left-0 flex items-center justify-center shrink-0 shadow">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  </div>
                  <div className="pl-10">
                    <h4 className="font-bold text-gray-900 flex items-center gap-2 text-sm uppercase">30 Days</h4>
                    <ul className="mt-2 text-sm text-gray-600">
                      {result.actionEngine?.actions30Day?.map((act: string, i: number) => (
                        <li key={i} className="flex flex-col gap-1 py-1 border-b border-gray-100 last:border-0 group/item">
                          <span>• {act}</span>
                          <button onClick={() => alert("Project plan initiated: " + act)} className="text-[10px] text-orange-600 font-bold self-start mt-1 hidden group-hover/item:block">
                            + Draft Project Plan
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 90 Day */}
                <div className="relative flex items-start group">
                  <div className="h-6 w-6 rounded-full bg-blue-100 border-2 border-blue-500 absolute left-0 flex items-center justify-center shrink-0 shadow">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  </div>
                  <div className="pl-10">
                    <h4 className="font-bold text-gray-900 flex items-center gap-2 text-sm uppercase">90 Days</h4>
                    <ul className="mt-2 text-sm text-gray-600">
                      {result.actionEngine?.actions90Day?.map((act: string, i: number) => (
                        <li key={i} className="flex flex-col gap-1 py-1 border-b border-gray-100 last:border-0 group/item">
                          <span>• {act}</span>
                          <button onClick={() => alert("Strategy added to roadmap: " + act)} className="text-[10px] text-blue-600 font-bold self-start mt-1 hidden group-hover/item:block">
                            + Add to Roadmap
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 12 Months */}
                <div className="relative flex items-start group">
                  <div className="h-6 w-6 rounded-full bg-green-100 border-2 border-green-500 absolute left-0 flex items-center justify-center shrink-0 shadow">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  </div>
                  <div className="pl-10">
                    <h4 className="font-bold text-gray-900 flex items-center gap-2 text-sm uppercase">12 Months (Strategic)</h4>
                    <ul className="mt-2 text-sm text-gray-600">
                      {result.actionEngine?.actions12Month?.map((act: string, i: number) => (
                        <li key={i} className="flex flex-col gap-1 py-1 border-b border-gray-100 last:border-0 group/item">
                          <span>• {act}</span>
                          <button onClick={() => alert("Long-term goal set: " + act)} className="text-[10px] text-green-600 font-bold self-start mt-1 hidden group-hover/item:block">
                            + Track as OKR
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

             </div>
          </div>
        </div>
      )}
    </div>
  );
}
