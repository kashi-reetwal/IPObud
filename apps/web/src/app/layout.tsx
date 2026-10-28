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
    <html lang="en">
      <body className="min-h-screen bg-[#f8fafc] text-[#0f172a] antialiased selection:bg-[#00d09c] selection:text-white">
        {children}
      </body>
    </html>
  );
}
