import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, DollarSign, Target, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';

export function PortfolioROICalculator() {
  const [investment, setInvestment] = useState(10000);
  const [timeHorizon, setTimeHorizon] = useState(5);
  const [riskLevel, setRiskLevel] = useState('moderate');
  const [projectionData, setProjectionData] = useState<Array<{ year: number; conservative: number; moderate: number; aggressive: number }>>([]);

  // Calculate projections based on inputs
  useEffect(() => {
    const generateProjections = () => {
      const data = [];
      const returns = {
        conservative: 0.08, // 8% annual return
        moderate: 0.12,     // 12% annual return
        aggressive: 0.18    // 18% annual return
      };

      for (let year = 0; year <= timeHorizon; year++) {
        data.push({
          year,
          conservative: Math.round(investment * Math.pow(1 + returns.conservative, year)),
          moderate: Math.round(investment * Math.pow(1 + returns.moderate, year)),
          aggressive: Math.round(investment * Math.pow(1 + returns.aggressive, year))
        });
      }
      
      setProjectionData(data);
    };

    generateProjections();
  }, [investment, timeHorizon]);

  const getCurrentProjection = () => {
    const finalData = projectionData[projectionData.length - 1];
    if (!finalData) return { value: 0, gain: 0, gainPercent: 0 };
    
    const value = finalData[riskLevel as keyof typeof finalData] as number;
    const gain = value - investment;
    const gainPercent = ((gain / investment) * 100);
    
    return { value, gain, gainPercent };
  };

  const { value, gain, gainPercent } = getCurrentProjection();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800/90 backdrop-blur-md p-4 rounded-lg shadow-lg border border-slate-700/50">
          <p className="text-sm text-gray-400 mb-2">Year {label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-gray-300 capitalize">{entry.dataKey}:</span>
              <span className="text-sm font-bold text-white ml-2">
                CC {entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
      <div className="flex items-center space-x-3 mb-6">
        <Calculator className="h-8 w-8 text-green-400" />
        <div>
          <h2 className="text-2xl font-bold text-white">Portfolio ROI Calculator</h2>
          <p className="text-gray-400">Calculate your potential returns in the comic market</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Controls */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Initial Investment (CC)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-1">
                <span>CC 1K</span>
                <span className="font-bold text-white">CC {investment.toLocaleString()}</span>
                <span>CC 100K</span>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Time Horizon (Years)
            </label>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={timeHorizon}
              onChange={(e) => setTimeHorizon(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-400 mt-1">
              <span>1 Year</span>
              <span className="font-bold text-white">{timeHorizon} Years</span>
              <span>10 Years</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Risk Profile
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'conservative', label: 'Conservative', return: '8%', color: 'bg-green-600' },
                { key: 'moderate', label: 'Moderate', return: '12%', color: 'bg-yellow-600' },
                { key: 'aggressive', label: 'Aggressive', return: '18%', color: 'bg-red-600' }
              ].map(option => (
                <button
                  key={option.key}
                  onClick={() => setRiskLevel(option.key)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    riskLevel === option.key
                      ? `${option.color} border-white text-white`
                      : 'bg-slate-700/50 border-slate-600/50 text-gray-300 hover:border-slate-500'
                  }`}
                >
                  <div className="text-sm font-medium">{option.label}</div>
                  <div className="text-xs opacity-80">{option.return} avg</div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Results Summary */}
          <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 p-4 rounded-lg border border-green-700/30">
            <div className="flex items-center space-x-2 mb-3">
              <Target className="h-5 w-5 text-green-400" />
              <h3 className="font-semibold text-white">Projected Results</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Final Value</p>
                <p className="text-xl font-bold text-white">CC {value.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Gain</p>
                <p className="text-xl font-bold text-green-400">
                  +CC {gain.toLocaleString()} ({gainPercent.toFixed(1)}%)
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Projection Chart */}
        <div>
          <div className="bg-slate-700/30 rounded-lg p-4 h-80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Growth Projection</h3>
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400">Conservative</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-400">Moderate</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-400">Aggressive</span>
                </div>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectionData}>
                <XAxis 
                  dataKey="year" 
                  stroke="#94a3b8"
                  fontSize={12}
                  tickFormatter={(value) => `Year ${value}`}
                />
                <YAxis 
                  stroke="#94a3b8"
                  fontSize={12}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="conservative"
                  stackId="1"
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.1}
                />
                <Area
                  type="monotone"
                  dataKey="moderate"
                  stackId="2"
                  stroke="#eab308"
                  fill="#eab308"
                  fillOpacity={0.1}
                />
                <Area
                  type="monotone"
                  dataKey="aggressive"
                  stackId="3"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.1}
                />
                <Line 
                  type="monotone" 
                  dataKey={riskLevel}
                  stroke={riskLevel === 'conservative' ? '#22c55e' : riskLevel === 'moderate' ? '#eab308' : '#ef4444'}
                  strokeWidth={3}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-indigo-900/20 p-4 rounded-lg border border-indigo-700/30">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-indigo-200 font-medium mb-1">Calculation Methodology</p>
            <p className="text-xs text-gray-300">
              Projections based on historical Comic Market Index performance (2014-2024). Conservative: 8% annual return, 
              Moderate: 12% annual return, Aggressive: 18% annual return. Past performance does not guarantee future results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioROICalculator;