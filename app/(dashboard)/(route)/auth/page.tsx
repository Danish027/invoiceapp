import React from "react";
import AuthClient from "./AuthClient";
import type { Metadata } from "next";

import getCurrentUser from "@/actions/getCurrentUser";

export const metadata: Metadata = {
  title: "Auth",
  description: "...",
};
const Page = async () => {
  const currentUser = await getCurrentUser();

  return <AuthClient currentUser={currentUser} />;
};

export default Page;
