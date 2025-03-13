import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { InProgressPromptModal } from "../components/molecules/InProgressPromptModal";

const meta: Meta<typeof InProgressPromptModal> = {
  title: "Molecules/InProgressPromptModal",
  component: InProgressPromptModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InProgressPromptModal>;

// Open modal
export const Open: Story = {
  args: {
    isOpen: true,
    onClose: action("modal-closed"),
    onConfirm: action("create-worktree-confirmed"),
    taskName: "Implement Login Form",
  },
};

// Closed modal (won't render anything)
export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: action("modal-closed"),
    onConfirm: action("create-worktree-confirmed"),
  },
};

// Loading state
export const Loading: Story = {
  args: {
    isOpen: true,
    onClose: action("modal-closed"),
    onConfirm: action("create-worktree-confirmed"),
    taskName: "Implement Login Form",
    isLoading: true,
  },
};
