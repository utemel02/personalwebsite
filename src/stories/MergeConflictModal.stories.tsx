import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import MergeConflictModal from "../components/molecules/MergeConflictModal";

const meta = {
  title: "Molecules/MergeConflictModal",
  component: MergeConflictModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onClose: { action: "closed" },
    onAccept: { action: "accepted" },
    onCancel: { action: "cancelled" },
  },
} satisfies Meta<typeof MergeConflictModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Modal closed (hidden)
export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    onAccept: () => {},
    onCancel: () => {},
    conflictFiles: [],
  },
};

// Modal open with no conflicts
export const OpenNoConflicts: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onAccept: () => {},
    onCancel: () => {},
    conflictFiles: [],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText("Resolve & Merge"));
    await expect(args.onAccept).toHaveBeenCalled();
  },
};

// Modal open with conflicts
export const OpenWithConflicts: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onAccept: () => {},
    onCancel: () => {},
    conflictFiles: [
      {
        path: "src/components/Header.tsx",
        description: "Conflict in navigation links",
      },
      {
        path: "src/styles/theme.css",
        description: "Conflicting color variables",
      },
      {
        path: "package.json",
        description: "Dependency version conflicts",
      },
    ],
  },
};
