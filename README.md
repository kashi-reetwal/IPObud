# IPObud 🚀

[![Status](https://img.shields.io/badge/Status-Phase%201%20Scaffolding-06B6D4.svg)](#)
[![Stack](https://img.shields.io/badge/Stack-Next.js%20%7C%20Supabase%20%7C%20Python%20%7C%20Gemini%20AI-10B981.svg)](#)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](#)

> **Next-Gen Financial Terminal for Indian Stock Market IPOs (NSE/BSE Mainboard & SME)**  
> Real-time Grey Market Premium (GMP), Live Subscription tracking, Gemini AI Prospectus analysis, and Instant Allotment status.

---

## 🌟 Highlights

- 📈 **Real-Time GMP Intelligence**: Live grey market premium, estimated listing gains, and 7-day momentum sparklines.
- ⚡ **Live Subscription Multiples**: Dynamic Day 1/2/3 demand breakdown (QIB, NII, Retail) directly updated from exchange feeds.
- 🤖 **Gemini AI Prospectus Synthesizer**: 1-click DRHP/RHP valuation review, P/E peer benchmarking, red flags, and **Apply / Avoid** verdict.
- 🔍 **Universal Allotment Status Checker**: Instant search across Link Intime, KFintech, Bigshare, and Skyline with masked PAN.
- 💼 **Personal Bid & P&L Tracker**: Manage applied lots, calculate expected listing profit, and track refund/credit timelines.
- 🔔 **Smart Alerts**: Instant bidding deadline and allotment alerts via Telegram and Email.

---

## 🏗️ Monorepo Structure

```
myGithub/IPObud/
├── apps/
│   ├── mobile/                # Android-First React Native Expo Terminal (AMOLED Dark)
│   └── web/                   # Next.js 14+ Web Terminal
├── services/
│   └── scraper/               # Python Crawler for live IPO, GMP, and subscription feeds
├── supabase/
│   ├── migrations/            # SQL Schema & Migrations
│   └── seed.sql               # Seed data for immediate local dev & demo
├── ARCHITECTURE.md            # In-depth technical specifications
└── README.md                  # Project overview and quickstart
```

---

## 🚀 Quickstart

### 1. Run on Android Phone (Expo Go)
```bash
cd apps/mobile
npm install
npx expo start
# Scan the printed QR code with Expo Go on your Android device!
```

### 2. Run the Web Terminal
```bash
cd apps/web
npm install
npm run dev
```

### 3. Run the Scraper / Data Worker
```bash
cd services/scraper
pip install -r requirements.txt
python main.py
```

---

## 📖 Complete Documentation
For detailed architecture, entity relationship diagrams, and design tokens, see [ARCHITECTURE.md](./ARCHITECTURE.md).
