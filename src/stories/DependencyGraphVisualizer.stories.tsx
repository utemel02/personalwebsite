import type { Meta, StoryObj } from "@storybook/react";
import DependencyGraphVisualizer from "../components/molecules/DependencyGraphVisualizer";

const meta: Meta<typeof DependencyGraphVisualizer> = {
  title: "Molecules/DependencyGraphVisualizer",
  component: DependencyGraphVisualizer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DependencyGraphVisualizer>;

// Simple graph with 3 tasks
export const Simple: Story = {
  args: {
    tasks: [
      { id: "T1", title: "Setup project", dependencies: [] },
      { id: "T2", title: "Create UI components", dependencies: ["T1"] },
      { id: "T3", title: "Implement API", dependencies: ["T1"] },
    ],
    width: 500,
    height: 350,
  },
};

// Complex graph with more tasks and multiple dependencies
export const Complex: Story = {
  args: {
    tasks: [
      { id: "T1", title: "Setup project", dependencies: [] },
      { id: "T2", title: "Create models", dependencies: ["T1"] },
      { id: "T3", title: "Design UI", dependencies: ["T1"] },
      { id: "T4", title: "Implement API", dependencies: ["T2"] },
      { id: "T5", title: "Create components", dependencies: ["T3"] },
      { id: "T6", title: "Connect API to UI", dependencies: ["T4", "T5"] },
      { id: "T7", title: "Testing", dependencies: ["T6"] },
    ],
    width: 650,
    height: 450,
  },
};

// Circular dependencies (to show handling of complex relationships)
export const CircularDependencies: Story = {
  args: {
    tasks: [
      { id: "T1", title: "Frontend setup", dependencies: ["T5"] },
      { id: "T2", title: "API development", dependencies: ["T1"] },
      { id: "T3", title: "Database models", dependencies: ["T2"] },
      { id: "T4", title: "Authentication", dependencies: ["T3"] },
      { id: "T5", title: "Deployment", dependencies: ["T4"] },
    ],
    width: 600,
    height: 400,
  },
};
