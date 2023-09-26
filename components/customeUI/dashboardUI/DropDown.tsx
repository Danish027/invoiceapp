"use client";

import * as React from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { checkFilter } from "@/schema/type";

// type Checked = DropdownMenuCheckboxItemProps["checked"];

interface DropdownMenuCheckboxesProps {
  label: string;
  values: checkFilter[];
  setValues: React.Dispatch<React.SetStateAction<checkFilter[]>>;
}

export const DropdownMenuCheckboxes: React.FC<DropdownMenuCheckboxesProps> = ({
  values,
  label,
  setValues,
}) => {
  const handleChange = (index: number) => {
    const updatedValues: checkFilter[] = [...values];
    if (updatedValues !== undefined) {
      // @ts-ignore
      updatedValues[index].checked = !updatedValues[index]?.checked;
    }
    setValues(updatedValues);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 max-h-36 overflow-scroll">
        <DropdownMenuSeparator />
        {values?.map((value, index) => (
          <>
            <DropdownMenuCheckboxItem
              checked={value.checked}
              onCheckedChange={() => handleChange(index)}
            >
              <p className=" truncate w-56">{value.label}</p>
            </DropdownMenuCheckboxItem>
          </>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
