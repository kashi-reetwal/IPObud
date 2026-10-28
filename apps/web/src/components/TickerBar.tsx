'use client';

import React from 'react';
import { IPO } from '../types';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerBarProps {
  ipos: IPO[];
}

export const TickerBar: React.FC<TickerBarProps> = ({ ipos }) => {
  return (
    <div className="relative w-full overflow-hidden border-b border-[#e2e8f0] bg-[#f8fafc] py-2">
      <div className="flex items-center">
        {/* Sticky Label */}
        <div className="z-10 flex items-center space-x-1.5 bg-[#f8fafc] px-4 py-0.5 text-[11px] font-semibold text-[#64748b] shrink-0 border-r border-[#e2e8f0]">
          <span className="h-2 w-2 rounded-full bg-[#00d09c] animate-pulse" />
          <span className="font-bold text-[#0f172a]">Live GMP Radar</span>
        </div>

        {/* Marquee Tape */}
        <div className="flex overflow-hidden whitespace-nowrap">
          <div className="animate-ticker flex space-x-8 text-xs">
            {ipos.concat(ipos).map((ipo, idx) => {
              const isPositive = ipo.gainPercentage >= 0;
              return (
                <div key={`${ipo.id}-${idx}`} className="flex items-center space-x-2">
                  <span className="font-bold text-[#0f172a]">{ipo.symbol}</span>
                  <span className="text-[#64748b]">₹{ipo.priceBandHigh}</span>
                  <span className="text-[#cbd5e1]">•</span>
                  <span className="text-[#334155] font-medium">GMP ₹{ipo.currentGmp}</span>
                  <span
                    className={`flex items-center space-x-0.5 font-bold px-1.5 py-0.5 rounded text-[11px] ${
                      isPositive
                        ? 'text-[#008767] bg-[#e6faf5]'
                        : 'text-[#b91c1c] bg-[#fef2f2]'
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3 inline" />
                    ) : (
                      <TrendingDown className="h-3 w-3 inline" />
                    )}
                    <span>{ipo.gainPercentage > 0 ? `+${ipo.gainPercentage}%` : `${ipo.gainPercentage}%`}</span>
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
