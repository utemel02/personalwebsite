"use client";

import React, { useState } from "react";
import ButtonCloneRepo from "../atoms/ButtonCloneRepo";
import CloneRepoModal from "../molecules/CloneRepoModal";
import { GitBranch } from "lucide-react";

interface RepoSetupSectionProps {
  onCloneSuccess?: () => void;
}

export const RepoSetupSection: React.FC<RepoSetupSectionProps> = ({
  onCloneSuccess,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCloning, setIsCloning] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmClone = () => {
    // Here we would typically call a backend API to do the actual cloning
    // For now, we'll just simulate it with a timeout
    setIsCloning(true);

    setTimeout(() => {
      setIsCloning(false);
      setIsModalOpen(false);

      // Notify parent of success
      if (onCloneSuccess) {
        onCloneSuccess();
      }
    }, 2000);
  };

  return (
    <section className="bg-amber-50 dark:bg-stone-800 p-6 rounded-lg shadow-sm border border-amber-200 dark:border-stone-700">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-4">
          <GitBranch className="h-6 w-6 text-amber-600 dark:text-amber-400 mr-3" />
          <h2 className="text-2xl font-display font-bold text-stone-800 dark:text-amber-50">
            Clone Starter Repository
          </h2>
        </div>

        <div className="bg-amber-100/50 dark:bg-amber-900/20 p-4 rounded-md mb-6 border border-amber-200 dark:border-amber-800">
          <p className="text-stone-700 dark:text-amber-100">
            To get started, you'll need to clone the starter repository. This
            will create a copy of the template in your local environment,
            allowing you to build your project on a solid foundation.
          </p>
        </div>

        <div className="flex justify-end">
          <ButtonCloneRepo
            label="Clone Starter Repo"
            onClick={handleOpenModal}
          />
        </div>
      </div>

      <CloneRepoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirmClone={handleConfirmClone}
        isLoading={isCloning}
      />
    </section>
  );
};

export default RepoSetupSection;
