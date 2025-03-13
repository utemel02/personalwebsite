import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import DashboardPage from "../app/(dashboard)/page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Wrapper component to include toast container
const DashboardPageWithToast = () => (
  <>
    <DashboardPage />
    <ToastContainer />
  </>
);

const meta: Meta<typeof DashboardPageWithToast> = {
  title: "Pages/DashboardPage",
  component: DashboardPageWithToast,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof DashboardPageWithToast>;

export const Default: Story = {};
