export type MarketCategory = 'MAINBOARD' | 'SME';

export type IpoStatus = 'UPCOMING' | 'ACTIVE' | 'CLOSED' | 'ALLOTTED' | 'LISTED';

export type AiVerdict = 'STRONG_APPLY' | 'APPLY' | 'LISTING_GAINS_ONLY' | 'AVOID' | 'HIGH_RISK';

export interface GmpPoint {
  date: string;
  gmp: number;
  gainPercent: number;
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
  openDate: string;
  closeDate: string;
  allotmentDate: string;
  listingDate: string;
  registrarName: string;
  registrarUrl: string;
  currentGmp: number;
  estimatedListingPrice: number;
  gainPercentage: number;
  gmpHistory: GmpPoint[];
  subscription: SubscriptionStatus;
  aiAnalysis: AiAnalysis;
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
