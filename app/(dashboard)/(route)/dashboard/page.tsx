import { initialProfile } from "@/libs/initialProfile";
import ClientDashboard from "./ClientDashboard";
import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "...",
};
const Home = async () => {
  return <ClientDashboard />;
};

export default Home;
