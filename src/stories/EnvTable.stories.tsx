import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { EnvTable } from "../components/molecules/EnvTable";

const meta: Meta<typeof EnvTable> = {
  title: "Molecules/EnvTable",
  component: EnvTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EnvTable>;

// Empty state
export const Empty: Story = {
  args: {
    variables: [],
    onVariableChange: action("onVariableChange"),
  },
};

// With a few variables
export const WithVariables: Story = {
  args: {
    variables: [
      {
        name: "DATABASE_URL",
        value: "postgresql://user:password@localhost:5432/mydb",
      },
      { name: "PORT", value: "3000" },
      { name: "NODE_ENV", value: "development" },
    ],
    onVariableChange: action("onVariableChange"),
  },
};

// With secret variables
export const WithSecretVariables: Story = {
  args: {
    variables: [
      {
        name: "DATABASE_URL",
        value: "postgresql://user:password@localhost:5432/mydb",
      },
      { name: "API_KEY", value: "sk-1234567890abcdef", isSecret: true },
      { name: "JWT_SECRET", value: "super-secret-jwt-token", isSecret: true },
    ],
    onVariableChange: action("onVariableChange"),
  },
};

// Many variables
export const ManyVariables: Story = {
  args: {
    variables: Array(10)
      .fill(null)
      .map((_, i) => ({
        name: `ENV_VAR_${i + 1}`,
        value: `Value for variable ${i + 1}`,
        isSecret: i % 3 === 0, // Every third variable is secret
      })),
    onVariableChange: action("onVariableChange"),
  },
};
