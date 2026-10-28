'use client';

import React from 'react';
import { IPO } from '../types';
import {
  Calendar,
  BarChart2,
  Calculator,
  TrendingUp,
  FileText,
  Users,
  Download,
  ExternalLink,
  Coins,
} from 'lucide-react';

interface IpoCardProps {
  ipo: IPO;
  onOpenDetails: (ipo: IPO) => void;
  onOpenAiModal: (ipo: IPO) => void;
  onOpenBidCalc: (ipo: IPO) => void;
  onOpenAllotment: (ipo: IPO) => void;
  onOpenDossier?: (ipo: IPO) => void;
  onOpenFamilyAllotment?: (ipo: IPO) => void;
}

export const IpoCard: React.FC<IpoCardProps> = ({
  ipo,
  onOpenDetails,
  onOpenAiModal,
  onOpenBidCalc,
  onOpenAllotment,
  onOpenDossier,
  onOpenFamilyAllotment,
}) => {
  const isGainPositive = ipo.gainPercentage >= 0;
  const minInvestment = ipo.priceBandHigh * ipo.lotSize;

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case 'STRONG_APPLY':
        return 'bg-[#e6faf5] text-[#008767] border-[#b3f0df]';
      case 'APPLY':
        return 'bg-[#eff6ff] text-[#1849a9] border-[#bfdbfe]';
      case 'LISTING_GAINS_ONLY':
        return 'bg-[#fff4ed] text-[#c2410c] border-[#fed7aa]';
      case 'AVOID':
        return 'bg-[#fef2f2] text-[#b91c1c] border-[#fecaca]';
      default:
        return 'bg-[#f1f5f9] text-[#475569] border-[#e2e8f0]';
    }
  };

  const formatApplications = (apps: number) => {
    if (!apps || apps === 0) return '0 Bids';
    if (apps >= 100000) {
      return `${(apps / 100000).toFixed(2)} Lakh`;
    }
    return apps.toLocaleString('en-IN');
  };

  const formatCr = (amount?: number) => {
    if (!amount || amount === 0) return '₹0 Cr';
    if (amount >= 1000) {
      return `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 1 })} Cr`;
    }
    return `₹${amount.toFixed(1)} Cr`;
  };

  return (
    <div className="groww-card groww-card-hover p-5 flex flex-col justify-between">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eff6ff] border border-[#bfdbfe] font-bold text-[#1849a9] text-sm shadow-xs">
              {ipo.symbol.slice(0, 3)}
            </div>
            <div>
              <h3 className="font-bold text-[#0f172a] text-base tracking-tight leading-snug">
                {ipo.companyName}
              </h3>
              <div className="flex items-center space-x-2 mt-1 text-xs">
                <span className="text-[#0f172a] font-bold">{ipo.symbol}</span>
                <span className="text-[#cbd5e1]">•</span>
                <span className="text-[#64748b]">{ipo.marketType}</span>
                <span className="text-[#cbd5e1]">•</span>
                <span className="rounded-full bg-[#f1f5f9] border border-[#e2e8f0] px-2 py-0.5 text-[10px] font-bold text-[#475569]">
                  {ipo.status}
                </span>
              </div>
            </div>
          </div>

          {/* AI Verdict Badge */}
          <button
            onClick={() => onOpenAiModal(ipo)}
            className={`px-2.5 py-1 rounded-full border text-[11px] font-bold shadow-xs transition-all ${getVerdictBadge(
              ipo.aiAnalysis.verdict
            )}`}
          >
            {ipo.aiAnalysis.verdict.replace(/_/g, ' ')}
          </button>
        </div>

        {/* Pricing & GMP Box */}
        <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-[#f8fafc] p-3.5 border border-[#e2e8f0]">
          <div>
            <p className="text-[11px] font-medium text-[#64748b]">
              Price Band
            </p>
            <p className="text-base font-bold text-[#0f172a] mt-0.5">
              ₹{ipo.priceBandLow} - ₹{ipo.priceBandHigh}
            </p>
            <p className="text-[11px] text-[#64748b] mt-1">
              Lot: {ipo.lotSize} shares (₹{minInvestment.toLocaleString('en-IN')})
            </p>
          </div>

          <div className="text-right">
            <p className="text-[11px] font-medium text-[#64748b]">
              Est. Listing Gain (GMP)
            </p>
            <p
              className={`text-base font-bold mt-0.5 ${
                isGainPositive ? 'text-[#008767]' : 'text-[#b91c1c]'
              }`}
            >
              {ipo.currentGmp >= 0 ? `+₹${ipo.currentGmp}` : `-₹${Math.abs(ipo.currentGmp)}`} ({ipo.gainPercentage > 0 ? '+' : ''}
              {ipo.gainPercentage}%)
            </p>
            <p className="text-[11px] text-[#64748b] mt-1">
              Est. Price: <span className="text-[#0f172a] font-bold">₹{ipo.estimatedListingPrice}</span>
            </p>
          </div>
        </div>

        {/* Key Calendar Settlement Dates Grid */}
        <div className="mt-3.5 rounded-xl border border-[#e2e8f0] bg-white p-3 text-xs shadow-xs">
          <div className="flex items-center space-x-1.5 text-[#008767] text-[11px] font-bold uppercase tracking-wider mb-2.5">
            <Calendar className="h-3.5 w-3.5 text-[#00d09c]" />
            <span>Key Settlement Schedule</span>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#64748b]">Bidding Closes:</span>
              <strong className="text-[#0f172a] font-semibold">{ipo.timeline.biddingClose}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748b]">Allotment Date:</span>
              <strong className="text-[#0f172a] font-semibold">{ipo.timeline.allotmentFinalization}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748b]">Refunds Initiate:</span>
              <strong className="text-[#0f172a] font-semibold">{ipo.timeline.refundsInitiation}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748b]">Demat Credit:</span>
              <strong className="text-[#0f172a] font-semibold">{ipo.timeline.dematTransfer}</strong>
            </div>
            <div className="flex justify-between col-span-2 pt-1.5 border-t border-[#f1f5f9]">
              <span className="text-[#008767] font-bold">Trading Listing Date:</span>
              <strong className="text-[#008767] font-bold">{ipo.timeline.listingOnExchange}</strong>
            </div>
          </div>
        </div>

        {/* Subscription Demand: Value (₹ Cr) & Applications Count (Retail Focus) */}
        <div className="mt-3.5 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-3 text-xs shadow-xs">
          <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-2 mb-2">
            <div className="flex items-center space-x-1.5">
              <Coins className="h-3.5 w-3.5 text-[#008767]" />
              <span className="font-bold text-[#0f172a] text-[11px] uppercase tracking-wide">
                Subscription & Demand
              </span>
            </div>
            <span className="text-[10px] text-[#64748b] font-medium">
              {ipo.subscription.updatedAt}
            </span>
          </div>

          {/* High-level summary metrics */}
          <div className="grid grid-cols-3 gap-2 bg-white rounded-lg p-2 border border-[#e2e8f0] mb-2.5 text-center">
            <div>
              <span className="text-[10px] text-[#64748b] block font-medium">Total Multiplier</span>
              <span className="text-xs font-bold text-[#0f172a]">{ipo.subscription.total}x</span>
            </div>
            <div className="border-x border-[#f1f5f9]">
              <span className="text-[10px] text-[#64748b] block font-medium">Total Bid Value</span>
              <span className="text-xs font-bold text-[#008767]">
                {ipo.subscription.totalAmountBidCr > 0
                  ? formatCr(ipo.subscription.totalAmountBidCr)
                  : 'Pending'}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#64748b] block font-medium">Applications</span>
              <span className="text-xs font-bold text-[#0284c7]">
                {ipo.subscription.totalApplications > 0
                  ? formatApplications(ipo.subscription.totalApplications)
                  : '0 Bids'}
              </span>
            </div>
          </div>

          {/* Tranche Breakdown: QIB, NII, Retail */}
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between text-[#0f172a]">
              <span className="text-[#64748b] flex items-center space-x-1">
                <span>Retail (RII):</span>
              </span>
              <div className="flex items-center space-x-2 font-semibold">
                <span className="text-[#008767] font-bold">{ipo.subscription.retail}x</span>
                <span className="text-[#cbd5e1]">•</span>
                <span className="text-[#0284c7]">
                  {ipo.subscription.retailApplications
                    ? `${formatApplications(ipo.subscription.retailApplications)} bids`
                    : '-'}
                </span>
                <span className="text-[#cbd5e1]">•</span>
                <span className="text-[#475569]">
                  {ipo.subscription.retailAmountBidCr
                    ? formatCr(ipo.subscription.retailAmountBidCr)
                    : '-'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[#0f172a]">
              <span className="text-[#64748b]">NII / HNI:</span>
              <div className="flex items-center space-x-2 font-semibold">
                <span className="text-[#0f172a] font-bold">{ipo.subscription.nii}x</span>
                <span className="text-[#cbd5e1]">•</span>
                <span className="text-[#475569]">
                  {ipo.subscription.niiAmountBidCr ? formatCr(ipo.subscription.niiAmountBidCr) : '-'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[#0f172a]">
              <span className="text-[#64748b]">QIB (Institutions):</span>
              <div className="flex items-center space-x-2 font-semibold">
                <span className="text-[#0f172a] font-bold">{ipo.subscription.qib}x</span>
                <span className="text-[#cbd5e1]">•</span>
                <span className="text-[#475569]">
                  {ipo.subscription.qibAmountBidCr ? formatCr(ipo.subscription.qibAmountBidCr) : '-'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Statutory SEBI Filings (DRHP & RHP for QIB / Institutional Investors) */}
        <div className="mt-3 rounded-xl border border-[#bae6fd] bg-[#f0f9ff]/70 p-2.5 text-xs flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-[#0369a1]">
            <FileText className="h-4 w-4 shrink-0" />
            <span className="font-bold text-[11px]">Official Filings:</span>
          </div>

          <div className="flex items-center space-x-2">
            {ipo.documents?.drhpUrl ? (
              <a
                href={ipo.documents.drhpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white border border-[#bae6fd] text-[10px] font-bold text-[#0284c7] hover:bg-[#e0f2fe] shadow-xs transition-colors"
                title="Download / View SEBI Draft Red Herring Prospectus (DRHP PDF)"
              >
                <span>DRHP</span>
                <span className="text-[9px] bg-[#0284c7] text-white px-1 py-0.2 rounded font-mono">PDF</span>
                <ExternalLink className="h-2.5 w-2.5 ml-0.5 opacity-70" />
              </a>
            ) : null}

            {ipo.documents?.rhpUrl ? (
              <a
                href={ipo.documents.rhpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white border border-[#bfdbfe] text-[10px] font-bold text-[#1849a9] hover:bg-[#dbeafe] shadow-xs transition-colors"
                title="Download / View SEBI Red Herring Prospectus (RHP PDF)"
              >
                <span>RHP</span>
                <span className="text-[9px] bg-[#1849a9] text-white px-1 py-0.2 rounded font-mono">PDF</span>
                <ExternalLink className="h-2.5 w-2.5 ml-0.5 opacity-70" />
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-3.5 border-t border-[#f1f5f9] space-y-2 text-xs">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onOpenDetails(ipo)}
            className="flex-1 flex items-center justify-center space-x-1.5 rounded-xl bg-[#00d09c] hover:bg-[#00b887] py-2 font-bold text-white transition-all shadow-xs"
          >
            <BarChart2 className="h-4 w-4" />
            <span>Timeline & Allotment</span>
          </button>

          {onOpenDossier && (
            <button
              onClick={() => onOpenDossier(ipo)}
              className="flex-1 flex items-center justify-center space-x-1.5 rounded-xl border border-[#bae6fd] bg-[#f0f9ff] hover:bg-[#e0f2fe] py-2 font-bold text-[#0284c7] transition-all shadow-xs"
              title="View SEBI Filings, Balance Sheets, and Anchor Investor Book"
            >
              <FileText className="h-4 w-4 text-[#0284c7]" />
              <span>Full Dossier</span>
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onOpenBidCalc(ipo)}
            className="flex-1 flex items-center justify-center space-x-1.5 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] hover:bg-[#f1f5f9] py-1.5 font-semibold text-[#0f172a] transition-all"
          >
            <Calculator className="h-3.5 w-3.5 text-[#64748b]" />
            <span>Bid Calculator</span>
          </button>

          {onOpenFamilyAllotment && (
            <button
              onClick={() => onOpenFamilyAllotment(ipo)}
              className="flex-1 flex items-center justify-center space-x-1.5 rounded-xl border border-[#b3f0df] bg-[#e6faf5] hover:bg-[#cbf5eb] py-1.5 font-bold text-[#008767] transition-all"
              title="One-click family PAN allotment verification"
            >
              <Users className="h-3.5 w-3.5 text-[#00d09c]" />
              <span>Family Check</span>
            </button>
          )}

          <button
            onClick={() => onOpenAiModal(ipo)}
            className="p-2 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-all"
            title="Institutional Financial & Valuation Verdict"
          >
            <TrendingUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
