"use client";

import React from "react";
import BRDStatusIndicator, {
  BRDStatus,
} from "@/components/molecules/BRDStatusIndicator";
import PRDStatusIndicator, {
  PRDStatus,
} from "@/components/molecules/PRDStatusIndicator";
import TasksStatusIndicator, {
  TasksStatus,
} from "@/components/molecules/TasksStatusIndicator";
import { ArrowRight } from "lucide-react";

interface DocumentWorkflowTimelineProps {
  brdStatus: BRDStatus;
  prdStatus: PRDStatus;
  tasksStatus: TasksStatus;
}

const DocumentWorkflowTimeline: React.FC<DocumentWorkflowTimelineProps> = ({
  brdStatus,
  prdStatus,
  tasksStatus,
}) => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
        Document Generation Workflow
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* BRD Step */}
        <div className="flex flex-col items-center space-y-2 w-full md:w-1/3">
          <div className="h-20 w-20 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
            <span className="text-blue-600 dark:text-blue-400 font-semibold">
              BRD
            </span>
          </div>
          <h3 className="font-medium text-gray-800 dark:text-white">
            Business Requirements
          </h3>
          <BRDStatusIndicator status={brdStatus} />
        </div>

        {/* Arrow 1 */}
        <div className="hidden md:flex items-center justify-center w-12">
          <ArrowRight className="text-gray-400 dark:text-gray-500" size={24} />
        </div>
        <div className="md:hidden h-8 flex items-center justify-center">
          <ArrowRight
            className="text-gray-400 dark:text-gray-500 rotate-90"
            size={24}
          />
        </div>

        {/* PRD Step */}
        <div className="flex flex-col items-center space-y-2 w-full md:w-1/3">
          <div className="h-20 w-20 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
            <span className="text-purple-600 dark:text-purple-400 font-semibold">
              PRD
            </span>
          </div>
          <h3 className="font-medium text-gray-800 dark:text-white">
            Product Requirements
          </h3>
          <PRDStatusIndicator status={prdStatus} />
        </div>

        {/* Arrow 2 */}
        <div className="hidden md:flex items-center justify-center w-12">
          <ArrowRight className="text-gray-400 dark:text-gray-500" size={24} />
        </div>
        <div className="md:hidden h-8 flex items-center justify-center">
          <ArrowRight
            className="text-gray-400 dark:text-gray-500 rotate-90"
            size={24}
          />
        </div>

        {/* Tasks Step */}
        <div className="flex flex-col items-center space-y-2 w-full md:w-1/3">
          <div className="h-20 w-20 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
            <span className="text-green-600 dark:text-green-400 font-semibold">
              Tasks
            </span>
          </div>
          <h3 className="font-medium text-gray-800 dark:text-white">
            Task Breakdown
          </h3>
          <TasksStatusIndicator status={tasksStatus} />
        </div>
      </div>
    </div>
  );
};

export default DocumentWorkflowTimeline;
