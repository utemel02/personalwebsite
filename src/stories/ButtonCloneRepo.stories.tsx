import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ButtonCloneRepo } from "../components/atoms/ButtonCloneRepo";

const meta: Meta<typeof ButtonCloneRepo> = {
  title: "Atoms/ButtonCloneRepo",
  component: ButtonCloneRepo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ButtonCloneRepo>;

// Default state
export const Default: Story = {
  args: {
    label: "Clone Starter Repo",
    onClick: action("button-clicked"),
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: "Clone Starter Repo",
    onClick: action("button-clicked"),
    disabled: true,
  },
};

// Custom label
export const CustomLabel: Story = {
  args: {
    label: "Start Repository Clone",
    onClick: action("button-clicked"),
  },
};
