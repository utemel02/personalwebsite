import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import KanbanBoardPage from "../app/(dashboard)/kanban-board/page";

// This is a client component that we're trying to story, so we need to
// mock any server-specific functions or APIs

const meta: Meta<typeof KanbanBoardPage> = {
  title: "Pages/KanbanBoardPage",
  component: KanbanBoardPage,
  parameters: {
    layout: "fullscreen",
    // Disable the fetch during Storybook rendering
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof KanbanBoardPage>;

export const Default: Story = {};

// Note: In a real app, you might want to create variants with different
// loading states or task configurations, but for this example, we're keeping it simple
