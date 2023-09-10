import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const Loading = () => {
  return (
    <div>
      <Skeleton className="w-full h-12" />
      <div className="p-4">
        <div className="flex justify-between items-center flex-col-reverse gap-4 sm:flex-row w-full ">
          <Skeleton className="w-2/3 h-10" />
        </div>
        <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card className="flex flex-col gap-2 p-4" key={i}>
              <div className="flex justify-between">
                <Skeleton className="w-28 h-5" />
                <Skeleton className="w-5 h-5" />
              </div>
              <div className="">
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-full h-3 mt-2" />
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="w-52 h-5" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="w-72 h-3" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="w-full h-52" />
            </CardContent>
          </Card>
        </div>
        <div className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="w-52 h-5" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="w-72 h-3" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="w-full h-52" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Loading;
