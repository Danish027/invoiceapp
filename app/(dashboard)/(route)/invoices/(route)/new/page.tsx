import React from "react";
import NewInvoiceClient from "./NewInvoiceClient";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoice - new",
  description: "...",
};
const page = () => {
  return <NewInvoiceClient />;
};

export default page;
