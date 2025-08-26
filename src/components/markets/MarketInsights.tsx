import React, { useState, useEffect } from 'react';
import { Lightbulb, TrendingUp, AlertCircle, AlertTriangle, Star, Zap, Brain, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MarketInsight {
  id: string;
  title: string;
  description: string;
  confidence: number;
  category: 'opportunity' | 'warning' | 'trend' | 'analysis';
  relatedAssets: Array<{
    symbol: string;
    name: string;
    type: string;
  }>;
  timeframe: string;
  impact: 'high' | 'medium' | 'low';
}

interface MarketInsightsProps {
  className?: string;
}

export function MarketInsights({ className = '' }: MarketInsightsProps) {
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Mock AI-generated market insights
  const insights: MarketInsight[] = [
    {
      id: '1',
      title: 'Creator Stock Momentum Building',
      description: 'AI detects increasing institutional interest in creator stocks, particularly Todd McFarlane and Jim Lee.',
      confidence: 87,
      category: 'opportunity',
      relatedAssets: [
        { symbol: 'TMFS', name: 'Todd McFarlane', type: 'creator' },
        { symbol: 'JLES', name: 'Jim Lee', type: 'creator' }
      ],
      timeframe: '2-4 weeks',
      impact: 'high'
    },
    {
      id: '2',
      title: 'Golden Age Comics Undervalued',
      description: 'Machine learning models suggest Golden Age comics are trading below fair value compared to historical patterns.',
      confidence: 92,
      category: 'opportunity',
      relatedAssets: [
        { symbol: 'GAPF', name: 'Golden Age Fund', type: 'fund' },
        { symbol: 'ACM1', name: 'Action Comics #1', type: 'character' }
      ],
      timeframe: '1-2 months',
      impact: 'medium'
    },
    {
      id: '3',
      title: 'Volatility Spike Incoming',
      description: 'Cross-correlation analysis indicates potential volatility increase ahead of Comic-Con announcements.',
      confidence: 78,
      category: 'warning',
      relatedAssets: [
        { symbol: 'MRVL', name: 'Marvel Entertainment', type: 'publisher' },
        { symbol: 'DCCP', name: 'DC Comics', type: 'publisher' }
      ],
      timeframe: '1-2 weeks',
      impact: 'medium'
    },
    {
      id: '4',
      title: 'Character Cross-Media Impact',
      description: 'Streaming platform data suggests upcoming character appearances will drive significant price movements.',
      confidence: 85,
      category: 'trend',
      relatedAssets: [
        { symbol: 'SPDR', name: 'Spider-Man', type: 'character' },
        { symbol: 'BATM', name: 'Batman', type: 'character' }
      ],
      timeframe: '3-6 months',
      impact: 'high'
    },
    {
      id: '5',
      title: 'Bond Market Consolidation',
      description: 'AI models predict publisher bonds will outperform as investors seek stable income streams.',
      confidence: 81,
      category: 'analysis',
      relatedAssets: [
        { symbol: 'MRVLB', name: 'Marvel Bond', type: 'bond' },
        { symbol: 'DCCB', name: 'DC Bond', type: 'bond' }
      ],
      timeframe: '2-3 months',
      impact: 'low'
    }
  ];

  // Auto-rotate insights every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentInsightIndex((prev) => (prev + 1) % insights.length);
        setIsAnimating(false);
      }, 150);
    }, 8000);

    return () => clearInterval(interval);
  }, [insights.length]);

  const currentInsight = insights[currentInsightIndex];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'opportunity': return <TrendingUp className="h-5 w-5 text-green-400" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case 'trend': return <Star className="h-5 w-5 text-blue-400" />;
      case 'analysis': return <Brain className="h-5 w-5 text-orange-300" />;
      default: return <Lightbulb className="h-5 w-5 text-indigo-400" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'opportunity': return 'border-green-700/30 bg-green-900/10';
      case 'warning': return 'border-yellow-700/30 bg-yellow-900/10';
      case 'trend': return 'border-blue-700/30 bg-blue-900/10';
      case 'analysis': return 'border-orange-700/30 bg-orange-900/10';
      default: return 'border-indigo-700/30 bg-indigo-900/10';
    }
  };

  const getImpactBadge = (impact: string) => {
    const colors = {
      high: 'bg-red-900/50 text-red-200 border-red-700/50',
      medium: 'bg-yellow-900/50 text-yellow-200 border-yellow-700/50',
      low: 'bg-green-900/50 text-green-200 border-green-700/50'
    };
    return colors[impact as keyof typeof colors] || colors.medium;
  };

  return (
    <div className={`bg-slate-800/90 rounded-xl p-6 border border-slate-700/30 hover:shadow-[0_0_15px_rgba(129,140,248,0.3)] transition-all hover:-translate-y-1 ${className}`}>
      <div className="flex items-center space-x-2 mb-5">
        <Brain className="h-6 w-6 text-indigo-400" />
        <h3 className="font-semibold text-white text-lg">AI Market Insights</h3>
        <div className="ml-auto flex items-center space-x-2">
          <span className="px-2 py-1 bg-indigo-900/50 text-indigo-200 rounded-full text-xs border border-indigo-700/50">
            AI Confidence: {currentInsight.confidence}%
          </span>
        </div>
      </div>
      
      <div className={`transition-all duration-150 ${isAnimating ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'}`}>
        <div className={`p-4 rounded-lg border ${getCategoryColor(currentInsight.category)}`}>
          <div className="flex items-start space-x-3 mb-3">
            {getCategoryIcon(currentInsight.category)}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-semibold text-white">{currentInsight.title}</h4>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getImpactBadge(currentInsight.impact)}`}>
                  {currentInsight.impact.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-300 text-sm">{currentInsight.description}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
            <span>Timeframe: {currentInsight.timeframe}</span>
            <span>Impact: {currentInsight.impact} probability</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {currentInsight.relatedAssets.map((asset, index) => (
              <Link
                key={index}
                to={`/${asset.type}/${asset.symbol}`}
                className="px-2 py-1 bg-slate-700/50 rounded text-xs text-indigo-300 hover:bg-slate-700 transition-colors border border-slate-600/50"
              >
                {asset.symbol}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Navigation dots */}
      <div className="flex items-center justify-center space-x-2 mt-4">
        {insights.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAnimating(true);
              setTimeout(() => {
                setCurrentInsightIndex(index);
                setIsAnimating(false);
              }, 150);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentInsightIndex ? 'bg-indigo-400' : 'bg-slate-600 hover:bg-slate-500'
            }`}
            aria-label={`View insight ${index + 1}`}
          />
        ))}
      </div>
      
      <div className="mt-5 pt-4 border-t border-slate-600/30">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            <span>Powered by </span>
            <span className="text-orange-300 font-medium">AI Analysis Engine</span>
          </div>
          <Link 
            to="/ideas"
            className="flex items-center space-x-1 text-indigo-400 hover:text-indigo-300 text-sm font-medium"
          >
            <span>Full Analysis</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MarketInsights;