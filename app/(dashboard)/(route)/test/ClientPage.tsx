"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";

const ClientPage = ({
  email,
  userId,
}: {
  email: string | undefined;
  userId: string | undefined;
}) => {
  const { isLoaded, isSignedIn, user } = useUser();

  const clientEmail = user?.emailAddresses[0]?.emailAddress;

  return (
    <div>
      <div>Server Email : {email && <>{email}</>}</div>
      <div>Client Email : {clientEmail}</div>
    </div>
  );
};

export default ClientPage;
