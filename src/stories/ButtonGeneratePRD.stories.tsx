import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ButtonGeneratePRD } from "../components/atoms/ButtonGeneratePRD";

const meta: Meta<typeof ButtonGeneratePRD> = {
  title: "Atoms/ButtonGeneratePRD",
  component: ButtonGeneratePRD,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ButtonGeneratePRD>;

// Default state
export const Default: Story = {
  args: {
    label: "Generate PRD",
    onClick: action("button-clicked"),
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: "Generate PRD",
    onClick: action("button-clicked"),
    disabled: true,
  },
};

// Custom label
export const CustomLabel: Story = {
  args: {
    label: "Create Product Requirements Document",
    onClick: action("button-clicked"),
  },
};
