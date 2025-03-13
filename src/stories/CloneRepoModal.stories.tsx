import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { CloneRepoModal } from "../components/molecules/CloneRepoModal";

const meta: Meta<typeof CloneRepoModal> = {
  title: "Molecules/CloneRepoModal",
  component: CloneRepoModal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CloneRepoModal>;

// Open modal
export const Open: Story = {
  args: {
    isOpen: true,
    onClose: action("modal-closed"),
    onConfirmClone: action("clone-confirmed"),
    repoUrl: "https://github.com/username/starter-repo.git",
  },
};

// Closed modal (won't be visible)
export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: action("modal-closed"),
    onConfirmClone: action("clone-confirmed"),
  },
};

// Loading state
export const Loading: Story = {
  args: {
    isOpen: true,
    onClose: action("modal-closed"),
    onConfirmClone: action("clone-confirmed"),
    isLoading: true,
  },
};
