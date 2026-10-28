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
  sHni?: number;
  bHni?: number;
  retail: number;
  total: number;
  totalApplications: number; // Count of unique PAN applications
  totalAmountBidCr: number;  // Total value bid in INR Crores
  retailApplications?: number; // Retail individual investor applications count
  retailAmountBidCr?: number;  // Total retail bid value in INR Crores
  qibAmountBidCr?: number;     // Institutional bid value in INR Crores
  niiAmountBidCr?: number;     // Non-institutional bid value in INR Crores
  sharesOfferedCr?: number;    // Total shares offered in Crores
  sharesBidCr?: number;        // Total shares bid in Crores
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

// Multi-Account Family Allotment Models
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

// Statutory Prospectus Documents & SEBI Filings
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
  applicationsCount?: number;
  amountBidCr?: number;
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
  // Institutional Dossier Extensions
  documents?: ProspectusDocuments;
  financialHistory?: FiscalYearFinancial[];
  anchorInvestors?: AnchorInvestor[];
  promoterHolding?: PromoterHolding;
  subscriptionDayWise?: DayWiseSubscription[];
}
