import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import ButtonMarkDone from "../components/atoms/ButtonMarkDone";

const meta = {
  title: "Atoms/ButtonMarkDone",
  component: ButtonMarkDone,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof ButtonMarkDone>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    label: "Mark as Done",
    onClick: () => {},
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await expect(args.onClick).toHaveBeenCalled();
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    label: "Mark as Done",
    disabled: true,
    onClick: () => {},
  },
};

// Custom Label
export const CustomLabel: Story = {
  args: {
    label: "Complete Task",
    onClick: () => {},
  },
};
