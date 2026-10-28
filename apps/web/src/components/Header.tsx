'use client';

import React from 'react';
import { Search, ShieldCheck, Bell, TrendingUp } from 'lucide-react';

interface HeaderProps {
  onOpenAllotment: () => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  activeFilter: string;
  setActiveFilter: (val: string) => void;
  activeTheme?: 'GROWW' | 'ANGEL_ONE';
  setActiveTheme?: (theme: 'GROWW' | 'ANGEL_ONE') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAllotment,
  searchTerm,
  setSearchTerm,
  activeFilter,
  setActiveFilter,
  activeTheme = 'GROWW',
  setActiveTheme,
}) => {
  const isAngel = activeTheme === 'ANGEL_ONE';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e2e8f0] bg-white/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
        {/* Brand (Groww / Angel One style) */}
        <div className="flex items-center space-x-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm transition-all ${
              isAngel
                ? 'bg-gradient-to-br from-[#1849a9] to-[#0e3bb4]'
                : 'bg-gradient-to-br from-[#00d09c] to-[#00a87e]'
            }`}
          >
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight text-[#0f172a]">
                IPObud
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${
                  isAngel
                    ? 'bg-[#eff6ff] text-[#1849a9] border-[#bfdbfe]'
                    : 'bg-[#e6faf5] text-[#008767] border-[#b3f0df]'
                }`}
              >
                {isAngel ? 'Angel One Mode' : 'Groww Mode'}
              </span>
            </div>
            <p className="text-[12px] text-[#64748b] font-medium">
              NSE & BSE IPO & GMP Tracker
            </p>
          </div>
        </div>

        {/* Search, Allotment & Theme Switcher */}
        <div className="flex items-center space-x-3">
          {/* Search Bar */}
          <div className="relative hidden md:block w-72">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-[#94a3b8]" />
            <input
              type="text"
              placeholder="Search by company or symbol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] py-2 pl-10 pr-4 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:border-[#00d09c] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00d09c]/20 transition-all"
            />
          </div>

          {/* Theme Quick Switcher */}
          {setActiveTheme && (
            <div className="hidden sm:flex items-center rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-0.5 text-[11px] font-semibold">
              <button
                onClick={() => setActiveTheme('GROWW')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  !isAngel
                    ? 'bg-[#00d09c] text-white shadow-xs font-bold'
                    : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                Groww
              </button>
              <button
                onClick={() => setActiveTheme('ANGEL_ONE')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  isAngel
                    ? 'bg-[#1849a9] text-white shadow-xs font-bold'
                    : 'text-[#64748b] hover:text-[#0f172a]'
                }`}
              >
                Angel One
              </button>
            </div>
          )}

          {/* Allotment Query Button */}
          <button
            onClick={onOpenAllotment}
            className={`flex items-center space-x-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all shadow-xs ${
              isAngel
                ? 'bg-[#1849a9] hover:bg-[#123887] text-white'
                : 'bg-[#eff6ff] hover:bg-[#dbeafe] text-[#1849a9] border border-[#bfdbfe]'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Check Allotment</span>
          </button>

          {/* Alerts Bell */}
          <button
            onClick={() => alert('Alert notifications enabled for IPO schedules & allotment updates.')}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#e2e8f0] bg-[#f8fafc] text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-all"
            title="Notification Alerts"
          >
            <Bell className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs Bar (Groww clean pills) */}
      <div className="mx-auto flex max-w-7xl items-center space-x-2 px-4 py-2.5 sm:px-6 overflow-x-auto text-xs border-t border-[#f1f5f9]">
        {[
          { id: 'ALL', label: 'All IPOs' },
          { id: 'ACTIVE', label: 'Open Now' },
          { id: 'UPCOMING', label: 'Upcoming' },
          { id: 'ALLOTTED', label: 'Allotment Out' },
          { id: 'LISTED', label: 'Recently Listed' },
          { id: 'MAINBOARD', label: 'Mainboard' },
          { id: 'SME', label: 'SME' },
        ].map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 font-medium transition-all ${
                isActive
                  ? isAngel
                    ? 'bg-[#1849a9] text-white font-bold shadow-xs'
                    : 'bg-[#00d09c] text-white font-bold shadow-xs'
                  : 'text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
