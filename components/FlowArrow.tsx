import React, { FC } from 'react';

interface FlowArrowProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  label: string;
}

const FlowArrow: FC<FlowArrowProps> = ({ from, to, label }) => {
  const padding = 20;
  const start = { x: from.x + padding, y: from.y };
  const end = { x: to.x - padding, y: to.y };
  
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;

  // Simple straight line path
  // For curved paths, you would use C or Q path commands
  const pathData = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;

  return (
    <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="0"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
        </marker>
      </defs>
      <path
        d={pathData}
        stroke="#6b7280"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
      />
      <foreignObject x={midX - 100} y={midY - 20} width="200" height="40">
        {/* FIX: Removed the `xmlns` attribute which causes a TypeScript error in React. Modern browsers automatically handle namespacing for elements inside a <foreignObject>. */}
        <div
            className="text-center"
        >
          <span className="text-xs bg-white text-gray-700 px-2 py-0.5 rounded-full border border-gray-400 shadow-sm">
            {label}
          </span>
        </div>
      </foreignObject>
    </svg>
  );
};

export default FlowArrow;
