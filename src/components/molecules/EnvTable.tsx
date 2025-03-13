"use client";

import React from "react";
import { EnvVariableRow } from "../atoms/EnvVariableRow";

export interface EnvVariable {
  name: string;
  value: string;
  isSecret?: boolean;
}

interface EnvTableProps {
  variables: EnvVariable[];
  onVariableChange: (index: number, newValue: string) => void;
}

export const EnvTable: React.FC<EnvTableProps> = ({
  variables,
  onVariableChange,
}) => {
  if (variables.length === 0) {
    return (
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-md text-stone-500 text-center">
        No environment variables configured yet.
      </div>
    );
  }

  return (
    <div className="border border-amber-200 rounded-md overflow-hidden">
      <div className="bg-amber-50 px-4 py-3 border-b border-amber-200 flex">
        <div className="font-semibold text-stone-700 min-w-32">
          Variable Name
        </div>
        <div className="font-semibold text-stone-700 flex-1">Value</div>
      </div>
      <div className="divide-y divide-amber-200 px-4">
        {variables.map((variable, index) => (
          <EnvVariableRow
            key={variable.name}
            variableName={variable.name}
            value={variable.value}
            isSecret={variable.isSecret}
            onValueChange={(newValue) => onVariableChange(index, newValue)}
          />
        ))}
      </div>
    </div>
  );
};

export default EnvTable;
