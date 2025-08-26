import React from 'react';
import { BarChart2, TrendingUp, TrendingDown, Activity, Star, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MarketPerformanceSummaryProps {
  className?: string;
}

export function MarketPerformanceSummary({ className = '' }: MarketPerformanceSummaryProps) {
  // Mock performance data
  const performanceData = [
    { category: 'Heroes', change: '+5.8%', positive: true, volume: '2.1M' },
    { category: 'Villains', change: '+3.2%', positive: true, volume: '1.8M' },
    { category: 'Creators', change: '+4.1%', positive: true, volume: '1.2M' },
    { category: 'Publishers', change: '-1.2%', positive: false, volume: '950K' },
    { category: 'Bonds', change: '+0.8%', positive: true, volume: '600K' },
    { category: 'Funds', change: '+2.3%', positive: true, volume: '800K' }
  ];

  return (
    <div className={`bg-slate-800/90 rounded-xl p-6 border border-slate-700/30 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all hover:-translate-y-1 ${className}`}>
      <div className="flex items-center space-x-2 mb-5">
        <BarChart2 className="h-6 w-6 text-blue-400" />
        <h3 className="font-semibold text-white text-lg">Market Performance</h3>
        <div className="ml-auto">
          <span className="px-2 py-1 bg-blue-900/50 text-blue-200 rounded-full text-xs border border-blue-700/50">
            Live Data
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        {performanceData.map((category, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${category.positive ? 'bg-green-400' : 'bg-red-400'}`} />
              <span className="text-white font-medium">{category.category}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-gray-400 text-sm">{category.volume}</span>
              <div className="flex items-center space-x-1">
                {category.positive ? (
                  <TrendingUp className="h-4 w-4 text-green-400" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400" />
                )}
                <span className={`font-semibold ${category.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {category.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-5 pt-4 border-t border-slate-600/30">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            <span>Market is </span>
            <span className="text-green-400 font-medium">trending upward</span>
            <span> across most sectors</span>
          </div>
          <Link 
            to="/markets"
            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MarketPerformanceSummary;