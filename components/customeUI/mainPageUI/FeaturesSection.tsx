import React from "react";
import PageLayout from "../../layout/PageLayout";
import Heading from "./Heading";
import HeadingColored from "./HeadingColored";
import SubHeading from "./SubHeading";
import FeaturesCard from "./FeaturesCard";
import features from "../../../data/features";

const FeaturesSection = () => {
  const feature = features;
  return (
    <div id="features">
      <PageLayout>
        <div
          className="
        flex
        gap-2
        md:gap-4
        z-10
        justify-center
        items-center
      "
        >
          <Heading label="The" />
          <HeadingColored label="Features" />
          <Heading label="we" />
          <Heading label="offer" />
        </div>
        <SubHeading label="Our application empowers you to effortlessly create professional invoices and estimate bills. Get a comprehensive summary of all your estimates and invoices through an intuitive table view." />
        <div
          className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-10
      "
        >
          {feature.map((feature) => (
            <FeaturesCard
              key={feature.heading}
              heading={feature.heading}
              icon={feature.icon}
              paragraphts={feature.paragraphts}
            />
          ))}
        </div>
      </PageLayout>
    </div>
  );
};

export default FeaturesSection;
