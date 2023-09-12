"use client";
import useCompany from "@/actions/useCompany";
import useCustomers from "@/actions/useCustomers";
import { useInvoice } from "@/actions/useInvoices";
import useProducts from "@/actions/useProducts";
import DisplayInvoice from "@/components/Formats/DisplayInvoice";
import React from "react";

const DownloadInvoiceClient = ({
  invoiceNumber,
}: {
  invoiceNumber: string;
}) => {
  const { data: fetchedInvoice } = useInvoice(invoiceNumber);
  const { data: fetchedCompany } = useCompany();
  const { data: fetchedCustomers } = useCustomers();
  return (
    <DisplayInvoice
      fetchedCompany={fetchedCompany}
      fetchedCustomers={fetchedCustomers}
      fetchedInvoice={fetchedInvoice}
    />
  );
};

export default DownloadInvoiceClient;
