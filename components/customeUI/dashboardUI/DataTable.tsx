"use client";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
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

import SideSheet from "./SideSheet";
import { Customer, Invoice } from "@/schema/type";

import { Button } from "@/components/ui/button";
import { BiDownload, BiEdit } from "react-icons/bi";
import EmptyState from "./EmptyState";
import Link from "next/link";

interface DataTableProps {
  columns: Array<string>;
  data: Array<Invoice>;
  onChange: (status: string, id: number) => void;
  fetchedCustomers: Customer[];
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  onChange,
  fetchedCustomers,
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (fetchedCustomers !== undefined && data !== undefined) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [data, fetchedCustomers]);

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
        {loading === true ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Loading....
          </div>
        ) : (
          <>
            {data?.length === 0 ? (
              <TableBody className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <EmptyState
                  title="No Invoices found"
                  subtitle="Looks like you have no invoices."
                />
              </TableBody>
            ) : (
              <TableBody>
                {data?.slice(-30)?.map((row) => {
                  const matchingCustomer = fetchedCustomers?.find(
                    (c) => c.id === row.customerId
                  );
                  return (
                    <TableRow key={row.invoiceNumber}>
                      <TableCell className="font-medium px-3 cursor-pointer">
                        <Link href={`/invoices/${row.invoiceNumber}`}>
                          {row.invoiceNumber}
                        </Link>
                      </TableCell>
                      <TableCell className="font-medium">
                        <Link href={`/invoices/${row.invoiceNumber}`}>
                          <p className="truncate">
                            {format(new Date(row.date), "dd-MM-yyyy")}
                          </p>
                        </Link>
                      </TableCell>
                      <TableCell className="font-medium max-w-[200px]">
                        <Link href={`/invoices/${row.invoiceNumber}`}>
                          <p className="truncate">
                            {matchingCustomer
                              ? matchingCustomer.name.toUpperCase()
                              : "Unknown Customer"}
                          </p>
                        </Link>
                      </TableCell>
                      <TableCell className="font-medium">
                        {row.vehicleNumber ? row.vehicleNumber : "N/A"}
                      </TableCell>
                      <TableCell className="font-medium">
                        ₹{row.taxableAmount}
                      </TableCell>
                      <TableCell className="font-medium w-24" align="right">
                        {row.paymentStatus === "paid" && (
                          <div className="bg-green-500/50  rounded-lg w-20 text-center">
                            Paid
                          </div>
                        )}
                        {row.paymentStatus === "cancel" && (
                          <div className="bg-rose-500/50  rounded-lg w-20 text-center">
                            Cancel
                          </div>
                        )}
                        {row.paymentStatus === "pending" && (
                          <div className="bg-yellow-500/50  rounded-lg w-20 text-center">
                            Pending
                          </div>
                        )}
                      </TableCell>
                      <TableCell
                        className="w-auto cursor-pointer flex justify-center"
                        align="center"
                      >
                        <SideSheet
                          icon={BiEdit}
                          body={
                            <div className="flex flex-row ">
                              <div className="grid grid-cols-2 gap-1">
                                <div className=" ">Invoice No.</div>
                                <div className=" text-center">
                                  {row.invoiceNumber}
                                </div>
                                <div className=" ">Date</div>
                                <div className="">
                                  {format(new Date(row.date), "dd MMM yyyy")}
                                </div>
                                <div className=" ">Customer</div>
                                <div className="">
                                  {matchingCustomer
                                    ? matchingCustomer.name
                                    : "Unknown Customer"}
                                </div>
                                <div className="">Vehicle No.</div>
                                <div className="">{row.vehicleNumber}</div>
                                <div className=" ">Status</div>
                                <div>
                                  <Select
                                    onValueChange={(value) =>
                                      onChange(value.toLowerCase(), row.id)
                                    }
                                  >
                                    <SelectTrigger className="outline-none h-8 p-1 text-left">
                                      <SelectValue
                                        placeholder={row.paymentStatus}
                                        className="text-left"
                                      />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectItem value="paid">
                                          Paid
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
                        <Link href={`/invoices/download/${row?.invoiceNumber}`}>
                          <Button variant={"ghost"} className="p-2 mr-0">
                            <BiDownload size={20} />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
          </>
        )}
      </Table>
    </div>
  );
};

export default DataTable;
