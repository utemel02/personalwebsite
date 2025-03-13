import { TaskCard } from "../components/atoms/TaskCard";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof TaskCard> = {
  title: "Atoms/TaskCard",
  component: TaskCard,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    status: {
      control: { type: "select" },
      options: ["todo", "in-progress", "done"],
    },
    onClick: { action: "clicked" },
    onStatusChange: { action: "status changed" },
  },
};

export default meta;
type Story = StoryObj<typeof TaskCard>;

export const Todo: Story = {
  args: {
    title: "Create TaskCard Component",
    description: "Implement a basic task card with status indicator",
    status: "todo",
    onClick: action("task clicked"),
    onStatusChange: action("status changed"),
  },
};

export const InProgress: Story = {
  args: {
    title: "Add KanbanColumn Component",
    description: "Create a component that holds multiple task cards",
    status: "in-progress",
    onClick: action("task clicked"),
    onStatusChange: action("status changed"),
  },
};

export const Done: Story = {
  args: {
    title: "Setup Project Structure",
    description: "Create the basic folder structure for the project",
    status: "done",
    onClick: action("task clicked"),
    onStatusChange: action("status changed"),
  },
};

export const WithoutDescription: Story = {
  args: {
    title: "Short task without description",
    status: "todo",
    onClick: action("task clicked"),
    onStatusChange: action("status changed"),
  },
};

export const LongTitle: Story = {
  args: {
    title:
      "This is a very long task title that might wrap to multiple lines in the TaskCard component",
    description: "A description for the task with a long title",
    status: "todo",
    onClick: action("task clicked"),
    onStatusChange: action("status changed"),
  },
};

export const WithStatusChangeOnly: Story = {
  args: {
    title: "Task with status toggle only",
    description:
      "Click the checkbox to toggle status, but the card doesn't have a click handler",
    status: "todo",
    onStatusChange: action("status changed"),
  },
};
