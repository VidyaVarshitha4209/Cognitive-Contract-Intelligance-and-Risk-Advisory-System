import React from 'react';

export default function RiskGauge({ score = 72, label = "High Risk" }) {
  const getScoreColor = (s) => {
    if (s >= 70) return '#ef4444'; // Red
    if (s >= 40) return '#f59e0b'; // Amber
    return '#10b981'; // Green
  };

  const color = getScoreColor(score);

  return (
    <div className="flex items-center gap-4 bg-brand-card border border-brand-border p-4 rounded-xl">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-brand-border"
            strokeWidth="3.5"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            strokeWidth="3.5"
            strokeDasharray={`${score}, 100`}
            strokeLinecap="round"
            stroke={color}
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div className="absolute text-center">
          <span className="text-xl font-extrabold text-brand-heading">{score}</span>
          <span className="text-[9px] block text-gray-400">/100</span>
        </div>
      </div>
      <div>
        <h4 className="text-xs font-bold uppercase text-gray-400">Overall Risk Score</h4>
        <p className="text-lg font-bold" style={{ color }}>{label}</p>
        <p className="text-[11px] text-gray-400">Calculated from missing clauses and policy violations.</p>
      </div>
    </div>
  );
}