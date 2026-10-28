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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-2xl text-[#0f172a]">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#f1f5f9] pb-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eff6ff] border border-[#bfdbfe] text-[#1849a9]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0f172a] tracking-tight">
                Universal Allotment Status Query
              </h2>
              <p className="text-xs text-[#64748b]">
                Link Intime, KFintech, Bigshare & Skyline Integrations
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

        {/* Form Body */}
        <form onSubmit={handleSearch} className="mt-5 space-y-4 text-xs">
          <div>
            <label className="block text-xs font-semibold text-[#64748b] mb-1.5">
              Select Public Issue
            </label>
            <select
              value={activeIpoId}
              onChange={(e) => {
                setActiveIpoId(e.target.value);
                setSearchResult(null);
              }}
              className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-2.5 text-xs text-[#0f172a] font-medium focus:border-[#00d09c] focus:bg-white focus:outline-none"
            >
              {ipos.map((ipo) => (
                <option key={ipo.id} value={ipo.id} className="text-[#0f172a]">
                  {ipo.companyName} ({ipo.symbol}) — {ipo.status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#64748b] mb-1.5">
              Applicant PAN (Permanent Account Number)
            </label>
            <input
              type="text"
              placeholder="e.g. ABCDE1234F"
              value={pan}
              onChange={(e) => setPan(e.target.value.toUpperCase())}
              maxLength={10}
              required
              className="w-full rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-2.5 text-sm tracking-wider uppercase text-[#0f172a] placeholder-[#94a3b8] focus:border-[#00d09c] focus:bg-white focus:outline-none"
            />
            <p className="text-[11px] text-[#64748b] mt-1.5">
              Enter PAN. Values ending with &apos;A&apos; simulate a confirmed allocation.
            </p>
          </div>

          {currentIpo && (
            <div className="flex items-center justify-between rounded-xl bg-[#f8fafc] p-3 border border-[#e2e8f0]">
              <div>
                <span className="text-[10px] font-bold text-[#64748b] uppercase">Official Registrar</span>
                <p className="font-bold text-[#0f172a] mt-0.5">{currentIpo.registrarName}</p>
              </div>
              <a
                href={currentIpo.registrarUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 text-[#1849a9] hover:underline font-bold text-xs"
              >
                <span>Direct Site</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={isSearching}
            className="w-full flex items-center justify-center space-x-2 rounded-xl bg-[#00d09c] hover:bg-[#00b887] text-white font-bold py-2.5 text-xs transition-all disabled:opacity-50 shadow-xs"
          >
            <Search className="h-4 w-4" />
            <span>{isSearching ? 'Verifying with Registrar...' : 'Fetch Allotment Status'}</span>
          </button>
        </form>

        {/* Outcome Display */}
        {searchResult && (
          <div className="mt-5 pt-3.5 border-t border-[#f1f5f9] text-xs">
            {searchResult.status === 'ALLOTTED' ? (
              <div className="rounded-xl border border-[#b3f0df] bg-[#e6faf5] p-4">
                <p className="text-[#008767] font-bold text-sm">
                  Status: Allotment Confirmed
                </p>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="rounded-lg bg-white p-2.5 border border-[#b3f0df] shadow-xs">
                    <span className="text-[#64748b] text-[11px] font-semibold">Shares Allocated</span>
                    <p className="font-bold text-[#0f172a] text-base mt-0.5">{searchResult.sharesAllotted} Shares</p>
                  </div>
                  <div className="rounded-lg bg-white p-2.5 border border-[#b3f0df] shadow-xs">
                    <span className="text-[#64748b] text-[11px] font-semibold">Est. Profit at Current GMP</span>
                    <p className="font-bold text-[#008767] text-base mt-0.5">
                      +₹{((currentIpo?.currentGmp || 0) * (searchResult.sharesAllotted || 1)).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-[#fecaca] bg-[#fef2f2] p-4">
                <p className="text-[#b91c1c] font-bold text-sm">
                  Status: Not Allotted
                </p>
                <p className="text-xs text-[#334155] mt-1.5 leading-relaxed">
                  UPI mandate unfreeze and bank refund will be processed on{' '}
                  <strong className="text-[#0f172a] font-bold">
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
