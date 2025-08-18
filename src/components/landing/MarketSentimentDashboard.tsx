import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, TrendingDown, AlertCircle, Newspaper, Users, BarChart2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';

export function MarketSentimentDashboard() {
  const [sentimentData, setSentimentData] = useState({
    overall: 0.72, // 72% positive
    confidence: 0.85,
    trending: 'up'
  });
  
  const [historicalSentiment, setHistoricalSentiment] = useState<Array<{ date: string; sentiment: number; volume: number }>>([]);
  const [newsBreakdown, setNewsBreakdown] = useState([
    { name: 'Positive', value: 65, color: '#22c55e' },
    { name: 'Neutral', value: 25, color: '#6b7280' },
    { name: 'Negative', value: 10, color: '#ef4444' }
  ]);

  // Generate historical sentiment data
  useEffect(() => {
    const generateSentimentHistory = () => {
      const data = [];
      for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        // Generate realistic sentiment fluctuation
        const baseSentiment = 0.65;
        const volatility = 0.15;
        const randomFactor = (Math.random() - 0.5) * volatility;
        const sentiment = Math.max(0, Math.min(1, baseSentiment + randomFactor));
        
        data.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          sentiment: Math.round(sentiment * 100),
          volume: Math.floor(Math.random() * 5000) + 2000
        });
      }
      return data;
    };

    setHistoricalSentiment(generateSentimentHistory());
  }, []);

  // Update sentiment periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setSentimentData(prev => {
        const volatility = 0.02;
        const change = (Math.random() - 0.5) * volatility;
        const newSentiment = Math.max(0.1, Math.min(0.9, prev.overall + change));
        
        return {
          overall: newSentiment,
          confidence: 0.8 + Math.random() * 0.15,
          trending: newSentiment > prev.overall ? 'up' : newSentiment < prev.overall ? 'down' : prev.trending
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getSentimentLevel = (sentiment: number) => {
    if (sentiment >= 0.7) return { level: 'Very Positive', color: 'text-green-400', bgColor: 'bg-green-900/30' };
    if (sentiment >= 0.6) return { level: 'Positive', color: 'text-green-300', bgColor: 'bg-green-900/20' };
    if (sentiment >= 0.4) return { level: 'Neutral', color: 'text-yellow-400', bgColor: 'bg-yellow-900/20' };
    if (sentiment >= 0.3) return { level: 'Negative', color: 'text-red-300', bgColor: 'bg-red-900/20' };
    return { level: 'Very Negative', color: 'text-red-400', bgColor: 'bg-red-900/30' };
  };

  const sentimentLevel = getSentimentLevel(sentimentData.overall);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800/90 backdrop-blur-md p-3 rounded-lg shadow-lg border border-slate-700/50">
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-sm text-white">
            Sentiment: {payload[0].value}%
          </p>
          <p className="text-sm text-white">
            Volume: {payload[1]?.value.toLocaleString()} mentions
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
      <div className="flex items-center space-x-3 mb-6">
        <Brain className="h-8 w-8 text-purple-400" />
        <div>
          <h2 className="text-2xl font-bold text-white">Market Sentiment Analysis</h2>
          <p className="text-gray-400">AI-powered sentiment tracking across news and social media</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Sentiment Gauge */}
        <div className="space-y-4">
          <div className={`p-4 rounded-lg border ${sentimentLevel.bgColor} border-opacity-50`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-white">Overall Sentiment</h3>
              {sentimentData.trending === 'up' ? (
                <TrendingUp className="h-5 w-5 text-green-400" />
              ) : sentimentData.trending === 'down' ? (
                <TrendingDown className="h-5 w-5 text-red-400" />
              ) : (
                <AlertCircle className="h-5 w-5 text-yellow-400" />
              )}
            </div>
            
            <div className="text-center">
              <p className={`text-3xl font-bold ${sentimentLevel.color}`}>
                {Math.round(sentimentData.overall * 100)}%
              </p>
              <p className={`text-sm ${sentimentLevel.color}`}>{sentimentLevel.level}</p>
            </div>
            
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Confidence</span>
                <span>{Math.round(sentimentData.confidence * 100)}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${sentimentData.confidence * 100}%` }}
                />
              </div>
            </div>
          </div>
          
          {/* News Breakdown */}
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
            <h4 className="font-medium text-white mb-3">News Sentiment Breakdown</h4>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={newsBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={50}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {newsBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value}%`, 'Articles']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Historical Sentiment Chart */}
        <div className="lg:col-span-2">
          <div className="bg-slate-700/30 rounded-lg p-4 h-80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">30-Day Sentiment Trend</h3>
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-400">Sentiment %</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                  <span className="text-gray-400">Volume</span>
                </div>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalSentiment}>
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
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="sentiment"
                  stroke="#a855f7"
                  fill="#a855f7"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
          <div className="flex items-center space-x-2 mb-2">
            <Newspaper className="h-5 w-5 text-indigo-400" />
            <h4 className="font-medium text-white">News Impact</h4>
          </div>
          <p className="text-sm text-gray-300">
            Recent Marvel announcements driving positive sentiment across superhero assets
          </p>
        </div>
        
        <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="h-5 w-5 text-green-400" />
            <h4 className="font-medium text-white">Social Buzz</h4>
          </div>
          <p className="text-sm text-gray-300">
            Creator stocks trending on social media with 15% increase in mentions
          </p>
        </div>
        
        <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
          <div className="flex items-center space-x-2 mb-2">
            <BarChart2 className="h-5 w-5 text-yellow-400" />
            <h4 className="font-medium text-white">Market Correlation</h4>
          </div>
          <p className="text-sm text-gray-300">
            Strong correlation (0.78) between sentiment and next-day price movements
          </p>
        </div>
      </div>
    </div>
  );
}

export default MarketSentimentDashboard;