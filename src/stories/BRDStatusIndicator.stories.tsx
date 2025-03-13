import type { Meta, StoryObj } from "@storybook/react";
import { BRDStatusIndicator } from "../components/molecules/BRDStatusIndicator";

const meta: Meta<typeof BRDStatusIndicator> = {
  title: "Molecules/BRDStatusIndicator",
  component: BRDStatusIndicator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BRDStatusIndicator>;

// Pending state
export const Pending: Story = {
  args: {
    status: "pending",
  },
};

// In-Progress state
export const InProgress: Story = {
  args: {
    status: "in-progress",
  },
};

// Completed state
export const Completed: Story = {
  args: {
    status: "completed",
  },
};
