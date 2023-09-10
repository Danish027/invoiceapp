import React from "react";
import { IconType } from "react-icons";

interface FooterCardProps {
  heading: string;
  subHeading1: string;
  subHeading2: string;
  icon1?: IconType;
  icon2?: IconType;
  href1: string;
  href2: string;
}
const FooterCard: React.FC<FooterCardProps> = ({
  heading,
  icon1: Icon1,
  icon2: Icon2,
  subHeading1,
  subHeading2,
  href1,
  href2,
}) => {
  return (
    <div
      className="
        text-white
        flex
        flex-col
        justify-start
        w-[150px]
    "
    >
      <div className="font-bold underline uppercase">{heading}</div>
      <div>
        <a
          target="_blank"
          href={href1}
          className="hover:underline flex gap-2  cursor-pointer py-4"
        >
          {Icon1 && <Icon1 size={20} />}
          {subHeading1}
        </a>
        <a
          target="_blank"
          href={href2}
          className="hover:underline flex gap-2  cursor-pointer"
        >
          {Icon2 && <Icon2 size={20} />}
          {subHeading2}
        </a>
      </div>
    </div>
  );
};

export default FooterCard;
