import type { Meta, StoryObj } from "@storybook/react";
import { PRDStatusIndicator } from "../components/molecules/PRDStatusIndicator";

const meta: Meta<typeof PRDStatusIndicator> = {
  title: "Molecules/PRDStatusIndicator",
  component: PRDStatusIndicator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PRDStatusIndicator>;

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
