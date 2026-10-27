'use client';

import React, { useState } from 'react';
import { IPO } from '../types';
import { X, ShieldCheck, Search, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';

interface AllotmentModalProps {
  ipos: IPO[];
  selectedIpo?: IPO | null;
  onClose: () => void;
}

export const AllotmentModal: React.FC<AllotmentModalProps> = ({ ipos, selectedIpo, onClose }) => {
  const [activeIpoId, setActiveIpoId] = useState<string>(
    selectedIpo ? selectedIpo.id : ipos[0]?.id || ''
  );
  const [pan, setPan] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<{
    status: 'ALLOTTED' | 'NOT_ALLOTTED' | null;
    sharesAllotted?: number;
    amountRefunded?: number;
  } | null>(null);

  const currentIpo = ipos.find((i) => i.id === activeIpoId);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pan || pan.length < 5) return;

    setIsSearching(true);
    setSearchResult(null);

    // Simulate registrar query verification
    setTimeout(() => {
      setIsSearching(false);
      // Demo allotment outcome
      if (pan.toUpperCase().endsWith('A') || pan.toUpperCase().endsWith('7')) {
        setSearchResult({
          status: 'ALLOTTED',
          sharesAllotted: currentIpo ? currentIpo.lotSize : 1,
          amountRefunded: 0,
        });
      } else {
        setSearchResult({
          status: 'NOT_ALLOTTED',
          sharesAllotted: 0,
          amountRefunded: currentIpo ? currentIpo.priceBandHigh * currentIpo.lotSize : 0,
        });
      }
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-lg rounded-2xl border border-white/10 p-6 shadow-2xl relative overflow-hidden bg-[#0d1424]">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 text-white shadow-lg">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Universal Allotment Checker</h2>
              <p className="text-xs text-slate-400">Direct query across Link Intime, KFintech, & Bigshare</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSearch} className="mt-5 space-y-4">
          {/* Select IPO */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Select IPO Issue
            </label>
            <select
              value={activeIpoId}
              onChange={(e) => {
                setActiveIpoId(e.target.value);
                setSearchResult(null);
              }}
              className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3.5 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              {ipos.map((ipo) => (
                <option key={ipo.id} value={ipo.id} className="bg-slate-900 text-white">
                  {ipo.companyName} ({ipo.symbol}) — {ipo.status}
                </option>
              ))}
            </select>
          </div>

          {/* PAN Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Applicant PAN (Permanent Account Number)
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. ABCDE1234F"
                value={pan}
                onChange={(e) => setPan(e.target.value.toUpperCase())}
                maxLength={10}
                required
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3.5 py-2.5 font-mono text-sm tracking-wider uppercase text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Tip: End your PAN with &apos;A&apos; to test a guaranteed Allotted simulation!
            </p>
          </div>

          {/* Registrar Info & Official Portal Link */}
          {currentIpo && (
            <div className="flex items-center justify-between rounded-xl bg-slate-950/40 p-3 border border-white/5 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-semibold">Official Registrar</span>
                <p className="font-semibold text-slate-200 mt-0.5">{currentIpo.registrarName}</p>
              </div>
              <a
                href={currentIpo.registrarUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                <span>Direct Site</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSearching}
            className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 py-2.5 font-bold text-slate-950 hover:opacity-95 transition-all disabled:opacity-50 text-xs shadow-lg shadow-cyan-500/20"
          >
            <Search className="h-4 w-4" />
            <span>{isSearching ? 'Verifying with Registrar...' : 'Fetch Allotment Status'}</span>
          </button>
        </form>

        {/* Search Outcome Display */}
        {searchResult && (
          <div className="mt-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {searchResult.status === 'ALLOTTED' ? (
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-4">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Congratulations! Allotment Confirmed 🎉</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs font-mono">
                  <div className="rounded-lg bg-emerald-950/40 p-2 border border-emerald-500/20">
                    <span className="text-emerald-300/70 text-[10px]">Shares Allotted</span>
                    <p className="font-bold text-white text-sm">{searchResult.sharesAllotted} Shares</p>
                  </div>
                  <div className="rounded-lg bg-emerald-950/40 p-2 border border-emerald-500/20">
                    <span className="text-emerald-300/70 text-[10px]">Est. Gain at GMP</span>
                    <p className="font-bold text-emerald-400 text-sm">
                      +₹{((currentIpo?.currentGmp || 0) * (searchResult.sharesAllotted || 1)).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-rose-500/40 bg-rose-950/20 p-4">
                <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
                  <AlertCircle className="h-5 w-5" />
                  <span>Not Allotted for this Application</span>
                </div>
                <p className="text-xs text-slate-300 mt-2">
                  UPI mandate revocation and bank refund will be processed by{' '}
                  <strong className="text-white font-semibold">
                    {currentIpo?.allotmentDate || 'tomorrow'}
                  </strong>
                  .
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
