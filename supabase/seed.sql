-- ============================================================================
-- IPObud Database Seed Data
-- ============================================================================

-- 1. Insert Sample Mainboard and SME IPOs
INSERT INTO ipos (
    id, slug, company_name, symbol, logo_url, market_type, status,
    price_band_low, price_band_high, lot_size, issue_size_cr, fresh_issue_cr, ofs_cr,
    open_date, close_date, allotment_date, listing_date,
    registrar_name, registrar_url
) VALUES 
(
    '11111111-1111-1111-1111-111111111111',
    'swiggy-limited',
    'Swiggy Limited',
    'SWIGGY',
    'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=100&h=100&fit=crop',
    'MAINBOARD',
    'ACTIVE',
    371.00, 390.00, 38, 11327.43, 4499.00, 6828.43,
    NOW() - INTERVAL '1 day', NOW() + INTERVAL '1 day', NOW() + INTERVAL '3 days', NOW() + INTERVAL '6 days',
    'Link Intime India Pvt Ltd', 'https://linkintime.co.in/initial_offer/public-issues.html'
),
(
    '22222222-2222-2222-2222-222222222222',
    'waaree-energies-limited',
    'Waaree Energies Limited',
    'WAAREE',
    'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=100&h=100&fit=crop',
    'MAINBOARD',
    'ALLOTTED',
    1427.00, 1503.00, 9, 4321.44, 3600.00, 721.44,
    NOW() - INTERVAL '7 days', NOW() - INTERVAL '4 days', NOW() - INTERVAL '2 days', NOW() + INTERVAL '1 day',
    'Link Intime India Pvt Ltd', 'https://linkintime.co.in/initial_offer/public-issues.html'
),
(
    '33333333-3333-3333-3333-333333333333',
    'ntpc-green-energy-limited',
    'NTPC Green Energy Limited',
    'NTPCGREEN',
    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=100&h=100&fit=crop',
    'MAINBOARD',
    'UPCOMING',
    102.00, 108.00, 138, 10000.00, 10000.00, 0.00,
    NOW() + INTERVAL '5 days', NOW() + INTERVAL '8 days', NOW() + INTERVAL '10 days', NOW() + INTERVAL '14 days',
    'KFin Technologies Limited', 'https://kosmic.kfintech.com/ipostatus/'
),
(
    '44444444-4444-4444-4444-444444444444',
    'hyundai-motor-india-limited',
    'Hyundai Motor India Limited',
    'HYUNDAI',
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=100&h=100&fit=crop',
    'MAINBOARD',
    'LISTED',
    1865.00, 1960.00, 7, 27870.16, 0.00, 27870.16,
    NOW() - INTERVAL '20 days', NOW() - INTERVAL '17 days', NOW() - INTERVAL '15 days', NOW() - INTERVAL '12 days',
    'KFin Technologies Limited', 'https://kosmic.kfintech.com/ipostatus/'
),
(
    '55555555-5555-5555-5555-555555555555',
    'apex-ecotech-limited',
    'Apex Ecotech Limited',
    'APEXECO',
    'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=100&h=100&fit=crop',
    'SME',
    'ACTIVE',
    71.00, 73.00, 1600, 25.54, 25.54, 0.00,
    NOW() - INTERVAL '1 day', NOW() + INTERVAL '2 days', NOW() + INTERVAL '4 days', NOW() + INTERVAL '7 days',
    'Bigshare Services Pvt Ltd', 'https://www.bigshareonline.com/ipo_Allotment.html'
)
ON CONFLICT (id) DO NOTHING;

-- 2. Insert GMP Trend Data
INSERT INTO gmp_history (ipo_id, gmp_value, estimated_listing_price, gain_percentage, recorded_at) VALUES
('11111111-1111-1111-1111-111111111111', 12.00, 402.00, 3.08, NOW() - INTERVAL '3 days'),
('11111111-1111-1111-1111-111111111111', 18.00, 408.00, 4.62, NOW() - INTERVAL '2 days'),
('11111111-1111-1111-1111-111111111111', 25.00, 415.00, 6.41, NOW() - INTERVAL '1 day'),
('11111111-1111-1111-1111-111111111111', 32.00, 422.00, 8.21, NOW()),

('22222222-2222-2222-2222-222222222222', 1250.00, 2753.00, 83.17, NOW() - INTERVAL '4 days'),
('22222222-2222-2222-2222-222222222222', 1380.00, 2883.00, 91.82, NOW() - INTERVAL '2 days'),
('22222222-2222-2222-2222-222222222222', 1520.00, 3023.00, 101.13, NOW()),

('33333333-3333-3333-3333-333333333333', 15.00, 123.00, 13.89, NOW() - INTERVAL '2 days'),
('33333333-3333-3333-3333-333333333333', 21.00, 129.00, 19.44, NOW()),

('55555555-5555-5555-5555-555555555555', 45.00, 118.00, 61.64, NOW());

-- 3. Insert Subscription Snapshots
INSERT INTO subscription_snapshots (ipo_id, day_number, qib_multiple, nii_multiple, b_nii_multiple, s_nii_multiple, retail_multiple, total_multiple) VALUES
('11111111-1111-1111-1111-111111111111', 2, 0.42, 0.65, 0.72, 0.51, 1.15, 0.78),
('22222222-2222-2222-2222-222222222222', 3, 208.63, 62.48, 68.22, 50.99, 10.79, 76.34),
('55555555-5555-5555-5555-555555555555', 2, 4.20, 12.50, 14.10, 9.30, 18.40, 13.25);

-- 4. Insert Gemini AI Analyses
INSERT INTO ai_analyses (
    ipo_id, verdict, risk_score, pe_ratio, industry_pe, summary, strengths, risks, financial_summary
) VALUES
(
    '11111111-1111-1111-1111-111111111111',
    'LISTING_GAINS_ONLY',
    64,
    NULL,
    98.40,
    'High brand equity in quick-commerce and food delivery with narrowing contribution losses, but facing cutthroat competition from Zomato and Zepto with negative EPS.',
    '["Instamart GOV expanding at 58% CAGR", "Leading market share in Tier-1 quick delivery dark stores", "Substantial net cash runway post fresh issue"]'::jsonb,
    '["Persistent operating losses and negative net PAT", "Intense price war in 10-minute grocery delivery", "Promoter and early investor heavy OFS selling"]'::jsonb,
    '{"revenue_fy24_cr": 11247.39, "pat_fy24_cr": -2350.24, "ebitda_margin": -14.2, "debt_to_equity": 0.08}'::jsonb
),
(
    '22222222-2222-2222-2222-222222222222',
    'STRONG_APPLY',
    22,
    33.20,
    58.70,
    'Market leader in Indian solar PV module manufacturing with huge domestic order book and attractive pricing relative to sector peers like Premier Energies.',
    '["#1 Solar PV module maker in India with 12 GW operational capacity", "Order book exceeding 16.6 GW providing multi-year revenue visibility", "Robust 110% YoY PAT growth with healthy 18.5% return on equity"]'::jsonb,
    '["Raw material dependency on imported polysilicon and wafers", "Vulnerability to anti-dumping tariff changes and policy shifts"]'::jsonb,
    '{"revenue_fy24_cr": 11397.61, "pat_fy24_cr": 1274.38, "ebitda_margin": 15.6, "debt_to_equity": 0.12}'::jsonb
);
