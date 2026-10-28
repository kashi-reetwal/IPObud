'use client';

import React from 'react';
import { IPO } from '../types';
import { X, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react';

interface AiAnalysisModalProps {
  ipo: IPO | null;
  onClose: () => void;
}

export const AiAnalysisModal: React.FC<AiAnalysisModalProps> = ({ ipo, onClose }) => {
  if (!ipo) return null;

  const { aiAnalysis } = ipo;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-2xl text-[#0f172a]">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#f1f5f9] pb-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6faf5] border border-[#b3f0df] text-[#008767]">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-[#0f172a] tracking-tight">
                  {ipo.companyName}
                </h2>
                <span className="rounded-md bg-[#f1f5f9] border border-[#e2e8f0] px-2 py-0.5 text-xs font-bold text-[#0f172a]">
                  {ipo.symbol}
                </span>
              </div>
              <p className="text-xs text-[#64748b]">
                Prospectus Review & Valuation Benchmark
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-5 space-y-4 text-xs">
          {/* Verdict and Risk Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-[#b3f0df] bg-[#e6faf5] p-4 shadow-xs">
              <span className="text-[11px] font-bold text-[#008767] uppercase tracking-wide">
                Investment Rating
              </span>
              <div className="text-xl font-extrabold text-[#008767] mt-1">
                {aiAnalysis.verdict.replace(/_/g, ' ')}
              </div>
              <p className="text-xs text-[#334155] mt-2 leading-relaxed font-medium">
                {aiAnalysis.summary}
              </p>
            </div>

            <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#64748b] uppercase">
                    Risk Assessment
                  </span>
                  <span className="font-bold text-[#0f172a] text-sm">
                    {aiAnalysis.riskScore}/100
                  </span>
                </div>
                <div className="w-full bg-[#e2e8f0] rounded-full h-2 mt-2.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      aiAnalysis.riskScore > 60
                        ? 'bg-[#b91c1c]'
                        : aiAnalysis.riskScore > 35
                        ? 'bg-[#f59e0b]'
                        : 'bg-[#00d09c]'
                    }`}
                    style={{ width: `${aiAnalysis.riskScore}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#e2e8f0]">
                <div>
                  <span className="text-[#64748b] text-[11px]">Issue P/E: </span>
                  <span className="text-[#0f172a] font-bold">{aiAnalysis.peRatio ? `${aiAnalysis.peRatio}x` : 'N/A (Loss)'}</span>
                </div>
                <div>
                  <span className="text-[#64748b] text-[11px]">Industry Peer P/E: </span>
                  <span className="text-[#0f172a] font-bold">{aiAnalysis.industryPe ? `${aiAnalysis.industryPe}x` : 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Highlights */}
          <div className="rounded-xl border border-[#e2e8f0] bg-white p-4 shadow-xs">
            <span className="text-xs font-bold text-[#0f172a] uppercase tracking-wide">
              Audited Financial Highlights (RHP Filing)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
              <div className="rounded-lg bg-[#f8fafc] p-2.5 border border-[#e2e8f0]">
                <span className="text-[#64748b] text-[11px] font-semibold">Total Revenue</span>
                <p className="font-bold text-[#0f172a] text-sm mt-0.5">{aiAnalysis.financials.revenue}</p>
              </div>
              <div className="rounded-lg bg-[#f8fafc] p-2.5 border border-[#e2e8f0]">
                <span className="text-[#64748b] text-[11px] font-semibold">Net PAT</span>
                <p className="font-bold text-[#0f172a] text-sm mt-0.5">{aiAnalysis.financials.pat}</p>
              </div>
              <div className="rounded-lg bg-[#f8fafc] p-2.5 border border-[#e2e8f0]">
                <span className="text-[#64748b] text-[11px] font-semibold">Annual Growth</span>
                <p className="font-bold text-[#008767] text-sm mt-0.5">{aiAnalysis.financials.growth}</p>
              </div>
              <div className="rounded-lg bg-[#f8fafc] p-2.5 border border-[#e2e8f0]">
                <span className="text-[#64748b] text-[11px] font-semibold">Debt to Equity</span>
                <p className="font-bold text-[#0f172a] text-sm mt-0.5">{aiAnalysis.financials.debtToEquity}</p>
              </div>
            </div>
          </div>

          {/* Strengths & Red flags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-[#b3f0df] bg-[#e6faf5]/40 p-4 shadow-xs">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-[#008767] mb-2.5">
                <CheckCircle2 className="h-4 w-4" />
                <span>Key Investment Drivers</span>
              </div>
              <ul className="space-y-2 text-xs text-[#334155]">
                {aiAnalysis.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-[#008767] font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[#fecaca] bg-[#fef2f2] p-4 shadow-xs">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-[#b91c1c] mb-2.5">
                <AlertCircle className="h-4 w-4" />
                <span>Identified Risk Factors</span>
              </div>
              <ul className="space-y-2 text-xs text-[#334155]">
                {aiAnalysis.risks.map((risk, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-[#b91c1c] font-bold">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3.5 border-t border-[#f1f5f9] flex items-center justify-between text-xs text-[#64748b]">
          <span>Source: Official Red Herring Prospectus (SEBI)</span>
          <button
            onClick={onClose}
            className="rounded-xl bg-[#00d09c] hover:bg-[#00b887] px-4 py-2 font-bold text-white shadow-xs transition-colors"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
