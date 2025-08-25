import React from 'react';
import { Search, Filter, Plus, LinkIcon, Target, Download, Eye, EyeOff } from 'lucide-react';

interface IdeaMappingToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterCategory: string;
  setFilterCategory: (category: string) => void;
  filterRelationType: string;
  setFilterRelationType: (type: string) => void;
  selectedNodesCount: number;
  showAnalysis: boolean;
  setShowAnalysis: (show: boolean) => void;
  onAddIdea: () => void;
  onQuickConnect: () => void;
  onAutoLayout: () => void;
  onExport: () => void;
  categories: string[];
  relationshipTypes: string[];
}

export function IdeaMappingToolbar({
  searchQuery,
  setSearchQuery,
  filterCategory,
  setFilterCategory,
  filterRelationType,
  setFilterRelationType,
  selectedNodesCount,
  showAnalysis,
  setShowAnalysis,
  onAddIdea,
  onQuickConnect,
  onAutoLayout,
  onExport,
  categories,
  relationshipTypes
}: IdeaMappingToolbarProps) {
  return (
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
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        {/* Relationship type filter */}
        <select
          value={filterRelationType}
          onChange={(e) => setFilterRelationType(e.target.value)}
          className="bg-slate-700/50 text-white text-sm border-slate-600/50 rounded-lg px-3 py-2"
        >
          <option value="all">All Relationships</option>
          {relationshipTypes.map(type => (
            <option key={type} value={type}>{type.replace('-', ' ')}</option>
          ))}
        </select>
      </div>
      
      <div className="flex items-center space-x-2">
        {/* Action buttons */}
        <button
          onClick={onAddIdea}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Idea</span>
        </button>
        
        {selectedNodesCount === 2 && (
          <button
            onClick={onQuickConnect}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <LinkIcon className="h-4 w-4" />
            <span>Connect</span>
          </button>
        )}
        
        <button
          onClick={onAutoLayout}
          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg transition-colors"
        >
          <Target className="h-4 w-4" />
          <span>Auto Layout</span>
        </button>
        
        <button
          onClick={onShowAnalysis}
          className="flex items-center space-x-2 px-3 py-2 bg-slate-700/50 rounded-lg text-gray-300 hover:text-white transition-colors"
        >
          {showAnalysis ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          <span className="text-sm">Analysis</span>
        </button>
        
        <button
          onClick={onExport}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
}

export default IdeaMappingToolbar;