"use client";
import { format } from "date-fns";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BsFillEyeFill } from "react-icons/bs";
import SideSheet from "./SideSheet";
import { Company, Customer, Estimate, Invoice } from "@/schema/type";
import useCustomers from "@/actions/useCustomers";
import { Button } from "@/components/ui/button";
import { BiDownload, BiEdit } from "react-icons/bi";
import EmptyState from "./EmptyState";
import Link from "next/link";
import DisplayEstimate from "@/components/Formats/DisplayEstimate";

interface DataTableProps {
  columns: Array<string>;
  data: Array<Estimate>;
  onChange: (status: string, id: number) => void;
  fetchedCustomers: Customer[];
  fetchedCompany: Company;
}

const DataTableEstimates: React.FC<DataTableProps> = ({
  columns,
  data,
  onChange,
  fetchedCustomers,
  fetchedCompany,
}) => {
  return (
    <div className="border rounded-md h-[70vh] overflow-scroll relative">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => {
              const title = column;
              if (column === "Status") {
                return (
                  <TableHead key={column} className="text-center">
                    {column}
                  </TableHead>
                );
              }
              return <TableHead key={column}>{column}</TableHead>;
            })}

            <TableHead align="center" className="text-center">
              Options
            </TableHead>
          </TableRow>
        </TableHeader>
        {data?.length === 0 ? (
          <TableBody className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <EmptyState
              title="No Estimates found"
              subtitle="Looks like you have no estimates."
            />
          </TableBody>
        ) : (
          <TableBody>
            {data?.map((row) => {
              const matchingCustomer = fetchedCustomers?.find(
                (c) => c.id === row.companyId
              );
              return (
                <TableRow key={row.estimateNumber}>
                  <TableCell className="font-medium px-3 cursor-pointer">
                    {" "}
                    <Link href={`/estimates/${row.estimateNumber}`}>
                      {row.estimateNumber}
                    </Link>
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link href={`/estimates/${row.estimateNumber}`}>
                      {format(new Date(row.date), "dd-MM-yyyy")}
                    </Link>
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link href={`/estimates/${row.estimateNumber}`}>
                      {matchingCustomer
                        ? matchingCustomer.name.toUpperCase()
                        : "Unknown Customer"}
                    </Link>
                  </TableCell>
                  <TableCell className="font-medium">
                    {row.vehicleNumber}
                  </TableCell>
                  <TableCell className="font-medium">
                    ₹{row.taxableAmount}
                  </TableCell>
                  <TableCell className="font-medium w-24" align="right">
                    {row.approvalStatus === "approved" && (
                      <div className="bg-green-500/50  rounded-lg w-20 text-center">
                        Approved
                      </div>
                    )}
                    {row.approvalStatus === "cancel" && (
                      <div className="bg-rose-500/50  rounded-lg w-20 text-center">
                        Cancel
                      </div>
                    )}
                    {row.approvalStatus === "pending" && (
                      <div className="bg-yellow-500/50  rounded-lg w-20 text-center">
                        Pending
                      </div>
                    )}
                  </TableCell>
                  <TableCell
                    className="w-auto cursor-pointer flex"
                    align="right"
                  >
                    <SideSheet
                      icon={BiEdit}
                      body={
                        <div className="flex flex-row ">
                          <div className="grid grid-cols-2 gap-1">
                            <p className="">Invoice No.</p>
                            <p className=" text-center">{row.estimateNumber}</p>
                            <p className="">Date</p>
                            <p className="">
                              {format(new Date(row.date), "dd MMM yyyy")}
                            </p>
                            <p className=" ">Customer</p>
                            <p className=" ">
                              {matchingCustomer
                                ? matchingCustomer.name
                                : "Unknown Customer"}
                            </p>
                            <p className=" ">Vehicle No.</p>
                            <p className="">{row.vehicleNumber}</p>
                            <p className="">Status</p>
                            <div>
                              <Select
                                onValueChange={(value) =>
                                  onChange(value.toLowerCase(), row.id)
                                }
                              >
                                <SelectTrigger className="outline-none h-8 p-1 text-left">
                                  <SelectValue
                                    placeholder={row.approvalStatus}
                                    className="text-left"
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="approved">
                                      Approved
                                    </SelectItem>
                                    <SelectItem value="pending">
                                      Pending
                                    </SelectItem>
                                    <SelectItem value="cancel">
                                      Canceled
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      }
                    />
                    <DisplayEstimate
                      fetchedCompany={fetchedCompany}
                      fetchedCustomers={fetchedCustomers}
                      fetchedEstimate={row}
                      invoiceNumber={row?.estimateNumber}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default DataTableEstimates;
