"use client";

import React from "react";

interface HeadingColoredProps {
  label: string;
}

const HeadingColored: React.FC<HeadingColoredProps> = ({ label }) => {
  return (
    <div
      className={`
      dynamic-txts 
      text-primary
      text-center
      text-3xl
      sm:text-4xl
      md:text-6xl
      font-extrabold
     
  `}
    >
      {label}
    </div>
  );
};

export default HeadingColored;
