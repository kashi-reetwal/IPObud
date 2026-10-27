'use client';

import React, { useState } from 'react';
import { IPO } from '../types';
import { X, Calculator, TrendingUp, Layers, Check } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-md rounded-2xl border border-white/10 p-6 shadow-2xl relative overflow-hidden bg-[#0d1424]">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-emerald-400 text-slate-950 font-bold shadow-lg">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Bid & P&L Calculator</h2>
              <p className="text-xs text-slate-400">{ipo.companyName} ({ipo.symbol})</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5 space-y-4">
          {/* Category Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Investor Quota Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'RETAIL', label: 'Retail (≤₹2L)' },
                { id: 'sHNI', label: 'sHNI (₹2L-₹10L)' },
                { id: 'bHNI', label: 'bHNI (>₹10L)' },
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
                  className={`rounded-xl py-2 px-2 text-xs font-semibold border transition-all ${
                    category === cat.id
                      ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300'
                      : 'border-white/10 bg-slate-900/60 text-slate-400 hover:text-white'
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
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Number of Lots
              </label>
              <span className="text-xs font-mono text-cyan-400 font-semibold">
                {totalShares} total shares
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setLots(Math.max(1, lots - 1))}
                className="h-10 w-12 flex items-center justify-center rounded-xl bg-slate-800 text-white font-bold text-lg hover:bg-slate-700 transition-colors"
              >
                -
              </button>
              <input
                type="number"
                min={1}
                value={lots}
                onChange={(e) => setLots(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full text-center rounded-xl border border-white/10 bg-slate-900/80 py-2 font-mono text-sm font-bold text-white focus:outline-none focus:border-cyan-500"
              />
              <button
                type="button"
                onClick={() => setLots(lots + 1)}
                className="h-10 w-12 flex items-center justify-center rounded-xl bg-slate-800 text-white font-bold text-lg hover:bg-slate-700 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Calculations Summary Card */}
          <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4 space-y-2.5 text-xs font-mono">
            <div className="flex items-center justify-between text-slate-300">
              <span>Required UPI Bid Capital:</span>
              <strong className="text-white text-sm">₹{investment.toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span>Current Grey Market Premium:</span>
              <span className="text-emerald-400 font-bold">₹{ipo.currentGmp} / share ({ipo.gainPercentage}%)</span>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-emerald-300 font-bold">Est. Listing Profit (If Allotted):</span>
              <strong className="text-emerald-400 text-base font-black">
                +₹{totalEstimatedProfit.toLocaleString('en-IN')}
              </strong>
            </div>
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>Est. Portfolio Portfolio Value:</span>
              <span>₹{expectedTotalValue.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Save Bid / Apply Action */}
          <button
            onClick={() => {
              alert(`Bid recorded! In Phase 4, this links with your broker UPI ID to automatically track allotment.`);
              onClose();
            }}
            className="w-full flex items-center justify-center space-x-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 py-2.5 font-bold text-slate-950 text-xs shadow-lg shadow-cyan-500/20 transition-all"
          >
            <Check className="h-4 w-4" />
            <span>Save Bid to Personal Portfolio</span>
          </button>
        </div>
      </div>
    </div>
  );
};
