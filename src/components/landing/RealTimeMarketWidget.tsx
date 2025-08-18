import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, BarChart2, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export function RealTimeMarketWidget() {
  const [marketData, setMarketData] = useState({
    indexValue: 14250,
    change: 125,
    percentChange: 0.88,
    volume: 12500000,
    activeTraders: 1250
  });
  
  const [chartData, setChartData] = useState<Array<{ time: string; value: number }>>([]);
  const [isLive, setIsLive] = useState(true);

  // Generate realistic intraday data
  useEffect(() => {
    const generateIntradayData = () => {
      const data = [];
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 30); // 9:30 AM
      
      let currentValue = 14125; // Starting value
      
      for (let i = 0; i < 24; i++) { // 24 data points throughout the day
        const time = new Date(startOfDay.getTime() + i * 15 * 60 * 1000); // Every 15 minutes
        
        // Add realistic market movement
        const volatility = 0.002; // 0.2% volatility
        const randomChange = (Math.random() - 0.5) * 2 * volatility;
        currentValue = currentValue * (1 + randomChange);
        
        data.push({
          time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          value: Math.round(currentValue)
        });
      }
      
      return data;
    };

    setChartData(generateIntradayData());
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setMarketData(prev => {
        const volatility = 0.001; // 0.1% volatility per update
        const randomChange = (Math.random() - 0.5) * 2 * volatility;
        const newValue = Math.round(prev.indexValue * (1 + randomChange));
        const change = newValue - 14125; // Change from opening
        const percentChange = (change / 14125) * 100;
        
        return {
          ...prev,
          indexValue: newValue,
          change: Math.round(change),
          percentChange: Math.round(percentChange * 100) / 100,
          volume: prev.volume + Math.floor(Math.random() * 10000),
          activeTraders: 1200 + Math.floor(Math.random() * 100)
        };
      });

      // Update chart data
      setChartData(prev => {
        const newData = [...prev];
        const lastValue = newData[newData.length - 1]?.value || 14250;
        const volatility = 0.002;
        const randomChange = (Math.random() - 0.5) * 2 * volatility;
        const newValue = Math.round(lastValue * (1 + randomChange));
        
        newData.push({
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          value: newValue
        });
        
        // Keep only last 24 points
        return newData.slice(-24);
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800/90 backdrop-blur-md p-3 rounded-lg shadow-lg border border-slate-700/50">
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-lg font-bold text-white">
            {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-slate-700/50 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Activity className="h-8 w-8 text-indigo-400" />
            {isLive && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Comic Market Index</h2>
            <p className="text-sm text-gray-400">Real-time market performance</p>
          </div>
        </div>
        
        <button
          onClick={() => setIsLive(!isLive)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
            isLive 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-slate-700 hover:bg-slate-600 text-gray-300'
          }`}
        >
          <Zap className="h-4 w-4" />
          <span>{isLive ? 'LIVE' : 'PAUSED'}</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Key Metrics */}
        <div className="space-y-4">
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
            <p className="text-sm text-gray-400 mb-1">Index Value</p>
            <p className="text-3xl font-bold text-white">{marketData.indexValue.toLocaleString()}</p>
            <div className="flex items-center mt-2">
              {marketData.change >= 0 ? (
                <TrendingUp className="h-5 w-5 text-green-400 mr-2" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-400 mr-2" />
              )}
              <span className={`font-semibold ${marketData.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {marketData.change >= 0 ? '+' : ''}{marketData.change} ({marketData.change >= 0 ? '+' : ''}{marketData.percentChange}%)
              </span>
            </div>
          </div>
          
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
            <p className="text-sm text-gray-400 mb-1">24h Volume</p>
            <p className="text-xl font-bold text-white">CC {(marketData.volume / 1000000).toFixed(1)}M</p>
          </div>
          
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
            <p className="text-sm text-gray-400 mb-1">Active Traders</p>
            <p className="text-xl font-bold text-white">{marketData.activeTraders.toLocaleString()}</p>
          </div>
        </div>
        
        {/* Live Chart */}
        <div className="lg:col-span-2">
          <div className="bg-slate-700/30 rounded-lg p-4 h-64">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Intraday Performance</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Updates</span>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis 
                  dataKey="time" 
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#94a3b8"
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={(value) => value.toLocaleString()}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#22c55e' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-center">
        <button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors">
          <BarChart2 className="h-5 w-5" />
          <span>View Detailed Market Analysis</span>
        </button>
      </div>
    </div>
  );
}

export default RealTimeMarketWidget;