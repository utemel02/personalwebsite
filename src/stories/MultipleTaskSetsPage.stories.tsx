import type { Meta, StoryObj } from "@storybook/react";
import MultipleTaskSetsPage from "../app/(dashboard)/multiple-task-sets/page";

const meta: Meta<typeof MultipleTaskSetsPage> = {
  title: "Pages/MultipleTaskSetsPage",
  component: MultipleTaskSetsPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MultipleTaskSetsPage>;

// Default view
export const Default: Story = {};
