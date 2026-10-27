import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IPObud — Real-Time Indian IPO & GMP Analytics Terminal',
  description: 'Smart companion for NSE & BSE Mainboard & SME IPOs. Live GMP tracking, Gemini AI prospectus analysis, and instant registrar allotment status.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#080c14] text-slate-100 antialiased selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
