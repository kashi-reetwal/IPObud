export type MarketCategory = 'MAINBOARD' | 'SME';

export type IpoStatus = 'UPCOMING' | 'ACTIVE' | 'CLOSED' | 'ALLOTTED' | 'LISTED';

export type TimelineStage =
  | 'UPCOMING'
  | 'BIDDING_OPEN'
  | 'BIDDING_CLOSED'
  | 'ALLOTMENT_OUT'
  | 'REFUNDS_INITIATED'
  | 'DEMAT_CREDITED'
  | 'LISTED';

export type AiVerdict = 'STRONG_APPLY' | 'APPLY' | 'LISTING_GAINS_ONLY' | 'AVOID' | 'HIGH_RISK';

export interface GmpPoint {
  date: string;
  gmp: number;
  gainPercent: number;
  estListingPrice: number;
}

export interface SubscriptionStatus {
  day: number;
  qib: number;
  nii: number;
  retail: number;
  total: number;
  updatedAt: string;
}

export interface AiAnalysis {
  verdict: AiVerdict;
  riskScore: number;
  peRatio?: number;
  industryPe?: number;
  summary: string;
  strengths: string[];
  risks: string[];
  financials: {
    revenue: string;
    pat: string;
    growth: string;
    debtToEquity: string;
  };
}

export interface TimelineDates {
  biddingOpen: string;
  biddingClose: string;
  allotmentFinalization: string;
  refundsInitiation: string;
  dematTransfer: string;
  listingOnExchange: string;
  currentStage: TimelineStage;
}

export interface PastPerformanceResult {
  issuePrice: number;
  listingPrice: number;
  listingGainPercent: number;
  listingDayClose: number;
  allotmentRatioRetail: string;
}

export interface IPO {
  id: string;
  slug: string;
  companyName: string;
  symbol: string;
  marketType: MarketCategory;
  status: IpoStatus;
  priceBandLow: number;
  priceBandHigh: number;
  lotSize: number;
  issueSizeCr: number;
  freshIssueCr: number;
  ofsCr: number;
  registrarName: string;
  registrarUrl: string;
  currentGmp: number;
  estimatedListingPrice: number;
  gainPercentage: number;
  gmpHistory: GmpPoint[];
  subscription: SubscriptionStatus;
  aiAnalysis: AiAnalysis;
  timeline: TimelineDates;
  pastResults?: PastPerformanceResult;
}

export interface UserBid {
  id: string;
  ipoId: string;
  companyName: string;
  symbol: string;
  lots: number;
  totalShares: number;
  investmentAmount: number;
  bidPrice: number;
  gmpAtBid: number;
  expectedProfit: number;
  appliedDate: string;
  status: 'PENDING' | 'ALLOTTED' | 'NOT_ALLOTTED';
}
