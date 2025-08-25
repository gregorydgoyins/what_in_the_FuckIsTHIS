import React from 'react';
import { IdeaNode } from '../../types';

interface IdeaNodeRendererProps {
  node: IdeaNode;
  isSelected: boolean;
  onClick: (nodeId: string, event: React.MouseEvent) => void;
  onDoubleClick: (node: IdeaNode) => void;
  getCategoryColor: (category: string) => string;
}

export function IdeaNodeRenderer({ 
  node, 
  isSelected, 
  onClick, 
  onDoubleClick, 
  getCategoryColor 
}: IdeaNodeRendererProps) {
  if (!node.position) return null;
  
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
        onClick={(e) => onClick(node.id, e)}
        onDoubleClick={() => onDoubleClick(node)}
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
}

export default IdeaNodeRenderer;