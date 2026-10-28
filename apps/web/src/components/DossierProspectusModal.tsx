'use client';

import React, { useState } from 'react';
import { IPO } from '../types';
import {
  X,
  FileText,
  Download,
  Building2,
  TrendingUp,
  BarChart3,
  Users2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface DossierProspectusModalProps {
  ipo: IPO | null;
  onClose: () => void;
}

export const DossierProspectusModal: React.FC<DossierProspectusModalProps> = ({
  ipo,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'DOCUMENTS' | 'FINANCIALS' | 'ANCHORS' | 'SUBSCRIPTION'>('DOCUMENTS');

  if (!ipo) return null;

  const { documents, financialHistory, anchorInvestors, promoterHolding, subscriptionDayWise } = ipo;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-2xl text-[#0f172a]">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#f1f5f9] pb-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6faf5] border border-[#b3f0df] text-[#008767]">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-[#0f172a] tracking-tight">
                  {ipo.companyName}
                </h2>
                <span className="rounded-md bg-[#f1f5f9] border border-[#e2e8f0] px-2 py-0.5 text-xs font-bold text-[#0f172a]">
                  {ipo.symbol}
                </span>
                <span className="rounded-full bg-[#eff6ff] border border-[#bfdbfe] px-2 py-0.5 text-[10px] font-bold text-[#1849a9]">
                  SEBI Filings & Balance Sheet
                </span>
              </div>
              <p className="text-xs text-[#64748b]">
                Official SEBI DRHP/RHP Prospectus, Audited Financials & Anchor Book
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

        {/* Tab Switcher (Groww / Angel One style) */}
        <div className="mt-4 flex items-center space-x-1 border-b border-[#f1f5f9] pb-2 text-xs overflow-x-auto">
          {[
            { id: 'DOCUMENTS', label: 'SEBI Prospectus Files', icon: FileText },
            { id: 'FINANCIALS', label: '3-Year Audited P&L', icon: BarChart3 },
            { id: 'ANCHORS', label: 'Anchor Investors & Promoters', icon: Users2 },
            { id: 'SUBSCRIPTION', label: 'Day-Wise Subscription Demand', icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 font-bold transition-all ${
                  isActive
                    ? 'bg-[#00d09c] text-white shadow-xs'
                    : 'text-[#64748b] hover:text-[#0f172a] hover:bg-[#f8fafc]'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: SEBI Documents (DRHP & RHP) */}
        {activeTab === 'DOCUMENTS' && (
          <div className="mt-4 space-y-3 text-xs">
            <span className="font-bold text-[#0f172a] text-xs block">
              Official Regulatory Prospectus Filings (SEBI & Exchanges)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* DRHP Card */}
              <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-[#eff6ff] text-[#1849a9] font-bold px-2 py-0.5 text-[10px] border border-[#bfdbfe]">
                      SEBI DRHP
                    </span>
                    <span className="text-[11px] text-[#64748b]">Preliminary Filing</span>
                  </div>
                  <h4 className="font-bold text-[#0f172a] text-sm mt-2">
                    Draft Red Herring Prospectus (DRHP)
                  </h4>
                  <p className="text-[11px] text-[#64748b] mt-1">
                    Initial business overview, promoter background, and proposed capital structure submitted to SEBI.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#e2e8f0] flex items-center justify-between">
                  <span className="text-[10px] text-[#94a3b8]">Format: PDF (SEBI.gov.in)</span>
                  <a
                    href={documents?.drhpUrl || 'https://www.sebi.gov.in/filings/public-issues.html'}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1 rounded-lg bg-white border border-[#e2e8f0] hover:border-[#00d09c] px-2.5 py-1 text-[11px] font-bold text-[#008767] shadow-xs"
                  >
                    <span>View DRHP</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {/* RHP Card */}
              <div className="rounded-xl border border-[#b3f0df] bg-[#e6faf5]/30 p-4 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-[#e6faf5] text-[#008767] font-bold px-2 py-0.5 text-[10px] border border-[#b3f0df]">
                      Official RHP
                    </span>
                    <span className="text-[11px] text-[#008767] font-bold">Final Price Band</span>
                  </div>
                  <h4 className="font-bold text-[#0f172a] text-sm mt-2">
                    Red Herring Prospectus (RHP)
                  </h4>
                  <p className="text-[11px] text-[#64748b] mt-1">
                    Complete verified prospectus including finalized price band ₹{ipo.priceBandLow}-₹{ipo.priceBandHigh}, lot size, risk factors, and audited financial statements.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#b3f0df] flex items-center justify-between">
                  <span className="text-[10px] text-[#008767] font-semibold">ROC & NSE/BSE Approved</span>
                  <a
                    href={documents?.rhpUrl || 'https://www.sebi.gov.in/filings/public-issues.html'}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1 rounded-lg bg-[#00d09c] hover:bg-[#00b887] px-3 py-1 text-[11px] font-bold text-white shadow-xs"
                  >
                    <span>View RHP</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {/* Anchor Investor Allotment Document */}
              <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-[#f1f5f9] text-[#475569] font-bold px-2 py-0.5 text-[10px] border border-[#e2e8f0]">
                      BSE / NSE Notice
                    </span>
                    <span className="text-[11px] text-[#64748b]">Institutional Book</span>
                  </div>
                  <h4 className="font-bold text-[#0f172a] text-sm mt-2">
                    Anchor Investor Allocation Sheet
                  </h4>
                  <p className="text-[11px] text-[#64748b] mt-1">
                    Complete list of institutional mutual funds, FIIs, and sovereign wealth funds allocated shares ahead of public issue opening.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#e2e8f0] flex items-center justify-between">
                  <span className="text-[10px] text-[#94a3b8]">Exchange Disclosure</span>
                  <a
                    href={documents?.anchorBookUrl || 'https://www.bseindia.com'}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1 rounded-lg bg-white border border-[#e2e8f0] hover:border-[#1849a9] px-2.5 py-1 text-[11px] font-bold text-[#1849a9] shadow-xs"
                  >
                    <span>Anchor Notice</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {/* Registrar Allotment Status Page */}
              <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-[#f1f5f9] text-[#475569] font-bold px-2 py-0.5 text-[10px] border border-[#e2e8f0]">
                      Registrar Portal
                    </span>
                    <span className="text-[11px] text-[#64748b]">{ipo.registrarName}</span>
                  </div>
                  <h4 className="font-bold text-[#0f172a] text-sm mt-2">
                    Basis of Allotment Document
                  </h4>
                  <p className="text-[11px] text-[#64748b] mt-1">
                    Official newspaper advertisement and mathematical lottery allotment ratio across retail and non-institutional categories.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#e2e8f0] flex items-center justify-between">
                  <span className="text-[10px] text-[#94a3b8]">SEBI Designated Registrar</span>
                  <a
                    href={ipo.registrarUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1 rounded-lg bg-white border border-[#e2e8f0] hover:border-[#0f172a] px-2.5 py-1 text-[11px] font-bold text-[#0f172a] shadow-xs"
                  >
                    <span>Registrar Link</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: 3-Year Audited Financials */}
        {activeTab === 'FINANCIALS' && (
          <div className="mt-4 space-y-4 text-xs">
            <span className="font-bold text-[#0f172a] text-xs block">
              Audited Financial Track Record (Last 3 Fiscal Years as per RHP)
            </span>

            {financialHistory && financialHistory.length > 0 ? (
              <div className="overflow-x-auto rounded-xl border border-[#e2e8f0] shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#64748b] font-bold">
                    <tr>
                      <th className="py-2.5 px-3.5">Financial Metric</th>
                      {financialHistory.map((f) => (
                        <th key={f.fiscalYear} className="py-2.5 px-3.5 text-right font-extrabold text-[#0f172a]">
                          {f.fiscalYear}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f5f9]">
                    <tr>
                      <td className="py-2 px-3.5 font-bold text-[#0f172a]">Revenue from Operations</td>
                      {financialHistory.map((f) => (
                        <td key={f.fiscalYear} className="py-2 px-3.5 text-right font-semibold text-[#0f172a]">
                          ₹{f.revenueCr.toLocaleString('en-IN')} Cr
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2 px-3.5 text-[#64748b]">Operating EBITDA</td>
                      {financialHistory.map((f) => (
                        <td key={f.fiscalYear} className="py-2 px-3.5 text-right font-medium text-[#334155]">
                          ₹{f.ebitdaCr.toLocaleString('en-IN')} Cr
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-[#e6faf5]/30">
                      <td className="py-2 px-3.5 font-bold text-[#008767]">Net Profit After Tax (PAT)</td>
                      {financialHistory.map((f) => (
                        <td key={f.fiscalYear} className={`py-2 px-3.5 text-right font-bold ${f.patCr >= 0 ? 'text-[#008767]' : 'text-[#b91c1c]'}`}>
                          ₹{f.patCr.toLocaleString('en-IN')} Cr
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2 px-3.5 text-[#64748b]">Net Worth / Total Equity</td>
                      {financialHistory.map((f) => (
                        <td key={f.fiscalYear} className="py-2 px-3.5 text-right font-medium text-[#334155]">
                          ₹{f.netWorthCr.toLocaleString('en-IN')} Cr
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2 px-3.5 text-[#64748b]">Diluted EPS (₹)</td>
                      {financialHistory.map((f) => (
                        <td key={f.fiscalYear} className="py-2 px-3.5 text-right font-semibold text-[#0f172a]">
                          ₹{f.eps}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2 px-3.5 text-[#64748b]">Return on Net Worth (RoNW %)</td>
                      {financialHistory.map((f) => (
                        <td key={f.fiscalYear} className={`py-2 px-3.5 text-right font-bold ${f.ronwPercent >= 0 ? 'text-[#008767]' : 'text-[#b91c1c]'}`}>
                          {f.ronwPercent}%
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-[#64748b]">No multi-year financial statements filed for this issue.</p>
            )}

            {/* Valuation Metric Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-3 text-center">
                <span className="text-[10px] text-[#64748b] block font-semibold">IPO P/E Ratio</span>
                <p className="text-base font-bold text-[#0f172a] mt-0.5">{ipo.aiAnalysis.peRatio ? `${ipo.aiAnalysis.peRatio}x` : 'N/A'}</p>
              </div>
              <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-3 text-center">
                <span className="text-[10px] text-[#64748b] block font-semibold">Industry Peer P/E</span>
                <p className="text-base font-bold text-[#0f172a] mt-0.5">{ipo.aiAnalysis.industryPe ? `${ipo.aiAnalysis.industryPe}x` : 'N/A'}</p>
              </div>
              <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-3 text-center">
                <span className="text-[10px] text-[#64748b] block font-semibold">Fresh Issue Portion</span>
                <p className="text-base font-bold text-[#008767] mt-0.5">₹{ipo.freshIssueCr.toLocaleString('en-IN')} Cr</p>
              </div>
              <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-3 text-center">
                <span className="text-[10px] text-[#64748b] block font-semibold">OFS Portion</span>
                <p className="text-base font-bold text-[#c2410c] mt-0.5">₹{ipo.ofsCr.toLocaleString('en-IN')} Cr</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Anchor Investors & Promoters */}
        {activeTab === 'ANCHORS' && (
          <div className="mt-4 space-y-4 text-xs">
            {/* Promoter Holding */}
            {promoterHolding && (
              <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4 shadow-xs">
                <span className="font-bold text-[#0f172a] text-xs block mb-2">
                  Promoter Shareholding & Management Backing
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-white rounded-lg p-3 border border-[#e2e8f0]">
                    <span className="text-[11px] text-[#64748b]">Pre-Issue Holding</span>
                    <p className="text-base font-bold text-[#0f172a] mt-0.5">{promoterHolding.preIssuePercent}%</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-[#e2e8f0]">
                    <span className="text-[11px] text-[#64748b]">Post-Issue Holding</span>
                    <p className="text-base font-bold text-[#008767] mt-0.5">{promoterHolding.postIssuePercent}%</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-[#e2e8f0] col-span-2 sm:col-span-1">
                    <span className="text-[11px] text-[#64748b]">Dilution</span>
                    <p className="text-base font-bold text-[#1849a9] mt-0.5">
                      {(promoterHolding.preIssuePercent - promoterHolding.postIssuePercent).toFixed(2)}%
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#e2e8f0]">
                  <span className="text-[11px] text-[#64748b] font-semibold block">Key Promoters:</span>
                  <p className="text-xs font-bold text-[#0f172a] mt-0.5">
                    {promoterHolding.promoterNames.join(', ')}
                  </p>
                  <span className="text-[11px] text-[#64748b] font-semibold block mt-2">Lead Managers (BRLMs):</span>
                  <p className="text-xs text-[#334155] mt-0.5">
                    {promoterHolding.leadManagers.join(' • ')}
                  </p>
                </div>
              </div>
            )}

            {/* Anchor Book Table */}
            <div>
              <span className="font-bold text-[#0f172a] text-xs block mb-2">
                Marquee Anchor Investors Allotted Before Public Issue
              </span>

              {anchorInvestors && anchorInvestors.length > 0 ? (
                <div className="overflow-hidden rounded-xl border border-[#e2e8f0]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#64748b]">
                      <tr>
                        <th className="py-2 px-3">Anchor Fund Name</th>
                        <th className="py-2 px-3">Fund Category</th>
                        <th className="py-2 px-3 text-right">Shares Allocated</th>
                        <th className="py-2 px-3 text-right">Amount (₹ Cr)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f1f5f9]">
                      {anchorInvestors.map((a, idx) => (
                        <tr key={idx} className="hover:bg-[#f8fafc]">
                          <td className="py-2 px-3 font-bold text-[#0f172a]">{a.name}</td>
                          <td className="py-2 px-3">
                            <span className="rounded-md bg-[#f1f5f9] px-2 py-0.5 text-[10px] font-semibold text-[#475569]">
                              {a.fundType}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-right font-medium text-[#334155]">
                            {a.sharesAllocated.toLocaleString('en-IN')}
                          </td>
                          <td className="py-2 px-3 text-right font-bold text-[#008767]">
                            ₹{a.amountCr.toLocaleString('en-IN')} Cr
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-xs text-[#64748b]">Anchor investor allotment details not yet published.</p>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Day-Wise Subscription Demand */}
        {activeTab === 'SUBSCRIPTION' && (
          <div className="mt-4 space-y-4 text-xs">
            <span className="font-bold text-[#0f172a] text-xs block">
              Day-by-Day Bidding Momentum across Categories (Times Subscribed)
            </span>

            {subscriptionDayWise && subscriptionDayWise.length > 0 ? (
              <div className="overflow-hidden rounded-xl border border-[#e2e8f0]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[#64748b]">
                    <tr>
                      <th className="py-2.5 px-3">Day / Date</th>
                      <th className="py-2.5 px-3 text-right">QIB</th>
                      <th className="py-2.5 px-3 text-right">sHNI (₹2L-10L)</th>
                      <th className="py-2.5 px-3 text-right">bHNI (&gt;₹10L)</th>
                      <th className="py-2.5 px-3 text-right">Retail (RII)</th>
                      <th className="py-2.5 px-3 text-right font-bold text-[#0f172a]">Total Times</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f5f9]">
                    {subscriptionDayWise.map((d) => (
                      <tr key={d.dayNumber} className="hover:bg-[#f8fafc]">
                        <td className="py-2.5 px-3 font-bold text-[#0f172a]">
                          Day {d.dayNumber} ({d.date})
                        </td>
                        <td className="py-2.5 px-3 text-right font-medium text-[#334155]">{d.qibTimes}x</td>
                        <td className="py-2.5 px-3 text-right font-medium text-[#334155]">{d.sHniTimes}x</td>
                        <td className="py-2.5 px-3 text-right font-medium text-[#334155]">{d.bHniTimes}x</td>
                        <td className="py-2.5 px-3 text-right font-bold text-[#008767]">{d.retailTimes}x</td>
                        <td className="py-2.5 px-3 text-right font-extrabold text-[#0f172a] bg-[#f8fafc]">
                          {d.totalTimes}x
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-[#64748b]">Day-wise subscription progression data is being calculated.</p>
            )}

            {/* Current Total Subscription Demand Box */}
            <div className="rounded-xl border border-[#b3f0df] bg-[#e6faf5] p-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#008767] uppercase">Final Overall Oversubscription</span>
                <p className="text-xl font-extrabold text-[#008767] mt-0.5">
                  {ipo.subscription.total}x Times Total Issue
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-[#64748b]">Retail Portion Demand</span>
                <p className="text-base font-bold text-[#0f172a]">{ipo.subscription.retail}x Over-demanded</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 pt-3.5 border-t border-[#f1f5f9] flex items-center justify-between text-xs text-[#64748b]">
          <span>Source: Official Stock Exchange & SEBI Filings</span>
          <button
            onClick={onClose}
            className="rounded-xl bg-[#00d09c] hover:bg-[#00b887] px-4 py-2 font-bold text-white shadow-xs transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
