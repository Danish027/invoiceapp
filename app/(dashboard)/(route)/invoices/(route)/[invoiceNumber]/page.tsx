import EditInvoiceClient from "./EditInvoiceClient";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoice - edit",
  description: "...",
};
const Page = ({ params }: { params: { invoiceNumber: string } }) => {
  const { invoiceNumber } = params;
  return <EditInvoiceClient invoiceNumber={invoiceNumber} />;
};

export default Page;
