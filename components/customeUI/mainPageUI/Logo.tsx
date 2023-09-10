import React from "react";

const Logo: React.FC = () => {
  const logoBox = (
    <div
      className={`
          w-2 
          h-2 
          m-[1px] 
          bg-primary
          rounded-[2px] 
          sm:w-[8px] 
          sm:h-[8px]
          sm:rounded-[2px]
          sm:m-[1.4px]
          `}
    ></div>
  );

  return (
    <div
      className={`
      flex 
      justify-center 
      items-center 
      gap-1 
      px-2 
      py-1
      rounded-md 
      bg-background
      cursor-pointer
      `}
    >
      <div className="grid grid-cols-2">
        {logoBox}
        {logoBox}
        {logoBox}
        {logoBox}
      </div>
      <div
        className={` 
        pt-[2px]
        text-2xl 
        sm:text-[26px]  
        font-bold 
        tracking-normal 
        text-primary
        select-none
        `}
      >
        Invoiceapp
      </div>
    </div>
  );
};

export default Logo;
