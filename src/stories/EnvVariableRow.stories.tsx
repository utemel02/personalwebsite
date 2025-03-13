import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { EnvVariableRow } from "../components/atoms/EnvVariableRow";

const meta: Meta<typeof EnvVariableRow> = {
  title: "Atoms/EnvVariableRow",
  component: EnvVariableRow,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EnvVariableRow>;

// Default state
export const Default: Story = {
  args: {
    variableName: "DATABASE_URL",
    value: "",
    onValueChange: action("onValueChange"),
  },
};

// With value
export const WithValue: Story = {
  args: {
    variableName: "DATABASE_URL",
    value: "postgresql://user:password@localhost:5432/mydb",
    onValueChange: action("onValueChange"),
  },
};

// Secret variable (like API keys)
export const SecretVariable: Story = {
  args: {
    variableName: "API_KEY",
    value: "sk-1234567890abcdef",
    onValueChange: action("onValueChange"),
    isSecret: true,
  },
};

// Long variable name
export const LongVariableName: Story = {
  args: {
    variableName: "VERY_LONG_ENVIRONMENT_VARIABLE_NAME",
    value: "some value",
    onValueChange: action("onValueChange"),
  },
};
