import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Network, Lightbulb, Star, Crown, Zap, TrendingUp, Users, BarChart2, Target, ArrowRight } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="hero-card p-8 text-white rounded-xl mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Panel Profits</h1>
          <p className="text-xl text-white/80 mb-8 max-w-4xl mx-auto">
            The Ultimate Comic Book Trading Platform with Integrated AI Market Intelligence
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link 
            to="/ideas"
            className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-lg
                     bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500
                     text-white shadow-lg hover:shadow-xl
                     transition-all duration-300 ease-out transform hover:-translate-y-1 active:translate-y-0
                     focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900
                     w-full sm:w-auto min-w-[250px] overflow-hidden"
          >
            <span className="relative z-10 flex items-center space-x-3">
              <Brain className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
              <span>AI Market Intelligence</span>
            </span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          </Link>

          <Link 
            to="/trading"
            className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-lg
                     bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500
                     text-white shadow-lg hover:shadow-xl
                     transition-all duration-300 ease-out transform hover:-translate-y-1 active:translate-y-0
                     focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900
                     w-full sm:w-auto min-w-[250px] overflow-hidden"
          >
            <span className="relative z-10 flex items-center space-x-3">
              <Network className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
              <span>Start Trading</span>
            </span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          </Link>
        </div>
      </div>

      {/* Feature Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="h-8 w-8 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">AI Market Intelligence</h2>
          </div>
          
          <p className="text-gray-300 mb-6">
            Advanced AI-powered analysis of comic market trends, character performance, and trading opportunities. 
            Get intelligent insights that help you make better investment decisions.
          </p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-blue-400" />
              <span className="text-gray-300">Smart market trend analysis and asset categorization</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="text-gray-300">Character and creator sentiment analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <Crown className="h-5 w-5 text-purple-400" />
              <span className="text-gray-300">Real-time trading signals and portfolio optimization</span>
            </div>
          </div>
          
          <Link 
            to="/ideas"
            className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Brain className="h-5 w-5" />
            <span>Access AI Intelligence</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-8 w-8 text-indigo-400" />
            <h2 className="text-2xl font-bold text-white">Comic Asset Trading</h2>
          </div>
          
          <p className="text-gray-300 mb-6">
            Trade comic characters, creators, publishers, bonds, and funds in a sophisticated virtual market.
            Build your portfolio with iconic heroes, villains, and comic industry assets.
          </p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-400" />
              <span className="text-gray-300">Characters, creators, and comic assets</span>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart2 className="h-5 w-5 text-indigo-400" />
              <span className="text-gray-300">Real-time pricing and market data</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-400" />
              <span className="text-gray-300">Portfolio management and tracking</span>
            </div>
          </div>
          
          <Link 
            to="/trading"
            className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <TrendingUp className="h-5 w-5" />
            <span>Start Trading</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* AI Intelligence Tiers */}
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6">AI Intelligence Levels</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/50 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-full bg-blue-600">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Market Observer</h3>
                <p className="text-sm text-blue-400">$5-15/month</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-4">Basic market analysis and trend identification</p>
            
            <ul className="space-y-2 text-sm text-gray-300">
              <li>✓ Basic market trend analysis</li>
              <li>✓ Asset categorization</li>
              <li>✓ Simple price alerts</li>
            </ul>
          </div>
          
          <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/50 hover:border-yellow-500/50 transition-colors">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-full bg-yellow-600">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Market Analyst</h3>
                <p className="text-sm text-yellow-400">$20-45/month</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-4">Advanced market analysis with sentiment tracking</p>
            
            <ul className="space-y-2 text-sm text-gray-300">
              <li>✓ Character sentiment analysis</li>
              <li>✓ Market correlation insights</li>
              <li>✓ Portfolio optimization tips</li>
              <li>✓ Custom trading alerts</li>
            </ul>
          </div>
          
          <div className="bg-slate-700/50 rounded-xl p-6 border border-slate-600/50 hover:border-purple-500/50 transition-colors">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-full bg-purple-600">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Trading Intelligence</h3>
                <p className="text-sm text-purple-400">$50-150/month</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-4">AI-powered trading recommendations and strategies</p>
            
            <ul className="space-y-2 text-sm text-gray-300">
              <li>✓ Real-time trading signals</li>
              <li>✓ AI-powered buy/sell recommendations</li>
              <li>✓ Advanced portfolio analytics</li>
              <li>✓ Predictive market modeling</li>
              <li>✓ API access</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Ready to revolutionize your comic trading?</h2>
            <p className="text-white/90 mb-6 text-lg">
              Combine AI-powered market intelligence with strategic comic asset trading for maximum returns.
            </p>
            <div className="space-y-2 text-white/80">
              <p className="flex items-center space-x-2">
                <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                <span>Use AI analysis to identify market opportunities</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                <span>Build a diversified portfolio of comic assets</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                <span>Execute trades with intelligent timing</span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                <span>Track performance and optimize strategy</span>
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <Brain className="h-32 w-32 text-white/20" />
              <Network className="h-24 w-24 text-white/30 absolute -bottom-4 -right-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl text-center">
          <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">3</p>
          <p className="text-sm text-gray-400">Subscription Tiers</p>
        </div>
        
        <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl text-center">
          <Brain className="h-8 w-8 text-purple-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">100+</p>
          <p className="text-sm text-gray-400">Max Clusters</p>
        </div>
        
        <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl text-center">
          <Network className="h-8 w-8 text-indigo-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">∞</p>
          <p className="text-sm text-gray-400">Idea Relationships</p>
        </div>
        
        <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl text-center">
          <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-white">Real-time</p>
          <p className="text-sm text-gray-400">Analysis</p>
        </div>
      </div>
    </div>
  );
}