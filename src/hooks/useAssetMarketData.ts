import { useState, useEffect, useCallback } from 'react';
import { mockApi } from '../data/mockApi';

interface UseAssetMarketDataOptions {
  assetType?: 'character' | 'creator' | 'bond' | 'fund' | 'location' | 'gadget' | 'comic';
  symbol?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
  category?: string;
  filters?: Record<string, any>;
}

interface UseAssetMarketDataReturn<T = any> {
  data: T[] | T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  lastUpdated: Date | null;
}

export function useAssetMarketData<T = any>(
  options: UseAssetMarketDataOptions = {}
): UseAssetMarketDataReturn<T> {
  const [data, setData] = useState<T[] | T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const {
    assetType,
    symbol,
    autoRefresh = true,
    refreshInterval = 5000, // 5 seconds for real-time feel
    category,
    filters = {}
  } = options;

  const fetchData = useCallback(async () => {
    if (!assetType && !symbol) {
      setError('Either assetType or symbol must be provided');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let result;
      
      if (symbol) {
        // Fetch single asset by symbol
        result = await mockApi.fetchAssetBySymbol(symbol);
        if (!result) {
          throw new Error(`Asset with symbol ${symbol} not found`);
        }
      } else if (assetType) {
        // Fetch all assets of a specific type
        result = await mockApi.fetchAssets(assetType);
        
        // Apply category filter if provided
        if (category && category !== 'all') {
          result = result.filter((asset: any) => {
            if (assetType === 'character') return asset.characterType === category;
            if (assetType === 'location') return asset.locationType === category;
            if (assetType === 'bond') return asset.type === category;
            if (assetType === 'fund') return asset.type === category;
            if (assetType === 'comic') return asset.category === category;
            return true;
          });
        }
        
        // Apply additional filters
        Object.entries(filters).forEach(([key, value]) => {
          if (value && value !== 'all') {
            result = result.filter((asset: any) => asset[key] === value);
          }
        });
      }

      setData(result as T[] | T);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Asset fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch asset data');
    } finally {
      setIsLoading(false);
    }
  }, [assetType, symbol, category, filters]);

  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh setup
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchData();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch,
    lastUpdated
  };
}

// Hook for trading activities
export function useTradingActivities(limit: number = 10) {
  const [activities, setActivities] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await mockApi.fetchTradingActivities(limit);
      setActivities(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trading activities');
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchActivities();
    
    // Refresh activities every 3-5 seconds
    const interval = setInterval(fetchActivities, Math.random() * 2000 + 3000);
    return () => clearInterval(interval);
  }, [fetchActivities]);

  return { activities, isLoading, error, refetch: fetchActivities };
}

// Hook for portfolio data
export function usePortfolioData() {
  const [portfolio, setPortfolio] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolio = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [holdings, summary] = await Promise.all([
        mockApi.fetchPortfolioHoldings(),
        mockApi.fetchPortfolioSummary()
      ]);
      setPortfolio({ holdings, summary });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch portfolio data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolio();
    
    // Refresh portfolio every 10 seconds
    const interval = setInterval(fetchPortfolio, 10000);
    return () => clearInterval(interval);
  }, [fetchPortfolio]);

  return { portfolio, isLoading, error, refetch: fetchPortfolio };
}

// Hook for market performance data
export function useMarketPerformanceData() {
  const [performance, setPerformance] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPerformance = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await mockApi.fetchMarketPerformance();
      setPerformance(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch market performance');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPerformance();
    
    // Refresh performance data every 8 seconds
    const interval = setInterval(fetchPerformance, 8000);
    return () => clearInterval(interval);
  }, [fetchPerformance]);

  return { performance, isLoading, error, refetch: fetchPerformance };
}

// Hook for market insights
export function useMarketInsights() {
  const [insights, setInsights] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await mockApi.fetchMarketInsights();
      setInsights(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch market insights');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInsights();
    
    // Refresh insights every 30 seconds
    const interval = setInterval(fetchInsights, 30000);
    return () => clearInterval(interval);
  }, [fetchInsights]);

  return { insights, isLoading, error, refetch: fetchInsights };
}

// Hook for searching across all asset types
export function useAssetSearch(query: string) {
  const [results, setResults] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const searchResults = await mockApi.searchAssets(searchQuery);
      setResults(searchResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      search(query);
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [query, search]);

  return { results, isLoading, error, search };
}

// Hook for market overview data
export function useMarketOverview() {
  const [marketData, setMarketData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMarketData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const overview = await mockApi.fetchMarketOverview();
      setMarketData(overview);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch market data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMarketData();
    
    // Refresh market overview every 10 seconds
    const interval = setInterval(fetchMarketData, 10000);
    return () => clearInterval(interval);
  }, [fetchMarketData]);

  return { marketData, isLoading, error, refetch: fetchMarketData };
}