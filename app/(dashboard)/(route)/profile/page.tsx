import type { Metadata } from "next";

import ProfileClient from "./ProfileClient";
import EmptyState from "@/components/customeUI/dashboardUI/EmptyState";
export const metadata: Metadata = {
  title: "Profile",
  description: "...",
};
const Page = () => {
  return <ProfileClient />;
};

export default Page;
