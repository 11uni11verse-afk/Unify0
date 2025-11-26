# UnifyO News Scraper

A comprehensive web scraper system for international student news that automatically categorizes news by country, extracts images, and stores everything in the cloud.

## 🌟 Features

- **Multi-Source Scraping**: Scrapes from 300+ websites across 40+ countries
- **Country Categorization**: Automatically categorizes news by country using intelligent content analysis
- **Image Processing**: Extracts and uploads relevant images to Google Cloud Storage
- **RSS & HTML Support**: Handles both RSS feeds and direct HTML scraping
- **Real-time Updates**: Continuous background scraping with caching
- **Error Resilience**: Comprehensive retry mechanisms and error handling
- **Cloud Storage**: Automatic image upload and optimization
- **API Integration**: RESTful API for frontend integration

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Websites      │───▶│   Scraper       │───▶│ Google Cloud    │
│   (300+ sites)  │    │   Engine        │    │   Storage       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │                        │
                              ▼                        ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │   Country       │    │   Optimized     │
                       │   Analysis      │    │   Images        │
                       └─────────────────┘    └─────────────────┘
                              │                        │
                              ▼                        ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │   Categorized   │    │   Frontend      │
                       │   News API      │◀──▶│   Display       │
                       └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### 1. Setup Environment

```bash
cd server
python setup_cloud.py
```

### 2. Configure Google Cloud

1. Create a Google Cloud project
2. Enable Cloud Storage API
3. Create a service account with Storage Admin role
4. Download JSON credentials and place as `credentials.json`
5. Run bucket setup:

```bash
python setup_bucket.py
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Start the Scraper

```bash
python main.py
```

The scraper will automatically start collecting news from all configured sources.

## 📊 Supported Countries

The scraper covers 40+ countries including:

- **Global**: Times Higher Education, PIE News, Higher Ed Dive
- **India**: Times of India, India Today, Economic Times
- **Canada**: CBC, Toronto Star, Globe and Mail
- **USA**: New York Times, Washington Post, Inside Higher Ed
- **UK**: The Guardian, BBC, The Independent
- **Australia**: Sydney Morning Herald, The Age, ABC News
- **Germany**: DW, Deutsche Welle, Tagesspiegel
- **France**: Le Monde, Le Figaro, Liberation
- **And 30+ more countries...**

## 🔧 Configuration

### Environment Variables

```bash
# Google Cloud Configuration
GCS_BUCKET_NAME=unifyo-news-images
GCS_CREDENTIALS_PATH=credentials.json

# API Configuration
NEWS_API_URL=http://localhost:8000
```

### Website Configuration

Websites are configured in `main.py` with the following structure:

```python
WEBSITE_CONFIGS = {
    "website-domain.com": {
        "country": "Country Name",
        "type": "rss",  # or "html"
        "url": "https://website.com/feed/"
    }
}
```

## 📡 API Endpoints

### Get News
```http
GET /api/news?country=India&limit=50
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

### Get Countries
```http
GET /api/news/countries
```

### Get Statistics
```http
GET /api/news/stats
```

## 🖼️ Image Processing

The scraper automatically:
1. Extracts images from RSS feeds and HTML content
2. Validates image size (max 5MB)
3. Uploads to Google Cloud Storage
4. Optimizes for web delivery
5. Provides public URLs for frontend access

## 🛡️ Error Handling

- **Retry Mechanisms**: Automatic retries with exponential backoff
- **Rate Limiting**: Respects website rate limits
- **Timeout Handling**: Configurable timeouts for different operations
- **Fallback Systems**: Graceful degradation when services fail
- **Logging**: Comprehensive logging for debugging

## 📈 Performance

- **Concurrent Processing**: Up to 20 concurrent requests
- **Smart Caching**: 15-minute cache with intelligent invalidation
- **Background Processing**: Non-blocking image uploads
- **Memory Efficient**: Streaming downloads and processing

## 🔍 Monitoring

The system provides real-time statistics:
- Total articles by country
- Source reliability metrics
- Image processing success rates
- Performance metrics (load times, cache hits)

## 🛠️ Development

### Adding New Sources

1. Add website configuration to `WEBSITE_CONFIGS`
2. Test scraping with individual source
3. Verify country categorization
4. Add to production configuration

### Custom Scrapers

For websites requiring custom scraping logic:

```python
async def custom_scraper(domain: str, config: Dict) -> List[Dict]:
    # Custom scraping logic
    html = await fetch_text(session, config["url"])
    # Parse and extract articles
    return articles
```

## 📄 License

This project is part of the UnifyO platform for international student news.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add comprehensive tests
4. Submit a pull request

## 📞 Support

For issues and questions:
- Check the logs in the server console
- Verify Google Cloud configuration
- Test individual website accessibility
- Review rate limiting and timeouts

---

**Note**: This scraper is designed for educational and research purposes. Always respect website terms of service and implement appropriate delays between requests.
