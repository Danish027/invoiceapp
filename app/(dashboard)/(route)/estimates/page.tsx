import type { Metadata } from "next";
import EstimateClient from "./EstimateClient";
import getCurrentUser from "@/actions/getCurrentUser";
import EmptyState from "@/components/customeUI/dashboardUI/EmptyState";

export const metadata: Metadata = {
  title: "Estimates",
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
  return <EstimateClient />;
};

export default Page;
