"use client";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ModalProps {
  title?: string;
  description?: string;
  body: React.ReactElement;
  footer?: React.ReactElement;
}

const Modal: React.FC<ModalProps> = ({ title, description, body, footer }) => {
  return (
    <div>
      <Card>
        <CardHeader className="py-2 space-y-0">
          <CardTitle className="flex justify-center text-2xl">
            {title}
          </CardTitle>
          <CardDescription className=" text-center">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="py-2">
          <>{body}</>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          {footer}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Modal;
