import React from "react";

interface HeadingProps {
  label: string;
}

const Heading: React.FC<HeadingProps> = ({ label }) => {
  return (
    <div
      className={`
      text-center
      text-3xl
      sm:text-4xl
      md:text-6xl
      tracking-wide
      font-extrabold
      text-foreground
      `}
    >
      {label}
    </div>
  );
};

export default Heading;
