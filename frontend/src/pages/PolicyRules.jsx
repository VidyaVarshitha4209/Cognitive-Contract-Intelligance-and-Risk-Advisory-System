import React from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export default function PolicyRules() {
  const rules = [
    { id: "GR-12", name: "Termination Notice Period", rule: "Minimum 30 days notice required", status: "Active" },
    { id: "GR-08", name: "Liability Cap", rule: "Liability cap must not exceed total agreement value", status: "Active" },
    { id: "GR-15", name: "Support & Maintenance", rule: "Minimum support duration of 12 months", status: "Active" },
    { id: "GR-20", name: "Payment Terms", rule: "Payment period must be <= 30 days", status: "Active" },
  ];

  return (
    <div className="p-8 space-y-6">
      <div>
        <h3 className="text-xl font-bold text-brand-heading">Corporate Policy Rules Engine</h3>
        <p className="text-xs text-gray-400">Predefined compliance rules used to cross-verify extracted contract terms.</p>
      </div>

      <div className="bg-brand-card border border-brand-border rounded-xl p-6">
        <div className="space-y-3">
          {rules.map((r) => (
            <div key={r.id} className="flex items-center justify-between p-4 bg-brand-dark/50 border border-brand-border rounded-lg">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-xs font-bold text-brand-heading">{r.id}: {r.name}</p>
                  <p className="text-[11px] text-gray-400">{r.rule}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-green-400 bg-green-500/10 px-2.5 py-1 rounded-full border border-green-500/30">
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}