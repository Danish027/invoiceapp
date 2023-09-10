import React from "react";
import { IconType } from "react-icons";

interface FeaturesCardProps {
  icon: IconType;
  heading: string;
  paragraphts: string[];
}

const FeaturesCard: React.FC<FeaturesCardProps> = ({
  heading,
  icon: Icon,
  paragraphts,
}) => {
  return (
    <div
      className={`
      border
      rounded-xl
      flex
      flex-col
      justify-start
      p-8
      hover:shadow-sm
      duration-75
      bg-card
      border-neutral-300
      dark:border-neutral-700
      hover:shadow-neutral-200
      dark:hover:shadow-neutral-800
      `}
    >
      <div
        className={`
        text-primary
        w-14
        h-14
        flex
        justify-center
        items-center
        rounded-full
        duration-1000
        bg-primary/30
        dark:bg-primary/10
        `}
      >
        <Icon size={25} />
      </div>
      <div
        className={`
        text-xl
        sm:text-2xl
        font-bold
        w-80
        mt-4
        mb-3
        text-neutral-900
        dark:text-neutral-200
        `}
      >
        {heading}
      </div>
      <div>
        {paragraphts.map((paragrapht) => (
          <div
            key={paragrapht}
            className={`
            w-72 
            sm:w-80 
            text-sm  
            sm:text-lg mb-2
            text-neutral-500
            dark:text-neutral-400
            `}
          >
            • {paragrapht}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesCard;
