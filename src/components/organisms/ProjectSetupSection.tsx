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
    <div className="bg-amber-50 dark:bg-stone-800 rounded-lg shadow-md p-6 max-w-3xl mx-auto border border-amber-200 dark:border-stone-700">
      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold text-stone-800 dark:text-amber-50 mb-3">
          Configure Project Details
        </h2>
        <p className="text-stone-600 dark:text-amber-200">
          Fill out these details to set up your project metadata. This
          information will be used to configure your project and generate the
          necessary documentation.
        </p>
      </div>

      <div className="border-t border-amber-200 dark:border-stone-700 pt-6">
        <ProjectDetailsForm onSubmit={onSubmit} initialData={initialData} />
      </div>
    </div>
  );
};

export default ProjectSetupSection;
