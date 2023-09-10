import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div>
      <Skeleton className="w-full h-12" />
      <div className="p-4">
        <div className="flex justify-between items-center flex-col-reverse gap-4 sm:flex-row w-full ">
          <Skeleton className="w-2/3 h-8" />
          <Skeleton className="w-28 h-8" />
          <Skeleton className="w-28 h-8" />
        </div>
        <div className="h-[70vh] mt-4 ">
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 ">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <Skeleton className="h-[140px] bg-card" key={index}>
                <div className="m-4 flex flex-col gap-3">
                  <Skeleton className="w-full h-3 bg-muted-foreground/10 " />
                  <Skeleton className="w-full h-3 bg-muted-foreground/10 " />
                  <Skeleton className="w-full h-3 bg-muted-foreground/10 " />
                  <Skeleton className="w-full h-3 bg-muted-foreground/10 " />
                  <Skeleton className="w-full h-3 bg-muted-foreground/10 " />
                </div>
              </Skeleton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;
