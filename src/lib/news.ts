export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  link: string;
  date: string;
  source: string;
  category?: string;
  image?: string;
  readTime?: string;
  impact?: 'High' | 'Medium' | 'Low';
  country?: string; // New field for country filtering
  city?: string;    // New field for city filtering
  location?: string; // General location information
  contentHTML?: string; // Raw HTML content from RSS (if available)
}

// Country and city detection patterns
const COUNTRY_PATTERNS: Record<string, RegExp> = {
  'USA': /\b(USA|United States|US|America)\b/i,
  'Canada': /\b(Canada|Canadian)\b/i,
  'UK': /\b(UK|United Kingdom|Britain|England|Scotland|Wales|Northern Ireland)\b/i,
  'Australia': /\b(Australia|Australian)\b/i,
  'New Zealand': /\b(New Zealand|NZ)\b/i,
  'Germany': /\b(Germany|German)\b/i,
  'France': /\b(France|French)\b/i,
  'Ireland': /\b(Ireland|Irish)\b/i,
  'Netherlands': /\b(Netherlands|Dutch|Holland)\b/i,
  'Japan': /\b(Japan|Japanese)\b/i,
  'South Korea': /\b(South Korea|Korea|Korean)\b/i,
  'China': /\b(China|Chinese)\b/i,
  'Poland': /\b(Poland|Polish)\b/i,
  'Italy': /\b(Italy|Italian)\b/i,
  'Spain': /\b(Spain|Spanish)\b/i,
  'Sweden': /\b(Sweden|Swedish)\b/i,
  'Finland': /\b(Finland|Finnish)\b/i,
  'Portugal': /\b(Portugal|Portuguese)\b/i,
  'Belgium': /\b(Belgium|Belgian)\b/i,
  'Switzerland': /\b(Switzerland|Swiss)\b/i,
  'Hungary': /\b(Hungary|Hungarian)\b/i,
  'Lithuania': /\b(Lithuania|Lithuanian)\b/i,
  'Denmark': /\b(Denmark|Danish)\b/i,
  'Russia': /\b(Russia|Russian)\b/i,
  'UAE': /\b(UAE|United Arab Emirates|Dubai|Abu Dhabi)\b/i,
  'Malaysia': /\b(Malaysia|Malaysian)\b/i,
  'Taiwan': /\b(Taiwan|Taiwanese)\b/i,
  'Cyprus': /\b(Cyprus|Cypriot)\b/i,
  'Ukraine': /\b(Ukraine|Ukrainian)\b/i,
  'Brazil': /\b(Brazil|Brazilian)\b/i,
  'Chile': /\b(Chile|Chilean)\b/i,
  'Argentina': /\b(Argentina|Argentinian)\b/i,
  'Mexico': /\b(Mexico|Mexican)\b/i,
};

const CITY_PATTERNS: Record<string, RegExp> = {
  'London': /\bLondon\b/i,
  'Toronto': /\bToronto\b/i,
  'Vancouver': /\bVancouver\b/i,
  'Sydney': /\bSydney\b/i,
  'Melbourne': /\bMelbourne\b/i,
  'Berlin': /\bBerlin\b/i,
  'Paris': /\bParis\b/i,
  'Dublin': /\bDublin\b/i,
  'Amsterdam': /\bAmsterdam\b/i,
  'Tokyo': /\bTokyo\b/i,
  'Seoul': /\bSeoul\b/i,
  'Beijing': /\bBeijing\b/i,
  'Warsaw': /\bWarsaw\b/i,
  'Rome': /\bRome\b/i,
  'Madrid': /\bMadrid\b/i,
  'Stockholm': /\bStockholm\b/i,
  'Helsinki': /\bHelsinki\b/i,
  'Lisbon': /\bLisbon\b/i,
  'Brussels': /\bBrussels\b/i,
  'Zurich': /\bZurich\b/i,
  'Budapest': /\bBudapest\b/i,
  'Vilnius': /\bVilnius\b/i,
  'Copenhagen': /\bCopenhagen\b/i,
  'Moscow': /\bMoscow\b/i,
  'Dubai': /\bDubai\b/i,
  'Kuala Lumpur': /\bKuala Lumpur\b/i,
  'Taipei': /\bTaipei\b/i,
  'Nicosia': /\bNicosia\b/i,
  'Kyiv': /\bKyiv|Kiev\b/i,
  'Sao Paulo': /\bSao Paulo\b/i,
  'Santiago': /\bSantiago\b/i,
  'Buenos Aires': /\bBuenos Aires\b/i,
  'Mexico City': /\bMexico City\b/i,
};

// Function to detect location from text
function detectLocation(text: string): { country?: string; city?: string; location?: string } {
  let country: string | undefined;
  let city: string | undefined;
  
  // Check for countries
  for (const [countryName, pattern] of Object.entries(COUNTRY_PATTERNS)) {
    if (pattern.test(text)) {
      country = countryName;
      break;
    }
  }
  
  // Check for cities
  for (const [cityName, pattern] of Object.entries(CITY_PATTERNS)) {
    if (pattern.test(text)) {
      city = cityName;
      break;
    }
  }
  
  return { country, city, location: city ? `${city}, ${country}` : country };
}

// Replace the single unreliable CORS proxy with multiple reliable options
const CORS_PROXIES = [
  'https://corsproxy.io/?',
  'https://api.codetabs.com/v1/proxy?quest=',
  'https://cors-anywhere.herokuapp.com/',
  'https://api.allorigins.win/raw?url='  // Keep as fallback
];

// Utility: fetch with timeout
async function fetchWithTimeout(resource: string, options: RequestInit & { timeout?: number } = {}): Promise<Response> {
  const { timeout = 1200, ...rest } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(resource, { ...rest, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

// Browser-compatible RSS parser with fast proxy race
async function parseRSSFeed(url: string, timeout: number = 1200): Promise<any[]> {
  const proxyUrls = CORS_PROXIES.map(base => `${base}${encodeURIComponent(url)}`);
  // Start all proxy requests in parallel and take the first successful one
  const controllers: AbortController[] = [];
  try {
    const response: Response = await Promise.any(
      proxyUrls.map(proxyUrl => {
        const controller = new AbortController();
        controllers.push(controller);
        return fetchWithTimeout(proxyUrl, {
          timeout,
          headers: { 'Accept': 'application/rss+xml, application/xml, text/xml, */*' },
          signal: controller.signal
        }).then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
          return res;
        });
      })
    );
    // Abort remaining in-flight requests
    controllers.forEach(c => { try { c.abort(); } catch {} });

    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    const parseError = xmlDoc.querySelector('parsererror');
    if (parseError) throw new Error('RSS parsing error');

    const items = xmlDoc.querySelectorAll('item');
    const articles: any[] = [];
    items.forEach((item) => {
      const title = item.querySelector('title')?.textContent || '';
      const link = item.querySelector('link')?.textContent || '';
      const description = item.querySelector('description')?.textContent || '';
      const pubDate = item.querySelector('pubDate')?.textContent || new Date().toISOString();
      const content = item.querySelector('content\:encoded')?.textContent || description;
      let image: string | undefined;
      const enclosure = item.querySelector('enclosure');
      if (enclosure?.getAttribute('type')?.startsWith('image/')) {
        image = enclosure.getAttribute('url') || undefined;
      } else if (content) {
        const imgMatch = content.match(/<img[^>]+src="([^"]+)"/i);
        if (imgMatch) image = imgMatch[1];
      }
      articles.push({
        title,
        link,
        contentSnippet: description.replace(/<[^>]*>/g, '').substring(0, 150),
        content,
        pubDate,
        image,
      });
    });
    return articles;
  } catch (error) {
    console.error('All proxies failed for RSS feed:', url, error);
    return [];
  } finally {
    controllers.forEach(c => { try { c.abort(); } catch {} });
  }
}

// Priority RSS Feed URLs - Top 10 most reliable and fast sources
const PRIORITY_FEEDS: Record<string, string> = {
  'The PIE News': 'https://thepienews.com/feed/',
  'Times Higher Education': 'https://www.timeshighereducation.com/rss',
  'Higher Ed Dive': 'https://www.highereddive.com/feeds/news/',
  'Inside Higher Ed': 'https://www.insidehighered.com/rss.xml',
  'Times of India Education': 'https://timesofindia.indiatimes.com/education/study-abroad/rssfeeds/',
  'India Today Education': 'https://www.indiatoday.in/education-today/study-abroad/rss.xml',
  'The Guardian Education': 'https://www.theguardian.com/education/internationalstudents/rss',
  'CBC Canada News': 'https://www.cbc.ca/cmlink/rss-canada',
  'UKCISA': 'https://www.ukcisa.org.uk/rss',
  'Study Australia': 'https://www.studyinaustralia.gov.au/rss',
};

// Additional RSS Feed URLs - Loaded on demand or in background
const ADDITIONAL_FEEDS: Record<string, string> = {
  'Indian Express Education': 'https://indianexpress.com/section/education/feed/',
  'Study in Canada': 'https://www.educanada.ca/rss/news.xml',
  'DAAD Germany': 'https://www.daad.de/en/rss/',
  'Education in Ireland': 'https://blog.educationinireland.com/feed/',
  'Study in Japan': 'https://www.studyinjapan.go.jp/en/news/rss',
  'Study in Korea': 'https://www.studyinkorea.go.kr/rss',
  'The Guardian Australia': 'https://www.theguardian.com/australia-news/australian-universities/rss',
  'Economic Times NRI': 'https://economictimes.indiatimes.com/nri/study/rssfeeds/',
  'The Hindu Education': 'https://www.thehindu.com/education/study-abroad/feeder/default.rss',
  'NDTV World News': 'https://feeds.feedburner.com/ndtv/world-news',
  'Washington Post Education': 'https://www.washingtonpost.com/education/feed/',
  'Yahoo Canada News': 'https://ca.news.yahoo.com/rss/',
  'The Independent UK': 'https://www.independent.co.uk/news/uk/home-news/rss',
  'The Koala News': 'https://thekoalanews.com/feed/',
  'DW Education': 'https://www.dw.com/en/top-stories/education/rss',
  'Campus France': 'https://www.campusfrance.org/en/rss',
  'NUFFIC Netherlands': 'https://www.nuffic.nl/en/news/rss',
  'Dutch News': 'https://www.dutchnews.nl/feed/',
  'Japan Times': 'https://www.japantimes.co.jp/feed/',
  'Study in Sweden': 'https://www.studyinsweden.se/rss',
  'The Local Sweden': 'https://www.thelocal.se/tag/study-in-sweden/rss',
  'Study in Finland': 'https://www.studyinfinland.fi/rss',
  'Study in Denmark': 'https://www.studyindenmark.dk/rss',
  'The Local Denmark': 'https://www.thelocal.dk/rss',
  'Study in Poland': 'https://www.studyinpoland.pl/en/news/rss',
  'Study in Italy': 'https://www.universitaly.it/rss',
  'Study in Spain': 'https://www.study.eu/country/spain/rss',
  'El País English': 'https://english.elpais.com/rss',
  'Study in Belgium': 'https://www.studyinbelgium.be/rss',
  'Swiss Info Education': 'https://www.swissinfo.ch/eng/education/rss',
  'Study in Hungary': 'https://www.studyinhungary.hu/rss',
  'Study in Lithuania': 'https://www.studyin.lt/rss',
  'Study in Russia': 'https://www.studyinrussia.ru/en/rss',
  'Education Malaysia': 'https://www.educationmalaysia.gov.my/rss',
  'Study in Taiwan': 'https://www.studyintaiwan.org/rss',
  'Study in Cyprus': 'https://www.studyincyprus.eu/rss',
  'Study in Ukraine': 'https://www.studyinukraine.gov.ua/rss',
  'Study in Brazil': 'https://www.studyinbrazil.com.br/rss',
  'Study in Chile': 'https://www.studyinchile.cl/rss',
  'Study in Argentina': 'https://www.studyin.ar/rss',
  'Study in Mexico': 'https://www.embamex.sre.gob.mx/rss',
};

const RSS_FEEDS = { ...PRIORITY_FEEDS, ...ADDITIONAL_FEEDS };

// Keywords to filter relevant articles
const RELEVANT_KEYWORDS = [
  'student', 'study', 'education', 'university', 'college', 'scholarship',
  'visa', 'international', 'abroad', 'overseas', 'immigration', 'tuition',
  'admission', 'application', 'degree', 'graduate', 'undergraduate',
  'campus', 'enrollment', 'academic', 'research', 'campus', 'dormitory',
  'accommodation', 'housing', 'work permit', 'post-graduation', 'PGWP',
  'IELTS', 'TOEFL', 'GRE', 'GMAT', 'exchange', 'semester', 'tuition fee',
  'cost of living', 'student life', 'campus life', 'international education'
];

// Pre-compiled regex patterns for faster matching
const KEYWORD_REGEX = new RegExp(RELEVANT_KEYWORDS.join('|'), 'i');
const VISA_REGEX = /visa|immigration|permit/i;
const SCHOLARSHIP_REGEX = /scholarship|funding|grant/i;
const FINANCE_REGEX = /cost|fee|tuition|finance/i;
const STUDENT_LIFE_REGEX = /campus|student life|accommodation|housing/i;
const WELLBEING_REGEX = /mental health|wellbeing|wellness/i;
const OPPORTUNITIES_REGEX = /opportunity|job|career|internship/i;

// Create a stable ID for articles to use for routing and storage
export function createArticleId(source: string, link: string, date: string): string {
  try {
    const base = `${source}|${link}|${new Date(date || Date.now()).toISOString().slice(0, 10)}`;
    let hash = 0;
    for (let i = 0; i < base.length; i++) {
      hash = (hash << 5) - hash + base.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return `n_${Math.abs(hash).toString(36)}`;
  } catch {
    return `n_${Math.random().toString(36).slice(2)}`;
  }
}

export async function fetchNewsFromRSS(source: string, feedUrl: string): Promise<NewsArticle[]> {
  try {
    const feedItems = await parseRSSFeed(feedUrl);
    
    const articles: NewsArticle[] = feedItems
      .filter(item => {
        const text = `${item.title} ${item.contentSnippet || item.content || ''}`;
        return KEYWORD_REGEX.test(text);
      })
      .slice(0, 3) // Reduced to 3 articles per source for faster loading
      .map(item => {
        // Extract image (already parsed in parseRSSFeed)
        const image = item.image || `https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop`;

        // Calculate read time (rough estimate: 200 words per minute)
        const wordCount = (item.contentSnippet || item.content || '').split(/\s+/).length;
        const readTime = Math.max(1, Math.ceil(wordCount / 200));

        // Determine impact based on keywords
        const titleLower = item.title?.toLowerCase() || '';
        let impact: 'High' | 'Medium' | 'Low' = 'Medium';
        if (VISA_REGEX.test(titleLower) || SCHOLARSHIP_REGEX.test(titleLower) || titleLower.includes('important')) {
          impact = 'High';
        } else if (titleLower.includes('update') || titleLower.includes('change') || titleLower.includes('new')) {
          impact = 'Medium';
        } else {
          impact = 'Low';
        }

        // Determine category using pre-compiled regex
        let category = 'General';
        if (VISA_REGEX.test(titleLower)) category = 'Visa Updates';
        else if (SCHOLARSHIP_REGEX.test(titleLower)) category = 'Scholarships';
        else if (titleLower.includes('work permit')) category = 'Work Permits';
        else if (FINANCE_REGEX.test(titleLower)) category = 'Finance';
        else if (STUDENT_LIFE_REGEX.test(titleLower)) category = 'Student Life';
        else if (WELLBEING_REGEX.test(titleLower)) category = 'Wellbeing';
        else if (OPPORTUNITIES_REGEX.test(titleLower)) category = 'Opportunities';

        // Detect location from content
        const locationInfo = detectLocation(item.contentSnippet || item.content || '');
        const link = item.link || '';
        const date = item.pubDate || new Date().toISOString();

        return {
          id: createArticleId(source, link, date),
          title: item.title || 'Untitled',
          excerpt: item.contentSnippet || item.content?.substring(0, 150) || 'No description available',
          link,
          date,
          source,
          category,
          image,
          readTime: `${readTime} min read`,
          impact,
          country: locationInfo.country,
          city: locationInfo.city,
          location: locationInfo.location,
          contentHTML: item.content || undefined,
        };
      });

    return articles;
  } catch (error) {
    console.error(`Error fetching news from ${source}:`, error);
    return [];
  }
}

// Cache key for localStorage
const CACHE_KEY = 'unifyo_news_cache';
const CACHE_DURATION = 15 * 60 * 1000; // Reduced to 15 minutes for fresher content

interface CachedNews {
  articles: NewsArticle[];
  timestamp: number;
}

// Get cached news if available and fresh
export function getCachedNews(): NewsArticle[] | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const { articles, timestamp }: CachedNews = JSON.parse(cached);
    const now = Date.now();
    
    if (now - timestamp < CACHE_DURATION) {
      return articles;
    }
    
    localStorage.removeItem(CACHE_KEY);
    return null;
  } catch {
    return null;
  }
}

// Save news to cache
export function saveToCache(articles: NewsArticle[]): void {
  try {
    const cache: CachedNews = {
      articles,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Ignore cache errors
  }
}

// IndexedDB storage for persistent news data
const DB_NAME = 'UnifyONewsDB';
const DB_VERSION = 1;
const STORE_NAME = 'newsArticles';

interface StoredArticle extends NewsArticle {
  id: string;
  storedAt: number;
  fullContent?: string;
  keywords?: string[];
}

// Initialize IndexedDB
async function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('date', 'date', { unique: false });
        store.createIndex('country', 'country', { unique: false });
        store.createIndex('city', 'city', { unique: false });
        store.createIndex('category', 'category', { unique: false });
        store.createIndex('source', 'source', { unique: false });
        store.createIndex('storedAt', 'storedAt', { unique: false });
      }
    };
  });
}

// Store articles in IndexedDB
export async function storeArticles(articles: NewsArticle[]): Promise<void> {
  try {
    const db = await initDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    const promises: Promise<void>[] = [];
    
    for (const article of articles) {
      const storedArticle: StoredArticle = {
        ...article,
        id: article.id || createArticleId(article.source, article.link, article.date),
        storedAt: Date.now(),
        keywords: extractKeywords(article.title + ' ' + article.excerpt)
      };
      
      promises.push(
        new Promise<void>((resolve, reject) => {
          const request = store.put(storedArticle);
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        })
      );
    }
    
    // Store during idle time to avoid blocking the main thread
    const run = async () => { await Promise.all(promises); };
    if (typeof (window as any).requestIdleCallback === 'function') {
      (window as any).requestIdleCallback(run);
    } else {
      setTimeout(run, 0);
    }
  } catch (error) {
    console.error('Error storing articles:', error);
  }
}

// Get single article by ID from IndexedDB
export async function getStoredArticleById(id: string): Promise<NewsArticle | null> {
  try {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    return await new Promise((resolve) => {
      const req = store.get(id);
      req.onsuccess = () => resolve((req.result as StoredArticle) || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

// Retrieve articles from IndexedDB with filtering
export async function getStoredArticles(filters?: {
  country?: string;
  city?: string;
  category?: string;
  source?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
}): Promise<NewsArticle[]> {
  try {
    const db = await initDB();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    
    let index: IDBIndex;
    let range: IDBKeyRange | null = null;
    
    if (filters?.startDate || filters?.endDate) {
      index = store.index('date');
      const start = filters?.startDate ? filters.startDate.toISOString() : undefined;
      const end = filters?.endDate ? filters.endDate.toISOString() : undefined;
      range = start && end ? IDBKeyRange.bound(start, end) : 
             start ? IDBKeyRange.lowerBound(start) :
             end ? IDBKeyRange.upperBound(end) : null;
    } else {
      index = store.index('storedAt');
      range = IDBKeyRange.upperBound(Date.now());
    }
    
    const articles: NewsArticle[] = [];
    let count = 0;
    
    return new Promise((resolve) => {
      const request = index.openCursor(range, 'prev'); // Get newest first
      
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result;
        if (cursor && (!filters?.limit || count < filters.limit)) {
          const article = cursor.value as StoredArticle;
          
          // Apply additional filters
          if ((!filters?.country || article.country === filters.country) &&
              (!filters?.city || article.city === filters.city) &&
              (!filters?.category || article.category === filters.category) &&
              (!filters?.source || article.source === filters.source)) {
            articles.push(article);
            count++;
          }
          
          cursor.continue();
        } else {
          resolve(articles);
        }
      };
      
      request.onerror = () => resolve([]);
    });
  } catch (error) {
    console.error('Error retrieving stored articles:', error);
    return [];
  }
}

// Extract keywords for better search
export function extractKeywords(text: string): string[] {
  const words = text.toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3);
  
  const stopWords = new Set(['the', 'and', 'for', 'with', 'that', 'this', 'from', 'have', 'has', 'was', 'were', 'are', 'is', 'be', 'been', 'being']);
  
  return Array.from(new Set(words))
    .filter(word => !stopWords.has(word))
    .slice(0, 10); // Limit to top 10 keywords
}

// Enhanced search function using keywords
export function enhancedSearchNews(articles: NewsArticle[], query: string): NewsArticle[] {
  if (!query.trim()) return articles;
  
  const lowerQuery = query.toLowerCase();
  const queryWords = lowerQuery.split(/\s+/).filter(word => word.length > 2);
  
  return articles.filter(article => {
    // Basic text search
    const text = `${article.title} ${article.excerpt} ${article.source} ${article.category} ${article.country} ${article.city}`.toLowerCase();
    
    // Check if all query words are present
    const hasAllWords = queryWords.every(word => text.includes(word));
    
    return hasAllWords || 
           article.title.toLowerCase().includes(lowerQuery) ||
           article.excerpt.toLowerCase().includes(lowerQuery) ||
           article.source.toLowerCase().includes(lowerQuery) ||
           article.category?.toLowerCase().includes(lowerQuery) ||
           article.country?.toLowerCase().includes(lowerQuery) ||
           article.city?.toLowerCase().includes(lowerQuery);
  });
}

// API Base URL
const API_BASE = (import.meta as any).env?.VITE_NEWS_API_URL || 'http://localhost:8000';

// API response interfaces
interface NewsAPIResponse {
  count: number;
  articles: NewsArticle[];
  cached: boolean;
  countries?: string[];
}

interface StatsResponse {
  total_articles: number;
  countries: Record<string, number>;
  sources: Record<string, number>;
  last_updated: string;
}

// Enhanced API functions
export async function fetchNewsFromAPI(options: {
  limit?: number;
  country?: string;
  priority_only?: boolean;
} = {}): Promise<NewsArticle[]> {
  const { limit = 500, country, priority_only = false } = options;

  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
      priority_only: priority_only.toString(),
    });

    if (country && country !== 'All') {
      params.append('country', country);
    }

    const response = await fetch(`${API_BASE}/api/news?${params}`, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data: NewsAPIResponse = await response.json();
    const articles = data.articles || [];

    // Cache the results
    if (articles.length > 0) {
      saveToCache(articles);
      storeArticles(articles).catch(() => {});
    }

    return articles;
  } catch (error) {
    console.warn('API fetch failed, falling back to local methods:', error);
    return [];
  }
}

export async function refreshNewsFromAPI(options: {
  countries?: string[];
  upload_images?: boolean;
} = {}): Promise<{ count: number; articles: NewsArticle[] }> {
  const { countries, upload_images = true } = options;

  try {
    const response = await fetch(`${API_BASE}/api/news/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        countries,
        upload_images
      }),
      signal: AbortSignal.timeout(30000) // 30 second timeout for refresh
    });

    if (!response.ok) {
      throw new Error(`API refresh failed: ${response.status}`);
    }

    const data = await response.json();
    const articles = data.articles || [];

    // Cache the results
    if (articles.length > 0) {
      saveToCache(articles);
      storeArticles(articles).catch(() => {});
    }

    return { count: data.count || 0, articles };
  } catch (error) {
    console.error('API refresh failed:', error);
    throw error;
  }
}

export async function getAvailableCountries(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE}/api/news/countries`, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(3000)
    });

    if (!response.ok) {
      throw new Error(`Countries API failed: ${response.status}`);
    }

    const data = await response.json();
    return data.countries || [];
  } catch (error) {
    console.warn('Countries API failed, using fallback:', error);
    return ['Global', 'India', 'Canada', 'United States', 'United Kingdom', 'Australia'];
  }
}

export async function getNewsStats(): Promise<StatsResponse | null> {
  try {
    const response = await fetch(`${API_BASE}/api/news/stats`, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(3000)
    });

    if (!response.ok) {
      throw new Error(`Stats API failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn('Stats API failed:', error);
    return null;
  }
}

// Update fetchAllNews to use the new API first
export async function fetchAllNews(useCache: boolean = true, priorityOnly: boolean = false, country?: string): Promise<NewsArticle[]> {
  // Try server-side scraper API first for fastest and complete results
  const apiArticles = await fetchNewsFromAPI({
    limit: priorityOnly ? 200 : 500,
    country,
    priority_only: priorityOnly
  });

  if (apiArticles.length > 0) {
    return apiArticles;
  }

  // Dynamic network config
  const connection = (navigator as any).connection;
  const effectiveType: string | undefined = connection?.effectiveType;
  const isSlow = effectiveType && /2g|slow-2g/.test(effectiveType);
  const perSourceTimeout = isSlow ? 1000 : 800; // faster failover
  const betweenBatchDelay = isSlow ? 150 : 60;
  const initialBatchSize = isSlow ? 3 : (priorityOnly ? 6 : 4);

  // Try to get from localStorage cache first (more reliable)
  if (useCache) {
    const cached = getCachedNews();
    if (cached && cached.length > 0) {
      // Try to also store in IndexedDB in background (non-blocking)
      storeArticles(cached).catch(() => {
        // Silently fail IndexedDB storage
      });
      return cached;
    }
    
    // Fallback to IndexedDB if localStorage is empty
    try {
      const stored = await getStoredArticles({ limit: 50 });
      if (stored.length > 0) {
        return stored;
      }
    } catch (error) {
      console.warn('IndexedDB not available, using network fetch:', error);
    }
  }

  const allArticles: NewsArticle[] = [];
  const sources = priorityOnly 
    ? Object.entries(PRIORITY_FEEDS)
    : Object.entries(RSS_FEEDS);

  // Process sources in smaller batches for better performance
  const batchSize = initialBatchSize; // dynamic above
  const results: NewsArticle[][] = [];
  
  for (let i = 0; i < sources.length; i += batchSize) {
    const batch = sources.slice(i, i + batchSize);
    
    const promises = batch.map(([source, url]) => 
      Promise.race([
        fetchNewsFromRSS(source, url),
        new Promise<NewsArticle[]>((resolve) => setTimeout(() => {
          console.warn(`Timeout fetching ${source} after ${perSourceTimeout}ms`);
          resolve([]);
        }, perSourceTimeout))
      ]).catch((error) => {
        console.warn(`Error fetching ${source}:`, error);
        return [];
      })
    );
    
    const batchResults = await Promise.all(promises);
    results.push(...batchResults);
    
    // Small delay between batches to prevent overwhelming the browser
    if (i + batchSize < sources.length) {
      await new Promise(resolve => setTimeout(resolve, betweenBatchDelay));
    }
  }
  
  // Flatten all results
  results.forEach(articles => {
    allArticles.push(...articles);
  });

  // Sort by date (newest first)
  allArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Cache the results in localStorage (primary cache)
  if (allArticles.length > 0) {
    saveToCache(allArticles);
    
    // Also store in IndexedDB in background (non-blocking)
    storeArticles(allArticles).catch(() => {
      // Silently fail IndexedDB storage - localStorage is primary
    });
    return allArticles;
  }

  // Fallback: serve bundled demo data to avoid empty UI
  try {
    const res = await fetch('/news-fallback.json', { cache: 'no-store' });
    if (res.ok) {
      const fallback = (await res.json()) as NewsArticle[];
      if (fallback && fallback.length) {
        saveToCache(fallback);
        storeArticles(fallback).catch(() => {});
        return fallback;
      }
    }
  } catch {
    // ignore
  }

  return allArticles;
}

// Fetch additional news in background
export async function fetchAdditionalNews(): Promise<NewsArticle[]> {
  const allArticles: NewsArticle[] = [];
  const sources = Object.entries(ADDITIONAL_FEEDS);

  // Fetch in smaller batches
  const batchSize = 3;
  for (let i = 0; i < sources.length; i += batchSize) {
    const batch = sources.slice(i, i + batchSize);
    const promises = batch.map(([source, url]) => 
      fetchNewsFromRSS(source, url).catch(() => [])
    );
    const results = await Promise.allSettled(promises);
    
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        allArticles.push(...result.value);
      }
    });
  }

  allArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return allArticles;
}

export function searchNews(articles: NewsArticle[], query: string): NewsArticle[] {
  if (!query.trim()) return articles;
  
  const lowerQuery = query.toLowerCase();
  return articles.filter(article => 
    article.title.toLowerCase().includes(lowerQuery) ||
    article.excerpt.toLowerCase().includes(lowerQuery) ||
    article.source.toLowerCase().includes(lowerQuery) ||
    article.category?.toLowerCase().includes(lowerQuery)
  );
}

export function filterNewsByCategory(articles: NewsArticle[], category: string): NewsArticle[] {
  if (category === 'All') return articles;
  return articles.filter(article => article.category === category);
}

// Add advanced filtering functions
export function filterNewsByCountry(articles: NewsArticle[], country: string): NewsArticle[] {
  if (!country || country === 'All') return articles;
  return articles.filter(article => article.country === country);
}

export function filterNewsByCity(articles: NewsArticle[], city: string): NewsArticle[] {
  if (!city || city === 'All') return articles;
  return articles.filter(article => article.city === city);
}

export function filterNewsByDateRange(articles: NewsArticle[], startDate?: Date, endDate?: Date): NewsArticle[] {
  if (!startDate && !endDate) return articles;
  
  return articles.filter(article => {
    const articleDate = new Date(article.date);
    
    if (startDate && endDate) {
      return articleDate >= startDate && articleDate <= endDate;
    } else if (startDate) {
      return articleDate >= startDate;
    } else if (endDate) {
      return articleDate <= endDate;
    }
    
    return true;
  });
}

export function filterNewsByMultipleCriteria(
  articles: NewsArticle[], 
  filters: {
    category?: string;
    country?: string;
    city?: string;
    startDate?: Date;
    endDate?: Date;
    searchQuery?: string;
  }
): NewsArticle[] {
  let filtered = articles;
  
  if (filters.category && filters.category !== 'All') {
    filtered = filterNewsByCategory(filtered, filters.category);
  }
  
  if (filters.country && filters.country !== 'All') {
    filtered = filterNewsByCountry(filtered, filters.country);
  }
  
  if (filters.city && filters.city !== 'All') {
    filtered = filterNewsByCity(filtered, filters.city);
  }
  
  if (filters.startDate || filters.endDate) {
    filtered = filterNewsByDateRange(filtered, filters.startDate, filters.endDate);
  }
  
  if (filters.searchQuery && filters.searchQuery.trim()) {
    filtered = searchNews(filtered, filters.searchQuery);
  }
  
  return filtered;
}

// Get unique values for filter dropdowns
export function getUniqueCountries(articles: NewsArticle[]): string[] {
  const countries = articles
    .map(article => article.country)
    .filter((country): country is string => !!country);
  return Array.from(new Set(countries)).sort();
}

export function getUniqueCities(articles: NewsArticle[]): string[] {
  const cities = articles
    .map(article => article.city)
    .filter((city): city is string => !!city);
  return Array.from(new Set(cities)).sort();
}

export function getUniqueCategories(articles: NewsArticle[]): string[] {
  const categories = articles
    .map(article => article.category)
    .filter((category): category is string => !!category);
  return Array.from(new Set(categories)).sort();
}

