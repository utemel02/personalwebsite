"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/Button";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-display font-bold mb-8 text-stone-800 dark:text-amber-50">
        Project Dashboard
      </h1>

      <div className="bg-amber-50/50 dark:bg-stone-800/50 p-8 rounded-lg border border-amber-200 dark:border-stone-700 text-center">
        <p className="text-stone-600 dark:text-amber-200 mb-6">
          This is a placeholder for the project dashboard. It will be
          implemented in future iterations.
        </p>

        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    </div>
  );
}
