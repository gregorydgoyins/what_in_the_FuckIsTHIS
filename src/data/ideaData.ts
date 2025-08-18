import { Idea } from '../types';

// Mock idea data for demonstration
export const mockIdeas: Idea[] = [
  {
    id: '1',
    title: 'AI-Powered Trading Bot',
    content: 'Develop an intelligent trading bot that uses machine learning to analyze market patterns and execute trades automatically based on predefined risk parameters.',
    tags: ['AI', 'trading', 'automation'],
    createdAt: new Date('2024-05-01'),
    updatedAt: new Date('2024-05-01'),
    sentiment: 'positive',
    priority: 8,
    category: 'technology'
  },
  {
    id: '2',
    title: 'Comic Grading Prediction',
    content: 'Create a system that can predict CGC grades based on high-resolution photos of comic books, helping collectors estimate value before submission.',
    tags: ['AI', 'comics', 'grading'],
    createdAt: new Date('2024-05-02'),
    updatedAt: new Date('2024-05-02'),
    sentiment: 'positive',
    priority: 7,
    category: 'technology'
  },
  {
    id: '3',
    title: 'Social Trading Platform',
    content: 'Build a platform where users can follow successful traders, copy their strategies, and share insights about comic book investments.',
    tags: ['social', 'trading', 'community'],
    createdAt: new Date('2024-05-03'),
    updatedAt: new Date('2024-05-03'),
    sentiment: 'positive',
    priority: 6,
    category: 'social'
  },
  {
    id: '4',
    title: 'Mobile App Development',
    content: 'Develop a mobile application for Panel Profits that allows users to trade on the go, receive push notifications for price alerts, and access portfolio analytics.',
    tags: ['mobile', 'app', 'trading'],
    createdAt: new Date('2024-05-04'),
    updatedAt: new Date('2024-05-04'),
    sentiment: 'positive',
    priority: 9,
    category: 'technology'
  },
  {
    id: '5',
    title: 'Creator Interview Series',
    content: 'Launch a video series interviewing comic book creators about their work, market insights, and upcoming projects to drive engagement.',
    tags: ['content', 'creators', 'marketing'],
    createdAt: new Date('2024-05-05'),
    updatedAt: new Date('2024-05-05'),
    sentiment: 'positive',
    priority: 5,
    category: 'marketing'
  },
  {
    id: '6',
    title: 'Risk Management Dashboard',
    content: 'Create an advanced dashboard that helps users understand their portfolio risk exposure, correlation between assets, and provides hedging suggestions.',
    tags: ['risk', 'dashboard', 'analytics'],
    createdAt: new Date('2024-05-06'),
    updatedAt: new Date('2024-05-06'),
    sentiment: 'neutral',
    priority: 7,
    category: 'analytics'
  },
  {
    id: '7',
    title: 'Educational Content Hub',
    content: 'Develop comprehensive educational materials about comic book investing, including video tutorials, interactive guides, and market analysis courses.',
    tags: ['education', 'content', 'learning'],
    createdAt: new Date('2024-05-07'),
    updatedAt: new Date('2024-05-07'),
    sentiment: 'positive',
    priority: 6,
    category: 'education'
  },
  {
    id: '8',
    title: 'API for Third-Party Integrations',
    content: 'Build a robust API that allows third-party developers to integrate Panel Profits data into their own applications and services.',
    tags: ['API', 'integration', 'developers'],
    createdAt: new Date('2024-05-08'),
    updatedAt: new Date('2024-05-08'),
    sentiment: 'neutral',
    priority: 4,
    category: 'technology'
  },
  {
    id: '9',
    title: 'Gamification Features',
    content: 'Add gaming elements like achievements, leaderboards, and trading competitions to increase user engagement and retention.',
    tags: ['gamification', 'engagement', 'competition'],
    createdAt: new Date('2024-05-09'),
    updatedAt: new Date('2024-05-09'),
    sentiment: 'positive',
    priority: 5,
    category: 'engagement'
  },
  {
    id: '10',
    title: 'Advanced Portfolio Analytics',
    content: 'Implement sophisticated portfolio analysis tools including Monte Carlo simulations, stress testing, and optimization algorithms.',
    tags: ['analytics', 'portfolio', 'optimization'],
    createdAt: new Date('2024-05-10'),
    updatedAt: new Date('2024-05-10'),
    sentiment: 'positive',
    priority: 8,
    category: 'analytics'
  },
  {
    id: '11',
    title: 'Customer Support Chatbot',
    content: 'Develop an AI-powered chatbot that can answer common questions, help with navigation, and provide basic trading guidance.',
    tags: ['AI', 'support', 'chatbot'],
    createdAt: new Date('2024-05-11'),
    updatedAt: new Date('2024-05-11'),
    sentiment: 'neutral',
    priority: 4,
    category: 'support'
  },
  {
    id: '12',
    title: 'Market Sentiment Analysis',
    content: 'Analyze social media, news articles, and forum discussions to gauge market sentiment for specific comics and creators.',
    tags: ['sentiment', 'analysis', 'social media'],
    createdAt: new Date('2024-05-12'),
    updatedAt: new Date('2024-05-12'),
    sentiment: 'positive',
    priority: 7,
    category: 'analytics'
  },
  {
    id: '13',
    title: 'Virtual Comic Con Events',
    content: 'Host virtual events featuring creator talks, exclusive announcements, and special trading opportunities for platform users.',
    tags: ['events', 'virtual', 'community'],
    createdAt: new Date('2024-05-13'),
    updatedAt: new Date('2024-05-13'),
    sentiment: 'positive',
    priority: 6,
    category: 'events'
  },
  {
    id: '14',
    title: 'Blockchain Integration',
    content: 'Explore integrating blockchain technology for transparent ownership records, NFT trading, and decentralized market features.',
    tags: ['blockchain', 'NFT', 'decentralized'],
    createdAt: new Date('2024-05-14'),
    updatedAt: new Date('2024-05-14'),
    sentiment: 'neutral',
    priority: 3,
    category: 'technology'
  },
  {
    id: '15',
    title: 'Personalized News Feed',
    content: 'Create a customized news feed that shows relevant comic industry news based on user portfolio holdings and interests.',
    tags: ['news', 'personalization', 'feed'],
    createdAt: new Date('2024-05-15'),
    updatedAt: new Date('2024-05-15'),
    sentiment: 'positive',
    priority: 6,
    category: 'personalization'
  },
  {
    id: '16',
    title: 'Advanced Order Types',
    content: 'Implement sophisticated order types like trailing stops, bracket orders, and conditional orders for professional traders.',
    tags: ['trading', 'orders', 'professional'],
    createdAt: new Date('2024-05-16'),
    updatedAt: new Date('2024-05-16'),
    sentiment: 'positive',
    priority: 7,
    category: 'trading'
  },
  {
    id: '17',
    title: 'Comic Condition Assessment Tool',
    content: 'Develop a tool that helps users assess comic book condition using standardized criteria and photo analysis.',
    tags: ['assessment', 'condition', 'tools'],
    createdAt: new Date('2024-05-17'),
    updatedAt: new Date('2024-05-17'),
    sentiment: 'positive',
    priority: 5,
    category: 'tools'
  },
  {
    id: '18',
    title: 'Partnership with Comic Shops',
    content: 'Establish partnerships with local comic book stores to offer exclusive deals, early access to new releases, and physical pickup options.',
    tags: ['partnerships', 'retail', 'physical'],
    createdAt: new Date('2024-05-18'),
    updatedAt: new Date('2024-05-18'),
    sentiment: 'positive',
    priority: 4,
    category: 'partnerships'
  },
  {
    id: '19',
    title: 'Tax Reporting Features',
    content: 'Provide comprehensive tax reporting tools that help users track capital gains, losses, and generate necessary tax documents.',
    tags: ['tax', 'reporting', 'compliance'],
    createdAt: new Date('2024-05-19'),
    updatedAt: new Date('2024-05-19'),
    sentiment: 'neutral',
    priority: 6,
    category: 'compliance'
  },
  {
    id: '20',
    title: 'Community Forums',
    content: 'Build discussion forums where users can share trading strategies, discuss market trends, and connect with other comic investors.',
    tags: ['community', 'forums', 'discussion'],
    createdAt: new Date('2024-05-20'),
    updatedAt: new Date('2024-05-20'),
    sentiment: 'positive',
    priority: 5,
    category: 'community'
  }
];

export default mockIdeas;