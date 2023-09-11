import React from "react";
import ClientPage from "./ClientPage";
import { currentUser } from "@clerk/nextjs";
import { initialProfile } from "@/libs/initialProfile";

const page = async () => {
  const intialUser = await initialProfile();
  const user = await currentUser();

  return (
    <div>
      <ClientPage
        email={user?.id}
        userId={user?.emailAddresses[0]?.emailAddress}
      />
    </div>
  );
};

export default page;
