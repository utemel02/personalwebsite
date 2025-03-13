"use client";

import React from "react";
import {
  ProjectDetailsForm,
  ProjectDetails,
} from "../molecules/ProjectDetailsForm";

interface ProjectSetupSectionProps {
  onSubmit: (data: ProjectDetails) => void;
  initialData?: ProjectDetails;
}

export const ProjectSetupSection: React.FC<ProjectSetupSectionProps> = ({
  onSubmit,
  initialData,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Configure Project Details
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Fill out these details to set up your project metadata. This
          information will be used to configure your project and generate the
          necessary documentation.
        </p>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <ProjectDetailsForm onSubmit={onSubmit} initialData={initialData} />
      </div>
    </div>
  );
};

export default ProjectSetupSection;
