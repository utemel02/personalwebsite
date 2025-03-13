import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import ErrorRetryPrompt from "../components/molecules/ErrorRetryPrompt";

/**
 * ErrorRetryPrompt is a component that displays an error message and provides
 * options to retry the operation or cancel. It also shows the number of retry
 * attempts if configured.
 */
const meta: Meta<typeof ErrorRetryPrompt> = {
  title: "Molecules/ErrorRetryPrompt",
  component: ErrorRetryPrompt,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    errorMessage: { control: "text" },
    onRetry: { action: "retry clicked" },
    onCancel: { action: "cancel clicked" },
    retryAttempts: { control: { type: "number", min: 0, max: 5 } },
    maxRetryAttempts: { control: { type: "number", min: 1, max: 5 } },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorRetryPrompt>;

export const Default: Story = {
  args: {
    errorMessage: "Failed to load data from the server. Please try again.",
    onRetry: fn(),
    onCancel: fn(),
    retryAttempts: 0,
    maxRetryAttempts: 3,
  },
};

export const WithoutCancelButton: Story = {
  args: {
    errorMessage: "Unable to save changes. Please retry.",
    onRetry: fn(),
    retryAttempts: 0,
    maxRetryAttempts: 3,
  },
};

export const FirstRetryAttempt: Story = {
  args: {
    errorMessage: "API request timed out. Please try again.",
    onRetry: fn(),
    onCancel: fn(),
    retryAttempts: 1,
    maxRetryAttempts: 3,
  },
};

export const SecondRetryAttempt: Story = {
  args: {
    errorMessage: "Network connection is unstable. Please try again.",
    onRetry: fn(),
    onCancel: fn(),
    retryAttempts: 2,
    maxRetryAttempts: 3,
  },
};

export const MaxAttemptsReached: Story = {
  args: {
    errorMessage:
      "Maximum retry attempts reached. Please try again later or contact support.",
    onRetry: fn(),
    onCancel: fn(),
    retryAttempts: 3,
    maxRetryAttempts: 3,
  },
};

export const LongErrorMessage: Story = {
  args: {
    errorMessage:
      "An unexpected error occurred while processing your request. Our team has been notified and is working to resolve the issue. Please try again in a few minutes or contact support if the problem persists.",
    onRetry: fn(),
    onCancel: fn(),
    retryAttempts: 1,
    maxRetryAttempts: 3,
  },
};
