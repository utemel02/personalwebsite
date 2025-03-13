import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ButtonAddTaskSet } from "../components/atoms/ButtonAddTaskSet";

const meta: Meta<typeof ButtonAddTaskSet> = {
  title: "Atoms/ButtonAddTaskSet",
  component: ButtonAddTaskSet,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ButtonAddTaskSet>;

// Default state
export const Default: Story = {
  args: {
    label: "Add Task Set",
    onClick: action("button-clicked"),
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: "Add Task Set",
    onClick: action("button-clicked"),
    disabled: true,
  },
};

// Custom label
export const CustomLabel: Story = {
  args: {
    label: "Create New Task Set",
    onClick: action("button-clicked"),
  },
};
