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
    <div className="w-full bg-amber-50 dark:bg-stone-800 p-6 rounded-lg shadow-sm border border-amber-200 dark:border-stone-700">
      <h2 className="text-xl font-semibold text-stone-800 dark:text-amber-50 mb-6">
        Document Generation Workflow
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* BRD Step */}
        <div className="flex flex-col items-center space-y-2 w-full md:w-1/3">
          <div className="h-20 w-20 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center border border-amber-200 dark:border-amber-800">
            <span className="text-amber-700 dark:text-amber-300 font-semibold">
              BRD
            </span>
          </div>
          <h3 className="font-medium text-stone-800 dark:text-amber-50">
            Business Requirements
          </h3>
          <BRDStatusIndicator status={brdStatus} />
        </div>

        {/* Arrow 1 */}
        <div className="hidden md:flex items-center justify-center w-12">
          <ArrowRight
            className="text-stone-400 dark:text-amber-700"
            size={24}
          />
        </div>
        <div className="md:hidden h-8 flex items-center justify-center">
          <ArrowRight
            className="text-stone-400 dark:text-amber-700 rotate-90"
            size={24}
          />
        </div>

        {/* PRD Step */}
        <div className="flex flex-col items-center space-y-2 w-full md:w-1/3">
          <div className="h-20 w-20 rounded-full bg-amber-200 dark:bg-amber-800/40 flex items-center justify-center border border-amber-300 dark:border-amber-700">
            <span className="text-amber-800 dark:text-amber-200 font-semibold">
              PRD
            </span>
          </div>
          <h3 className="font-medium text-stone-800 dark:text-amber-50">
            Product Requirements
          </h3>
          <PRDStatusIndicator status={prdStatus} />
        </div>

        {/* Arrow 2 */}
        <div className="hidden md:flex items-center justify-center w-12">
          <ArrowRight
            className="text-stone-400 dark:text-amber-700"
            size={24}
          />
        </div>
        <div className="md:hidden h-8 flex items-center justify-center">
          <ArrowRight
            className="text-stone-400 dark:text-amber-700 rotate-90"
            size={24}
          />
        </div>

        {/* Tasks Step */}
        <div className="flex flex-col items-center space-y-2 w-full md:w-1/3">
          <div className="h-20 w-20 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
            <span className="text-emerald-700 dark:text-emerald-300 font-semibold">
              Tasks
            </span>
          </div>
          <h3 className="font-medium text-stone-800 dark:text-amber-50">
            Task Breakdown
          </h3>
          <TasksStatusIndicator status={tasksStatus} />
        </div>
      </div>
    </div>
  );
};

export default DocumentWorkflowTimeline;
