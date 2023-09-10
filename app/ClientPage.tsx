import React from "react";
import Header from "../components/customeUI/mainPageUI/Header";
import HeroSection from "../components/customeUI/mainPageUI/HeroSection";
import ProductSection from "../components/customeUI/mainPageUI/ProductSection";
import FeaturesSection from "../components/customeUI/mainPageUI/FeaturesSection";
import FAQSection from "../components/customeUI/mainPageUI/FAQSection";
import CTASection from "../components/customeUI/mainPageUI/CTASection";
import Footer from "../components/customeUI/mainPageUI/Footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoiceapp",
  description: "...",
};

export default function ClientPage() {
  return (
    <div
      className={`
        relative
        w-full
        h-full
        bg-background
        `}
    >
      <div
        className={`
      container
      mx-auto
      xl:px-30
      max-w-6xl`}
      >
        <Header />
        <HeroSection />
        <ProductSection />
        <FeaturesSection />
        <FAQSection />
        <CTASection />
      </div>
      <Footer />
    </div>
  );
}
