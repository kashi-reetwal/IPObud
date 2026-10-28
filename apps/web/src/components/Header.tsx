'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, ShieldCheck, Bell, TrendingUp, Users, ChevronDown, Check } from 'lucide-react';

interface HeaderProps {
  onOpenAllotment: () => void;
  onOpenMultiAccount?: () => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  activeFilter: string;
  setActiveFilter: (val: string) => void;
  marketTypeFilter?: 'ALL' | 'MAINBOARD' | 'SME';
  setMarketTypeFilter?: (val: 'ALL' | 'MAINBOARD' | 'SME') => void;
  activeTheme?: 'GROWW' | 'ANGEL_ONE';
  setActiveTheme?: (theme: 'GROWW' | 'ANGEL_ONE') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAllotment,
  onOpenMultiAccount,
  searchTerm,
  setSearchTerm,
  activeFilter,
  setActiveFilter,
  marketTypeFilter = 'ALL',
  setMarketTypeFilter,
  activeTheme = 'GROWW',
  setActiveTheme,
}) => {
  const isAngel = activeTheme === 'ANGEL_ONE';
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

          {/* Narada Multi-Account Family Manager */}
          {onOpenMultiAccount && (
            <button
              onClick={onOpenMultiAccount}
              className="flex items-center space-x-1.5 rounded-xl border border-[#b3f0df] bg-[#e6faf5] hover:bg-[#cbf5eb] px-3.5 py-2 text-xs font-bold text-[#008767] transition-all shadow-xs"
              title="Narada Multi-Account Family Allotment Engine"
            >
              <Users className="h-4 w-4 text-[#00d09c]" />
              <span className="hidden sm:inline">Family Accounts</span>
              <span className="rounded-full bg-white px-1.5 py-0.2 text-[10px] font-extrabold text-[#008767] border border-[#b3f0df]">
                Narada
              </span>
            </button>
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

      {/* Filter Tabs Bar (Groww clean pills) with Segment Dropdown */}
      <div className="mx-auto flex max-w-7xl items-center space-x-2 px-4 py-2.5 sm:px-6 overflow-x-auto text-xs border-t border-[#f1f5f9]">
        {/* All IPOs Dropdown Menu */}
        <div className="relative inline-block text-left shrink-0" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`flex items-center space-x-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 font-medium transition-all ${
              activeFilter === 'ALL'
                ? isAngel
                  ? 'bg-[#1849a9] text-white font-bold shadow-xs'
                  : 'bg-[#00d09c] text-white font-bold shadow-xs'
                : 'text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9]'
            }`}
          >
            <span>
              {activeFilter === 'ALL' && marketTypeFilter === 'MAINBOARD'
                ? 'Mainboard IPOs'
                : activeFilter === 'ALL' && marketTypeFilter === 'SME'
                ? 'SME IPOs'
                : 'All IPOs'}
            </span>
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 mt-1.5 w-52 rounded-xl border border-[#e2e8f0] bg-white p-1.5 shadow-xl z-50 animate-in fade-in zoom-in-95">
              <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#94a3b8]">
                Segment Selection
              </div>
              <button
                onClick={() => {
                  setActiveFilter('ALL');
                  setMarketTypeFilter?.('ALL');
                  setDropdownOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-semibold ${
                  activeFilter === 'ALL' && marketTypeFilter === 'ALL'
                    ? 'bg-[#e6faf5] text-[#008767]'
                    : 'text-[#0f172a] hover:bg-[#f8fafc]'
                }`}
              >
                <span>All (Mainboard & SME)</span>
                {activeFilter === 'ALL' && marketTypeFilter === 'ALL' && (
                  <Check className="h-3.5 w-3.5 text-[#008767]" />
                )}
              </button>
              <button
                onClick={() => {
                  setActiveFilter('ALL');
                  setMarketTypeFilter?.('MAINBOARD');
                  setDropdownOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-semibold ${
                  activeFilter === 'ALL' && marketTypeFilter === 'MAINBOARD'
                    ? 'bg-[#e6faf5] text-[#008767]'
                    : 'text-[#0f172a] hover:bg-[#f8fafc]'
                }`}
              >
                <span>Mainboard Only</span>
                {activeFilter === 'ALL' && marketTypeFilter === 'MAINBOARD' && (
                  <Check className="h-3.5 w-3.5 text-[#008767]" />
                )}
              </button>
              <button
                onClick={() => {
                  setActiveFilter('ALL');
                  setMarketTypeFilter?.('SME');
                  setDropdownOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-semibold ${
                  activeFilter === 'ALL' && marketTypeFilter === 'SME'
                    ? 'bg-[#e6faf5] text-[#008767]'
                    : 'text-[#0f172a] hover:bg-[#f8fafc]'
                }`}
              >
                <span>SME Only</span>
                {activeFilter === 'ALL' && marketTypeFilter === 'SME' && (
                  <Check className="h-3.5 w-3.5 text-[#008767]" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Stage Filter Tabs */}
        {[
          { id: 'ACTIVE', label: 'Open Now' },
          { id: 'UPCOMING', label: 'Upcoming' },
          { id: 'ALLOTTED', label: 'Allotment Out' },
          { id: 'LISTED', label: 'Recently Listed' },
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
