"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/trpc/react";
import {
  FolderIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  XIcon,
  SearchIcon,
} from "lucide-react";
import { Button } from "@/components/Button";
import path from "path";

interface DirectoryPickerProps {
  label: string;
  value: string;
  onChange: (path: string) => void;
  name: string;
}

export default function DirectoryPicker({
  label,
  value,
  onChange,
  name,
}: DirectoryPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Get home directory on component mount
  const { data: homeDir } = api.fileSystem.getHomeDirectory.useQuery();

  // Set initial path when homeDir data is available
  useEffect(() => {
    if (homeDir?.success && homeDir?.path && !currentPath) {
      setCurrentPath(homeDir.path);
    }
  }, [homeDir, currentPath]);

  // List directory contents
  const { data: directoryContents } = api.fileSystem.listDirectory.useQuery(
    { path: currentPath || "/" },
    { enabled: !!currentPath && isOpen },
  );

  // Navigate to directory
  const navigateToDirectory = (dirPath: string) => {
    setCurrentPath(dirPath);
    setSearchTerm(""); // Clear search when navigating
  };

  // Select directory
  const selectDirectory = (dirPath: string) => {
    onChange(dirPath);
    setIsOpen(false);
    setSearchTerm(""); // Clear search when selecting
  };

  // Filter directories based on search term
  const filteredDirectories = directoryContents?.success
    ? directoryContents.items
        .filter((item) => item.isDirectory)
        .filter((item) => !item.name.startsWith("."))
        .filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()),
        )
    : [];

  return (
    <div className="space-y-1">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-stone-700 dark:text-amber-100"
      >
        {label}
      </label>

      <div className="relative">
        <div className="flex">
          <input
            type="text"
            id={name}
            name={name}
            className="block w-full rounded-md border border-amber-300 dark:border-stone-600 
                    bg-amber-50 dark:bg-stone-800 px-2 py-1.5 text-stone-800 dark:text-amber-50 text-sm
                    focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/path/to/project"
            readOnly
          />
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="ml-1 px-2 py-1 text-sm"
          >
            Browse
          </Button>
        </div>

        {isOpen && (
          <>
            {/* Modal Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Content */}
            <div
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] max-h-[70vh] 
                          z-50 bg-amber-50 dark:bg-stone-800 rounded-lg shadow-xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-amber-300 dark:border-stone-600">
                <h2 className="text-base font-semibold text-stone-800 dark:text-amber-50">
                  Select Directory
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-0.5 hover:bg-amber-100 dark:hover:bg-stone-700 rounded-full"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </div>

              {/* Search Input */}
              <div className="px-2 py-1.5 border-b border-amber-300 dark:border-stone-600">
                <div className="relative">
                  <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-stone-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search folders..."
                    className="w-full pl-7 pr-2 py-1 text-xs rounded border border-amber-300 dark:border-stone-600 
                            bg-amber-50 dark:bg-stone-800 text-stone-800 dark:text-amber-50
                            focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Current Path Display */}
              <div className="bg-amber-100 dark:bg-stone-700 px-2 py-1.5 border-b border-amber-300 dark:border-stone-600">
                <div className="font-medium truncate text-xs">
                  {currentPath}
                </div>
              </div>

              {/* Directory Content */}
              <div className="flex-1 overflow-auto p-1 min-h-[240px]">
                {currentPath && !searchTerm && (
                  <div
                    className="px-2 py-1.5 hover:bg-amber-100 dark:hover:bg-stone-700 cursor-pointer 
                            flex items-center border-b border-amber-200 dark:border-stone-700 rounded"
                    onClick={() =>
                      navigateToDirectory(path.dirname(currentPath))
                    }
                  >
                    <ChevronDownIcon className="h-3 w-3 mr-1.5" />
                    <span className="text-sm">..</span>
                  </div>
                )}

                {directoryContents?.success ? (
                  filteredDirectories.length > 0 ? (
                    filteredDirectories.map((item) => (
                      <div
                        key={item.path}
                        className="px-2 py-1.5 hover:bg-amber-100 dark:hover:bg-stone-700 cursor-pointer 
                                flex items-center justify-between border-b border-amber-200 dark:border-stone-700 rounded"
                      >
                        <div
                          className="flex items-center flex-grow"
                          onClick={() => navigateToDirectory(item.path)}
                        >
                          <FolderIcon className="h-3 w-3 mr-1.5 text-amber-500 dark:text-amber-400" />
                          <span className="truncate text-sm">{item.name}</span>
                        </div>
                        <div className="flex items-center">
                          <button
                            className="text-xs px-2 py-0.5 bg-amber-500 text-amber-50 
                                    rounded hover:bg-amber-600 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              selectDirectory(item.path);
                            }}
                          >
                            Select
                          </button>
                          <ChevronRightIcon
                            className="h-3 w-3 ml-1.5 cursor-pointer"
                            onClick={() => navigateToDirectory(item.path)}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-center text-stone-500 dark:text-amber-300 text-sm">
                      No matching folders found
                    </div>
                  )
                ) : (
                  <div className="p-2 text-center text-stone-500 dark:text-amber-300 text-sm">
                    {directoryContents?.error || "Loading..."}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-3 py-2 border-t border-amber-300 dark:border-stone-600 flex justify-end">
                <Button
                  onClick={() => setIsOpen(false)}
                  className="px-2 py-1 text-xs"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
