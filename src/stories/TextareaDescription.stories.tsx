import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { TextareaDescription } from "../components/atoms/TextareaDescription";

const meta: Meta<typeof TextareaDescription> = {
  title: "Atoms/TextareaDescription",
  component: TextareaDescription,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TextareaDescription>;

// Default state
export const Default: Story = {
  args: {
    label: "Project Description",
    placeholder: "Enter a brief description of your project",
    value: "",
    onChange: action("onChange"),
    rows: 4,
  },
};

// With value
export const WithValue: Story = {
  args: {
    label: "Project Description",
    placeholder: "Enter a brief description of your project",
    value:
      "This project aims to create a task management system with AI-assisted code generation capabilities.",
    onChange: action("onChange"),
    rows: 4,
  },
};

// With error
export const WithError: Story = {
  args: {
    label: "Project Description",
    placeholder: "Enter a brief description of your project",
    value: "",
    onChange: action("onChange"),
    error: "Description is required",
    rows: 4,
  },
};

// Taller textarea
export const Taller: Story = {
  args: {
    label: "Project Description",
    placeholder: "Enter a brief description of your project",
    value: "",
    onChange: action("onChange"),
    rows: 8,
  },
};
