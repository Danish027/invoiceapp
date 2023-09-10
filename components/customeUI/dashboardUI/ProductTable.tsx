import React, { useCallback, useState } from "react";
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BsFillEyeFill } from "react-icons/bs";
import { LuEdit } from "react-icons/lu";
import { Label } from "recharts";
import { Input } from "@/components/ui/input";
import { AlertDialog } from "@/components/customeUI/dashboardUI/AlertDialog";
import { AiOutlineDelete } from "react-icons/ai";
import { Products } from "@/schema/type";
import useProducts from "@/actions/useProducts";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import ProductsTableRow from "./ProductsTableRow";
import EmptyState from "./EmptyState";

type Invoice = {
  invoice: number;
  date: string;
  company: string;
  vehicleNumber: string;
  amount: number;
  payment: string;
};

interface DataTableProps {
  columns: Array<string>;
  data: Array<Products>;
}

const ProductTable: React.FC<DataTableProps> = ({ columns, data }) => {
  return (
    <div className="border rounded-md h-[70vh] overflow-scroll relative">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
            <TableHead className="w-32 text-center">View</TableHead>
          </TableRow>
        </TableHeader>
        {data?.length === 0 ? (
          <TableBody className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <EmptyState
              title="No Products found"
              subtitle="Looks like you have no products."
            />
          </TableBody>
        ) : (
          <TableBody>
            {data?.map((row, index) => (
              <ProductsTableRow key={index} index={index} row={row} />
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default ProductTable;
