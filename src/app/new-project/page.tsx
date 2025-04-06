"use client";

export const dynamic = 'force-dynamic';

import React, { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";

// Prevent server-side rendering of this page
export default function NewProjectPage() {
  return (
    <Suspense fallback={<NewProjectLoading />}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">New Project Setup</h1>
        <Link href="/">
          <Button className="mb-8">Back to Home</Button>
        </Link>
      </div>
    </Suspense>
  );
}

function NewProjectLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">New Project Setup</h1>
      <div className="bg-amber-50 dark:bg-stone-800 p-6 rounded-md border border-amber-200 dark:border-stone-700">
        <p className="text-stone-600 dark:text-amber-200">Loading setup form...</p>
      </div>
    </div>
  );
}
