'use client';

import React from 'react';
import { IPO } from '../types';
import { X, Sparkles, AlertTriangle, CheckCircle, BarChart3, TrendingUp, ShieldAlert } from 'lucide-react';

interface AiAnalysisModalProps {
  ipo: IPO | null;
  onClose: () => void;
}

export const AiAnalysisModal: React.FC<AiAnalysisModalProps> = ({ ipo, onClose }) => {
  if (!ipo) return null;

  const { aiAnalysis } = ipo;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-2xl rounded-2xl border border-white/10 p-6 shadow-2xl relative overflow-hidden bg-[#0d1424]">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white shadow-lg">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-white">{ipo.companyName}</h2>
                <span className="font-mono text-xs text-cyan-400 font-semibold">({ipo.symbol})</span>
              </div>
              <p className="text-xs text-slate-400">Gemini AI Prospectus Synthesizer & Valuation Report</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-5 space-y-5 max-h-[75vh] overflow-y-auto pr-1">
          {/* AI Verdict & Risk Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
                1-Click Verdict
              </span>
              <div className="text-xl font-black text-cyan-400 mt-1">
                {aiAnalysis.verdict.replace(/_/g, ' ')}
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {aiAnalysis.summary}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Calculated Risk Score
                  </span>
                  <span className="font-mono text-sm font-bold text-white">
                    {aiAnalysis.riskScore}/100
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 mt-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
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

              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/5 text-xs font-mono">
                <div>
                  <span className="text-slate-400 text-[10px]">IPO P/E: </span>
                  <span className="text-white font-bold">{aiAnalysis.peRatio ? `${aiAnalysis.peRatio}x` : 'Loss-Making'}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px]">Peer P/E: </span>
                  <span className="text-slate-300 font-bold">{aiAnalysis.industryPe ? `${aiAnalysis.industryPe}x` : 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Highlights */}
          <div className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
              <BarChart3 className="h-4 w-4 text-cyan-400" />
              <span>Financial Snapshot (RHP Filing)</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="rounded-lg bg-slate-950/60 p-2.5 border border-white/5">
                <span className="text-slate-400 text-[10px]">Total Revenue</span>
                <p className="font-mono font-bold text-white mt-0.5">{aiAnalysis.financials.revenue}</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 p-2.5 border border-white/5">
                <span className="text-slate-400 text-[10px]">Net PAT</span>
                <p className="font-mono font-bold text-white mt-0.5">{aiAnalysis.financials.pat}</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 p-2.5 border border-white/5">
                <span className="text-slate-400 text-[10px]">Growth Rate</span>
                <p className="font-mono font-bold text-emerald-400 mt-0.5">{aiAnalysis.financials.growth}</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 p-2.5 border border-white/5">
                <span className="text-slate-400 text-[10px]">Debt / Equity</span>
                <p className="font-mono font-bold text-white mt-0.5">{aiAnalysis.financials.debtToEquity}</p>
              </div>
            </div>
          </div>

          {/* Key Strengths & Red Flags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">
                <CheckCircle className="h-4 w-4" />
                <span>Key Investment Strengths</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {aiAnalysis.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-emerald-400 font-bold mt-0.5">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Red Flags / Risks */}
            <div className="rounded-xl border border-rose-500/20 bg-rose-950/10 p-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-rose-400 uppercase tracking-wider mb-3">
                <AlertTriangle className="h-4 w-4" />
                <span>Critical Red Flags</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {aiAnalysis.risks.map((risk, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-rose-400 font-bold mt-0.5">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>Source: SEBI RHP filing processed via Gemini 1.5</span>
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 px-4 py-2 font-semibold text-white hover:bg-slate-700 transition-colors"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
