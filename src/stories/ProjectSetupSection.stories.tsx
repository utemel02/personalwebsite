import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ProjectSetupSection } from "../components/organisms/ProjectSetupSection";

const meta: Meta<typeof ProjectSetupSection> = {
  title: "Organisms/ProjectSetupSection",
  component: ProjectSetupSection,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProjectSetupSection>;

// Default view
export const Default: Story = {
  args: {
    onSubmit: action("project-details-submitted"),
  },
};

// With initial data
export const WithInitialData: Story = {
  args: {
    onSubmit: action("project-details-submitted"),
    initialData: {
      projectName: "Customer Portal",
      folderPath: "~/projects/customer-portal",
      description:
        "A web application for customers to manage their accounts, view invoices, and request support.",
    },
  },
};
