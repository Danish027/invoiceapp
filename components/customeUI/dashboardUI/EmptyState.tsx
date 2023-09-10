import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface EmptyStateProps {
  title: string;
  subtitle: string;
  showButton?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  showButton,
  subtitle,
  title,
}) => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-3">
      <div className="text-4xl">{title}</div>
      <div className="text-2xl text-center text-muted-foreground">
        {subtitle}
      </div>
      {showButton && (
        <Button variant={"outline"} className="text-2xl">
          <Link href={"/auth"}>Login</Link>
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
