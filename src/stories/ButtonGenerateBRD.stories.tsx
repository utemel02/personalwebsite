import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ButtonGenerateBRD } from "../components/atoms/ButtonGenerateBRD";

const meta: Meta<typeof ButtonGenerateBRD> = {
  title: "Atoms/ButtonGenerateBRD",
  component: ButtonGenerateBRD,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ButtonGenerateBRD>;

// Default state
export const Default: Story = {
  args: {
    label: "Generate BRD",
    onClick: action("button-clicked"),
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: "Generate BRD",
    onClick: action("button-clicked"),
    disabled: true,
  },
};

// Custom label
export const CustomLabel: Story = {
  args: {
    label: "Create Business Requirements Document",
    onClick: action("button-clicked"),
  },
};
