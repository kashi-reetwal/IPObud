'use client';

import React, { useState } from 'react';
import { GmpPoint, PastPerformanceResult } from '../types';
import { TrendingUp, BarChart2, Info } from 'lucide-react';

interface GmpHistoryChartProps {
  data: GmpPoint[];
  symbol: string;
  issuePrice: number;
  pastResults?: PastPerformanceResult;
}

export const GmpHistoryChart: React.FC<GmpHistoryChartProps> = ({
  data,
  symbol,
  issuePrice,
  pastResults,
}) => {
  const [metric, setMetric] = useState<'GMP' | 'PERCENT' | 'PRICE'>('GMP');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-6 text-center text-xs text-zinc-500">
        No past trend records logged for this issue.
      </div>
    );
  }

  // Values based on selected metric
  const values = data.map((d) => {
    if (metric === 'PERCENT') return d.gainPercent;
    if (metric === 'PRICE') return d.estListingPrice;
    return d.gmp;
  });

  const minVal = Math.min(...values, 0);
  const maxVal = Math.max(...values, 10);
  const range = maxVal - minVal || 1;

  // Chart dimensions
  const svgWidth = 600;
  const svgHeight = 220;
  const paddingX = 45;
  const paddingTop = 25;
  const paddingBottom = 35;
  const plotWidth = svgWidth - paddingX * 2;
  const plotHeight = svgHeight - paddingTop - paddingBottom;

  const points = data.map((d, i) => {
    const val =
      metric === 'PERCENT'
        ? d.gainPercent
        : metric === 'PRICE'
        ? d.estListingPrice
        : d.gmp;
    const x = paddingX + (i / (data.length - 1 || 1)) * plotWidth;
    const y = paddingTop + plotHeight - ((val - minVal) / range) * plotHeight;
    return { x, y, point: d, val };
  });

  const pathD = points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${
    paddingTop + plotHeight
  } L ${points[0].x} ${paddingTop + plotHeight} Z`;

  const activePoint = hoveredIdx !== null ? points[hoveredIdx] : points[points.length - 1];

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 font-sans">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-zinc-800 pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs font-bold tracking-wider text-zinc-200 uppercase">
              {symbol} Premium Trend & Past Performance
            </span>
            <span className="rounded border border-zinc-700 bg-zinc-900 px-1.5 py-0.2 text-[10px] font-mono text-zinc-400">
              Cutoff INR {issuePrice}
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            Historical grey market premium consensus leading to listing day
          </p>
        </div>

        {/* Metric Selector Tabs */}
        <div className="flex items-center space-x-1 rounded-lg border border-zinc-800 bg-zinc-900/60 p-1">
          {[
            { id: 'GMP', label: 'GMP (INR)' },
            { id: 'PERCENT', label: 'Gain (%)' },
            { id: 'PRICE', label: 'Est. Listing' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setMetric(tab.id as any);
                setHoveredIdx(null);
              }}
              className={`rounded px-2.5 py-1 text-[11px] font-mono font-medium transition-colors ${
                metric === tab.id
                  ? 'bg-zinc-800 text-white font-semibold'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Metric Callout */}
      <div className="my-3 flex items-baseline justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
            {hoveredIdx !== null ? `Recorded on ${activePoint.point.date}` : 'Latest Value'}
          </span>
          <div className="flex items-baseline space-x-2 mt-0.5">
            <span className="font-mono text-xl font-bold text-white">
              {metric === 'PERCENT'
                ? `${activePoint.val > 0 ? '+' : ''}${activePoint.val.toFixed(2)}%`
                : `INR ${activePoint.val.toLocaleString('en-IN')}`}
            </span>
            <span className="font-mono text-xs text-emerald-400">
              ({activePoint.point.gainPercent > 0 ? '+' : ''}
              {activePoint.point.gainPercent}% gain)
            </span>
          </div>
        </div>

        <div className="text-right text-[11px] font-mono text-zinc-400">
          <span>Est. Listing: </span>
          <strong className="text-zinc-200 font-bold">
            INR {activePoint.point.estListingPrice}
          </strong>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`grad-${symbol}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const y = paddingTop + plotHeight * pct;
            const refVal = maxVal - pct * range;
            return (
              <g key={idx}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={svgWidth - paddingX}
                  y2={y}
                  stroke="#27272a"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 8}
                  y={y + 3}
                  textAnchor="end"
                  fill="#71717a"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  {metric === 'PERCENT' ? `${refVal.toFixed(0)}%` : refVal.toFixed(0)}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaD} fill={`url(#grad-${symbol})`} />

          {/* Line Stroke */}
          <path
            d={pathD}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {points.map((pt, i) => (
            <g
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              className="cursor-pointer"
            >
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredIdx === i ? 5 : 3}
                fill={hoveredIdx === i ? '#ffffff' : '#10b981'}
                stroke="#090a0f"
                strokeWidth="2"
              />
              {/* X Axis Date labels */}
              <text
                x={pt.x}
                y={svgHeight - 10}
                textAnchor="middle"
                fill={hoveredIdx === i ? '#ffffff' : '#71717a'}
                fontSize="9"
                fontFamily="monospace"
              >
                {pt.point.date}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Past Results Section (if already listed) */}
      {pastResults && (
        <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 text-xs font-mono">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
            <span className="text-[10px] font-bold text-zinc-300 uppercase">
              Actual Listing Day Performance
            </span>
            <span className="text-[10px] text-zinc-400">Exchange Result: NSE/BSE</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2.5">
            <div>
              <span className="text-[10px] text-zinc-500">Issue Price</span>
              <p className="font-bold text-zinc-200">INR {pastResults.issuePrice}</p>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500">Listing Price</span>
              <p className="font-bold text-emerald-400">INR {pastResults.listingPrice}</p>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500">Listing Gain</span>
              <p className={`font-bold ${pastResults.listingGainPercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {pastResults.listingGainPercent >= 0 ? '+' : ''}
                {pastResults.listingGainPercent}%
              </p>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500">Retail Allocation Ratio</span>
              <p className="font-bold text-zinc-300">{pastResults.allotmentRatioRetail}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
