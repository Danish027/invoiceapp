import EmptyState from "@/components/customeUI/dashboardUI/EmptyState";
import ProductsClient from "./ProductsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "...",
};
const Page = () => {
  return <ProductsClient />;
};

export default Page;
