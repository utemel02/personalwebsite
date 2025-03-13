"use client";

import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastNotificationsProps {
  position?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";
  autoClose?: number;
  hideProgressBar?: boolean;
  newestOnTop?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  theme?: "light" | "dark" | "colored";
}

/**
 * ToastNotifications component that wraps react-toastify's ToastContainer
 * with default settings and re-exports toast functions.
 */
const ToastNotifications: React.FC<ToastNotificationsProps> = ({
  position = "top-right",
  autoClose = 5000,
  hideProgressBar = false,
  newestOnTop = false,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = true,
  theme = "light",
}) => {
  return (
    <ToastContainer
      position={position}
      autoClose={autoClose}
      hideProgressBar={hideProgressBar}
      newestOnTop={newestOnTop}
      closeOnClick={closeOnClick}
      pauseOnHover={pauseOnHover}
      draggable={draggable}
      theme={theme}
    />
  );
};

// Re-export toast functions for easy access
export { toast };
export default ToastNotifications;
