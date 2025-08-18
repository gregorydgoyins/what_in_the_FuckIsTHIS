import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Network, Plus, Edit, Trash2, Search, Filter, Download, 
  Upload, RotateCcw, ZoomIn, ZoomOut, Maximize, Settings,
  Link as LinkIcon, Target, BarChart2, Info, Eye, EyeOff,
  Save, X, Check, AlertTriangle, Lightbulb, ArrowRight
} from 'lucide-react';
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

  // Node selection and interaction
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
      category: node.category,
      tags: node.tags.join(', ')
    });
    setIsEditNodeModalOpen(true);
  };

  // Filtering and search
  const filteredNodes = nodes.filter(node => {
    const matchesSearch = searchQuery === '' || 
      node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = filterCategory === 'all' || node.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const filteredRelationships = relationships.filter(rel => {
    const matchesType = filterRelationType === 'all' || rel.type === filterRelationType;
    const sourceVisible = filteredNodes.some(node => node.id === rel.sourceId);
    const targetVisible = filteredNodes.some(node => node.id === rel.targetId);
    
    return matchesType && sourceVisible && targetVisible;
  });

  // Visualization helpers
  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      technology: '#3B82F6',
      finance: '#10B981',
      security: '#F59E0B',
      general: '#6B7280',
      marketing: '#EC4899',
      analytics: '#8B5CF6'
    };
    return colors[category] || colors.general;
  };

  const getRelationshipStyle = (relationship: IdeaRelationship) => {
    const styles: Record<RelationshipType, { color: string; strokeDasharray?: string }> = {
      'depends-on': { color: '#EF4444' },
      'related-to': { color: '#6B7280' },
      'contradicts': { color: '#F59E0B', strokeDasharray: '5,5' },
      'sub-idea-of': { color: '#8B5CF6' },
      'influences': { color: '#10B981' },
      'blocks': { color: '#DC2626', strokeDasharray: '3,3' },
      'enables': { color: '#059669' },
      'custom': { color: '#6366F1' }
    };
    
    return styles[relationship.type] || styles['related-to'];
  };

  const getStrokeWidth = (strength: RelationshipStrength): number => {
    switch (strength) {
      case 'weak': return 1;
      case 'moderate': return 2;
      case 'strong': return 3;
      default: return 2;
    }
  };

  // Export functionality
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

  // Auto-layout algorithm (simplified force-directed layout)
  const applyAutoLayout = () => {
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

  // Quick connect selected nodes
  const quickConnectNodes = () => {
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
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ideas..."
              className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          {/* Category filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-700/50 text-white text-sm border-slate-600/50 rounded-lg px-3 py-2"
            >
              <option value="all">All Categories</option>
              {ideaMappingService.getCategories().map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          {/* Relationship type filter */}
          <select
            value={filterRelationType}
            onChange={(e) => setFilterRelationType(e.target.value as RelationshipType | 'all')}
            className="bg-slate-700/50 text-white text-sm border-slate-600/50 rounded-lg px-3 py-2"
          >
            <option value="all">All Relationships</option>
            {ideaMappingService.getRelationshipTypes().map(type => (
              <option key={type} value={type}>{type.replace('-', ' ')}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Action buttons */}
          <button
            onClick={() => setIsCreateNodeModalOpen(true)}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Idea</span>
          </button>
          
          {selectedNodes.size === 2 && (
            <button
              onClick={quickConnectNodes}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors"
            >
              <LinkIcon className="h-4 w-4" />
              <span>Connect</span>
            </button>
          )}
          
          <button
            onClick={applyAutoLayout}
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <Target className="h-4 w-4" />
            <span>Auto Layout</span>
          </button>
        </div>
      </div>

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
              
              const style = getRelationshipStyle(relationship);
              const strokeWidth = getStrokeWidth(relationship.strength);
              
              return (
                <g key={relationship.id}>
                  <line
                    x1={sourceNode.position.x}
                    y1={sourceNode.position.y}
                    x2={targetNode.position.x}
                    y2={targetNode.position.y}
                    stroke={style.color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={style.strokeDasharray}
                    className="cursor-pointer hover:opacity-80"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRelationship(relationship.id);
                    }}
                  />
                  
                  {/* Arrow for unidirectional relationships */}
                  {relationship.direction === 'unidirectional' && (
                    <polygon
                      points={`${targetNode.position.x - 5},${targetNode.position.y - 5} ${targetNode.position.x + 5},${targetNode.position.y} ${targetNode.position.x - 5},${targetNode.position.y + 5}`}
                      fill={style.color}
                    />
                  )}
                  
                  {/* Relationship label */}
                  <text
                    x={(sourceNode.position.x + targetNode.position.x) / 2}
                    y={(sourceNode.position.y + targetNode.position.y) / 2 - 10}
                    fill="#9CA3AF"
                    fontSize="10"
                    textAnchor="middle"
                    className="pointer-events-none"
                  >
                    {relationship.type.replace('-', ' ')}
                  </text>
                </g>
              );
            })}
            
            {/* Nodes */}
            {filteredNodes.map(node => {
              if (!node.position) return null;
              
              const isSelected = selectedNodes.has(node.id);
              const categoryColor = getCategoryColor(node.category);
              
              return (
                <g key={node.id}>
                  <circle
                    cx={node.position.x}
                    cy={node.position.y}
                    r="25"
                    fill={categoryColor}
                    stroke={isSelected ? '#FBBF24' : '#374151'}
                    strokeWidth={isSelected ? 3 : 1}
                    className="cursor-pointer hover:opacity-80"
                    onClick={(e) => handleNodeClick(node.id, e)}
                    onDoubleClick={() => handleNodeDoubleClick(node)}
                  />
                  <text
                    x={node.position.x}
                    y={node.position.y + 5}
                    fill="white"
                    fontSize="10"
                    textAnchor="middle"
                    className="pointer-events-none font-medium"
                  >
                    {node.label.length > 12 ? node.label.substring(0, 12) + '...' : node.label}
                  </text>
                </g>
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

      {/* Create Node Modal */}
      {isCreateNodeModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700/50 w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
              <h3 className="text-lg font-bold text-white">Create New Idea</h3>
              <button
                onClick={() => setIsCreateNodeModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Label</label>
                <input
                  type="text"
                  value={newNodeForm.label}
                  onChange={(e) => setNewNodeForm(prev => ({ ...prev, label: e.target.value }))}
                  className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white"
                  placeholder="Enter idea title..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                <textarea
                  value={newNodeForm.description}
                  onChange={(e) => setNewNodeForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white h-24"
                  placeholder="Describe your idea..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                <select
                  value={newNodeForm.category}
                  onChange={(e) => setNewNodeForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white"
                >
                  <option value="general">General</option>
                  <option value="technology">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="security">Security</option>
                  <option value="marketing">Marketing</option>
                  <option value="analytics">Analytics</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={newNodeForm.tags}
                  onChange={(e) => setNewNodeForm(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white"
                  placeholder="tag1, tag2, tag3..."
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t border-slate-700/50">
              <button
                onClick={() => setIsCreateNodeModalOpen(false)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNode}
                disabled={!newNodeForm.label.trim()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Idea
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Relationship Modal */}
      {isCreateRelationshipModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700/50 w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
              <h3 className="text-lg font-bold text-white">Create Relationship</h3>
              <button
                onClick={() => setIsCreateRelationshipModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">From</label>
                  <select
                    value={newRelationshipForm.sourceId}
                    onChange={(e) => setNewRelationshipForm(prev => ({ ...prev, sourceId: e.target.value }))}
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="">Select idea...</option>
                    {nodes.map(node => (
                      <option key={node.id} value={node.id}>{node.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">To</label>
                  <select
                    value={newRelationshipForm.targetId}
                    onChange={(e) => setNewRelationshipForm(prev => ({ ...prev, targetId: e.target.value }))}
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="">Select idea...</option>
                    {nodes.filter(node => node.id !== newRelationshipForm.sourceId).map(node => (
                      <option key={node.id} value={node.id}>{node.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Relationship Type</label>
                <select
                  value={newRelationshipForm.type}
                  onChange={(e) => setNewRelationshipForm(prev => ({ ...prev, type: e.target.value as RelationshipType }))}
                  className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white"
                >
                  <option value="depends-on">Depends On</option>
                  <option value="related-to">Related To</option>
                  <option value="contradicts">Contradicts</option>
                  <option value="sub-idea-of">Sub-idea Of</option>
                  <option value="influences">Influences</option>
                  <option value="blocks">Blocks</option>
                  <option value="enables">Enables</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Strength</label>
                  <select
                    value={newRelationshipForm.strength}
                    onChange={(e) => setNewRelationshipForm(prev => ({ ...prev, strength: e.target.value as RelationshipStrength }))}
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="weak">Weak</option>
                    <option value="moderate">Moderate</option>
                    <option value="strong">Strong</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Direction</label>
                  <select
                    value={newRelationshipForm.direction}
                    onChange={(e) => setNewRelationshipForm(prev => ({ ...prev, direction: e.target.value as RelationshipDirection }))}
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="unidirectional">One-way</option>
                    <option value="bidirectional">Two-way</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Description (optional)</label>
                <textarea
                  value={newRelationshipForm.description}
                  onChange={(e) => setNewRelationshipForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white h-20"
                  placeholder="Describe the relationship..."
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t border-slate-700/50">
              <button
                onClick={() => setIsCreateRelationshipModalOpen(false)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRelationship}
                disabled={!newRelationshipForm.sourceId || !newRelationshipForm.targetId}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Relationship
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Node Modal */}
      {isEditNodeModalOpen && editingNode && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl shadow-2xl border border-slate-700/50 w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
              <h3 className="text-lg font-bold text-white">Edit Idea</h3>
              <button
                onClick={() => {
                  setIsEditNodeModalOpen(false);
                  setEditingNode(null);
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Label</label>
                <input
                  type="text"
                  value={newNodeForm.label}
                  onChange={(e) => setNewNodeForm(prev => ({ ...prev, label: e.target.value }))}
                  className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                <textarea
                  value={newNodeForm.description}
                  onChange={(e) => setNewNodeForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white h-24"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
                <select
                  value={newNodeForm.category}
                  onChange={(e) => setNewNodeForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white"
                >
                  <option value="general">General</option>
                  <option value="technology">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="security">Security</option>
                  <option value="marketing">Marketing</option>
                  <option value="analytics">Analytics</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Tags</label>
                <input
                  type="text"
                  value={newNodeForm.tags}
                  onChange={(e) => setNewNodeForm(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white"
                />
              </div>
            </div>
            
            <div className="flex justify-between p-6 border-t border-slate-700/50">
              <button
                onClick={() => handleDeleteNode(editingNode.id)}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setIsEditNodeModalOpen(false);
                    setEditingNode(null);
                  }}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateNode}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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