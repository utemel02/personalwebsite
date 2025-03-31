import React, { Suspense } from "react";
import DocumentWorkflowClient from "./client";

// Loading placeholder
function DocumentWorkflowLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-display font-bold mb-8 text-stone-800 dark:text-amber-50">
        Document Workflow
      </h1>
      <div className="animate-pulse">
        <div className="h-4 bg-amber-200/30 dark:bg-stone-700/50 rounded mb-6 w-3/4"></div>
        <div className="h-24 bg-amber-200/30 dark:bg-stone-700/50 rounded mb-10"></div>
        <div className="space-y-6">
          <div className="h-40 bg-amber-200/30 dark:bg-stone-700/50 rounded"></div>
          <div className="h-40 bg-amber-200/30 dark:bg-stone-700/50 rounded"></div>
          <div className="h-40 bg-amber-200/30 dark:bg-stone-700/50 rounded"></div>
        </div>
      </div>
    </div>
  );
}

// Main component wrapper with suspense
export default function DocumentWorkflowPage() {
  return (
    <Suspense fallback={<DocumentWorkflowLoading />}>
      <DocumentWorkflowClient />
    </Suspense>
  );
}
