import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ButtonMarkInProgress } from "../components/atoms/ButtonMarkInProgress";

const meta: Meta<typeof ButtonMarkInProgress> = {
  title: "Atoms/ButtonMarkInProgress",
  component: ButtonMarkInProgress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ButtonMarkInProgress>;

// Default state
export const Default: Story = {
  args: {
    label: "Start Task",
    onClick: action("button-clicked"),
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: "Start Task",
    onClick: action("button-clicked"),
    disabled: true,
  },
};

// Custom label
export const CustomLabel: Story = {
  args: {
    label: "Mark In-Progress",
    onClick: action("button-clicked"),
  },
};
