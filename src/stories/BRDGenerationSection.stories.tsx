import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { BRDGenerationSection } from "../components/organisms/BRDGenerationSection";

const meta: Meta<typeof BRDGenerationSection> = {
  title: "Organisms/BRDGenerationSection",
  component: BRDGenerationSection,
  parameters: {
    // Adjust the layout container to show full width
    layout: {
      width: "100%",
      height: "auto",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BRDGenerationSection>;

// Default/Pending state
export const Default: Story = {
  args: {
    initialStatus: "pending",
    onGenerateBRD: async () => {
      action("generate-brd")();
      await new Promise((resolve) => setTimeout(resolve, 2000));
    },
  },
};

// In-Progress state
export const InProgress: Story = {
  args: {
    initialStatus: "in-progress",
  },
};

// Completed state
export const Completed: Story = {
  args: {
    initialStatus: "completed",
  },
};
