import React from "react";
import ClientPage from "./ClientPage";
import { currentUser } from "@clerk/nextjs";
import { initialProfile } from "@/libs/initialProfile";

const page = async () => {
  const intialUser = await initialProfile();
  const user = await currentUser();

  return (
    <div>
      <ClientPage />
    </div>
  );
};

export default page;
