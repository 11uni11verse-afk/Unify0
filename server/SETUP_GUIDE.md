# UnifyO News Scraper Setup Guide

This guide will walk you through setting up the comprehensive news scraper system for international student news.

## 🚀 Quick Setup (3 Steps)

### Step 1: Configure Google Cloud Storage

```bash
cd server
python3 setup_cloud.py
```

This creates:
- `credentials.json` - Template for your Google Cloud credentials
- `.env` - Environment configuration
- `setup_bucket.py` - Script to create your storage bucket

**Next**: Get your Google Cloud credentials:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Cloud Storage API**
4. Create a **Service Account** with **Storage Admin** role
5. Download the JSON key file
6. Replace the contents of `credentials.json` with your downloaded credentials

### Step 2: Create Storage Bucket

```bash
python3 setup_bucket.py
```

This will:
- Create a bucket named `unifyo-news-images`
- Configure CORS for web access
- Set up public read access for images

### Step 3: Install Dependencies & Start

```bash
# Install dependencies
pip install -r requirements.txt

# Start the scraper server
python3 main.py
```

## 📊 System Overview

The scraper automatically:
- ✅ Scrapes 300+ news sources across 40+ countries
- ✅ Categorizes news by country using intelligent analysis
- ✅ Uploads images to Google Cloud Storage
- ✅ Provides REST API for frontend integration
- ✅ Caches results for 15 minutes
- ✅ Handles rate limiting and retries

## 🌍 Supported Countries

**Global**: PIE News, Times Higher Education, Higher Ed Dive, NAFSA, Inside Higher Ed

**India**: Times of India, India Today, Economic Times, The Hindu, IDP, Yocket, Leapscholar

**Canada**: CBC, Toronto Star, Globe and Mail, Educanada, Yahoo Canada

**USA**: New York Times, Washington Post, DHS, State Department, StudyUSA

**UK**: Guardian, BBC, Independent, UKCISA, Gov.uk, The Times

**Australia**: Sydney Morning Herald, ABC News, The Age, Study Australia

**Germany**: DAAD, DW, Deutsche Welle, Tagesspiegel, Studying-in-Germany

**France**: Le Monde, Le Figaro, Liberation, Campus France

**And 30+ more countries** including Japan, South Korea, China, Poland, Italy, Spain, Netherlands, Ireland, Sweden, Finland, Portugal, Belgium, Switzerland, Hungary, Lithuania, Denmark, Russia, UAE, Malaysia, Taiwan, Cyprus, Mauritius, Ukraine, Brazil, Chile, Argentina, Mexico...

## 🔧 API Endpoints

### Get News
```http
GET /api/news?country=India&limit=50
GET /api/news?limit=100&priority_only=true
```

### Refresh News
```http
POST /api/news/refresh
Content-Type: application/json

{
  "countries": ["India", "USA"],
  "upload_images": true
}
```

### Get Statistics
```http
GET /api/news/stats
```

### Get Available Countries
```http
GET /api/news/countries
```

## 🖼️ Image Management

- **Automatic Upload**: Images are automatically downloaded and uploaded to Google Cloud Storage
- **Format Support**: JPG, PNG, GIF, WebP
- **Size Limits**: Max 5MB per image
- **Public Access**: All images are publicly accessible via Cloud Storage URLs
- **Fallback**: Default Unsplash images if no image is available

## ⚙️ Configuration

### Environment Variables (.env)

```bash
# Google Cloud Configuration
GCS_BUCKET_NAME=unifyo-news-images
GCS_CREDENTIALS_PATH=credentials.json

# Optional: Override API settings
NEWS_API_URL=http://localhost:8000
```

### Website Sources

Sources are configured in `main.py` with country mapping:

```python
WEBSITE_CONFIGS = {
    "website-domain.com": {
        "country": "Country Name",
        "type": "rss",  # or "html"
        "url": "https://website.com/feed/"
    }
}
```

## 📈 Performance Features

- **Concurrent Processing**: 20 simultaneous requests
- **Smart Caching**: 15-minute cache with automatic refresh
- **Rate Limiting**: Respects website policies
- **Error Recovery**: Automatic retries with exponential backoff
- **Memory Efficient**: Streaming downloads and processing

## 🔍 Monitoring & Logs

The system provides comprehensive logging:
- Scraper progress and success rates
- Image upload statistics
- API request metrics
- Error tracking and recovery

## 🛠️ Development

### Adding New Sources

1. Add website configuration to `WEBSITE_CONFIGS` in `main.py`
2. Test scraping: `GET /api/news/refresh` with specific countries
3. Verify country categorization in logs
4. Check image uploads in Google Cloud Storage

### Custom Scraping Logic

For websites requiring special parsing:

```python
async def custom_scraper(html: str, url: str) -> List[Dict]:
    soup = BeautifulSoup(html, "html.parser")
    # Custom extraction logic
    return articles
```

## 🚨 Troubleshooting

### Common Issues

**"Google Cloud credentials not found"**
- Ensure `credentials.json` contains valid service account credentials
- Check that the service account has Storage Admin role

**"Bucket creation failed"**
- Verify project has billing enabled
- Check quota limits for Cloud Storage
- Ensure bucket name is globally unique

**"No news articles found"**
- Check internet connectivity
- Verify RSS feeds are accessible
- Review scraper logs for specific errors

**"Image upload failed"**
- Check bucket permissions
- Verify CORS configuration
- Ensure images are under 5MB

### Logs & Debugging

```bash
# View server logs
python3 main.py

# Test specific endpoint
curl "http://localhost:8000/api/news/stats"

# Test news refresh
curl -X POST "http://localhost:8000/api/news/refresh" \
  -H "Content-Type: application/json" \
  -d '{"upload_images": true}'
```

## 📞 Support

For issues:
1. Check server logs for error messages
2. Verify Google Cloud configuration
3. Test individual RSS feeds
4. Review API responses for error codes

## 🎯 What's Next

After setup, the scraper will:
1. **Immediately start collecting news** from all configured sources
2. **Categorize by country** using intelligent content analysis
3. **Upload images** to cloud storage with public URLs
4. **Provide real-time API** access for your frontend
5. **Cache results** for optimal performance

Your news website will now have access to fresh, categorized international student news with professional image handling! 🎉
