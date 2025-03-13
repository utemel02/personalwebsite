import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DocumentWorkflowTimeline from "@/components/organisms/DocumentWorkflowTimeline";

const meta: Meta<typeof DocumentWorkflowTimeline> = {
  title: "Organisms/DocumentWorkflowTimeline",
  component: DocumentWorkflowTimeline,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DocumentWorkflowTimeline>;

export const AllPending: Story = {
  args: {
    brdStatus: "pending",
    prdStatus: "pending",
    tasksStatus: "pending",
  },
};

export const BrdInProgress: Story = {
  args: {
    brdStatus: "in-progress",
    prdStatus: "pending",
    tasksStatus: "pending",
  },
};

export const BrdCompleted: Story = {
  args: {
    brdStatus: "completed",
    prdStatus: "pending",
    tasksStatus: "pending",
  },
};

export const PrdInProgress: Story = {
  args: {
    brdStatus: "completed",
    prdStatus: "in-progress",
    tasksStatus: "pending",
  },
};

export const BrdPrdCompleted: Story = {
  args: {
    brdStatus: "completed",
    prdStatus: "completed",
    tasksStatus: "pending",
  },
};

export const TasksInProgress: Story = {
  args: {
    brdStatus: "completed",
    prdStatus: "completed",
    tasksStatus: "in-progress",
  },
};

export const AllCompleted: Story = {
  args: {
    brdStatus: "completed",
    prdStatus: "completed",
    tasksStatus: "completed",
  },
};
