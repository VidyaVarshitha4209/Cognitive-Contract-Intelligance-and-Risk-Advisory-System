import React from 'react';
import { FileText, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function MyContracts({ onSelectContract }) {
  const contractList = [
    {
      id: 1,
      title: "Software Development Agreement",
      counterparty: "ABC Technologies / XYZ Solutions",
      type: "Commercial Agreement",
      risk: "High Risk",
      score: 72,
      date: "Apr 12, 2025",
      status: "Reviewed"
    },
    {
      id: 2,
      title: "Vertex Enterprise Cloud Agreement",
      counterparty: "Apex Global Solutions",
      type: "Service Agreement",
      risk: "Medium Risk",
      score: 40,
      date: "Oct 01, 2024",
      status: "Approved"
    },
    {
      id: 3,
      title: "Cloud SaaS Subscription Agreement",
      counterparty: "DataSphere Technologies LLC",
      type: "SaaS Agreement",
      risk: "Medium Risk",
      score: 48,
      date: "Jan 01, 2025",
      status: "Pending Negotiation"
    },
    {
      id: 4,
      title: "Master Services Agreement (MSA)",
      counterparty: "Acme Cybernetics Corp",
      type: "Vendor Contract",
      risk: "Low Risk",
      score: 18,
      date: "Feb 15, 2025",
      status: "Approved"
    }
  ];

  return (
    <div className="p-8 space-y-6">
      <div>
        <h3 className="text-xl font-bold text-brand-heading">My Contracts Portfolio</h3>
        <p className="text-xs text-gray-400">All historical uploaded agreements, risk assessments, and extracted parameters.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contractList.map((item) => (
          <div key={item.id} className="bg-brand-card border border-brand-border rounded-xl p-5 space-y-4 hover:border-brand-orange/50 transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-border/40 rounded-lg text-brand-orange">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-brand-heading">{item.title}</h4>
                  <p className="text-xs text-gray-400">{item.counterparty}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                item.risk === 'High Risk' 
                  ? 'bg-red-500/10 text-red-400 border border-red-500/30' 
                  : item.risk === 'Medium Risk'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  : 'bg-green-500/10 text-green-400 border border-green-500/30'
              }`}>
                {item.risk} ({item.score}/100)
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-brand-border text-xs text-gray-400">
              <span>Type: <strong className="text-brand-heading">{item.type}</strong></span>
              <span>Date: {item.date}</span>
              <button 
                onClick={() => onSelectContract(item)}
                className="flex items-center gap-1 text-brand-orange font-bold hover:underline"
              >
                View Report <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}