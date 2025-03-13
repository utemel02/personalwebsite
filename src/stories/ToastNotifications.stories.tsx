import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import ToastNotifications, {
  toast,
} from "../components/atoms/ToastNotifications";
import { useEffect } from "react";

/**
 * ToastNotifications is a wrapper around react-toastify's ToastContainer component.
 * It provides a simple way to display toast notifications in your application.
 */
const meta: Meta<typeof ToastNotifications> = {
  title: "Atoms/ToastNotifications",
  component: ToastNotifications,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "select",
      options: [
        "top-right",
        "top-center",
        "top-left",
        "bottom-right",
        "bottom-center",
        "bottom-left",
      ],
    },
    theme: {
      control: "select",
      options: ["light", "dark", "colored"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToastNotifications>;

// Helper component to demonstrate different toast types
const ToastDemonstration = ({
  type,
}: {
  type: "success" | "error" | "info" | "warning" | "all";
}) => {
  useEffect(() => {
    // Clean up previous toasts
    toast.dismiss();

    // Show the appropriate toast(s) after a short delay
    const timer = setTimeout(() => {
      if (type === "success" || type === "all") {
        toast.success("Operation completed successfully!");
      }
      if (type === "error" || type === "all") {
        toast.error("An error occurred during the operation.");
      }
      if (type === "info" || type === "all") {
        toast.info("This is an informational message.");
      }
      if (type === "warning" || type === "all") {
        toast.warning("Warning: This action cannot be undone.");
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [type]);

  return null;
};

export const SuccessToast: Story = {
  render: () => (
    <>
      <ToastNotifications />
      <ToastDemonstration type="success" />
      <div className="p-4 bg-gray-100 rounded-md">
        <button
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          onClick={() => toast.success("Success toast triggered!")}
        >
          Show Success Toast
        </button>
      </div>
    </>
  ),
};

export const ErrorToast: Story = {
  render: () => (
    <>
      <ToastNotifications />
      <ToastDemonstration type="error" />
      <div className="p-4 bg-gray-100 rounded-md">
        <button
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          onClick={() => toast.error("Error toast triggered!")}
        >
          Show Error Toast
        </button>
      </div>
    </>
  ),
};

export const InfoToast: Story = {
  render: () => (
    <>
      <ToastNotifications />
      <ToastDemonstration type="info" />
      <div className="p-4 bg-gray-100 rounded-md">
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => toast.info("Info toast triggered!")}
        >
          Show Info Toast
        </button>
      </div>
    </>
  ),
};

export const WarningToast: Story = {
  render: () => (
    <>
      <ToastNotifications />
      <ToastDemonstration type="warning" />
      <div className="p-4 bg-gray-100 rounded-md">
        <button
          className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
          onClick={() => toast.warning("Warning toast triggered!")}
        >
          Show Warning Toast
        </button>
      </div>
    </>
  ),
};

export const AllToasts: Story = {
  render: () => (
    <>
      <ToastNotifications />
      <ToastDemonstration type="all" />
      <div className="p-4 bg-gray-100 rounded-md flex flex-col space-y-2">
        <button
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          onClick={() => toast.success("Success toast triggered!")}
        >
          Show Success Toast
        </button>
        <button
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          onClick={() => toast.error("Error toast triggered!")}
        >
          Show Error Toast
        </button>
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => toast.info("Info toast triggered!")}
        >
          Show Info Toast
        </button>
        <button
          className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
          onClick={() => toast.warning("Warning toast triggered!")}
        >
          Show Warning Toast
        </button>
      </div>
    </>
  ),
};
