import React from "react";

const LogoSecondary = () => {
  const logoBox = (
    <div
      className={`
            w-2 
            h-2 
            m-[1px] 
            bg-white
            rounded-[2px] 
            sm:w-[8px] 
            sm:h-[8px]
            sm:rounded-[2px]
            sm:m-[1.4px]
            select-none
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
       bg-primary
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
        text-2xl 
        sm:text-[26px]  
        font-bold 
        tracking-normal 
        pt-[1px] 
        text-white select-none
        pb-[3px]`}
      >
        Invoiceapp
      </div>
    </div>
  );
};

export default LogoSecondary;
