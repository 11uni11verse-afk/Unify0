import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { NewsArticle } from '@/lib/news';
import NewsCard from './NewsCard';
import NewsSkeleton from './NewsSkeleton';

interface VirtualizedNewsListProps {
  articles: NewsArticle[];
  isLoading?: boolean;
  onArticleClick?: (article: NewsArticle) => void;
  containerWidth?: number;
  containerHeight?: number;
}

const VirtualizedNewsList: React.FC<VirtualizedNewsListProps> = ({
  articles,
  isLoading = false,
  onArticleClick,
  containerWidth = 1200,
  containerHeight = 800,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 100 }); // Show more articles initially
  const [columnCount, setColumnCount] = useState(4);

  // Calculate column count based on container width - aligned with Tailwind breakpoints
  useEffect(() => {
    const calculateColumns = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth || containerWidth;
        if (width >= 1280) setColumnCount(4); // xl breakpoint
        else if (width >= 1024) setColumnCount(3); // lg breakpoint
        else if (width >= 768) setColumnCount(2); // md breakpoint (adjusted from 640 to match Tailwind)
        else setColumnCount(1); // mobile
      }
    };

    calculateColumns();
    window.addEventListener('resize', calculateColumns);
    return () => window.removeEventListener('resize', calculateColumns);
  }, [containerWidth]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!containerRef.current || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleRange((prev) => ({
              start: Math.min(prev.start, Math.max(0, index - 10)),
              end: Math.max(prev.end, Math.min(articles.length, index + 20)),
            }));
          }
        });
      },
      { rootMargin: '200px' }
    );

    const cards = containerRef.current.querySelectorAll('[data-index]');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [articles, isLoading]);

  const handleArticleClick = useCallback((article: NewsArticle) => {
    if (onArticleClick) {
      onArticleClick(article);
    } else {
      window.open(article.link, '_blank');
    }
  }, [onArticleClick]);

  if (isLoading && articles.length === 0) {
    return <NewsSkeleton count={8} />;
  }

  // Render visible articles with lazy loading
  const visibleArticles = useMemo(() => {
    return articles.slice(visibleRange.start, visibleRange.end);
  }, [articles, visibleRange]);

  return (
    <div
      ref={containerRef}
      className="w-full"
      style={{ minHeight: containerHeight }}
    >
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6`}>
        {visibleArticles.map((article, index) => {
          const actualIndex = visibleRange.start + index;
          return (
            <div
              key={`${article.source}-${article.link}-${actualIndex}`}
              data-index={actualIndex}
            >
              <NewsCard
                article={article}
                onClick={() => handleArticleClick(article)}
              />
            </div>
          );
        })}
      </div>

      {/* Load more indicator */}
      {!isLoading && articles.length > 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">
            Showing {Math.min(visibleRange.end, articles.length)} of {articles.length} articles
          </p>
        </div>
      )}
    </div>
  );
};

export default VirtualizedNewsList;
