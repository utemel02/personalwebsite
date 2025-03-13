import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { PRDGenerationSection } from "../components/organisms/PRDGenerationSection";

const meta: Meta<typeof PRDGenerationSection> = {
  title: "Organisms/PRDGenerationSection",
  component: PRDGenerationSection,
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
type Story = StoryObj<typeof PRDGenerationSection>;

// Default/Pending state
export const Default: Story = {
  args: {
    initialStatus: "pending",
    onGeneratePRD: async () => {
      action("generate-prd")();
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
