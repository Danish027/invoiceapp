import React from "react";

import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Invoiceapp",
  description: "Make invoice easy",
};

const page = () => {
  return <ClientPage />;
};

export default page;
