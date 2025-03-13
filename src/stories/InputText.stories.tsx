import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { InputText } from "../components/atoms/InputText";

const meta: Meta<typeof InputText> = {
  title: "Atoms/InputText",
  component: InputText,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputText>;

// Default state
export const Default: Story = {
  args: {
    label: "Project Name",
    placeholder: "Enter project name",
    value: "",
    onChange: action("onChange"),
  },
};

// With value
export const WithValue: Story = {
  args: {
    label: "Project Name",
    placeholder: "Enter project name",
    value: "My Awesome Project",
    onChange: action("onChange"),
  },
};

// With error
export const WithError: Story = {
  args: {
    label: "Project Name",
    placeholder: "Enter project name",
    value: "",
    onChange: action("onChange"),
    error: "Project name is required",
  },
};

// Required field
export const Required: Story = {
  args: {
    label: "Project Name",
    placeholder: "Enter project name",
    value: "",
    onChange: action("onChange"),
    required: true,
  },
};
