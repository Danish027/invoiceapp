import React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div
      className="
    flex
    justify-center
    items-center
    flex-col
    h-auto
    "
    >
      {children}
    </div>
  );
};

export default PageLayout;
