"use client";
import React from "react";
import { Company, Customer, Estimate, Invoice } from "@/schema/type";

import ModernEstimateTemplate from "./ModernEstimateTemplate";

interface DisplayInvoiceProps {
  fetchedCompany: Company;
  fetchedCustomers: Customer[];
  fetchedEstimate: Estimate;
}

const DisplayEstimate: React.FC<DisplayInvoiceProps> = ({
  fetchedCompany,
  fetchedCustomers,
  fetchedEstimate,
}) => {
  return (
    <div>
      <ModernEstimateTemplate
        company={fetchedCompany}
        customer={fetchedCustomers}
        invoiceData={fetchedEstimate}
      />
    </div>
  );
};

export default DisplayEstimate;
