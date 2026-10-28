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
  riskScore: number; // 1-100
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

// Narada Feature: Multi-Account Allotment Models
export interface FamilyAccount {
  id: string;
  name: string;
  pan: string;
  relation: 'Self' | 'Spouse' | 'Father' | 'Mother' | 'Sibling' | 'Child' | 'Friend';
  dpClientId?: string;
  applicationNo?: string;
}

export interface AccountAllotmentResult {
  accountId: string;
  accountName: string;
  pan: string;
  relation: string;
  status: 'ALLOTTED' | 'NOT_ALLOTTED';
  sharesAllotted: number;
  amountInvested: number;
  estimatedGain: number;
  refundAmount: number;
}

export interface BulkAllotmentSummary {
  ipoId: string;
  ipoSymbol: string;
  totalAccountsChecked: number;
  totalAllottedAccounts: number;
  totalShares: number;
  totalEstProfit: number;
  results: AccountAllotmentResult[];
}

// IPO Guru Feature: Prospectus Documents & SEBI Filings
export interface ProspectusDocuments {
  drhpUrl?: string;
  rhpUrl?: string;
  anchorBookUrl?: string;
  allotmentNoticeUrl?: string;
}

export interface FiscalYearFinancial {
  fiscalYear: string;
  revenueCr: number;
  ebitdaCr: number;
  patCr: number;
  netWorthCr: number;
  eps: number;
  ronwPercent: number;
}

export interface AnchorInvestor {
  name: string;
  sharesAllocated: number;
  amountCr: number;
  fundType: 'Domestic MF' | 'FII / Sovereign' | 'Insurance / AIF';
}

export interface PromoterHolding {
  preIssuePercent: number;
  postIssuePercent: number;
  promoterNames: string[];
  leadManagers: string[];
}

export interface DayWiseSubscription {
  dayNumber: number;
  date: string;
  qibTimes: number;
  sHniTimes: number;
  bHniTimes: number;
  retailTimes: number;
  totalTimes: number;
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
  // IPO Guru Dossier Extensions
  documents?: ProspectusDocuments;
  financialHistory?: FiscalYearFinancial[];
  anchorInvestors?: AnchorInvestor[];
  promoterHolding?: PromoterHolding;
  subscriptionDayWise?: DayWiseSubscription[];
}
