import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ButtonGenerateTasks } from "../components/atoms/ButtonGenerateTasks";

const meta: Meta<typeof ButtonGenerateTasks> = {
  title: "Atoms/ButtonGenerateTasks",
  component: ButtonGenerateTasks,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ButtonGenerateTasks>;

// Default state
export const Default: Story = {
  args: {
    label: "Generate Tasks",
    onClick: action("button-clicked"),
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: "Generate Tasks",
    onClick: action("button-clicked"),
    disabled: true,
  },
};

// Custom label
export const CustomLabel: Story = {
  args: {
    label: "Create Tasks Markdown",
    onClick: action("button-clicked"),
  },
};
