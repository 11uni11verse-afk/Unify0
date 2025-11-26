import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { NewsArticle } from "@/lib/news";

interface NewsCardProps {
  article: NewsArticle;
  onClick?: () => void;
  className?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, onClick, className = "" }) => {
  return (
    <Card
      className={`group hover:shadow-layered-xl transition-all duration-300 cursor-pointer overflow-hidden border-2 hover:border-primary/20 bg-card h-full flex flex-col touch-manipulation ${className}`}
      onClick={onClick}
    >
      {/* Image with overlay - optimized for mobile */}
      <div className="relative h-44 sm:h-48 lg:h-56 overflow-hidden">
        <img
          src={article.image || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop"}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
          style={{ contentVisibility: 'auto' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

        {/* Category badge on image */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
          <Badge variant="secondary" className="backdrop-blur-sm bg-white/90 text-foreground shadow-md text-xs px-2 py-1">
            {article.category || 'General'}
          </Badge>
        </div>

        {/* Impact indicator */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
          <div className={`w-3 h-3 rounded-full ${
            article.impact === "High" ? "bg-error-500" :
            article.impact === "Medium" ? "bg-warning-500" :
            "bg-info-500"
          } shadow-lg`}></div>
        </div>
      </div>

      <CardContent className="p-3 sm:p-4 lg:p-6 space-y-2 sm:space-y-3 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base sm:text-lg lg:text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2 flex-1">
            {article.title}
          </h3>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-3 flex-1">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-border mt-auto">
          <div className="flex flex-col gap-1 text-xs text-muted-foreground min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 flex-shrink-0" />
              <span className="text-xs truncate">{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 flex-shrink-0" />
              <span className="text-xs">{article.readTime || '5 min'}</span>
            </div>
            <div className="text-xs text-primary font-medium truncate">
              {article.source}
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
