import React from "react";

interface SubHeadingProps {
  label: string;
}

const SubHeading: React.FC<SubHeadingProps> = ({ label }) => {
  return (
    <div
      className={`
            w-4/5 
            mx-auto 
            text-center 
            mt-5 
            mb-10 
            font-semibold 
            text-sm 
            sm:text-lg
            text-neutral-500
            dark:text-neutral-400
    `}
    >
      {label}
    </div>
  );
};

export default SubHeading;
