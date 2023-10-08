import React from "react";
import ClientPage from "./ClientPage";
import { currentUser } from "@clerk/nextjs";
import { initialProfile } from "@/libs/initialProfile";
import Background from "@/test/Background";
import HeroSection from "@/components/customeUI/mainPageUI/HeroSection";
// import "@/test/background.module.css";
const page = async () => {
  const intialUser = await initialProfile();
  const user = await currentUser();

  return (
    <div className="h-screen">
      <Background />
      <div className="-mt-10">
        <HeroSection />
      </div>
    </div>
  );
};

export default page;
