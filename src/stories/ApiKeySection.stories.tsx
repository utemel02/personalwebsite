import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ApiKeySection } from "../components/organisms/ApiKeySection";

const meta: Meta<typeof ApiKeySection> = {
  title: "Organisms/ApiKeySection",
  component: ApiKeySection,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ApiKeySection>;

// Empty state (no saved key)
export const Empty: Story = {
  args: {
    savedApiKey: "",
    onSaveApiKey: async (apiKey: string) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      action("onSaveApiKey")(apiKey);
    },
  },
};

// With pre-saved API key
export const WithSavedKey: Story = {
  args: {
    savedApiKey: "sk-1234567890abcdef1234567890abcdef",
    onSaveApiKey: async (apiKey: string) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      action("onSaveApiKey")(apiKey);
    },
  },
};
