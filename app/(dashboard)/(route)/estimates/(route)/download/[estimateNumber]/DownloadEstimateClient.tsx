"use client";
import useCompany from "@/actions/useCompany";
import useCustomers from "@/actions/useCustomers";
import { useEstimate } from "@/actions/useEstimates";
import DisplayEstimate from "@/components/Formats/DisplayEstimate";

import React from "react";

const DownloadEstimateClient = ({
  estimateNumber,
}: {
  estimateNumber: string;
}) => {
  const { data: fetchedEstimate } = useEstimate(estimateNumber);
  const { data: fetchedCompany } = useCompany();
  const { data: fetchedCustomers } = useCustomers();
  return (
    <DisplayEstimate
      fetchedCompany={fetchedCompany}
      fetchedCustomers={fetchedCustomers}
      fetchedEstimate={fetchedEstimate}
    />
  );
};

export default DownloadEstimateClient;
