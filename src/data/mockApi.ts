// Centralized Mock API for Panel Profits
// This simulates a real backend API with dynamic market data

import { Character, Bond, Fund, Location, Gadget, Creator } from '../types';

// Market simulation state
let marketSimulation = {
  lastUpdate: Date.now(),
  volatility: 0.02, // 2% base volatility
  trend: 0.001, // 0.1% upward trend
  marketOpen: true
};

// Base asset data (consolidated from individual data files)
const baseCharacters: Character[] = [
  {
    id: '1',
    name: 'Spider-Man',
    symbol: 'SPDR',
    characterType: 'hero',
    price: 3500,
    change: 175,
    percentageChange: 5.3,
    marketCap: 175000000,
    volume: 2500,
    rating: 'Strong Buy',
    firstAppearance: 'Amazing Fantasy #15 (1962)',
    publisher: 'Marvel',
    powers: ['Wall-crawling', 'Spider-sense', 'Super strength', 'Web-slinging', 'Agility', 'Reflexes'],
    nemesis: 'Green Goblin',
    allies: ['Mary Jane Watson', 'Aunt May', 'Gwen Stacy', 'Miles Morales', 'Spider-Woman'],
    popularity: 98,
    mediaAppearances: 45,
    description: 'The friendly neighborhood Spider-Man, one of Marvel\'s most iconic and beloved superheroes.',
    avatar: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=150&h=150&fit=crop'
  },
  {
    id: '2',
    name: 'Batman',
    symbol: 'BATM',
    characterType: 'hero',
    price: 4200,
    change: 210,
    percentageChange: 5.3,
    marketCap: 210000000,
    volume: 3200,
    rating: 'Strong Buy',
    firstAppearance: 'Detective Comics #27 (1939)',
    publisher: 'DC',
    powers: ['Martial arts mastery', 'Detective skills', 'Advanced technology', 'Peak human condition', 'Strategic genius', 'Intimidation'],
    nemesis: 'The Joker',
    allies: ['Robin', 'Alfred Pennyworth', 'Commissioner Gordon', 'Batgirl', 'Nightwing'],
    popularity: 99,
    mediaAppearances: 52,
    description: 'The Dark Knight of Gotham City, a symbol of justice and determination.',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop'
  },
  {
    id: '3',
    name: 'The Joker',
    symbol: 'JOKR',
    characterType: 'villain',
    price: 3800,
    change: -76,
    percentageChange: -2.0,
    marketCap: 190000000,
    volume: 2800,
    rating: 'Buy',
    firstAppearance: 'Batman #1 (1940)',
    publisher: 'DC',
    powers: ['Criminal genius', 'Unpredictability', 'Chemical immunity', 'Madness', 'Manipulation', 'Fear tactics'],
    nemesis: 'Batman',
    allies: ['Harley Quinn', 'Penguin', 'Two-Face', 'Riddler'],
    popularity: 95,
    mediaAppearances: 38,
    description: 'The Clown Prince of Crime, Batman\'s greatest and most unpredictable foe.',
    avatar: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop'
  }
];

const baseCreators: Creator[] = [
  {
    id: '1',
    name: 'Todd McFarlane',
    symbol: 'TMFS',
    role: 'Artist/Writer',
    age: 62,
    price: 2500.00,
    change: 125.00,
    percentageChange: 5.2,
    marketCap: 125000000,
    volume: 1250,
    rating: 'Strong Buy',
    nextProject: 'Spawn #350',
    recentWorks: ['Spawn #349', 'Spider-Man #1', 'Venom #1'],
    yearsActive: 35,
    awards: 12,
    popularity: 95,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Jim Lee',
    symbol: 'JLES',
    role: 'Artist/Executive',
    age: 59,
    price: 3200.00,
    change: 160.00,
    percentageChange: 5.3,
    marketCap: 160000000,
    volume: 1800,
    rating: 'Strong Buy',
    nextProject: 'Justice League Redesign',
    recentWorks: ['Batman #100', 'Superman #1000', 'Justice League #75'],
    yearsActive: 32,
    awards: 20,
    popularity: 98,
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face'
  }
];

const baseBonds: Bond[] = [
  {
    id: '1',
    name: 'Todd McFarlane Creative Bond',
    symbol: 'TMFB',
    type: 'creator',
    price: 1050.25,
    change: 21.05,
    percentageChange: 2.04,
    yield: 4.2,
    maturity: '2029-12-31',
    creditRating: 'AA',
    issuer: 'McFarlane Entertainment',
    couponRate: 4.0,
    faceValue: 1000,
    volume: 500,
    description: 'Bond backed by Todd McFarlane\'s intellectual property and royalty streams.',
    riskLevel: 'Low',
    interestFrequency: 'Semi-Annual'
  },
  {
    id: '2',
    name: 'Marvel Entertainment Bond',
    symbol: 'MRVLB',
    type: 'publisher',
    price: 1035.50,
    change: 8.25,
    percentageChange: 0.80,
    yield: 3.2,
    maturity: '2027-03-15',
    creditRating: 'AAA',
    issuer: 'Marvel Entertainment',
    couponRate: 3.0,
    faceValue: 1000,
    volume: 1200,
    description: 'Corporate bond issued by Marvel Entertainment for expansion and content development.',
    riskLevel: 'Low',
    interestFrequency: 'Semi-Annual'
  }
];

const baseFunds: Fund[] = [
  {
    id: '1',
    name: 'Superhero Universe Fund',
    symbol: 'SHUF',
    type: 'themed',
    nav: 25.75,
    change: 0.45,
    percentageChange: 1.78,
    aum: 450000000,
    managementFee: 0.75,
    expenseRatio: 0.85,
    ytdReturn: 12.5,
    oneYearReturn: 18.2,
    threeYearReturn: 8.7,
    riskLevel: 'Medium',
    manager: 'Comic Capital Management',
    inceptionDate: '2019-03-15',
    description: 'Diversified fund focusing on superhero characters across all publishers and eras.',
    topHoldings: [
      { symbol: 'SPDR', name: 'Spider-Man', weight: 12.5 },
      { symbol: 'BATM', name: 'Batman', weight: 11.8 },
      { symbol: 'SUPR', name: 'Superman', weight: 10.2 },
      { symbol: 'WNDR', name: 'Wonder Woman', weight: 8.9 }
    ]
  }
];

const baseLocations: Location[] = [
  {
    id: '1',
    name: 'Batcave',
    symbol: 'BTCV',
    locationType: 'hangout',
    price: 15000,
    change: 750,
    percentageChange: 5.3,
    marketCap: 750000000,
    volume: 1200,
    rating: 'Strong Buy',
    firstAppearance: 'Batman #12 (1942)',
    publisher: 'DC',
    associatedCharacters: ['Batman', 'Robin', 'Alfred'],
    significance: 98,
    mediaAppearances: 45,
    description: 'Batman\'s secret headquarters beneath Wayne Manor, featuring advanced technology.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop'
  }
];

const baseGadgets: Gadget[] = [
  {
    id: '1',
    name: 'Batman\'s Utility Belt',
    symbol: 'BTUB',
    price: 25000,
    change: 1250,
    percentageChange: 5.3,
    marketCap: 1250000000,
    volume: 1500,
    rating: 'Strong Buy',
    firstAppearance: 'Detective Comics #29 (1939)',
    creator: 'Bob Kane',
    owner: 'Batman',
    publisher: 'DC',
    capabilities: ['Grappling hook', 'Batarangs', 'Smoke bombs', 'First aid supplies', 'Communication devices'],
    significance: 98,
    mediaAppearances: 50,
    description: 'Batman\'s iconic utility belt containing an array of crime-fighting tools and gadgets.',
    image: 'https://images.unsplash.com/photo-1608889476561-6242cfdbf622?w=400&h=300&fit=crop'
  }
];

// Key Comics data for the main pricing engine
const keyComicsData = [
  {
    id: '1',
    title: 'Action Comics',
    symbol: 'ACM1',
    issue: '#1',
    publisher: 'DC Comics',
    year: 1938,
    significance: 'First appearance of Superman',
    currentPrice: 3200000,
    change: 125000,
    percentChange: 4.06,
    grade: 'CGC 9.0',
    firstAppearance: 'Superman',
    keyCharacters: ['Superman', 'Clark Kent'],
    category: 'golden',
    rarity: 'legendary',
    volume: 15
  },
  {
    id: '2',
    title: 'Detective Comics',
    symbol: 'DTM27',
    issue: '#27',
    publisher: 'DC Comics',
    year: 1939,
    significance: 'First appearance of Batman',
    currentPrice: 2800000,
    change: 85000,
    percentChange: 3.13,
    grade: 'CGC 8.5',
    firstAppearance: 'Batman',
    keyCharacters: ['Batman', 'Bruce Wayne'],
    category: 'golden',
    rarity: 'legendary',
    volume: 12
  },
  {
    id: '3',
    title: 'Amazing Fantasy',
    symbol: 'AF15',
    issue: '#15',
    publisher: 'Marvel Comics',
    year: 1962,
    significance: 'First appearance of Spider-Man',
    currentPrice: 1800000,
    change: 95000,
    percentChange: 5.57,
    grade: 'CGC 9.2',
    firstAppearance: 'Spider-Man',
    keyCharacters: ['Spider-Man', 'Peter Parker'],
    category: 'silver',
    rarity: 'legendary',
    volume: 25
  },
  {
    id: '4',
    title: 'Amazing Spider-Man',
    symbol: 'ASM300',
    issue: '#300',
    publisher: 'Marvel Comics',
    year: 1988,
    significance: 'First full appearance of Venom',
    currentPrice: 2500,
    change: 125,
    percentChange: 5.26,
    grade: 'CGC 9.8',
    firstAppearance: 'Venom',
    keyCharacters: ['Venom', 'Spider-Man'],
    category: 'modern',
    rarity: 'rare',
    volume: 1250
  }
];

// Store current asset states (simulates real-time market data)
const currentAssetStates = new Map();

// Initialize asset states
const initializeAssetStates = () => {
  [...baseCharacters, ...baseCreators, ...baseBonds, ...baseFunds, ...baseLocations, ...baseGadgets, ...keyComicsData].forEach(asset => {
    if (!currentAssetStates.has(asset.symbol)) {
      currentAssetStates.set(asset.symbol, { ...asset, lastUpdate: Date.now() });
    }
  });
};

// Simulate market price fluctuations
const simulateMarketMovement = (asset: any) => {
  const now = Date.now();
  const timeDelta = (now - asset.lastUpdate) / 1000; // seconds since last update
  
  if (timeDelta < 1) return asset; // Don't update too frequently
  
  const baseVolatility = marketSimulation.volatility;
  const randomFactor = (Math.random() - 0.5) * 2; // -1 to 1
  const volatility = baseVolatility * randomFactor;
  const trend = marketSimulation.trend;
  
  const priceChange = asset.price * (volatility + trend);
  const newPrice = Math.max(asset.price + priceChange, asset.price * 0.01); // Prevent negative prices
  
  const change = newPrice - asset.price;
  const percentageChange = (change / asset.price) * 100;
  
  // Update volume with some randomness
  const volumeChange = (Math.random() - 0.5) * 0.2; // ±10% volume change
  const newVolume = Math.max(Math.floor(asset.volume * (1 + volumeChange)), 1);
  
  // Update market cap
  const newMarketCap = Math.floor(newPrice * newVolume * 1000); // Simplified calculation
  
  return {
    ...asset,
    price: Math.round(newPrice * 100) / 100,
    change: Math.round(change * 100) / 100,
    percentageChange: Math.round(percentageChange * 100) / 100,
    marketCap: newMarketCap,
    volume: newVolume,
    lastUpdate: now
  };
};

// Initialize on first import
initializeAssetStates();

// API Functions
export const mockApi = {
  // Generic asset fetching
  async fetchAssets(type: 'character' | 'creator' | 'bond' | 'fund' | 'location' | 'gadget' | 'comic'): Promise<any[]> {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 100)); // Simulate network delay
    
    let baseData: any[] = [];
    switch (type) {
      case 'character':
        baseData = baseCharacters;
        break;
      case 'creator':
        baseData = baseCreators;
        break;
      case 'bond':
        baseData = baseBonds;
        break;
      case 'fund':
        baseData = baseFunds;
        break;
      case 'location':
        baseData = baseLocations;
        break;
      case 'gadget':
        baseData = baseGadgets;
        break;
      case 'comic':
        baseData = keyComicsData;
        break;
    }
    
    return baseData.map(asset => {
      const currentState = currentAssetStates.get(asset.symbol);
      if (currentState) {
        const updatedAsset = simulateMarketMovement(currentState);
        currentAssetStates.set(asset.symbol, updatedAsset);
        return updatedAsset;
      }
      return asset;
    });
  },

  // Fetch single asset by symbol
  async fetchAssetBySymbol(symbol: string): Promise<any | null> {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 50));
    
    const currentState = currentAssetStates.get(symbol);
    if (currentState) {
      const updatedAsset = simulateMarketMovement(currentState);
      currentAssetStates.set(symbol, updatedAsset);
      return updatedAsset;
    }
    
    return null;
  },

  // Search assets across all types
  async searchAssets(query: string): Promise<any[]> {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 400 + 100));
    
    const allAssets = [
      ...await this.fetchAssets('character'),
      ...await this.fetchAssets('creator'),
      ...await this.fetchAssets('bond'),
      ...await this.fetchAssets('fund'),
      ...await this.fetchAssets('location'),
      ...await this.fetchAssets('gadget'),
      ...await this.fetchAssets('comic')
    ];
    
    const lowercaseQuery = query.toLowerCase();
    return allAssets.filter(asset => 
      asset.name?.toLowerCase().includes(lowercaseQuery) ||
      asset.symbol?.toLowerCase().includes(lowercaseQuery) ||
      asset.title?.toLowerCase().includes(lowercaseQuery) ||
      asset.description?.toLowerCase().includes(lowercaseQuery) ||
      (asset.keyCharacters && asset.keyCharacters.some((char: string) => char.toLowerCase().includes(lowercaseQuery)))
    );
  },

  // Get market overview data
  async fetchMarketOverview(): Promise<{
    totalMarketCap: number;
    totalVolume: number;
    averageChange: number;
    topGainers: any[];
    topLosers: any[];
  }> {
    const allAssets = [
      ...await this.fetchAssets('character'),
      ...await this.fetchAssets('creator'),
      ...await this.fetchAssets('bond'),
      ...await this.fetchAssets('fund'),
      ...await this.fetchAssets('comic')
    ];
    
    const totalMarketCap = allAssets.reduce((sum, asset) => sum + (asset.marketCap || 0), 0);
    const totalVolume = allAssets.reduce((sum, asset) => sum + (asset.volume || 0), 0);
    const averageChange = allAssets.reduce((sum, asset) => sum + (asset.percentageChange || 0), 0) / allAssets.length;
    
    const topGainers = allAssets
      .filter(asset => asset.percentageChange > 0)
      .sort((a, b) => b.percentageChange - a.percentageChange)
      .slice(0, 5);
    
    const topLosers = allAssets
      .filter(asset => asset.percentageChange < 0)
      .sort((a, b) => a.percentageChange - b.percentageChange)
      .slice(0, 5);
    
    return {
      totalMarketCap,
      totalVolume,
      averageChange,
      topGainers,
      topLosers
    };
  },

  // Update market simulation parameters
  setMarketParameters(params: { volatility?: number; trend?: number; marketOpen?: boolean }) {
    marketSimulation = { ...marketSimulation, ...params };
  },

  // Get current market parameters
  getMarketParameters() {
    return { ...marketSimulation };
  }
};

export default mockApi;