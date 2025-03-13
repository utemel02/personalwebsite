"use client";

import React from "react";
import DependencyGraphVisualizer, {
  Task,
} from "../molecules/DependencyGraphVisualizer";

interface DependencyGraphSectionProps {
  tasks: Task[];
  title?: string;
  description?: string;
}

const DependencyGraphSection: React.FC<DependencyGraphSectionProps> = ({
  tasks,
  title = "Task Dependency Graph",
  description = "A visual representation of task dependencies. Each node represents a task, and arrows indicate dependencies between tasks.",
}) => {
  return (
    <section className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>

      <div className="flex justify-center">
        <DependencyGraphVisualizer
          tasks={tasks}
          width={Math.min(800, window.innerWidth - 100)}
          height={500}
        />
      </div>

      <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Understanding this graph:
        </h3>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>Each circle represents a task</li>
          <li>Arrows show which tasks depend on other tasks</li>
          <li>Tasks must be completed in dependency order</li>
          <li>Hover over a task to see its ID</li>
        </ul>
      </div>
    </section>
  );
};

export default DependencyGraphSection;
