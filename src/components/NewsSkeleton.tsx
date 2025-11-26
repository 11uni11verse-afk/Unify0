import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface NewsSkeletonProps {
  count?: number;
}

const NewsSkeletonCard: React.FC = () => {
  return (
    <Card className="group overflow-hidden border-2 bg-card h-full flex flex-col">
      {/* Image skeleton */}
      <div className="relative h-44 sm:h-48 lg:h-56 overflow-hidden">
        <Skeleton className="w-full h-full" />
        {/* Category badge skeleton */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
          <Skeleton className="h-5 w-14 sm:h-6 sm:w-16 rounded-full" />
        </div>
        {/* Impact indicator skeleton */}
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
          <Skeleton className="w-3 h-3 rounded-full" />
        </div>
      </div>

      <CardContent className="p-3 sm:p-4 lg:p-6 space-y-2 sm:space-y-3 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          {/* Title skeleton */}
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 sm:h-6 w-full" />
            <Skeleton className="h-5 sm:h-6 w-3/4" />
          </div>
        </div>

        {/* Excerpt skeleton */}
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-border mt-auto">
          {/* Metadata skeleton */}
          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <Skeleton className="w-3 h-3 rounded flex-shrink-0" />
              <Skeleton className="h-3 w-12" />
            </div>
            <div className="flex items-center gap-1.5">
              <Skeleton className="w-3 h-3 rounded flex-shrink-0" />
              <Skeleton className="h-3 w-10" />
            </div>
            <Skeleton className="h-3 w-20" />
          </div>
          {/* Arrow skeleton */}
          <Skeleton className="w-4 h-4 rounded flex-shrink-0 ml-2" />
        </div>
      </CardContent>
    </Card>
  );
};

const NewsSkeleton: React.FC<NewsSkeletonProps> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }, (_, index) => (
        <NewsSkeletonCard key={`skeleton-${index}`} />
      ))}
    </div>
  );
};

export default NewsSkeleton;
