# 📰 UnifyO News System Guide

The news section automatically extracts articles from 150+ sources across 30+ countries.

---

## ✅ Current Status

### News Sources Configured:

| Region | Sources | Type |
|--------|---------|------|
| **Global** | The PIE News, Times Higher Education, Higher Ed Dive, Inside Higher Ed, NAFSA, ICEF Monitor | RSS + HTML |
| **India** | Times of India, India Today, Indian Express, Economic Times, The Hindu, Yocket, LeapScholar | RSS + HTML |
| **Canada** | CBC News, EduCanada, IRCC, Yahoo Canada | RSS + HTML |
| **USA** | Ed.gov, DHS, State Department, Study USA, Washington Post | RSS + HTML |
| **UK** | UKCISA, The Guardian, GOV.UK, The Independent, Fragomen | RSS + HTML |
| **Australia** | Study Australia, The Guardian AU, The Koala News | RSS + HTML |
| **Europe** | DAAD (Germany), Campus France, Study in Ireland, NUFFIC, Study in Sweden, etc. | RSS + HTML |
| **Asia** | Study in Japan, Study in Korea, Campus China | RSS + HTML |
| **+ 20 more** | Poland, Italy, Spain, Finland, UAE, Malaysia, Taiwan, etc. | RSS + HTML |

**Total: 150+ unique news sources**

---

## 🔄 How It Works

### Mode 1: Server API (Recommended for Production)

When the Python server is running:

```
User → Frontend → API (localhost:8000) → Scrapes 150+ sources → Returns news
```

**Benefits:**
- Faster (parallel scraping)
- More reliable (no CORS issues)
- HTML scraping support (not just RSS)
- Image upload to cloud storage
- Caching for better performance

### Mode 2: Client-Side Fallback

When server is not running:

```
User → Frontend → CORS Proxies → RSS Feeds (40+ sources) → Shows news
```

**Benefits:**
- Works without backend
- Good for development
- Automatic caching (localStorage + IndexedDB)

**Limitations:**
- Only RSS feeds (no HTML scraping)
- Some feeds may fail due to CORS
- Slower than server mode

---

## 🚀 Running the News Server (Recommended)

### Option 1: Local Development

```bash
# Navigate to server directory
cd server

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

Server will be available at `http://localhost:8000`

### Option 2: Production Deployment

Deploy to any Python hosting:
- **Render**: Free tier available
- **Railway**: Easy deployment
- **Fly.io**: Good free tier
- **DigitalOcean App Platform**: Reliable

Example `render.yaml`:
```yaml
services:
  - type: web
    name: unifyo-news-api
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Option 3: Serverless (Vercel/Netlify)

The frontend will work without the server - it falls back to client-side RSS fetching.

---

## 📡 API Endpoints

When the server is running:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/news` | GET | Get cached/fresh news articles |
| `/api/news/refresh` | POST | Force refresh from all sources |
| `/api/news/countries` | GET | Get list of available countries |
| `/api/news/stats` | GET | Get news statistics |
| `/api/health` | GET | Health check |

### Example Requests:

```bash
# Get news
curl http://localhost:8000/api/news?limit=50

# Get news for specific country
curl http://localhost:8000/api/news?country=Canada

# Force refresh
curl -X POST http://localhost:8000/api/news/refresh

# Get available countries
curl http://localhost:8000/api/news/countries
```

---

## 🔧 Configuration

### Adding New RSS Sources

Edit `server/sites.json`:

```json
{
  "PRIORITY_FEEDS": {
    "New Source Name": "https://example.com/feed/"
  },
  "ADDITIONAL_FEEDS": {
    "Another Source": "https://another.com/rss"
  }
}
```

### Adding HTML Scrapers

Edit `server/main.py` - add to `WEBSITE_CONFIGS`:

```python
WEBSITE_CONFIGS = {
    # ...existing configs...
    "newsite.com": {
        "country": "Canada",
        "type": "html",
        "url": "https://newsite.com/news/"
    },
}
```

### Client-Side Sources

Edit `src/lib/news.ts`:

```typescript
const PRIORITY_FEEDS: Record<string, string> = {
  'New Source': 'https://example.com/feed/',
  // ...existing feeds...
};
```

---

## 🌍 Countries Covered

The system extracts and categorizes news for:

1. **Global** - International education news
2. **India** - Study abroad from India
3. **Canada** - Immigration, visas, student life
4. **United States** - Visa updates, opportunities
5. **United Kingdom** - UKCISA, visa changes
6. **Australia** - Study permits, scholarships
7. **New Zealand** - Immigration, education
8. **Germany** - DAAD, study opportunities
9. **France** - Campus France, scholarships
10. **Ireland** - Study in Ireland
11. **Netherlands** - Nuffic, Dutch education
12. **Japan** - JASSO, study programs
13. **South Korea** - GKS, Korean education
14. **China** - CSC scholarships
15. **Poland** - NAWA, Polish education
16. **Italy** - Universitaly
17. **Spain** - SEPIE, Spanish education
18. **Sweden** - Swedish Institute
19. **Finland** - Study in Finland
20. **Portugal** - Study Research PT
21. **Belgium** - Study in Belgium
22. **Switzerland** - Swiss education
23. **Hungary** - Stipendium Hungaricum
24. **Lithuania** - Study in Lithuania
25. **Denmark** - Study in Denmark
26. **Russia** - Study in Russia
27. **UAE** - Dubai education
28. **Malaysia** - Education Malaysia
29. **Taiwan** - Study in Taiwan
30. **+ more countries**

---

## 🔄 Auto-Refresh Settings

### Server Cache:
- **Cache TTL:** 15 minutes
- **Auto-refresh:** On API request after cache expires

### Client Cache:
- **localStorage:** 15 minutes
- **IndexedDB:** Persistent storage

### Manual Refresh:
Users can click "Refresh News" button in the UI.

---

## 🐛 Troubleshooting

### News Not Loading

1. **Check console for errors**
   - Open browser DevTools → Console
   - Look for network errors or CORS issues

2. **Try refreshing**
   - Click "Refresh News" button
   - Or hard refresh the page (Ctrl+Shift+R)

3. **Check if server is running**
   ```bash
   curl http://localhost:8000/api/health
   ```

4. **Clear cache**
   - Open DevTools → Application → Clear site data
   - Reload page

### CORS Issues (Client Mode)

If CORS proxies fail:
1. Multiple proxies are tried automatically
2. Fallback to `news-fallback.json` if all fail
3. Consider running the server for better reliability

### Server Errors

1. **Check dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Check port availability**
   ```bash
   lsof -ti:8000 | xargs kill -9  # Kill existing process
   uvicorn main:app --port 8000   # Restart
   ```

---

## 📊 Performance Tips

1. **Use Server Mode** - Much faster than client-side
2. **Enable caching** - Already configured (15 min)
3. **Filter by country** - Reduces data load
4. **Use priority feeds** - First 10 sources load fastest

---

## ✅ Verification Checklist

- [ ] News page loads
- [ ] Articles display with images
- [ ] Categories filter works
- [ ] Country filter works
- [ ] Refresh button works
- [ ] Article detail pages work
- [ ] No console errors

---

## 🚀 Production Recommendations

1. **Deploy the Python server** for best performance
2. **Set up cron job** to refresh cache every 15 minutes
3. **Enable Google Cloud Storage** for image hosting (optional)
4. **Monitor API health** with uptime monitoring

---

**Status:** ✅ News system is fully configured and ready!

