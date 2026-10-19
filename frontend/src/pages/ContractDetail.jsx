import React from 'react';
import { ShieldAlert, CheckCircle2, ArrowLeft, AlertTriangle, FileText, Bot } from 'lucide-react';

export default function ContractDetail({ contract, onBack }) {
  if (!contract) return null;

  return (
    <div className="p-8 space-y-6 max-w-6xl mx-auto">
      {/* Header Navigation */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-xs text-gray-400 hover:text-brand-orange transition-all mb-2"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      {/* Contract Title Banner */}
      <div className="bg-brand-card border border-brand-border rounded-xl p-6 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-brand-heading">{contract.title || contract.filename}</h2>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              contract.risk_score > 60 
                ? 'bg-red-500/10 text-red-400 border border-red-500/30' 
                : 'bg-green-500/10 text-green-400 border border-green-500/30'
            }`}>
              {contract.risk_category} ({contract.risk_score}/100)
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Parsed & Analyzed by CogniContract AI Rules Engine</p>
        </div>
      </div>

      {/* Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Risk Score Gauge Box */}
        <div className="bg-brand-card border border-brand-border rounded-xl p-6 text-center space-y-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Overall Risk Score</p>
          <div className="text-4xl font-extrabold text-red-500">{contract.risk_score} <span className="text-sm font-normal text-gray-500">/ 100</span></div>
          <p className="text-xs text-red-400 bg-red-500/10 p-2 rounded-lg border border-red-500/20">
            Action Required: High compliance deviations detected.
          </p>
        </div>

        {/* Executive Summary */}
        <div className="md:col-span-2 bg-brand-card border border-brand-border rounded-xl p-6 space-y-2">
          <h4 className="text-sm font-bold text-brand-heading flex items-center gap-2">
            <FileText className="w-4 h-4 text-brand-orange" /> Executive AI Summary
          </h4>
          <p className="text-xs text-gray-300 leading-relaxed">
            {contract.summary}
          </p>
        </div>
      </div>

      {/* Policy Violations Section */}
      <div className="bg-brand-card border border-brand-border rounded-xl p-6 space-y-4">
        <h4 className="text-sm font-bold text-brand-heading flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-400" /> Detected Policy Violations ({contract.violations ? contract.violations.length : 0})
        </h4>
        
        <div className="space-y-3">
          {contract.violations && contract.violations.map((v, idx) => (
            <div key={idx} className="bg-red-500/5 border border-red-500/20 p-4 rounded-xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-red-400">{v.rule}</span>
                  <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded">{v.policy_id}</span>
                </div>
                <p className="text-gray-300"><strong>Finding:</strong> {v.finding}</p>
                <p className="text-gray-400"><strong>Required Policy standard:</strong> {v.expected}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Extracted Clause Analysis Table */}
      <div className="bg-brand-card border border-brand-border rounded-xl p-6 space-y-4">
        <h4 className="text-sm font-bold text-brand-heading">Extracted Clause Analysis & Recommendations</h4>
        <div className="space-y-3">
          {contract.clauses && contract.clauses.map((c, idx) => (
            <div key={idx} className="bg-brand-dark/60 border border-brand-border p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-orange">{c.section}: {c.title}</span>
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">{c.risk}</span>
              </div>
              <p className="text-xs italic text-gray-400 bg-brand-card p-2 rounded border border-brand-border">"{c.extracted_text}"</p>
              <p className="text-xs text-green-400 font-medium"><strong>Recommendation:</strong> {c.recommendation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}