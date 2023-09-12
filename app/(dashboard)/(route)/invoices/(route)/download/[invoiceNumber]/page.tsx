import type { Metadata } from "next";
import DownloadInvoiceClient from "./DownloadInvoiceClient";

export const metadata: Metadata = {
  title: "Invoice - Download",
  description: "...",
};
const Page = ({ params }: { params: { invoiceNumber: string } }) => {
  const { invoiceNumber } = params;
  return <DownloadInvoiceClient invoiceNumber={invoiceNumber} />;
};

export default Page;
