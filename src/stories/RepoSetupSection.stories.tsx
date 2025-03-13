import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { RepoSetupSection } from "../components/organisms/RepoSetupSection";

const meta: Meta<typeof RepoSetupSection> = {
  title: "Organisms/RepoSetupSection",
  component: RepoSetupSection,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RepoSetupSection>;

// Default layout
export const Default: Story = {
  args: {
    onCloneSuccess: action("clone-success"),
  },
};
