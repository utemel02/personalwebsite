import {
  KanbanBoard,
  parseTasksFromMarkdown,
} from "../components/organisms/KanbanBoard";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Task } from "../components/molecules/KanbanColumn";
import { TaskStatus } from "../components/atoms/TaskCard";

// Sample tasks for the Kanban board
const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Create TaskCard Component",
    description:
      "Design and implement a reusable task card component with status indicators",
    status: "todo" as TaskStatus,
  },
  {
    id: "task-2",
    title: "Implement KanbanColumn",
    description:
      "Create a column component that can display multiple tasks of a specific status",
    status: "todo" as TaskStatus,
  },
  {
    id: "task-3",
    title: "Build KanbanBoard",
    description: "Combine columns into a full Kanban board with task filtering",
    status: "todo" as TaskStatus,
  },
  {
    id: "task-4",
    title: "Add Tailwind Styling",
    description:
      "Style all components using Tailwind CSS for a consistent look and feel",
    status: "in-progress" as TaskStatus,
  },
  {
    id: "task-5",
    title: "Create Storybook Stories",
    description: "Add comprehensive Storybook stories for all components",
    status: "in-progress" as TaskStatus,
  },
  {
    id: "task-6",
    title: "Set up Project Structure",
    description:
      "Initialize the project with proper folder structure and dependencies",
    status: "done" as TaskStatus,
  },
  {
    id: "task-7",
    title: "Design Component Interfaces",
    description: "Define TypeScript interfaces for all components",
    status: "done" as TaskStatus,
  },
];

// Sample markdown tasks for parsing demonstration
const sampleMarkdown = `# Project Tasks

## Frontend Components

- [ ] Create TaskCard Component
  This is the basic building block for our kanban board

- [-] Implement KanbanColumn
  Will contain task cards filtered by status

- [ ] Build KanbanBoard
  The main container for all columns

## Styling

- [-] Add Tailwind Styling
  Use Tailwind for consistent design

- [x] Setup color scheme
  Define colors for different statuses

## Documentation

- [x] Write component docs
  Document all components with JSDoc

- [ ] Create README`;

const meta: Meta<typeof KanbanBoard> = {
  title: "Organisms/KanbanBoard",
  component: KanbanBoard,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onTaskClick: { action: "task clicked" },
    onTaskStatusChange: { action: "task status changed" },
  },
};

export default meta;
type Story = StoryObj<typeof KanbanBoard>;

export const DefaultBoard: Story = {
  args: {
    tasks: mockTasks,
    onTaskClick: action("task clicked"),
    onTaskStatusChange: action("task status changed"),
  },
};

export const ParsedFromMarkdown: Story = {
  args: {
    tasks: parseTasksFromMarkdown(sampleMarkdown),
    onTaskClick: action("task clicked"),
    onTaskStatusChange: action("task status changed"),
  },
};

export const EmptyBoard: Story = {
  args: {
    tasks: [],
    onTaskClick: action("task clicked"),
    onTaskStatusChange: action("task status changed"),
  },
};

export const WithInternalStateManagement: Story = {
  args: {
    tasks: mockTasks,
    // No external handlers provided, so the component will handle state internally
  },
  parameters: {
    docs: {
      description: {
        story:
          "This example uses the internal state management of the KanbanBoard component to handle status changes without external handlers.",
      },
    },
  },
};
