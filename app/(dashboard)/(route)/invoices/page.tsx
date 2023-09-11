import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Invoices",
  description: "...",
};

import React from "react";
import InvoiceClient from "./InvoiceClient";

const Page = () => {
  return (
    <div>
      <InvoiceClient />
    </div>
  );
};

export default Page;
