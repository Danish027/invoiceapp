"use client";
import React, { useState } from "react";
import { Company, Customer, Estimate, Invoice } from "@/schema/type";

import { Button } from "@/components/ui/button";
import ClassicInvoiceTemplate from "@/components/Formats/ClassicInvoiceTemplate";
import { BiDownload } from "react-icons/bi";
import ModernInvoiceTemplate from "./ModernInvoiceTemplate";

import ModernEstimateTemplate from "./ModernEstimateTemplate";

interface DisplayInvoiceProps {
  fetchedCompany: Company;
  fetchedCustomers: Customer[];
  fetchedEstimate: Estimate;
  invoiceNumber: string;
}

const DisplayEstimate: React.FC<DisplayInvoiceProps> = ({
  fetchedCompany,
  fetchedCustomers,
  invoiceNumber,
  fetchedEstimate,
}) => {
  const [show, setShow] = useState(false);
  if (show === false) {
  }

  const handleClose = () => {
    setShow(!show);
  };
  if (show === true) {
    return (
      <div className="absolute">
        <ModernEstimateTemplate
          show={show}
          invoiceNumber={invoiceNumber}
          company={fetchedCompany}
          customer={fetchedCustomers}
          invoiceData={fetchedEstimate}
          onClick={handleClose}
        />
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

export default DisplayEstimate;
