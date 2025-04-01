import fs from "fs/promises";
import path from "path";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { generateChatCompletion } from "@/lib/aiClient";

export const documentRouter = createTRPCRouter({
  generateBRD: publicProcedure
    .input(
      z.object({
        projectId: z.string(),
        projectPath: z.string(),
        appDescription: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        // Read the BRD prompt template
        const brdPromptPath = path.join(process.cwd(), "docs", "brd-prompt.md");
        const brdPromptTemplate = await fs.readFile(brdPromptPath, "utf-8");

        // Insert app description into the BRD prompt
        const brdPrompt = brdPromptTemplate.replace(
          "<SPECS GO HERE>",
          input.appDescription,
        );

        // Generate BRD using AI
        const brdContent = await generateChatCompletion(
          [{ role: "user", content: brdPrompt }],
          "O1", // Using Claude 3.5 Sonnet for complex reasoning
        );

        // Save BRD to project directory
        const docsDir = path.join(input.projectPath, "docs");
        await fs.mkdir(docsDir, { recursive: true });

        const brdFilePath = path.join(docsDir, "business-requirements.md");
        await fs.writeFile(brdFilePath, brdContent);

        return {
          success: true,
          brdContent,
          filePath: brdFilePath,
        };
      } catch (error) {
        console.error("Error generating BRD:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  generatePRD: publicProcedure
    .input(
      z.object({
        projectId: z.string(),
        projectPath: z.string(),
        brdContent: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        // Read the PRD prompt template
        const prdPromptPath = path.join(process.cwd(), "docs", "prd-prompt.md");
        const prdPromptTemplate = await fs.readFile(prdPromptPath, "utf-8");

        // Insert BRD content into the PRD prompt
        const prdPrompt = prdPromptTemplate.replace(
          "<BRD GOES HERE>",
          input.brdContent,
        );

        // Generate PRD using AI
        const prdContent = await generateChatCompletion(
          [{ role: "user", content: prdPrompt }],
          "O1", // Using Claude 3.5 Sonnet for complex reasoning
        );

        // Save PRD to project directory
        const prdFilePath = path.join(
          input.projectPath,
          "docs",
          "product-requirements.md",
        );
        await fs.writeFile(prdFilePath, prdContent);

        return {
          success: true,
          prdContent,
          filePath: prdFilePath,
        };
      } catch (error) {
        console.error("Error generating PRD:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  generateTasks: publicProcedure
    .input(
      z.object({
        projectId: z.string(),
        projectPath: z.string(),
        prdContent: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        // Read the Task List prompt template
        const taskPromptPath = path.join(
          process.cwd(),
          "docs",
          "task-list-prompt.md",
        );
        const taskPromptTemplate = await fs.readFile(taskPromptPath, "utf-8");

        // Insert PRD content into the Task List prompt
        const taskPrompt = taskPromptTemplate.replace(
          "<PRD GOES HERE>",
          input.prdContent,
        );

        // Generate Task List using AI
        const taskContent = await generateChatCompletion(
          [{ role: "user", content: taskPrompt }],
          "O1", // Using Claude 3.5 Sonnet for complex reasoning
        );

        // Save Task List to project directory
        const tasksFilePath = path.join(
          input.projectPath,
          "docs",
          "tasks_001.md",
        );
        await fs.writeFile(tasksFilePath, taskContent);

        return {
          success: true,
          taskContent,
          filePath: tasksFilePath,
        };
      } catch (error) {
        console.error("Error generating Tasks:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  getDocumentStatus: publicProcedure
    .input(
      z.object({
        projectId: z.string(),
        projectPath: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const docsDir = path.join(input.projectPath, "docs");

        // Check if each document exists
        const brdExists = await fileExists(
          path.join(docsDir, "business-requirements.md"),
        );
        const prdExists = await fileExists(
          path.join(docsDir, "product-requirements.md"),
        );
        const tasksExists = await fileExists(
          path.join(docsDir, "tasks_001.md"),
        );

        return {
          brd: brdExists ? "completed" : "pending",
          prd: prdExists ? "completed" : "pending",
          tasks: tasksExists ? "completed" : "pending",
        };
      } catch (error) {
        console.error("Error getting document status:", error);
        return {
          brd: "pending",
          prd: "pending",
          tasks: "pending",
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),
});

// Utility function to check if a file exists
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
