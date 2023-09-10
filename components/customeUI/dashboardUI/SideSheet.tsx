import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import React from "react";
import { IconType } from "react-icons";

interface SideSheetProps {
  label?: string;
  title?: string;
  description?: string;
  icon: IconType;
  body?: React.ReactElement;
}

const SideSheet: React.FC<SideSheetProps> = ({
  body,
  icon: Icon,
  label,
  description,
  title,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          {label}
          <Icon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <>{body}</>
        <SheetFooter className="mt-5">
          <SheetClose asChild>
            <Button type="submit" className="w-full">
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SideSheet;
