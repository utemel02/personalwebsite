import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useEffect, useState } from "react";
import OperationRetryFlow from "../components/organisms/OperationRetryFlow";
import ToastNotifications, {
  toast,
} from "../components/atoms/ToastNotifications";

/**
 * OperationRetryFlow is a component that manages retrying operations when they fail.
 * It pairs ErrorRetryPrompt with additional messaging and a retry state tracker.
 */
const meta: Meta<typeof OperationRetryFlow> = {
  title: "Organisms/OperationRetryFlow",
  component: OperationRetryFlow,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    operationInfo: { control: "object" },
    maxRetryAttempts: { control: { type: "number", min: 1, max: 5 } },
    initialError: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="p-6 max-w-md border rounded-lg shadow-sm">
        <ToastNotifications />
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof OperationRetryFlow>;

// Reusable mock functions for stories
const createMockRetry = (shouldSucceed: boolean, delayMs: number = 1000) => {
  return async () => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (shouldSucceed) {
          resolve();
        } else {
          reject(new Error("Operation failed. Please try again."));
        }
      }, delayMs);
    });
  };
};

// Demo wrapper component that shows retry flow with controls
const DemoWithControls = ({
  initialShouldSucceed = false,
  operationInfo,
  maxRetryAttempts = 3,
  initialError = "The operation failed. Please try again or cancel.",
}: {
  initialShouldSucceed?: boolean;
  operationInfo: { name: string; description?: string };
  maxRetryAttempts?: number;
  initialError?: string;
}) => {
  const [shouldSucceed, setShouldSucceed] = useState(initialShouldSucceed);

  return (
    <div>
      <div className="mb-4 p-3 bg-gray-50 rounded border">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={shouldSucceed}
            onChange={(e) => setShouldSucceed(e.target.checked)}
          />
          <span>Succeed on next retry</span>
        </label>
        <p className="text-xs text-gray-500 mt-1">
          Toggle this to control whether the next retry will succeed or fail
        </p>
      </div>

      <OperationRetryFlow
        operationInfo={operationInfo}
        onRetry={createMockRetry(shouldSucceed)}
        onCancel={() => toast.info("Operation canceled")}
        maxRetryAttempts={maxRetryAttempts}
        initialError={initialError}
        onMaxRetriesReached={() =>
          toast.error("Max retries reached! Consider trying again later.")
        }
      />
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <DemoWithControls
      operationInfo={{
        name: "Data Synchronization",
        description: "Synchronizing your local data with the server",
      }}
    />
  ),
};

export const APIOperation: Story = {
  render: () => (
    <DemoWithControls
      operationInfo={{
        name: "API Call",
        description: "Fetching data from external API",
      }}
      initialError="The API request failed with status code 500. Server may be temporarily unavailable."
    />
  ),
};

export const FileUpload: Story = {
  render: () => (
    <DemoWithControls
      operationInfo={{
        name: "File Upload",
        description: "Uploading your document to the server",
      }}
      initialError="File upload failed due to network timeout. Check your connection and try again."
    />
  ),
};

export const LowRetryLimit: Story = {
  render: () => (
    <DemoWithControls
      operationInfo={{
        name: "Critical Operation",
        description: "Performing critical system update",
      }}
      maxRetryAttempts={1}
      initialError="Critical operation failed. Only one retry is allowed for this operation."
    />
  ),
};

// Demo showing a loading state initially
const LoadingDemo = () => {
  const [isRetrying, setIsRetrying] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRetrying(false);
      setError("Operation timed out. Server did not respond in time.");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isRetrying) {
    return (
      <div className="text-sm text-blue-600 flex items-center">
        <div className="mr-2 h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        Performing operation...
      </div>
    );
  }

  if (error) {
    return (
      <OperationRetryFlow
        operationInfo={{
          name: "Data Processing",
          description: "Processing your data through our algorithms",
        }}
        onRetry={createMockRetry(true, 1500)}
        maxRetryAttempts={3}
        initialError={error}
      />
    );
  }

  return null;
};

export const InitialLoadingState: Story = {
  render: () => <LoadingDemo />,
};
