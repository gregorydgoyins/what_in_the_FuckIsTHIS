import React from 'react';
import { Brain, Crown, Star, Lightbulb, Zap, Check, X, Network, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { IdeaClustering } from '../components/IdeaClustering';
import { useSubscriptionStore } from '../store/subscriptionStore';
import { SubscriptionTier } from '../types';

export function IdeasPage() {
  const { currentTier, setTier, features } = useSubscriptionStore();

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
  const tierInfo = {
    basic: {
      name: 'Market Observer',
      price: '$5-15/month',
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
      price: '$20-45/month',
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
      price: '$50-150/month',
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
        <h2 className="text-xl font-bold text-white mb-6">Choose Your Market Intelligence Tier</h2>
        
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
                    <info.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{info.name}</h3>
                    <p className="text-sm text-indigo-400">{info.price}</p>
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
            Currently using: <span className="text-indigo-400 font-medium capitalize">{currentTier}</span> tier
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
                Ready to unlock advanced market intelligence?
              </h2>
              <p className="text-white/90 mb-4">
                {currentTier === 'basic' 
                  ? 'Upgrade to Market Analyst for publisher sentiment analysis and custom market reports.'
                  : 'Upgrade to Strategic Intelligence for real-time market analysis and advanced visualizations.'}
              </p>
              <button
                onClick={() => setTier(currentTier === 'basic' ? 'standard' : 'premium')}
                className="bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Upgrade Now</span>
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