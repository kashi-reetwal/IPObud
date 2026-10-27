'use client';

import React, { useState, useMemo } from 'react';
import { mockIpos } from '../data/mockIpos';
import { IPO } from '../types';
import { Header } from '../components/Header';
import { TickerBar } from '../components/TickerBar';
import { IpoCard } from '../components/IpoCard';
import { AiAnalysisModal } from '../components/AiAnalysisModal';
import { AllotmentModal } from '../components/AllotmentModal';
import { BidCalculatorModal } from '../components/BidCalculatorModal';
import { Flame, ShieldCheck, Sparkles, TrendingUp, Layers, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Modals state
  const [selectedAiIpo, setSelectedAiIpo] = useState<IPO | null>(null);
  const [selectedBidIpo, setSelectedBidIpo] = useState<IPO | null>(null);
  const [allotmentModalOpen, setAllotmentModalOpen] = useState(false);
  const [selectedAllotmentIpo, setSelectedAllotmentIpo] = useState<IPO | null>(null);

  // Filtered IPO list
  const filteredIpos = useMemo(() => {
    return mockIpos.filter((ipo) => {
      const matchesSearch =
        ipo.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ipo.symbol.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (activeFilter === 'ALL') return true;
      if (activeFilter === 'MAINBOARD' || activeFilter === 'SME') {
        return ipo.marketType === activeFilter;
      }
      return ipo.status === activeFilter;
    });
  }, [searchTerm, activeFilter]);

  // Key KPI stats
  const stats = useMemo(() => {
    const activeCount = mockIpos.filter((i) => i.status === 'ACTIVE').length;
    const highestGmpIpo = [...mockIpos].sort((a, b) => b.gainPercentage - a.gainPercentage)[0];
    const strongApplyCount = mockIpos.filter(
      (i) => i.aiAnalysis.verdict === 'STRONG_APPLY' || i.aiAnalysis.verdict === 'APPLY'
    ).length;

    return {
      activeCount,
      topGmpGain: highestGmpIpo ? `+${highestGmpIpo.gainPercentage}% (${highestGmpIpo.symbol})` : 'N/A',
      strongApplyCount,
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col">
      {/* 1. Header with live filters & search */}
      <Header
        onOpenAllotment={() => {
          setSelectedAllotmentIpo(null);
          setAllotmentModalOpen(true);
        }}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {/* 2. Live GMP Ticker Marquee */}
      <TickerBar ipos={mockIpos} />

      {/* 3. Hero & High-Level Market KPIs */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider">
                <Sparkles className="h-4 w-4" />
                <span>Next-Gen Equity Terminal</span>
              </div>
              <h1 className="mt-1 text-2xl sm:text-3xl font-black text-white tracking-tight">
                Indian IPOs & Live Grey Market Intelligence
              </h1>
              <p className="mt-1 text-sm text-slate-400 max-w-2xl">
                Real-time NSE/BSE Mainboard and SME tracking, live subscription multiples,
                Gemini AI prospectus synthesis, and 1-click registrar allotment lookups.
              </p>
            </div>

            {/* Quick KPI Stat Widgets */}
            <div className="grid grid-cols-3 gap-3 shrink-0">
              <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-3.5 backdrop-blur-md">
                <div className="flex items-center space-x-1.5 text-slate-400 text-[10px] font-semibold uppercase">
                  <Flame className="h-3.5 w-3.5 text-rose-400" />
                  <span>Live Bidding</span>
                </div>
                <p className="mt-1 text-xl font-mono font-black text-white">
                  {stats.activeCount} <span className="text-xs font-normal text-slate-400">Issues</span>
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-3.5 backdrop-blur-md">
                <div className="flex items-center space-x-1.5 text-emerald-400 text-[10px] font-semibold uppercase">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>Top GMP Surge</span>
                </div>
                <p className="mt-1 text-base sm:text-lg font-mono font-black text-emerald-400 truncate">
                  {stats.topGmpGain}
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/10 p-3.5 backdrop-blur-md">
                <div className="flex items-center space-x-1.5 text-cyan-400 text-[10px] font-semibold uppercase">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>AI Buy Signals</span>
                </div>
                <p className="mt-1 text-xl font-mono font-black text-cyan-400">
                  {stats.strongApplyCount} <span className="text-xs font-normal text-slate-400">Calls</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. IPO Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
              <Layers className="h-4 w-4 text-cyan-400" />
              <span>Current Issues ({filteredIpos.length})</span>
            </h2>
            <span className="text-xs font-mono text-slate-500">Auto-refresh: 15s</span>
          </div>

          {filteredIpos.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-slate-900/30 p-12 text-center">
              <p className="text-sm text-slate-400">No IPO issues matched your current search and filters.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveFilter('ALL');
                }}
                className="mt-3 text-xs font-bold text-cyan-400 hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredIpos.map((ipo) => (
                <IpoCard
                  key={ipo.id}
                  ipo={ipo}
                  onOpenAiModal={(target) => setSelectedAiIpo(target)}
                  onOpenBidCalc={(target) => setSelectedBidIpo(target)}
                  onOpenAllotment={(target) => {
                    setSelectedAllotmentIpo(target);
                    setAllotmentModalOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* 5. Footer */}
      <footer className="border-t border-white/10 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p className="font-medium text-slate-400">
          IPObud © 2026 — Designed for Smart Retail & HNI IPO Bidders in India
        </p>
        <p className="mt-1 text-[11px] text-slate-600">
          Disclaimer: Grey Market Premium (GMP) is an unregulated market consensus metric. Past listings do not guarantee future gains.
        </p>
      </footer>

      {/* 6. Interactive Modals */}
      <AiAnalysisModal ipo={selectedAiIpo} onClose={() => setSelectedAiIpo(null)} />
      <BidCalculatorModal ipo={selectedBidIpo} onClose={() => setSelectedBidIpo(null)} />
      {allotmentModalOpen && (
        <AllotmentModal
          ipos={mockIpos}
          selectedIpo={selectedAllotmentIpo}
          onClose={() => {
            setAllotmentModalOpen(false);
            setSelectedAllotmentIpo(null);
          }}
        />
      )}
    </div>
  );
}
