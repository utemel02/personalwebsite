import type { Meta, StoryObj } from "@storybook/react";
import { DesignSystem } from "@/components/theme/DesignSystem";

const meta: Meta<typeof DesignSystem> = {
  title: "Theme/DesignSystem",
  component: DesignSystem,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A comprehensive guide to the design system, including colors, typography, and components.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DesignSystem>;

export const Default: Story = {
  args: {},
};

export const DarkMode: Story = {
  args: {},
  parameters: {
    backgrounds: { default: "dark" },
  },
  decorators: [
    (Story) => (
      <div className="dark bg-bg-dark min-h-screen">
        <Story />
      </div>
    ),
  ],
};

export const MobileView: Story = {
  args: {},
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};

export const TabletView: Story = {
  args: {},
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
};

export const DesktopView: Story = {
  args: {},
  parameters: {
    viewport: { defaultViewport: "desktop" },
  },
};
