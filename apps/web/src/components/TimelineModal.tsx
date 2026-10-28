'use client';

import React from 'react';
import { IPO } from '../types';
import { CalendarTimeline } from './CalendarTimeline';
import { GmpHistoryChart } from './GmpHistoryChart';
import { X, Calendar, Layers, ShieldCheck } from 'lucide-react';

interface TimelineModalProps {
  ipo: IPO | null;
  onClose: () => void;
  onOpenBidCalc: (ipo: IPO) => void;
  onOpenAllotment: (ipo: IPO) => void;
}

export const TimelineModal: React.FC<TimelineModalProps> = ({
  ipo,
  onClose,
  onOpenBidCalc,
  onOpenAllotment,
}) => {
  if (!ipo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-zinc-800 bg-[#0c0e14] p-6 shadow-2xl text-zinc-100 font-sans">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center space-x-2.5">
              <h2 className="text-lg font-bold text-white tracking-tight">
                {ipo.companyName}
              </h2>
              <span className="rounded border border-zinc-700 bg-zinc-900 px-2 py-0.5 font-mono text-xs font-bold text-zinc-300">
                {ipo.symbol}
              </span>
              <span className="rounded border border-zinc-800 bg-zinc-950 px-2 py-0.5 text-[11px] font-mono text-zinc-400">
                {ipo.marketType}
              </span>
            </div>
            <p className="mt-1 text-xs text-zinc-400 font-mono">
              Registrar: {ipo.registrarName} • Issue Size: INR {ipo.issueSizeCr.toLocaleString('en-IN')} Cr
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-5 space-y-5">
          {/* 1. Complete Calendar Timeline */}
          <CalendarTimeline timeline={ipo.timeline} />

          {/* 2. Interactive GMP Historical Trend & Past Performance Chart */}
          <GmpHistoryChart
            data={ipo.gmpHistory}
            symbol={ipo.symbol}
            issuePrice={ipo.priceBandHigh}
            pastResults={ipo.pastResults}
          />
        </div>

        {/* Modal Footer Actions */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                onClose();
                onOpenBidCalc(ipo);
              }}
              className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 font-semibold text-zinc-200 hover:bg-zinc-700 transition-colors"
            >
              Open Bid Calculator
            </button>

            {ipo.status === 'ALLOTTED' && (
              <button
                onClick={() => {
                  onClose();
                  onOpenAllotment(ipo);
                }}
                className="flex items-center space-x-1.5 rounded-lg border border-emerald-800/60 bg-emerald-950/40 px-3 py-1.5 font-semibold text-emerald-300 hover:bg-emerald-900/40 transition-colors"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Check Allotment Status</span>
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="rounded-lg bg-zinc-800 px-4 py-1.5 font-semibold text-white hover:bg-zinc-700 transition-colors"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
