"use client";

import React, { useState } from "react";
import { ButtonGenerateCode } from "../atoms/ButtonGenerateCode";
import { ClaudeCLIOutput } from "../molecules/ClaudeCLIOutput";

interface CodeGenerationSectionProps {
  onRunCodeGeneration?: () => Promise<string[]>;
  initialLogs?: string[];
}

export const CodeGenerationSection: React.FC<CodeGenerationSectionProps> = ({
  onRunCodeGeneration,
  initialLogs = [],
}) => {
  const [cliLogs, setCliLogs] = useState<string[]>(initialLogs);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleRunCodeGeneration = async () => {
    if (isGenerating) return;

    setIsGenerating(true);
    setCliLogs((prev) => [...prev, "Initializing code generation..."]);

    try {
      if (onRunCodeGeneration) {
        const newLogs = await onRunCodeGeneration();
        setCliLogs((prev) => [...prev, ...newLogs]);
      } else {
        // Mock code generation for demo purposes
        const mockSteps = [
          "Analyzing project requirements...",
          "Identifying code patterns...",
          "Generating component structure...",
          "Implementing business logic...",
          "Optimizing for performance...",
          "Running tests...",
          "Code generation completed successfully!",
        ];

        // Simulate step-by-step updates
        for (const step of mockSteps) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setCliLogs((prev) => [...prev, step]);
        }
      }
    } catch (error) {
      console.error("Error during code generation:", error);
      setCliLogs((prev) => [
        ...prev,
        `ERROR: Code generation failed - ${error}`,
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-5 border border-amber-200 rounded-lg bg-light dark:bg-stone-800 dark:border-stone-700 shadow-sm">
      <h3 className="text-lg font-medium text-stone-800 dark:text-amber-50 mb-3">
        AI-Driven Code Generation
      </h3>

      <p className="text-sm text-stone-600 dark:text-amber-200 mb-4">
        Generate code for your project using Claude. The AI will analyze your
        requirements and create code components based on the current task.
      </p>

      <div className="mb-4">
        <ButtonGenerateCode
          onClick={handleRunCodeGeneration}
          disabled={isGenerating}
          label={isGenerating ? "Generating Code..." : "Run Code Generation"}
        />
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium text-stone-700 dark:text-amber-100 mb-2">
          Claude CLI Output
        </h4>
        <ClaudeCLIOutput cliLogs={cliLogs} />
      </div>
    </div>
  );
};

export default CodeGenerationSection;
