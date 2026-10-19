import React from 'react';
import { LayoutDashboard, FileText, Upload, ShieldAlert, Settings, Cpu } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload', label: 'Upload Contract', icon: Upload },
    { id: 'contracts', label: 'My Contracts', icon: FileText },
    { id: 'policy', label: 'Policy Rules', icon: ShieldAlert },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-brand-card border-r border-brand-border h-screen flex flex-col justify-between fixed left-0 top-0 z-20">
      <div>
        {/* Brand Header Updated - CogniContract */}
        <div className="p-5 border-b border-brand-border flex items-center gap-3">
          <div className="p-2 bg-orange-500/10 border border-orange-500/30 rounded-lg text-brand-orange">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-brand-heading leading-tight">CogniContract</h1>
            <p className="text-[10px] text-gray-400">Contract Intelligence</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          <p className="text-[10px] font-semibold text-gray-500 px-3 py-2 uppercase tracking-wider">Navigation</p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-orange text-white shadow-lg shadow-orange-500/20'
                    : 'text-gray-400 hover:bg-brand-border/40 hover:text-brand-heading'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Info Footer */}
      <div className="p-4 border-t border-brand-border flex items-center gap-3 bg-brand-dark/40">
        <div className="w-8 h-8 rounded-full bg-brand-orange text-white font-bold flex items-center justify-center text-xs">
          VV
        </div>
        <div className="overflow-hidden">
          <p className="text-xs font-semibold text-brand-heading truncate">Vidya Varshitha</p>
          <p className="text-[10px] text-gray-400 truncate">Legal Tech Lead</p>
        </div>
      </div>
    </div>
  );
}