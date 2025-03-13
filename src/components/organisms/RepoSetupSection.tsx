"use client";

import React, { useState } from "react";
import ButtonCloneRepo from "../atoms/ButtonCloneRepo";
import CloneRepoModal from "../molecules/CloneRepoModal";

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
    <section className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">
          Clone Starter Repository
        </h2>

        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md mb-6">
          <p className="text-blue-800 dark:text-blue-200">
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
