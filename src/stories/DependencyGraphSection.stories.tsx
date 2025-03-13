import type { Meta, StoryObj } from "@storybook/react";
import DependencyGraphSection from "../components/organisms/DependencyGraphSection";

const meta: Meta<typeof DependencyGraphSection> = {
  title: "Organisms/DependencyGraphSection",
  component: DependencyGraphSection,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DependencyGraphSection>;

// Default example with a simple set of tasks
export const Default: Story = {
  args: {
    tasks: [
      { id: "T1", title: "Setup project", dependencies: [] },
      { id: "T2", title: "Create UI components", dependencies: ["T1"] },
      { id: "T3", title: "Implement API", dependencies: ["T1"] },
      { id: "T4", title: "Connect UI to API", dependencies: ["T2", "T3"] },
      { id: "T5", title: "Testing", dependencies: ["T4"] },
    ],
  },
};

// Example with custom title and description
export const CustomTitleAndDescription: Story = {
  args: {
    title: "Project Workflow Dependencies",
    description:
      "This graph illustrates the relationships and dependencies between different tasks in your project workflow.",
    tasks: [
      { id: "T1", title: "Setup project", dependencies: [] },
      { id: "T2", title: "Create UI components", dependencies: ["T1"] },
      { id: "T3", title: "Implement API", dependencies: ["T1"] },
      { id: "T4", title: "Connect UI to API", dependencies: ["T2", "T3"] },
      { id: "T5", title: "Testing", dependencies: ["T4"] },
    ],
  },
};

// Complex example with more tasks and relationships
export const ComplexWorkflow: Story = {
  args: {
    title: "Complex Project Dependencies",
    tasks: [
      { id: "T1", title: "Project initialization", dependencies: [] },
      { id: "T2", title: "Requirements gathering", dependencies: ["T1"] },
      { id: "T3", title: "System design", dependencies: ["T2"] },
      { id: "T4", title: "Database schema", dependencies: ["T3"] },
      { id: "T5", title: "API design", dependencies: ["T3"] },
      { id: "T6", title: "UI/UX design", dependencies: ["T2"] },
      { id: "T7", title: "Frontend implementation", dependencies: ["T6"] },
      { id: "T8", title: "Backend implementation", dependencies: ["T4", "T5"] },
      { id: "T9", title: "Integration", dependencies: ["T7", "T8"] },
      { id: "T10", title: "Testing", dependencies: ["T9"] },
      { id: "T11", title: "Deployment", dependencies: ["T10"] },
    ],
  },
};
