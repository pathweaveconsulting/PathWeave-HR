import React, { useState, useEffect } from 'react';
import { BotIcon, SettingsIcon, CheckCircle2Icon } from 'lucide-react';
import { Company } from '../types.ts';

interface Props {
  company: Company;
}

export default function JDGeneratorDashboard({ company }: Props) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [form, setForm] = useState({
    industry: company?.sector || 'IT Services',
    department: 'Engineering',
    role: 'Senior Full Stack Developer',
    experience: '5-8 years'
  });

  useEffect(() => {
    setForm(prev => ({ ...prev, industry: company?.sector || 'IT Services' }));
  }, [company]);

  const generate = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/agent-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: "jdGenerator",
          message: "Generate JD and KRAs",
          history: [],
          ...form // passing context loosely as rest of object
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
          jobDescription: {
            rolePurpose: data.text
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
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BotIcon className="text-indigo-500" /> JD & KRA Generator
          </h2>
          <p className="text-sm text-gray-500 mt-1">Generate enterprise-grade recruitment and performance documentation for {company?.name}.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 border border-gray-100 bg-white p-5 rounded-xl shadow-sm space-y-4 h-fit">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
            <SettingsIcon className="w-4 h-4 text-gray-500"/> Parameters
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-500">Role</label>
              <input 
                type="text" 
                value={form.role} 
                onChange={e => setForm({...form, role: e.target.value})}
                className="mt-1 w-full text-sm p-2 border border-gray-300 rounded-md text-gray-900 bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Industry</label>
              <input 
                type="text" 
                value={form.industry} 
                onChange={e => setForm({...form, industry: e.target.value})}
                className="mt-1 w-full text-sm p-2 border border-gray-300 rounded-md text-gray-900 bg-white shadow-sm"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500">Experience</label>
              <input 
                type="text" 
                value={form.experience} 
                onChange={e => setForm({...form, experience: e.target.value})}
                className="mt-1 w-full text-sm p-2 border border-gray-300 rounded-md text-gray-900 bg-white shadow-sm"
              />
            </div>
          </div>
          <button 
            onClick={generate}
            disabled={loading}
            className="w-full mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Docs"}
          </button>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {result && (
            <>
              {/* Job Description Part */}
              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 border-b pb-4 mb-4">Job Description: {form.role}</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Role Purpose</h4>
                    <p className="text-sm text-gray-700">{result.jobDescription?.rolePurpose}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Key Responsibilities</h4>
                      <ul className="list-disc ml-4 space-y-1">
                        {result.jobDescription?.keyResponsibilities?.map((item: string, i: number) => (
                          <li key={i}>
                            <input type="text" value={item} onChange={e => {
                               const newArr = [...result.jobDescription.keyResponsibilities];
                               newArr[i] = e.target.value;
                               setResult({...result, jobDescription: {...result.jobDescription, keyResponsibilities: newArr}});
                            }} className="w-full text-sm text-gray-700 bg-transparent border-b border-gray-200 outline-none focus:border-indigo-500 py-1" />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                       <h4 className="font-semibold text-gray-900 mb-2">Success Metrics</h4>
                       <ul className="list-disc ml-4 space-y-1">
                        {result.jobDescription?.successMetrics?.map((item: string, i: number) => (
                          <li key={i}>
                             <input type="text" value={item} onChange={e => {
                               const newArr = [...result.jobDescription.successMetrics];
                               newArr[i] = e.target.value;
                               setResult({...result, jobDescription: {...result.jobDescription, successMetrics: newArr}});
                            }} className="w-full text-sm text-gray-700 bg-transparent border-b border-gray-200 outline-none focus:border-indigo-500 py-1" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* KRAs & KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-4 border-b pb-2">Key Result Areas (KRAs)</h4>
                  <div className="space-y-4">
                    {result.kras?.map((kra: any, i: number) => (
                      <div key={i} className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex flex-col gap-2">
                        <textarea rows={2} value={kra.objective} onChange={e => {
                             const newArr = [...result.kras];
                             newArr[i] = {...kra, objective: e.target.value};
                             setResult({...result, kras: newArr});
                        }} className="font-medium text-sm text-gray-900 bg-transparent border-b border-gray-200 outline-none focus:border-indigo-500 w-full resize-none" />
                        <div className="mt-1 flex gap-2 text-xs text-gray-500 items-center">
                          <span className="bg-white px-2 py-1 rounded border flex items-center gap-1">Wt: <input type="text" value={kra.weightage} onChange={e => {
                             const newArr = [...result.kras];
                             newArr[i] = {...kra, weightage: e.target.value};
                             setResult({...result, kras: newArr});
                          }} className="w-12 outline-none" /></span>
                          <span className="bg-white px-2 py-1 rounded border flex items-center gap-1">Freq: <input type="text" value={kra.frequency} onChange={e => {
                             const newArr = [...result.kras];
                             newArr[i] = {...kra, frequency: e.target.value};
                             setResult({...result, kras: newArr});
                          }} className="w-16 outline-none" /></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <h4 className="font-bold text-gray-900 mb-4 border-b pb-2">Key Performance Indicators (KPIs)</h4>
                    <ul className="space-y-2">
                       {result.kpis?.map((kpi: string, i: number) => (
                         <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                           <CheckCircle2Icon className="w-4 h-4 text-green-500 mt-1" shrink-0="true" /> 
                           <textarea rows={2} value={kpi} onChange={e => {
                               const newArr = [...result.kpis];
                               newArr[i] = e.target.value;
                               setResult({...result, kpis: newArr});
                           }} className="w-full bg-transparent border-b border-gray-200 outline-none focus:border-indigo-500 resize-none" />
                         </li>
                       ))}
                    </ul>
                  </div>

                  <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl shadow-sm">
                    <h4 className="font-bold text-indigo-900 mb-4 border-b border-indigo-200 pb-2">Compensation Insights</h4>
                    <div className="space-y-3 text-sm text-indigo-900/80">
                      <p><strong className="text-indigo-900">Salary Band:</strong> {result.compensationInsights?.salaryBand}</p>
                      <p><strong className="text-indigo-900">Offer Rec:</strong> {result.compensationInsights?.offerRecommendation}</p>
                      <p><strong className="text-indigo-900">Retention Risk:</strong> {result.compensationInsights?.retentionRisk}</p>
                      <p><strong className="text-indigo-900">Criticality:</strong> {result.compensationInsights?.criticalityScore}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interview Kit */}
              <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h4 className="font-bold text-gray-900 mb-4 border-b pb-2">Interview Kit</h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <h5 className="font-semibold text-sm mb-2">Screening</h5>
                    <ul className="list-disc ml-4 space-y-1 text-xs text-gray-600">
                      {result.interviewKit?.screeningQuestions?.map((q: string, i: number) => <li key={i}>{q}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm mb-2">Behavioural</h5>
                    <ul className="list-disc ml-4 space-y-1 text-xs text-gray-600">
                      {result.interviewKit?.behaviouralQuestions?.map((q: string, i: number) => <li key={i}>{q}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm mb-2">Technical</h5>
                    <ul className="list-disc ml-4 space-y-1 text-xs text-gray-600">
                      {result.interviewKit?.technicalQuestions?.map((q: string, i: number) => <li key={i}>{q}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm mb-2">Scorecard Focus</h5>
                    <ul className="list-disc ml-4 space-y-1 text-xs text-gray-600">
                      {result.interviewKit?.scorecard?.map((q: string, i: number) => <li key={i}>{q}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {!result && !loading && (
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
              Set parameters and click generate to create documentation
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
