import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGenerateCode } from "../components/atoms/ButtonGenerateCode";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof ButtonGenerateCode> = {
  title: "Atoms/ButtonGenerateCode",
  component: ButtonGenerateCode,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ButtonGenerateCode>;

// Default button
export const Default: Story = {
  args: {
    label: "Run Code Generation",
    onClick: action("button-clicked"),
  },
};

// Disabled button
export const Disabled: Story = {
  args: {
    label: "Run Code Generation",
    onClick: action("button-clicked"),
    disabled: true,
  },
};

// Custom label
export const CustomLabel: Story = {
  args: {
    label: "Generate Code with Claude",
    onClick: action("button-clicked"),
  },
};
