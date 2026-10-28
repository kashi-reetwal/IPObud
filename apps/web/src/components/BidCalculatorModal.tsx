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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-2xl text-[#0f172a]">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#f1f5f9] pb-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6faf5] border border-[#b3f0df] text-[#008767]">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0f172a] tracking-tight">Bid Capital & P&L Calculator</h2>
              <p className="text-xs text-[#64748b]">{ipo.companyName} ({ipo.symbol})</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5 space-y-4 text-xs">
          {/* Category Selector */}
          <div>
            <label className="block text-xs font-semibold text-[#64748b] mb-1.5">
              Investor Bidding Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'RETAIL', label: 'Retail (≤₹2L)' },
                { id: 'sHNI', label: 'sHNI (₹2L-10L)' },
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
                  className={`rounded-xl border py-2 px-2 text-xs font-bold transition-all ${
                    category === cat.id
                      ? 'border-[#00d09c] bg-[#e6faf5] text-[#008767] shadow-xs'
                      : 'border-[#e2e8f0] bg-[#f8fafc] text-[#64748b] hover:text-[#0f172a]'
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
              <label className="text-xs font-semibold text-[#64748b]">
                Application Lots
              </label>
              <span className="text-xs font-bold text-[#0f172a]">
                {totalShares} total shares
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setLots(Math.max(1, lots - 1))}
                className="h-10 w-12 flex items-center justify-center rounded-xl border border-[#e2e8f0] bg-[#f8fafc] text-[#0f172a] font-bold text-lg hover:bg-[#f1f5f9] transition-colors"
              >
                -
              </button>
              <input
                type="number"
                min={1}
                value={lots}
                onChange={(e) => setLots(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full text-center rounded-xl border border-[#e2e8f0] bg-[#f8fafc] py-2 font-bold text-[#0f172a] text-sm focus:outline-none focus:border-[#00d09c] focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setLots(lots + 1)}
                className="h-10 w-12 flex items-center justify-center rounded-xl border border-[#e2e8f0] bg-[#f8fafc] text-[#0f172a] font-bold text-lg hover:bg-[#f1f5f9] transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Calculations Summary Card */}
          <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4 space-y-2.5 text-xs shadow-xs">
            <div className="flex items-center justify-between text-[#64748b]">
              <span>Required UPI Bid Capital:</span>
              <strong className="text-[#0f172a] text-sm font-bold">₹{investment.toLocaleString('en-IN')}</strong>
            </div>
            <div className="flex items-center justify-between text-[#64748b]">
              <span>Current Grey Market Premium:</span>
              <span className="text-[#008767] font-bold">₹{ipo.currentGmp} / share ({ipo.gainPercentage}%)</span>
            </div>
            <div className="pt-2.5 border-t border-[#e2e8f0] flex items-center justify-between">
              <span className="text-[#0f172a] font-bold">Est. Listing Gain (If Allotted):</span>
              <strong className="text-[#008767] font-extrabold text-base">
                +₹{totalEstimatedProfit.toLocaleString('en-IN')}
              </strong>
            </div>
            <div className="flex items-center justify-between text-[#64748b] text-[11px]">
              <span>Estimated Portfolio Value:</span>
              <span className="font-semibold text-[#0f172a]">₹{expectedTotalValue.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Action */}
          <button
            onClick={() => {
              alert('Bid parameters recorded for UPI allocation tracking.');
              onClose();
            }}
            className="w-full flex items-center justify-center space-x-2 rounded-xl bg-[#00d09c] hover:bg-[#00b887] text-white font-bold py-2.5 text-xs transition-all shadow-xs"
          >
            <Check className="h-4 w-4 stroke-[3]" />
            <span>Save to Portfolio</span>
          </button>
        </div>
      </div>
    </div>
  );
};
