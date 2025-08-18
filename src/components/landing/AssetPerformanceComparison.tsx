import React, { useState, useEffect } from 'react';
import { BarChart2, TrendingUp, TrendingDown, RefreshCw, Plus, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface AssetData {
  symbol: string;
  name: string;
  type: 'character' | 'creator' | 'publisher' | 'bond';
  color: string;
  currentPrice: number;
  change: number;
  percentChange: number;
}

export function AssetPerformanceComparison() {
  const [selectedAssets, setSelectedAssets] = useState<AssetData[]>([
    { symbol: 'ASM300', name: 'Amazing Spider-Man #300', type: 'character', color: '#3B82F6', currentPrice: 2500, change: 125, percentChange: 5.2 },
    { symbol: 'BATM', name: 'Batman', type: 'character', color: '#EF4444', currentPrice: 4200, change: 210, percentChange: 5.3 },
    { symbol: 'TMFS', name: 'Todd McFarlane', type: 'creator', color: '#10B981', currentPrice: 2500, change: 125, percentChange: 5.2 }
  ]);
  
  const [chartData, setChartData] = useState<Array<{ date: string; [key: string]: any }>>([]);
  const [timeRange, setTimeRange] = useState('1M');
  const [showAssetSelector, setShowAssetSelector] = useState(false);

  const availableAssets: AssetData[] = [
    { symbol: 'ASM300', name: 'Amazing Spider-Man #300', type: 'character', color: '#3B82F6', currentPrice: 2500, change: 125, percentChange: 5.2 },
    { symbol: 'BATM', name: 'Batman', type: 'character', color: '#EF4444', currentPrice: 4200, change: 210, percentChange: 5.3 },
    { symbol: 'SPDR', name: 'Spider-Man', type: 'character', color: '#F59E0B', currentPrice: 3500, change: 175, percentChange: 5.3 },
    { symbol: 'TMFS', name: 'Todd McFarlane', type: 'creator', color: '#10B981', currentPrice: 2500, change: 125, percentChange: 5.2 },
    { symbol: 'JLES', name: 'Jim Lee', type: 'creator', color: '#8B5CF6', currentPrice: 3200, change: 160, percentChange: 5.3 },
    { symbol: 'MRVL', name: 'Marvel Entertainment', type: 'publisher', color: '#EC4899', currentPrice: 4200, change: 210, percentChange: 5.3 },
    { symbol: 'DCCP', name: 'DC Comics', type: 'publisher', color: '#06B6D4', currentPrice: 3800, change: -76, percentChange: -2.0 },
    { symbol: 'MRVLB', name: 'Marvel Bond', type: 'bond', color: '#84CC16', currentPrice: 1035, change: 8.25, percentChange: 0.80 }
  ];

  // Generate historical performance data
  useEffect(() => {
    const generateHistoricalData = () => {
      const data = [];
      const periods = timeRange === '1W' ? 7 : timeRange === '1M' ? 30 : timeRange === '3M' ? 90 : 365;
      
      for (let i = periods; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        const dataPoint: any = {
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        };
        
        selectedAssets.forEach(asset => {
          // Generate realistic price movement
          const volatility = asset.type === 'bond' ? 0.005 : asset.type === 'publisher' ? 0.015 : 0.025;
          const trend = asset.percentChange > 0 ? 0.001 : -0.001;
          const randomWalk = (Math.random() - 0.5) * volatility + trend;
          
          // Calculate price based on current price and time
          const daysFactor = (periods - i) / periods;
          const baseValue = asset.currentPrice * (1 - asset.percentChange / 100);
          dataPoint[asset.symbol] = Math.round(baseValue * (1 + daysFactor * (asset.percentChange / 100) + randomWalk * i));
        });
        
        data.push(dataPoint);
      }
      
      return data;
    };

    setChartData(generateHistoricalData());
  }, [selectedAssets, timeRange]);

  const addAsset = (asset: AssetData) => {
    if (selectedAssets.length < 5 && !selectedAssets.find(a => a.symbol === asset.symbol)) {
      setSelectedAssets(prev => [...prev, asset]);
    }
    setShowAssetSelector(false);
  };

  const removeAsset = (symbol: string) => {
    setSelectedAssets(prev => prev.filter(asset => asset.symbol !== symbol));
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800/90 backdrop-blur-md p-4 rounded-lg shadow-lg border border-slate-700/50">
          <p className="text-sm text-gray-400 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => {
            const asset = selectedAssets.find(a => a.symbol === entry.dataKey);
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                  <span className="text-sm text-gray-300">{asset?.name}</span>
                </div>
                <span className="text-sm font-bold text-white ml-4">
                  CC {entry.value.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BarChart2 className="h-8 w-8 text-indigo-400" />
          <div>
            <h2 className="text-2xl font-bold text-white">Asset Performance Comparison</h2>
            <p className="text-gray-400">Compare historical performance across asset classes</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Time Range Selector */}
          <div className="flex space-x-2">
            {['1W', '1M', '3M', '1Y'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-700/50 text-gray-300 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setShowAssetSelector(!showAssetSelector)}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Asset</span>
          </button>
        </div>
      </div>
      
      {/* Asset Selector Modal */}
      {showAssetSelector && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700/50 w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
              <h3 className="text-lg font-bold text-white">Select Asset to Compare</h3>
              <button
                onClick={() => setShowAssetSelector(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
              {availableAssets
                .filter(asset => !selectedAssets.find(selected => selected.symbol === asset.symbol))
                .map(asset => (
                  <button
                    key={asset.symbol}
                    onClick={() => addAsset(asset)}
                    className="w-full flex items-center justify-between p-3 bg-slate-700/50 rounded-lg border border-slate-600/50 hover:bg-slate-700 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{getTypeIcon(asset.type)}</span>
                      <div className="text-left">
                        <p className="font-medium text-white">{asset.name}</p>
                        <p className="text-sm text-gray-400">{asset.symbol} • {asset.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-white">CC {asset.currentPrice.toLocaleString()}</p>
                      <p className={`text-xs ${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {asset.change >= 0 ? '+' : ''}{asset.percentChange}%
                      </p>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Selected Assets */}
      <div className="flex flex-wrap gap-2 mb-6">
        {selectedAssets.map(asset => (
          <div 
            key={asset.symbol}
            className="flex items-center space-x-2 bg-slate-700/50 rounded-lg px-3 py-2 border border-slate-600/50"
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: asset.color }}></div>
            <span className="text-sm text-white">{asset.symbol}</span>
            <button
              onClick={() => removeAsset(asset.symbol)}
              className="text-gray-400 hover:text-red-400 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
      
      {/* Performance Chart */}
      <div className="bg-slate-700/30 rounded-lg p-4 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis 
              dataKey="date" 
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {selectedAssets.map(asset => (
              <Line
                key={asset.symbol}
                type="monotone"
                dataKey={asset.symbol}
                stroke={asset.color}
                strokeWidth={2}
                dot={false}
                name={asset.name}
                activeDot={{ r: 4, fill: asset.color }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
          <h4 className="font-medium text-white mb-2">Best Performer</h4>
          {(() => {
            const best = selectedAssets.reduce((max, asset) => 
              asset.percentChange > max.percentChange ? asset : max
            );
            return (
              <div className="flex items-center justify-between">
                <span className="text-gray-300">{best.symbol}</span>
                <span className="text-green-400 font-bold">+{best.percentChange}%</span>
              </div>
            );
          })()}
        </div>
        
        <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
          <h4 className="font-medium text-white mb-2">Correlation</h4>
          <div className="text-center">
            <span className="text-xl font-bold text-white">0.72</span>
            <p className="text-xs text-gray-400">Average correlation</p>
          </div>
        </div>
        
        <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
          <h4 className="font-medium text-white mb-2">Volatility</h4>
          <div className="text-center">
            <span className="text-xl font-bold text-white">15.2%</span>
            <p className="text-xs text-gray-400">30-day volatility</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetPerformanceComparison;