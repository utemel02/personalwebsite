import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { EnvConfigSection } from "../components/organisms/EnvConfigSection";

const meta: Meta<typeof EnvConfigSection> = {
  title: "Organisms/EnvConfigSection",
  component: EnvConfigSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EnvConfigSection>;

// Empty state
export const Empty: Story = {
  args: {
    initialVariables: [],
    onSaveEnv: async (variables) => {
      action("onSaveEnv")(variables);
      return Promise.resolve();
    },
  },
};

// With some initial variables
export const WithVariables: Story = {
  args: {
    initialVariables: [
      {
        name: "DATABASE_URL",
        value: "postgresql://user:password@localhost:5432/mydb",
      },
      { name: "PORT", value: "3000" },
      { name: "NODE_ENV", value: "development" },
      { name: "API_KEY", value: "sk-1234567890abcdef", isSecret: true },
    ],
    onSaveEnv: async (variables) => {
      action("onSaveEnv")(variables);
      return Promise.resolve();
    },
  },
};
