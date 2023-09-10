import React from "react";
import { IconType } from "react-icons";
interface ButtonProps {
  label: string;
  icon?: IconType;
  secondary?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  icon: Icon,
  secondary,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex
        gap-1
        items-center
        px-[4px]
        sm:px-3

        rounded-sm
        font-semibold
        ${secondary ? "" : "bg-primary"}
        ${secondary ? "text-primary" : "text-primary-foreground"}
        ${secondary ? "border-2 border-primary" : ""}
        ${secondary ? "hover:text-primary" : " hover:bg-primary/90"}
        ${secondary ? "sm:py-[2px]" : "sm:py-[5px]"}
        ${secondary ? "py-[0px]" : "py-[5px]"}
       
    `}
    >
      {label}
      {Icon && (
        <div className="font-extrabold">
          <Icon size={15} fontWeight={400} />
        </div>
      )}
    </button>
  );
};

export default Button;
