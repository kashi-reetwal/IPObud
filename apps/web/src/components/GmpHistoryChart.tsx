'use client';

import React, { useState } from 'react';
import { GmpPoint, PastPerformanceResult } from '../types';
import { TrendingUp, BarChart2 } from 'lucide-react';

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
      <div className="rounded-2xl border border-[#20273a] bg-[#161b2a] p-6 text-center text-xs text-[#8f98a8]">
        No trend data available for this issue.
      </div>
    );
  }

  const values = data.map((d) => {
    if (metric === 'PERCENT') return d.gainPercent;
    if (metric === 'PRICE') return d.estListingPrice;
    return d.gmp;
  });

  const minVal = Math.min(...values, 0);
  const maxVal = Math.max(...values, 10);
  const range = maxVal - minVal || 1;

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
    <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5 shadow-xs">
      {/* Top Header & Metric Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#f1f5f9] pb-3.5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-bold text-[#0f172a]">
              {symbol} GMP Historical Trend & Listing Gains
            </span>
            <span className="rounded-md bg-[#f1f5f9] border border-[#e2e8f0] px-2 py-0.5 text-[11px] font-semibold text-[#475569]">
              Issue Price: ₹{issuePrice}
            </span>
          </div>
          <p className="text-xs text-[#64748b] mt-0.5">
            Daily grey market premium momentum leading to listing
          </p>
        </div>

        {/* Metric Selector Tabs */}
        <div className="flex items-center space-x-1 rounded-xl bg-[#f8fafc] p-1 border border-[#e2e8f0]">
          {[
            { id: 'GMP', label: 'GMP (₹)' },
            { id: 'PERCENT', label: 'Gain (%)' },
            { id: 'PRICE', label: 'Est. Price' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setMetric(tab.id as any);
                setHoveredIdx(null);
              }}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                metric === tab.id
                  ? 'bg-[#00d09c] text-white shadow-xs font-bold'
                  : 'text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Reading Callout */}
      <div className="my-3 flex items-baseline justify-between">
        <div>
          <span className="text-xs font-medium text-[#64748b]">
            {hoveredIdx !== null ? `Date: ${activePoint.point.date}` : 'Latest Recorded Premium'}
          </span>
          <div className="flex items-baseline space-x-2 mt-0.5">
            <span className="text-2xl font-bold text-[#0f172a]">
              {metric === 'PERCENT'
                ? `${activePoint.val > 0 ? '+' : ''}${activePoint.val.toFixed(2)}%`
                : `₹${activePoint.val.toLocaleString('en-IN')}`}
            </span>
            <span className="rounded-full bg-[#e6faf5] border border-[#b3f0df] px-2 py-0.5 text-xs font-bold text-[#008767]">
              {activePoint.point.gainPercent > 0 ? '+' : ''}
              {activePoint.point.gainPercent}% return
            </span>
          </div>
        </div>

        <div className="text-right text-xs text-[#64748b]">
          <span>Est. Listing: </span>
          <strong className="text-[#0f172a] font-bold text-sm">
            ₹{activePoint.point.estListingPrice}
          </strong>
        </div>
      </div>

      {/* Smooth SVG Chart */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`groww-grad-${symbol}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00d09c" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#00d09c" stopOpacity="0.0" />
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
                  stroke="#f1f5f9"
                  strokeDasharray="3 3"
                  strokeWidth="1.5"
                />
                <text
                  x={paddingX - 8}
                  y={y + 3}
                  textAnchor="end"
                  fill="#94a3b8"
                  fontSize="10"
                  fontWeight="500"
                >
                  {metric === 'PERCENT' ? `${refVal.toFixed(0)}%` : refVal.toFixed(0)}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaD} fill={`url(#groww-grad-${symbol})`} />

          {/* Line Stroke */}
          <path
            d={pathD}
            fill="none"
            stroke="#00d09c"
            strokeWidth="2.5"
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
                r={hoveredIdx === i ? 6 : 4}
                fill={hoveredIdx === i ? '#00d09c' : '#ffffff'}
                stroke="#00d09c"
                strokeWidth="2.5"
              />
              <text
                x={pt.x}
                y={svgHeight - 10}
                textAnchor="middle"
                fill={hoveredIdx === i ? '#0f172a' : '#94a3b8'}
                fontSize="10"
                fontWeight="600"
              >
                {pt.point.date}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Past Results Section (if listed) */}
      {pastResults && (
        <div className="mt-4 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4 text-xs">
          <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-2.5">
            <span className="text-xs font-bold text-[#0f172a]">
              Actual Listing Day Performance
            </span>
            <span className="text-[11px] font-semibold text-[#64748b]">Exchange: NSE & BSE</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
            <div>
              <span className="text-[11px] text-[#64748b]">Issue Price</span>
              <p className="font-bold text-[#0f172a] text-sm mt-0.5">₹{pastResults.issuePrice}</p>
            </div>
            <div>
              <span className="text-[11px] text-[#64748b]">Listing Debut Price</span>
              <p className="font-bold text-[#008767] text-sm mt-0.5">₹{pastResults.listingPrice}</p>
            </div>
            <div>
              <span className="text-[11px] text-[#64748b]">Listing Day Gain</span>
              <p className={`font-bold text-sm mt-0.5 ${pastResults.listingGainPercent >= 0 ? 'text-[#008767]' : 'text-[#b91c1c]'}`}>
                {pastResults.listingGainPercent >= 0 ? '+' : ''}
                {pastResults.listingGainPercent}%
              </p>
            </div>
            <div>
              <span className="text-[11px] text-[#64748b]">Retail Allocation</span>
              <p className="font-semibold text-[#0f172a] mt-0.5">{pastResults.allotmentRatioRetail}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
