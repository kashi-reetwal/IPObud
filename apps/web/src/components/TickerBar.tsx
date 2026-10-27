'use client';

import React from 'react';
import { IPO } from '../types';
import { ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react';

interface TickerBarProps {
  ipos: IPO[];
}

export const TickerBar: React.FC<TickerBarProps> = ({ ipos }) => {
  return (
    <div className="relative w-full overflow-hidden border-b border-white/5 bg-slate-950/60 py-2">
      <div className="flex items-center">
        {/* Sticky Label */}
        <div className="z-10 flex items-center space-x-1.5 bg-slate-950 px-4 py-0.5 text-[11px] font-bold uppercase tracking-wider text-cyan-400 shrink-0 border-r border-white/10">
          <Zap className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
          <span>LIVE GMP TICKER</span>
        </div>

        {/* Marquee */}
        <div className="flex overflow-hidden whitespace-nowrap">
          <div className="animate-ticker flex space-x-8 text-xs font-mono">
            {ipos.concat(ipos).map((ipo, idx) => {
              const isPositive = ipo.gainPercentage >= 0;
              return (
                <div key={`${ipo.id}-${idx}`} className="flex items-center space-x-2">
                  <span className="font-semibold text-slate-200">{ipo.symbol}</span>
                  <span className="text-slate-400">₹{ipo.priceBandHigh}</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-slate-300">GMP ₹{ipo.currentGmp}</span>
                  <span
                    className={`flex items-center space-x-0.5 font-bold ${
                      isPositive ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    <span>{Math.abs(ipo.gainPercentage)}%</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
