"use client";
import { prisma } from "@/libs/prismadb";

import React from "react";

const ClientPage = () => {
  const handleDelete = async () => {
    try {
      await prisma.invoice.delete({
        where: {
          id: 384,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return <button onClick={handleDelete}>Delete</button>;
};

export default ClientPage;
