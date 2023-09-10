import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
        <div className="border rounded-md h-[70vh] mt-4 overflow-scroll relative">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Skeleton className="w-10 h-6" />
                </TableHead>
                <TableHead className="w-80">
                  <Skeleton className="w-80 h-6" />
                </TableHead>
                <TableHead>
                  <Skeleton className="w-25 h-6" />
                </TableHead>
                <TableHead>
                  <Skeleton className="w-25 h-6" />
                </TableHead>
                <TableHead>
                  <Skeleton className="w-25 h-6" />
                </TableHead>
                <TableHead>
                  <Skeleton className="w-25 h-6" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="w-10 h-5" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-full h-5" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-full h-5" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-full h-5" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-full h-5" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-full h-5" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default loading;
