import React from 'react';
import { Search, Bell, Upload } from 'lucide-react';

export default function Navbar({ onUploadClick }) {
  return (
    <header className="h-16 border-b border-brand-border bg-brand-dark/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10">
      <div>
        <h2 className="text-lg font-bold text-brand-heading">Executive Overview</h2>
        <p className="text-xs text-gray-400">Automated contract risk scoring & policy oversight</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search contracts or parties..."
            className="bg-brand-card border border-brand-border rounded-lg pl-9 pr-4 py-1.5 text-xs text-brand-heading focus:outline-none focus:border-brand-orange w-64"
          />
        </div>

        {/* Action Buttons */}
        <button className="p-2 border border-brand-border rounded-lg hover:bg-brand-card text-gray-400 hover:text-white">
          <Bell className="w-4 h-4" />
        </button>

        <button 
          onClick={onUploadClick}
          className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orangeHover text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow-md shadow-orange-500/20 transition-all"
        >
          <Upload className="w-3.5 h-3.5" />
          + Upload Contract
        </button>
      </div>
    </header>
  );
}