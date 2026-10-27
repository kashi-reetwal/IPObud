'use client';

import React from 'react';
import { IPO } from '../types';
import {
  TrendingUp,
  Calendar,
  Sparkles,
  Calculator,
  ShieldCheck,
  ChevronRight,
  Clock,
  Layers,
} from 'lucide-react';

interface IpoCardProps {
  ipo: IPO;
  onOpenAiModal: (ipo: IPO) => void;
  onOpenBidCalc: (ipo: IPO) => void;
  onOpenAllotment: (ipo: IPO) => void;
}

export const IpoCard: React.FC<IpoCardProps> = ({
  ipo,
  onOpenAiModal,
  onOpenBidCalc,
  onOpenAllotment,
}) => {
  const isGainPositive = ipo.gainPercentage >= 0;
  const isMainboard = ipo.marketType === 'MAINBOARD';
  const minInvestment = ipo.priceBandHigh * ipo.lotSize;

  // Verdict style mapper
  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case 'STRONG_APPLY':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'APPLY':
        return 'bg-teal-500/20 text-teal-300 border-teal-500/40';
      case 'LISTING_GAINS_ONLY':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'AVOID':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/40';
    }
  };

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between group">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800/90 border border-white/10 font-mono font-bold text-slate-200 text-sm shadow-inner">
              {ipo.symbol.slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-white text-base tracking-tight leading-snug">
                  {ipo.companyName}
                </h3>
              </div>
              <div className="flex items-center space-x-2 mt-0.5">
                <span className="text-[11px] font-mono text-cyan-400 font-medium">
                  {ipo.symbol}
                </span>
                <span className="text-slate-600">•</span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    isMainboard
                      ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-300'
                      : 'border-purple-500/30 bg-purple-500/10 text-purple-300'
                  }`}
                >
                  {ipo.marketType}
                </span>
                <span className="text-slate-600">•</span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    ipo.status === 'ACTIVE'
                      ? 'border-rose-500/40 bg-rose-500/10 text-rose-400 animate-pulse'
                      : ipo.status === 'ALLOTTED'
                      ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300'
                      : 'border-slate-500/30 bg-slate-500/10 text-slate-300'
                  }`}
                >
                  {ipo.status}
                </span>
              </div>
            </div>
          </div>

          {/* AI Verdict Pill */}
          <button
            onClick={() => onOpenAiModal(ipo)}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-full border text-[11px] font-bold tracking-tight shadow-sm hover:scale-105 transition-all ${getVerdictBadge(
              ipo.aiAnalysis.verdict
            )}`}
          >
            <Sparkles className="h-3 w-3 text-cyan-300" />
            <span>{ipo.aiAnalysis.verdict.replace(/_/g, ' ')}</span>
          </button>
        </div>

        {/* Pricing & GMP Section */}
        <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-slate-950/50 p-3.5 border border-white/5">
          {/* Price Band */}
          <div>
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              Price Band
            </p>
            <p className="text-base font-extrabold text-white mt-0.5 font-mono">
              ₹{ipo.priceBandLow} - ₹{ipo.priceBandHigh}
            </p>
            <p className="text-[10px] text-slate-400 mt-1 flex items-center space-x-1">
              <Layers className="h-3 w-3 text-slate-500" />
              <span>Lot: {ipo.lotSize} shares (₹{minInvestment.toLocaleString('en-IN')})</span>
            </p>
          </div>

          {/* Grey Market Premium (GMP) */}
          <div className="text-right">
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              Est. Listing Gain (GMP)
            </p>
            <div className="flex items-center justify-end space-x-1 mt-0.5">
              <span
                className={`text-base font-extrabold font-mono ${
                  isGainPositive ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                ₹{ipo.currentGmp} ({ipo.gainPercentage > 0 ? '+' : ''}
                {ipo.gainPercentage}%)
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Est. Price: <span className="font-mono text-slate-200 font-semibold">₹{ipo.estimatedListingPrice}</span>
            </p>
          </div>
        </div>

        {/* Subscription Demand Preview */}
        <div className="mt-3.5 flex items-center justify-between rounded-xl bg-white/[0.02] px-3.5 py-2 border border-white/5 text-xs">
          <div className="flex items-center space-x-1.5 text-slate-400">
            <Clock className="h-3.5 w-3.5 text-cyan-400" />
            <span>Subscription Multiple:</span>
          </div>
          <div className="flex items-center space-x-3 text-xs font-mono">
            <div>
              <span className="text-slate-400 text-[10px]">QIB: </span>
              <span className="font-bold text-slate-200">{ipo.subscription.qib}x</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px]">NII: </span>
              <span className="font-bold text-slate-200">{ipo.subscription.nii}x</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px]">Retail: </span>
              <span className="font-bold text-emerald-400">{ipo.subscription.retail}x</span>
            </div>
          </div>
        </div>

        {/* Timelines */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-400">
          <div className="flex items-center space-x-1.5">
            <Calendar className="h-3.5 w-3.5 text-slate-500" />
            <span>Closes: <strong className="text-slate-300 font-semibold">{ipo.closeDate}</strong></span>
          </div>
          <div className="flex items-center space-x-1.5 text-right justify-end">
            <span>Listing: <strong className="text-slate-300 font-semibold">{ipo.listingDate}</strong></span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between space-x-2">
        <button
          onClick={() => onOpenBidCalc(ipo)}
          className="flex-1 flex items-center justify-center space-x-1.5 rounded-xl border border-white/10 bg-slate-800/60 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700/60 hover:text-white transition-all"
        >
          <Calculator className="h-3.5 w-3.5 text-cyan-400" />
          <span>Bid Calculator</span>
        </button>

        <button
          onClick={() => onOpenAiModal(ipo)}
          className="flex-1 flex items-center justify-center space-x-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition-all"
        >
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span>AI Analysis</span>
        </button>

        {ipo.status === 'ALLOTTED' && (
          <button
            onClick={() => onOpenAllotment(ipo)}
            className="flex items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-all"
            title="Check Allotment"
          >
            <ShieldCheck className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};
