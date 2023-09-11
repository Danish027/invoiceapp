import type { Metadata } from "next";
import EstimateClient from "./EstimateClient";

export const metadata: Metadata = {
  title: "Estimates",
  description: "...",
};

const Page = () => {
  return <EstimateClient />;
};

export default Page;
