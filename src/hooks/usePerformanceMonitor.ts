import { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  articleCount: number;
  memoryUsage?: number;
  cacheHit: boolean;
  networkRequests: number;
}

interface UsePerformanceMonitorOptions {
  enabled?: boolean;
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
}

export const usePerformanceMonitor = (options: UsePerformanceMonitorOptions = {}) => {
  const { enabled = true, onMetricsUpdate } = options;
  const startTimeRef = useRef<number>(performance.now());
  const renderStartTimeRef = useRef<number>(performance.now());
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    articleCount: 0,
    cacheHit: false,
    networkRequests: 0,
  });

  const startLoadTimer = () => {
    startTimeRef.current = performance.now();
  };

  const endLoadTimer = (articleCount: number = 0, cacheHit: boolean = false, networkRequests: number = 0) => {
    if (!enabled) return;

    const loadTime = performance.now() - startTimeRef.current;
    const newMetrics: PerformanceMetrics = {
      loadTime,
      renderTime: metrics.renderTime,
      articleCount,
      cacheHit,
      networkRequests,
      memoryUsage: (performance as any).memory?.usedJSHeapSize,
    };

    setMetrics(newMetrics);
    onMetricsUpdate?.(newMetrics);
  };

  const startRenderTimer = () => {
    renderStartTimeRef.current = performance.now();
  };

  const endRenderTimer = () => {
    if (!enabled) return;

    const renderTime = performance.now() - renderStartTimeRef.current;
    const newMetrics = { ...metrics, renderTime };
    setMetrics(newMetrics);
    onMetricsUpdate?.(newMetrics);
  };

  // Monitor navigation timing
  useEffect(() => {
    if (!enabled) return;

    const handleLoad = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const loadTime = navigation.loadEventEnd - navigation.fetchStart;
        setMetrics(prev => ({ ...prev, loadTime }));
      }
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [enabled]);

  // Monitor resource loading
  useEffect(() => {
    if (!enabled) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const networkRequests = entries.filter(entry =>
        entry.entryType === 'resource' &&
        (entry.name.includes('http') || entry.name.includes('https'))
      ).length;

      setMetrics(prev => ({ ...prev, networkRequests }));
    });

    observer.observe({ entryTypes: ['resource'] });

    return () => observer.disconnect();
  }, [enabled]);

  return {
    metrics,
    startLoadTimer,
    endLoadTimer,
    startRenderTimer,
    endRenderTimer,
  };
};
