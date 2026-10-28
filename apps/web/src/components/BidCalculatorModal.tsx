'use client';

import React, { useState } from 'react';
import { IPO } from '../types';
import { X, Calculator, Check } from 'lucide-react';

interface BidCalculatorModalProps {
  ipo: IPO | null;
  onClose: () => void;
}

export const BidCalculatorModal: React.FC<BidCalculatorModalProps> = ({ ipo, onClose }) => {
  const [lots, setLots] = useState(1);
  const [category, setCategory] = useState<'RETAIL' | 'sHNI' | 'bHNI'>('RETAIL');

  if (!ipo) return null;

  const totalShares = lots * ipo.lotSize;
  const investment = totalShares * ipo.priceBandHigh;
  const estimatedGainPerShare = ipo.currentGmp;
  const totalEstimatedProfit = totalShares * estimatedGainPerShare;
  const expectedTotalValue = investment + totalEstimatedProfit;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-[#0c0e14] p-6 shadow-2xl text-zinc-100 font-sans">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-200">
              <Calculator className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Bid Capital & P&L Calculator</h2>
              <p className="text-xs text-zinc-400 font-mono">{ipo.companyName} ({ipo.symbol})</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5 space-y-4 text-xs font-mono">
          {/* Category Selector */}
          <div>
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              Investor Bidding Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'RETAIL', label: 'Retail (≤2L)' },
                { id: 'sHNI', label: 'sHNI (2L-10L)' },
                { id: 'bHNI', label: 'bHNI (>10L)' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setCategory(cat.id as any);
                    if (cat.id === 'sHNI') setLots(Math.ceil(200000 / (ipo.priceBandHigh * ipo.lotSize)));
                    else if (cat.id === 'bHNI') setLots(Math.ceil(1000000 / (ipo.priceBandHigh * ipo.lotSize)));
                    else setLots(1);
                  }}
                  className={`rounded border py-1.5 px-2 text-[11px] font-bold transition-colors ${
                    category === cat.id
                      ? 'border-zinc-500 bg-zinc-800 text-white'
                      : 'border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lots Stepper */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Application Lots
              </label>
              <span className="text-[11px] text-zinc-300 font-bold">
                {totalShares} total shares
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setLots(Math.max(1, lots - 1))}
                className="h-9 w-10 flex items-center justify-center rounded border border-zinc-700 bg-zinc-850 text-white font-bold text-base hover:bg-zinc-750"
              >
                -
              </button>
              <input
                type="number"
                min={1}
                value={lots}
                onChange={(e) => setLots(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full text-center rounded border border-zinc-800 bg-zinc-950 py-1.5 font-bold text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setLots(lots + 1)}
                className="h-9 w-10 flex items-center justify-center rounded border border-zinc-700 bg-zinc-850 text-white font-bold text-base hover:bg-zinc-750"
              >
                +
              </button>
            </div>
          </div>

          {/* Calculations Summary Card */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3.5 space-y-2 text-xs">
            <div className="flex items-center justify-between text-zinc-400">
              <span>Required UPI Bid Capital:</span>
              <strong className="text-white">INR {investment.toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex items-center justify-between text-zinc-400">
              <span>Current Grey Market Premium:</span>
              <span className="text-emerald-400 font-bold">INR {ipo.currentGmp} / share ({ipo.gainPercentage}%)</span>
            </div>
            <div className="pt-2 border-t border-zinc-900 flex items-center justify-between">
              <span className="text-zinc-200 font-bold">Est. Listing Gain (If Allotted):</span>
              <strong className="text-emerald-400 font-bold text-sm">
                +INR {totalEstimatedProfit.toLocaleString('en-IN')}
              </strong>
            </div>
            <div className="flex items-center justify-between text-zinc-500 text-[11px]">
              <span>Estimated Settlement Value:</span>
              <span>INR {expectedTotalValue.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Save Bid / Apply Action */}
          <button
            onClick={() => {
              alert('Bid parameters recorded for UPI allocation tracking.');
              onClose();
            }}
            className="w-full flex items-center justify-center space-x-2 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-bold py-2 text-xs transition-colors"
          >
            <Check className="h-4 w-4" />
            <span>Save to Personal Portfolio</span>
          </button>
        </div>
      </div>
    </div>
  );
};
