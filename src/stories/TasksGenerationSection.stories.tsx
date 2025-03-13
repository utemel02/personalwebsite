import type { Meta, StoryObj } from "@storybook/react";
import { TasksGenerationSection } from "../components/organisms/TasksGenerationSection";

const meta: Meta<typeof TasksGenerationSection> = {
  title: "Organisms/TasksGenerationSection",
  component: TasksGenerationSection,
  parameters: {
    layout: "centered",
    backgrounds: { default: "light" },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TasksGenerationSection>;

// Default (Pending) state
export const Pending: Story = {
  args: {
    initialStatus: "pending",
  },
};

// In Progress state
export const InProgress: Story = {
  args: {
    initialStatus: "in-progress",
  },
};

// Completed state
export const Completed: Story = {
  args: {
    initialStatus: "completed",
  },
};
