import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ApiKeyForm } from "../components/molecules/ApiKeyForm";

const meta: Meta<typeof ApiKeyForm> = {
  title: "Molecules/ApiKeyForm",
  component: ApiKeyForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ApiKeyForm>;

// Empty form
export const Default: Story = {
  args: {
    onSaveKey: action("onSaveKey"),
    initialValue: "",
  },
};

// Form with initial value
export const WithInitialValue: Story = {
  args: {
    onSaveKey: action("onSaveKey"),
    initialValue: "sk-1234567890abcdef1234567890abcdef",
  },
};
