"use client";
import React, { useState } from "react";
import { Company, Customer, Invoice } from "@/schema/type";

import { Button } from "@/components/ui/button";
import ClassicInvoiceTemplate from "@/components/Formats/ClassicInvoiceTemplate";
import { BiDownload } from "react-icons/bi";
import ModernInvoiceTemplate from "./ModernInvoiceTemplate";

interface DisplayInvoiceProps {
  fetchedCompany: Company;
  fetchedCustomers: Customer[];
  fetchedInvoice: Invoice;
}

const DisplayInvoice: React.FC<DisplayInvoiceProps> = ({
  fetchedCompany,
  fetchedCustomers,
  fetchedInvoice,
}) => {
  return (
    <div>
      {fetchedCompany?.invoiceFormat === "classic" ? (
        <ClassicInvoiceTemplate
          company={fetchedCompany}
          customer={fetchedCustomers}
          invoiceData={fetchedInvoice}
        />
      ) : (
        <ModernInvoiceTemplate
          company={fetchedCompany}
          customer={fetchedCustomers}
          invoiceData={fetchedInvoice}
        />
      )}
    </div>
  );
};

export default DisplayInvoice;
