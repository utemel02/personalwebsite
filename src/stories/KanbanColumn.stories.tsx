import { KanbanColumn } from "../components/molecules/KanbanColumn";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Task } from "../components/molecules/KanbanColumn";

// Sample tasks for demonstration
const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Create TaskCard Component",
    description: "Design and implement a reusable task card component",
    status: "todo",
  },
  {
    id: "task-2",
    title: "Implement KanbanColumn",
    description: "Create a column component that displays tasks",
    status: "todo",
  },
  {
    id: "task-3",
    title: "Style TaskCard with Tailwind",
    description: "Apply appropriate styling using Tailwind CSS classes",
    status: "in-progress",
  },
  {
    id: "task-4",
    title: "Add drag-and-drop functionality",
    description: "Allow tasks to be dragged between columns",
    status: "in-progress",
  },
  {
    id: "task-5",
    title: "Project Setup",
    description: "Initialize the project with Next.js and Tailwind",
    status: "done",
  },
  {
    id: "task-6",
    title: "Create component structure",
    description: "Set up the atomic design folder structure",
    status: "done",
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
  },
};

export default meta;
type Story = StoryObj<typeof KanbanColumn>;

export const TodoColumn: Story = {
  args: {
    columnName: "To Do",
    status: "todo",
    tasks: mockTasks,
    onTaskClick: action("task clicked"),
  },
};

export const InProgressColumn: Story = {
  args: {
    columnName: "In Progress",
    status: "in-progress",
    tasks: mockTasks,
    onTaskClick: action("task clicked"),
  },
};

export const DoneColumn: Story = {
  args: {
    columnName: "Done",
    status: "done",
    tasks: mockTasks,
    onTaskClick: action("task clicked"),
  },
};

export const EmptyColumn: Story = {
  args: {
    columnName: "Empty Column",
    status: "todo",
    tasks: [], // No tasks
    onTaskClick: action("task clicked"),
  },
};
