'use client';

import React from 'react';
import { Search, ShieldCheck, Bell, Activity } from 'lucide-react';

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
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-[#090a0f]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-100 font-mono font-bold text-sm">
            IPO
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-base font-bold tracking-tight text-white font-mono">
                IPObud
              </span>
              <span className="rounded border border-zinc-700 bg-zinc-900 px-1.5 py-0.5 text-[10px] font-mono font-medium text-zinc-300">
                TERMINAL
              </span>
            </div>
            <p className="text-[11px] font-mono text-zinc-400">
              National Stock Exchange & Bombay Stock Exchange
            </p>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center space-x-2.5">
          <div className="relative hidden md:block w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search company or ticker..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/80 py-1.5 pl-8 pr-3 text-xs text-white placeholder-zinc-500 focus:border-zinc-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Allotment Status Action */}
          <button
            onClick={onOpenAllotment}
            className="flex items-center space-x-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Allotment Query</span>
          </button>

          {/* Notifications */}
          <button
            onClick={() => alert('Alert notifications enabled for mandate closures and allotment releases.')}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80 text-zinc-400 hover:text-white transition-colors"
            title="Notification Alerts"
          >
            <Bell className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Filter Tabs Bar (No emojis) */}
      <div className="mx-auto flex max-w-7xl items-center space-x-1.5 px-4 py-2 sm:px-6 overflow-x-auto text-xs font-medium border-t border-zinc-900">
        {[
          { id: 'ALL', label: 'All Issues' },
          { id: 'ACTIVE', label: 'Bidding Open' },
          { id: 'UPCOMING', label: 'Upcoming' },
          { id: 'ALLOTTED', label: 'Allotment Out' },
          { id: 'LISTED', label: 'Recently Listed' },
          { id: 'MAINBOARD', label: 'Mainboard' },
          { id: 'SME', label: 'SME' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`whitespace-nowrap rounded px-2.5 py-1 font-mono text-[11px] transition-colors ${
              activeFilter === tab.id
                ? 'bg-zinc-800 text-white font-bold border border-zinc-700'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
};
