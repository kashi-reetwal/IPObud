"""
IPObud Scraper Service Entry Point
Runs automated cycles for scraping and AI prospectus synthesis.
"""

import time
import argparse
from crawler import IPOCrawler
from ai_analyzer import AIAnalyzer
from config import CRAWL_INTERVAL_MINUTES

def run_sync_cycle():
    print(f"[*] Starting IPObud sync cycle at {time.strftime('%Y-%m-%d %H:%M:%S')}...")
    crawler = IPOCrawler()
    analyzer = AIAnalyzer()

    # 1. Fetch live IPO listings
    ipos = crawler.fetch_current_ipos()
    print(f"[+] Fetched {len(ipos)} active/upcoming IPOs.")

    # 2. Fetch GMP rates
    gmps = crawler.fetch_gmp_rates()
    print(f"[+] Synced {len(gmps)} GMP data points.")

    print("[✓] Sync cycle completed.")

def main():
    parser = argparse.ArgumentParser(description="IPObud Scraper & AI Synthesizer Service")
    parser.add_argument("--once", action="store_true", help="Run once and exit immediately")
    args = parser.parse_args()

    if args.once:
        run_sync_cycle()
        return

    print(f"[*] IPObud worker daemon active. Running every {CRAWL_INTERVAL_MINUTES} minutes.")
    while True:
        try:
            run_sync_cycle()
        except Exception as e:
            print(f"[!] Cycle encountered error: {e}")
        time.sleep(CRAWL_INTERVAL_MINUTES * 60)

if __name__ == "__main__":
    main()
