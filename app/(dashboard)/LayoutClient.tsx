"use client";
import React from "react";

import "../globals.scss";
import Sidebar from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

interface LayoutClientProps {
  children: React.ReactNode;
}

export const LayoutClient: React.FC<LayoutClientProps> = ({ children }) => {
  const router = usePathname(); // get the router object
  const hideSidebarForPaths = [
    "/estimates/",
    "/invoices/",
    "/sign-up",
    "/sign-in",
    "/test",
  ];
  const showSidebar = !hideSidebarForPaths.some((path) =>
    router.startsWith(path)
  );

  if (showSidebar === true) {
    return (
      <>
        <Sidebar showSidebar={showSidebar} />
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
