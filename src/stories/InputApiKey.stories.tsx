import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { InputApiKey } from "../components/atoms/InputApiKey";

const meta: Meta<typeof InputApiKey> = {
  title: "Atoms/InputApiKey",
  component: InputApiKey,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputApiKey>;

// Default empty state
export const Default: Story = {
  args: {
    label: "API Key",
    placeholder: "Enter your API key",
    value: "",
    onChange: action("onChange"),
  },
};

// With value (masked by default)
export const WithValue: Story = {
  args: {
    label: "API Key",
    placeholder: "Enter your API key",
    value: "sk-1234567890abcdef1234567890abcdef",
    onChange: action("onChange"),
  },
};

// With error
export const WithError: Story = {
  args: {
    label: "API Key",
    placeholder: "Enter your API key",
    value: "invalid-key",
    onChange: action("onChange"),
    error: "Invalid API key format",
  },
};

// Required field
export const Required: Story = {
  args: {
    label: "API Key",
    placeholder: "Enter your API key",
    value: "",
    onChange: action("onChange"),
    required: true,
  },
};
