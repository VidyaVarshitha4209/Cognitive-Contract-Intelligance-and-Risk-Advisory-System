import React from 'react';
import { ShieldAlert, Clock, RefreshCw, FileText, ArrowRight } from 'lucide-react';

export default function Dashboard({ onSelectContract }) {
  const stats = [
    { title: "TOTAL UNDER MANAGEMENT", value: "4", sub: "+100% active", icon: FileText, color: "text-blue-400" },
    { title: "HIGH RISK FLAGGED", value: "1", sub: "Requires General Counsel review", icon: ShieldAlert, color: "text-red-400" },
    { title: "REVIEW TIME SAVED", value: "74%", sub: "Cumulative ~4.2 hrs/contract", icon: Clock, color: "text-green-400" },
    { title: "RENEWALS DUE SOON", value: "2", sub: "Next 30–90 days", icon: RefreshCw, color: "text-amber-400" },
  ];

  const contracts = [
    {
      id: 1,
      title: "Software Development Agreement",
      counterparty: "ABC Technologies / XYZ Solutions",
      type: "Commercial Agreement",
      risk: "High Risk",
      score: 72,
      date: "Apr 12, 2025"
    },
    {
      id: 2,
      title: "Vertex Enterprise Cloud Agreement",
      counterparty: "Apex Global Solutions & Client",
      type: "Service Agreement",
      risk: "Medium Risk",
      score: 40,
      date: "Oct 01, 2024"
    },
    {
      id: 3,
      title: "Cloud SaaS Subscription Agreement",
      counterparty: "DataSphere Technologies LLC",
      type: "SaaS Agreement",
      risk: "Medium Risk",
      score: 48,
      date: "Jan 01, 2025"
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Metrics Section */}
      <div>
        <h3 className="text-xl font-bold text-brand-heading mb-1">Contract Intelligence Portfolio</h3>
        <p className="text-xs text-gray-400 mb-6">Continuous legal risk governance, automated clause extraction, and policy compliance.</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="bg-brand-card border border-brand-border rounded-xl p-5 space-y-2">
                <div className="flex items-center justify-between text-gray-400">
                  <span className="text-[10px] font-bold tracking-wider">{s.title}</span>
                  <Icon className={`w-4 h-4 ${s.color}`} />
                </div>
                <div className="text-3xl font-extrabold text-brand-heading">{s.value}</div>
                <p className="text-[11px] text-gray-400">{s.sub}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contract List Table */}
      <div className="bg-brand-card border border-brand-border rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-brand-border pb-4">
          <div>
            <h4 className="text-sm font-bold text-brand-heading">Recent Contract Ingestions</h4>
            <p className="text-xs text-gray-400">Select any agreement to inspect marked clauses, policy explanations, and RAG chatbot.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[10px] uppercase text-gray-400 border-b border-brand-border bg-brand-dark/40">
              <tr>
                <th className="py-3 px-4">Contract Title & File</th>
                <th className="py-3 px-4">Counterparty</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Risk Assessment</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Effective Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {contracts.map((item) => (
                <tr key={item.id} className="hover:bg-brand-border/20 transition-all">
                  <td className="py-4 px-4 font-semibold text-brand-heading">{item.title}</td>
                  <td className="py-4 px-4 text-gray-400">{item.counterparty}</td>
                  <td className="py-4 px-4 text-gray-400">{item.type}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      item.risk === 'High Risk' ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    }`}>
                      • {item.risk}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold text-brand-heading">{item.score}</td>
                  <td className="py-4 px-4 text-gray-400">{item.date}</td>
                  <td className="py-4 px-4 text-right">
                    <button 
                      onClick={() => onSelectContract(item)}
                      className="inline-flex items-center gap-1 text-brand-orange hover:underline font-semibold"
                    >
                      Open <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}