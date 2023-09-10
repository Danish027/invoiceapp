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
  invoiceNumber: string;
}

const DisplayInvoice: React.FC<DisplayInvoiceProps> = ({
  fetchedCompany,
  fetchedCustomers,
  invoiceNumber,
  fetchedInvoice,
}) => {
  const [show, setShow] = useState(false);
  if (show === false) {
  }
  // const [fetchedInvoice, setFetchedInvoice] = useState<Invoice>();
  // const handleClick = async () => {
  //   const invoice: Invoice = await axios.get(`/api/invoices/${invoiceNumber}`);
  //   setFetchedInvoice(invoice);
  // };
  const handleClose = () => {
    setShow(!show);
  };
  if (show === true) {
    return (
      <div className="absolute">
        {fetchedCompany?.invoiceFormat === "classic" ? (
          <ClassicInvoiceTemplate
            show={show}
            invoiceNumber={invoiceNumber}
            company={fetchedCompany}
            customer={fetchedCustomers}
            invoiceData={fetchedInvoice}
            onClick={handleClose}
          />
        ) : (
          <ModernInvoiceTemplate
            show={show}
            invoiceNumber={invoiceNumber}
            company={fetchedCompany}
            customer={fetchedCustomers}
            invoiceData={fetchedInvoice}
            onClick={handleClose}
          />
        )}
      </div>
    );
  }

  return (
    <Button
      variant={"ghost"}
      className="p-2 mr-0"
      onClick={() => {
        setShow(true);
        // handleClick();
      }}
    >
      <BiDownload size={20} />
    </Button>
  );
};

export default DisplayInvoice;
