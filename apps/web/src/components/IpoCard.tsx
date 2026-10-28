'use client';

import React from 'react';
import { IPO } from '../types';
import {
  Calendar,
  Layers,
  Clock,
  BarChart2,
  Calculator,
  ShieldCheck,
  FileText,
} from 'lucide-react';

interface IpoCardProps {
  ipo: IPO;
  onOpenDetails: (ipo: IPO) => void;
  onOpenAiModal: (ipo: IPO) => void;
  onOpenBidCalc: (ipo: IPO) => void;
  onOpenAllotment: (ipo: IPO) => void;
}

export const IpoCard: React.FC<IpoCardProps> = ({
  ipo,
  onOpenDetails,
  onOpenAiModal,
  onOpenBidCalc,
  onOpenAllotment,
}) => {
  const isGainPositive = ipo.gainPercentage >= 0;
  const isMainboard = ipo.marketType === 'MAINBOARD';
  const minInvestment = ipo.priceBandHigh * ipo.lotSize;

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case 'STRONG_APPLY':
        return 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60';
      case 'APPLY':
        return 'bg-zinc-800 text-zinc-200 border-zinc-700';
      case 'LISTING_GAINS_ONLY':
        return 'bg-amber-950/40 text-amber-300 border-amber-800/60';
      case 'AVOID':
        return 'bg-rose-950/40 text-rose-300 border-rose-800/60';
      default:
        return 'bg-zinc-900 text-zinc-400 border-zinc-800';
    }
  };

  return (
    <div className="fin-card fin-card-hover rounded-xl p-4 flex flex-col justify-between">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 font-mono font-bold text-zinc-300 text-xs">
              {ipo.symbol.slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h3 className="font-bold text-white text-sm tracking-tight">
                  {ipo.companyName}
                </h3>
              </div>
              <div className="flex items-center space-x-2 mt-0.5 font-mono text-[11px]">
                <span className="text-zinc-300 font-bold">{ipo.symbol}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400">{ipo.marketType}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400">{ipo.status}</span>
              </div>
            </div>
          </div>

          {/* AI Verdict Badge */}
          <button
            onClick={() => onOpenAiModal(ipo)}
            className={`px-2 py-0.5 rounded border text-[10px] font-mono font-bold ${getVerdictBadge(
              ipo.aiAnalysis.verdict
            )}`}
          >
            {ipo.aiAnalysis.verdict.replace(/_/g, ' ')}
          </button>
        </div>

        {/* Pricing & GMP Table */}
        <div className="mt-3.5 grid grid-cols-2 gap-2 rounded-lg bg-zinc-950/80 p-3 border border-zinc-800/60">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
              Price Band
            </p>
            <p className="text-sm font-bold text-white font-mono mt-0.5">
              INR {ipo.priceBandLow} - {ipo.priceBandHigh}
            </p>
            <p className="text-[10px] font-mono text-zinc-400 mt-1">
              Lot: {ipo.lotSize} sh (INR {minInvestment.toLocaleString('en-IN')})
            </p>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
              Current GMP
            </p>
            <p
              className={`text-sm font-bold font-mono mt-0.5 ${
                isGainPositive ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              INR {ipo.currentGmp} ({ipo.gainPercentage > 0 ? '+' : ''}
              {ipo.gainPercentage}%)
            </p>
            <p className="text-[10px] font-mono text-zinc-400 mt-1">
              Est. Price: <span className="text-zinc-200 font-semibold">INR {ipo.estimatedListingPrice}</span>
            </p>
          </div>
        </div>

        {/* Detailed Calendar Dates Grid */}
        <div className="mt-3 rounded-lg border border-zinc-850 bg-zinc-950/40 p-2.5 font-mono text-[11px]">
          <div className="flex items-center space-x-1.5 text-zinc-400 text-[10px] uppercase font-bold tracking-wider mb-2">
            <Calendar className="h-3 w-3 text-zinc-400" />
            <span>Key Calendar Dates</span>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-zinc-400 text-[11px]">
            <div className="flex justify-between">
              <span>Bidding Closes:</span>
              <strong className="text-zinc-200">{ipo.timeline.biddingClose}</strong>
            </div>
            <div className="flex justify-between">
              <span>Allotment Basis:</span>
              <strong className="text-zinc-200">{ipo.timeline.allotmentFinalization}</strong>
            </div>
            <div className="flex justify-between">
              <span>Refunds Unfreeze:</span>
              <strong className="text-zinc-200">{ipo.timeline.refundsInitiation}</strong>
            </div>
            <div className="flex justify-between">
              <span>Demat Credit:</span>
              <strong className="text-zinc-200">{ipo.timeline.dematTransfer}</strong>
            </div>
            <div className="flex justify-between col-span-2 pt-1 border-t border-zinc-900">
              <span className="text-emerald-400 font-semibold">Trading Listing Date:</span>
              <strong className="text-emerald-400">{ipo.timeline.listingOnExchange}</strong>
            </div>
          </div>
        </div>

        {/* Subscription Multiples */}
        <div className="mt-2.5 flex items-center justify-between rounded-lg bg-zinc-900/40 px-3 py-1.5 border border-zinc-850 text-xs font-mono">
          <span className="text-zinc-500 text-[10px]">Subscription:</span>
          <div className="flex items-center space-x-3 text-[11px]">
            <span>QIB <strong className="text-zinc-200">{ipo.subscription.qib}x</strong></span>
            <span>NII <strong className="text-zinc-200">{ipo.subscription.nii}x</strong></span>
            <span>Retail <strong className="text-emerald-400">{ipo.subscription.retail}x</strong></span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center space-x-2 text-xs">
        <button
          onClick={() => onOpenDetails(ipo)}
          className="flex-1 flex items-center justify-center space-x-1.5 rounded-lg border border-zinc-700 bg-zinc-800/80 py-1.5 font-semibold text-zinc-100 hover:bg-zinc-700 transition-colors"
        >
          <BarChart2 className="h-3.5 w-3.5 text-zinc-400" />
          <span>Timeline & Chart</span>
        </button>

        <button
          onClick={() => onOpenBidCalc(ipo)}
          className="flex-1 flex items-center justify-center space-x-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 py-1.5 font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <Calculator className="h-3.5 w-3.5 text-zinc-400" />
          <span>Bid Calculator</span>
        </button>

        <button
          onClick={() => onOpenAiModal(ipo)}
          className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
          title="Financial Rationale"
        >
          <FileText className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
