-- ============================================================================
-- IPObud Database Schema — Migration 001
-- Target: Supabase / PostgreSQL 15+
-- ============================================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
DO $$ BEGIN
    CREATE TYPE market_category AS ENUM ('MAINBOARD', 'SME');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE ipo_status AS ENUM ('UPCOMING', 'ACTIVE', 'CLOSED', 'ALLOTTED', 'LISTED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE ai_verdict AS ENUM ('STRONG_APPLY', 'APPLY', 'LISTING_GAINS_ONLY', 'AVOID', 'HIGH_RISK');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE allotment_status AS ENUM ('PENDING', 'ALLOTTED', 'NOT_ALLOTTED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 1. IPOS Table
CREATE TABLE IF NOT EXISTS ipos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    company_name TEXT NOT NULL,
    symbol TEXT,
    logo_url TEXT,
    market_type market_category NOT NULL DEFAULT 'MAINBOARD',
    status ipo_status NOT NULL DEFAULT 'UPCOMING',
    price_band_low NUMERIC(10, 2) NOT NULL,
    price_band_high NUMERIC(10, 2) NOT NULL,
    lot_size INT NOT NULL,
    issue_size_cr NUMERIC(12, 2) NOT NULL,
    fresh_issue_cr NUMERIC(12, 2) DEFAULT 0,
    ofs_cr NUMERIC(12, 2) DEFAULT 0,
    open_date TIMESTAMPTZ,
    close_date TIMESTAMPTZ,
    allotment_date TIMESTAMPTZ,
    refunds_date TIMESTAMPTZ,
    credit_demat_date TIMESTAMPTZ,
    listing_date TIMESTAMPTZ,
    listing_exchanges TEXT[] DEFAULT ARRAY['NSE', 'BSE'],
    retail_quota_percent NUMERIC(5, 2) DEFAULT 35.00,
    qib_quota_percent NUMERIC(5, 2) DEFAULT 50.00,
    nii_quota_percent NUMERIC(5, 2) DEFAULT 15.00,
    registrar_name TEXT NOT NULL,
    registrar_url TEXT,
    drhp_url TEXT,
    rhp_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index on slug & status for fast lookup
CREATE INDEX IF NOT EXISTS idx_ipos_slug ON ipos(slug);
CREATE INDEX IF NOT EXISTS idx_ipos_status ON ipos(status);
CREATE INDEX IF NOT EXISTS idx_ipos_market_type ON ipos(market_type);

-- 2. GMP History Table
CREATE TABLE IF NOT EXISTS gmp_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ipo_id UUID NOT NULL REFERENCES ipos(id) ON DELETE CASCADE,
    gmp_value NUMERIC(10, 2) NOT NULL,
    estimated_listing_price NUMERIC(10, 2) NOT NULL,
    gain_percentage NUMERIC(6, 2) NOT NULL,
    recorded_at TIMESTAMPTZ DEFAULT NOW(),
    source TEXT DEFAULT 'Market Consensus'
);

CREATE INDEX IF NOT EXISTS idx_gmp_ipo_time ON gmp_history(ipo_id, recorded_at DESC);

-- 3. Subscription Snapshots Table
CREATE TABLE IF NOT EXISTS subscription_snapshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ipo_id UUID NOT NULL REFERENCES ipos(id) ON DELETE CASCADE,
    day_number INT DEFAULT 1,
    qib_multiple NUMERIC(8, 2) DEFAULT 0.0,
    nii_multiple NUMERIC(8, 2) DEFAULT 0.0,
    b_nii_multiple NUMERIC(8, 2) DEFAULT 0.0,
    s_nii_multiple NUMERIC(8, 2) DEFAULT 0.0,
    retail_multiple NUMERIC(8, 2) DEFAULT 0.0,
    employee_multiple NUMERIC(8, 2) DEFAULT 0.0,
    total_multiple NUMERIC(8, 2) DEFAULT 0.0,
    snapshot_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sub_ipo_time ON subscription_snapshots(ipo_id, snapshot_at DESC);

-- 4. AI Analyses Table
CREATE TABLE IF NOT EXISTS ai_analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ipo_id UUID UNIQUE NOT NULL REFERENCES ipos(id) ON DELETE CASCADE,
    verdict ai_verdict NOT NULL,
    risk_score INT CHECK (risk_score >= 1 AND risk_score <= 100),
    pe_ratio NUMERIC(8, 2),
    industry_pe NUMERIC(8, 2),
    summary TEXT,
    strengths JSONB DEFAULT '[]'::jsonb,
    risks JSONB DEFAULT '[]'::jsonb,
    financial_summary JSONB DEFAULT '{}'::jsonb,
    generated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. User Bids (Hybrid Auth / Local)
CREATE TABLE IF NOT EXISTS user_bids (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID, -- References auth.users(id) in Supabase if logged in
    ipo_id UUID NOT NULL REFERENCES ipos(id) ON DELETE CASCADE,
    category TEXT DEFAULT 'RETAIL',
    lots_applied INT NOT NULL DEFAULT 1,
    bid_price NUMERIC(10, 2) NOT NULL,
    application_no TEXT,
    pan_masked TEXT,
    allotment_status allotment_status DEFAULT 'PENDING',
    lots_allotted INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_bids_user ON user_bids(user_id);
