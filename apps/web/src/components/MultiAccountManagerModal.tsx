'use client';

import React, { useState, useEffect } from 'react';
import { IPO, FamilyAccount, AccountAllotmentResult, BulkAllotmentSummary } from '../types';
import { initialFamilyAccounts } from '../data/mockIpos';
import {
  X,
  Users,
  UserPlus,
  Trash2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  RefreshCw,
  Clock,
} from 'lucide-react';

interface MultiAccountManagerModalProps {
  ipos: IPO[];
  selectedIpo?: IPO | null;
  onClose: () => void;
}

export const MultiAccountManagerModal: React.FC<MultiAccountManagerModalProps> = ({
  ipos,
  selectedIpo,
  onClose,
}) => {
  const [accounts, setAccounts] = useState<FamilyAccount[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ipobud_family_accounts');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return initialFamilyAccounts;
        }
      }
    }
    return initialFamilyAccounts;
  });

  const [activeIpoId, setActiveIpoId] = useState<string>(
    selectedIpo ? selectedIpo.id : ipos[0]?.id || ''
  );

  // New account form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPan, setNewPan] = useState('');
  const [newRelation, setNewRelation] = useState<FamilyAccount['relation']>('Self');
  const [newDpId, setNewDpId] = useState('');

  // Bulk query execution state
  const [isChecking, setIsChecking] = useState(false);
  const [bulkSummary, setBulkSummary] = useState<BulkAllotmentSummary | null>(null);

  // Save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('ipobud_family_accounts', JSON.stringify(accounts));
    }
  }, [accounts]);

  const currentIpo = ipos.find((i) => i.id === activeIpoId) || ipos[0];

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPan.trim() || newPan.length < 10) return;

    const newAcc: FamilyAccount = {
      id: `acc-${Date.now()}`,
      name: newName.trim(),
      pan: newPan.toUpperCase().trim(),
      relation: newRelation,
      dpClientId: newDpId.trim() || undefined,
    };

    setAccounts([...accounts, newAcc]);
    setNewName('');
    setNewPan('');
    setNewDpId('');
    setShowAddForm(false);
    setBulkSummary(null);
  };

  const handleRemoveAccount = (id: string) => {
    setAccounts(accounts.filter((a) => a.id !== id));
    setBulkSummary(null);
  };

  // Run One-Click Multi-Account Check across family PANs
  const handleBulkCheck = () => {
    if (accounts.length === 0) return;

    setIsChecking(true);
    setBulkSummary(null);

    setTimeout(() => {
      setIsChecking(false);

      const results: AccountAllotmentResult[] = accounts.map((acc, idx) => {
        // Realistic simulation: accounts ending with 'A' or '7', or alternating if SME
        const isAllotted =
          acc.pan.endsWith('A') ||
          acc.pan.endsWith('7') ||
          (idx === 1 && currentIpo?.gainPercentage > 50);

        const lotSize = currentIpo ? currentIpo.lotSize : 1;
        const priceBandHigh = currentIpo ? currentIpo.priceBandHigh : 0;
        const currentGmp = currentIpo ? currentIpo.currentGmp : 0;

        const sharesAllotted = isAllotted ? lotSize : 0;
        const amountInvested = priceBandHigh * lotSize;
        const estimatedGain = isAllotted ? currentGmp * lotSize : 0;
        const refundAmount = isAllotted ? 0 : amountInvested;

        return {
          accountId: acc.id,
          accountName: acc.name,
          pan: acc.pan,
          relation: acc.relation,
          status: isAllotted ? 'ALLOTTED' : 'NOT_ALLOTTED',
          sharesAllotted,
          amountInvested,
          estimatedGain,
          refundAmount,
        };
      });

      const totalAllottedAccounts = results.filter((r) => r.status === 'ALLOTTED').length;
      const totalShares = results.reduce((acc, r) => acc + r.sharesAllotted, 0);
      const totalEstProfit = results.reduce((acc, r) => acc + r.estimatedGain, 0);

      setBulkSummary({
        ipoId: currentIpo ? currentIpo.id : '',
        ipoSymbol: currentIpo ? currentIpo.symbol : '',
        totalAccountsChecked: accounts.length,
        totalAllottedAccounts,
        totalShares,
        totalEstProfit,
        results,
      });
    }, 750);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-2xl text-[#0f172a]">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#f1f5f9] pb-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eff6ff] border border-[#bfdbfe] text-[#1849a9]">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-[#0f172a] tracking-tight">
                  Multi-Account Allotment Engine
                </h2>
                <span className="rounded-full bg-[#e6faf5] border border-[#b3f0df] px-2 py-0.5 text-[10px] font-bold text-[#008767]">
                  Family Portfolio
                </span>
              </div>
              <p className="text-xs text-[#64748b]">
                Save family Demat PANs & check bulk allotment with one click
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

        {/* Target IPO Selector Bar */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl bg-[#f8fafc] p-3.5 border border-[#e2e8f0]">
          <div className="flex-1">
            <label className="block text-[11px] font-semibold text-[#64748b] mb-1">
              Select IPO for Allotment Check:
            </label>
            <select
              value={activeIpoId}
              onChange={(e) => {
                setActiveIpoId(e.target.value);
                setBulkSummary(null);
              }}
              className="w-full rounded-lg border border-[#e2e8f0] bg-white px-3 py-1.5 text-xs text-[#0f172a] font-bold focus:border-[#00d09c] focus:outline-none"
            >
              {ipos.map((ipo) => (
                <option key={ipo.id} value={ipo.id}>
                  {ipo.companyName} ({ipo.symbol}) — {ipo.status}
                </option>
              ))}
            </select>
          </div>

          <div className="shrink-0 flex items-center space-x-2">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center space-x-1.5 rounded-lg border border-[#e2e8f0] bg-white hover:bg-[#f1f5f9] px-3 py-2 text-xs font-semibold text-[#0f172a] transition-all"
            >
              <UserPlus className="h-4 w-4 text-[#1849a9]" />
              <span>{showAddForm ? 'Cancel' : 'Add Account'}</span>
            </button>

            <button
              onClick={handleBulkCheck}
              disabled={isChecking || accounts.length === 0}
              className="flex items-center space-x-1.5 rounded-lg bg-[#00d09c] hover:bg-[#00b887] px-4 py-2 text-xs font-bold text-white transition-all disabled:opacity-50 shadow-xs"
            >
              <RefreshCw className={`h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
              <span>{isChecking ? 'Checking...' : `Check All (${accounts.length})`}</span>
            </button>
          </div>
        </div>

        {/* Add Account Inline Form */}
        {showAddForm && (
          <form
            onSubmit={handleAddAccount}
            className="mt-3.5 rounded-xl border border-[#b3f0df] bg-[#e6faf5]/30 p-4 text-xs space-y-3"
          >
            <span className="font-bold text-[#008767] text-xs block">
              Add Family / Beneficiary Demat Account
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold text-[#64748b] mb-1">
                  Holder Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-[#e2e8f0] bg-white px-2.5 py-1.5 text-xs text-[#0f172a] focus:border-[#00d09c]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#64748b] mb-1">
                  10-Digit PAN
                </label>
                <input
                  type="text"
                  placeholder="ABCDE1234F"
                  maxLength={10}
                  value={newPan}
                  onChange={(e) => setNewPan(e.target.value.toUpperCase())}
                  required
                  className="w-full rounded-lg border border-[#e2e8f0] bg-white px-2.5 py-1.5 text-xs uppercase tracking-wider text-[#0f172a] focus:border-[#00d09c]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#64748b] mb-1">
                  Relation
                </label>
                <select
                  value={newRelation}
                  onChange={(e) => setNewRelation(e.target.value as any)}
                  className="w-full rounded-lg border border-[#e2e8f0] bg-white px-2.5 py-1.5 text-xs text-[#0f172a] focus:border-[#00d09c]"
                >
                  <option value="Self">Self</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Child">Child</option>
                  <option value="Friend">Friend</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#64748b] mb-1">
                  DP / Client ID (Opt)
                </label>
                <input
                  type="text"
                  placeholder="12081600..."
                  value={newDpId}
                  onChange={(e) => setNewDpId(e.target.value)}
                  className="w-full rounded-lg border border-[#e2e8f0] bg-white px-2.5 py-1.5 text-xs text-[#0f172a] focus:border-[#00d09c]"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-1">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 rounded-lg border border-[#e2e8f0] bg-white text-[#64748b]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-[#00d09c] hover:bg-[#00b887] text-white font-bold shadow-xs"
              >
                Save Account
              </button>
            </div>
          </form>
        )}

        {/* Bulk Allotment Result Banner (if run) */}
        {bulkSummary && (
          <div className="mt-4 rounded-xl border border-[#b3f0df] bg-[#e6faf5] p-4 text-xs">
            <div className="flex items-center justify-between border-b border-[#b3f0df] pb-2">
              <div>
                <span className="font-bold text-[#008767] text-sm">
                  Bulk Allotment Status: {currentIpo.symbol}
                </span>
                <p className="text-[11px] text-[#334155]">
                  Registrar: {currentIpo.registrarName} • Refund Date: {currentIpo.timeline.refundsInitiation}
                </p>
              </div>
              <span className="rounded-full bg-white px-2.5 py-1 font-bold text-[#008767] border border-[#b3f0df]">
                {bulkSummary.totalAllottedAccounts} / {bulkSummary.totalAccountsChecked} Allotted
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-3 text-center">
              <div className="rounded-lg bg-white p-2 border border-[#b3f0df] shadow-xs">
                <span className="text-[10px] text-[#64748b] block font-semibold">Total Shares Allotted</span>
                <p className="text-base font-extrabold text-[#0f172a] mt-0.5">{bulkSummary.totalShares} Shares</p>
              </div>
              <div className="rounded-lg bg-white p-2 border border-[#b3f0df] shadow-xs">
                <span className="text-[10px] text-[#64748b] block font-semibold">Total Family Gain (GMP)</span>
                <p className="text-base font-extrabold text-[#008767] mt-0.5">
                  +₹{bulkSummary.totalEstProfit.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="rounded-lg bg-white p-2 border border-[#b3f0df] shadow-xs">
                <span className="text-[10px] text-[#64748b] block font-semibold">UPI Mandate Status</span>
                <p className="text-xs font-bold text-[#1849a9] mt-1.5">Unfreezes {currentIpo.timeline.refundsInitiation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Saved Accounts Table */}
        <div className="mt-4 overflow-hidden rounded-xl border border-[#e2e8f0]">
          <div className="bg-[#f8fafc] px-3.5 py-2.5 border-b border-[#e2e8f0] flex items-center justify-between">
            <span className="text-xs font-bold text-[#0f172a]">
              Saved Demat Accounts ({accounts.length})
            </span>
            <span className="text-[11px] text-[#64748b]">
              Stored securely in local session
            </span>
          </div>

          <div className="divide-y divide-[#f1f5f9]">
            {accounts.map((acc) => {
              const res = bulkSummary?.results.find((r) => r.accountId === acc.id);

              return (
                <div
                  key={acc.id}
                  className="flex items-center justify-between p-3.5 hover:bg-[#f8fafc] transition-colors text-xs"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eff6ff] text-[#1849a9] font-bold text-xs">
                      {acc.relation.slice(0, 1)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-[#0f172a]">{acc.name}</span>
                        <span className="rounded-md bg-[#f1f5f9] px-1.5 py-0.5 text-[10px] font-semibold text-[#475569]">
                          {acc.relation}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#64748b] font-mono mt-0.5">
                        PAN: {acc.pan} {acc.dpClientId ? `• DP: ${acc.dpClientId}` : ''}
                      </p>
                    </div>
                  </div>

                  {/* Status if queried */}
                  <div className="flex items-center space-x-3">
                    {res ? (
                      res.status === 'ALLOTTED' ? (
                        <div className="text-right">
                          <span className="inline-flex items-center space-x-1 rounded-full bg-[#e6faf5] border border-[#b3f0df] px-2.5 py-0.5 text-[11px] font-bold text-[#008767]">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>ALLOTTED ({res.sharesAllotted})</span>
                          </span>
                          <p className="text-[10px] font-bold text-[#008767] mt-0.5">
                            +₹{res.estimatedGain.toLocaleString('en-IN')} Profit
                          </p>
                        </div>
                      ) : (
                        <div className="text-right">
                          <span className="inline-flex items-center space-x-1 rounded-full bg-[#fef2f2] border border-[#fecaca] px-2 py-0.5 text-[10px] font-bold text-[#b91c1c]">
                            <span>Not Allotted</span>
                          </span>
                          <p className="text-[10px] text-[#64748b] mt-0.5">
                            ₹{res.refundAmount.toLocaleString('en-IN')} Refunded
                          </p>
                        </div>
                      )
                    ) : (
                      <span className="text-[11px] text-[#94a3b8]">Ready to Check</span>
                    )}

                    <button
                      onClick={() => handleRemoveAccount(acc.id)}
                      className="p-1 text-[#94a3b8] hover:text-[#b91c1c] transition-colors"
                      title="Remove Account"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3.5 border-t border-[#f1f5f9] flex items-center justify-between text-xs text-[#64748b]">
          <span>Private & Secure • Zero PAN Data Leaves Your Device</span>
          <button
            onClick={onClose}
            className="rounded-xl bg-[#00d09c] hover:bg-[#00b887] px-4 py-2 font-bold text-white shadow-xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
