import React from 'react';
import { TrendingUp, TrendingDown, Activity, Clock } from 'lucide-react';

interface DashboardHeaderProps {
  marketSentiment: number;
  marketIndex: number;
  currentTime: Date;
}

export function DashboardHeader({ marketSentiment, marketIndex, currentTime }: DashboardHeaderProps) {
  const isMarketUp = marketSentiment > 0;
  const sentimentPercentage = Math.abs(marketSentiment * 100);

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl p-6 mb-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
        <div className="flex-1">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            Panel Profits Exchange
          </h1>
          <p className="text-white/90 text-lg">
            Trade comic characters, creators, and collectibles in the ultimate virtual market
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-6 lg:mt-0">
          {/* Market Index */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
            <div className="flex items-center justify-center space-x-1 text-white/80 mb-1">
              <Activity className="h-4 w-4" />
              <span className="text-sm font-medium">Market Index</span>
            </div>
            <div className="text-xl font-bold text-white">
              {marketIndex.toLocaleString('en-US', { 
                minimumFractionDigits: 0, 
                maximumFractionDigits: 0 
              })}
            </div>
          </div>

          {/* Market Sentiment */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
            <div className="flex items-center justify-center space-x-1 text-white/80 mb-1">
              {isMarketUp ? (
                <TrendingUp className="h-4 w-4 text-green-300" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-300" />
              )}
              <span className="text-sm font-medium">Sentiment</span>
            </div>
            <div className={`text-xl font-bold ${isMarketUp ? 'text-green-300' : 'text-red-300'}`}>
              {isMarketUp ? '+' : '-'}{sentimentPercentage.toFixed(1)}%
            </div>
          </div>

          {/* Current Time */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-center col-span-2 lg:col-span-1">
            <div className="flex items-center justify-center space-x-1 text-white/80 mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Market Time</span>
            </div>
            <div className="text-lg font-bold text-white">
              {currentTime.toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}