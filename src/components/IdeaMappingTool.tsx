import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Network, RotateCcw, ZoomIn, ZoomOut, Maximize, 
  Lightbulb, ArrowRight
} from 'lucide-react';
import { IdeaNodeRenderer } from './ideaMapping/IdeaNodeRenderer';
import { IdeaRelationshipRenderer } from './ideaMapping/IdeaRelationshipRenderer';
import { IdeaMappingToolbar } from './ideaMapping/IdeaMappingToolbar';
import { IdeaMappingModals } from './ideaMapping/IdeaMappingModals';
import { ideaMappingService } from '../services/ideaMappingService';
import { IdeaNode, IdeaRelationship, RelationshipType, RelationshipStrength, RelationshipDirection } from '../types';

interface IdeaMappingToolProps {
  className?: string;
}

interface NodePosition {
  x: number;
  y: number;
}

interface ViewportState {
  zoom: number;
  pan: { x: number; y: number };
}

export function IdeaMappingTool({ className = '' }: IdeaMappingToolProps) {
  // Core state
  const [nodes, setNodes] = useState<IdeaNode[]>([]);
  const [relationships, setRelationships] = useState<IdeaRelationship[]>([]);
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());
  const [selectedRelationship, setSelectedRelationship] = useState<string | null>(null);
  
  // UI state
  const [viewMode, setViewMode] = useState<'graph' | 'mindmap'>('graph');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterRelationType, setFilterRelationType] = useState<RelationshipType | 'all'>('all');
  
  // Modal states
  const [isCreateNodeModalOpen, setIsCreateNodeModalOpen] = useState(false);
  const [isCreateRelationshipModalOpen, setIsCreateRelationshipModalOpen] = useState(false);
  const [isEditNodeModalOpen, setIsEditNodeModalOpen] = useState(false);
  const [editingNode, setEditingNode] = useState<IdeaNode | null>(null);
  
  // Viewport state
  const [viewport, setViewport] = useState<ViewportState>({ zoom: 1, pan: { x: 0, y: 0 } });
  const [isDragging, setIsDragging] = useState(false);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  
  // Form state
  const [newNodeForm, setNewNodeForm] = useState({
    label: '',
    description: '',
    category: 'general',
    tags: ''
  });
  
  const [newRelationshipForm, setNewRelationshipForm] = useState({
    sourceId: '',
    targetId: '',
    type: 'related-to' as RelationshipType,
    strength: 'moderate' as RelationshipStrength,
    direction: 'unidirectional' as RelationshipDirection,
    description: ''
  });

  // Refs
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const network = ideaMappingService.getNetwork();
    setNodes(network.nodes);
    setRelationships(network.relationships);
  };

  // Node management
  const handleCreateNode = () => {
    try {
      const newNode = ideaMappingService.createNode({
        label: newNodeForm.label,
        description: newNodeForm.description,
        category: newNodeForm.category,
        tags: newNodeForm.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        position: { 
          x: Math.random() * 400 + 100, 
          y: Math.random() * 300 + 100 
        }
      });
      
      setNodes(prev => [...prev, newNode]);
      setNewNodeForm({ label: '', description: '', category: 'general', tags: '' });
      setIsCreateNodeModalOpen(false);
    } catch (error) {
      console.error('Failed to create node:', error);
    }
  };

  const handleUpdateNode = () => {
    if (!editingNode) return;
    
    try {
      const updatedNode = ideaMappingService.updateNode(editingNode.id, {
        label: newNodeForm.label,
        description: newNodeForm.description,
        category: newNodeForm.category,
        tags: newNodeForm.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      });
      
      if (updatedNode) {
        setNodes(prev => prev.map(node => node.id === updatedNode.id ? updatedNode : node));
        setIsEditNodeModalOpen(false);
        setEditingNode(null);
      }
    } catch (error) {
      console.error('Failed to update node:', error);
    }
  };

  const handleDeleteNode = (nodeId: string) => {
    if (ideaMappingService.deleteNode(nodeId)) {
      setNodes(prev => prev.filter(node => node.id !== nodeId));
      setRelationships(prev => prev.filter(rel => rel.sourceId !== nodeId && rel.targetId !== nodeId));
      setSelectedNodes(prev => {
        const newSet = new Set(prev);
        newSet.delete(nodeId);
        return newSet;
      });
    }
  };

  // Relationship management
  const handleCreateRelationship = () => {
    if (!newRelationshipForm.sourceId || !newRelationshipForm.targetId) return;
    
    try {
      const newRelationship = ideaMappingService.createRelationship({
        sourceId: newRelationshipForm.sourceId,
        targetId: newRelationshipForm.targetId,
        type: newRelationshipForm.type,
        strength: newRelationshipForm.strength,
        direction: newRelationshipForm.direction,
        description: newRelationshipForm.description
      });
      
      setRelationships(prev => [...prev, newRelationship]);
      setNewRelationshipForm({
        sourceId: '',
        targetId: '',
        type: 'related-to',
        strength: 'moderate',
        direction: 'unidirectional',
        description: ''
      });
      setIsCreateRelationshipModalOpen(false);
    } catch (error) {
      console.error('Failed to create relationship:', error);
    }
  };

  const handleDeleteRelationship = (relationshipId: string) => {
    if (ideaMappingService.deleteRelationship(relationshipId)) {
      setRelationships(prev => prev.filter(rel => rel.id !== relationshipId));
      setSelectedRelationship(null);
    }
  };

  // Event handlers
  const handleNodeClick = (nodeId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (event.ctrlKey || event.metaKey) {
      // Multi-select
      setSelectedNodes(prev => {
        const newSet = new Set(prev);
        if (newSet.has(nodeId)) {
          newSet.delete(nodeId);
        } else {
          newSet.add(nodeId);
        }
        return newSet;
      });
    } else {
      // Single select
      setSelectedNodes(new Set([nodeId]));
    }
  };

  const handleNodeDoubleClick = (node: IdeaNode) => {
    setEditingNode(node);
    setNewNodeForm({
      label: node.label,
      description: node.description,
  // Handlers for toolbar actions
  const handleShowAnalysis = () => setShowAnalysis(!showAnalysis);
  
  const handleExport = () => {
    const data = ideaMappingService.exportNetwork();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `idea-network-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleAutoLayout = () => {
    const updatedNodes = [...nodes];
    const iterations = 50;
    const repulsionStrength = 1000;
    const attractionStrength = 0.1;
    const damping = 0.9;

    for (let iter = 0; iter < iterations; iter++) {
      updatedNodes.forEach(node => {
        let fx = 0, fy = 0;

        // Repulsion from other nodes
        updatedNodes.forEach(otherNode => {
          if (node.id !== otherNode.id && node.position && otherNode.position) {
            const dx = node.position.x - otherNode.position.x;
            const dy = node.position.y - otherNode.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy) || 1;
            const force = repulsionStrength / (distance * distance);
            fx += (dx / distance) * force;
            fy += (dy / distance) * force;
          }
        });

        // Attraction from connected nodes
        relationships.forEach(rel => {
          if (rel.sourceId === node.id || rel.targetId === node.id) {
            const otherId = rel.sourceId === node.id ? rel.targetId : rel.sourceId;
            const otherNode = updatedNodes.find(n => n.id === otherId);
            if (otherNode && node.position && otherNode.position) {
              const dx = otherNode.position.x - node.position.x;
              const dy = otherNode.position.y - node.position.y;
              const distance = Math.sqrt(dx * dx + dy * dy) || 1;
              fx += dx * attractionStrength;
              fy += dy * attractionStrength;
            }
          }
        });

        // Apply forces with damping
        if (node.position) {
          node.position.x += fx * damping;
          node.position.y += fy * damping;
        }
      });
    }

    setNodes(updatedNodes);
    
    // Update positions in service
    updatedNodes.forEach(node => {
      ideaMappingService.updateNode(node.id, { position: node.position });
    });
  };

  const handleQuickConnect = () => {
    const selectedArray = Array.from(selectedNodes);
    if (selectedArray.length === 2) {
      setNewRelationshipForm(prev => ({
        ...prev,
        sourceId: selectedArray[0],
        targetId: selectedArray[1]
      }));
      setIsCreateRelationshipModalOpen(true);
    }
  };

  const handleNodeDoubleClick = (node: IdeaNode) => {
    setEditingNode(node);
    setNewNodeForm({
      label: node.label,
      description: node.description,
      category: node.category,
      tags: node.tags.join(', ')
    });
    setIsEditNodeModalOpen(true);
  };

  return (
    <div className={`bg-slate-800/90 backdrop-blur-md rounded-xl shadow-xl ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
        <div className="flex items-center space-x-3">
          <Network className="h-6 w-6 text-indigo-400" />
          <h2 className="text-2xl font-bold text-white">Idea Relationship Mapping</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* View mode toggle */}
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('graph')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'graph' ? 'bg-indigo-600 text-white' : 'bg-slate-700/50 text-gray-300'
              }`}
            >
              Graph
            </button>
            <button
              onClick={() => setViewMode('mindmap')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'mindmap' ? 'bg-indigo-600 text-white' : 'bg-slate-700/50 text-gray-300'
              }`}
            >
              Mind Map
            </button>
          </div>
          
          {/* Analysis toggle */}
          <button
            onClick={() => setShowAnalysis(!showAnalysis)}
            className="flex items-center space-x-2 px-3 py-2 bg-slate-700/50 rounded-lg text-gray-300 hover:text-white transition-colors"
          >
            {showAnalysis ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span className="text-sm">Analysis</span>
          </button>
          
          {/* Export button */}
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <IdeaMappingToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filterRelationType={filterRelationType}
        setFilterRelationType={setFilterRelationType}
        selectedNodesCount={selectedNodes.size}
        showAnalysis={showAnalysis}
        setShowAnalysis={handleShowAnalysis}
        onAddIdea={() => setIsCreateNodeModalOpen(true)}
        onQuickConnect={handleQuickConnect}
        onAutoLayout={handleAutoLayout}
        onExport={handleExport}
        categories={ideaMappingService.getCategories()}
        relationshipTypes={ideaMappingService.getRelationshipTypes()}
      />

      {/* Main content area */}
      <div className="flex h-[600px]">
        {/* Visualization area */}
        <div className="flex-1 relative" ref={containerRef}>
          <svg
            ref={svgRef}
            className="w-full h-full bg-slate-900/50"
            viewBox={`${-viewport.pan.x} ${-viewport.pan.y} ${800 / viewport.zoom} ${600 / viewport.zoom}`}
            onClick={() => {
              setSelectedNodes(new Set());
              setSelectedRelationship(null);
            }}
          >
            {/* Grid pattern */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Relationships */}
            {filteredRelationships.map(relationship => {
              const sourceNode = filteredNodes.find(n => n.id === relationship.sourceId);
              const targetNode = filteredNodes.find(n => n.id === relationship.targetId);
              
              if (!sourceNode || !targetNode || !sourceNode.position || !targetNode.position) {
                return null;
              }
              
              return (
                <IdeaRelationshipRenderer
                  key={relationship.id}
                  relationship={relationship}
                  sourceNode={sourceNode}
                  targetNode={targetNode}
                  onClick={handleRelationshipClick}
                  getRelationshipStyle={getRelationshipStyle}
                  getStrokeWidth={getStrokeWidth}
                />
              );
            })}
            
            {/* Nodes */}
            {filteredNodes.map(node => {
              const isSelected = selectedNodes.has(node.id);
              
              return (
                <IdeaNodeRenderer
                  key={node.id}
                  node={node}
                  isSelected={isSelected}
                  onClick={handleNodeClick}
                  onDoubleClick={handleNodeDoubleClick}
                  getCategoryColor={getCategoryColor}
                />
              );
            })}
          </svg>
          
          {/* Zoom controls */}
          <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
            <button
              onClick={() => setViewport(prev => ({ ...prev, zoom: Math.min(prev.zoom * 1.2, 3) }))}
              className="p-2 bg-slate-700/90 rounded-lg text-white hover:bg-slate-600 transition-colors"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewport(prev => ({ ...prev, zoom: Math.max(prev.zoom / 1.2, 0.3) }))}
              className="p-2 bg-slate-700/90 rounded-lg text-white hover:bg-slate-600 transition-colors"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewport({ zoom: 1, pan: { x: 0, y: 0 } })}
              className="p-2 bg-slate-700/90 rounded-lg text-white hover:bg-slate-600 transition-colors"
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Analysis panel */}
        {showAnalysis && (
          <div className="w-80 border-l border-slate-700/50 p-4 bg-slate-800/50">
            <h3 className="text-lg font-semibold text-white mb-4">Network Analysis</h3>
            
            <div className="space-y-4">
              <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50">
                <p className="text-sm text-gray-400">Total Ideas</p>
                <p className="text-xl font-bold text-white">{filteredNodes.length}</p>
              </div>
              
              <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50">
                <p className="text-sm text-gray-400">Relationships</p>
                <p className="text-xl font-bold text-white">{filteredRelationships.length}</p>
              </div>
              
              <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50">
                <p className="text-sm text-gray-400">Avg. Connections</p>
                <p className="text-xl font-bold text-white">
                  {filteredNodes.length > 0 ? (filteredRelationships.length * 2 / filteredNodes.length).toFixed(1) : '0'}
                </p>
              </div>
              
              {/* Most connected nodes */}
              <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600/50">
                <h4 className="font-medium text-white mb-2">Most Connected</h4>
                <div className="space-y-1">
                  {filteredNodes
                    .map(node => ({
                      node,
                      connections: filteredRelationships.filter(rel => 
                        rel.sourceId === node.id || rel.targetId === node.id
                      ).length
                    }))
                    .sort((a, b) => b.connections - a.connections)
                    .slice(0, 3)
                    .map(({ node, connections }) => (
                      <div key={node.id} className="flex justify-between text-sm">
                        <span className="text-gray-300 truncate">{node.label}</span>
                        <span className="text-indigo-400">{connections}</span>
                      </div>
                    ))}
                </div>
              </div>
              
              {/* Selected node info */}
              {selectedNodes.size === 1 && (
                <div className="bg-indigo-900/30 p-3 rounded-lg border border-indigo-700/30">
                  {(() => {
                    const nodeId = Array.from(selectedNodes)[0];
                    const node = nodes.find(n => n.id === nodeId);
                    if (!node) return null;
                    
                    return (
                      <div>
                        <h4 className="font-medium text-white mb-2">{node.label}</h4>
                        <p className="text-sm text-gray-300 mb-2">{node.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {node.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-slate-700/50 rounded text-xs text-gray-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between p-4 border-t border-slate-700/50 bg-slate-800/30">
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <span>{filteredNodes.length} ideas</span>
          <span>{filteredRelationships.length} relationships</span>
          {selectedNodes.size > 0 && (
            <span className="text-indigo-400">{selectedNodes.size} selected</span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => ideaMappingService.resetToMockData()}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <span className="text-xs text-gray-500">
            Zoom: {(viewport.zoom * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      {/* All Modals */}
      <IdeaMappingModals
        isCreateNodeModalOpen={isCreateNodeModalOpen}
        setIsCreateNodeModalOpen={setIsCreateNodeModalOpen}
        newNodeForm={newNodeForm}
        setNewNodeForm={setNewNodeForm}
        handleCreateNode={handleCreateNode}
        isCreateRelationshipModalOpen={isCreateRelationshipModalOpen}
        setIsCreateRelationshipModalOpen={setIsCreateRelationshipModalOpen}
        newRelationshipForm={newRelationshipForm}
        setNewRelationshipForm={setNewRelationshipForm}
        handleCreateRelationship={handleCreateRelationship}
        nodes={nodes}
        isEditNodeModalOpen={isEditNodeModalOpen}
        setIsEditNodeModalOpen={setIsEditNodeModalOpen}
        editingNode={editingNode}
        setEditingNode={setEditingNode}
        handleUpdateNode={handleUpdateNode}
        handleDeleteNode={handleDeleteNode}
      />

      {/* Tutorial overlay for first-time users */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-40">
          <div className="bg-slate-800 rounded-xl p-8 max-w-md text-center border border-slate-700/50">
            <Lightbulb className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-4">Welcome to Idea Mapping!</h3>
            <p className="text-gray-300 mb-6">
              Start by creating your first idea node, then connect related ideas to build your knowledge network.
            </p>
            <button
              onClick={() => setIsCreateNodeModalOpen(true)}
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors mx-auto"
            >
              <Plus className="h-5 w-5" />
              <span>Create Your First Idea</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default IdeaMappingTool;