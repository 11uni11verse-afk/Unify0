import asyncio
import hashlib
import json
import os
import re
import ssl
from datetime import datetime, timezone, timedelta
from typing import Any, Dict, List, Optional, Tuple
from urllib.parse import urljoin, urlparse

import aiohttp
import feedparser  # type: ignore
from bs4 import BeautifulSoup  # type: ignore
from dateutil import parser as date_parser  # type: ignore
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# Google Cloud imports
try:
    from google.cloud import storage
    from google.oauth2 import service_account
    GOOGLE_CLOUD_AVAILABLE = True
except ImportError:
    GOOGLE_CLOUD_AVAILABLE = False

# Cloud Storage Configuration
GCS_BUCKET_NAME = os.getenv("GCS_BUCKET_NAME", "unifyo-news-images")
GCS_CREDENTIALS_PATH = os.getenv("GCS_CREDENTIALS_PATH", "credentials.json")

def init_cloud_storage():
    """Initialize Google Cloud Storage client"""
    if not GOOGLE_CLOUD_AVAILABLE:
        return None

    try:
        if os.path.exists(GCS_CREDENTIALS_PATH):
            credentials = service_account.Credentials.from_service_account_file(GCS_CREDENTIALS_PATH)
            client = storage.Client(credentials=credentials)
        else:
            # Use default credentials (for deployed environments)
            client = storage.Client()

        return client
    except Exception as e:
        print(f"Failed to initialize Cloud Storage: {e}")
        return None

async def download_and_upload_image(image_url: str, article_id: str, retries: int = 2) -> Optional[str]:
    """Download image from URL and upload to cloud storage with retry mechanism"""
    if not GOOGLE_CLOUD_AVAILABLE or not image_url:
        return image_url

    # Skip if already uploaded to our cloud storage
    if "storage.googleapis.com" in image_url and GCS_BUCKET_NAME in image_url:
        return image_url

    for attempt in range(retries):
        try:
            client = init_cloud_storage()
            if not client:
                return image_url

            bucket = client.bucket(GCS_BUCKET_NAME)

            # Create SSL context that ignores certificate errors
            ssl_context = ssl.create_default_context()
            ssl_context.check_hostname = False
            ssl_context.verify_mode = ssl.CERT_NONE

            connector = aiohttp.TCPConnector(limit=10, ssl=ssl_context)

            # Download image with timeout
            async with aiohttp.ClientSession(
                connector=connector,
                headers={'User-Agent': 'UnifyO Image Scraper/1.0'}
            ) as session:
                async with session.get(image_url, timeout=15) as response:
                    if response.status != 200:
                        return image_url

                    image_data = await response.read()
                    content_type = response.headers.get('content-type', 'image/jpeg')

                    # Validate image size (max 5MB)
                    if len(image_data) > 5 * 1024 * 1024:
                        print(f"Image too large: {len(image_data)} bytes")
                        return image_url

            # Generate cloud storage path
            ext = '.jpg'
            if 'png' in content_type:
                ext = '.png'
            elif 'gif' in content_type:
                ext = '.gif'
            elif 'webp' in content_type:
                ext = '.webp'

            cloud_path = f"news-images/{article_id}{ext}"

            # Upload to cloud storage
            blob = bucket.blob(cloud_path)
            blob.upload_from_string(image_data, content_type=content_type)
            blob.make_public()

            return blob.public_url

        except Exception as e:
            print(f"Attempt {attempt + 1} failed to upload image {image_url}: {e}")
            if attempt < retries - 1:
                await asyncio.sleep(1)
                continue

    return image_url
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
os.makedirs(DATA_DIR, exist_ok=True)
NEWS_JSON = os.path.join(DATA_DIR, "news.json")
SITES_JSON = os.path.join(BASE_DIR, "sites.json")
COUNTRIES_JSON = os.path.join(BASE_DIR, "countries.json")

# Country mapping for news categorization
COUNTRY_KEYWORDS = {
    "India": ["india", "indian", "delhi", "mumbai", "bangalore", "chennai", "pune", "hyderabad", "kolkata"],
    "Canada": ["canada", "canadian", "toronto", "vancouver", "montreal", "ottawa", "calgary", "edmonton"],
    "United States": ["usa", "united states", "america", "american", "us ", "new york", "los angeles", "chicago", "san francisco", "washington dc", "visa", "dhs", "state department"],
    "United Kingdom": ["uk", "united kingdom", "britain", "english", "london", "manchester", "birmingham", "glasgow"],
    "Australia": ["australia", "australian", "sydney", "melbourne", "brisbane", "perth", "adelaide"],
    "New Zealand": ["new zealand", "zealand", "auckland", "wellington", "christchurch", "dunedin"],
    "Germany": ["germany", "german", "berlin", "munich", "frankfurt", "hamburg", "cologne"],
    "France": ["france", "french", "paris", "lyon", "marseille", "toulouse", "nice"],
    "Ireland": ["ireland", "irish", "dublin", "cork", "galway", "limerick"],
    "Netherlands": ["netherlands", "dutch", "amsterdam", "rotterdam", "the hague", "utrecht"],
    "Japan": ["japan", "japanese", "tokyo", "osaka", "kyoto", "yokohama"],
    "South Korea": ["korea", "south korea", "korean", "seoul", "busan", "incheon"],
    "China": ["china", "chinese", "beijing", "shanghai", "guangzhou", "shenzhen"],
    "Poland": ["poland", "polish", "warsaw", "krakow", "gdansk", "wroclaw"],
    "Italy": ["italy", "italian", "rome", "milan", "florence", "venice"],
    "Spain": ["spain", "spanish", "madrid", "barcelona", "valencia", "seville"],
    "Sweden": ["sweden", "swedish", "stockholm", "gothenburg", "malmo"],
    "Finland": ["finland", "finnish", "helsinki", "espoo", "tampere"],
    "Portugal": ["portugal", "portuguese", "lisbon", "porto", "braga"],
    "Belgium": ["belgium", "belgian", "brussels", "antwerp", "ghent"],
    "Switzerland": ["switzerland", "swiss", "zurich", "geneva", "basel"],
    "Hungary": ["hungary", "hungarian", "budapest", "debrecen", "szeged"],
    "Lithuania": ["lithuania", "lithuanian", "vilnius", "kaunas"],
    "Denmark": ["denmark", "danish", "copenhagen", "aarhus", "odense"],
    "Russia": ["russia", "russian", "moscow", "saint petersburg", "kazan"],
    "Kyrgyzstan": ["kyrgyzstan", "kyrgyz", "bishkek"],
    "Georgia": ["georgia", "tbilisi", "batumi"],
    "Kazakhstan": ["kazakhstan", "kazakh", "almaty", "nur-sultan"],
    "Philippines": ["philippines", "philippine", "manila", "cebu"],
    "Bangladesh": ["bangladesh", "dhaka", "chittagong"],
    "Uzbekistan": ["uzbekistan", "uzbek", "tashkent"],
    "Armenia": ["armenia", "armenian", "yerevan"],
    "UAE": ["uae", "dubai", "abu dhabi", "sharjah"],
    "Malaysia": ["malaysia", "malaysian", "kuala lumpur", "penang"],
    "Taiwan": ["taiwan", "taipei", "kaohsiung"],
    "Cyprus": ["cyprus", "nicosia", "limassol"],
    "Mauritius": ["mauritius", "port louis"],
    "Ukraine": ["ukraine", "ukrainian", "kyiv", "kharkiv"],
    "Brazil": ["brazil", "brazilian", "sao paulo", "rio de janeiro"],
    "Chile": ["chile", "chilean", "santiago"],
    "Argentina": ["argentina", "buenos aires", "cordoba"],
    "Mexico": ["mexico", "mexican", "mexico city", "guadalajara"]
}

# Website configurations with country mapping
WEBSITE_CONFIGS = {
    # Global sources
    "thepienews.com": {"country": "Global", "type": "rss", "url": "https://thepienews.com/feed/"},
    "timeshighereducation.com": {"country": "Global", "type": "rss", "url": "https://www.timeshighereducation.com/rss"},
    "highereddive.com": {"country": "Global", "type": "rss", "url": "https://www.highereddive.com/feeds/news/"},
    "nafsa.org": {"country": "Global", "type": "html", "url": "https://www.nafsa.org/news-and-latest-news"},
    "acenet.edu": {"country": "Global", "type": "html", "url": "https://www.acenet.edu/News-Room/Pages/default.aspx"},
    "monitor.icef.com": {"country": "Global", "type": "html", "url": "https://monitor.icef.com/"},
    "insidehighered.com": {"country": "Global", "type": "rss", "url": "https://www.insidehighered.com/rss.xml"},
    "migrationpolicy.org": {"country": "Global", "type": "html", "url": "https://www.migrationpolicy.org/news"},
    "eaie.org": {"country": "Global", "type": "html", "url": "https://www.eaie.org/news.html"},
    "internationalstudent.com": {"country": "Global", "type": "html", "url": "https://www.internationalstudent.com/news/"},

    # India
    "timesofindia.indiatimes.com/education/study-abroad": {"country": "India", "type": "rss", "url": "https://timesofindia.indiatimes.com/education/study-abroad/rssfeeds/"},
    "indiatoday.in/education-today/study-abroad": {"country": "India", "type": "rss", "url": "https://www.indiatoday.in/education-today/study-abroad/rss.xml"},
    "indianexpress.com/article/education/study-abroad": {"country": "India", "type": "html", "url": "https://indianexpress.com/section/education/"},
    "economictimes.com/nri/study": {"country": "India", "type": "rss", "url": "https://economictimes.indiatimes.com/nri/study/rssfeeds/"},
    "thehindu.com/education/study-abroad": {"country": "India", "type": "rss", "url": "https://www.thehindu.com/education/study-abroad/feeder/default.rss"},
    "idp.com/india": {"country": "India", "type": "html", "url": "https://www.idp.com/india/news/"},
    "yocket.com/blog": {"country": "India", "type": "html", "url": "https://yocket.com/blog"},
    "edwiseinternational.com/blogs": {"country": "India", "type": "html", "url": "https://www.edwiseinternational.com/blog/"},
    "studies-overseas.com": {"country": "India", "type": "html", "url": "https://www.studies-overseas.com/blog/"},
    "leapscholar.com": {"country": "India", "type": "html", "url": "https://blog.leapscholar.com/"},

    # Canada
    "cbc.ca/news/canada": {"country": "Canada", "type": "rss", "url": "https://www.cbc.ca/cmlink/rss-canada"},
    "educanada.ca": {"country": "Canada", "type": "html", "url": "https://www.educanada.ca/news-and-events/"},
    "canada.ca/en/immigration-refugees-citizenship": {"country": "Canada", "type": "html", "url": "https://www.canada.ca/en/immigration-refugees-citizenship/news.html"},
    "ca.news.yahoo.com": {"country": "Canada", "type": "rss", "url": "https://ca.news.yahoo.com/rss/"},
    "istudentcanada.ca/category/blog": {"country": "Canada", "type": "html", "url": "https://istudentcanada.ca/category/blog/"},

    # United States
    "ed.gov/about/news": {"country": "United States", "type": "html", "url": "https://www.ed.gov/news"},
    "dhs.gov/news": {"country": "United States", "type": "html", "url": "https://www.dhs.gov/news-releases"},
    "travel.state.gov/content/travel/en/News/visas-news.html": {"country": "United States", "type": "html", "url": "https://travel.state.gov/content/travel/en/News/visas-news.html"},
    "studyusa.com": {"country": "United States", "type": "html", "url": "https://www.studyusa.com/en/articles"},
    "washingtonpost.com/education": {"country": "United States", "type": "rss", "url": "https://www.washingtonpost.com/education/feed/"},

    # United Kingdom
    "ukcisa.org.uk": {"country": "United Kingdom", "type": "rss", "url": "https://www.ukcisa.org.uk/rss"},
    "theguardian.com/education/internationalstudents": {"country": "United Kingdom", "type": "rss", "url": "https://www.theguardian.com/education/internationalstudents/rss"},
    "gov.uk/student-visa": {"country": "United Kingdom", "type": "html", "url": "https://www.gov.uk/student-visa"},
    "the-independent.com/news/uk/home-news": {"country": "United Kingdom", "type": "rss", "url": "https://www.independent.co.uk/news/uk/home-news/rss"},
    "commonslibrary.parliament.uk": {"country": "United Kingdom", "type": "html", "url": "https://commonslibrary.parliament.uk/research-briefings/"},
    "fragomen.com/insights": {"country": "United Kingdom", "type": "html", "url": "https://www.fragomen.com/insights"},
    "datahe.co.uk": {"country": "United Kingdom", "type": "html", "url": "https://www.datahe.co.uk/blog/"},
    "studyin-uk.com": {"country": "United Kingdom", "type": "html", "url": "https://www.studyin-uk.com/blog/"},

    # Australia
    "studyaustralia.gov.au": {"country": "Australia", "type": "rss", "url": "https://www.studyinaustralia.gov.au/rss"},
    "thekoalanews.com": {"country": "Australia", "type": "html", "url": "https://thekoalanews.com/"},
    "theguardian.com/australia-news/australian-universities": {"country": "Australia", "type": "rss", "url": "https://www.theguardian.com/australia-news/australian-universities/rss"},
    "timeshighereducation.com/academic/news/australia-and-new-zealand": {"country": "Australia", "type": "html", "url": "https://www.timeshighereducation.com/academic/news/australia-and-new-zealand"},
    "internationaleducation.gov.au/news": {"country": "Australia", "type": "html", "url": "https://www.internationaleducation.gov.au/news"},
    "vu.edu.au/about-vu/news-events/vu-blog": {"country": "Australia", "type": "html", "url": "https://www.vu.edu.au/about-vu/news-events/vu-blog"},

    # New Zealand
    "immigration.govt.nz": {"country": "New Zealand", "type": "html", "url": "https://www.immigration.govt.nz/news"},
    "studyinnewzealand.govt.nz": {"country": "New Zealand", "type": "html", "url": "https://www.studyinnewzealand.govt.nz/news/"},
    "nzherald.co.nz/education": {"country": "New Zealand", "type": "html", "url": "https://www.nzherald.co.nz/education/"},

    # Germany
    "daad.de/en": {"country": "Germany", "type": "rss", "url": "https://www.daad.de/en/rss/"},
    "studying-in-germany.org": {"country": "Germany", "type": "html", "url": "https://www.studying-in-germany.org/news/"},
    "study-in-germany.com/en": {"country": "Germany", "type": "html", "url": "https://www.study-in-germany.com/en/news/"},
    "dw.com/en/top-stories/education": {"country": "Germany", "type": "rss", "url": "https://www.dw.com/en/top-stories/education/rss"},

    # France
    "campusfrance.org/en": {"country": "France", "type": "rss", "url": "https://www.campusfrance.org/en/rss"},
    "usa.campusfrance.org": {"country": "France", "type": "html", "url": "https://usa.campusfrance.org/en/news"},
    "lemonde.fr/education": {"country": "France", "type": "html", "url": "https://www.lemonde.fr/education/"},

    # Ireland
    "blog.educationinireland.com": {"country": "Ireland", "type": "rss", "url": "https://blog.educationinireland.com/feed/"},
    "ireland.ie/en/study": {"country": "Ireland", "type": "html", "url": "https://www.ireland.ie/en/study/"},
    "irishimmigration.ie/coming-to-study-in-ireland": {"country": "Ireland", "type": "html", "url": "https://www.irishimmigration.ie/coming-to-study-in-ireland/"},
    "educationireland.net": {"country": "Ireland", "type": "html", "url": "https://www.educationireland.net/blog/"},
    "study-in-ireland.com": {"country": "Ireland", "type": "html", "url": "https://www.study-in-ireland.com/blog/"},
    "dublinisc.com/blog": {"country": "Ireland", "type": "html", "url": "https://www.dublinisc.com/blog/"},
    "go.study/blog": {"country": "Ireland", "type": "html", "url": "https://go.study/blog/"},
    "canapprove.com/blog": {"country": "Ireland", "type": "html", "url": "https://www.canapprove.com/blog/"},
    "hsinet.org/post": {"country": "Ireland", "type": "html", "url": "https://www.hsinet.org/post/"},

    # Netherlands
    "nuffic.nl/en/news": {"country": "Netherlands", "type": "rss", "url": "https://www.nuffic.nl/en/news/rss"},
    "iamexpat.nl/dutch-news-articles": {"country": "Netherlands", "type": "html", "url": "https://www.iamexpat.nl/career/jobs/dutch-news-articles"},
    "dutchnews.nl": {"country": "Netherlands", "type": "rss", "url": "https://www.dutchnews.nl/feed/"},
    "studyinholland.nl": {"country": "Netherlands", "type": "html", "url": "https://www.studyinholland.nl/news"},

    # Japan
    "studyinjapan.go.jp/en/news": {"country": "Japan", "type": "rss", "url": "https://www.studyinjapan.go.jp/en/news/rss"},
    "jasso.go.jp/eng/main.do": {"country": "Japan", "type": "html", "url": "https://www.jasso.go.jp/en/news/"},
    "japantimes.co.jp/news": {"country": "Japan", "type": "html", "url": "https://www.japantimes.co.jp/news/"},
    "mext.go.jp/en/news": {"country": "Japan", "type": "html", "url": "https://www.mext.go.jp/en/news/"},

    # South Korea
    "studyinkorea.go.kr": {"country": "South Korea", "type": "rss", "url": "https://www.studyinkorea.go.kr/rss"},
    "niied.go.kr/eng/main.do": {"country": "South Korea", "type": "html", "url": "https://www.niied.go.kr/eng/main.do"},
    "gksscholarship.com": {"country": "South Korea", "type": "html", "url": "https://www.gksscholarship.com/blog/"},
    "gooverseas.com/blog": {"country": "South Korea", "type": "html", "url": "https://www.gooverseas.com/blog/"},
    "studyinkorea.wordpress.com": {"country": "South Korea", "type": "html", "url": "https://studyinkorea.wordpress.com/"},

    # China
    "campuschina.org": {"country": "China", "type": "html", "url": "https://www.campuschina.org/news/"},
    "chinesescholarshipcouncil.com": {"country": "China", "type": "html", "url": "https://www.chinesescholarshipcouncil.com/news.html"},
    "fm.china-embassy.gov.cn/eng/xwdt": {"country": "China", "type": "html", "url": "https://www.fm.china-embassy.gov.cn/eng/xwdt/"},
    "hec.gov.pk/site/CGSP": {"country": "China", "type": "html", "url": "https://www.hec.gov.pk/site/CGSP"},

    # Poland
    "studyinpoland.pl/en/news": {"country": "Poland", "type": "html", "url": "https://www.studyinpoland.pl/en/news/"},
    "study.gov.pl": {"country": "Poland", "type": "html", "url": "https://www.study.gov.pl/en/news/"},
    "notesfrompoland.com": {"country": "Poland", "type": "html", "url": "https://notesfrompoland.com/"},
    "nawa.gov.pl/en": {"country": "Poland", "type": "html", "url": "https://nawa.gov.pl/en/news/"},

    # Italy
    "universitaly.it": {"country": "Italy", "type": "html", "url": "https://www.universitaly.it/index.php/news"},
    "esteri.it/en/opportunita/borse-di-studio": {"country": "Italy", "type": "html", "url": "https://www.esteri.it/en/opportunita/borse-di-studio"},
    "en.unito.it": {"country": "Italy", "type": "html", "url": "https://www.en.unito.it/news"},
    "unimi.it/en": {"country": "Italy", "type": "html", "url": "https://www.unimi.it/en/news"},
    "ansa.it/english/": {"country": "Italy", "type": "html", "url": "https://www.ansa.it/english/"},

    # Spain
    "harbour.space/news": {"country": "Spain", "type": "html", "url": "https://harbour.space/news"},
    "study.eu/country/spain": {"country": "Spain", "type": "html", "url": "https://www.study.eu/country/spain"},
    "studying-in-spain.com": {"country": "Spain", "type": "html", "url": "https://www.studying-in-spain.com/news/"},
    "sepie.es/en": {"country": "Spain", "type": "html", "url": "https://www.sepie.es/en/news"},
    "english.elpais.com": {"country": "Spain", "type": "html", "url": "https://english.elpais.com/"},

    # Sweden
    "studyinsweden.se": {"country": "Sweden", "type": "rss", "url": "https://www.studyinsweden.se/rss"},
    "migrationsverket.se/en": {"country": "Sweden", "type": "html", "url": "https://www.migrationsverket.se/en/News-and-statistics/News-archive"},
    "thelocal.se/tag/study-in-sweden": {"country": "Sweden", "type": "html", "url": "https://www.thelocal.se/tag/study-in-sweden"},
    "riksrevisionen.se/en/news-archive": {"country": "Sweden", "type": "html", "url": "https://www.riksrevisionen.se/en/news-archive/"},
    "si.se/en": {"country": "Sweden", "type": "html", "url": "https://www.si.se/en/"},

    # Finland
    "studyinfinland.fi": {"country": "Finland", "type": "rss", "url": "https://www.studyinfinland.fi/rss"},
    "opintopolku.fi/konfo/en": {"country": "Finland", "type": "html", "url": "https://opintopolku.fi/konfo/en/news"},
    "enterfinland.fi/eservices": {"country": "Finland", "type": "html", "url": "https://www.enterfinland.fi/eservices/news"},
    "helsinkitimes.fi": {"country": "Finland", "type": "html", "url": "https://www.helsinkitimes.fi/"},
    "oph.fi/en": {"country": "Finland", "type": "html", "url": "https://www.oph.fi/en/news"},

    # Portugal
    "theportugalnews.com/news": {"country": "Portugal", "type": "html", "url": "https://www.theportugalnews.com/news"},
    "study-research.pt": {"country": "Portugal", "type": "html", "url": "https://www.study-research.pt/en/news/"},
    "ulisboa.pt/en/international-students": {"country": "Portugal", "type": "html", "url": "https://www.ulisboa.pt/en/international-students/news"},

    # Belgium
    "feather-insurance.com/en-be/blog": {"country": "Belgium", "type": "html", "url": "https://www.feather-insurance.com/en-be/blog"},
    "elabedu.eu/blog": {"country": "Belgium", "type": "html", "url": "https://www.elabedu.eu/blog/"},
    "studyinbelgium.be": {"country": "Belgium", "type": "html", "url": "https://www.studyinbelgium.be/en/news"},
    "dofi.ibz.be/en": {"country": "Belgium", "type": "html", "url": "https://www.dofi.ibz.be/en/news"},
    "brusselstimes.com": {"country": "Belgium", "type": "html", "url": "https://www.brusselstimes.com/"},

    # Switzerland
    "thelocal.ch/tag/studying-in-switzerland": {"country": "Switzerland", "type": "html", "url": "https://www.thelocal.ch/tag/studying-in-switzerland"},
    "swissinfo.ch/eng/education": {"country": "Switzerland", "type": "html", "url": "https://www.swissinfo.ch/eng/education"},
    "eda.admin.ch": {"country": "Switzerland", "type": "html", "url": "https://www.eda.admin.ch/eda/en/home/dfae/foreign-policy-migration/studying-working-schweiz/news.html"},
    "sbfi.admin.ch/sbfi/en": {"country": "Switzerland", "type": "html", "url": "https://www.sbfi.admin.ch/sbfi/en/home/news.html"},
    "swissuniversities.ch/en": {"country": "Switzerland", "type": "html", "url": "https://www.swissuniversities.ch/en/news/"},

    # Hungary
    "studyinhungary.hu": {"country": "Hungary", "type": "html", "url": "https://www.studyinhungary.hu/news.html"},
    "study.eu/country/hungary": {"country": "Hungary", "type": "html", "url": "https://www.study.eu/country/hungary"},
    "tpf.hu/en": {"country": "Hungary", "type": "html", "url": "https://www.tpf.hu/en/news"},
    "dailynewshungary.com/category/education": {"country": "Hungary", "type": "html", "url": "https://dailynewshungary.com/category/education/"},

    # Lithuania
    "studyabroad-news.metaapply.io": {"country": "Lithuania", "type": "html", "url": "https://studyabroad-news.metaapply.io/"},
    "studyin.lt": {"country": "Lithuania", "type": "html", "url": "https://www.studyin.lt/en/news/"},
    "lrt.lt/en": {"country": "Lithuania", "type": "html", "url": "https://www.lrt.lt/en/news"},
    "smpf.lt/en": {"country": "Lithuania", "type": "html", "url": "https://www.smpf.lt/en/news"},

    # Denmark
    "studyindenmark.dk": {"country": "Denmark", "type": "html", "url": "https://www.studyindenmark.dk/news"},
    "denmark.dk/studying-in-denmark": {"country": "Denmark", "type": "html", "url": "https://denmark.dk/studying-in-denmark/news"},
    "dans.stads.dk": {"country": "Denmark", "type": "html", "url": "https://dans.stads.dk/en/news/"},
    "thelocal.dk": {"country": "Denmark", "type": "html", "url": "https://www.thelocal.dk/"},

    # Russia
    "ruseducation.in": {"country": "Russia", "type": "html", "url": "https://www.ruseducation.in/blog/"},
    "meduza.io/en": {"country": "Russia", "type": "html", "url": "https://meduza.io/en/news"},
    "studyinrussia.ru/en": {"country": "Russia", "type": "html", "url": "https://www.studyinrussia.ru/en/news/"},
    "themoscowtimes.com/topics/education": {"country": "Russia", "type": "html", "url": "https://www.themoscowtimes.com/topics/education"},

    # Kyrgyzstan
    "future-mbbs.com": {"country": "Kyrgyzstan", "type": "html", "url": "https://www.future-mbbs.com/mbbs-in-kyrgyzstan"},
    "theeducationabroad.com/blog": {"country": "Kyrgyzstan", "type": "html", "url": "https://www.theeducationabroad.com/blog/"},
    "acadfly.com/blogs": {"country": "Kyrgyzstan", "type": "html", "url": "https://www.acadfly.com/blogs/"},
    "imuedukg.com/blog": {"country": "Kyrgyzstan", "type": "html", "url": "https://imuedukg.com/blog/"},
    "edu.gov.kg/en": {"country": "Kyrgyzstan", "type": "html", "url": "https://edu.gov.kg/en/news/"},
    "24.kg/english": {"country": "Kyrgyzstan", "type": "html", "url": "https://24.kg/english/"},

    # Georgia
    "selectyouruniversity.com/blog": {"country": "Georgia", "type": "html", "url": "https://www.selectyouruniversity.com/blog/"},
    "collegedunia.com/georgia": {"country": "Georgia", "type": "html", "url": "https://collegedunia.com/georgia"},
    "studyin.gov.ge": {"country": "Georgia", "type": "html", "url": "https://www.studyin.gov.ge/en/news"},
    "agenda.ge/en": {"country": "Georgia", "type": "html", "url": "https://agenda.ge/en/"},

    # Kazakhstan
    "indembastana.gov.in/page": {"country": "Kazakhstan", "type": "html", "url": "https://indembastana.gov.in/page/education"},
    "health.pitt.edu/news": {"country": "Kazakhstan", "type": "html", "url": "https://www.health.pitt.edu/news"},
    "farabi.university/?lang=en": {"country": "Kazakhstan", "type": "html", "url": "https://farabi.university/?lang=en"},
    "un.org/en/academic-impact": {"country": "Kazakhstan", "type": "html", "url": "https://www.un.org/en/academic-impact/"},
    "educationmalaysia.gov.my": {"country": "Kazakhstan", "type": "html", "url": "https://www.educationmalaysia.gov.my/news/"},
    "studyin.kz/en": {"country": "Kazakhstan", "type": "html", "url": "https://studyin.kz/en/news/"},
    "astanatimes.com": {"country": "Kazakhstan", "type": "html", "url": "https://astanatimes.com/"},
    "thepienews.com": {"country": "Kazakhstan", "type": "rss", "url": "https://thepienews.com/feed/"},

    # Philippines
    "tribuneindia.com/news/business": {"country": "Philippines", "type": "html", "url": "https://www.tribuneindia.com/news/business"},
    "manilatimes.net": {"country": "Philippines", "type": "html", "url": "https://www.manilatimes.net/"},
    "cm.upm.edu.ph": {"country": "Philippines", "type": "html", "url": "https://cm.upm.edu.ph/news/"},
    "ched.gov.ph": {"country": "Philippines", "type": "html", "url": "https://ched.gov.ph/news/"},
    "philstar.com": {"country": "Philippines", "type": "html", "url": "https://www.philstar.com/"},

    # Bangladesh
    "eklavyaoverseas.com/mbbs-in-bangladesh": {"country": "Bangladesh", "type": "html", "url": "https://www.eklavyaoverseas.com/mbbs-in-bangladesh"},
    "rmcedu.com": {"country": "Bangladesh", "type": "html", "url": "https://www.rmcedu.com/blog/"},
    "sangenbd.com/study-abroad/bangladesh": {"country": "Bangladesh", "type": "html", "url": "https://www.sangenbd.com/study-abroad/bangladesh"},
    "nvfoundation.com": {"country": "Bangladesh", "type": "html", "url": "https://www.nvfoundation.com/blog/"},
    "studyinbangladesh.com.bd": {"country": "Bangladesh", "type": "html", "url": "https://studyinbangladesh.com.bd/news/"},
    "ugc-universities.gov.bd": {"country": "Bangladesh", "type": "html", "url": "https://www.ugc-universities.gov.bd/"},
    "thedailystar.net/education": {"country": "Bangladesh", "type": "html", "url": "https://www.thedailystar.net/education"},

    # Uzbekistan
    "future-mbbs.com/mbbs-in-uzbekistan": {"country": "Uzbekistan", "type": "html", "url": "https://www.future-mbbs.com/mbbs-in-uzbekistan"},
    "help-abroad.in/mbbs-in-uzbekistan": {"country": "Uzbekistan", "type": "html", "url": "https://www.help-abroad.in/mbbs-in-uzbekistan"},
    "themdhouse.com/blog": {"country": "Uzbekistan", "type": "html", "url": "https://www.themdhouse.com/blog/"},
    "fmiph.uz": {"country": "Uzbekistan", "type": "html", "url": "https://fmiph.uz/en/news/"},
    "studyin.uz": {"country": "Uzbekistan", "type": "html", "url": "https://www.studyin.uz/en/news/"},

    # Armenia
    "eoiyerevan.gov.in": {"country": "Armenia", "type": "html", "url": "https://eoiyerevan.gov.in/news/"},
    "ysmu.net": {"country": "Armenia", "type": "html", "url": "https://ysmu.net/en/news"},
    "eklavyaoverseas.com/mbbs-in-armenia": {"country": "Armenia", "type": "html", "url": "https://www.eklavyaoverseas.com/mbbs-in-armenia"},
    "ariu.org": {"country": "Armenia", "type": "html", "url": "https://ariu.org/news/"},
    "tutelagestudy.com/destinations": {"country": "Armenia", "type": "html", "url": "https://www.tutelagestudy.com/destinations/armenia"},
    "studyin.am": {"country": "Armenia", "type": "html", "url": "https://studyin.am/en/news"},
    "armenpress.am/eng": {"country": "Armenia", "type": "html", "url": "https://armenpress.am/eng/"},

    # UAE
    "study-in-uae.com": {"country": "UAE", "type": "html", "url": "https://www.study-in-uae.com/blog/"},
    "gbs.ac.ae/blog": {"country": "UAE", "type": "html", "url": "https://www.gbs.ac.ae/blog/"},
    "siecindia.com/blogs": {"country": "UAE", "type": "html", "url": "https://www.siecindia.com/blogs/"},
    "qub.ac.uk/student-blog/uae": {"country": "UAE", "type": "html", "url": "https://www.qub.ac.uk/student-blog/uae/"},
    "studyindubai.ae": {"country": "UAE", "type": "html", "url": "https://www.studyindubai.ae/blog/"},
    "khaleejtimes.com/education": {"country": "UAE", "type": "html", "url": "https://www.khaleejtimes.com/education"},

    # Malaysia
    "educationmalaysia.gov.my": {"country": "Malaysia", "type": "html", "url": "https://www.educationmalaysia.gov.my/news/"},
    "educationmalaysia.gov.my/meet-the-community/mystudyvibe-blog": {"country": "Malaysia", "type": "html", "url": "https://www.educationmalaysia.gov.my/meet-the-community/mystudyvibe-blog/"},
    "studymalaysia.com/international": {"country": "Malaysia", "type": "html", "url": "https://www.studymalaysia.com/international/news"},
    "thestar.com.my/news/nation": {"country": "Malaysia", "type": "html", "url": "https://www.thestar.com.my/news/nation"},
    "curtin.edu.my": {"country": "Malaysia", "type": "html", "url": "https://www.curtin.edu.my/news/"},

    # Taiwan
    "english.moe.gov.tw": {"country": "Taiwan", "type": "html", "url": "https://english.moe.gov.tw/"},
    "studyintaiwan.org": {"country": "Taiwan", "type": "html", "url": "https://www.studyintaiwan.org/news/"},
    "focustaiwan.tw/culture": {"country": "Taiwan", "type": "html", "url": "https://focustaiwan.tw/culture"},
    "taipeitimes.com/News/taiwan": {"country": "Taiwan", "type": "html", "url": "https://www.taipeitimes.com/News/taiwan"},
    "ocac.gov.tw": {"country": "Taiwan", "type": "html", "url": "https://www.ocac.gov.tw/"},

    # Cyprus
    "cyprus-mail.com": {"country": "Cyprus", "type": "html", "url": "https://cyprus-mail.com/"},
    "knews.kathimerini.com.cy/en": {"country": "Cyprus", "type": "html", "url": "https://knews.kathimerini.com.cy/en/"},
    "cwu.edu.tr": {"country": "Cyprus", "type": "html", "url": "https://www.cwu.edu.tr/en/news"},
    "euc.ac.cy/en/student-blog": {"country": "Cyprus", "type": "html", "url": "https://www.euc.ac.cy/en/student-blog/"},
    "ciu.edu.tr/en/news": {"country": "Cyprus", "type": "html", "url": "https://www.ciu.edu.tr/en/news"},
    "studyincyprus.eu": {"country": "Cyprus", "type": "html", "url": "https://studyincyprus.eu/news/"},

    # Mauritius
    "curtin.edu.au/news": {"country": "Mauritius", "type": "html", "url": "https://www.curtin.edu.au/news/"},
    "studies-overseas.com/blogs": {"country": "Mauritius", "type": "html", "url": "https://www.studies-overseas.com/blogs/"},
    "edbmauritius.org": {"country": "Mauritius", "type": "html", "url": "https://edbmauritius.org/news/"},
    "lemauricien.com/en": {"country": "Mauritius", "type": "html", "url": "https://www.lemauricien.com/en/"},

    # Ukraine
    "studyinukraine.gov.ua": {"country": "Ukraine", "type": "html", "url": "https://studyinukraine.gov.ua/en/news/"},
    "visitukraine.today/blog": {"country": "Ukraine", "type": "html", "url": "https://www.visitukraine.today/blog/"},
    "manor.edu/manor-college-joins-international-dictation": {"country": "Ukraine", "type": "html", "url": "https://www.manor.edu/manor-college-joins-international-dictation"},
    "kyivpost.com": {"country": "Ukraine", "type": "html", "url": "https://www.kyivpost.com/"},

    # Brazil
    "gov.br/mre/en/subjects/culture-and-education": {"country": "Brazil", "type": "html", "url": "https://www.gov.br/mre/en/subjects/culture-and-education"},
    "studyinbrazil.com.br": {"country": "Brazil", "type": "html", "url": "https://www.studyinbrazil.com.br/news/"},
    "brazilian.report": {"country": "Brazil", "type": "html", "url": "https://brazilian.report/"},

    # Chile
    "uc.cl/en": {"country": "Chile", "type": "html", "url": "https://www.uc.cl/en/news"},
    "studyinchile.cl": {"country": "Chile", "type": "html", "url": "https://www.studyinchile.cl/en/news/"},

    # Argentina
    "batimes.com.ar/news/argentina": {"country": "Argentina", "type": "html", "url": "https://www.batimes.com.ar/news/argentina/"},
    "esim.holafly.com/students": {"country": "Argentina", "type": "html", "url": "https://esim.holafly.com/students"},
    "studyin.ar": {"country": "Argentina", "type": "html", "url": "https://www.studyin.ar/news/"},

    # Mexico
    "flywire.com/resources": {"country": "Mexico", "type": "html", "url": "https://www.flywire.com/resources"},
    "csis.org/analysis": {"country": "Mexico", "type": "html", "url": "https://www.csis.org/analysis"},
    "embamex.sre.gob.mx": {"country": "Mexico", "type": "html", "url": "https://embamex.sre.gob.mx/eua/index.php/en/news"},
    "ampei.org.mx": {"country": "Mexico", "type": "html", "url": "https://www.ampei.org.mx/en/news/"}
}

# Legacy support for old sites.json
try:
    with open(SITES_JSON, "r") as f:
        SITES = json.load(f)

    PRIORITY_FEEDS = SITES["PRIORITY_FEEDS"]
    ADDITIONAL_FEEDS = SITES["ADDITIONAL_FEEDS"]
    ALL_FEEDS = {**PRIORITY_FEEDS, **ADDITIONAL_FEEDS}
except Exception:
    PRIORITY_FEEDS = {}
    ADDITIONAL_FEEDS = {}
    ALL_FEEDS = {}

CACHE_TTL_MINUTES = 15

app = FastAPI(title="UnifyO News Scraper", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def make_id(source: str, link: str, date_iso: str) -> str:
    base = f"{source}|{link}|{date_iso[:10]}"
    return "n_" + hashlib.sha1(base.encode("utf-8")).hexdigest()[:12]


def ensure_iso(dt_str: Optional[str]) -> str:
    if not dt_str:
        return datetime.now(timezone.utc).isoformat()
    try:
        dt = date_parser.parse(dt_str)
        if not dt.tzinfo:
            dt = dt.replace(tzinfo=timezone.utc)
        return dt.isoformat()
    except Exception:
        return datetime.now(timezone.utc).isoformat()


async def fetch_text(session: aiohttp.ClientSession, url: str, timeout: int = 10, retries: int = 3) -> Optional[str]:
    """Fetch text with retry mechanism"""
    for attempt in range(retries):
        try:
            async with session.get(url, timeout=timeout) as resp:
                if resp.status == 200:
                    return await resp.text()
                elif resp.status == 429:  # Rate limited
                    await asyncio.sleep(2 ** attempt)  # Exponential backoff
                    continue
                elif resp.status >= 500:  # Server error, retry
                    await asyncio.sleep(1)
                    continue
                else:
                    return None
        except asyncio.TimeoutError:
            if attempt < retries - 1:
                await asyncio.sleep(1)
                continue
            return None
        except Exception as e:
            print(f"Attempt {attempt + 1} failed for {url}: {e}")
            if attempt < retries - 1:
                await asyncio.sleep(1)
                continue
            return None
    return None
def extract_image_from_content(html: Optional[str]) -> Optional[str]:
    if not html:
        return None
    try:
        soup = BeautifulSoup(html, "html.parser")
        img = soup.find("img")
        if img and img.get("src"):
            return img["src"]
    except Exception:
        return None
    return None


def determine_country_from_content(title: str, description: str, source_url: str) -> str:
    """Determine country from title, description, and source URL"""
    text = f"{title} {description} {source_url}".lower()

    for country, keywords in COUNTRY_KEYWORDS.items():
        if any(keyword in text for keyword in keywords):
            return country

    # Default to Global if no specific country found
    return "Global"

def extract_articles_from_html(html: str, base_url: str, source: str, max_articles: int = 5) -> List[Dict[str, Any]]:
    """Extract articles from HTML content"""
    soup = BeautifulSoup(html, "html.parser")
    articles = []

    # Common article selectors - we'll try multiple patterns
    selectors = [
        "article",
        ".article",
        ".news-item",
        ".post",
        ".entry",
        "h2 a",  # Links in headings
        "h3 a",
        ".card",
        ".item"
    ]

    found_articles = []

    for selector in selectors:
        elements = soup.select(selector)
        for elem in elements:
            if len(found_articles) >= max_articles:
                break

            # Extract title
            title_elem = elem.find(["h1", "h2", "h3", "h4"]) or elem
            title = title_elem.get_text(strip=True) if title_elem else ""

            # Extract link
            link_elem = elem.find("a") or elem if elem.name == "a" else None
            link = link_elem.get("href") if link_elem else ""

            if not title or not link:
                continue

            # Make link absolute
            if link and not link.startswith("http"):
                link = urljoin(base_url, link)

            # Extract description
            desc_elem = elem.find(["p", ".description", ".excerpt", ".summary"])
            description = desc_elem.get_text(strip=True)[:300] if desc_elem else ""

            # Extract image
            img_elem = elem.find("img")
            image = None
            if img_elem:
                img_src = img_elem.get("src") or img_elem.get("data-src")
                if img_src:
                    if not img_src.startswith("http"):
                        img_src = urljoin(base_url, img_src)
                    image = img_src

            # Extract date
            date_elem = elem.find(["time", ".date", ".published"])
            date_str = date_elem.get_text(strip=True) if date_elem else None
            date_iso = ensure_iso(date_str)

            if title and link:
                article = {
                    "title": title,
                    "link": link,
                    "description": description,
                    "image": image,
                    "date": date_iso,
                    "source": source
                }
                found_articles.append(article)

        if found_articles:
            break

    # Convert to normalized format
    for article in found_articles[:max_articles]:
        articles.append(normalize_entry(source, type('Entry', (), article)()))

    return articles

def normalize_entry(source: str, entry: Any) -> Dict[str, Any]:
    title = getattr(entry, "title", "") or ""
    link = getattr(entry, "link", "") or ""
    description = getattr(entry, "description", "") or getattr(entry, "summary", "") or ""
    date_str = getattr(entry, "date", "") or getattr(entry, "published", "") or getattr(entry, "updated", "") or ""
    content_html = getattr(entry, "contentHTML", "") or getattr(entry, "content", "")

    image = getattr(entry, "image", None)
    if not image:
        image = extract_image_from_content(content_html) or extract_image_from_content(description)
    if not image:
        image = "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=800&fit=crop"

    date_iso = ensure_iso(date_str)
    excerpt = BeautifulSoup(description, "html.parser").get_text()[:240]

    # Determine country from content
    country = determine_country_from_content(title, description, source)

    # Basic impact heuristic
    tl = title.lower()
    impact = "Medium"
    if any(k in tl for k in ["visa", "scholar", "important", "deadline", "admission", "application"]):
        impact = "High"
    elif any(k in tl for k in ["update", "change", "new", "announcement"]):
        impact = "Medium"
    else:
        impact = "Low"

    # Extract location information
    city = None
    location = None
    if country != "Global":
        text = f"{title} {description}".lower()
        for keyword in COUNTRY_KEYWORDS.get(country, []):
            if keyword in text and len(keyword) > 3:  # Avoid short keywords
                location = keyword.title()
                break

    return {
        "id": make_id(source, link, date_iso),
        "title": title or "Untitled",
        "excerpt": excerpt or (title or "")[:180],
        "link": link,
        "date": date_iso,
        "source": source,
        "category": "Education",
        "image": image,
        "readTime": "3 min read",
        "impact": impact,
        "country": country,
        "city": city,
        "location": location,
        "contentHTML": content_html or description
    }


async def fetch_feed(session: aiohttp.ClientSession, source: str, url: str, limit: int = 6) -> List[Dict[str, Any]]:
    xml = await fetch_text(session, url, timeout=10)
    if not xml:
        return []
    try:
        parsed = feedparser.parse(xml)
        items = parsed.entries[:limit]
        return [normalize_entry(source, e) for e in items]
    except Exception:
        return []


async def fetch_html_source(session: aiohttp.ClientSession, domain: str, config: Dict[str, str], limit: int = 5) -> List[Dict[str, Any]]:
    """Fetch articles from HTML-based sources"""
    url = config["url"]
    html = await fetch_text(session, url, timeout=15)
    if not html:
        return []

    try:
        articles = extract_articles_from_html(html, url, domain, limit)
        return articles
    except Exception as e:
        print(f"Error scraping {domain}: {e}")
        return []


async def scrape_website_config(session: aiohttp.ClientSession, domain: str, config: Dict[str, str], limit: int = 6) -> List[Dict[str, Any]]:
    """Scrape based on website configuration"""
    if config["type"] == "rss":
        return await fetch_feed(session, domain, config["url"], limit)
    elif config["type"] == "html":
        return await fetch_html_source(session, domain, config, limit)
    else:
        return []


async def scrape_all_sources(limit: int = 6, countries: Optional[List[str]] = None) -> List[Dict[str, Any]]:
    """Scrape all configured sources"""
    results: List[Dict[str, Any]] = []
    conn = aiohttp.TCPConnector(limit=20, ttl_dns_cache=300)
    timeout = aiohttp.ClientTimeout(total=15)

    # Create SSL context that ignores certificate errors for testing
    ssl_context = ssl.create_default_context()
    ssl_context.check_hostname = False
    ssl_context.verify_mode = ssl.CERT_NONE

    connector = aiohttp.TCPConnector(limit=20, ttl_dns_cache=300, ssl=ssl_context)

    async with aiohttp.ClientSession(
        connector=connector,
        timeout=timeout,
        headers={
            "User-Agent": "Mozilla/5.0 (compatible; UnifyO Scraper/1.0; +https://unifyo.com)",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate",
            "Connection": "keep-alive",
        }
    ) as session:
        tasks = []
        for domain, config in WEBSITE_CONFIGS.items():
            if countries and config["country"] not in countries and config["country"] != "Global":
                continue
            tasks.append(scrape_website_config(session, domain, config, limit))

        batches = await asyncio.gather(*tasks, return_exceptions=True)
        for b in batches:
            if isinstance(b, list):
                results.extend(b)

    # Remove duplicates and sort by date
    seen_ids = set()
    deduped = []
    for article in results:
        if article["id"] not in seen_ids:
            seen_ids.add(article["id"])
            deduped.append(article)

    deduped.sort(key=lambda a: a.get("date", ""), reverse=True)
    return deduped


# Legacy function for backward compatibility
async def scrape_all(feeds: Dict[str, str], limit: int = 6) -> List[Dict[str, Any]]:
    results: List[Dict[str, Any]] = []
    conn = aiohttp.TCPConnector(limit=16, ttl_dns_cache=300)
    timeout = aiohttp.ClientTimeout(total=12)
    async with aiohttp.ClientSession(connector=conn, timeout=timeout, headers={"User-Agent": "UnifyOBot/1.0"}) as session:
        tasks = [fetch_feed(session, source, url, limit=limit) for source, url in feeds.items()]
        batches = await asyncio.gather(*tasks, return_exceptions=True)
        for b in batches:
            if isinstance(b, list):
                results.extend(b)
    # sort newest first
    results.sort(key=lambda a: a.get("date", ""), reverse=True)
    return results


def load_cached() -> Optional[Dict[str, Any]]:
    if not os.path.exists(NEWS_JSON):
        return None
    try:
        with open(NEWS_JSON, "r") as f:
            data = json.load(f)
        return data
    except Exception:
        return None


def save_cache(articles: List[Dict[str, Any]]) -> None:
    data = {"timestamp": datetime.now(timezone.utc).isoformat(), "articles": articles}
    with open(NEWS_JSON, "w") as f:
        json.dump(data, f)


def cache_is_fresh(ts_iso: str) -> bool:
    try:
        ts = date_parser.parse(ts_iso)
    except Exception:
        return False
    return datetime.now(timezone.utc) - ts < timedelta(minutes=CACHE_TTL_MINUTES)


@app.get("/api/news")
async def get_news(limit: int = 500, country: Optional[str] = None, priority_only: bool = False) -> Dict[str, Any]:
    cached = load_cached()
    if cached and cache_is_fresh(cached.get("timestamp", "")):
        articles = cached.get("articles", [])

        # Filter by country if specified
        if country and country != "All":
            articles = [a for a in articles if a.get("country") == country]

        return {
            "count": min(len(articles), limit),
            "articles": articles[:limit],
            "cached": True,
            "countries": list(set(a.get("country", "Global") for a in articles))
        }

    # Scrape fresh data
    countries_filter = [country] if country and country != "All" else None
    articles = await scrape_all_sources(limit=20, countries=countries_filter)  # Increased from 8 to 20 articles per source

    # Upload images to cloud storage
    if GOOGLE_CLOUD_AVAILABLE:
        for article in articles:
            if article.get("image") and not article["image"].startswith("https://storage.googleapis.com"):
                try:
                    cloud_url = await download_and_upload_image(article["image"], article["id"])
                    if cloud_url:
                        article["image"] = cloud_url
                except Exception as e:
                    print(f"Failed to upload image for article {article['id']}: {e}")

    save_cache(articles)

    # Filter by country if specified
    if country and country != "All":
        articles = [a for a in articles if a.get("country") == country]

    return {
        "count": min(len(articles), limit),
        "articles": articles[:limit],
        "cached": False,
        "countries": list(set(a.get("country", "Global") for a in articles))
    }


from pydantic import BaseModel

class RefreshRequest(BaseModel):
    countries: Optional[List[str]] = None
    upload_images: bool = True

@app.post("/api/news/refresh")
async def refresh_news(request: RefreshRequest) -> Dict[str, Any]:
    print(f"Starting refresh with countries={request.countries}, upload_images={request.upload_images}")
    articles = await scrape_all_sources(limit=20, countries=request.countries)
    print(f"Scraped {len(articles)} articles")

    # Upload images to cloud storage
    if request.upload_images and GOOGLE_CLOUD_AVAILABLE:
        upload_tasks = []
        for article in articles:
            if article.get("image") and not article["image"].startswith("https://storage.googleapis.com"):
                upload_tasks.append(download_and_upload_image(article["image"], article["id"]))

        if upload_tasks:
            cloud_urls = await asyncio.gather(*upload_tasks, return_exceptions=True)
            for i, result in enumerate(cloud_urls):
                if isinstance(result, str):
                    articles[i]["image"] = result

    save_cache(articles)

    return {
        "count": len(articles),
        "articles": articles[:200],
        "cached": False,
        "countries": list(set(a.get("country", "Global") for a in articles))
    }


@app.get("/api/news/countries")
async def get_available_countries() -> Dict[str, List[str]]:
    """Get list of available countries"""
    countries = list(COUNTRY_KEYWORDS.keys())
    countries.insert(0, "Global")  # Add Global as first option
    return {"countries": countries}


@app.get("/api/news/stats")
async def get_news_stats() -> Dict[str, Any]:
    """Get news statistics"""
    cached = load_cached()
    if not cached:
        return {"total_articles": 0, "countries": {}, "sources": {}}

    articles = cached.get("articles", [])

    # Count by country
    countries = {}
    sources = {}

    for article in articles:
        country = article.get("country", "Global")
        source = article.get("source", "Unknown")

        countries[country] = countries.get(country, 0) + 1
        sources[source] = sources.get(source, 0) + 1

    return {
        "total_articles": len(articles),
        "countries": countries,
        "sources": sources,
        "last_updated": cached.get("timestamp")
    }


@app.get("/api/health")
def health() -> Dict[str, str]:
    return {"status": "ok"}


