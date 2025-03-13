import type { Meta, StoryObj } from "@storybook/react";
import { CodeGenerationSection } from "../components/organisms/CodeGenerationSection";

const meta: Meta<typeof CodeGenerationSection> = {
  title: "Organisms/CodeGenerationSection",
  component: CodeGenerationSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CodeGenerationSection>;

// Empty initial state
export const Empty: Story = {
  args: {
    initialLogs: [],
  },
};

// With some initial logs
export const WithInitialLogs: Story = {
  args: {
    initialLogs: [
      "Previous session: Analyzing project requirements...",
      "Previous session: Generated 3 components",
    ],
  },
};

// Mock implementation
export const MockImplementation: Story = {
  args: {
    onRunCodeGeneration: async () => {
      // This is just for Storybook preview and won't actually be called
      // due to how Storybook works with args, but it shows the interface
      return [
        "Custom implementation started...",
        "Fetching data from API...",
        "Processing complete!",
      ];
    },
  },
};
