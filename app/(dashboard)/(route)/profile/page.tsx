import type { Metadata } from "next";
import getCurrentUser from "@/actions/getCurrentUser";
import ProfileClient from "./ProfileClient";
import EmptyState from "@/components/customeUI/dashboardUI/EmptyState";
export const metadata: Metadata = {
  title: "Profile",
  description: "...",
};
const Page: React.FC = async () => {
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

  return <ProfileClient currentUser={currentUser} />;
};

export default Page;
