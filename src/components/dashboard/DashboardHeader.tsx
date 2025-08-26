import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brain, TrendingUp, Activity, BarChart2, ArrowRight } from 'lucide-react';
import { MarketSentimentGauge } from '../ui/MarketSentimentGauge';

interface DashboardHeaderProps {
  marketSentiment: number;
  marketIndex: number;
  currentTime: Date;
}

export function DashboardHeader({ marketSentiment, marketIndex, currentTime }: DashboardHeaderProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
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
            to="/key-comics"
            className="group relative inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-lg
                     bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500
                     text-white shadow-lg hover:shadow-xl
                     transition-all duration-300 ease-out transform hover:-translate-y-1 active:translate-y-0
                     focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900
                     w-full sm:w-auto min-w-[250px] overflow-hidden"
          >
            <span className="relative z-10 flex items-center space-x-3">
              <Brain className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
              <span>Key Comics Pricing</span>
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
  );
}

export default DashboardHeader;