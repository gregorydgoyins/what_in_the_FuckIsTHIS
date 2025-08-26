import React from 'react';
import { Brain, Crown, Star, Lightbulb, Zap, Check, X, Network, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { IdeaClustering } from '../components/IdeaClustering';
import { NewsFeed } from '../components/news/NewsFeed';
import { useNewsData } from '../hooks/useNewsData';
import { useSubscriptionStore } from '../store/subscriptionStore';
import { SubscriptionTier } from '../types';

export function IdeasPage() {
  const { currentTier, setTier, features } = useSubscriptionStore();
  const { data: news } = useNewsData({ limit: 5 });

  // Market data for charts
  const marketTrendData = [
    { month: 'Jan', heroes: 2400, villains: 1900, creators: 1500, publishers: 1200 },
    { month: 'Feb', heroes: 2550, villains: 2100, creators: 1650, publishers: 1300 },
    { month: 'Mar', heroes: 2800, villains: 2300, creators: 1800, publishers: 1400 },
    { month: 'Apr', heroes: 3100, villains: 2500, creators: 2000, publishers: 1550 },
    { month: 'May', heroes: 3350, villains: 2700, creators: 2200, publishers: 1700 },
    { month: 'Jun', heroes: 3200, villains: 2650, creators: 2150, publishers: 1680 }
  ];

  const sentimentData = [
    { name: 'Positive', value: 65, color: '#22C55E' },
    { name: 'Neutral', value: 25, color: '#6B7280' },
    { name: 'Negative', value: 10, color: '#EF4444' }
  ];

  const volumeData = [
    { category: 'Heroes', volume: 2850000, growth: 12.5 },
    { category: 'Villains', volume: 2100000, growth: 8.2 },
    { category: 'Creators', volume: 1200000, growth: 15.8 },
    { category: 'Publishers', volume: 980000, growth: 5.3 },
    { category: 'Bonds', volume: 450000, growth: 3.1 },
    { category: 'Funds', volume: 680000, growth: 7.9 }
  ];

  // Comic Market Index data
  const comicMarketIndexData = [
    { time: '9:30', value: 14150 },
    { time: '10:00', value: 14180 },
    { time: '10:30', value: 14220 },
    { time: '11:00', value: 14195 },
    { time: '11:30', value: 14250 },
    { time: '12:00', value: 14280 },
    { time: '12:30', value: 14265 },
    { time: '1:00', value: 14290 },
    { time: '1:30', value: 14315 },
    { time: '2:00', value: 14350 },
    { time: '2:30', value: 14325 },
    { time: '3:00', value: 14375 },
    { time: '3:30', value: 14400 }
  ];

  // Portfolio breakdown data
  const portfolioBreakdownData = [
    { name: 'Heroes', value: 35, color: '#22C55E' },
    { name: 'Villains', value: 20, color: '#EF4444' },
    { name: 'Creators', value: 15, color: '#3B82F6' },
    { name: 'Publishers', value: 12, color: '#8B5CF6' },
    { name: 'Bonds', value: 10, color: '#F59E0B' },
    { name: 'Funds', value: 8, color: '#EC4899' }
  ];

  // Top gainers data
  const topGainersData = [
    { symbol: 'ASM300', name: 'Amazing Spider-Man #300', change: 8.5, price: 2650 },
    { symbol: 'BATM', name: 'Batman', change: 6.2, price: 4462 },
    { symbol: 'TMFS', name: 'Todd McFarlane', change: 5.8, price: 1958 },
    { symbol: 'SPDR', name: 'Spider-Man', change: 5.3, price: 3686 },
    { symbol: 'WNDR', name: 'Wonder Woman', change: 4.9, price: 3986 }
  ];

  // Market laggards data
  const marketLaggardsData = [
    { symbol: 'LEXL', name: 'Lex Luthor', change: -3.2, price: 3488 },
    { symbol: 'ARTS', name: 'Stanley Artgerm Lau', change: -2.8, price: 1459 },
    { symbol: 'BMBS', name: 'Brian Michael Bendis', change: -2.1, price: 2058 },
    { symbol: 'GCAP', name: 'Greg Capullo', change: -1.9, price: 1911 },
    { symbol: 'DCCB', name: 'DC Comics Bond', change: -1.5, price: 1013 }
  ];

  const tierInfo = {
    basic: {
      name: 'Market Observer',
      description: 'Basic market trend analysis and categorization',
      icon: Lightbulb,
      color: 'bg-blue-600',
      features: [
        'Up to 7 market segments',
        'Basic trend grouping',
        'Simple pattern identification',
        'Manual categorization'
      ]
    },
    standard: {
      name: 'Market Analyst',
      description: 'Advanced market analysis with sentiment tracking',
      icon: Star,
      color: 'bg-yellow-600',
      features: [
        'Up to 25 market segments',
        'Publisher sentiment analysis',
        'Custom analysis merging',
        'Export capabilities',
        'Key trend extraction'
      ]
    },
    premium: {
      name: 'Strategic Intelligence',
      description: 'Premium market intelligence with real-time insights',
      icon: Crown,
      color: 'bg-purple-600',
      features: [
        'Up to 100 market segments',
        'Real-time market analysis',
        'Advanced visualizations',
        'Cross-market analysis',
        'Priority processing',
        'API access',
        'AI trading recommendations'
      ]
    }
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs overrides={[{ name: 'AI Ideas' }]} />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Brain className="h-8 w-8 text-indigo-400" />
          <h1 className="text-3xl font-bold text-white">Comic Industry Intelligence Lab</h1>
        </div>
        <Link
          to="/ideas/mapping"
          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Network className="h-5 w-5" />
          <span>Market Analysis</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Tier Selection */}
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-6">Choose Your Market Intelligence Membership</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(Object.keys(tierInfo) as SubscriptionTier[]).map((tier) => {
            const info = tierInfo[tier];
            const isActive = currentTier === tier;
            
            return (
              <div
                key={tier}
                onClick={() => setTier(tier)}
                className={`relative bg-slate-700/50 rounded-xl p-6 border-2 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl
                  ${isActive 
                    ? 'border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
                    : 'border-slate-600/50 hover:border-indigo-400/50'}`}
              >
                {isActive && (
                  <div className="absolute -top-3 -right-3 bg-indigo-600 rounded-full p-2">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
                
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-3 rounded-full ${tier === 'premium' ? 'bg-orange-600' : info.color}`}>
                    {(() => {
                      const IconComponent = info.icon;
                      return <IconComponent className="h-6 w-6 text-white" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{info.name}</h3>
                    <p className="text-sm text-indigo-400">Membership Tier</p>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{info.description}</p>
                
                <div className="space-y-2">
                  {info.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {tier !== 'basic' && (
                  <div className="mt-4 pt-4 border-t border-slate-600/50">
                    <p className="text-xs text-gray-400">
                      Everything in {tier === 'standard' ? 'Basic' : 'Standard'} tier, plus:
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Currently using: <span className="text-indigo-400 font-medium capitalize">{currentTier}</span> membership
          </p>
        </div>
      </div>

      {/* Feature comparison table */}
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-6">Feature Comparison</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700/50">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Feature</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-400">Basic</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-400">Standard</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-400">Premium</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {[
                { name: 'Max Clusters', basic: '7', standard: '25', premium: '100' },
                { name: 'Sentiment Analysis', basic: false, standard: true, premium: true },
                { name: 'Real-time Clustering', basic: false, standard: false, premium: true },
                { name: 'Custom Cluster Merging', basic: false, standard: true, premium: true },
                { name: 'Advanced Visualizations', basic: false, standard: false, premium: true },
                { name: 'Cross-project Analysis', basic: false, standard: false, premium: true },
                { name: 'Priority Processing', basic: false, standard: false, premium: true },
                { name: 'Export Capabilities', basic: false, standard: true, premium: true },
                { name: 'API Access', basic: false, standard: false, premium: true }
              ].map((row, index) => (
                <tr key={index} className="hover:bg-slate-700/30">
                  <td className="px-4 py-3 text-sm text-white">{row.name}</td>
                  <td className="px-4 py-3 text-center">
                    {typeof row.basic === 'boolean' ? (
                      row.basic ? (
                        <Check className="h-4 w-4 text-green-400 mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-gray-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-300">{row.basic}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {typeof row.standard === 'boolean' ? (
                      row.standard ? (
                        <Check className="h-4 w-4 text-green-400 mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-gray-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-300">{row.standard}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {typeof row.premium === 'boolean' ? (
                      row.premium ? (
                        <Check className="h-4 w-4 text-green-400 mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-gray-500 mx-auto" />
                      )
                    ) : (
                      <span className="text-gray-300">{row.premium}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Clustering Component */}
      <IdeaClustering />

      {/* AI News Analysis by Tier */}
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <div className="flex items-center space-x-3 mb-6">
          <Brain className="h-6 w-6 text-orange-300" />
          <h2 className="text-xl font-bold text-white">AI News Intelligence</h2>
          <div className={`px-3 py-1 rounded-full text-white text-sm ${tierInfo[currentTier].color}`}>
            {tierInfo[currentTier].name}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* News Analysis */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Market Impact Analysis</h3>
            
            {news?.slice(0, 3).map((article, index) => (
              <div key={article.id} className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-white text-sm">{article.title}</h4>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    article.impact === 'positive' ? 'bg-green-900/50 text-green-200' :
                    article.impact === 'negative' ? 'bg-red-900/50 text-red-200' :
                    'bg-yellow-900/50 text-yellow-200'
                  }`}>
                    {article.impact}
                  </div>
                </div>
                
                {/* Tier-specific analysis */}
                {currentTier === 'basic' && (
                  <div className="bg-blue-900/20 p-3 rounded border border-blue-700/30">
                    <p className="text-blue-200 text-sm">
                      <strong>Basic Analysis:</strong> News categorized as {article.impact} impact on market sentiment.
                    </p>
                  </div>
                )}
                
                {currentTier === 'standard' && (
                  <div className="bg-yellow-900/20 p-3 rounded border border-yellow-700/30">
                    <p className="text-yellow-200 text-sm">
                      <strong>Advanced Analysis:</strong> {article.impact === 'positive' ? 'Bullish sentiment detected' : article.impact === 'negative' ? 'Bearish sentiment detected' : 'Neutral sentiment'} with {Math.floor(Math.random() * 20 + 70)}% confidence.
                      {article.relatedSecurity && ` Expected impact on ${article.relatedSecurity.name}: ${article.impact === 'positive' ? '+2-4%' : article.impact === 'negative' ? '-1-3%' : '±1%'}.`}
                    </p>
                  </div>
                )}
                
                {currentTier === 'premium' && (
                  <div className="bg-purple-900/20 p-3 rounded border border-purple-700/30">
                    <p className="text-purple-200 text-sm mb-2">
                      <strong>Strategic Intelligence:</strong> {article.impact === 'positive' ? 'Strong buy signal' : article.impact === 'negative' ? 'Caution signal' : 'Hold signal'} detected with {Math.floor(Math.random() * 15 + 85)}% AI confidence.
                    </p>
                    <div className="space-y-1">
                      <p className="text-xs text-purple-300">
                        • Cross-correlation analysis: {article.relatedSecurity ? `${article.relatedSecurity.name} +${Math.random() * 3 + 2}%` : 'Multiple asset impact detected'}
                      </p>
                      <p className="text-xs text-purple-300">
                        • Optimal trade window: {article.impact === 'positive' ? 'Next 2-4 hours' : 'Monitor for 24-48 hours'}
                      </p>
                      <p className="text-xs text-purple-300">
                        • Risk level: {article.impact === 'negative' ? 'Elevated' : 'Moderate'} | Volatility: {Math.floor(Math.random() * 10 + 15)}%
                      </p>
                    </div>
                  </div>
                )}
                
                {article.relatedSecurity && (
                  <div className="mt-2">
                    <Link 
                      to={`/${article.relatedSecurity.type}/${article.relatedSecurity.symbol}`}
                      className="text-indigo-400 hover:text-indigo-300 text-xs"
                    >
                      Trade {article.relatedSecurity.name} →
                    </Link>
                  </div>
                )}
              </div>
            )) || (
              <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50 text-center">
                <p className="text-gray-400">Loading news analysis...</p>
              </div>
            )}
          </div>
          
          {/* Tier Benefits for News */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Your News Intelligence Level</h3>
            
            <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`p-2 rounded-full ${tierInfo[currentTier].color}`}>
                  {(() => {
                    const IconComponent = tierInfo[currentTier].icon;
                    return <IconComponent className="h-5 w-5 text-white" />;
                  })()}
                </div>
                <h4 className="font-medium text-white">{tierInfo[currentTier].name}</h4>
              </div>
              
              <div className="space-y-2">
                {currentTier === 'basic' && (
                  <>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-gray-300">Basic news categorization</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-gray-300">Simple impact classification</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <X className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">Sentiment confidence scores</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <X className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">Trading recommendations</span>
                    </div>
                  </>
                )}
                
                {currentTier === 'standard' && (
                  <>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-gray-300">Advanced sentiment analysis</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-gray-300">Price impact predictions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-gray-300">Confidence scoring</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <X className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-500">Real-time trading signals</span>
                    </div>
                  </>
                )}
                
                {currentTier === 'premium' && (
                  <>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-gray-300">Strategic intelligence analysis</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-gray-300">Cross-correlation insights</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-gray-300">Optimal trading windows</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-gray-300">Real-time risk assessments</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Upgrade prompt */}
            {currentTier !== 'premium' && (
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-lg">
                <p className="text-white text-sm mb-3">
                  Upgrade your membership for enhanced market intelligence capabilities.
                </p>
                <button
                  onClick={() => setTier(currentTier === 'basic' ? 'standard' : 'premium')}
                  className="bg-white text-indigo-600 hover:bg-gray-100 px-4 py-2 rounded text-sm font-medium transition-colors"
                >
                  Upgrade Membership
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comic Market Index */}
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-6">Comic Market Index (CMI)</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={comicMarketIndexData}>
                  <defs>
                    <linearGradient id="colorCMI" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="time" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" domain={['dataMin - 50', 'dataMax + 50']} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: '#e2e8f0'
                    }}
                    formatter={(value: number) => [value.toLocaleString(), 'CMI']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorCMI)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
              <p className="text-sm text-gray-400">Current Index</p>
              <p className="text-2xl font-bold text-white">14,400</p>
              <p className="text-green-400 text-sm">+250 (+1.77%)</p>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
              <p className="text-sm text-gray-400">Today's Range</p>
              <p className="text-white">14,150 - 14,400</p>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
              <p className="text-sm text-gray-400">52-Week High</p>
              <p className="text-white">15,250</p>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
              <p className="text-sm text-gray-400">52-Week Low</p>
              <p className="text-white">12,800</p>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Breakdown and Market Movers */}
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-6">Portfolio & Market Movers</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Portfolio Breakdown Pie Chart */}
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
            <h3 className="text-lg font-semibold text-white mb-4">Portfolio Breakdown</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioBreakdownData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {portfolioBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, 'Allocation']}
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: '#e2e8f0'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Top Gainers */}
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
            <h3 className="text-lg font-semibold text-white mb-4">Top Gainers</h3>
            <div className="space-y-3">
              {topGainersData.map((stock, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-600/50">
                  <div>
                    <p className="text-white font-medium">{stock.symbol}</p>
                    <p className="text-xs text-gray-400">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold">+{stock.change}%</p>
                    <p className="text-sm text-gray-300">CC {stock.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Market Laggards */}
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
            <h3 className="text-lg font-semibold text-white mb-4">Market Laggards</h3>
            <div className="space-y-3">
              {marketLaggardsData.map((stock, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-600/50">
                  <div>
                    <p className="text-white font-medium">{stock.symbol}</p>
                    <p className="text-xs text-gray-400">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-red-400 font-bold">{stock.change}%</p>
                    <p className="text-sm text-gray-300">CC {stock.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Market Intelligence Charts */}
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-6">Market Intelligence Dashboard</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Market Trend Chart */}
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
            <h3 className="text-lg font-semibold text-white mb-4">6-Month Market Performance</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: '#e2e8f0'
                    }}
                  />
                  <Line type="monotone" dataKey="heroes" stroke="#22c55e" strokeWidth={2} name="Heroes" />
                  <Line type="monotone" dataKey="villains" stroke="#ef4444" strokeWidth={2} name="Villains" />
                  <Line type="monotone" dataKey="creators" stroke="#3b82f6" strokeWidth={2} name="Creators" />
                  <Line type="monotone" dataKey="publishers" stroke="#8b5cf6" strokeWidth={2} name="Publishers" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Market Sentiment Pie Chart */}
          <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
            <h3 className="text-lg font-semibold text-white mb-4">Current Market Sentiment</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name} ${value}%`}
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, 'Sentiment']}
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: '#e2e8f0'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Trading Volume Chart */}
        <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
          <h3 className="text-lg font-semibold text-white mb-4">Trading Volume by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="category" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                <Tooltip
                  formatter={(value: number) => [`${(value / 1000000).toFixed(1)}M`, 'Volume (CC)']}
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#e2e8f0'
                  }}
                />
                <Bar dataKey="volume" fill="#818cf8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {volumeData.map((item, index) => (
              <div key={index} className="bg-slate-800/50 p-3 rounded-lg border border-slate-600/50">
                <p className="text-sm text-gray-400">{item.category}</p>
                <p className="text-lg font-bold text-white">CC {(item.volume / 1000000).toFixed(1)}M</p>
                <p className={`text-sm ${item.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {item.growth > 0 ? '+' : ''}{item.growth}% growth
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Upgrade CTA */}
      {currentTier !== 'premium' && (
        <div className="bg-gradient-to-r from-orange-600 to-indigo-600 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Ready to upgrade your membership?
              </h2>
              <p className="text-white/90 mb-4">
                Unlock advanced market intelligence capabilities with a higher membership tier.
              </p>
              <button
                onClick={() => setTier(currentTier === 'basic' ? 'standard' : 'premium')}
                className="bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Upgrade Membership</span>
                </div>
              </button>
            </div>
            <div className="hidden md:block">
              <Brain className="h-24 w-24 text-white/20" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IdeasPage;