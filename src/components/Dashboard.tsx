import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, TrendingUp, Users, BarChart2, Target, 
  Award, Briefcase, Shield, Zap, GraduationCap, Crown,
  Lightbulb, Star, Check
} from 'lucide-react';
import { DashboardHeader } from './dashboard/DashboardHeader';
import { MarketOverviewStats } from './dashboard/MarketOverviewStats';
import { MarketIndicesSection } from './dashboard/MarketIndicesSection';
import { KeyComicSearchSection } from './dashboard/KeyComicSearchSection';
import { DashboardSidebar } from './dashboard/DashboardSidebar';
import { RecommendationsCards } from './markets/RecommendationsCards';
import { IPOAnnouncements } from './markets/IPOAnnouncements';
import { NewsFeed } from './news/NewsFeed';
import { MarketPerformanceSummary } from './markets/MarketPerformanceSummary';
import { TradingActivityFeed } from './trading/TradingActivityFeed';
import MarketInsights from './markets/MarketInsights';
import { useSubscriptionStore } from '../store/subscriptionStore';
import { SubscriptionTier } from '../types';

export function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [marketSentiment, setMarketSentiment] = useState(0.75);
  const [marketIndex, setMarketIndex] = useState(14250);
  const { currentTier, setTier } = useSubscriptionStore();
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate slight market fluctuations
      setMarketIndex(prev => prev + (Math.random() - 0.5) * 10);
      setMarketSentiment(prev => {
        const change = (Math.random() - 0.5) * 0.02;
        return Math.max(-1, Math.min(1, prev + change));
      });
    }, 2000);
    
    return () => clearInterval(timer);
  }, []);

  const tierInfo = {
    basic: {
      name: 'Market Observer',
      description: 'Basic market trend analysis and categorization',
      icon: Lightbulb,
      color: 'bg-blue-600',
      features: [
        'Up to 7 market segments',
        'Basic trend grouping',
        'Simple pattern identification',
        'Manual categorization'
      ]
    },
    standard: {
      name: 'Market Analyst',
      description: 'Advanced market analysis with sentiment tracking',
      icon: Star,
      color: 'bg-yellow-600',
      features: [
        'Up to 25 market segments',
        'Publisher sentiment analysis',
        'Custom analysis merging',
        'Export capabilities',
        'Key trend extraction'
      ]
    },
    premium: {
      name: 'Strategic Intelligence',
      description: 'Premium market intelligence with real-time insights',
      icon: Crown,
      color: 'bg-purple-600',
      features: [
        'Up to 100 market segments',
        'Real-time market analysis',
        'Advanced visualizations',
        'Cross-market analysis',
        'Priority processing',
        'API access',
        'AI trading recommendations'
      ]
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <DashboardHeader 
        marketSentiment={marketSentiment}
        marketIndex={marketIndex}
        currentTime={currentTime}
      />

      {/* Market Overview Stats */}
      <MarketOverviewStats />

      {/* AI Recommendations */}
      <RecommendationsCards />

      {/* Key Comic Search Engine */}
      <KeyComicSearchSection />

      {/* Market Intelligence Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MarketPerformanceSummary />
        <TradingActivityFeed />
        <MarketInsights />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Market Indices */}
          <MarketIndicesSection />

          {/* Market Categories */}
          <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6">Explore Asset Categories</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { icon: Users, label: 'Characters', path: '/characters', color: 'text-blue-400', count: '250+' },
                { icon: Award, label: 'Creators', path: '/creators', color: 'text-orange-300', count: '100+' },
                { icon: Briefcase, label: 'Funds', path: '/funds', color: 'text-indigo-400', count: '25+' },
                { icon: Shield, label: 'Bonds', path: '/bonds', color: 'text-green-400', count: '50+' },
                { icon: Target, label: 'Locations', path: '/locations', color: 'text-yellow-400', count: '75+' },
                { icon: Zap, label: 'Gadgets', path: '/gadgets', color: 'text-red-400', count: '60+' }
              ].map((category, index) => (
                <Link
                  key={index}
                  to={category.path}
                  className="group bg-slate-700/50 rounded-lg p-4 hover:bg-slate-700 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="text-center">
                    <category.icon className={`h-8 w-8 ${category.color} mx-auto mb-2 group-hover:scale-110 transition-transform`} />
                    <p className="font-medium text-white">{category.label}</p>
                    <p className="text-xs text-gray-400">{category.count} assets</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* News and IPOs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <NewsFeed maxItems={5} showFilters={false} compact={true} />
            </div>
            
            <div>
              <IPOAnnouncements maxItems={5} showFilters={false} compact={true} />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <DashboardSidebar />
      </div>

      {/* Feature Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all">
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="h-8 w-8 text-orange-300" />
            <h2 className="text-2xl font-bold text-white">AI Market Intelligence</h2>
          </div>
          
          <p className="text-gray-300 mb-6">
            Leverage advanced AI to analyze market trends, character performance, and identify trading opportunities 
            with unprecedented accuracy and speed.
          </p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full" />
              <span className="text-gray-300">Real-time sentiment analysis across 50+ data sources</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span className="text-gray-300">Character popularity tracking and prediction models</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-indigo-400 rounded-full" />
              <span className="text-gray-300">Cross-media impact analysis and correlation mapping</span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Link 
              to="/ideas"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg transition-colors text-center font-medium"
            >
              Explore AI Analysis
            </Link>
            <Link 
              to="/ideas/mapping"
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg transition-colors text-center font-medium"
            >
              Market Mapping
            </Link>
          </div>
        </div>

        <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-8 w-8 text-green-400" />
            <h2 className="text-2xl font-bold text-white">Advanced Trading Platform</h2>
          </div>
          
          <p className="text-gray-300 mb-6">
            Trade comic characters, creators, publishers, bonds, and funds in a sophisticated virtual market 
            with professional-grade tools and analytics.
          </p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-gray-300">500+ tradeable comic assets across all eras</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full" />
              <span className="text-gray-300">Options, futures, and derivative instruments</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <span className="text-gray-300">Real-time portfolio tracking and risk management</span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Link 
              to="/trading"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg transition-colors text-center font-medium"
            >
              Start Trading
            </Link>
            <Link 
              to="/portfolio"
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg transition-colors text-center font-medium"
            >
              My Portfolio
            </Link>
          </div>
        </div>
      </div>

      {/* AI Subscription Tiers */}
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <div className="flex items-center space-x-3 mb-6">
          <Crown className="h-8 w-8 text-purple-400" />
          <h2 className="text-2xl font-bold text-white">AI Intelligence Tiers</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(Object.keys(tierInfo) as SubscriptionTier[]).map((tier) => {
            const info = tierInfo[tier];
            const isActive = currentTier === tier;
            
            return (
              <div
                key={tier}
                onClick={() => setTier(tier)}
                className={`relative bg-slate-700/50 rounded-xl p-6 border-2 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl
                  ${isActive 
                    ? 'border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
                    : 'border-slate-600/50 hover:border-indigo-400/50'}`}
              >
                {isActive && (
                  <div className="absolute -top-3 -right-3 bg-indigo-600 rounded-full p-2">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
                
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-3 rounded-full ${tier === 'premium' ? 'bg-orange-600' : info.color}`}>
                    {(() => {
                      const IconComponent = info.icon;
                      return <IconComponent className="h-6 w-6 text-white" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{info.name}</h3>
                    <p className="text-sm text-indigo-400">Membership Tier</p>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{info.description}</p>
                
                <div className="space-y-2">
                  {info.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Currently using: <span className="text-indigo-400 font-medium capitalize">{currentTier}</span> membership
          </p>
        </div>
      </div>

      {/* Learning Center CTA */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Master Comic Trading</h2>
            <p className="text-white/90 mb-4">
              Access our comprehensive learning center to develop your trading skills and market knowledge.
            </p>
            <Link 
              to="/learn"
              className="inline-flex items-center space-x-2 bg-white text-indigo-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <GraduationCap className="h-5 w-5" />
              <span>Start Learning</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <Brain className="h-24 w-24 text-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}