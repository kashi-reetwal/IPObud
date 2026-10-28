'use client';

import React, { useState, useMemo } from 'react';
import { mockIpos } from '../data/mockIpos';
import { IPO } from '../types';
import { Header } from '../components/Header';
import { TickerBar } from '../components/TickerBar';
import { IpoCard } from '../components/IpoCard';
import { TimelineModal } from '../components/TimelineModal';
import { AiAnalysisModal } from '../components/AiAnalysisModal';
import { AllotmentModal } from '../components/AllotmentModal';
import { BidCalculatorModal } from '../components/BidCalculatorModal';
import { MultiAccountManagerModal } from '../components/MultiAccountManagerModal';
import { DossierProspectusModal } from '../components/DossierProspectusModal';
import { Layers, CheckCircle2, ChevronDown } from 'lucide-react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [marketTypeFilter, setMarketTypeFilter] = useState<'ALL' | 'MAINBOARD' | 'SME'>('ALL');

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

  // Split into categorized sections
  const openIpos = useMemo(() => filteredIpos.filter((i) => i.status === 'ACTIVE'), [filteredIpos]);
  const upcomingIpos = useMemo(() => filteredIpos.filter((i) => i.status === 'UPCOMING'), [filteredIpos]);
  const closedOrAllottedIpos = useMemo(
    () => filteredIpos.filter((i) => i.status === 'ALLOTTED' || i.status === 'CLOSED' || i.status === 'LISTED'),
    [filteredIpos]
  );

  const handleCardTimelineClick = (target: IPO) => {
    setSelectedTimelineIpo(target);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] flex flex-col font-sans">
      {/* 1. Institutional Header */}
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
      />

      {/* 2. Real-Time Market Trend Ticker */}
      <TickerBar ipos={mockIpos} />

      {/* 3. Main Card-Centric Dashboard */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 space-y-8">
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

          {/* KPI Stat Cards */}
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

        {/* Global Segment Selector Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 rounded-2xl border border-[#e2e8f0] shadow-xs">
          <div className="flex items-center space-x-2.5">
            <Layers className="h-5 w-5 text-[#00d09c]" />
            <div>
              <h2 className="text-base font-bold text-[#0f172a] leading-tight">
                {activeFilter === 'ALL'
                  ? 'All IPO Issues'
                  : activeFilter === 'ACTIVE'
                  ? 'Open for Bidding'
                  : activeFilter === 'UPCOMING'
                  ? 'Upcoming IPOs'
                  : activeFilter === 'ALLOTTED'
                  ? 'Allotment Finalized'
                  : 'Recently Listed'}
              </h2>
              <span className="text-xs text-[#64748b]">
                Showing {filteredIpos.length} public {filteredIpos.length === 1 ? 'issue' : 'issues'} on NSE & BSE
              </span>
            </div>
          </div>

          {/* Segment Dropdown in Section */}
          <div className="flex items-center space-x-2.5">
            <span className="text-xs text-[#64748b] font-medium hidden sm:inline">Market Segment:</span>
            <div className="relative">
              <select
                value={marketTypeFilter}
                onChange={(e) => setMarketTypeFilter(e.target.value as 'ALL' | 'MAINBOARD' | 'SME')}
                className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] hover:bg-white pl-3.5 pr-8 py-2 text-xs font-bold text-[#0f172a] shadow-xs focus:border-[#00d09c] focus:outline-none cursor-pointer appearance-none transition-all"
              >
                <option value="ALL">All Segments (Mainboard & SME)</option>
                <option value="MAINBOARD">Mainboard Issues Only</option>
                <option value="SME">SME Issues Only</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 h-3.5 w-3.5 text-[#64748b] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* CARDS DISPLAY: Categorized Sections */}
        {filteredIpos.length === 0 ? (
          <div className="rounded-2xl border border-[#e2e8f0] bg-white p-12 text-center text-sm text-[#64748b] shadow-xs">
            <p className="font-semibold text-[#0f172a] text-base">No IPOs matched your search or segment filter.</p>
            <p className="text-xs text-[#94a3b8] mt-1">Try resetting the search keyword or selecting All Segments.</p>
            <div className="mt-4">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveFilter('ALL');
                  setMarketTypeFilter('ALL');
                }}
                className="rounded-xl bg-[#00d09c] text-white px-4 py-2 font-bold text-xs shadow-xs hover:bg-[#00b887] transition-all"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        ) : activeFilter === 'ALL' ? (
          <div className="space-y-8">
            {/* 1. Open for Bidding (Live Now) */}
            {openIpos.length > 0 && (
              <section className="space-y-3.5">
                <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-[#00d09c] animate-pulse" />
                    <h3 className="text-lg font-bold text-[#0f172a]">
                      Open for Bidding (Live Now)
                    </h3>
                    <span className="rounded-full bg-[#e6faf5] border border-[#b3f0df] px-2.5 py-0.5 text-xs font-bold text-[#008767]">
                      {openIpos.length}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#008767]">Bidding Window Active</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {openIpos.map((ipo) => (
                    <IpoCard
                      key={ipo.id}
                      ipo={ipo}
                      onOpenDetails={handleCardTimelineClick}
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
              </section>
            )}

            {/* 2. Upcoming Issues */}
            {upcomingIpos.length > 0 && (
              <section className="space-y-3.5">
                <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-[#1849a9]" />
                    <h3 className="text-lg font-bold text-[#0f172a]">
                      Upcoming Public Issues
                    </h3>
                    <span className="rounded-full bg-[#eff6ff] border border-[#bfdbfe] px-2.5 py-0.5 text-xs font-bold text-[#1849a9]">
                      {upcomingIpos.length}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-[#64748b]">Opening Soon</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {upcomingIpos.map((ipo) => (
                    <IpoCard
                      key={ipo.id}
                      ipo={ipo}
                      onOpenDetails={handleCardTimelineClick}
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
              </section>
            )}

            {/* 3. Closed & Allotment Out / Listed */}
            {closedOrAllottedIpos.length > 0 && (
              <section className="space-y-3.5">
                <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-2.5">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-[#475569]" />
                    <h3 className="text-lg font-bold text-[#0f172a]">
                      Closed & Allotment Out / Listed
                    </h3>
                    <span className="rounded-full bg-[#f1f5f9] border border-[#e2e8f0] px-2.5 py-0.5 text-xs font-bold text-[#475569]">
                      {closedOrAllottedIpos.length}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-[#64748b]">Check Allotment & Past Gains</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {closedOrAllottedIpos.map((ipo) => (
                    <IpoCard
                      key={ipo.id}
                      ipo={ipo}
                      onOpenDetails={handleCardTimelineClick}
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
              </section>
            )}
          </div>
        ) : (
          /* Filtered view for single status tab (Open Now, Upcoming, etc.) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredIpos.map((ipo) => (
              <IpoCard
                key={ipo.id}
                ipo={ipo}
                onOpenDetails={handleCardTimelineClick}
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
      </main>

      {/* 4. Clean Institutional Footer */}
      <footer className="border-t border-[#e2e8f0] bg-white py-6 text-center text-xs text-[#64748b]">
        <p className="font-semibold text-[#0f172a]">
          IPObud • Built for Indian Stock Market Investors & Traders
        </p>
        <p className="mt-1 text-[11px] text-[#94a3b8] max-w-2xl mx-auto px-4">
          Disclaimer: Grey market premium (GMP) is an unregulated market sentiment indicator. Past listing gains do not guarantee future returns. Check the official Red Herring Prospectus (RHP) before bidding.
        </p>
      </footer>

      {/* 5. Modals */}
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
          selectedIpo={selectedAllotmentIpo || mockIpos[0]}
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
