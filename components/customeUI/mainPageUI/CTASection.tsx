import React from "react";
import PageLayout from "../../layout/PageLayout";
import Heading from "./Heading";
import HeadingColored from "./HeadingColored";
import SubHeading from "./SubHeading";
import Button from "./Button";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import Link from "next/link";

const CTASection = () => {
  return (
    <div className="p-8 sm:pt-16 md:pt-16">
      <PageLayout>
        <div className="flex gap-4 flex-wrap justify-center items-center">
          <Heading label="Get" />
          <Heading label="started" />
          <Heading label="with" />
          <HeadingColored label="Invoiceapp" />
        </div>
        <div>
          <SubHeading label="Take control of your invoicing and billing process with InvoiceApp.Sign up now and experience the ease and efficiency of managing your finances. Start sending professional invoices and estimates, tracking payments, and gaining valuable insights for your business. Join thousands of satisfied users and unlock the power of streamlined invoicing with InvoiceApp." />
        </div>
        <div>
          <Link href="/dashboard">
            <Button label="Get Started" icon={HiOutlineArrowSmRight} />
          </Link>
        </div>
      </PageLayout>
    </div>
  );
};

export default CTASection;
