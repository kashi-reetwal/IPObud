'use client';

import React from 'react';
import { IPO } from '../types';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TickerBarProps {
  ipos: IPO[];
}

export const TickerBar: React.FC<TickerBarProps> = ({ ipos }) => {
  return (
    <div className="relative w-full overflow-hidden border-b border-zinc-900 bg-zinc-950 py-1.5">
      <div className="flex items-center">
        {/* Sticky Label */}
        <div className="z-10 flex items-center bg-zinc-950 px-3 py-0.5 text-[10px] font-mono font-bold tracking-wider text-zinc-400 shrink-0 border-r border-zinc-800">
          <span>MARKET GMP TAPE</span>
        </div>

        {/* Marquee Tape */}
        <div className="flex overflow-hidden whitespace-nowrap">
          <div className="animate-ticker flex space-x-6 text-[11px] font-mono">
            {ipos.concat(ipos).map((ipo, idx) => {
              const isPositive = ipo.gainPercentage >= 0;
              return (
                <div key={`${ipo.id}-${idx}`} className="flex items-center space-x-2">
                  <span className="font-semibold text-zinc-200">{ipo.symbol}</span>
                  <span className="text-zinc-500">INR {ipo.priceBandHigh}</span>
                  <span className="text-zinc-700">|</span>
                  <span className="text-zinc-300">GMP INR {ipo.currentGmp}</span>
                  <span
                    className={`flex items-center font-bold ${
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
