import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Invoices",
  description: "...",
};

import React from "react";
import InvoiceClient from "./InvoiceClient";
import getCurrentUser from "@/actions/getCurrentUser";
import EmptyState from "@/components/customeUI/dashboardUI/EmptyState";

const Page = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser === null) {
    return (
      <div className="w-full h-screen">
        <EmptyState
          title="Unauthorized"
          subtitle="Please log in to access your dashboard."
          showButton
        />
      </div>
    );
  }

  return (
    <div>
      <InvoiceClient />
    </div>
  );
};

export default Page;
