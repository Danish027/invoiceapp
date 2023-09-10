import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div>
      <Skeleton className="w-full h-12" />
      <div className="p-4">
        <Skeleton className="w-full h-8" />
      </div>
    </div>
  );
};

export default loading;
