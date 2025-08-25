import { useState, useEffect } from 'react';

export interface NewsItem {
  id: string;
  title: string;
  description?: string;
  content: string;
  publishedAt: Date;
  url: string;
  source: string;
  impact: 'positive' | 'negative' | 'neutral';
  imageUrl?: string;
  keywords: string[];
  relatedSecurity?: {
    type: 'comic' | 'creator' | 'publisher' | 'option';
    symbol: string;
    name: string;
  };
}

interface UseNewsDataReturn {
  data: NewsItem[] | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  lastUpdated: Date | null;
  dataSource: 'api' | 'cache' | 'demo' | null;
  latestStory: NewsItem | null;
}

// Mock data for demonstration
const mockNewsData: NewsItem[] = [
  {
    id: '1',
    title: 'Marvel Studios Announces New Phase 5 Movies',
    description: 'Disney reveals upcoming Marvel Cinematic Universe films through 2025',
    content: 'Marvel Studios has officially announced their Phase 5 lineup, featuring new heroes and returning favorites. The announcement has sparked excitement among comic book fans and investors alike.',
    publishedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    url: 'https://example.com/marvel-phase-5',
    source: 'Comic Book News',
    impact: 'positive',
    imageUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400',
    keywords: ['Marvel', 'Phase 5', 'Movies', 'MCU'],
    relatedSecurity: {
      type: 'publisher',
      symbol: 'MAR',
      name: 'Marvel Comics'
    }
  },
  {
    id: '2',
    title: 'DC Comics Restructures Creative Teams',
    description: 'Major shake-up in editorial leadership affects multiple ongoing series',
    content: 'DC Comics has announced significant changes to their creative structure, with new editors taking over key titles. This restructuring could impact the direction of major storylines.',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    url: 'https://example.com/dc-restructure',
    source: 'Comics Alliance',
    impact: 'neutral',
    imageUrl: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400',
    keywords: ['DC Comics', 'Editorial', 'Restructure'],
    relatedSecurity: {
      type: 'publisher',
      symbol: 'DC',
      name: 'DC Comics'
    }
  },
  {
    id: '3',
    title: 'Image Comics Sales Decline in Q3',
    description: 'Independent publisher reports lower than expected quarterly performance',
    content: 'Image Comics has reported a decline in sales for the third quarter, raising concerns about the independent comic market. Several key titles underperformed expectations.',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    url: 'https://example.com/image-q3-decline',
    source: 'Publishers Weekly',
    impact: 'negative',
    imageUrl: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400',
    keywords: ['Image Comics', 'Sales', 'Q3', 'Performance'],
    relatedSecurity: {
      type: 'publisher',
      symbol: 'IMG',
      name: 'Image Comics'
    }
  }
];

export function useNewsData(): UseNewsDataReturn {
  const [data, setData] = useState<NewsItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be an actual API call
      setData(mockNewsData);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch news data');
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch,
    lastUpdated,
    dataSource: 'demo',
    latestStory: data?.[0] || null
  };
}