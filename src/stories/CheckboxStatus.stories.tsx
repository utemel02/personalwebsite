import { CheckboxStatus } from "../components/atoms/CheckboxStatus";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof CheckboxStatus> = {
  title: "Atoms/CheckboxStatus",
  component: CheckboxStatus,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    status: {
      control: { type: "select" },
      options: ["todo", "in-progress", "done"],
    },
    onToggle: { action: "toggled" },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxStatus>;

export const Todo: Story = {
  args: {
    status: "todo",
    onToggle: action("status toggled"),
    size: 24,
  },
};

export const InProgress: Story = {
  args: {
    status: "in-progress",
    onToggle: action("status toggled"),
    size: 24,
  },
};

export const Done: Story = {
  args: {
    status: "done",
    onToggle: action("status toggled"),
    size: 24,
  },
};

export const Small: Story = {
  args: {
    status: "todo",
    onToggle: action("status toggled"),
    size: 16,
  },
};

export const Large: Story = {
  args: {
    status: "todo",
    onToggle: action("status toggled"),
    size: 32,
  },
};

export const WithCustomClass: Story = {
  args: {
    status: "done",
    onToggle: action("status toggled"),
    className: "text-green-500 hover:text-green-700",
    size: 24,
  },
};
