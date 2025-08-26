import React from 'react';
import { TrendingUp, Shield, BarChart2, Star, AlertTriangle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { QuickTradeModal } from '../trading/QuickTradeModal';

interface RecommendationsCardsProps {
  className?: string;
}

export function RecommendationsCards({ className = '' }: RecommendationsCardsProps) {
  const [isTradeModalOpen, setIsTradeModalOpen] = React.useState(false);
  const [isDiversificationModalOpen, setIsDiversificationModalOpen] = React.useState(false);
  const [isRiskModalOpen, setIsRiskModalOpen] = React.useState(false);

  return (
    <>
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}>
      {/* Top Buy Recommendation */}
      <div className="bg-green-900/20 rounded-xl p-5 border border-green-700/30 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all hover:-translate-y-1">
        <div className="flex items-center space-x-2 mb-3">
          <TrendingUp className="h-5 w-5 text-green-400" />
          <h3 className="font-semibold text-white">Top Buy Recommendation</h3>
        </div>
        
        <div className="flex items-center space-x-3 mb-3">
          <div className="bg-slate-800/70 rounded-full p-2">
            <Star className="h-6 w-6 text-yellow-400" />
          </div>
          <div>
            <h4 className="font-medium text-white">Amazing Spider-Man #300</h4>
            <p className="text-sm text-gray-300">ASM300 • Character</p>
          </div>
        </div>
        
        <p className="text-sm text-gray-300 mb-3">
          Strong buy signal based on upcoming Venom movie announcements and increasing collector interest.
        </p>
        
        <div className="flex justify-between items-center text-sm mb-3">
          <span className="text-gray-400">Current Price:</span>
          <span className="text-white">CC 2,500</span>
        </div>
        
        <div className="flex justify-between items-center text-sm mb-4">
          <span className="text-gray-400">Target Price:</span>
          <span className="text-green-400">CC 3,200</span>
        </div>
        
        <button
          onClick={() => setIsTradeModalOpen(true)}
          className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-lg transition-colors"
        >
          Trade Now
        </button>
      </div>
      
      {/* Diversification Tip */}
      <div className="bg-indigo-900/20 rounded-xl p-5 border border-indigo-700/30 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all hover:-translate-y-1">
        <div className="flex items-center space-x-2 mb-3">
          <BarChart2 className="h-5 w-5 text-indigo-400" />
          <h3 className="font-semibold text-white">Diversification Tip</h3>
        </div>
        
        <div className="flex items-center space-x-3 mb-3">
          <div className="bg-slate-800/70 rounded-full p-2">
            <BarChart2 className="h-6 w-6 text-indigo-400" />
          </div>
          <div>
            <h4 className="font-medium text-white">Golden Age Comics</h4>
            <p className="text-sm text-gray-300">Portfolio Allocation</p>
          </div>
        </div>
        
        <p className="text-sm text-gray-300 mb-3">
          Your portfolio is underweight in Golden Age comics. Consider adding exposure to this stable, historically significant segment.
        </p>
        
        <div className="flex justify-between items-center text-sm mb-3">
          <span className="text-gray-400">Current Allocation:</span>
          <span className="text-white">5%</span>
        </div>
        
        <div className="flex justify-between items-center text-sm mb-4">
          <span className="text-gray-400">Recommended:</span>
          <span className="text-indigo-400">15-20%</span>
        </div>
        
        <button
          onClick={() => setIsDiversificationModalOpen(true)}
          className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center py-2 rounded-lg transition-colors"
        >
          Explore Golden Age Funds
        </button>
      </div>
      
      {/* Risk Alert */}
      <div className="bg-yellow-900/20 rounded-xl p-5 border border-yellow-700/30 hover:shadow-[0_0_15px_rgba(234,179,8,0.3)] transition-all hover:-translate-y-1">
        <div className="flex items-center space-x-2 mb-3">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
          <h3 className="font-semibold text-white">Risk Alert</h3>
        </div>
        
        <div className="flex items-center space-x-3 mb-3">
          <div className="bg-slate-800/70 rounded-full p-2">
            <Shield className="h-6 w-6 text-yellow-400" />
          </div>
          <div>
            <h4 className="font-medium text-white">Options Exposure</h4>
            <p className="text-sm text-gray-300">Portfolio Risk</p>
          </div>
        </div>
        
        <p className="text-sm text-gray-300 mb-3">
          Your options positions represent 25% of your portfolio, exceeding the recommended maximum of 15% for your risk profile.
        </p>
        
        <div className="flex justify-between items-center text-sm mb-3">
          <span className="text-gray-400">Current Exposure:</span>
          <span className="text-yellow-400">25%</span>
        </div>
        
        <div className="flex justify-between items-center text-sm mb-4">
          <span className="text-gray-400">Recommended Max:</span>
          <span className="text-white">15%</span>
        </div>
        
        <button
          onClick={() => setIsRiskModalOpen(true)}
          className="block w-full bg-yellow-600 hover:bg-yellow-700 text-white text-center py-2 rounded-lg transition-colors"
        >
          Review Risk Profile
        </button>
      </div>
      </div>

      {/* Trade Modal for Top Buy Recommendation */}
      <QuickTradeModal
        isOpen={isTradeModalOpen}
        onClose={() => setIsTradeModalOpen(false)}
        symbol="ASM300"
        currentPrice={2500}
        assetName="Amazing Spider-Man #300"
        assetType="character"
      />

      {/* Diversification Modal */}
      {isDiversificationModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800/95 rounded-xl shadow-2xl border border-slate-700/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
              <div className="flex items-center space-x-3">
                <BarChart2 className="h-6 w-6 text-indigo-400" />
                <h2 className="text-xl font-bold text-white">Portfolio Diversification Recommendations</h2>
              </div>
              <button 
                onClick={() => setIsDiversificationModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-700/50"
              >
                <span className="text-xl">×</span>
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                  <h3 className="font-medium text-white mb-3">Current Portfolio Analysis</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Golden Age Allocation</p>
                      <p className="text-lg font-bold text-yellow-400">5%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Recommended Allocation</p>
                      <p className="text-lg font-bold text-indigo-400">15-20%</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-700/30">
                  <h3 className="font-medium text-white mb-3">Recommended Golden Age Funds</h3>
                  <div className="space-y-3">
                    <Link
                      to="/fund/GAPF"
                      className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      <div>
                        <p className="text-white font-medium">Golden Age Preservation Fund</p>
                        <p className="text-sm text-gray-400">GAPF • Conservative approach</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white">CC 45.20</p>
                        <p className="text-green-400 text-sm">+2.03%</p>
                      </div>
                    </Link>
                    
                    <Link
                      to="/bond/GACB"
                      className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      <div>
                        <p className="text-white font-medium">Golden Age Comics Index Bond</p>
                        <p className="text-sm text-gray-400">GACB • 5.2% yield</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white">CC 1,065.25</p>
                        <p className="text-green-400 text-sm">+1.26%</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-700/50 flex justify-end">
              <button
                onClick={() => setIsDiversificationModalOpen(false)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors mr-3"
              >
                Close
              </button>
              <Link
                to="/portfolio"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                onClick={() => setIsDiversificationModalOpen(false)}
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Risk Alert Modal */}
      {isRiskModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800/95 rounded-xl shadow-2xl border border-slate-700/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 text-yellow-400" />
                <h2 className="text-xl font-bold text-white">Portfolio Risk Analysis</h2>
              </div>
              <button 
                onClick={() => setIsRiskModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-slate-700/50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="bg-yellow-900/30 p-4 rounded-lg border border-yellow-700/30">
                  <div className="flex items-center space-x-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    <h3 className="font-medium text-white">High Options Exposure Detected</h3>
                  </div>
                  <p className="text-yellow-200 text-sm mb-3">
                    Your current options positions represent 25% of your total portfolio value, which exceeds the recommended maximum of 15% for your risk profile.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Current Options Exposure</p>
                      <p className="text-lg font-bold text-yellow-400">25%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Recommended Maximum</p>
                      <p className="text-lg font-bold text-white">15%</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                  <h3 className="font-medium text-white mb-3">Recommended Actions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Close Short-Term Options</p>
                        <p className="text-xs text-gray-400">Reduce exposure by 10%</p>
                      </div>
                      <Link 
                        to="/portfolio"
                        className="text-indigo-400 hover:text-indigo-300 text-sm"
                      >
                        Review
                      </Link>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Add Defensive Assets</p>
                        <p className="text-xs text-gray-400">Consider bonds or stable funds</p>
                      </div>
                      <Link 
                        to="/bonds"
                        className="text-indigo-400 hover:text-indigo-300 text-sm"
                      >
                        Explore
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-700/30">
                  <h3 className="font-medium text-white mb-2">Risk Management Tips</h3>
                  <ul className="space-y-1 text-indigo-200 text-sm">
                    <li>• Never allocate more than 20% to high-risk instruments</li>
                    <li>• Consider setting stop-losses on options positions</li>
                    <li>• Diversify across different expiration dates</li>
                    <li>• Monitor Greeks daily for options positions</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-700/50 flex justify-end">
              <button
                onClick={() => setIsRiskModalOpen(false)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors mr-3"
              >
                Close
              </button>
              <Link
                to="/portfolio"
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
                onClick={() => setIsRiskModalOpen(false)}
              >
                Manage Portfolio
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RecommendationsCards;