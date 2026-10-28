'use client';

import React, { useState, useMemo } from 'react';
import { mockIpos } from '../data/mockIpos';
import { IPO } from '../types';
import { Header } from '../components/Header';
import { TickerBar } from '../components/TickerBar';
import { IpoCard } from '../components/IpoCard';
import { TimelineModal } from '../components/TimelineModal';
import { CalendarTimeline } from '../components/CalendarTimeline';
import { GmpHistoryChart } from '../components/GmpHistoryChart';
import { AiAnalysisModal } from '../components/AiAnalysisModal';
import { AllotmentModal } from '../components/AllotmentModal';
import { BidCalculatorModal } from '../components/BidCalculatorModal';
import { Calendar, BarChart2, Layers, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Active highlighted IPO for timeline and graph on page
  const [featuredIpo, setFeaturedIpo] = useState<IPO>(mockIpos[1]); // Default to Waaree Energies

  // Modals state
  const [selectedTimelineIpo, setSelectedTimelineIpo] = useState<IPO | null>(null);
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
    const totalCapitalRaised = mockIpos.reduce((acc, i) => acc + i.issueSizeCr, 0);

    return {
      activeCount,
      topGmpGain: highestGmpIpo ? `+${highestGmpIpo.gainPercentage}% (${highestGmpIpo.symbol})` : 'N/A',
      totalCapitalRaised: `INR ${(totalCapitalRaised / 1000).toFixed(1)}k Cr`,
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col font-sans">
      {/* 1. Institutional Header */}
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

      {/* 2. Ticker Marquee Tape */}
      <TickerBar ipos={mockIpos} />

      {/* 3. Main Terminal Body */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 space-y-6">
        {/* Top Market Overview Stats */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-800/80 pb-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-mono">
              Indian Public Offerings & Grey Market Analytics
            </h1>
            <p className="mt-1 text-xs text-zinc-400 font-mono">
              NSE / BSE Mainboard and SME schedules, settlement calendar dates, subscription multiples, and past performance.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2.5 shrink-0 font-mono">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-2.5">
              <span className="text-[10px] text-zinc-500 uppercase font-semibold">Live Issues</span>
              <p className="text-base font-bold text-white mt-0.5">{stats.activeCount} Bidding</p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-2.5">
              <span className="text-[10px] text-zinc-500 uppercase font-semibold">Highest GMP</span>
              <p className="text-base font-bold text-emerald-400 mt-0.5 truncate">{stats.topGmpGain}</p>
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-2.5">
              <span className="text-[10px] text-zinc-500 uppercase font-semibold">Capital Tracked</span>
              <p className="text-base font-bold text-zinc-300 mt-0.5">{stats.totalCapitalRaised}</p>
            </div>
          </div>
        </div>

        {/* 4. Featured Issue Calendar & Trend Chart Viewer */}
        <section className="rounded-xl border border-zinc-800 bg-[#0e1017] p-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-zinc-800/80 pb-3">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                Detailed Analysis & Calendar Sequence
              </span>
              <h2 className="text-base font-bold text-white font-mono mt-0.5">
                {featuredIpo.companyName} ({featuredIpo.symbol})
              </h2>
            </div>

            {/* Quick IPO Selector */}
            <div className="flex items-center space-x-1.5 overflow-x-auto">
              <span className="text-[11px] font-mono text-zinc-500 mr-1 hidden sm:inline">Select Issue:</span>
              {mockIpos.map((ipo) => (
                <button
                  key={ipo.id}
                  onClick={() => setFeaturedIpo(ipo)}
                  className={`rounded px-2 py-1 font-mono text-[11px] transition-colors ${
                    featuredIpo.id === ipo.id
                      ? 'bg-zinc-800 text-white font-bold border border-zinc-700'
                      : 'text-zinc-400 hover:text-white bg-zinc-950'
                  }`}
                >
                  {ipo.symbol}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar Sequence with all key dates */}
          <CalendarTimeline timeline={featuredIpo.timeline} />

          {/* High Precision Historical Trend & Past Performance Chart */}
          <GmpHistoryChart
            data={featuredIpo.gmpHistory}
            symbol={featuredIpo.symbol}
            issuePrice={featuredIpo.priceBandHigh}
            pastResults={featuredIpo.pastResults}
          />
        </section>

        {/* 5. IPO Grid List */}
        <section className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 flex items-center space-x-2">
              <Layers className="h-3.5 w-3.5 text-zinc-400" />
              <span>Public Offerings Overview ({filteredIpos.length})</span>
            </h2>
            <span className="text-[11px] font-mono text-zinc-500">Frequency: Realtime</span>
          </div>

          {filteredIpos.length === 0 ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-10 text-center text-xs font-mono text-zinc-500">
              No public offerings matched the selected filter criteria.
              <div className="mt-2">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveFilter('ALL');
                  }}
                  className="font-bold text-zinc-300 underline"
                >
                  Reset Filter Parameters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredIpos.map((ipo) => (
                <IpoCard
                  key={ipo.id}
                  ipo={ipo}
                  onOpenDetails={(target) => {
                    setFeaturedIpo(target);
                    setSelectedTimelineIpo(target);
                  }}
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
        </section>
      </main>

      {/* 6. Institutional Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-5 text-center text-[11px] font-mono text-zinc-500">
        <p className="text-zinc-400">
          IPObud Institutional Analytics • National Stock Exchange & Bombay Stock Exchange Data Feed
        </p>
        <p className="mt-1 text-zinc-600">
          Disclaimer: Grey market premiums are informal market consensus indicators and do not guarantee actual exchange listing prices.
        </p>
      </footer>

      {/* 7. Modals */}
      <TimelineModal
        ipo={selectedTimelineIpo}
        onClose={() => setSelectedTimelineIpo(null)}
        onOpenBidCalc={(target) => setSelectedBidIpo(target)}
        onOpenAllotment={(target) => {
          setSelectedAllotmentIpo(target);
          setAllotmentModalOpen(true);
        }}
      />
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
