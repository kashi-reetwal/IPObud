'use client';

import React from 'react';
import { TrendingUp, Bell, Search, ShieldCheck, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenAllotment: () => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  activeFilter: string;
  setActiveFilter: (val: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAllotment,
  searchTerm,
  setSearchTerm,
  activeFilter,
  setActiveFilter,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#080c14]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#080c14]">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-black tracking-tight text-white">
                IPO<span className="text-cyan-400">bud</span>
              </span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                LIVE TERMINAL
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400">
              Indian Stock Exchanges (NSE & BSE)
            </p>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center space-x-3">
          <div className="relative hidden md:block w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by company or ticker..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900/60 py-2 pl-9 pr-4 text-xs text-white placeholder-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
            />
          </div>

          {/* Quick Allotment Lookup Button */}
          <button
            onClick={onOpenAllotment}
            className="flex items-center space-x-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all shadow-sm"
          >
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
            <span>Check Allotment</span>
          </button>

          {/* Live Alert Trigger */}
          <button
            onClick={() => alert('Alert notifications enabled! You will be notified on bidding closure and allotment dates.')}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 text-slate-300 hover:text-white hover:border-white/20 transition-all"
            title="Notification Alerts"
          >
            <Bell className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div className="mx-auto flex max-w-7xl items-center space-x-2 px-4 py-2 sm:px-6 overflow-x-auto text-xs font-medium">
        {[
          { id: 'ALL', label: 'All Issues' },
          { id: 'ACTIVE', label: '🔴 Live Bidding' },
          { id: 'UPCOMING', label: '⏳ Upcoming' },
          { id: 'ALLOTTED', label: '🎯 Allotment Out' },
          { id: 'MAINBOARD', label: '🏢 Mainboard' },
          { id: 'SME', label: '⚡ SME Sector' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 transition-all ${
              activeFilter === tab.id
                ? 'bg-white/15 text-white font-semibold shadow-inner border border-white/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
};
