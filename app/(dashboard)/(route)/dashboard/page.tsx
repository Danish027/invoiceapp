import { initialProfile } from "@/libs/initialProfile";
import ClientDashboard from "./ClientDashboard";
import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "...",
};
const Home = async () => {
  const intialUser = await initialProfile();
  return <ClientDashboard />;
};

export default Home;
