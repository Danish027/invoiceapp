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
import { Customer } from "@/schema/type";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";

import { AiOutlinePlus } from "react-icons/ai";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertDialog } from "@/components/customeUI/dashboardUI/AlertDialog";
const emptyCustomer = {
  name: "",
  addressLine1: "",
  addressLine2: "",
  state: "",
  gstin: "",
};
interface CustomerSelectProps {
  customerList: Array<Customer>;
  onChange: (customerId: number) => void;
  mutate: () => void;
  customerId?: number;
}

export const CustomerSelect: React.FC<CustomerSelectProps> = ({
  customerList,
  onChange,
  mutate,
  customerId,
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [createCustomer, setCreateCustomer] = React.useState(emptyCustomer);
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCreateCustomer((prevState: any) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    },
    [setCreateCustomer]
  );

  React.useEffect(() => {
    if (customerId !== undefined) {
      const selectedCustomer = customerList?.find(
        (customer) => customer.id === customerId
      );

      if (selectedCustomer) {
        setValue(selectedCustomer.name);
      }
    } else {
      setValue("");
    }
  }, [customerId, customerList]);

  const handleSubmit = React.useCallback(async () => {
    const { addressLine1, addressLine2, gstin, name, state } = createCustomer;
    try {
      await axios.post("/api/customers", {
        name,
        addressLine1,
        addressLine2,
        gstin,
        state,
      });
      toast({
        description: "Created Customer",
      });
      mutate();
    } catch (error: any) {
      toast({
        description: "Something went wrong!!!",
      });
    }
    setCreateCustomer(emptyCustomer);
  }, [createCustomer, mutate]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <p className="truncate ">{value ? value : "Select Customer..."}</p>
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] h-auto p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandEmpty>
            <AlertDialog
              icon={AiOutlinePlus}
              buttonLabel="Create New Customer"
              submitlabel="Create"
              primary
              onClick={handleSubmit}
              buttonSecondaryLabel="Cancel"
              body={
                <div className="flex flex-col gap-2 w-full">
                  <div>
                    <Label className="pl-1">Company Name</Label>
                    <Input
                      placeholder="e.g. Transport Corporation of India"
                      name="name"
                      value={createCustomer.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label className="pl-1">Address Line 1</Label>
                    <Input
                      name="addressLine1"
                      placeholder="e.g. Bidadi Industrial Area"
                      value={createCustomer.addressLine1}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label className="pl-1">Address Line 2</Label>
                    <Input
                      placeholder="e.g. Bangalore"
                      name="addressLine2"
                      value={createCustomer.addressLine2}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label className="pl-1">GSTIN No.</Label>
                    <Input
                      name="gstin"
                      placeholder="e.g. 29ASHW134532AS"
                      value={createCustomer.gstin}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label className="pl-1">State / Code</Label>
                    <Input
                      name="state"
                      placeholder="e.g. Karnataka-29"
                      value={createCustomer.state}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              }
            />
          </CommandEmpty>
          <CommandGroup>
            {customerList?.map((customer) => (
              <CommandItem
                key={customer.id}
                onSelect={(currentValue) => {
                  setValue(
                    currentValue.toUpperCase() === value
                      ? ""
                      : currentValue.toUpperCase()
                  );
                  setOpen(false);
                  onChange(customer.id);
                }}
              >
                {customer.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === customer.name ? "opacity-100" : "opacity-0"
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
