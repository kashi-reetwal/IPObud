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
import { MultiAccountManagerModal } from '../components/MultiAccountManagerModal';
import { DossierProspectusModal } from '../components/DossierProspectusModal';
import { TrendingUp, Layers, CheckCircle2, ChevronDown } from 'lucide-react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [marketTypeFilter, setMarketTypeFilter] = useState<'ALL' | 'MAINBOARD' | 'SME'>('ALL');
  const [activeTheme, setActiveTheme] = useState<'GROWW' | 'ANGEL_ONE'>('GROWW');

  // Active highlighted IPO for timeline and graph on page
  const [featuredIpo, setFeaturedIpo] = useState<IPO>(mockIpos[1]); // Waaree Energies default

  // Modals state
  const [selectedTimelineIpo, setSelectedTimelineIpo] = useState<IPO | null>(null);
  const [selectedAiIpo, setSelectedAiIpo] = useState<IPO | null>(null);
  const [selectedBidIpo, setSelectedBidIpo] = useState<IPO | null>(null);
  const [allotmentModalOpen, setAllotmentModalOpen] = useState(false);
  const [selectedAllotmentIpo, setSelectedAllotmentIpo] = useState<IPO | null>(null);
  const [multiAccountModalOpen, setMultiAccountModalOpen] = useState(false);
  const [selectedDossierIpo, setSelectedDossierIpo] = useState<IPO | null>(null);

  // Filtered IPO list
  const filteredIpos = useMemo(() => {
    return mockIpos.filter((ipo) => {
      const matchesSearch =
        ipo.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ipo.symbol.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      // Segment / Category filter: MAINBOARD or SME
      if (marketTypeFilter !== 'ALL' && ipo.marketType !== marketTypeFilter) {
        return false;
      }

      // Status filter
      if (activeFilter === 'ALL') return true;
      return ipo.status === activeFilter;
    });
  }, [searchTerm, activeFilter, marketTypeFilter]);

  // Key KPI stats
  const stats = useMemo(() => {
    const activeCount = mockIpos.filter((i) => i.status === 'ACTIVE').length;
    const highestGmpIpo = [...mockIpos].sort((a, b) => b.gainPercentage - a.gainPercentage)[0];
    const totalCapitalRaised = mockIpos.reduce((acc, i) => acc + i.issueSizeCr, 0);

    return {
      activeCount,
      topGmpGain: highestGmpIpo ? `+${highestGmpIpo.gainPercentage}% (${highestGmpIpo.symbol})` : 'N/A',
      totalCapitalRaised: `₹${(totalCapitalRaised / 1000).toFixed(1)}k Cr`,
    };
  }, []);

  const isAngel = activeTheme === 'ANGEL_ONE';

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] flex flex-col font-sans">
      {/* 1. Groww & Angel One Header */}
      <Header
        onOpenAllotment={() => {
          setSelectedAllotmentIpo(null);
          setAllotmentModalOpen(true);
        }}
        onOpenMultiAccount={() => {
          setMultiAccountModalOpen(true);
        }}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        marketTypeFilter={marketTypeFilter}
        setMarketTypeFilter={setMarketTypeFilter}
        activeTheme={activeTheme}
        setActiveTheme={setActiveTheme}
      />

      {/* 2. Market Trend Ticker */}
      <TickerBar ipos={mockIpos} />

      {/* 3. Main Dashboard */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 space-y-6">
        {/* Top Market Overview Summary */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#e2e8f0] pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight">
              Indian IPO Market & Grey Market Tracker
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#64748b]">
              Track live NSE & BSE IPO dates, GMP gains, settlement schedules, and allotment status.
            </p>
          </div>

          {/* KPI Stat Cards (Groww Style) */}
          <div className="grid grid-cols-3 gap-3 shrink-0">
            <div className="rounded-xl border border-[#e2e8f0] bg-white p-3 shadow-xs">
              <span className="text-[11px] font-semibold text-[#64748b] block">Live Bidding</span>
              <p className="text-base font-bold text-[#0f172a] mt-0.5">{stats.activeCount} Issues Open</p>
            </div>
            <div className="rounded-xl border border-[#e2e8f0] bg-white p-3 shadow-xs">
              <span className="text-[11px] font-semibold text-[#64748b] block">Top Listing Gain</span>
              <p className="text-base font-bold text-[#008767] mt-0.5 truncate">{stats.topGmpGain}</p>
            </div>
            <div className="rounded-xl border border-[#e2e8f0] bg-white p-3 shadow-xs">
              <span className="text-[11px] font-semibold text-[#64748b] block">Capital Raised</span>
              <p className="text-base font-bold text-[#0f172a] mt-0.5">{stats.totalCapitalRaised}</p>
            </div>
          </div>
        </div>

        {/* 4. Featured Issue Calendar & Trend Chart (Interactive Viewer) */}
        <section className="rounded-2xl border border-[#e2e8f0] bg-white p-5 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#f1f5f9] pb-3.5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#008767]">
                Issue Deep Dive & Settlement Schedule
              </span>
              <h2 className="text-lg font-bold text-[#0f172a] mt-0.5">
                {featuredIpo.companyName} ({featuredIpo.symbol})
              </h2>
            </div>

            {/* Quick IPO Selector Tabs */}
            <div className="flex items-center space-x-1.5 overflow-x-auto">
              <span className="text-xs text-[#64748b] mr-1 hidden sm:inline font-medium">Select Issue:</span>
              {mockIpos.map((ipo) => (
                <button
                  key={ipo.id}
                  onClick={() => setFeaturedIpo(ipo)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                    featuredIpo.id === ipo.id
                      ? isAngel
                        ? 'bg-[#1849a9] text-white shadow-xs font-bold'
                        : 'bg-[#00d09c] text-white shadow-xs font-bold'
                      : 'text-[#64748b] hover:text-[#0f172a] bg-[#f8fafc] border border-[#e2e8f0]'
                  }`}
                >
                  {ipo.symbol}
                </button>
              ))}
            </div>
          </div>

          {/* Complete 6-Step Settlement Calendar */}
          <CalendarTimeline timeline={featuredIpo.timeline} />

          {/* High Precision Historical Trend & Past Performance Chart */}
          <GmpHistoryChart
            data={featuredIpo.gmpHistory}
            symbol={featuredIpo.symbol}
            issuePrice={featuredIpo.priceBandHigh}
            pastResults={featuredIpo.pastResults}
          />
        </section>

        {/* 5. IPO Grid Cards */}
        <section className="space-y-3.5 pt-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#f1f5f9] pb-3">
            <div className="flex items-center space-x-2">
              <Layers className="h-4 w-4 text-[#00d09c]" />
              <h2 className="text-base font-bold text-[#0f172a]">
                All Public Issues & IPOs ({filteredIpos.length})
              </h2>
              {marketTypeFilter !== 'ALL' && (
                <span className="rounded-full bg-[#e6faf5] border border-[#b3f0df] px-2.5 py-0.5 text-[11px] font-bold text-[#008767]">
                  {marketTypeFilter === 'MAINBOARD' ? 'Mainboard' : 'SME'}
                </span>
              )}
            </div>

            {/* Segment Dropdown in the All IPOs Section */}
            <div className="flex items-center space-x-2.5">
              <span className="text-xs text-[#64748b] font-medium hidden sm:inline">Segment:</span>
              <div className="relative">
                <select
                  value={marketTypeFilter}
                  onChange={(e) => setMarketTypeFilter(e.target.value as 'ALL' | 'MAINBOARD' | 'SME')}
                  className="rounded-xl border border-[#e2e8f0] bg-white pl-3 pr-8 py-1.5 text-xs font-bold text-[#0f172a] shadow-xs focus:border-[#00d09c] focus:outline-none cursor-pointer appearance-none"
                >
                  <option value="ALL">All IPOs (Mainboard & SME)</option>
                  <option value="MAINBOARD">Mainboard Only</option>
                  <option value="SME">SME Only</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-[#64748b] pointer-events-none" />
              </div>
              <span className="text-xs text-[#94a3b8] font-medium hidden md:inline">• Live Feed</span>
            </div>
          </div>

          {filteredIpos.length === 0 ? (
            <div className="rounded-2xl border border-[#e2e8f0] bg-white p-10 text-center text-xs text-[#64748b] shadow-xs">
              No IPOs matched your selected search or segment criteria.
              <div className="mt-2">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveFilter('ALL');
                    setMarketTypeFilter('ALL');
                  }}
                  className="font-bold text-[#008767] underline"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                  onOpenDossier={(target) => setSelectedDossierIpo(target)}
                  onOpenFamilyAllotment={(target) => {
                    setSelectedAllotmentIpo(target);
                    setMultiAccountModalOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* 6. Groww Style Footer */}
      <footer className="border-t border-[#e2e8f0] bg-white py-6 text-center text-xs text-[#64748b]">
        <p className="font-semibold text-[#0f172a]">
          IPObud • Built for Indian Stock Market Investors & Traders
        </p>
        <p className="mt-1 text-[11px] text-[#94a3b8] max-w-2xl mx-auto px-4">
          Disclaimer: Grey market premium (GMP) is an unregulated market sentiment indicator. Past listing gains do not guarantee future returns. Check the official Red Herring Prospectus (RHP) before bidding.
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
      {multiAccountModalOpen && (
        <MultiAccountManagerModal
          ipos={mockIpos}
          selectedIpo={selectedAllotmentIpo || featuredIpo}
          onClose={() => setMultiAccountModalOpen(false)}
        />
      )}
      <DossierProspectusModal
        ipo={selectedDossierIpo}
        onClose={() => setSelectedDossierIpo(null)}
      />
    </div>
  );
}
