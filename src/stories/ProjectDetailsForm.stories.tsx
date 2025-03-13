import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ProjectDetailsForm } from "../components/molecules/ProjectDetailsForm";

const meta: Meta<typeof ProjectDetailsForm> = {
  title: "Molecules/ProjectDetailsForm",
  component: ProjectDetailsForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProjectDetailsForm>;

// Default empty form
export const Default: Story = {
  args: {
    onSubmit: action("form-submitted"),
  },
};

// Form with initial data
export const WithInitialData: Story = {
  args: {
    onSubmit: action("form-submitted"),
    initialData: {
      projectName: "Task Management System",
      folderPath: "~/projects/task-manager",
      description:
        "A project to help manage tasks and generate code with AI assistance.",
    },
  },
};

// Form with validation errors - will be shown when submitted
export const WithValidationDemo: Story = {
  render: (args) => {
    return (
      <div className="w-[500px]">
        <p className="mb-4 text-sm text-gray-600">
          This demonstrates the form with validation - try submitting without
          entering required fields.
        </p>
        <ProjectDetailsForm {...args} />
      </div>
    );
  },
  args: {
    onSubmit: action("form-submitted"),
  },
};
