import React, { useState, useEffect } from 'react';
import { 
  Network, Lock, Zap
} from 'lucide-react';
import { ClusteringHeader } from './ideaClustering/ClusteringHeader';
import { IdeaClusterCard } from './ideaClustering/IdeaClusterCard';
import { useSubscriptionStore } from '../store/subscriptionStore';
import { aiClusteringService } from '../services/aiClusteringService';
import { mockIdeas } from '../data/ideaData';
import { Idea, IdeaCluster, ClusteringResult, SubscriptionTier } from '../types';

interface IdeaClusteringProps {
  className?: string;
}

export function IdeaClustering({ className = '' }: IdeaClusteringProps) {
  const { currentTier, features } = useSubscriptionStore();
  const [clusteringResult, setClusteringResult] = useState<ClusteringResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'network'>('grid');
  const [showSentiment, setShowSentiment] = useState(false);

  // Run clustering when tier changes
  useEffect(() => {
    runClustering();
  }, [currentTier]);

  const handleRecluster = async () => {
    setIsLoading(true);
    try {
      const result = await aiClusteringService.clusterIdeas(mockIdeas, currentTier);
      setClusteringResult(result);
    } catch (error) {
      console.error('Clustering failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize clustering on mount
  const runClustering = async () => {
    await handleRecluster();
  };

  const handleExport = () => {
    if (!features.exportCapabilities) return;
    
    // Simulate export functionality
    const exportData = {
      clusters: clusteringResult?.clusters,
      timestamp: new Date().toISOString(),
      tier: currentTier
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `idea-clusters-${currentTier}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClusterClick = (clusterId: string) => {
    setSelectedCluster(selectedCluster === clusterId ? null : clusterId);
  };

  if (isLoading) {
    return (
      <div className={`bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl ${className}`}>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
          <p className="text-white text-lg">
            {features.priorityProcessing ? 'Priority processing...' : 'Analyzing ideas...'}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Using {currentTier} tier AI clustering
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with tier indicator */}
      <ClusteringHeader
        currentTier={currentTier}
        features={features}
        viewMode={viewMode}
        setViewMode={setViewMode}
        showSentiment={showSentiment}
        setShowSentiment={setShowSentiment}
        onExport={handleExport}
        onRecluster={handleRecluster}
      />

      {/* Clustering stats */}
      {clusteringResult && (
        <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50">
              <p className="text-sm text-gray-400">Total Ideas</p>
              <p className="text-xl font-bold text-white">{clusteringResult.totalIdeas}</p>
            </div>
            <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50">
              <p className="text-sm text-gray-400">Clusters Found</p>
              <p className="text-xl font-bold text-white">{clusteringResult.clusters.length}</p>
            </div>
            <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50">
              <p className="text-sm text-gray-400">Confidence</p>
              <p className="text-xl font-bold text-indigo-400">{(clusteringResult.confidence * 100).toFixed(0)}%</p>
            </div>
            <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50">
              <p className="text-sm text-gray-400">Processing Time</p>
              <p className="text-xl font-bold text-white">{(clusteringResult.processingTime / 1000).toFixed(1)}s</p>
            </div>
          </div>
        </div>
      )}
      {/* Feature limitations notice for lower tiers */}
      {currentTier !== 'premium' && (
        <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <Lock className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-white mb-1">Upgrade for Advanced Features</h3>
              <p className="text-sm text-gray-300 mb-2">
                {currentTier === 'basic' 
                  ? 'Unlock sentiment analysis, custom cluster merging, and up to 25 clusters with Standard tier.'
                  : 'Unlock real-time clustering, advanced visualizations, and cross-project analysis with Premium tier.'}
              </p>
              <div className="flex flex-wrap gap-2">
                {!features.sentimentAnalysis && (
                  <span className="px-2 py-1 bg-yellow-900/50 text-yellow-200 rounded text-xs">Sentiment Analysis</span>
                )}
                {!features.advancedVisualization && (
                  <span className="px-2 py-1 bg-yellow-900/50 text-yellow-200 rounded text-xs">Network View</span>
                )}
                {!features.crossProjectClustering && (
                  <span className="px-2 py-1 bg-yellow-900/50 text-yellow-200 rounded text-xs">Cross-Project Analysis</span>
                )}
                {!features.priorityProcessing && (
                  <span className="px-2 py-1 bg-yellow-900/50 text-yellow-200 rounded text-xs">Priority Processing</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clusters display */}
      {clusteringResult && (
        <div className="space-y-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clusteringResult.clusters.map((cluster) => (
                <IdeaClusterCard
                  key={cluster.id}
                      {cluster.keyTerms.slice(0, currentTier === 'premium' ? 8 : 3).map((term, index) => (
                        <span key={index} className="px-2 py-1 bg-indigo-900/50 text-indigo-200 rounded text-xs">
                          {term}
                        </span>
                      ))}
                      {cluster.keyTerms.length > (currentTier === 'premium' ? 8 : 3) && (
                        <span className="px-2 py-1 bg-slate-700/50 text-gray-400 rounded text-xs">
                          +{cluster.keyTerms.length - (currentTier === 'premium' ? 8 : 3)} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Ideas preview */}
                  <div className="space-y-2">
                    {cluster.ideas.slice(0, 3).map((idea) => (
                      <div key={idea.id} className="bg-slate-700/50 p-2 rounded border border-slate-600/50">
                        <p className="text-white text-sm font-medium">{idea.title}</p>
                        <p className="text-gray-400 text-xs line-clamp-1">{idea.content}</p>
                      </div>
                    ))}
                    {cluster.ideas.length > 3 && (
                      <p className="text-xs text-gray-400 text-center">
                        +{cluster.ideas.length - 3} more ideas
                      </p>
                    )}
                  </div>

                  {/* Cluster actions */}
                  {features.customClusterMerging && (
                    <div className="mt-4 flex space-x-2">
                      <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded text-xs transition-colors">
                        Merge
                      </button>
                      <button className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-1 px-3 rounded text-xs transition-colors">
                        Split
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            // Network view (premium only)
            <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
              <div className="h-96 flex items-center justify-center bg-slate-700/30 rounded-lg">
                <div className="text-center">
                  <Network className="h-16 w-16 text-indigo-400 mx-auto mb-4" />
                  <p className="text-white text-lg font-medium">Network Visualization</p>
                  <p className="text-gray-400 text-sm">
                    Interactive network graph showing idea relationships and cluster connections
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Premium suggestions */}
          {features.priorityProcessing && clusteringResult.suggestions && (
            <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="h-6 w-6 text-purple-400" />
                <h3 className="text-xl font-bold text-white">AI Insights & Recommendations</h3>
              </div>
              <div className="space-y-3">
                {clusteringResult.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-purple-900/20 p-3 rounded-lg border border-purple-700/30">
                    <Star className="h-4 w-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300 text-sm">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed cluster view */}
          {selectedCluster && (
            <div className="bg-slate-800/90 backdrop-blur-md rounded-xl p-6 shadow-xl">
              {(() => {
                const cluster = clusteringResult.clusters.find(c => c.id === selectedCluster);
                if (!cluster) return null;

                return (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{cluster.name}</h3>
                      <button
                        onClick={() => setSelectedCluster(null)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        ×
                      </button>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{cluster.description}</p>
                    
                    <div className="space-y-3">
                      {cluster.ideas.map((idea) => (
                        <div key={idea.id} className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-white">{idea.title}</h4>
                              <p className="text-gray-300 text-sm mt-1">{idea.content}</p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {idea.tags.map((tag, index) => (
                                  <span key={index} className="px-2 py-1 bg-slate-600/50 text-gray-300 rounded text-xs">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            {features.sentimentAnalysis && idea.sentiment && (
                              <div className="flex items-center space-x-1">
                                {getSentimentIcon(idea.sentiment)}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default IdeaClustering;