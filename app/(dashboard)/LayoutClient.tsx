"use client";
import React from "react";

import "../globals.scss";
import Sidebar from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { SafeUser } from "@/schema/type";

interface LayoutClientProps {
  children: React.ReactNode;
  currentUser: SafeUser | null;
}

export const LayoutClient: React.FC<LayoutClientProps> = ({
  children,
  currentUser,
}) => {
  const router = usePathname(); // get the router object
  const hideSidebarForPaths = ["/estimates/", "/invoices/", "/auth", "/test"];
  const showSidebar = !hideSidebarForPaths.some((path) =>
    router.startsWith(path)
  );

  if (showSidebar === true) {
    return (
      <>
        <Sidebar showSidebar={showSidebar} currentUser={currentUser} />
        <div className="sm:ml-60">{children}</div>
      </>
    );
  }

  return (
    <>
      <div>{children}</div>
    </>
  );
};
