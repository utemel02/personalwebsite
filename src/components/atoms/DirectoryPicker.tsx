"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/lib/trpc/react";
import { FolderIcon, ChevronRightIcon, ChevronDownIcon } from "lucide-react";
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
  };

  // Select directory
  const selectDirectory = (dirPath: string) => {
    onChange(dirPath);
    setIsOpen(false);
  };

  return (
    <div className="space-y-2">
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
                    bg-amber-50 dark:bg-stone-800 px-3 py-2 text-stone-800 dark:text-amber-50
                    focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/path/to/project"
            readOnly
          />
          <Button onClick={() => setIsOpen(!isOpen)} className="ml-2 px-3">
            Browse
          </Button>
        </div>

        {isOpen && (
          <div
            className="absolute mt-1 w-full max-h-80 overflow-auto z-10 
                      bg-amber-50 dark:bg-stone-800 rounded-md border border-amber-300 
                      dark:border-stone-600 shadow-lg"
          >
            <div className="sticky top-0 bg-amber-100 dark:bg-stone-700 p-2 border-b border-amber-300 dark:border-stone-600">
              <div className="font-medium truncate">{currentPath}</div>
            </div>

            {currentPath && (
              <div
                className="p-2 hover:bg-amber-100 dark:hover:bg-stone-700 cursor-pointer 
                        flex items-center border-b border-amber-200 dark:border-stone-700"
                onClick={() => navigateToDirectory(path.dirname(currentPath))}
              >
                <ChevronDownIcon className="h-4 w-4 mr-1" />
                <span>..</span>
              </div>
            )}

            {directoryContents?.success ? (
              directoryContents.items
                .filter((item) => item.isDirectory)
                .map((item) => (
                  <div
                    key={item.path}
                    className="p-2 hover:bg-amber-100 dark:hover:bg-stone-700 cursor-pointer 
                            flex items-center justify-between border-b border-amber-200 dark:border-stone-700"
                  >
                    <div
                      className="flex items-center flex-grow"
                      onClick={() => navigateToDirectory(item.path)}
                    >
                      <FolderIcon className="h-4 w-4 mr-2 text-amber-500 dark:text-amber-400" />
                      <span className="truncate">{item.name}</span>
                    </div>
                    <div className="flex items-center">
                      <button
                        className="text-xs px-2 py-1 bg-amber-500 text-amber-50 
                                rounded hover:bg-amber-600 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          selectDirectory(item.path);
                        }}
                      >
                        Select
                      </button>
                      <ChevronRightIcon
                        className="h-4 w-4 ml-1 cursor-pointer"
                        onClick={() => navigateToDirectory(item.path)}
                      />
                    </div>
                  </div>
                ))
            ) : (
              <div className="p-4 text-center text-stone-500 dark:text-amber-300">
                {directoryContents?.error || "Loading..."}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
