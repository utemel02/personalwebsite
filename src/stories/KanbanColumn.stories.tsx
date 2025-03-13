import { KanbanColumn } from "../components/molecules/KanbanColumn";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { TaskStatus } from "../components/atoms/TaskCard";

// Sample tasks for demonstration
const mockTasks = [
  {
    id: "task-1",
    title: "Create KanbanColumn Component",
    description: "Build a component that can display task cards in a column",
    status: "todo" as TaskStatus,
  },
  {
    id: "task-2",
    title: "Style KanbanColumn",
    description: "Add Tailwind styling to the column component",
    status: "todo" as TaskStatus,
  },
  {
    id: "task-3",
    title: "Build TaskCard",
    description: "Create the individual task card component",
    status: "in-progress" as TaskStatus,
  },
  {
    id: "task-4",
    title: "Set up project structure",
    description: "Create all necessary folders and files",
    status: "done" as TaskStatus,
  },
];

const meta: Meta<typeof KanbanColumn> = {
  title: "Molecules/KanbanColumn",
  component: KanbanColumn,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onTaskClick: { action: "task clicked" },
    onTaskStatusChange: { action: "task status changed" },
  },
};

export default meta;
type Story = StoryObj<typeof KanbanColumn>;

export const ToDoColumn: Story = {
  args: {
    columnName: "To Do",
    status: "todo",
    tasks: mockTasks,
    onTaskClick: action("task clicked"),
    onTaskStatusChange: action("task status changed"),
  },
};

export const InProgressColumn: Story = {
  args: {
    columnName: "In Progress",
    status: "in-progress",
    tasks: mockTasks,
    onTaskClick: action("task clicked"),
    onTaskStatusChange: action("task status changed"),
  },
};

export const DoneColumn: Story = {
  args: {
    columnName: "Done",
    status: "done",
    tasks: mockTasks,
    onTaskClick: action("task clicked"),
    onTaskStatusChange: action("task status changed"),
  },
};

export const EmptyColumn: Story = {
  args: {
    columnName: "To Do",
    status: "todo",
    tasks: [],
    onTaskClick: action("task clicked"),
    onTaskStatusChange: action("task status changed"),
  },
};

export const ManyTasks: Story = {
  args: {
    columnName: "To Do",
    status: "todo",
    tasks: [
      ...mockTasks.filter((t) => t.status === "todo"),
      ...Array(10)
        .fill(0)
        .map((_, i) => ({
          id: `extra-task-${i}`,
          title: `Additional Task ${i + 1}`,
          description: `This is an extra task #${i + 1} for testing overflow`,
          status: "todo" as TaskStatus,
        })),
    ],
    onTaskClick: action("task clicked"),
    onTaskStatusChange: action("task status changed"),
  },
};
