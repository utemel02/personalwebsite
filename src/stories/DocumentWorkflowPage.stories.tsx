import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DocumentWorkflowPage from "@/app/(dashboard)/document-workflow/page";

const meta: Meta<typeof DocumentWorkflowPage> = {
  title: "Pages/DocumentWorkflowPage",
  component: DocumentWorkflowPage,
  parameters: {
    // Optional parameter to center the component in the Canvas
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DocumentWorkflowPage>;

// The main story
export const Default: Story = {
  render: () => <DocumentWorkflowPage />,
};
