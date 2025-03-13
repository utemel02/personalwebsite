"use client";

import React, { useState } from "react";
import { ButtonAddTaskSet } from "@/components/atoms/ButtonAddTaskSet";
import Link from "next/link";

// Mock data for task sets
const initialTaskSets = [
  { id: "001", name: "tasks_001.md", createdAt: "2023-03-15" },
];

export default function MultipleTaskSetsPage() {
  const [taskSets, setTaskSets] = useState(initialTaskSets);
  const [isCreating, setIsCreating] = useState(false);

  // Function to handle creating a new task set
  const handleAddTaskSet = () => {
    setIsCreating(true);

    // In a real application, this would call an API to create a new task set
    // For now, we'll simulate creating a new task set after a short delay
    setTimeout(() => {
      const newId = String(
        Number(taskSets[taskSets.length - 1].id) + 1,
      ).padStart(3, "0");
      const newTaskSet = {
        id: newId,
        name: `tasks_${newId}.md`,
        createdAt: new Date().toISOString().split("T")[0],
      };

      setTaskSets([...taskSets, newTaskSet]);
      setIsCreating(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">
        Task Sets
      </h1>

      <div className="mb-6">
        <ButtonAddTaskSet
          onClick={handleAddTaskSet}
          disabled={isCreating}
          label={isCreating ? "Creating..." : "Add Task Set"}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            Available Task Sets
          </h2>
        </div>

        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {taskSets.map((taskSet) => (
            <li
              key={taskSet.id}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {taskSet.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Created on {taskSet.createdAt}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Link
                    href={`/kanban?taskSet=${taskSet.id}`}
                    className="px-3 py-1 text-sm rounded-md bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    View Kanban
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
