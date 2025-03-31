"use client";

import React, { useState } from "react";
import InputText from "@/components/atoms/InputText";
import TextareaDescription from "@/components/atoms/TextareaDescription";
import ApiKeySection from "@/components/organisms/ApiKeySection";
import { Button } from "@/components/Button";
import DocumentWorkflowTimeline from "@/components/organisms/DocumentWorkflowTimeline";

export default function NewProjectPage() {
  const [projectName, setProjectName] = useState("");
  const [saveLocation, setSaveLocation] = useState("");
  const [appDescription, setAppDescription] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateRequirements = async () => {
    // This functionality is deferred
    console.log("Generate requirements clicked");
    setIsGenerating(true);
  };

  // Mock function for API key handling (deferred functionality)
  const handleSaveApiKey = async (key: string) => {
    setApiKey(key);
    return Promise.resolve();
  };

  // Check if form is complete to enable the button
  const isFormComplete = !!(
    projectName &&
    saveLocation &&
    appDescription &&
    apiKey
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-stone-800 dark:text-amber-50 mb-8">
        Create New Project
      </h1>

      <div className="space-y-6">
        <InputText
          label="Project Name"
          placeholder="Enter project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          name="projectName"
        />

        <InputText
          label="Save Location"
          placeholder="/path/to/your/project"
          value={saveLocation}
          onChange={(e) => setSaveLocation(e.target.value)}
          name="saveLocation"
        />

        <TextareaDescription
          label="Describe your app idea"
          placeholder="Provide a detailed description of your application idea..."
          value={appDescription}
          onChange={(e) => setAppDescription(e.target.value)}
          name="appDescription"
          rows={6}
        />

        <div className="pt-4">
          <ApiKeySection savedApiKey={apiKey} onSaveApiKey={handleSaveApiKey} />
        </div>

        <div className="pt-4">
          <Button
            onClick={isFormComplete ? handleGenerateRequirements : undefined}
            className={!isFormComplete ? "opacity-50 cursor-not-allowed" : ""}
          >
            Generate Requirements
          </Button>
        </div>

        {/* Document Generation Progress Display */}
        {isGenerating && (
          <div className="mt-8 pt-8 border-t border-amber-200 dark:border-stone-700">
            <h2 className="text-2xl font-bold text-stone-800 dark:text-amber-50 mb-6">
              Generation Progress
            </h2>
            <DocumentWorkflowTimeline
              brdStatus="pending"
              prdStatus="pending"
              tasksStatus="pending"
            />
          </div>
        )}
      </div>
    </div>
  );
}
