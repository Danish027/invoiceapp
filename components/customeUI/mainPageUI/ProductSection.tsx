import React from "react";
import PageLayout from "../../layout/PageLayout";
import Heading from "./Heading";
import HeadingColored from "./HeadingColored";
import SubHeading from "./SubHeading";
import ProductCard from "./ProductCard";
import EnterpriseImage from "./EnterpriseImage";
import TaxExpertImage from "./TaxExpertImage";
import SMEsImage from "./SMEsImage";
import IndividualImage from "./IndividualImage";

const ProductSection = () => {
  return (
    <PageLayout>
      <div className="flex flex-row gap-2 md:gap-5">
        <Heading label="Product" />
        <Heading label="for" />

        <HeadingColored label=" Everyone" />
      </div>
      <div className="m-4">
        <SubHeading label="Our product is designed to cater to a diverse range of users, making it an ideal choice for enterprises, tax experts, small and medium-sized businesses (SMEs), and individuals alike." />
      </div>
      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-4
        gap-5
        sm:gap-4
        md:gap-6
        mb-16
        md:mb-24
        lg:mb-20
        "
      >
        <ProductCard componentProp={<EnterpriseImage />} label="Enterprise" />
        <ProductCard componentProp={<TaxExpertImage />} label="Tax Experts" />
        <ProductCard componentProp={<SMEsImage />} label="SMEs" />
        <ProductCard componentProp={<IndividualImage />} label="Individuals" />
      </div>
    </PageLayout>
  );
};

export default ProductSection;
