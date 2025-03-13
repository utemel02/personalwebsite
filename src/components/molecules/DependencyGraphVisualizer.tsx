"use client";

import React, { JSX } from "react";

export interface Task {
  id: string;
  title: string;
  dependencies: string[];
}

interface DependencyGraphVisualizerProps {
  tasks: Task[];
  width?: number;
  height?: number;
}

const DependencyGraphVisualizer: React.FC<DependencyGraphVisualizerProps> = ({
  tasks,
  width = 600,
  height = 400,
}) => {
  // Calculate positions for each task node
  // Using a simple circular layout for this example
  const calculateNodePositions = () => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;
    const positions: Record<string, { x: number; y: number }> = {};

    tasks.forEach((task, index) => {
      const angle = (index / tasks.length) * 2 * Math.PI;
      positions[task.id] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });

    return positions;
  };

  const nodePositions = calculateNodePositions();

  // Generate SVG paths for dependency arrows
  const generatePaths = () => {
    const paths: JSX.Element[] = [];

    tasks.forEach((task) => {
      task.dependencies.forEach((depId) => {
        if (nodePositions[depId] && nodePositions[task.id]) {
          const start = nodePositions[depId];
          const end = nodePositions[task.id];

          // Calculate a curved path
          const midX = (start.x + end.x) / 2;
          const midY = (start.y + end.y) / 2;
          const dx = end.x - start.x;
          const dy = end.y - start.y;
          const normalX = (-dy / Math.sqrt(dx * dx + dy * dy)) * 30;
          const normalY = (dx / Math.sqrt(dx * dx + dy * dy)) * 30;

          const controlX = midX + normalX;
          const controlY = midY + normalY;

          // Calculate arrow head points
          const angle = Math.atan2(end.y - controlY, end.x - controlX);
          const arrowSize = 10;
          const arrowPoint1X =
            end.x - arrowSize * Math.cos(angle - Math.PI / 6);
          const arrowPoint1Y =
            end.y - arrowSize * Math.sin(angle - Math.PI / 6);
          const arrowPoint2X =
            end.x - arrowSize * Math.cos(angle + Math.PI / 6);
          const arrowPoint2Y =
            end.y - arrowSize * Math.sin(angle + Math.PI / 6);

          paths.push(
            <g key={`${depId}-${task.id}`}>
              <path
                d={`M ${start.x} ${start.y} Q ${controlX} ${controlY} ${end.x} ${end.y}`}
                fill="none"
                stroke="#6366F1"
                strokeWidth="2"
              />
              <polygon
                points={`${end.x},${end.y} ${arrowPoint1X},${arrowPoint1Y} ${arrowPoint2X},${arrowPoint2Y}`}
                fill="#6366F1"
              />
            </g>,
          );
        }
      });
    });

    return paths;
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden">
      <svg width={width} height={height}>
        {/* Draw the paths/arrows first so they appear behind nodes */}
        {generatePaths()}

        {/* Draw the task nodes */}
        {tasks.map((task) => {
          const position = nodePositions[task.id];

          if (!position) return null;

          return (
            <g key={task.id}>
              <circle
                cx={position.x}
                cy={position.y}
                r={35}
                fill="#EEF2FF"
                stroke="#6366F1"
                strokeWidth="2"
                className="transition-all duration-300 hover:fill-indigo-100"
              />
              <text
                x={position.x}
                y={position.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-medium fill-gray-700"
              >
                {task.id}
              </text>
              <title>{task.title}</title>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default DependencyGraphVisualizer;
