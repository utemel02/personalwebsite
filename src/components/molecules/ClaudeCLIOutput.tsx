"use client";

import React from "react";

interface ClaudeCLIOutputProps {
  cliLogs: string[];
}

export const ClaudeCLIOutput: React.FC<ClaudeCLIOutputProps> = ({
  cliLogs = [],
}) => {
  return (
    <div className="border border-amber-300 rounded-md p-2 bg-stone-800 text-emerald-400 font-mono text-sm">
      <div className="max-h-60 overflow-auto p-2">
        {cliLogs.length === 0 ? (
          <p className="text-amber-300 italic">No logs available</p>
        ) : (
          cliLogs.map((log, index) => (
            <div key={index} className="py-0.5">
              <span className="mr-2 text-amber-400">$</span>
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClaudeCLIOutput;
