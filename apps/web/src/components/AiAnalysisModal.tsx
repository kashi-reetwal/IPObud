'use client';

import React from 'react';
import { IPO } from '../types';
import { X, FileText, CheckCircle, AlertTriangle, BarChart2 } from 'lucide-react';

interface AiAnalysisModalProps {
  ipo: IPO | null;
  onClose: () => void;
}

export const AiAnalysisModal: React.FC<AiAnalysisModalProps> = ({ ipo, onClose }) => {
  if (!ipo) return null;

  const { aiAnalysis } = ipo;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-zinc-800 bg-[#0c0e14] p-6 shadow-2xl text-zinc-100 font-sans">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-white tracking-tight">
                  {ipo.companyName}
                </h2>
                <span className="font-mono text-xs font-bold text-zinc-300">
                  ({ipo.symbol})
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono">
                Equity Prospectus Synthesis & Valuation Review
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-5 space-y-4 font-mono text-xs">
          {/* Verdict and Risk Score */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3.5">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                Investment Rating
              </span>
              <div className="text-lg font-bold text-zinc-100 mt-0.5">
                {aiAnalysis.verdict.replace(/_/g, ' ')}
              </div>
              <p className="font-sans text-xs text-zinc-300 mt-1.5 leading-relaxed">
                {aiAnalysis.summary}
              </p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                    Calculated Risk Metric
                  </span>
                  <span className="font-bold text-white">
                    {aiAnalysis.riskScore}/100
                  </span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      aiAnalysis.riskScore > 60
                        ? 'bg-rose-500'
                        : aiAnalysis.riskScore > 35
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                    style={{ width: `${aiAnalysis.riskScore}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-zinc-900">
                <div>
                  <span className="text-zinc-500 text-[10px]">Issue P/E: </span>
                  <span className="text-zinc-200 font-bold">{aiAnalysis.peRatio ? `${aiAnalysis.peRatio}x` : 'N/A (Loss)'}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px]">Peer Median P/E: </span>
                  <span className="text-zinc-200 font-bold">{aiAnalysis.industryPe ? `${aiAnalysis.industryPe}x` : 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Metrics Snapshot */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3.5">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
              Audited Financial Summary (SEBI DRHP/RHP)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
              <div className="rounded bg-zinc-900/60 p-2 border border-zinc-850">
                <span className="text-zinc-500 text-[10px]">Total Revenue</span>
                <p className="font-bold text-zinc-200 mt-0.5">{aiAnalysis.financials.revenue}</p>
              </div>
              <div className="rounded bg-zinc-900/60 p-2 border border-zinc-850">
                <span className="text-zinc-500 text-[10px]">Net PAT</span>
                <p className="font-bold text-zinc-200 mt-0.5">{aiAnalysis.financials.pat}</p>
              </div>
              <div className="rounded bg-zinc-900/60 p-2 border border-zinc-850">
                <span className="text-zinc-500 text-[10px]">Operational Growth</span>
                <p className="font-bold text-emerald-400 mt-0.5">{aiAnalysis.financials.growth}</p>
              </div>
              <div className="rounded bg-zinc-900/60 p-2 border border-zinc-850">
                <span className="text-zinc-500 text-[10px]">Debt to Equity</span>
                <p className="font-bold text-zinc-200 mt-0.5">{aiAnalysis.financials.debtToEquity}</p>
              </div>
            </div>
          </div>

          {/* Strengths & Red Flags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3.5">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider mb-2 block">
                Primary Investment Drivers
              </span>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {aiAnalysis.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3.5">
              <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider mb-2 block">
                Key Identified Risk Factors
              </span>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {aiAnalysis.risks.map((risk, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500 font-mono">
          <span>Source: Official Red Herring Prospectus (RHP)</span>
          <button
            onClick={onClose}
            className="rounded bg-zinc-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-zinc-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
