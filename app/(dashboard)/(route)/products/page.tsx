import EmptyState from "@/components/customeUI/dashboardUI/EmptyState";
import ProductsClient from "./ProductsClient";
import type { Metadata } from "next";
import getCurrentUser from "@/actions/getCurrentUser";

export const metadata: Metadata = {
  title: "Products",
  description: "...",
};
const Page = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser === null) {
    return (
      <div className="w-full h-screen">
        <EmptyState
          title="Unauthorized"
          subtitle="Please log in to access your dashboard."
          showButton
        />
      </div>
    );
  }

  return <ProductsClient />;
};

export default Page;
