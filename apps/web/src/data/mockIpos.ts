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
    openDate: '06 Nov 2024',
    closeDate: '08 Nov 2024',
    allotmentDate: '11 Nov 2024',
    listingDate: '13 Nov 2024',
    registrarName: 'Link Intime India Pvt Ltd',
    registrarUrl: 'https://linkintime.co.in/initial_offer/public-issues.html',
    currentGmp: 32,
    estimatedListingPrice: 422,
    gainPercentage: 8.21,
    gmpHistory: [
      { date: '03 Nov', gmp: 12, gainPercent: 3.08 },
      { date: '04 Nov', gmp: 18, gainPercent: 4.62 },
      { date: '05 Nov', gmp: 22, gainPercent: 5.64 },
      { date: '06 Nov', gmp: 25, gainPercent: 6.41 },
      { date: '07 Nov', gmp: 32, gainPercent: 8.21 },
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
      summary: 'High brand moat in quick commerce & delivery with narrowing contribution losses, yet facing stiff competition from Zomato and Zepto with negative bottom-line earnings.',
      strengths: [
        'Instamart GOV expanding at 58% CAGR with strong dark store density',
        'Duopoly market presence with loyal high-AOV urban user base',
        'Substantial net cash balance runway post primary capital raise'
      ],
      risks: [
        'Negative PAT and high cash burn in the 10-minute grocery delivery race',
        'Significant OFS component (₹6,828 Cr) by early venture investors',
        'Intense wage inflation and gig-worker attrition pressures'
      ],
      financials: {
        revenue: '₹11,247 Cr (FY24)',
        pat: '-₹2,350 Cr (FY24)',
        growth: '+36% YoY GOV',
        debtToEquity: '0.08x'
      }
    }
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
    openDate: '21 Oct 2024',
    closeDate: '23 Oct 2024',
    allotmentDate: '24 Oct 2024',
    listingDate: '28 Oct 2024',
    registrarName: 'Link Intime India Pvt Ltd',
    registrarUrl: 'https://linkintime.co.in/initial_offer/public-issues.html',
    currentGmp: 1520,
    estimatedListingPrice: 3023,
    gainPercentage: 101.13,
    gmpHistory: [
      { date: '19 Oct', gmp: 1100, gainPercent: 73.18 },
      { date: '21 Oct', gmp: 1250, gainPercent: 83.17 },
      { date: '22 Oct', gmp: 1380, gainPercent: 91.82 },
      { date: '23 Oct', gmp: 1475, gainPercent: 98.14 },
      { date: '24 Oct', gmp: 1520, gainPercent: 101.13 },
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
      summary: 'India’s largest solar PV module maker with phenomenal order visibility, superior return on equity, and reasonable valuation compared to Premier Energies.',
      strengths: [
        '#1 Solar module manufacturer in India with 12 GW operational capacity',
        'Massive order book of 16.6 GW providing 2-3 years revenue visibility',
        'Surging 110% YoY PAT with industry-leading EBITDA margins (15.6%)'
      ],
      risks: [
        'Reliance on imported raw material wafers and silicon ingots',
        'Policy shifts in US/EU tariffs on solar module exports'
      ],
      financials: {
        revenue: '₹11,397 Cr (FY24)',
        pat: '₹1,274 Cr (FY24)',
        growth: '+69% YoY Revenue',
        debtToEquity: '0.12x'
      }
    }
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
    openDate: '19 Nov 2024',
    closeDate: '22 Nov 2024',
    allotmentDate: '25 Nov 2024',
    listingDate: '27 Nov 2024',
    registrarName: 'KFin Technologies Limited',
    registrarUrl: 'https://kosmic.kfintech.com/ipostatus/',
    currentGmp: 21,
    estimatedListingPrice: 129,
    gainPercentage: 19.44,
    gmpHistory: [
      { date: '12 Nov', gmp: 12, gainPercent: 11.11 },
      { date: '14 Nov', gmp: 15, gainPercent: 13.89 },
      { date: '16 Nov', gmp: 18, gainPercent: 16.67 },
      { date: '18 Nov', gmp: 21, gainPercent: 19.44 },
    ],
    subscription: {
      day: 0,
      qib: 0.00,
      nii: 0.00,
      retail: 0.00,
      total: 0.00,
      updatedAt: 'Bidding opens soon',
    },
    aiAnalysis: {
      verdict: 'APPLY',
      riskScore: 35,
      peRatio: 52.4,
      industryPe: 46.8,
      summary: 'Backed by Maharatna parent NTPC with a pristine balance sheet and 100% fresh issue proceeds earmarked for debt prepayment and solar/wind asset additions.',
      strengths: [
        'Backed by NTPC with tier-1 access to sovereign-grade power PPAs',
        '100% Fresh Issue — Zero promoter OFS dumping',
        'Targeting 60 GW renewable capacity by 2032'
      ],
      risks: [
        'Higher capital expenditure gestation period',
        'Execution delays in state-level power evacuation transmission grids'
      ],
      financials: {
        revenue: '₹1,962 Cr (FY24)',
        pat: '₹344 Cr (FY24)',
        growth: '+109% YoY Renewable Output',
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
    openDate: '15 Oct 2024',
    closeDate: '17 Oct 2024',
    allotmentDate: '18 Oct 2024',
    listingDate: '22 Oct 2024',
    registrarName: 'KFin Technologies Limited',
    registrarUrl: 'https://kosmic.kfintech.com/ipostatus/',
    currentGmp: -15,
    estimatedListingPrice: 1945,
    gainPercentage: -0.77,
    gmpHistory: [
      { date: '12 Oct', gmp: 60, gainPercent: 3.06 },
      { date: '14 Oct', gmp: 35, gainPercent: 1.78 },
      { date: '16 Oct', gmp: 10, gainPercent: 0.51 },
      { date: '18 Oct', gmp: -10, gainPercent: -0.51 },
      { date: '21 Oct', gmp: -15, gainPercent: -0.77 },
    ],
    subscription: {
      day: 3,
      qib: 6.97,
      nii: 0.60,
      retail: 0.50,
      total: 2.37,
      updatedAt: 'Closed & Listed',
    },
    aiAnalysis: {
      verdict: 'AVOID',
      riskScore: 78,
      peRatio: 26.3,
      industryPe: 23.5,
      summary: 'Mega ₹27,870 Cr 100% OFS issue with zero money coming into the Indian operating entity, combined with sluggish auto demand and heavy royalty outflow to Korean parent.',
      strengths: [
        'Second-largest passenger vehicle maker in India with Creta/Venue dominance',
        'Strong rural distribution and EV expansion pipeline via Talegaon plant'
      ],
      risks: [
        '100% OFS — Zero fresh funds injected into Indian company',
        'Retail quota remained undersubscribed (0.50x), reflecting muted interest',
        'Higher royalty payout (3.5%) to South Korean parent entity'
      ],
      financials: {
        revenue: '₹69,829 Cr (FY24)',
        pat: '₹6,060 Cr (FY24)',
        growth: '+15.8% YoY PAT',
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
    openDate: '27 Nov 2024',
    closeDate: '29 Nov 2024',
    allotmentDate: '02 Dec 2024',
    listingDate: '04 Dec 2024',
    registrarName: 'Bigshare Services Pvt Ltd',
    registrarUrl: 'https://www.bigshareonline.com/ipo_Allotment.html',
    currentGmp: 45,
    estimatedListingPrice: 118,
    gainPercentage: 61.64,
    gmpHistory: [
      { date: '24 Nov', gmp: 25, gainPercent: 34.25 },
      { date: '25 Nov', gmp: 35, gainPercent: 47.95 },
      { date: '26 Nov', gmp: 40, gainPercent: 54.79 },
      { date: '27 Nov', gmp: 45, gainPercent: 61.64 },
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
      summary: 'Fast-growing water & effluent treatment plant engineering firm serving heavy industrial sectors. High SME return on capital with strong listing premium appetite.',
      strengths: [
        'Consistent 42% CAGR revenue growth in specialized water recycling systems',
        'Reasonable valuation at 18.4x P/E with clean debt profile',
        'Strong SME listing demand with GMP above 60%'
      ],
      risks: [
        'SME lot size liquidity constraints (₹1,16,800 minimum investment)',
        'Working capital heavy with milestone-based payment cycles'
      ],
      financials: {
        revenue: '₹56.8 Cr (FY24)',
        pat: '₹6.2 Cr (FY24)',
        growth: '+44% YoY PAT',
        debtToEquity: '0.22x'
      }
    }
  }
];
