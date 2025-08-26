import React, { useState } from 'react';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { OrderEntry } from '../../components/OrderEntry';
import { TrendingUp, TrendingDown, Info, AlertTriangle, BarChart2 } from 'lucide-react';

export function TradingPage() {
  const [selectedSymbol, setSelectedSymbol] = useState<string | undefined>();

  return (
    <div className="space-y-6">
      <Breadcrumbs overrides={[
        { name: 'Trading', path: '/trading' }
      ]} />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BarChart2 className="h-8 w-8 text-emerald-400" />
          <h1 className="text-3xl font-bold text-white">Trading Center</h1>
        </div>
      </div>
      
      <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
        <div className="flex items-start space-x-4 mb-6">
          <Info className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
          <p className="text-gray-300">
            Use this unified trading interface to buy and sell assets in the Panel Profits universe. 
            Switch between buy and sell modes using the toggle buttons, then enter your trade details.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Trading Interface */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Place Order</h2>
            <OrderEntry 
              symbol={selectedSymbol} 
              onSymbolChange={setSelectedSymbol} 
            />
          </div>
          
          {/* Market Information */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Trading Tips</h2>
              
              <div className="space-y-4">
                <div className="bg-green-900/30 p-4 rounded-lg border border-green-700/30">
                  <div className="flex items-start space-x-3">
                    <TrendingUp className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white mb-2">Buy Orders</h3>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li>• Use market orders for immediate execution at current prices</li>
                        <li>• Use limit orders during volatility to control your entry price</li>
                        <li>• Ensure sufficient balance before placing orders</li>
                        <li>• Consider dollar-cost averaging for large positions</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-red-900/30 p-4 rounded-lg border border-red-700/30">
                  <div className="flex items-start space-x-3">
                    <TrendingDown className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-white mb-2">Sell Orders</h3>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li>• You can only sell assets you currently own</li>
                        <li>• Consider tax implications when realizing gains</li>
                        <li>• Use stop-loss orders to limit downside risk</li>
                        <li>• Take profits gradually in volatile markets</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
              <h3 className="font-medium text-white mb-3">Current Market Conditions</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Market Status:</span>
                  <span className="text-green-400 font-medium">Open & Active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Overall Sentiment:</span>
                  <span className="text-green-400 font-medium">Bullish</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Volatility:</span>
                  <span className="text-yellow-400 font-medium">Moderate</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Volume:</span>
                  <span className="text-white font-medium">Above Average</span>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-700/30">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-white mb-2">Important Reminders</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• All trades incur a 0.1% transaction fee</li>
                    <li>• Market orders execute immediately but prices may vary</li>
                    <li>• Limit orders only execute at your specified price or better</li>
                    <li>• Monitor your positions regularly and set appropriate stop-losses</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TradingPage;