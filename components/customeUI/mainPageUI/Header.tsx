import React from "react";
import Logo from "./Logo";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/theme";
import Button from "@/components/customeUI/mainPageUI/Button";
import { Company, SafeUser } from "@/schema/type";

const Header = ({
  dashboard,
  label,
  currentUser,
}: {
  dashboard?: boolean;
  label?: string;
  currentUser?: SafeUser | null;
}) => {
  if (dashboard)
    return (
      <div className="px-4 py-1 text-foreground tracking-wide font-bold border-b border-border flex justify-between items-center">
        <div>{label}</div>
        <div className="flex gap-2 items-center text-center">
          {currentUser && <div>{currentUser.email}</div>}
          <ModeToggle />
        </div>
      </div>
    );
  return (
    <div
      className={`
      fixed
      sm:px-8
      top-0
      left-0
      w-screen
      z-50
      backdrop: border-b-[0.1px]
      bg-background
      border-neutral-400
      `}
    >
      <div
        className="
        container
        flex
        justify-between 
        items-center
        
        p-1        "
      >
        <Logo />
        <div
          className="
          flex
          items-center
          gap-2
      "
        >
          <div className="hidden sm:inline">
            <Link href="/auth">
              <Button label="Get Started" icon={HiOutlineArrowSmRight} />
            </Link>
          </div>

          <ModeToggle secondary />
        </div>
      </div>
    </div>
  );
};

export default Header;
