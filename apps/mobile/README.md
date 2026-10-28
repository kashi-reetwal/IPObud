# IPObud Mobile (Android First) 📱

High-Tech Financial Terminal Mobile App for Indian Stock Market IPOs (NSE & BSE Mainboard & SME), built with **React Native** & **Expo**.

---

## ⚡ Highlights
- **5 Terminal Screens**:
  1. **IPOs (Home)**: Live ticker tape, Mainboard & SME filter chips, real-time price band, lot size, current GMP, and subscription demand.
  2. **GMP Radar**: Ranked gainers leaderboards with 7-day momentum sparkline charts.
  3. **AI Verdict**: Gemini AI Prospectus synthesis with objective 1-100 risk score and valuation peer multiples.
  4. **Allotment**: Universal PAN status checker across Link Intime, KFintech, Bigshare, and Skyline.
  5. **My Bids**: Personal portfolio of applied bids, UPI blocked capital, and expected listing day profit.
- **Design System**: AMOLED deep-black (`#05070E`) theme with neon emerald green gains, electric cyan accents, and glassmorphic cards.

---

## 🚀 Running on Android

### Option A: Instant Live Preview on Physical Android Phone (Expo Go)
1. Install **Expo Go** from Google Play Store on your Android phone.
2. In the terminal:
   ```bash
   cd apps/mobile
   npm install
   npx expo start
   ```
3. Scan the printed QR code using the Expo Go camera on your Android phone. The app will launch immediately with live reload!

### Option B: Android Emulator / ADB
```bash
cd apps/mobile
npm install
npx expo run:android
```

### Option C: Build Standalone APK (EAS Build)
```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```
