import React from "react";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { AiOutlinePlayCircle } from "react-icons/ai";
import Button from "./Button";
import Heading from "./Heading";
import SubHeading from "./SubHeading";
import Link from "next/link";
const HeroSection = () => {
  return (
    <div
      className="
        w-full
        mb-10
        sm:mb-2
        h-[92vh]
        flex
        justify-center
        items-center
        flex-col
        relative
        z-10
        mt-10
    "
    >
      <Heading label="A better, 10x faster way to" />

      <div className="wrapper">
        <ul
          className={`
            dynamic-txts 
            text-primary
            text-center
            text-3xl
            sm:text-4xl
            md:text-6xl
            font-extrabold
            mt-[-20px]
            sm:mt-0
            z-20
            select-none
        `}
        >
          <li>
            <span>Generate Invoice</span>
          </li>
          <li>
            <span>Generate Estimate</span>
          </li>
          <li>
            <span>Analyze financial data</span>
          </li>
          <li>
            <span>Track payments</span>
          </li>
          <li>
            <span>and many more.</span>
          </li>
        </ul>
      </div>
      <div className="z-20">
        <SubHeading
          label="Simplify your billing process and create professional invoices
        effortlessly.Automate invoice generation, track payments, and analyze
        financial data to optimize your business financial health."
        />
      </div>
      <div
        className="
          flex 
          justify-between 
          items-center 
          gap-7
          "
      >
        <Link href="/dashboard">
          <Button label="Get Started" icon={HiOutlineArrowSmRight} />
        </Link>
        <Button label="Demo" secondary icon={AiOutlinePlayCircle} />
      </div>
    </div>
  );
};

export default HeroSection;
