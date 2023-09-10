import { Products } from "@/schema/type";
import React, { useCallback, useEffect, useState } from "react";
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

import useProducts from "@/actions/useProducts";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
interface ProductsTableRowProps {
  row: Products;
  index: number;
}

const ProductsTableRow: React.FC<ProductsTableRowProps> = ({ row, index }) => {
  const { mutate } = useProducts();
  const [editProduct, setEditProduct] = useState<Products>(row);

  useEffect(() => {
    setEditProduct(row);
  }, [row]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditProduct((prevState: any) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    },
    [setEditProduct]
  );

  const handleEdit = useCallback(async () => {
    let { description, hnsCode, id, quantity, rate, unit } = editProduct;
    quantity = +quantity;
    rate = +rate;
    try {
      await axios.put("/api/products", {
        description,
        hnsCode,
        id,
        quantity,
        rate,
        unit,
      });
      toast({
        description: "Changes Saved",
      });
      mutate();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  }, [editProduct, mutate]);

  const handleDelete = useCallback(async () => {
    const { id } = editProduct;
    try {
      await axios.delete(`/api/products/${id}`);
      toast({
        description: "Product Deleted",
      });
      mutate();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  }, [editProduct, mutate]);

  return (
    <TableRow key={row.id}>
      <TableCell className="w-14 text-center">{index + 1}</TableCell>
      <TableCell className="">{row.description}</TableCell>
      <TableCell className="font-medium w-28">{row.hnsCode}</TableCell>
      <TableCell className="font-medium w-24">{row.quantity}</TableCell>
      <TableCell className="font-medium">{row.unit}</TableCell>
      <TableCell className="font-medium ">{row.rate}</TableCell>

      <TableCell className="w-24 cursor-pointer flex" align="left">
        <AlertDialog
          icon={LuEdit}
          onClick={handleEdit}
          title="Edit Customer"
          submitlabel="Save changes"
          buttonSecondaryLabel="Cancel"
          ghost
          body={
            <div className="flex flex-col gap-2 w-full">
              <div>
                <Label className="pl-1">Description</Label>
                <Input
                  placeholder="Description"
                  type="text"
                  value={editProduct.description}
                  name="description"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="pl-1">HSN Code </Label>
                <Input
                  placeholder="Enter HSN Code"
                  type="text"
                  value={editProduct.hnsCode}
                  name="hnsCode"
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label className="pl-1">Quantity</Label>
                <Input
                  placeholder="Enter the Quantity"
                  type="number"
                  value={editProduct.quantity}
                  name="quantity"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="pl-1">Unit</Label>
                <Input
                  placeholder="Select SI Unit"
                  type="text"
                  value={editProduct.unit}
                  name="unit"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label className="pl-1">Rate</Label>
                <Input
                  placeholder="Enter the Rate per piece"
                  type="number"
                  value={editProduct.rate}
                  name="rate"
                  onChange={handleChange}
                />
              </div>
            </div>
          }
        />
        <AlertDialog
          icon={AiOutlineDelete}
          onClick={handleDelete}
          title="Are you sure you want to delete?"
          description="Once you have deleted this customer, it won't be available"
          submitlabel="Delete"
          buttonSecondaryLabel="Cancel"
          ghost
        />
      </TableCell>
    </TableRow>
  );
};

export default ProductsTableRow;
