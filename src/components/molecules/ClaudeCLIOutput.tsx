"use client";

import React from "react";

interface ClaudeCLIOutputProps {
  cliLogs: string[];
}

export const ClaudeCLIOutput: React.FC<ClaudeCLIOutputProps> = ({
  cliLogs = [],
}) => {
  return (
    <div className="border border-gray-300 rounded-md p-2 bg-black text-green-400 font-mono text-sm">
      <div className="max-h-60 overflow-auto p-2">
        {cliLogs.length === 0 ? (
          <p className="text-gray-500 italic">No logs available</p>
        ) : (
          cliLogs.map((log, index) => (
            <div key={index} className="py-0.5">
              <span className="mr-2 text-gray-500">$</span>
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClaudeCLIOutput;
