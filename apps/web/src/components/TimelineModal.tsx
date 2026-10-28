'use client';

import React from 'react';
import { IPO } from '../types';
import { CalendarTimeline } from './CalendarTimeline';
import { GmpHistoryChart } from './GmpHistoryChart';
import { X, ShieldCheck, Calculator } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-2xl text-[#0f172a]">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#f1f5f9] pb-4">
          <div>
            <div className="flex items-center space-x-3">
              <h2 className="text-xl font-bold text-[#0f172a] tracking-tight">
                {ipo.companyName}
              </h2>
              <span className="rounded-lg bg-[#f1f5f9] border border-[#e2e8f0] px-2.5 py-0.5 text-xs font-bold text-[#0f172a]">
                {ipo.symbol}
              </span>
              <span className="rounded-lg bg-[#e6faf5] border border-[#b3f0df] px-2.5 py-0.5 text-xs font-bold text-[#008767]">
                {ipo.marketType}
              </span>
            </div>
            <p className="mt-1 text-xs text-[#64748b]">
              Registrar: {ipo.registrarName} • Issue Size: ₹{ipo.issueSizeCr.toLocaleString('en-IN')} Cr
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors"
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
        <div className="mt-6 pt-4 border-t border-[#f1f5f9] flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => {
                onClose();
                onOpenBidCalc(ipo);
              }}
              className="flex items-center space-x-1.5 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-4 py-2 font-semibold text-[#0f172a] hover:bg-[#f1f5f9] transition-colors"
            >
              <Calculator className="h-4 w-4 text-[#64748b]" />
              <span>Bid Calculator</span>
            </button>

            {ipo.status === 'ALLOTTED' && (
              <button
                onClick={() => {
                  onClose();
                  onOpenAllotment(ipo);
                }}
                className="flex items-center space-x-1.5 rounded-xl bg-[#eff6ff] border border-[#bfdbfe] px-4 py-2 font-bold text-[#1849a9] hover:bg-[#dbeafe] transition-colors"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Check Allotment</span>
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-[#00d09c] hover:bg-[#00b887] px-5 py-2 font-bold text-white shadow-xs transition-colors"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
