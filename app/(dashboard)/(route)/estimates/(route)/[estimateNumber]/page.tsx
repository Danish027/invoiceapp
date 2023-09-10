import React from "react";
import type { Metadata } from "next";
import EditestimateClient from "./EditEstimateClient";
export const metadata: Metadata = {
  title: "Estimate - edit",
  description: "...",
};
const page = ({ params }: { params: { estimateNumber: string } }) => {
  const { estimateNumber } = params;
  return <EditestimateClient estimateNumber={estimateNumber} />;
};

export default page;
