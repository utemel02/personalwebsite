"use client";

export const dynamic = 'force-dynamic';

import React, { useState, useEffect, Suspense } from "react";
import DirectoryPicker from "@/components/atoms/DirectoryPicker";
import KanbanBoard from "@/components/organisms/KanbanBoard";
import { api } from "@/lib/trpc/react";
import { toast } from "react-toastify";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Task } from "@/lib/api/routers/fileSystemRouter";
import { TaskStatus } from "@/components/atoms/TaskCard";

// Prevent server-side rendering of the dashboard
export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Project Dashboard</h1>
        <Link href="/">
          <Button className="mb-8">Back to Home</Button>
        </Link>
      </div>
    </Suspense>
  );
}

function DashboardLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Project Dashboard</h1>
      <div className="bg-amber-50 dark:bg-stone-800 p-6 rounded-md border border-amber-200 dark:border-stone-700">
        <p className="text-stone-600 dark:text-amber-200">Loading project information...</p>
      </div>
    </div>
  );
}
