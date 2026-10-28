'use client';

import React from 'react';
import { TimelineDates } from '../types';
import { Check, Clock, Calendar, ArrowRight } from 'lucide-react';

interface CalendarTimelineProps {
  timeline: TimelineDates;
}

export const CalendarTimeline: React.FC<CalendarTimelineProps> = ({ timeline }) => {
  const steps = [
    {
      key: 'biddingOpen',
      title: 'Bidding Opens',
      date: timeline.biddingOpen,
      desc: 'Issue opens for public subscription',
    },
    {
      key: 'biddingClose',
      title: 'Bidding Closes',
      date: timeline.biddingClose,
      desc: 'Mandate application cutoff (5:00 PM)',
    },
    {
      key: 'allotmentFinalization',
      title: 'Basis of Allotment',
      date: timeline.allotmentFinalization,
      desc: 'Registrar finalizes share allocations',
    },
    {
      key: 'refundsInitiation',
      title: 'Initiation of Refunds',
      date: timeline.refundsInitiation,
      desc: 'Bank unfreezes unallotted UPI funds',
    },
    {
      key: 'dematTransfer',
      title: 'Credit to Demat',
      date: timeline.dematTransfer,
      desc: 'Shares deposited in CDSL / NSDL',
    },
    {
      key: 'listingOnExchange',
      title: 'Listing Date',
      date: timeline.listingOnExchange,
      desc: 'Trading commences on NSE & BSE',
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
    <div className="w-full rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 font-sans">
      <div className="mb-3 flex items-center justify-between border-b border-zinc-800 pb-2.5">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-zinc-400" />
          <span className="text-xs font-semibold tracking-wider text-zinc-200 uppercase">
            Issue Calendar & Settlement Timeline
          </span>
        </div>
        <span className="rounded border border-zinc-700 bg-zinc-900 px-2 py-0.5 font-mono text-[11px] font-medium text-zinc-300">
          Stage: {timeline.currentStage.replace(/_/g, ' ')}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {steps.map((step, idx) => {
          const isDone = idx < currentIdx;
          const isCurrent = idx === currentIdx;

          return (
            <div
              key={step.key}
              className={`relative rounded-lg border p-3 transition-colors ${
                isCurrent
                  ? 'border-emerald-500/50 bg-emerald-950/10'
                  : isDone
                  ? 'border-zinc-800 bg-zinc-900/40'
                  : 'border-zinc-900 bg-zinc-950/40 opacity-75'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                  Step 0{idx + 1}
                </span>
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] ${
                    isDone
                      ? 'bg-emerald-900/40 text-emerald-400'
                      : isCurrent
                      ? 'bg-emerald-500 text-black font-bold'
                      : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {isDone ? <Check className="h-2.5 w-2.5" /> : idx + 1}
                </span>
              </div>

              <div className="mt-1.5">
                <p className="text-xs font-bold text-zinc-100">{step.title}</p>
                <p className="mt-0.5 font-mono text-sm font-semibold text-emerald-400">
                  {step.date}
                </p>
                <p className="mt-1 text-[11px] text-zinc-400 leading-tight">
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
