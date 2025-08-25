// Market Types
type ComicAge = 'golden' | 'silver' | 'bronze' | 'copper' | 'modern';

export interface MarketState {
  marketIndex: number;
  volatility: number;
  distribution: Record<ComicAge, number>;
  userBalance: number;
  setMarketIndex: (index: number) => void;
  setVolatility: (volatility: number) => void;
  setDistribution: (distribution: Record<ComicAge, number>) => void;
  setUserBalance: (balance: number) => void;
}

export interface NewsItem {
  id: string;
  title: string;
  impact: 'positive' | 'negative' | 'neutral';
  timestamp: Date;
  relatedSecurity?: {
    type: 'comic' | 'creator' | 'publisher' | 'option';
    symbol: string;
    name: string;
  };
}

interface IndexComponent {
  title: string;
  age: ComicAge;
  weight: number;
  significance: string;
  basePrice: number;
}

interface MarketMetrics {
  volume: number;
  averageVolume: number;
  sentiment: number;
  momentum: number;
}

// Trading Types
export interface Option {
  strike: number;
  premium: number;
  volume: number;
  openInterest: number;
  impliedVolatility: number;
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  expiry: string;
}

export interface OptionChain {
  underlying: string;
  currentPrice: number;
  expiryDates: string[];
  calls: Option[];
  puts: Option[];
}

// Creator Types
export interface Creator {
  id: string;
  name: string;
  symbol: string;
  role: string;
  age: number;
  price: number;
  change: number;
  percentageChange: number;
  marketCap: number;
  volume: number;
  rating: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell';
  nextProject?: string;
  recentWorks: string[];
  yearsActive: number;
  awards: number;
  popularity: number;
  avatar?: string;
}

// Bond Types
export interface Bond {
  id: string;
  name: string;
  symbol: string;
  type: 'creator' | 'publisher' | 'specialty';
  price: number;
  change: number;
  percentageChange: number;
  yield: number;
  maturity: string;
  creditRating: 'AAA' | 'AA' | 'A' | 'BBB' | 'BB' | 'B' | 'CCC' | 'CC' | 'C' | 'D';
  issuer: string;
  couponRate: number;
  faceValue: number;
  volume: number;
  description?: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  interestFrequency: 'Annual' | 'Semi-Annual' | 'Quarterly' | 'Monthly';
}

// Fund Types
export interface Fund {
  id: string;
  name: string;
  symbol: string;
  type: 'themed' | 'custom' | 'index' | 'sector';
  nav: number; // Net Asset Value
  change: number;
  percentageChange: number;
  aum: number; // Assets Under Management
  managementFee: number;
  expenseRatio: number;
  ytdReturn: number;
  oneYearReturn: number;
  threeYearReturn?: number;
  fiveYearReturn?: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  manager: string;
  inceptionDate: string;
  description?: string;
  topHoldings: Array<{
    symbol: string;
    name: string;
    weight: number;
  }>;
}

// Character Types
export interface Character {
  id: string;
  name: string;
  symbol: string;
  characterType: 'hero' | 'villain' | 'sidekick' | 'henchman';
  price: number;
  change: number;
  percentageChange: number;
  marketCap: number;
  volume: number;
  rating: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell';
  firstAppearance: string;
  publisher: string;
  powers: string[];
  nemesis?: string;
  allies?: string[];
  popularity: number;
  mediaAppearances: number;
  description?: string;
  avatar?: string;
}

// Location Types
export interface Location {
  id: string;
  name: string;
  symbol: string;
  locationType: 'hangout' | 'hideout';
  price: number;
  change: number;
  percentageChange: number;
  marketCap: number;
  volume: number;
  rating: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell';
  firstAppearance: string;
  publisher: string;
  associatedCharacters: string[];
  significance: number;
  mediaAppearances: number;
  description?: string;
  image?: string;
}

// Gadget Types
export interface Gadget {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  percentageChange: number;
  marketCap: number;
  volume: number;
  rating: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell';
  firstAppearance: string;
  creator: string;
  owner: string;
  publisher: string;
  capabilities: string[];
  significance: number;
  mediaAppearances: number;
  description?: string;
  image?: string;
}

// Idea Management Types
export interface Idea {
  id: string;
  content: string;
  title: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  clusterId?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  priority?: number;
  category?: string;
}

// Idea Mapping Types
export interface IdeaNode {
  id: string;
  label: string;
  description: string;
  category: string;
  tags: string[];
  position?: { x: number; y: number };
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, any>;
}

export interface IdeaRelationship {
  id: string;
  sourceId: string;
  targetId: string;
  type: RelationshipType;
  customLabel?: string;
  strength: RelationshipStrength;
  direction: RelationshipDirection;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type RelationshipType = 
  | 'depends-on'
  | 'related-to'
  | 'contradicts'
  | 'sub-idea-of'
  | 'influences'
  | 'blocks'
  | 'enables'
  | 'custom';

export type RelationshipStrength = 'weak' | 'moderate' | 'strong';
export type RelationshipDirection = 'unidirectional' | 'bidirectional';

export interface IdeaNetwork {
  nodes: IdeaNode[];
  relationships: IdeaRelationship[];
  metadata: {
    totalNodes: number;
    totalRelationships: number;
    averageConnections: number;
    mostConnectedNode?: string;
    criticalPaths: Array<{
      path: string[];
      strength: number;
    }>;
  };
}

export interface NetworkAnalysis {
  centralityScores: Record<string, number>;
  clusteringCoefficient: number;
  shortestPaths: Record<string, Record<string, string[]>>;
  influentialNodes: Array<{
    nodeId: string;
    score: number;
    connections: number;
  }>;
  dependencyChains: Array<{
    chain: string[];
    depth: number;
  }>;
}

export interface IdeaCluster {
  id: string;
  name: string;
  description: string;
  ideas: Idea[];
  keyTerms: string[];
  sentiment?: 'positive' | 'negative' | 'neutral';
  confidence: number;
  size: number;
}

export interface ClusteringResult {
  clusters: IdeaCluster[];
  totalIdeas: number;
  processingTime: number;
  confidence: number;
  suggestions?: string[];
}

// Subscription Types
export type SubscriptionTier = 'basic' | 'standard' | 'premium';

export interface SubscriptionFeatures {
  maxClusters: number;
  realTimeClustering: boolean;
  sentimentAnalysis: boolean;
  crossProjectClustering: boolean;
  advancedVisualization: boolean;
  customClusterMerging: boolean;
  priorityProcessing: boolean;
  exportCapabilities: boolean;
  apiAccess: boolean;
}

export interface SubscriptionState {
  currentTier: SubscriptionTier;
  features: SubscriptionFeatures;
  setTier: (tier: SubscriptionTier) => void;
}