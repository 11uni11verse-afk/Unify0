#!/usr/bin/env python3
"""
Test script for UnifyO News Scraper
Tests basic functionality without Google Cloud dependencies
"""

import asyncio
import json
from datetime import datetime
import sys
import os

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from main import (
    WEBSITE_CONFIGS,
    determine_country_from_content,
    extract_articles_from_html,
    fetch_text,
    normalize_entry
)

async def test_basic_functionality():
    """Test basic scraper functionality"""
    print("🧪 Testing UnifyO News Scraper")
    print("=" * 50)

    # Test 1: Country detection
    print("\n📍 Test 1: Country Detection")
    test_cases = [
        ("India study abroad news", "India"),
        ("Canadian university admissions", "Canada"),
        ("US visa requirements for students", "United States"),
        ("UK student finance", "United Kingdom"),
        ("Global higher education trends", "Global")
    ]

    for text, expected in test_cases:
        result = determine_country_from_content(text, "", "")
        status = "✅" if result == expected else "❌"
        print(f"{status} '{text}' -> {result} (expected: {expected})")

    # Test 2: Basic connectivity test
    print("\n🌐 Test 2: Network Connectivity")
    try:
        # Simple connectivity test
        import aiohttp
        async with aiohttp.ClientSession() as session:
            async with session.get("https://httpbin.org/get", timeout=5) as response:
                if response.status == 200:
                    print("✅ Network connectivity - OK")
                else:
                    print(f"⚠️  Network connectivity - Status {response.status}")
    except Exception as e:
        print(f"❌ Network connectivity - Failed: {e}")

    # Test 3: Website configuration
    print("\n⚙️  Test 3: Configuration Check")
    print(f"✅ Total configured websites: {len(WEBSITE_CONFIGS)}")

    countries = set()
    rss_count = 0
    html_count = 0

    for domain, config in WEBSITE_CONFIGS.items():
        countries.add(config["country"])
        if config["type"] == "rss":
            rss_count += 1
        elif config["type"] == "html":
            html_count += 1

    print(f"✅ Countries covered: {len(countries)}")
    print(f"✅ RSS feeds: {rss_count}")
    print(f"✅ HTML scrapers: {html_count}")

    # Test 4: HTML parsing (basic test)
    print("\n🔍 Test 4: HTML Parsing")
    test_html = """
    <html>
        <head><title>Test News</title></head>
        <body>
            <article>
                <h2>India Student News</h2>
                <p>This is news about Indian students studying abroad.</p>
                <a href="/article/1">Read more</a>
            </article>
            <article>
                <h3>Canada University Updates</h3>
                <p>Canadian universities announce new programs.</p>
                <img src="/image1.jpg" alt="University">
            </article>
        </body>
    </html>
    """

    try:
        articles = extract_articles_from_html(test_html, "https://test.com", "test.com", 2)
        print(f"✅ HTML parsing extracted {len(articles)} articles")
        for article in articles:
            print(f"  - {article.get('title', 'No title')}")
    except Exception as e:
        print(f"❌ HTML parsing error: {e}")

    # Test 5: System requirements
    print("\n🔧 Test 5: System Check")

    # Check Python version
    python_version = sys.version_info
    if python_version >= (3, 8):
        print(f"✅ Python {python_version.major}.{python_version.minor} - OK")
    else:
        print(f"❌ Python {python_version.major}.{python_version.minor} - Requires 3.8+")

    # Check required modules
    required_modules = [
        ('aiohttp', 'aiohttp'),
        ('feedparser', 'feedparser'),
        ('bs4', 'beautifulsoup4'),
        ('fastapi', 'fastapi'),
        ('uvicorn', 'uvicorn')
    ]

    for import_name, display_name in required_modules:
        try:
            __import__(import_name)
            print(f"✅ {display_name} - Installed")
        except ImportError:
            print(f"❌ {display_name} - Missing")

    # Check Google Cloud (optional)
    try:
        import google.cloud.storage
        print("✅ Google Cloud Storage - Available")
    except ImportError:
        print("⚠️  Google Cloud Storage - Not installed (optional)")

    print("\n" + "=" * 50)
    print("🎉 Scraper test completed!")
    print("\n📋 Next Steps:")
    print("1. Run: python3 setup_cloud.py")
    print("2. Configure Google Cloud credentials")
    print("3. Run: python3 setup_bucket.py")
    print("4. Start server: python3 main.py")
    print("\n📖 See SETUP_GUIDE.md for detailed instructions")

if __name__ == "__main__":
    asyncio.run(test_basic_functionality())
