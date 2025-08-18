import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';
import { Calendar, TrendingUp, TrendingDown, Info } from 'lucide-react';
import { Breadcrumbs } from './common/Breadcrumbs';

// Generate realistic historical data from 2014 to 2024
const generateHistoricalData = () => {
  const startDate = new Date(2014, 0, 1);
  const endDate = new Date(2024, 5, 1); // Up to mid-2024
  const data = [];
  let value = 5800; // Starting value in 2014

  // Key events affecting the market with realistic impacts
  const events = {
    '2014-05': { change: 2.8, reason: 'Amazing Spider-Man 2 Release' },
    '2014-08': { change: 3.5, reason: 'Guardians of the Galaxy Release' },
    '2015-05': { change: 4.2, reason: 'Avengers: Age of Ultron Release' },
    '2015-12': { change: 3.8, reason: 'Star Wars: The Force Awakens Impact' },
    '2016-03': { change: -3.2, reason: 'Market Correction' },
    '2016-05': { change: 5.2, reason: 'Captain America: Civil War Release' },
    '2016-11': { change: 2.5, reason: 'Doctor Strange Release' },
    '2017-06': { change: 6.1, reason: 'Wonder Woman Success' },
    '2017-11': { change: 4.8, reason: 'Justice League Release' },
    '2018-02': { change: 8.3, reason: 'Black Panther Impact' },
    '2018-04': { change: 7.2, reason: 'Infinity War Release' },
    '2018-10': { change: 3.5, reason: 'Venom Movie Release' },
    '2019-03': { change: 5.8, reason: 'Captain Marvel Release' },
    '2019-04': { change: 6.5, reason: 'Endgame Box Office Records' },
    '2019-07': { change: 4.5, reason: 'Comic Speculation Boom' },
    '2019-10': { change: 2.8, reason: 'Joker Movie Success' },
    '2020-03': { change: -15.8, reason: 'COVID-19 Market Crash' },
    '2020-06': { change: -7.3, reason: 'Diamond Distribution Crisis' },
    '2020-11': { change: 5.2, reason: 'Market Recovery Begins' },
    '2021-01': { change: 9.2, reason: 'NFT & Speculation Boom' },
    '2021-07': { change: 11.3, reason: 'Post-COVID Boom' },
    '2021-12': { change: 8.5, reason: 'Spider-Man: No Way Home Release' },
    '2022-02': { change: -7.8, reason: 'Market Correction' },
    '2022-05': { change: 3.6, reason: 'Doctor Strange 2 Release' },
    '2022-07': { change: 4.2, reason: 'Thor: Love and Thunder Release' },
    '2022-11': { change: -4.2, reason: 'Economic Uncertainty' },
    '2023-02': { change: 3.8, reason: 'Ant-Man and the Wasp: Quantumania' },
    '2023-05': { change: 4.5, reason: 'Guardians of the Galaxy Vol. 3' },
    '2023-07': { change: 3.8, reason: 'Summer Blockbuster Season' },
    '2023-09': { change: 4.1, reason: 'Graded Comics Rally' },
    '2023-11': { change: 3.2, reason: 'The Marvels Release' },
    '2024-02': { change: 2.8, reason: 'Strong Auction Results' },
    '2024-03': { change: 3.5, reason: 'Major Convention Sales' },
    '2024-05': { change: 4.2, reason: 'Summer Movie Anticipation' }
  };

  // Major market disruptions (for highlighted areas)
  const marketDisruptions = [
    { start: '2020-03', end: '2020-08', reason: 'COVID-19 Pandemic Impact' },
    { start: '2022-02', end: '2022-05', reason: 'Market Correction Period' }
  ];

  // Calculate monthly data points
  for (let date = new Date(startDate); date <= endDate; date.setMonth(date.getMonth() + 1)) {
    const dateKey = date.toISOString().slice(0, 7);
    const event = events[dateKey];
    
    // Base monthly variation (-1.5% to +2%)
    const baseVariation = (Math.random() * 3.5 - 1.5) / 100;
    
    // Add event impact if exists
    const eventImpact = event ? event.change / 100 : 0;
    
    // Calculate new value with more pronounced volatility
    value = value * (1 + baseVariation + eventImpact);

    // Add seasonal patterns
    const month = date.getMonth();
    // Summer boost (June-August)
    if (month >= 5 && month <= 7) {
      value *= 1.01;
    }
    // Winter holiday boost (November-December)
    else if (month >= 10 && month <= 11) {
      value *= 1.015;
    }
    // Post-holiday slump (January-February)
    else if (month >= 0 && month <= 1) {
      value *= 0.99;
    }

    // Find if this date is in a market disruption period
    const disruption = marketDisruptions.find(d => 
      dateKey >= d.start && dateKey <= d.end
    );

    // Ensure we reach approximately 14,000 by the end of the data
    if (date.getFullYear() === 2024 && date.getMonth() >= 4) {
      // Adjust final values to reach target
      const remainingMonths = 6 - date.getMonth();
      if (remainingMonths > 0) {
        const targetValue = 14000;
        const currentDifference = targetValue - value;
        const adjustment = currentDifference / remainingMonths;
        value += adjustment;
      }
    }

    data.push({
      date: dateKey,
      value: Math.round(value),
      event: event?.reason,
      disruption: disruption?.reason
    });
  }

  // Calculate YTD returns for each year
  const yearlyReturns = {};
  let previousYearEnd = data[0].value;
  
  data.forEach(point => {
    const year = point.date.substring(0, 4);
    const month = point.date.substring(5, 7);
    
    if (month === '12') {
      const yearReturn = ((point.value - previousYearEnd) / previousYearEnd) * 100;
      yearlyReturns[year] = parseFloat(yearReturn.toFixed(1));
      previousYearEnd = point.value;
    }
  });

  // Calculate current year YTD
  const currentYear = new Date().getFullYear().toString();
  const firstDayOfYear = data.find(d => d.date.startsWith(currentYear + '-01'));
  const latestDay = data.find(d => d.date.startsWith(currentYear));
  
  if (firstDayOfYear && latestDay) {
    const ytdReturn = ((latestDay.value - firstDayOfYear.value) / firstDayOfYear.value) * 100;
    yearlyReturns[currentYear] = parseFloat(ytdReturn.toFixed(1));
  }

  // Calculate CAGR (Compound Annual Growth Rate)
  const firstValue = data[0].value;
  const lastValue = data[data.length - 1].value;
  const years = (endDate.getFullYear() - startDate.getFullYear()) + 
                (endDate.getMonth() - startDate.getMonth()) / 12;
  const cagr = (Math.pow(lastValue / firstValue, 1 / years) - 1) * 100;

  return {
    data,
    yearlyReturns,
    cagr: parseFloat(cagr.toFixed(1)),
    marketDisruptions,
    initialValue: firstValue,
    finalValue: lastValue
  };
};

const { 
  data: marketData, 
  yearlyReturns, 
  cagr, 
  marketDisruptions,
  initialValue,
  finalValue
} = generateHistoricalData();

// Custom tooltip component with enhanced styling
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    return (
      <div className="bg-slate-800/90 backdrop-blur-md p-4 rounded-lg shadow-lg border border-slate-700/50">
        <p className="text-sm text-gray-400 mb-1">{new Date(label).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
        <p className="text-lg font-bold text-white">Index Value: {dataPoint.value.toLocaleString()}</p>
        
        {dataPoint.event && (
          <div className="mt-2 pt-2 border-t border-slate-700/50">
            <p className="text-sm font-medium text-indigo-400">Market Event:</p>
            <p className="text-sm text-gray-300">{dataPoint.event}</p>
          </div>
        )}
        
        {dataPoint.disruption && (
          <div className="mt-2 pt-2 border-t border-slate-700/50">
            <p className="text-sm font-medium text-red-400">Market Disruption:</p>
            <p className="text-sm text-gray-300">{dataPoint.disruption}</p>
          </div>
        )}
      </div>
    );
  }
  return null;
};

export function ComicMarketIndexTrend() {
  const [timeRange, setTimeRange] = useState('all');
  const [showEvents, setShowEvents] = useState(true);
  const [infoOpen, setInfoOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  // Filter data based on selected time range
  const getFilteredData = () => {
    if (timeRange === 'all') return marketData;
    
    const now = new Date();
    let startDate;
    
    switch (timeRange) {
      case '1y':
        startDate = new Date(now);
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      case '5y':
        startDate = new Date(now);
        startDate.setFullYear(startDate.getFullYear() - 5);
        break;
      case '10y':
        startDate = new Date(now);
        startDate.setFullYear(startDate.getFullYear() - 10);
        break;
      default:
        return marketData;
    }
    
    const startDateStr = startDate.toISOString().slice(0, 7);
    return marketData.filter(item => item.date >= startDateStr);
  };

  const filteredData = getFilteredData();
  
  // Calculate current value and change
  const currentValue = marketData[marketData.length - 1].value;
  const previousValue = marketData[marketData.length - 2].value;
  const changeValue = currentValue - previousValue;
  const changePercent = (changeValue / previousValue) * 100;

  // Get current year for YTD display
  const currentYear = new Date().getFullYear().toString();

  // Calculate total growth
  const totalGrowth = ((finalValue - initialValue) / initialValue) * 100;

  return (
    <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl w-full mb-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs overrides={[
        { name: 'Markets', path: '/markets' },
        { name: 'Comic Market Index' }
      ]} />
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="h-6 w-6 text-indigo-400" />
          <h2 className="text-2xl font-bold text-white">Comic Market Index (2014-2024)</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {['1y', '5y', '10y', 'all'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {range === 'all' ? 'ALL' : range.toUpperCase()}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setInfoOpen(!infoOpen)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Info className="h-5 w-5" />
            </button>
            
            {infoOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-slate-700/90 backdrop-blur-md rounded-lg shadow-xl border border-slate-600/50 p-4 z-10">
                <h3 className="font-semibold text-white mb-2">About the Comic Market Index</h3>
                <p className="text-sm text-gray-300 mb-2">
                  This index tracks the performance of key comic books across all major ages, weighted by significance and market activity.
                </p>
                <p className="text-sm text-gray-300 mb-2">
                  The chart includes historical data from 2014 to 2024, showing the impact of major market events and industry milestones.
                </p>
                <p className="text-sm text-gray-300">
                  Highlighted areas indicate major market disruptions or significant volatility periods.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div className="flex items-center space-x-4 mb-2 sm:mb-0">
          <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50">
            <p className="text-sm text-gray-400">Current Value</p>
            <p className="text-xl font-bold text-white">{currentValue.toLocaleString()}</p>
          </div>
          
          <div className={`p-3 rounded-lg border ${
            changeValue >= 0 
              ? 'bg-green-900/30 border-green-700/30' 
              : 'bg-red-900/30 border-red-700/30'
          }`}>
            <p className="text-sm text-gray-400">Monthly Change</p>
            <div className="flex items-center">
              {changeValue >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
              )}
              <p className={`text-xl font-bold ${
                changeValue >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {changeValue >= 0 ? '+' : ''}{changePercent.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={showEvents}
              onChange={() => setShowEvents(!showEvents)}
              className="rounded bg-slate-700 border-slate-600 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Show Events</span>
          </label>
        </div>
      </div>
      
      {/* Main Chart with Glow Effects */}
      <div className="relative h-96 mb-6">
        {/* Glow effect container */}
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 animate-pulse"></div>
        </div>
        
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => {
                // Show year only for better readability
                return date.substring(0, 4);
              }}
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
              tickCount={11}
              domain={['dataMin', 'dataMax']}
            />
            <YAxis 
              stroke="#94a3b8"
              tickFormatter={(value) => value.toLocaleString()}
              domain={[0, 16000]}
              tick={{ fontSize: 12 }}
              tickCount={9}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Historical data line with glow effect */}
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {/* Area under the line for subtle glow */}
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#818cf8" 
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 8, fill: '#818cf8', filter: 'url(#glow)' }}
              filter="url(#glow)"
            />
            
            {/* Market Events */}
            {showEvents && filteredData.map((entry, index) => {
              if (entry.event) {
                return (
                  <ReferenceLine 
                    key={`event-${index}`}
                    x={entry.date} 
                    stroke="#9333ea" 
                    strokeDasharray="3 3"
                    label={{ 
                      value: entry.event, 
                      position: 'insideTopRight',
                      fill: '#9333ea',
                      fontSize: 10
                    }}
                  />
                );
              }
              return null;
            })}
            
            {/* Market disruption periods */}
            {marketDisruptions.map((disruption, index) => (
              <ReferenceArea 
                key={`disruption-${index}`}
                x1={disruption.start} 
                x2={disruption.end} 
                fill="#ef4444" 
                fillOpacity={0.1} 
                stroke="#ef4444"
                strokeOpacity={0.3}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50 hover:shadow-[0_0_15px_rgba(255,255,0,0.7)] transition-all">
          <p className="text-sm text-gray-400">Current Value</p>
          <p className="text-xl font-bold text-white">{currentValue.toLocaleString()}</p>
          <div className="flex items-center mt-1">
            {changeValue >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
            )}
            <span className={`text-sm ${changeValue >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {changeValue >= 0 ? '+' : ''}{changeValue.toLocaleString()} ({changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
        
        <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50 hover:shadow-[0_0_15px_rgba(255,255,0,0.7)] transition-all">
          <p className="text-sm text-gray-400">YTD Change</p>
          <p className={`text-xl font-bold ${yearlyReturns[currentYear] >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {yearlyReturns[currentYear] >= 0 ? '+' : ''}{yearlyReturns[currentYear]}%
          </p>
          <p className="text-sm text-gray-400 mt-1">Year to Date</p>
        </div>
        
        <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50 hover:shadow-[0_0_15px_rgba(255,255,0,0.7)] transition-all">
          <p className="text-sm text-gray-400">10-Year Growth</p>
          <p className="text-xl font-bold text-indigo-400">+{totalGrowth.toFixed(1)}%</p>
          <p className="text-sm text-gray-400 mt-1">Total Return</p>
        </div>
        
        <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50 hover:shadow-[0_0_15px_rgba(255,255,0,0.7)] transition-all">
          <p className="text-sm text-gray-400">10-Year CAGR</p>
          <p className="text-xl font-bold text-white">{cagr}%</p>
          <p className="text-sm text-gray-400 mt-1">Compound Annual Growth</p>
        </div>
      </div>
      
      <div className="mt-6 border-t border-slate-700/50 pt-6">
        <h3 className="text-lg font-semibold text-white mb-4">Historical Annual Returns</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Object.entries(yearlyReturns).map(([year, returnValue]) => (
            <div 
              key={year} 
              className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50 hover:shadow-[0_0_15px_rgba(255,255,0,0.7)] transition-all cursor-pointer"
              onClick={() => setSelectedCard(selectedCard === year ? null : year)}
              style={{
                boxShadow: selectedCard === year ? '0 0 15px rgba(255,255,0,0.9)' : '',
                transform: selectedCard === year ? 'translateY(-2px)' : ''
              }}
            >
              <p className="text-sm text-gray-400">{year}</p>
              <p className={`text-lg font-semibold ${returnValue >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {returnValue >= 0 ? '+' : ''}{returnValue}%
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 border-t border-slate-700/50 pt-6">
        <h3 className="text-lg font-semibold text-white mb-4">Market Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
            <h4 className="font-medium text-indigo-400 mb-2">Key Trends</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Strong correlation between media adaptations and market performance</li>
              <li>• Significant market volatility during economic disruptions</li>
              <li>• Consistent long-term growth despite short-term fluctuations</li>
              <li>• Increasing market resilience post-COVID recovery</li>
              <li>• Seasonal patterns with summer and holiday boosts</li>
            </ul>
          </div>
          
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
            <h4 className="font-medium text-indigo-400 mb-2">Market Drivers</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Media adaptations continue to be primary market catalyst</li>
              <li>• Institutional investor interest increasing market liquidity</li>
              <li>• Grading company backlogs affecting market supply</li>
              <li>• Digital collectibles creating new market segments</li>
              <li>• Generational wealth transfer increasing high-end collecting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default { ComicMarketIndexTrend };