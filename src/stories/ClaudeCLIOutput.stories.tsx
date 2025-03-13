import type { Meta, StoryObj } from "@storybook/react";
import { ClaudeCLIOutput } from "../components/molecules/ClaudeCLIOutput";

const meta: Meta<typeof ClaudeCLIOutput> = {
  title: "Molecules/ClaudeCLIOutput",
  component: ClaudeCLIOutput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ClaudeCLIOutput>;

// Empty logs
export const Empty: Story = {
  args: {
    cliLogs: [],
  },
};

// Single log
export const SingleLog: Story = {
  args: {
    cliLogs: ["Initializing Claude CLI..."],
  },
};

// Multiple logs
export const MultipleLogs: Story = {
  args: {
    cliLogs: [
      "Initializing Claude CLI...",
      "Loading project configuration",
      "Analyzing code structure",
      "Generating task recommendations",
      "Applying AI transformations",
      "Building components",
      "Task completed successfully",
    ],
  },
};

// Error logs
export const ErrorLogs: Story = {
  args: {
    cliLogs: [
      "Initializing Claude CLI...",
      "Loading project configuration",
      "ERROR: Failed to access API endpoint",
      "Retrying connection...",
      "Connected successfully",
    ],
  },
};
