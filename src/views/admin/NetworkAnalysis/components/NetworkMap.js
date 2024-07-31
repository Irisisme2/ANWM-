import React from 'react';
import Card from 'components/card/Card';
import { Box, Text, Tooltip } from '@chakra-ui/react';

const nodes = [
  { id: '1', label: 'Node 1: User A', x: 100, y: 100, color: '#ff9f00' },
  { id: '2', label: 'Node 2: User B', x: 300, y: 100, color: '#00aaff' },
  { id: '3', label: 'Node 3: User C', x: 500, y: 100, color: '#ff3f3f' },
  { id: '4', label: 'Node 4: User D', x: 200, y: 300, color: '#4caf50' },
];

const edges = [
  { source: '1', target: '2', color: '#ff9f00' },
  { source: '1', target: '3', color: '#00aaff' },
  { source: '2', target: '4', color: '#ff3f3f' },
  { source: '3', target: '4', color: '#4caf50' },
];

const NetworkMap = () => {
  return (
    <Card>
      <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md">
        <svg width="100%" height="600" style={{ border: '1px solid #ddd' }}>
          {/* Render edges */}
          {edges.map((edge, index) => {
            const sourceNode = nodes.find(node => node.id === edge.source);
            const targetNode = nodes.find(node => node.id === edge.target);
            if (!sourceNode || !targetNode) return null;

            return (
              <line
                key={index}
                x1={sourceNode.x}
                y1={sourceNode.y}
                x2={targetNode.x}
                y2={targetNode.y}
                stroke={edge.color}
                strokeWidth="2"
                strokeLinecap="round"
              />
            );
          })}

          {/* Render nodes */}
          {nodes.map((node) => (
            <Tooltip key={node.id} label={node.label} aria-label="A tooltip">
              <circle
                cx={node.x}
                cy={node.y}
                r={20}
                fill={node.color}
                stroke="#000"
                strokeWidth="2"
              />
            </Tooltip>
          ))}
        </svg>
      </Box>
    </Card>
  );
};

export default NetworkMap;
