import type { Meta, StoryObj } from "@storybook/react";
import { TasksStatusIndicator } from "../components/molecules/TasksStatusIndicator";

const meta: Meta<typeof TasksStatusIndicator> = {
  title: "Molecules/TasksStatusIndicator",
  component: TasksStatusIndicator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TasksStatusIndicator>;

// Pending status
export const Pending: Story = {
  args: {
    status: "pending",
  },
};

// In Progress status
export const InProgress: Story = {
  args: {
    status: "in-progress",
  },
};

// Completed status
export const Completed: Story = {
  args: {
    status: "completed",
  },
};
