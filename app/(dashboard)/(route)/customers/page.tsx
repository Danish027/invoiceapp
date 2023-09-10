import CustomerClient from "./CustomerClient";
import type { Metadata } from "next";

import EmptyState from "@/components/customeUI/dashboardUI/EmptyState";
import getCurrentUser from "@/actions/getCurrentUser";
export const metadata: Metadata = {
  title: "Customers",
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
  return <CustomerClient />;
};

export default Page;
