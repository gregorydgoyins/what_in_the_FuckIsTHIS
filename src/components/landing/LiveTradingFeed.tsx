import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, TrendingDown, Users, Clock } from 'lucide-react';

interface TradeActivity {
  id: string;
  symbol: string;
  name: string;
  type: 'character' | 'creator' | 'publisher' | 'bond';
  action: 'buy' | 'sell';
  quantity: number;
  price: number;
  timestamp: Date;
  trader: string;
}

export function LiveTradingFeed() {
  const [activities, setActivities] = useState<TradeActivity[]>([]);
  const [isLive, setIsLive] = useState(true);

  // Mock trading data
  const mockAssets = [
    { symbol: 'ASM300', name: 'Amazing Spider-Man #300', type: 'character' as const },
    { symbol: 'BATM', name: 'Batman', type: 'character' as const },
    { symbol: 'TMFS', name: 'Todd McFarlane', type: 'creator' as const },
    { symbol: 'JLES', name: 'Jim Lee', type: 'creator' as const },
    { symbol: 'MRVL', name: 'Marvel Entertainment', type: 'publisher' as const },
    { symbol: 'DCCP', name: 'DC Comics', type: 'publisher' as const },
    { symbol: 'MRVLB', name: 'Marvel Bond', type: 'bond' as const },
    { symbol: 'DCCB', name: 'DC Comics Bond', type: 'bond' as const }
  ];

  const traderNames = [
    'ComicCollector92', 'MarvelFan2024', 'DCInvestor', 'SpiderManTrader', 
    'BatmanBuyer', 'VintageComics', 'ModernAgeInvestor', 'GoldenAgeGuru',
    'SilverSurfer88', 'BronzeAgeExpert', 'CopperCollector', 'KeyIssueKing'
  ];

  // Generate realistic trading activity
  const generateTradeActivity = (): TradeActivity => {
    const asset = mockAssets[Math.floor(Math.random() * mockAssets.length)];
    const action = Math.random() > 0.5 ? 'buy' : 'sell';
    const basePrice = {
      'ASM300': 2500,
      'BATM': 4200,
      'TMFS': 2500,
      'JLES': 3200,
      'MRVL': 4200,
      'DCCP': 3800,
      'MRVLB': 1035,
      'DCCB': 1020
    }[asset.symbol] || 2000;
    
    const priceVariation = 0.95 + Math.random() * 0.1; // ±5% price variation
    const price = Math.round(basePrice * priceVariation);
    const quantity = Math.floor(Math.random() * 10) + 1;
    const trader = traderNames[Math.floor(Math.random() * traderNames.length)];

    return {
      id: `trade-${Date.now()}-${Math.random()}`,
      symbol: asset.symbol,
      name: asset.name,
      type: asset.type,
      action,
      quantity,
      price,
      timestamp: new Date(),
      trader
    };
  };

  // Initialize with some activities
  useEffect(() => {
    const initialActivities = Array.from({ length: 8 }, () => {
      const activity = generateTradeActivity();
      activity.timestamp = new Date(Date.now() - Math.random() * 300000); // Last 5 minutes
      return activity;
    }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    setActivities(initialActivities);
  }, []);

  // Add new activities periodically
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const newActivity = generateTradeActivity();
      setActivities(prev => [newActivity, ...prev.slice(0, 19)]); // Keep last 20 activities
    }, 2000 + Math.random() * 3000); // Every 2-5 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'character': return '👤';
      case 'creator': return '👨‍🎨';
      case 'publisher': return '🏢';
      case 'bond': return '📜';
      default: return '📊';
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const seconds = Math.floor((Date.now() - timestamp.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Activity className="h-6 w-6 text-indigo-400" />
            {isLive && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Live Trading Activity</h2>
            <p className="text-sm text-gray-400">Real-time market transactions</p>
          </div>
        </div>
        
        <button
          onClick={() => setIsLive(!isLive)}
          className={`px-3 py-1 rounded-lg text-sm transition-colors ${
            isLive 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-slate-700 hover:bg-slate-600 text-gray-300'
          }`}
        >
          {isLive ? 'LIVE' : 'PAUSED'}
        </button>
      </div>
      
      {/* Activity Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50">
          <p className="text-xs text-gray-400">Active Traders</p>
          <p className="text-lg font-bold text-white">1,247</p>
        </div>
        <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50">
          <p className="text-xs text-gray-400">24h Volume</p>
          <p className="text-lg font-bold text-white">CC 12.5M</p>
        </div>
        <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50">
          <p className="text-xs text-gray-400">Trades/Hour</p>
          <p className="text-lg font-bold text-white">342</p>
        </div>
      </div>
      
      {/* Live Feed */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {activities.map((activity) => (
          <div 
            key={activity.id}
            className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:bg-slate-700/50 transition-colors animate-fade-in"
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                activity.action === 'buy' 
                  ? 'bg-green-900/50 border border-green-700/50' 
                  : 'bg-red-900/50 border border-red-700/50'
              }`}>
                {activity.action === 'buy' ? (
                  <TrendingUp className="h-4 w-4 text-green-400" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400" />
                )}
              </div>
              
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{getTypeIcon(activity.type)}</span>
                  <span className="font-medium text-white text-sm">{activity.symbol}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    activity.action === 'buy' 
                      ? 'bg-green-900/50 text-green-200' 
                      : 'bg-red-900/50 text-red-200'
                  }`}>
                    {activity.action.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{activity.quantity} @ CC {activity.price.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-gray-400">{activity.trader}</p>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{getTimeAgo(activity.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors mx-auto">
          <Users className="h-4 w-4" />
          <span>Join {activities.length > 0 ? '1,247' : '1,200+'} Active Traders</span>
        </button>
      </div>
    </div>
  );
}

export default LiveTradingFeed;