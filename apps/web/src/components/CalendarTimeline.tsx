'use client';

import React from 'react';
import { TimelineDates } from '../types';
import { Check, Calendar } from 'lucide-react';

interface CalendarTimelineProps {
  timeline: TimelineDates;
}

export const CalendarTimeline: React.FC<CalendarTimelineProps> = ({ timeline }) => {
  const steps = [
    {
      key: 'biddingOpen',
      title: 'Bidding Opens',
      date: timeline.biddingOpen,
      desc: 'Issue opens for public bids',
    },
    {
      key: 'biddingClose',
      title: 'Bidding Closes',
      date: timeline.biddingClose,
      desc: 'Cutoff at 5:00 PM',
    },
    {
      key: 'allotmentFinalization',
      title: 'Basis of Allotment',
      date: timeline.allotmentFinalization,
      desc: 'Registrar allocates shares',
    },
    {
      key: 'refundsInitiation',
      title: 'Initiation of Refunds',
      date: timeline.refundsInitiation,
      desc: 'UPI blocked funds released',
    },
    {
      key: 'dematTransfer',
      title: 'Credit to Demat',
      date: timeline.dematTransfer,
      desc: 'Shares deposited in Demat',
    },
    {
      key: 'listingOnExchange',
      title: 'Listing Date',
      date: timeline.listingOnExchange,
      desc: 'Trading begins on NSE & BSE',
    },
  ];

  const getStageIndex = (stage: string) => {
    switch (stage) {
      case 'UPCOMING':
        return 0;
      case 'BIDDING_OPEN':
        return 1;
      case 'BIDDING_CLOSED':
        return 2;
      case 'ALLOTMENT_OUT':
        return 3;
      case 'REFUNDS_INITIATED':
        return 4;
      case 'DEMAT_CREDITED':
        return 5;
      case 'LISTED':
        return 6;
      default:
        return 1;
    }
  };

  const currentIdx = getStageIndex(timeline.currentStage);

  return (
    <div className="w-full rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-xs">
      <div className="mb-4 flex items-center justify-between border-b border-[#f1f5f9] pb-3">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-[#00d09c]" />
          <span className="text-xs font-bold tracking-wide text-[#0f172a] uppercase">
            IPO Settlement Calendar & Dates
          </span>
        </div>
        <span className="rounded-full bg-[#e6faf5] border border-[#b3f0df] px-3 py-1 text-[11px] font-bold text-[#008767]">
          {timeline.currentStage.replace(/_/g, ' ')}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {steps.map((step, idx) => {
          const isDone = idx < currentIdx;
          const isCurrent = idx === currentIdx;

          return (
            <div
              key={step.key}
              className={`rounded-xl border p-3.5 transition-all ${
                isCurrent
                  ? 'border-[#00d09c] bg-white shadow-xs ring-2 ring-[#00d09c]/15'
                  : isDone
                  ? 'border-[#b3f0df] bg-[#e6faf5]/30'
                  : 'border-[#e2e8f0] bg-[#f8fafc]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-bold ${isCurrent ? 'text-[#008767]' : isDone ? 'text-[#008767]' : 'text-[#64748b]'}`}>
                  Milestone {idx + 1}
                </span>
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                    isDone
                      ? 'bg-[#00d09c] text-white shadow-xs'
                      : isCurrent
                      ? 'bg-[#00d09c] text-white font-bold ring-2 ring-[#00d09c]/30 animate-pulse'
                      : 'bg-[#e2e8f0] text-[#64748b]'
                  }`}
                >
                  {isDone ? <Check className="h-3 w-3 stroke-[3]" /> : idx + 1}
                </span>
              </div>

              <div className="mt-2">
                <p className="text-xs font-semibold text-[#64748b]">{step.title}</p>
                <p className="mt-0.5 text-sm font-bold text-[#0f172a]">
                  {step.date}
                </p>
                <p className="mt-1 text-[11px] text-[#64748b] leading-snug">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
