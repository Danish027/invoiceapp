import React from "react";

interface ProductProps {
  label: String;
  componentProp: JSX.Element;
}

const ProductCard: React.FC<ProductProps> = ({ label, componentProp }) => {
  return (
    <div
      className={`
      border
      rounded-md
      flex
      justify-center
      items-center
      flex-col
      border-neutral-300
      dark:border-neutral-700
      bg-card
      `}
    >
      <div className="m-3  rounded-sm">{componentProp}</div>
      <div
        className={`
            text-center
            font-bold
            text-xl
            sm:text-2xl
            leading-none
            pb-2
            text-neutral-900
            dark:text-neutral-200
            `}
      >
        For <br />
        {label}
      </div>
    </div>
  );
};

export default ProductCard;
