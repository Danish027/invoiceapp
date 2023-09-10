"use client";
import React from "react";

import useLoginModal from "@/hooks/useLoginModal";
import LoginModal from "@/models/LoginModal";
import RegisterModal from "@/models/RegisterModal";
import { SafeUser } from "@/schema/type";
import Link from "next/link";

import { AiOutlineCheckCircle } from "react-icons/ai";

const AuthClient = ({ currentUser }: { currentUser: SafeUser | null }) => {
  const { isOpen } = useLoginModal();

  if (currentUser) {
  }
  if (currentUser !== null) {
    return (
      <div className="w-screen h-screen flex justify-center items-center flex-col gap-2">
        <div className="bg-green-100 rounded-full w-14 h-14 flex justify-center items-center">
          <AiOutlineCheckCircle className="text-4xl text-green-700 " />
        </div>
        <p className="text-2xl font-bold">
          It&rsquo;s great to have you abroad, {currentUser?.firstName}{" "}
          {currentUser?.lastName}
        </p>
        <p>Redirecting you to the Dashboard...</p>
        <p>
          If you aren&rsquo;t redirected automatically,
          <Link href={"/dashboard"} className="underline ">
            click here
          </Link>
        </p>
      </div>
    );
  }
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {isOpen ? (
        <div>
          <LoginModal />
        </div>
      ) : (
        <div>
          <RegisterModal />
        </div>
      )}
    </div>
  );
};

export default AuthClient;
