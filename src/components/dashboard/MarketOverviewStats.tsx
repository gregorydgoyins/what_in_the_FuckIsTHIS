import React from 'react';
import { TrendingUp, Activity, Brain, Star } from 'lucide-react';
import { useMarketOverview } from '../../hooks/useAssetMarketData';

export function MarketOverviewStats() {
  const { marketData, isLoading } = useMarketOverview();

  if (isLoading || !marketData) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl animate-pulse">
            <div className="h-16 bg-slate-700/50 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-4 shadow-xl hover:shadow-2xl transition-all group">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-full bg-green-600/20">
            <TrendingUp className="h-6 w-6 text-green-400 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Market Cap</p>
            <p className="text-xl font-bold text-white">CC {(marketData.totalMarketCap / 1000000000).toFixed(1)}B</p>
            <p className="text-xs text-green-400">{marketData.averageChange > 0 ? '+' : ''}{marketData.averageChange.toFixed(1)}% avg</p>
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
            <p className="text-xl font-bold text-white">{(marketData.totalVolume / 1000).toFixed(1)}K</p>
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
            <p className="text-xl font-bold text-white">{marketData.topGainers?.length || 0}</p>
            <p className="text-xs text-yellow-400">Trending now</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketOverviewStats;