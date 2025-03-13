import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { TaskInProgressFlow } from "../components/organisms/TaskInProgressFlow";

const meta: Meta<typeof TaskInProgressFlow> = {
  title: "Organisms/TaskInProgressFlow",
  component: TaskInProgressFlow,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TaskInProgressFlow>;

// Default flow
export const Default: Story = {
  args: {
    taskName: "Implement User Authentication",
    taskId: "task-123",
    onTaskStarted: action("task-started"),
  },
};

// Task with long name
export const LongTaskName: Story = {
  args: {
    taskName:
      "Implement a comprehensive user authentication system with OAuth providers and multi-factor authentication",
    taskId: "task-456",
    onTaskStarted: action("task-started"),
  },
};
