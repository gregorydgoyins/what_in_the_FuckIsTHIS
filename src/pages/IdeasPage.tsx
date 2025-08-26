import React from 'react';
import { Brain, Crown, Star, Lightbulb, Zap, Check, X, Network, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { IdeaClustering } from '../components/IdeaClustering';
import { useSubscriptionStore } from '../store/subscriptionStore';
import { SubscriptionTier } from '../types';

export function IdeasPage() {
  const { currentTier, setTier, features } = useSubscriptionStore();

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