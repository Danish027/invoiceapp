import React from "react";
import PageLayout from "../../layout/PageLayout";
import Heading from "./Heading";
import HeadingColored from "./HeadingColored";
import SubHeading from "./SubHeading";
import FAQItem from "./FAQItem";
import faqs from "../../../data/faq";

const FAQSection = () => {
  return (
    <div id="faqs" className="mt-8 sm:mt-16 md:mt-28 ">
      <PageLayout>
        <div className="flex gap-3  flex-wrap items-center justify-center">
          <Heading label=" Frequently" />
          <Heading label=" asked" />
          <HeadingColored label="Questions" />
        </div>
        <div className="w-full">
          <SubHeading label="Here are some very common questions that we are asked" />
        </div>
        <div
          className={`
      border-[1px] 
      rounded-xl 
      flex 
      flex-col 
      justify-center 
      gap-2
      px-4 
      w-[300px]
      sm:w-[400px]
      md:w-[650px]
      lg:w-[800px] 
      mx-auto 
      md:p-2
      border-neutral-300
      dark:border-neutral-700
      bg-card
      `}
        >
          {faqs.map((faq) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </PageLayout>
    </div>
  );
};

export default FAQSection;
