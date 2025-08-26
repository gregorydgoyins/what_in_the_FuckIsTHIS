import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, Network, Lightbulb, Star, Crown, Zap, TrendingUp, Users, BookOpen,
  BarChart2, Target, ArrowRight, Activity, DollarSign, Shield, Search,
  Calendar, Award, Briefcase, Eye, Play, ChevronRight, Check
} from 'lucide-react';
import { MarketSentimentGauge } from './ui/MarketSentimentGauge';
import { RecommendationsCards } from './markets/RecommendationsCards';
import { IPOAnnouncements } from './markets/IPOAnnouncements';
import { NewsFeed } from './news/NewsFeed';
import { MarketPerformanceSummary } from './markets/MarketPerformanceSummary';
import { TradingActivityFeed } from './trading/TradingActivityFeed';
import { MarketInsights } from './markets/MarketInsights';
import { PortfolioHealthCheck } from './portfolio/PortfolioHealthCheck';

export function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [marketSentiment, setMarketSentiment] = useState(0.75);
  const [marketIndex, setMarketIndex] = useState(14250);
  
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="space-y-8">
      {/* Hero Section with Live Market Data */}
      <div className="hero-card p-8 text-white rounded-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-blue-600/20" />
        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center mb-6">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg">
                Panel Profits
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-4 max-w-2xl font-medium">
                AI-Powered Comic Book Trading Platform with Advanced Market Intelligence
              </p>
            </div>
            
            <div className="flex flex-col items-center space-y-4">
              <MarketSentimentGauge 
                sentiment={marketSentiment}
                confidence={0.85}
                size="large"
                label="Market Sentiment"
              />
              <div className="text-center">
                <p className="text-white/60 text-sm">Real-time AI Analysis</p>
              </div>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-4 border border-slate-700/30">
              <h3 className="text-lg font-semibold text-white mb-3">Live Market Status</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white text-sm">Market Open • {formatTime(currentTime)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4" />
                  <span className="text-white text-sm">CMI: {marketIndex.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm">+2.3% Today</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BarChart2 className="h-4 w-4 text-blue-400" />
                  <span className="text-blue-400 text-sm">Volume: 2.8M</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/ideas"
              className="group relative inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-lg
                       bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500
                       text-white shadow-lg hover:shadow-xl
                       transition-all duration-300 ease-out transform hover:-translate-y-1 active:translate-y-0
                       focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900
                       w-full sm:w-auto min-w-[250px] overflow-hidden"
            >
              <span className="relative z-10 flex items-center space-x-3">
                <Brain className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                <span>AI Market Analysis</span>
                <ArrowRight className="h-5 w-5 transition-all duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </Link>

            <Link 
              to="/trading"
              className="group relative inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-lg
                       bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500
                       text-white shadow-lg hover:shadow-xl
                       transition-all duration-300 ease-out transform hover:-translate-y-1 active:translate-y-0
                       focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900
                       w-full sm:w-auto min-w-[250px] overflow-hidden"
            >
              <span className="relative z-10 flex items-center space-x-3">
                <TrendingUp className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                <span>Start Trading</span>
                <ArrowRight className="h-5 w-5 transition-all duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </Link>
          </div>
        </div>
      </div>

      {/* Market Indices Section */}
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6">Market Indices</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CCIX - Comic Collectibles Index (DOW equivalent) */}
          <div className="bg-slate-700/50 p-6 rounded-lg border border-slate-600/50 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-blue-600/20">
                  <BarChart2 className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Comic Collectibles Index</h3>
                  <p className="text-sm text-gray-400">CCIX • 50 Curated Premium Comics</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">8,750.25</p>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 font-semibold">+185.50 (+2.16%)</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-4">
              Tracks the performance of 50 blue-chip comic collectibles, including key issues from Action Comics #1, Detective Comics #27, and other cornerstone publications.
            </p>
            
            <div className="space-y-2 mb-4">
              <h4 className="text-white font-medium text-sm">Top Holdings Today:</h4>
              {[
                { symbol: 'ACM1', name: 'Action Comics #1', weight: 15.2, change: 3.8 },
                { symbol: 'DTM27', name: 'Detective Comics #27', weight: 12.8, change: 2.9 },
                { symbol: 'MRV1', name: 'Marvel Comics #1', weight: 10.5, change: 4.2 },
                { symbol: 'ASM15', name: 'Amazing Fantasy #15', weight: 9.8, change: 5.1 }
              ].map((comic, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">{comic.symbol}</span>
                    <span className="text-white">{comic.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">{comic.weight}%</span>
                    <span className="text-green-400">+{comic.change}%</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-gray-400">Day High</p>
                <p className="text-white font-medium">8,785.75</p>
              </div>
              <div>
                <p className="text-gray-400">Day Low</p>
                <p className="text-white font-medium">8,650.20</p>
              </div>
              <div>
                <p className="text-gray-400">Volume</p>
                <p className="text-white font-medium">1.8M</p>
              </div>
            </div>
            
            <div className="mt-4">
              <Link 
                to="/markets/ccix"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                View CCIX Details →
              </Link>
            </div>
          </div>

          {/* PPIX100 - Panel Profits Index 100 (NASDAQ equivalent) */}
          <div className="bg-slate-700/50 p-6 rounded-lg border border-slate-600/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-full bg-purple-600/20">
                  <Activity className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Panel Profits Index 100</h3>
                  <p className="text-sm text-gray-400">PPIX100 • Top 100 Growth Comics</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">12,450.80</p>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 font-semibold">+320.15 (+2.64%)</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-4">
              Tracks the 100 fastest-growing comic assets, weighted by market capitalization and trading volume. Focus on modern classics and emerging collectibles.
            </p>
            
            <div className="space-y-2 mb-4">
              <h4 className="text-white font-medium text-sm">Top Contributors Today:</h4>
              {[
                { symbol: 'ASM300', name: 'Amazing Spider-Man #300', weight: 8.5, change: 8.5 },
                { symbol: 'BATM', name: 'Batman Character Stock', weight: 7.2, change: 6.2 },
                { symbol: 'SPDR', name: 'Spider-Man Character Stock', weight: 6.8, change: 5.3 },
                { symbol: 'TMFS', name: 'Todd McFarlane Stock', weight: 5.1, change: 5.8 }
              ].map((asset, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">{asset.symbol}</span>
                    <span className="text-white">{asset.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">{asset.weight}%</span>
                    <span className="text-green-400">+{asset.change}%</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <Link 
                to="/markets/ppix100"
                className="text-purple-400 hover:text-purple-300 text-sm font-medium"
              >
                View PPIX100 Holdings →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Live Market Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Market Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl hover:shadow-2xl transition-all group">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-green-600/20">
                  <TrendingUp className="h-6 w-6 text-green-400 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Market Index</p>
                  <p className="text-xl font-bold text-white">{marketIndex.toFixed(0)}</p>
                  <p className="text-xs text-green-400">+2.3% today</p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl hover:shadow-2xl transition-all group">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-blue-600/20">
                  <Activity className="h-6 w-6 text-blue-400 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Volume</p>
                  <p className="text-xl font-bold text-white">2.8M</p>
                  <p className="text-xs text-blue-400">Active trading</p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl hover:shadow-2xl transition-all group">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-purple-600/20">
                  <Brain className="h-6 w-6 text-orange-300 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">AI Confidence</p>
                  <p className="text-xl font-bold text-white">85%</p>
                  <p className="text-xs text-orange-300">High accuracy</p>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl hover:shadow-2xl transition-all group">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-yellow-600/20">
                  <Star className="h-6 w-6 text-yellow-400 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Hot Assets</p>
                  <p className="text-xl font-bold text-white">47</p>
                  <p className="text-xs text-yellow-400">Trending now</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <RecommendationsCards />

          {/* Key Comic Pricing Search Engine */}
          <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
            <div className="flex items-center space-x-3 mb-6">
              <BookOpen className="h-6 w-6 text-indigo-400" />
              <h2 className="text-2xl font-bold text-white">Key Comic Pricing Search</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by title, symbol, or character..."
                    className="pl-10 pr-4 py-3 w-full bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <select className="bg-slate-700/50 text-white border-slate-600/50 rounded-lg px-3 py-2">
                    <option value="all">All Ages</option>
                    <option value="golden">Golden Age</option>
                    <option value="silver">Silver Age</option>
                    <option value="bronze">Bronze Age</option>
                    <option value="modern">Modern Age</option>
                  </select>
                  
                  <select className="bg-slate-700/50 text-white border-slate-600/50 rounded-lg px-3 py-2">
                    <option value="all">All Publishers</option>
                    <option value="marvel">Marvel</option>
                    <option value="dc">DC Comics</option>
                    <option value="image">Image</option>
                  </select>
                </div>
                
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-colors">
                  Search Comics
                </button>
              </div>
              
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <h3 className="font-medium text-white mb-4">Quick Price Lookup</h3>
                <div className="space-y-3">
                  {[
                    { symbol: 'ACM1', title: 'Action Comics #1', price: 3200000, change: 4.06 },
                    { symbol: 'DTM27', title: 'Detective Comics #27', price: 2800000, change: 3.13 },
                    { symbol: 'AF15', title: 'Amazing Fantasy #15', price: 1800000, change: 5.57 },
                    { symbol: 'ASM300', title: 'Amazing Spider-Man #300', price: 2500, change: 5.26 }
                  ].map((comic, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-800/50 rounded border border-slate-600/50">
                      <div>
                        <p className="text-white font-medium text-sm">{comic.title}</p>
                        <p className="text-xs text-gray-400">{comic.symbol}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-sm">CC {comic.price.toLocaleString()}</p>
                        <p className="text-green-400 text-xs">+{comic.change}%</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Link 
                  to="/key-comics"
                  className="block w-full mt-4 bg-slate-600 hover:bg-slate-700 text-white text-center py-2 rounded-lg transition-colors"
                >
                  View All Key Comics
                </Link>
              </div>
            </div>
          </div>

          {/* Additional Market Information Modules */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MarketPerformanceSummary />
            <TradingActivityFeed />
            <MarketInsights />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Portfolio Overview */}
          <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-indigo-400" />
              <h3 className="text-lg font-bold text-white">Portfolio Snapshot</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Value</span>
                <span className="text-xl font-bold text-white">CC 2,847,230</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Today's P&L</span>
                <span className="text-lg font-semibold text-green-400">+CC 42,150 (+1.5%)</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '68%' }} />
              </div>
              <p className="text-sm text-gray-400">Diversification Score: 68/100</p>
            </div>
            
            <Link 
              to="/portfolio"
              className="block w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white text-center py-2 rounded-lg transition-colors"
            >
              View Full Portfolio
            </Link>
          </div>

          {/* Portfolio Health Check */}
          <PortfolioHealthCheck />

          {/* Top Movers */}
          <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="h-6 w-6 text-green-400" />
              <h3 className="text-lg font-bold text-white">Top Movers</h3>
            </div>
            
            <div className="space-y-3">
              {[
                { symbol: 'ASM300', name: 'Amazing Spider-Man #300', change: '+8.5%', positive: true },
                { symbol: 'BATM', name: 'Batman', change: '+5.2%', positive: true },
                { symbol: 'TMFS', name: 'Todd McFarlane', change: '+4.8%', positive: true },
                { symbol: 'SPDR', name: 'Spider-Man', change: '-2.1%', positive: false }
              ].map((asset, index) => (
                <Link 
                  key={index}
                  to={`/character/${asset.symbol}`}
                  className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors group"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{asset.symbol}</p>
                    <p className="text-xs text-gray-400">{asset.name}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-semibold ${asset.positive ? 'text-green-400' : 'text-red-400'}`}>
                      {asset.change}
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
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

      {/* AI Subscription Tiers */}
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <div className="flex items-center space-x-3 mb-6">
          <Crown className="h-8 w-8 text-purple-400" />
          <h2 className="text-2xl font-bold text-white">AI Intelligence Tiers</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Market Observer',
              description: 'Basic market trend analysis',
              icon: Lightbulb,
              color: 'bg-blue-600',
              features: ['7 market segments', 'Basic categorization', 'Simple alerts']
            },
            {
              name: 'Market Analyst',
              description: 'Advanced sentiment tracking',
              icon: Star,
              color: 'bg-yellow-600',
              features: ['25 market segments', 'Sentiment analysis', 'Custom reports', 'Export data']
            },
            {
              name: 'Strategic Intelligence',
              description: 'Real-time AI recommendations',
              icon: Crown,
              color: 'bg-purple-600',
              features: ['100 market segments', 'Real-time signals', 'API access', 'Priority processing']
            }
          ].map((tier, index) => (
            <div key={index} className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/50 hover:border-indigo-500/50 transition-colors group">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-full ${tier.color}`}>
                  <tier.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                  <p className="text-sm text-indigo-400">Membership Level</p>
                </div>
              </div>
              
              <p className="text-gray-300 text-sm mb-4">{tier.description}</p>
              
              <div className="space-y-2">
                {tier.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-colors group-hover:bg-indigo-500">
                Select Membership
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}