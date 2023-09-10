import React from "react";
import NewEstimateClient from "./NewEstimateClient";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estimate - new",
  description: "...",
};

const page = () => {
  return <NewEstimateClient />;
};

export default page;
