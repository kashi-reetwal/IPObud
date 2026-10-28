'use client';

import React, { useState } from 'react';
import { IPO } from '../types';
import { X, ShieldCheck, Search, ExternalLink } from 'lucide-react';

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

    setTimeout(() => {
      setIsSearching(false);
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
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-xl border border-zinc-800 bg-[#0c0e14] p-6 shadow-2xl text-zinc-100 font-sans">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-200">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Universal Allotment Query
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                Registrars: Link Intime, KFintech, Bigshare
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

        {/* Form Body */}
        <form onSubmit={handleSearch} className="mt-5 space-y-4 text-xs font-mono">
          <div>
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              Select Public Issue
            </label>
            <select
              value={activeIpoId}
              onChange={(e) => {
                setActiveIpoId(e.target.value);
                setSearchResult(null);
              }}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white focus:border-zinc-500 focus:outline-none"
            >
              {ipos.map((ipo) => (
                <option key={ipo.id} value={ipo.id} className="bg-zinc-950 text-white">
                  {ipo.companyName} ({ipo.symbol}) — {ipo.status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5">
              Applicant PAN (10-Digit Alphanumeric)
            </label>
            <input
              type="text"
              placeholder="e.g. ABCDE1234F"
              value={pan}
              onChange={(e) => setPan(e.target.value.toUpperCase())}
              maxLength={10}
              required
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 font-mono text-sm tracking-wider uppercase text-white placeholder-zinc-600 focus:border-zinc-500 focus:outline-none"
            />
            <p className="text-[10px] text-zinc-500 mt-1 font-sans">
              Enter PAN. Values ending with &apos;A&apos; simulate a confirmed allocation outcome.
            </p>
          </div>

          {currentIpo && (
            <div className="flex items-center justify-between rounded-lg bg-zinc-950 p-2.5 border border-zinc-850">
              <div>
                <span className="text-[9px] uppercase font-bold text-zinc-500">Official Registrar</span>
                <p className="font-semibold text-zinc-200 mt-0.5">{currentIpo.registrarName}</p>
              </div>
              <a
                href={currentIpo.registrarUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 text-zinc-400 hover:text-white font-semibold text-[11px]"
              >
                <span>Registrar Portal</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={isSearching}
            className="w-full flex items-center justify-center space-x-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-bold py-2 text-xs transition-colors disabled:opacity-50"
          >
            <Search className="h-3.5 w-3.5" />
            <span>{isSearching ? 'Verifying with Registrar...' : 'Fetch Allotment Status'}</span>
          </button>
        </form>

        {/* Outcome Display */}
        {searchResult && (
          <div className="mt-4 pt-3 border-t border-zinc-850 font-mono text-xs">
            {searchResult.status === 'ALLOTTED' ? (
              <div className="rounded-lg border border-emerald-800/60 bg-emerald-950/20 p-3.5">
                <p className="text-emerald-400 font-bold">
                  Status: Allotment Confirmed
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="rounded bg-zinc-950 p-2 border border-emerald-900/40">
                    <span className="text-zinc-500 text-[10px]">Shares Allocated</span>
                    <p className="font-bold text-white mt-0.5">{searchResult.sharesAllotted} Shares</p>
                  </div>
                  <div className="rounded bg-zinc-950 p-2 border border-emerald-900/40">
                    <span className="text-zinc-500 text-[10px]">Listing Value at GMP</span>
                    <p className="font-bold text-emerald-400 mt-0.5">
                      +INR {((currentIpo?.currentGmp || 0) * (searchResult.sharesAllotted || 1)).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3.5">
                <p className="text-rose-400 font-bold">
                  Status: Not Allotted
                </p>
                <p className="text-xs text-zinc-400 mt-1 font-sans">
                  UPI mandate unfreeze and bank refund will be processed on{' '}
                  <strong className="text-zinc-200">
                    {currentIpo?.timeline.refundsInitiation}
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
