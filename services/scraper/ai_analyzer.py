"""
Gemini AI Prospectus Synthesizer
Analyzes financial ratios, RHP filings, and valuation multiples to generate:
- 1-Click Verdict (STRONG_APPLY, APPLY, LISTING_GAINS_ONLY, AVOID, HIGH_RISK)
- Objective Risk Score (1-100)
- Top 3 Strengths & Critical Red Flags
"""

import json
from typing import Dict, Any, Optional
import google.generativeai as genai
from config import GEMINI_API_KEY

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

PROMPT_TEMPLATE = """
You are a senior equity research analyst specializing in Indian IPOs (NSE/BSE).
Analyze the following IPO metrics and prospectus data:

Company: {company_name}
Market Type: {market_type}
Issue Size: ₹{issue_size_cr} Cr (Fresh: ₹{fresh_issue_cr} Cr, OFS: ₹{ofs_cr} Cr)
Price Band: ₹{price_band_low} - ₹{price_band_high}
P/E Ratio: {pe_ratio} (Industry Peer P/E: {industry_pe})
Revenue CAGR / Financials: {financials}

Respond with a strictly formatted JSON object matching this schema:
{{
  "verdict": "STRONG_APPLY" | "APPLY" | "LISTING_GAINS_ONLY" | "AVOID" | "HIGH_RISK",
  "risk_score": <Integer between 1 and 100, where 100 is highest risk>,
  "summary": "<2-3 sentence executive rationale>",
  "strengths": ["<Strength 1>", "<Strength 2>", "<Strength 3>"],
  "risks": ["<Red flag 1>", "<Red flag 2>"],
  "financial_highlights": {{
    "valuation_assessment": "UNDERVALUED" | "FAIR" | "EXPENSIVE" | "VERY_EXPENSIVE",
    "growth_visibility": "<High/Medium/Low>"
  }}
}}
"""

class AIAnalyzer:
    def __init__(self):
        self.model = genai.GenerativeModel("gemini-1.5-flash") if GEMINI_API_KEY else None

    def analyze_ipo(self, ipo_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Sends prospectus metrics to Gemini and parses the structured response.
        Falls back to rule-based heuristics if API key is not present.
        """
        if not self.model:
            return self._fallback_rule_analysis(ipo_data)

        prompt = PROMPT_TEMPLATE.format(
            company_name=ipo_data.get("company_name", ""),
            market_type=ipo_data.get("market_type", "MAINBOARD"),
            issue_size_cr=ipo_data.get("issue_size_cr", 0),
            fresh_issue_cr=ipo_data.get("fresh_issue_cr", 0),
            ofs_cr=ipo_data.get("ofs_cr", 0),
            price_band_low=ipo_data.get("price_band_low", 0),
            price_band_high=ipo_data.get("price_band_high", 0),
            pe_ratio=ipo_data.get("pe_ratio", "N/A"),
            industry_pe=ipo_data.get("industry_pe", "N/A"),
            financials=json.dumps(ipo_data.get("financial_summary", {}))
        )

        try:
            response = self.model.generate_content(prompt)
            cleaned = response.text.strip().replace("```json", "").replace("```", "")
            return json.loads(cleaned)
        except Exception as e:
            print(f"[!] Gemini inference error: {e}, using heuristic evaluation")
            return self._fallback_rule_analysis(ipo_data)

    def _fallback_rule_analysis(self, ipo: Dict[str, Any]) -> Dict[str, Any]:
        gmp_gain = ipo.get("gmp_gain_percent", 0.0)
        if gmp_gain >= 50:
            verdict = "STRONG_APPLY"
            risk = 25
        elif gmp_gain >= 15:
            verdict = "APPLY"
            risk = 40
        elif gmp_gain > 0:
            verdict = "LISTING_GAINS_ONLY"
            risk = 60
        else:
            verdict = "AVOID"
            risk = 80

        return {
            "verdict": verdict,
            "risk_score": risk,
            "summary": f"Heuristic analysis indicates {verdict.replace('_', ' ')} based on current GMP trend of {gmp_gain}%.",
            "strengths": ["Strong retail participation appetite", "Healthy listing interest"],
            "risks": ["Subject to broader market volatility prior to listing day"],
            "financial_highlights": {
                "valuation_assessment": "FAIR",
                "growth_visibility": "Medium"
            }
        }
