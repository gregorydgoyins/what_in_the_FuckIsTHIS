import React from 'react';
import { IdeaRelationship, IdeaNode, RelationshipType, RelationshipStrength } from '../../types';

interface IdeaRelationshipRendererProps {
  relationship: IdeaRelationship;
  sourceNode: IdeaNode;
  targetNode: IdeaNode;
  onClick: (relationshipId: string, event: React.MouseEvent) => void;
  getRelationshipStyle: (relationship: IdeaRelationship) => { color: string; strokeDasharray?: string };
  getStrokeWidth: (strength: RelationshipStrength) => number;
}

export function IdeaRelationshipRenderer({
  relationship,
  sourceNode,
  targetNode,
  onClick,
  getRelationshipStyle,
  getStrokeWidth
}: IdeaRelationshipRendererProps) {
  if (!sourceNode.position || !targetNode.position) {
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
        onClick={(e) => onClick(relationship.id, e)}
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
}

export default IdeaRelationshipRenderer;