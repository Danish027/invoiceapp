"use client";
import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/libs/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Products } from "@/schema/type";
import { AlertDialog } from "@/components/customeUI/dashboardUI/AlertDialog";
import { AiOutlinePlus } from "react-icons/ai";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import useProducts from "@/actions/useProducts";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
type Item = {
  description: string;
  hsncode: string;
  quantity: number;
  unit: string;
  rate: number;
  amount: number;
};

interface SelectProductsProps {
  dataList: Array<Products>;
  placeholder: string;
  onSelect: (value: string, id: number, index: number) => void;
  index: number;
  item: Item;
}

const SelectProduts: React.FC<SelectProductsProps> = ({
  dataList,
  placeholder,
  onSelect,
  index,
  item,
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  React.useEffect(() => {
    setValue(item.description);
  }, [item]);
  const { mutate } = useProducts();
  const [createProduct, setCreateProducts] =
    React.useState<EmptyProducts>(emptyProducts);

  const handleCreate = React.useCallback(async () => {
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

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCreateProducts((prevState: any) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    },
    [setCreateProducts]
  );
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-full">
        <Button
          variant="link"
          role="combobox"
          aria-expanded={open}
          className="w-12 px-4 justify-between h-auto"
        >
          {/* {value ? value : placeholder} */}
          <CaretSortIcon className="h-4 w-4 p-0 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandEmpty className="p-0 text-center">
            <AlertDialog
              title="Create new Product"
              icon={AiOutlinePlus}
              buttonLabel="Create new Product"
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
          </CommandEmpty>
          <CommandGroup className="h-40 overflow-scroll">
            {dataList?.map((data) => (
              <CommandItem
                key={data.id}
                onSelect={(currentValue) => {
                  onSelect(currentValue, data.id, index);
                  setOpen(false);
                }}
              >
                {data.description}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === data.description ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectProduts;
