import React from "react";

interface FAQItemsProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemsProps> = ({ answer, question }) => {
  return (
    <div className="space-y-4">
      <details
        className={`
          border-b-[1px]
          ring-emerald-100
          border-neutral-300
          dark:border-neutral-700
          `}
      >
        <summary
          className={`
                text-sm
                sm:text-md
                md:text-md
                font-bold
                text-neutral-700
                dark:text-neutral-200 
                px-4 
                py-4
          `}
        >
          {question}
        </summary>
        <p
          className={`
                px-4 
                py-6 
                pt-0 
                ml-4 
                -mt-4 
                text-sm
                sm:text-md
                md:text-md
                font-semibold
                text-neutral-600
                dark:text-neutral-400  
               `}
        >
          {answer}
        </p>
      </details>
    </div>
  );
};

export default FAQItem;
