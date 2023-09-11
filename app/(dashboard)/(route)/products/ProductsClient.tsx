"use client";
import React, { useCallback, useEffect, useState } from "react";
import Header from "@/components/customeUI/mainPageUI/Header";
import { Input } from "@/components/ui/input";
import { BsCloudDownload } from "react-icons/bs";
import { DropdownMenuCheckboxes } from "@/components/customeUI/dashboardUI/DropDown";
import { AiOutlinePlus } from "react-icons/ai";
import { AlertDialog } from "@/components/customeUI/dashboardUI/AlertDialog";
import ProductTable from "@/components/customeUI/dashboardUI/ProductTable";
import { Label } from "@/components/ui/label";
import useProducts from "@/actions/useProducts";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { Products } from "@/schema/type";
import { downloadToExcelProducts } from "@/libs/xlsx";

const columms = [
  "Sl No",
  "Description",
  "HSN Code",
  "Quantity",
  "Unit",
  "Rate",
];
const emptyProducts = {
  description: "",
  hnsCode: "",
  quantity: 0,
  unit: "",
  rate: 0,
};
type EmptyProducts = {
  description: string;
  hnsCode: string;
  quantity: number;
  unit: string;
  rate: number;
};
const ProductsClient = () => {
  const { data: fetchedProducts, mutate } = useProducts();

  const [products, setProducts] = useState<Products[]>(fetchedProducts);
  const [filteredProducts, setFilteredProducts] =
    useState<Products[]>(fetchedProducts);
  const [length, setLenght] = useState(products?.length);
  const [createProduct, setCreateProducts] =
    useState<EmptyProducts>(emptyProducts);

  const downloadBody = (
    <div className="grid w-full grid-cols-2 gap-4 mt-4"></div>
  );

  useEffect(() => {
    setProducts(fetchedProducts);
    setFilteredProducts(fetchedProducts); // Initialize filtered products
  }, [fetchedProducts]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = products.filter((product) =>
      product.description.toLowerCase().includes(searchValue)
    );
    setFilteredProducts(filtered);
  };

  const handleCreate = useCallback(async () => {
    let { description, hnsCode, quantity, rate, unit } = createProduct;
    quantity = +quantity;
    rate = +rate;
    try {
      await axios.post("/api/products", {
        description,
        hnsCode,
        quantity,
        rate,
        unit,
      });
      toast({
        description: "Created Product",
      });
      mutate();
    } catch (error: any) {
      toast({
        description: "Something went wrong!!!",
      });
    }
    setCreateProducts(emptyProducts);
  }, [createProduct, mutate]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCreateProducts((prevState: any) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    },
    [setCreateProducts]
  );
  return (
    <div className="min-h-screen">
      <Header dashboard label="Products" />
      <div className="p-4">
        <div className="flex items-center ">
          <div className="flex justify-between items-center flex-col-reverse gap-4 sm:flex-row w-full ">
            <Input
              className="w-full sm:w-2/3"
              placeholder="Type a command or search...."
              onChange={handleSearchChange} // Use handleSearchChange here
            />

            <div className="flex gap-3 items-center">
              <AlertDialog
                body={downloadBody}
                buttonLabel="Download"
                description="Are You sure you want to download!"
                submitlabel="Download"
                title="Download Dialog"
                buttonSecondaryLabel="Cancel"
                icon={BsCloudDownload}
                onClick={() => {
                  downloadToExcelProducts(products);
                }}
                outline
              />
              <AlertDialog
                title="Create new Product"
                icon={AiOutlinePlus}
                buttonLabel="Create"
                submitlabel="Create"
                primary
                onClick={handleCreate}
                buttonSecondaryLabel="Cancel"
                body={
                  <div className="flex flex-col gap-2 w-full">
                    <div>
                      <Label className="pl-1">Product Description</Label>
                      <Input
                        placeholder="e.g. Full Vehicle Painting "
                        name="description"
                        value={createProduct.description}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <Label className="pl-1">HSN Code </Label>
                      <Input
                        name="hnsCode"
                        placeholder="e.g. 998711"
                        value={createProduct.hnsCode}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <Label className="pl-1">Quantity</Label>
                      <Input
                        name="quantity"
                        type="number"
                        placeholder="e.g. 100"
                        value={createProduct.quantity}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label className="pl-1">Unit</Label>
                      <Input
                        placeholder="e.g. Nos"
                        name="unit"
                        value={createProduct.unit}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label className="pl-1">Rate</Label>
                      <Input
                        placeholder="e.g. 10"
                        name="rate"
                        type="number"
                        value={createProduct.rate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        </div>
        <div className="py-4">
          <ProductTable columns={columms} data={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductsClient;
