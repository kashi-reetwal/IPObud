import { IPO } from '../types';

export const mockIpos: IPO[] = [
  {
    id: '1',
    slug: 'swiggy-limited',
    companyName: 'Swiggy Limited',
    symbol: 'SWIGGY',
    marketType: 'MAINBOARD',
    status: 'ACTIVE',
    priceBandLow: 371,
    priceBandHigh: 390,
    lotSize: 38,
    issueSizeCr: 11327.43,
    freshIssueCr: 4499.00,
    ofsCr: 6828.43,
    registrarName: 'Link Intime India Pvt Ltd',
    registrarUrl: 'https://linkintime.co.in/initial_offer/public-issues.html',
    currentGmp: 32,
    estimatedListingPrice: 422,
    gainPercentage: 8.21,
    timeline: {
      biddingOpen: '06 Nov 2024',
      biddingClose: '08 Nov 2024',
      allotmentFinalization: '11 Nov 2024',
      refundsInitiation: '12 Nov 2024',
      dematTransfer: '12 Nov 2024',
      listingOnExchange: '13 Nov 2024',
      currentStage: 'BIDDING_OPEN',
    },
    gmpHistory: [
      { date: '02 Nov', gmp: 10, gainPercent: 2.56, estListingPrice: 400 },
      { date: '03 Nov', gmp: 14, gainPercent: 3.59, estListingPrice: 404 },
      { date: '04 Nov', gmp: 18, gainPercent: 4.62, estListingPrice: 408 },
      { date: '05 Nov', gmp: 22, gainPercent: 5.64, estListingPrice: 412 },
      { date: '06 Nov', gmp: 25, gainPercent: 6.41, estListingPrice: 415 },
      { date: '07 Nov', gmp: 30, gainPercent: 7.69, estListingPrice: 420 },
      { date: '08 Nov', gmp: 32, gainPercent: 8.21, estListingPrice: 422 },
    ],
    subscription: {
      day: 2,
      qib: 0.42,
      nii: 0.65,
      retail: 1.15,
      total: 0.78,
      updatedAt: '07 Nov 15:30 IST',
    },
    aiAnalysis: {
      verdict: 'LISTING_GAINS_ONLY',
      riskScore: 64,
      peRatio: undefined,
      industryPe: 98.4,
      summary: 'High brand moat in quick commerce and food delivery with narrowing contribution losses, yet facing intense competition from Zomato and Zepto with negative bottom-line earnings.',
      strengths: [
        'Instamart gross order value expanding at 58% compound annual growth rate',
        'Duopoly market presence with substantial urban customer density',
        'Adequate post-issue liquidity buffer for dark-store network buildout'
      ],
      risks: [
        'Operating losses and negative return on equity in 10-minute delivery segment',
        'Significant secondary OFS component of INR 6,828 Cr by venture funds',
        'Ongoing cost pressures in delivery partner retention and customer acquisition'
      ],
      financials: {
        revenue: 'INR 11,247 Cr (FY24)',
        pat: '-INR 2,350 Cr (FY24)',
        growth: '+36% YoY Order Value',
        debtToEquity: '0.08x'
      }
    },
    documents: {
      drhpUrl: 'https://www.sebi.gov.in/filings/public-issues/apr-2024/swiggy-limited-drhp.pdf',
      rhpUrl: 'https://www.sebi.gov.in/filings/public-issues/oct-2024/swiggy-limited-rhp.pdf',
      anchorBookUrl: 'https://www.bseindia.com/markets/marketinfo/DispNewNoticesDocs.aspx?fn=20241105-45.pdf',
      allotmentNoticeUrl: 'https://linkintime.co.in/initial_offer/public-issues.html',
    },
    financialHistory: [
      { fiscalYear: 'FY22', revenueCr: 5705, ebitdaCr: -3200, patCr: -3629, netWorthCr: 5670, eps: -18.2, ronwPercent: -64.0 },
      { fiscalYear: 'FY23', revenueCr: 8265, ebitdaCr: -3010, patCr: -4179, netWorthCr: 4120, eps: -20.9, ronwPercent: -101.4 },
      { fiscalYear: 'FY24', revenueCr: 11247, ebitdaCr: -1870, patCr: -2350, netWorthCr: 7980, eps: -11.7, ronwPercent: -29.4 },
    ],
    anchorInvestors: [
      { name: 'Government of Singapore / GIC', sharesAllocated: 24500000, amountCr: 955.5, fundType: 'FII / Sovereign' },
      { name: 'Abu Dhabi Investment Authority (ADIA)', sharesAllocated: 18200000, amountCr: 709.8, fundType: 'FII / Sovereign' },
      { name: 'SBI Mutual Fund (Multi-Scheme)', sharesAllocated: 14100000, amountCr: 549.9, fundType: 'Domestic MF' },
      { name: 'HDFC Life Insurance Co.', sharesAllocated: 10250000, amountCr: 399.7, fundType: 'Insurance / AIF' },
      { name: 'Fidelity Securities Fund', sharesAllocated: 9500000, amountCr: 370.5, fundType: 'FII / Sovereign' },
    ],
    promoterHolding: {
      preIssuePercent: 0.0, // Professionally managed
      postIssuePercent: 0.0,
      promoterNames: ['Professionally Managed Company (No Identified Promoter)'],
      leadManagers: ['Kotak Mahindra Capital', 'Citigroup Global Markets', 'J.P. Morgan India', 'BofA Securities'],
    },
    subscriptionDayWise: [
      { dayNumber: 1, date: '06 Nov', qibTimes: 0.08, sHniTimes: 0.12, bHniTimes: 0.15, retailTimes: 0.54, totalTimes: 0.12 },
      { dayNumber: 2, date: '07 Nov', qibTimes: 0.42, sHniTimes: 0.55, bHniTimes: 0.70, retailTimes: 1.15, totalTimes: 0.78 },
      { dayNumber: 3, date: '08 Nov', qibTimes: 6.02, sHniTimes: 3.80, bHniTimes: 4.45, retailTimes: 3.10, totalTimes: 3.59 },
    ],
  },
  {
    id: '2',
    slug: 'waaree-energies-limited',
    companyName: 'Waaree Energies Limited',
    symbol: 'WAAREE',
    marketType: 'MAINBOARD',
    status: 'ALLOTTED',
    priceBandLow: 1427,
    priceBandHigh: 1503,
    lotSize: 9,
    issueSizeCr: 4321.44,
    freshIssueCr: 3600.00,
    ofsCr: 721.44,
    registrarName: 'Link Intime India Pvt Ltd',
    registrarUrl: 'https://linkintime.co.in/initial_offer/public-issues.html',
    currentGmp: 1520,
    estimatedListingPrice: 3023,
    gainPercentage: 101.13,
    timeline: {
      biddingOpen: '21 Oct 2024',
      biddingClose: '23 Oct 2024',
      allotmentFinalization: '24 Oct 2024',
      refundsInitiation: '25 Oct 2024',
      dematTransfer: '25 Oct 2024',
      listingOnExchange: '28 Oct 2024',
      currentStage: 'ALLOTMENT_OUT',
    },
    pastResults: {
      issuePrice: 1503,
      listingPrice: 2550,
      listingGainPercent: 69.66,
      listingDayClose: 2341,
      allotmentRatioRetail: '1 out of 10 applicants',
    },
    gmpHistory: [
      { date: '18 Oct', gmp: 950, gainPercent: 63.21, estListingPrice: 2453 },
      { date: '19 Oct', gmp: 1100, gainPercent: 73.18, estListingPrice: 2603 },
      { date: '20 Oct', gmp: 1200, gainPercent: 79.84, estListingPrice: 2703 },
      { date: '21 Oct', gmp: 1280, gainPercent: 85.16, estListingPrice: 2783 },
      { date: '22 Oct', gmp: 1390, gainPercent: 92.48, estListingPrice: 2893 },
      { date: '23 Oct', gmp: 1475, gainPercent: 98.14, estListingPrice: 2978 },
      { date: '24 Oct', gmp: 1520, gainPercent: 101.13, estListingPrice: 3023 },
    ],
    subscription: {
      day: 3,
      qib: 208.63,
      nii: 62.48,
      retail: 10.79,
      total: 76.34,
      updatedAt: '23 Oct 17:00 IST',
    },
    aiAnalysis: {
      verdict: 'STRONG_APPLY',
      riskScore: 22,
      peRatio: 33.2,
      industryPe: 58.7,
      summary: 'Market-leading solar photovoltaic module producer in India with multi-year order backlog visibility, strong operating margins, and defensive balance sheet positioning.',
      strengths: [
        'Largest solar module manufacturing capacity in India at 12 GW scale',
        'Export and domestic order book of 16.6 GW providing revenue predictability',
        '110% YoY growth in net profit after tax with 15.6% EBITDA margin'
      ],
      risks: [
        'Reliance on imported upstream raw components including polysilicon wafers',
        'Potential policy and tariff changes in export markets including the United States'
      ],
      financials: {
        revenue: 'INR 11,397 Cr (FY24)',
        pat: 'INR 1,274 Cr (FY24)',
        growth: '+69% YoY Topline',
        debtToEquity: '0.12x'
      }
    },
    documents: {
      drhpUrl: 'https://www.sebi.gov.in/filings/public-issues/dec-2023/waaree-energies-limited-drhp.pdf',
      rhpUrl: 'https://www.sebi.gov.in/filings/public-issues/oct-2024/waaree-energies-limited-rhp.pdf',
      anchorBookUrl: 'https://www.bseindia.com/markets/marketinfo/DispNewNoticesDocs.aspx?fn=20241018-35.pdf',
      allotmentNoticeUrl: 'https://linkintime.co.in/initial_offer/public-issues.html',
    },
    financialHistory: [
      { fiscalYear: 'FY22', revenueCr: 2854, ebitdaCr: 210, patCr: 79, netWorthCr: 540, eps: 3.4, ronwPercent: 16.8 },
      { fiscalYear: 'FY23', revenueCr: 6750, ebitdaCr: 835, patCr: 500, netWorthCr: 1820, eps: 21.6, ronwPercent: 34.2 },
      { fiscalYear: 'FY24', revenueCr: 11397, ebitdaCr: 1775, patCr: 1274, netWorthCr: 3950, eps: 52.8, ronwPercent: 39.5 },
    ],
    anchorInvestors: [
      { name: 'Nomura Funds Ireland Public Ltd', sharesAllocated: 2840000, amountCr: 426.8, fundType: 'FII / Sovereign' },
      { name: 'Goldman Sachs (Singapore) Pte', sharesAllocated: 2650000, amountCr: 398.3, fundType: 'FII / Sovereign' },
      { name: 'ICICI Prudential Mutual Fund', sharesAllocated: 2100000, amountCr: 315.6, fundType: 'Domestic MF' },
      { name: 'Mirae Asset Large & Midcap Fund', sharesAllocated: 1850000, amountCr: 278.1, fundType: 'Domestic MF' },
      { name: 'Tata Solar & Energy Opportunities Fund', sharesAllocated: 1420000, amountCr: 213.4, fundType: 'Domestic MF' },
    ],
    promoterHolding: {
      preIssuePercent: 71.80,
      postIssuePercent: 64.30,
      promoterNames: ['Hitesh Chimanlal Doshi', 'Virenkumar Doshi', 'Pankaj Doshi'],
      leadManagers: ['Axis Capital', 'IIFL Securities', 'Jefferies India', 'SBI Capital Markets'],
    },
    subscriptionDayWise: [
      { dayNumber: 1, date: '21 Oct', qibTimes: 0.12, sHniTimes: 3.40, bHniTimes: 4.10, retailTimes: 3.25, totalTimes: 2.26 },
      { dayNumber: 2, date: '22 Oct', qibTimes: 1.73, sHniTimes: 24.50, bHniTimes: 26.10, retailTimes: 6.40, totalTimes: 9.18 },
      { dayNumber: 3, date: '23 Oct', qibTimes: 208.63, sHniTimes: 60.10, bHniTimes: 63.60, retailTimes: 10.79, totalTimes: 76.34 },
    ],
  },
  {
    id: '3',
    slug: 'ntpc-green-energy-limited',
    companyName: 'NTPC Green Energy Limited',
    symbol: 'NTPCGREEN',
    marketType: 'MAINBOARD',
    status: 'UPCOMING',
    priceBandLow: 102,
    priceBandHigh: 108,
    lotSize: 138,
    issueSizeCr: 10000.00,
    freshIssueCr: 10000.00,
    ofsCr: 0.00,
    registrarName: 'KFin Technologies Limited',
    registrarUrl: 'https://kosmic.kfintech.com/ipostatus/',
    currentGmp: 21,
    estimatedListingPrice: 129,
    gainPercentage: 19.44,
    timeline: {
      biddingOpen: '19 Nov 2024',
      biddingClose: '22 Nov 2024',
      allotmentFinalization: '25 Nov 2024',
      refundsInitiation: '26 Nov 2024',
      dematTransfer: '26 Nov 2024',
      listingOnExchange: '27 Nov 2024',
      currentStage: 'UPCOMING',
    },
    gmpHistory: [
      { date: '12 Nov', gmp: 10, gainPercent: 9.26, estListingPrice: 118 },
      { date: '14 Nov', gmp: 14, gainPercent: 12.96, estListingPrice: 122 },
      { date: '16 Nov', gmp: 18, gainPercent: 16.67, estListingPrice: 126 },
      { date: '18 Nov', gmp: 21, gainPercent: 19.44, estListingPrice: 129 },
    ],
    subscription: {
      day: 0,
      qib: 0.00,
      nii: 0.00,
      retail: 0.00,
      total: 0.00,
      updatedAt: 'Bidding opens 19 Nov',
    },
    aiAnalysis: {
      verdict: 'APPLY',
      riskScore: 35,
      peRatio: 52.4,
      industryPe: 46.8,
      summary: 'Wholly owned green energy arm of Maharatna NTPC. Entire INR 10,000 Cr is primary issue with zero promoter dilution, structured for solar and wind asset creation and debt deleveraging.',
      strengths: [
        'Backed by sovereign utility parentage with direct power purchase agreements',
        '100% fresh issue proceeds with proceeds utilized for long-term capacity buildout',
        'Pipeline target of 60 GW operational clean energy by calendar 2032'
      ],
      risks: [
        'Higher capital expenditure gestation period in transmission link connectivity',
        'Exposure to state distribution company payment cycle variations'
      ],
      financials: {
        revenue: 'INR 1,962 Cr (FY24)',
        pat: 'INR 344 Cr (FY24)',
        growth: '+109% Renewable Output',
        debtToEquity: '0.45x'
      }
    }
  },
  {
    id: '4',
    slug: 'hyundai-motor-india-limited',
    companyName: 'Hyundai Motor India Limited',
    symbol: 'HYUNDAI',
    marketType: 'MAINBOARD',
    status: 'LISTED',
    priceBandLow: 1865,
    priceBandHigh: 1960,
    lotSize: 7,
    issueSizeCr: 27870.16,
    freshIssueCr: 0.00,
    ofsCr: 27870.16,
    registrarName: 'KFin Technologies Limited',
    registrarUrl: 'https://kosmic.kfintech.com/ipostatus/',
    currentGmp: -15,
    estimatedListingPrice: 1945,
    gainPercentage: -0.77,
    timeline: {
      biddingOpen: '15 Oct 2024',
      biddingClose: '17 Oct 2024',
      allotmentFinalization: '18 Oct 2024',
      refundsInitiation: '21 Oct 2024',
      dematTransfer: '21 Oct 2024',
      listingOnExchange: '22 Oct 2024',
      currentStage: 'LISTED',
    },
    pastResults: {
      issuePrice: 1960,
      listingPrice: 1934,
      listingGainPercent: -1.32,
      listingDayClose: 1819,
      allotmentRatioRetail: 'Full allotment (0.50x subscribed)',
    },
    gmpHistory: [
      { date: '10 Oct', gmp: 120, gainPercent: 6.12, estListingPrice: 2080 },
      { date: '12 Oct', gmp: 65, gainPercent: 3.32, estListingPrice: 2025 },
      { date: '14 Oct', gmp: 35, gainPercent: 1.78, estListingPrice: 1995 },
      { date: '16 Oct', gmp: 10, gainPercent: 0.51, estListingPrice: 1970 },
      { date: '18 Oct', gmp: -5, gainPercent: -0.26, estListingPrice: 1955 },
      { date: '21 Oct', gmp: -15, gainPercent: -0.77, estListingPrice: 1945 },
    ],
    subscription: {
      day: 3,
      qib: 6.97,
      nii: 0.60,
      retail: 0.50,
      total: 2.37,
      updatedAt: 'Listing Complete',
    },
    aiAnalysis: {
      verdict: 'AVOID',
      riskScore: 78,
      peRatio: 26.3,
      industryPe: 23.5,
      summary: '100% secondary offer-for-sale of INR 27,870 Cr with zero fresh capital inflow into the Indian entity, priced at parity with market leader Maruti Suzuki amid cyclical moderation in passenger vehicle demand.',
      strengths: [
        'Second-ranked passenger car manufacturer in India with robust SUV market share',
        'Export infrastructure and planned electric vehicle platform rollouts'
      ],
      risks: [
        'Entire issue proceeds repatriated to Korean parent with zero capital addition to balance sheet',
        'Retail tranche remained undersubscribed at 0.50x',
        'Ongoing royalty commitments to overseas parent at 3.5% of revenue'
      ],
      financials: {
        revenue: 'INR 69,829 Cr (FY24)',
        pat: 'INR 6,060 Cr (FY24)',
        growth: '+15.8% YoY Net Profit',
        debtToEquity: '0.04x'
      }
    }
  },
  {
    id: '5',
    slug: 'apex-ecotech-limited',
    companyName: 'Apex Ecotech Limited',
    symbol: 'APEXECO',
    marketType: 'SME',
    status: 'ACTIVE',
    priceBandLow: 71,
    priceBandHigh: 73,
    lotSize: 1600,
    issueSizeCr: 25.54,
    freshIssueCr: 25.54,
    ofsCr: 0.00,
    registrarName: 'Bigshare Services Pvt Ltd',
    registrarUrl: 'https://www.bigshareonline.com/ipo_Allotment.html',
    currentGmp: 45,
    estimatedListingPrice: 118,
    gainPercentage: 61.64,
    timeline: {
      biddingOpen: '27 Nov 2024',
      biddingClose: '29 Nov 2024',
      allotmentFinalization: '02 Dec 2024',
      refundsInitiation: '03 Dec 2024',
      dematTransfer: '03 Dec 2024',
      listingOnExchange: '04 Dec 2024',
      currentStage: 'BIDDING_OPEN',
    },
    gmpHistory: [
      { date: '22 Nov', gmp: 18, gainPercent: 24.66, estListingPrice: 91 },
      { date: '24 Nov', gmp: 25, gainPercent: 34.25, estListingPrice: 98 },
      { date: '25 Nov', gmp: 35, gainPercent: 47.95, estListingPrice: 108 },
      { date: '26 Nov', gmp: 40, gainPercent: 54.79, estListingPrice: 113 },
      { date: '27 Nov', gmp: 45, gainPercent: 61.64, estListingPrice: 118 },
    ],
    subscription: {
      day: 2,
      qib: 4.20,
      nii: 12.50,
      retail: 18.40,
      total: 13.25,
      updatedAt: '28 Nov 14:00 IST',
    },
    aiAnalysis: {
      verdict: 'STRONG_APPLY',
      riskScore: 32,
      peRatio: 18.4,
      industryPe: 34.5,
      summary: 'Industrial water treatment and recycling plant engineering business exhibiting high return on capital employed and strong bid demand in SME segment.',
      strengths: [
        '42% CAGR in wastewater zero-liquid discharge system deliveries',
        'Valuation discount of 18.4x P/E relative to specialty engineering peers',
        'Substantial retail and non-institutional subscription demand'
      ],
      risks: [
        'SME liquidity constraints with higher minimum ticket size requirement (INR 1,16,800)',
        'Working capital intensive execution cycles tied to client site handovers'
      ],
      financials: {
        revenue: 'INR 56.8 Cr (FY24)',
        pat: 'INR 6.2 Cr (FY24)',
        growth: '+44% YoY Net Profit',
        debtToEquity: '0.22x'
      }
    }
  }
];

export const initialFamilyAccounts: import('../types').FamilyAccount[] = [
  { id: 'acc-1', name: 'Rajesh Sharma (Self)', pan: 'ABCDE1234F', relation: 'Self', dpClientId: '1208160012345678' },
  { id: 'acc-2', name: 'Sunita Sharma (Spouse)', pan: 'FGHIJ5678A', relation: 'Spouse', dpClientId: '1208160087654321' },
  { id: 'acc-3', name: 'Om Prakash Sharma (Father)', pan: 'KLMNO9012A', relation: 'Father', dpClientId: '1208160099887766' },
  { id: 'acc-4', name: 'Kavita Sharma (Mother)', pan: 'PQRST3456B', relation: 'Mother', dpClientId: '1208160055443322' },
];

