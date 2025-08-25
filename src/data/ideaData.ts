import { Idea } from '../types';

// Comic industry-focused idea data for the Panel Profits Innovation Lab
export const mockIdeas: Idea[] = [
  {
    id: '1',
    title: 'AI-Powered Comic Grading Prediction',
    content: 'Develop an AI system that can predict CGC grades based on high-resolution photos of comic books, helping collectors and traders estimate value before submission. This could revolutionize the pre-market assessment process.',
    tags: ['AI', 'grading', 'CGC', 'valuation'],
    createdAt: new Date('2024-05-01'),
    updatedAt: new Date('2024-05-01'),
    sentiment: 'positive',
    priority: 9,
    category: 'technology'
  },
  {
    id: '2',
    title: 'Creator Performance Analytics',
    content: 'Create advanced analytics tracking creator stock performance, correlating it with project announcements, media adaptations, and industry awards. Provide predictive insights for creator stock movements.',
    tags: ['analytics', 'creators', 'performance', 'prediction'],
    createdAt: new Date('2024-05-02'),
    updatedAt: new Date('2024-05-02'),
    sentiment: 'positive',
    priority: 8,
    category: 'analytics'
  },
  {
    id: '3',
    title: 'Comic Convention Trading Floor',
    content: 'Establish virtual trading floors during major comic conventions (SDCC, NYCC) where users can trade in real-time based on convention announcements and reveals.',
    tags: ['conventions', 'trading', 'events', 'real-time'],
    createdAt: new Date('2024-05-03'),
    updatedAt: new Date('2024-05-03'),
    sentiment: 'positive',
    priority: 7,
    category: 'events'
  },
  {
    id: '4',
    title: 'Cross-Media Impact Tracking',
    content: 'Build a system that tracks how movie announcements, TV shows, and streaming series affect related comic asset prices. Create correlation models for media impact prediction.',
    tags: ['media', 'correlation', 'movies', 'TV', 'impact'],
    createdAt: new Date('2024-05-04'),
    updatedAt: new Date('2024-05-04'),
    sentiment: 'positive',
    priority: 8,
    category: 'analytics'
  },
  {
    id: '5',
    title: 'Publisher Strategy Intelligence',
    content: 'Analyze publisher business strategies by tracking their character developments, crossover events, and media partnerships to predict market movements.',
    tags: ['publishers', 'strategy', 'intelligence', 'crossovers'],
    createdAt: new Date('2024-05-05'),
    updatedAt: new Date('2024-05-05'),
    sentiment: 'positive',
    priority: 7,
    category: 'strategy'
  },
  {
    id: '6',
    title: 'Vintage Comic Authentication System',
    content: 'Develop blockchain-based authentication for vintage comics, creating an immutable provenance record that increases market confidence and asset value.',
    tags: ['blockchain', 'authentication', 'vintage', 'provenance'],
    createdAt: new Date('2024-05-06'),
    updatedAt: new Date('2024-05-06'),
    sentiment: 'neutral',
    priority: 6,
    category: 'technology'
  },
  {
    id: '7',
    title: 'Character Arc Prediction Model',
    content: 'Use AI to analyze character development patterns across comic history to predict which characters are likely to experience major story developments that could impact their market value.',
    tags: ['AI', 'characters', 'prediction', 'story-arcs'],
    createdAt: new Date('2024-05-07'),
    updatedAt: new Date('2024-05-07'),
    sentiment: 'positive',
    priority: 8,
    category: 'analytics'
  },
  {
    id: '8',
    title: 'Comic Age Transition Analysis',
    content: 'Study the transition periods between comic ages (Silver to Bronze, Bronze to Modern) to identify patterns that could predict the next major shift in the industry.',
    tags: ['comic-ages', 'transitions', 'analysis', 'history'],
    createdAt: new Date('2024-05-08'),
    updatedAt: new Date('2024-05-08'),
    sentiment: 'neutral',
    priority: 6,
    category: 'research'
  },
  {
    id: '9',
    title: 'Social Media Sentiment Engine',
    content: 'Build a real-time sentiment analysis engine that monitors social media, forums, and comic communities to gauge public opinion on characters, creators, and storylines.',
    tags: ['sentiment', 'social-media', 'real-time', 'communities'],
    createdAt: new Date('2024-05-09'),
    updatedAt: new Date('2024-05-09'),
    sentiment: 'positive',
    priority: 8,
    category: 'analytics'
  },
  {
    id: '10',
    title: 'Independent Publisher Discovery',
    content: 'Create algorithms to identify promising independent publishers and creators before they achieve mainstream recognition, providing early investment opportunities.',
    tags: ['independent', 'discovery', 'early-investment', 'emerging'],
    createdAt: new Date('2024-05-10'),
    updatedAt: new Date('2024-05-10'),
    sentiment: 'positive',
    priority: 7,
    category: 'discovery'
  },
  {
    id: '11',
    title: 'Comic Market Seasonality Study',
    content: 'Analyze seasonal patterns in comic sales and trading to identify optimal buying and selling periods throughout the year.',
    tags: ['seasonality', 'patterns', 'timing', 'market-cycles'],
    createdAt: new Date('2024-05-11'),
    updatedAt: new Date('2024-05-11'),
    sentiment: 'neutral',
    priority: 6,
    category: 'research'
  },
  {
    id: '12',
    title: 'Creator Collaboration Network',
    content: 'Map the collaboration networks between writers, artists, and editors to predict successful team formations and potential breakout projects.',
    tags: ['collaboration', 'networks', 'teams', 'prediction'],
    createdAt: new Date('2024-05-12'),
    updatedAt: new Date('2024-05-12'),
    sentiment: 'positive',
    priority: 7,
    category: 'social'
  },
  {
    id: '13',
    title: 'First Appearance Value Predictor',
    content: 'Develop models to predict which first appearances of new characters will become valuable collectibles based on story context, creator pedigree, and market conditions.',
    tags: ['first-appearance', 'prediction', 'collectibles', 'value'],
    createdAt: new Date('2024-05-13'),
    updatedAt: new Date('2024-05-13'),
    sentiment: 'positive',
    priority: 8,
    category: 'prediction'
  },
  {
    id: '14',
    title: 'Comic Shop Partnership Network',
    content: 'Build a network of comic shop partnerships to provide local market data, exclusive variant access, and real-world market validation for digital trading prices.',
    tags: ['partnerships', 'retail', 'local-market', 'variants'],
    createdAt: new Date('2024-05-14'),
    updatedAt: new Date('2024-05-14'),
    sentiment: 'neutral',
    priority: 5,
    category: 'partnerships'
  },
  {
    id: '15',
    title: 'Crossover Event Impact Engine',
    content: 'Track and analyze the market impact of major crossover events on related character and publisher stocks, building predictive models for future crossovers.',
    tags: ['crossovers', 'events', 'impact', 'correlation'],
    createdAt: new Date('2024-05-15'),
    updatedAt: new Date('2024-05-15'),
    sentiment: 'positive',
    priority: 8,
    category: 'events'
  },
  {
    id: '16',
    title: 'Comic Art Style Evolution Tracker',
    content: 'Monitor how art style trends affect comic values, tracking the market performance of different artistic movements and predicting which styles will become valuable.',
    tags: ['art-styles', 'evolution', 'trends', 'aesthetics'],
    createdAt: new Date('2024-05-16'),
    updatedAt: new Date('2024-05-16'),
    sentiment: 'neutral',
    priority: 6,
    category: 'aesthetics'
  },
  {
    id: '17',
    title: 'International Market Expansion',
    content: 'Explore opportunities in international comic markets (Japanese manga, European comics) and analyze how global trends might affect US comic valuations.',
    tags: ['international', 'manga', 'global', 'expansion'],
    createdAt: new Date('2024-05-17'),
    updatedAt: new Date('2024-05-17'),
    sentiment: 'positive',
    priority: 6,
    category: 'expansion'
  },
  {
    id: '18',
    title: 'Digital Comic Impact Assessment',
    content: 'Study how digital comic sales and NFT markets affect traditional physical comic values, identifying complementary and competitive relationships.',
    tags: ['digital', 'NFT', 'physical', 'market-dynamics'],
    createdAt: new Date('2024-05-18'),
    updatedAt: new Date('2024-05-18'),
    sentiment: 'neutral',
    priority: 5,
    category: 'digital'
  },
  {
    id: '19',
    title: 'Age Demographics Trading Patterns',
    content: 'Analyze how different age demographics approach comic collecting and trading, identifying generational preferences that drive market demand.',
    tags: ['demographics', 'generations', 'preferences', 'demand'],
    createdAt: new Date('2024-05-19'),
    updatedAt: new Date('2024-05-19'),
    sentiment: 'neutral',
    priority: 6,
    category: 'demographics'
  },
  {
    id: '20',
    title: 'Comic Adaptation Rights Tracking',
    content: 'Monitor which comic properties have available adaptation rights and predict their potential impact on asset values when media deals are announced.',
    tags: ['adaptation-rights', 'media-deals', 'tracking', 'opportunities'],
    createdAt: new Date('2024-05-20'),
    updatedAt: new Date('2024-05-20'),
    sentiment: 'positive',
    priority: 7,
    category: 'media'
  }
];

export default mockIdeas;