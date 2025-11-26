import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
// Local images
import heroStudents from "@/assets/hero-students.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ArrowRight, Search, Filter, Sparkles, Globe2, BookOpen, Loader2, RefreshCw, BarChart3, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchAllNews,
  fetchAdditionalNews,
  searchNews,
  filterNewsByCategory,
  saveToCache,
  getCachedNews,
  NewsArticle,
  filterNewsByMultipleCriteria,
  getUniqueCountries,
  getUniqueCities,
  getUniqueCategories,
  enhancedSearchNews,
  fetchNewsFromAPI,
  refreshNewsFromAPI,
  getAvailableCountries,
  getNewsStats
} from "@/lib/news";
import { useToast } from "@/hooks/use-toast";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import VirtualizedNewsList from "@/components/VirtualizedNewsList";
import NewsSkeleton from "@/components/NewsSkeleton";

const News = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 1200, height: 800 });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [availableCountriesFromAPI, setAvailableCountriesFromAPI] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [featuredNews, setFeaturedNews] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [availableCountries, setAvailableCountries] = useState<string[]>([]);
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  const categories = ["All", "Visa Updates", "Scholarships", "Work Permits", "Student Life", "Finance", "Wellbeing", "Opportunities", "General"];

  // Performance monitoring
  const { metrics, startLoadTimer, endLoadTimer, startRenderTimer, endRenderTimer } = usePerformanceMonitor({
    enabled: true,
    onMetricsUpdate: (newMetrics) => {
      console.log('News Performance:', newMetrics);
      if (newMetrics.loadTime > 5000) {
        toast({
          title: "Slow loading detected",
          description: `News took ${newMetrics.loadTime.toFixed(0)}ms to load`,
          variant: "destructive",
        });
      }
    }
  });

  // Register service worker for offline caching
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  // Track container dimensions for responsive virtualization
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerDimensions({
          width: Math.max(rect.width - 48, 320), // Min width 320px
          height: Math.min(window.innerHeight * 0.8, 1200), // Max height based on viewport
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Load available countries on mount
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countries = await getAvailableCountries();
        setAvailableCountriesFromAPI(countries);
      } catch (error) {
        console.warn('Failed to load countries from API:', error);
      }
    };
    loadCountries();
  }, []);

  // Fetch news on component mount
  useEffect(() => {
    startLoadTimer();
    const cached = getCachedNews();
    if (cached && cached.length > 0) {
      setNewsArticles(cached);
      const featured = cached.find(a => a.impact === 'High') || cached[0];
      setFeaturedNews(featured || null);
      setIsLoading(false);
      updateAvailableFilters(cached);
      endLoadTimer(cached.length, true, 0);
      startRenderTimer();
      loadNews(true, false); // Load all articles, not just priority ones
    } else {
      loadNews(true, false); // Load all articles, not just priority ones
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update available filters when news articles change
  const updateAvailableFilters = (articles: NewsArticle[]) => {
    setAvailableCountries(getUniqueCountries(articles));
    setAvailableCities(getUniqueCities(articles));
    setAvailableCategories(getUniqueCategories(articles));
  };

  // Filter articles when any filter changes (debounced)
  useEffect(() => {
    const handle = setTimeout(() => {
      const filtered = filterNewsByMultipleCriteria(newsArticles, {
        category: selectedCategory,
        country: selectedCountry,
        city: selectedCity,
        startDate,
        endDate,
        searchQuery
      });
      setFilteredArticles(filtered);
    }, 200);
    return () => clearTimeout(handle);
  }, [selectedCategory, selectedCountry, selectedCity, startDate, endDate, searchQuery, newsArticles]);

  const loadNews = async (useCache: boolean = true, priorityOnly: boolean = true, country?: string) => {
    if (!priorityOnly) startLoadTimer();
    setIsLoading(true);

    try {
      // Try API first
      const apiArticles = await fetchNewsFromAPI({
        limit: priorityOnly ? 200 : 500, // Increased limits to show more articles
        country: country && country !== 'All' ? country : undefined,
        priority_only: priorityOnly
      });

      let articles = apiArticles;

      // Fallback to legacy method if API fails
      if (articles.length === 0) {
        articles = await fetchAllNews(useCache, priorityOnly, country);
      }

      setNewsArticles(articles);

      const featured = articles.find(a => a.impact === 'High') || articles[0];
      setFeaturedNews(featured || null);
      updateAvailableFilters(articles);

      if (!priorityOnly) {
        endLoadTimer(articles.length, false, 10); // Approximate network requests
        endRenderTimer();
      }

      if (articles.length > 0) {
        toast({
          title: "News loaded",
          description: `Loaded ${articles.length} articles${priorityOnly ? ' (loading more...)' : ''}.`,
        });
      }

      if (priorityOnly && articles.length > 0) {
        setIsLoading(false);
        // Load additional news in background
        fetchAdditionalNews().then((additionalArticles) => {
          if (additionalArticles.length > 0) {
            const combined = [...articles, ...additionalArticles]
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setNewsArticles(combined);
            updateAvailableFilters(combined);
            saveToCache(combined);
          }
        }).catch(() => {
          // Silently fail background loading
        });
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error loading news:', error);
      toast({
        title: "Error loading news",
        description: "Failed to fetch news articles. Please try again later.",
        variant: "destructive",
      });
      setIsLoading(false);
      if (!priorityOnly) {
        endLoadTimer(0, false, 0);
        endRenderTimer();
      }
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Use the new API refresh endpoint
      const result = await refreshNewsFromAPI({
        countries: selectedCountry !== 'All' ? [selectedCountry] : undefined,
        upload_images: true
      });

      if (result.articles.length > 0) {
        setNewsArticles(result.articles);
        const featured = result.articles.find(a => a.impact === 'High') || result.articles[0];
        setFeaturedNews(featured || null);
        updateAvailableFilters(result.articles);
        saveToCache(result.articles);

        toast({
          title: "News refreshed",
          description: `Loaded ${result.count} articles from ${availableCountriesFromAPI.length} countries.`,
        });
      }
    } catch (error) {
      console.error('Error refreshing news:', error);
      // Fallback to old method
      await loadNews(false, false, selectedCountry);
    }
    setIsRefreshing(false);
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedCountry("All");
    setSelectedCity("All");
    setStartDate(undefined);
    setEndDate(undefined);
    setSearchQuery("");
  };

  const getImpactColor = (impact: string) => {
    switch(impact) {
      case "High": return "bg-error-500 text-white";
      case "Medium": return "bg-warning-500 text-white";
      case "Low": return "bg-info-500 text-white";
      default: return "bg-neutral-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="International Student News & Updates"
        description="Stay informed with the latest news, visa updates, scholarships, and opportunities for international students worldwide. Your trusted source for student news."
        url="https://unify0.com/news"
        keywords={[
          "international student news",
          "study abroad visa updates",
          "scholarship opportunities news",
          "work permit news students",
          "global education news"
        ]}
      />
      <Navbar />
      
      {/* Hero Section - Modern Minimal Design */}
      <section id="main-content" className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-background to-secondary-50/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.05),transparent_50%)]"></div>
        
        <div className="container-fluid content-width relative z-10 container-px">
          <div className="max-w-4xl mx-auto text-center content-gap">
            {/* Accent badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Stay Updated</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              International Student{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                News Hub
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Your trusted source for visa updates, scholarships, and opportunities tailored for international students worldwide
            </p>

            {/* Search bar - Enhanced mobile design */}
            <div className="max-w-2xl mx-auto mt-6 sm:mt-8 px-4 sm:px-0">
              <div className="relative group">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-focus-within:text-primary transition-colors flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search news articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:border-primary focus:bg-background transition-all text-sm sm:text-base min-h-[44px] touch-manipulation"
                />
              </div>
            </div>
            
            {/* Refresh button */}
            <div className="flex justify-center mt-4">
              <Button
                variant="outline"
                onClick={handleRefresh}
                disabled={isRefreshing || isLoading}
                className="gap-2"
              >
                {isRefreshing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Refreshing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    Refresh News
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article - Responsive Modern Layout */}
      {featuredNews && (
        <section className="py-12 sm:py-16 bg-background">
          <div className="container-fluid container-px">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100 shadow-large hover:shadow-layered-lg transition-all duration-500 group border border-neutral-200">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image - Optimized for mobile */}
                <div className="relative h-[250px] sm:h-[300px] lg:h-auto min-h-[350px] sm:min-h-[400px] order-2 lg:order-1">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:hidden z-10"></div>
                  <img
                    src={
                      featuredNews.image ||
                      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=800&fit=crop&crop=entropy&cs=srgb&fm=webp&q=85"
                    }
                    alt={featuredNews.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  {/* Impact badge on image */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
                    <Badge className={`${getImpactColor(featuredNews.impact || 'Medium')} px-2 py-1 sm:px-3 sm:py-1.5 text-xs font-bold shadow-lg`}>
                      {featuredNews.impact || 'Medium'} Impact
                    </Badge>
                  </div>
                </div>

                {/* Content - Better mobile spacing */}
                <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center order-1 lg:order-2 relative z-10">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                      <Badge variant="secondary" className="text-sm px-3 py-1 w-fit group-hover:scale-105 transition-transform duration-300">
                        {featuredNews.category || 'General'}
                      </Badge>
                      <span className="text-sm text-muted-foreground">Featured Story</span>
                      <span className="text-xs text-muted-foreground hidden sm:inline">• {featuredNews.source}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight tracking-tight">
                      {featuredNews.title}
                    </h2>

                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed line-clamp-3 lg:line-clamp-4">
                      {featuredNews.excerpt}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-muted-foreground pt-3 sm:pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm sm:text-base">{new Date(featuredNews.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span className="text-sm sm:text-base">{featuredNews.readTime || '5 min read'}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button
                        size="lg"
                        className="group w-full sm:w-auto"
                        onClick={() => navigate(`/news/${featuredNews.id}`)}
                      >
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter - Enhanced Mobile UX */}
      <section className="py-4 sm:py-6 bg-white sticky top-16 z-40 border-y border-neutral-200 backdrop-blur-lg bg-white/95 shadow-sm">
        <div className="container-fluid container-px">
          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex items-center gap-2 text-sm text-neutral-600 flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                <Filter className="w-4 h-4 text-primary-600 flex-shrink-0" />
              </div>
              <span className="font-semibold hidden sm:inline text-neutral-900">Filter:</span>
            </div>
            <div className="flex gap-2 sm:gap-3">
              {/* Country Filter Pills */}
              {availableCountriesFromAPI.slice(0, 8).map((country) => (
                <button
                  key={`country-${country}`}
                  onClick={() => {
                    setSelectedCountry(country);
                    setSelectedCategory("All"); // Reset category when selecting country
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap min-h-[44px] touch-manipulation flex items-center gap-2 shadow-small hover:shadow-medium ${
                    selectedCountry === country
                      ? 'bg-gradient-to-br from-accent-500 to-accent-600 text-white scale-105 shadow-medium'
                      : 'bg-white border border-neutral-200 text-neutral-700 hover:border-accent-300 hover:bg-accent-50 hover:scale-105'
                  }`}
                >
                  <Globe2 className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">{country}</span>
                  <span className="sm:hidden">{country.slice(0, 3)}</span>
                </button>
              ))}

              {/* Category Filter Pills */}
              {categories.map((category) => (
                <button
                  key={`category-${category}`}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap min-h-[44px] touch-manipulation shadow-small hover:shadow-medium ${
                    selectedCategory === category
                      ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white scale-105 shadow-medium'
                      : 'bg-white border border-neutral-200 text-neutral-700 hover:border-primary-300 hover:bg-primary-50 hover:scale-105'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Filters Section - Enhanced Mobile Layout */}
      {showAdvancedFilters && (
        <section className="py-6 bg-neutral-50 border-b border-neutral-200">
          <div className="container-fluid container-px">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Country Filter */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-900 flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-primary-600" />
                  Country
                </label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 bg-white focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 text-sm min-h-[44px] touch-manipulation shadow-small hover:shadow-medium transition-all duration-300 font-medium"
                >
                  <option value="All">All Countries</option>
                  {(availableCountriesFromAPI.length > 0 ? availableCountriesFromAPI : availableCountries).map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* City Filter */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-neutral-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-secondary-600" />
                  City
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 bg-white focus:outline-none focus:border-secondary-500 focus:ring-2 focus:ring-secondary-100 text-sm disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] touch-manipulation shadow-small hover:shadow-medium transition-all duration-300 font-medium"
                  disabled={availableCities.length === 0}
                >
                  <option value="All">All Cities</option>
                  {availableCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start Date Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">From Date</label>
                <input
                  type="date"
                  value={startDate ? startDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : undefined)}
                  className="w-full px-3 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm min-h-[44px] touch-manipulation"
                />
              </div>

              {/* End Date Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">To Date</label>
                <input
                  type="date"
                  value={endDate ? endDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : undefined)}
                  className="w-full px-3 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm min-h-[44px] touch-manipulation"
                />
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4 sm:mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="text-xs w-full sm:w-auto touch-manipulation"
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Toggle Advanced Filters Button */}
      <div className="flex justify-center py-4 bg-background border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          {showAdvancedFilters ? (
            <>Hide Advanced Filters</>
          ) : (
            <>Show Advanced Filters • Country, City, Dates</>
          )}
        </Button>
      </div>


      {/* News Grid - Ultra-High Performance Virtualized List */}
      <section className="section-py bg-background" ref={containerRef}>
        <div className="container-fluid container-px">
          {/* Section header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                {selectedCategory === "All" ? "Latest News" : selectedCategory}
              </h2>
              <p className="text-muted-foreground mt-1">
                {isLoading ? 'Loading...' : `${filteredArticles.length} ${filteredArticles.length === 1 ? 'article' : 'articles'}`}
              </p>
            </div>
            {/* Performance indicator */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <div className={`w-2 h-2 rounded-full ${metrics.loadTime < 2000 ? 'bg-green-500' : metrics.loadTime < 5000 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
              <span>{metrics.loadTime < 2000 ? 'Fast' : metrics.loadTime < 5000 ? 'Good' : 'Slow'}</span>
            </div>
          </div>

          {filteredArticles.length === 0 && !isLoading ? (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground mb-4">No articles found.</p>
              <Button onClick={handleRefresh} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh News
              </Button>
            </div>
          ) : (
            <VirtualizedNewsList
              articles={filteredArticles}
              isLoading={isLoading}
              containerWidth={containerDimensions.width}
              containerHeight={containerDimensions.height}
              onArticleClick={(article) => {
                navigate(`/news/${article.id}`);
              }}
            />
          )}
        </div>
      </section>

      {/* Quick Links Section - Modern Grid */}
      <section className="section-py bg-gradient-to-b from-neutral-50 to-background">
        <div className="container-fluid container-px">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Explore More</h2>
            <p className="text-lg text-muted-foreground">Quick access to essential resources</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="group hover:shadow-layered-lg transition-all cursor-pointer border-2 hover:border-primary/30">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Globe2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Country Guides</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive guides for studying in different countries
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-layered-lg transition-all cursor-pointer border-2 hover:border-secondary/30">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Scholarship Database</h3>
                <p className="text-sm text-muted-foreground">
                  Browse thousands of scholarships for international students
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-layered-lg transition-all cursor-pointer border-2 hover:border-accent/30">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold">Student Stories</h3>
                <p className="text-sm text-muted-foreground">
                  Real experiences from international students worldwide
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter CTA - Glassmorphism Design */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(0_0%_100%/0.1),transparent_50%)]"></div>
        
        <div className="container-fluid content-width relative z-10 container-px">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-2">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Stay Informed</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Never miss an update
            </h2>
            <p className="text-lg text-white/90">
              Get the latest international student news, visa updates, and scholarship opportunities delivered to your inbox weekly
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all"
              />
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold shadow-xl sm:w-auto">
                Subscribe
              </Button>
            </div>

            <p className="text-sm text-white/70 pt-2">
              Join 10,000+ students staying informed. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default News;