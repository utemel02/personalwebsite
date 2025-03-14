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
    <section className="p-6 bg-light rounded-lg shadow-sm border border-amber-200 dark:bg-stone-800 dark:border-stone-700">
      <h2 className="text-xl font-semibold text-stone-800 dark:text-amber-50 mb-2">
        {title}
      </h2>
      <p className="text-stone-600 dark:text-amber-200 mb-6">{description}</p>

      <div className="flex justify-center">
        <DependencyGraphVisualizer
          tasks={tasks}
          width={Math.min(800, window.innerWidth - 100)}
          height={500}
        />
      </div>

      <div className="mt-6 bg-amber-100/50 p-4 rounded-md border border-amber-200 dark:bg-stone-700 dark:border-stone-600">
        <h3 className="text-sm font-medium text-stone-700 dark:text-amber-100 mb-2">
          Understanding this graph:
        </h3>
        <ul className="text-sm text-stone-600 dark:text-amber-200 space-y-1 list-disc list-inside">
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
