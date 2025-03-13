import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within, waitFor } from "@storybook/test";
import TaskCompletionFlow from "../components/organisms/TaskCompletionFlow";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Mock decorators to provide toast context
const withToastProvider = (Story: any) => (
  <>
    <Story />
    <ToastContainer position="bottom-right" />
  </>
);

const meta = {
  title: "Organisms/TaskCompletionFlow",
  component: TaskCompletionFlow,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onComplete: { action: "task completed" },
    onCancel: { action: "cancelled" },
  },
  decorators: [withToastProvider],
} satisfies Meta<typeof TaskCompletionFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic completion without conflicts
export const NoConflicts: Story = {
  args: {
    taskId: "task-123",
    taskName: "Create login form",
    simulateConflicts: false,
    conflictFiles: [],
    onComplete: () => {},
    onCancel: () => {},
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("Mark as Done"));

    // Wait for the simulated backend call to complete
    await waitFor(
      () => {
        expect(args.onComplete).toHaveBeenCalledWith("task-123");
      },
      { timeout: 2000 },
    );
  },
};

// Completion with merge conflicts
export const WithConflicts: Story = {
  args: {
    taskId: "task-456",
    taskName: "Update navigation component",
    simulateConflicts: true,
    conflictFiles: [
      {
        path: "src/components/Navigation.tsx",
        description: "Changes to link structure conflict with main branch",
      },
      {
        path: "src/styles/navigation.css",
        description: "Style conflicts in dropdown menu",
      },
    ],
    onComplete: () => {},
    onCancel: () => {},
  },
};
