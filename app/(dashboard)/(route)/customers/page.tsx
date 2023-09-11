import CustomerClient from "./CustomerClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers",
  description: "...",
};

const Page = async () => {
  return <CustomerClient />;
};

export default Page;
