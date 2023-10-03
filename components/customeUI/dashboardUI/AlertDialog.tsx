import {
  AlertDialog as AlertDialogUi,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import { IconType } from "react-icons";

interface AlertDialogProps {
  submitlabel?: string;
  buttonLabel?: string;
  buttonSecondaryLabel?: string;
  title?: string;
  description?: string;
  onClick?: () => void;
  body?: React.ReactElement;
  outline?: boolean;
  primary?: boolean;
  ghost?: boolean;
  active?: boolean;
  icon: IconType;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  body,
  description,
  submitlabel,
  onClick,
  title,
  active,
  buttonSecondaryLabel,
  buttonLabel,
  ghost,
  primary,
  outline,
  icon: Icon,
}) => {
  return (
    <AlertDialogUi>
      {primary && (
        <AlertDialogTrigger asChild>
          <Button variant={"default"} className="h-8">
            {buttonLabel && <div className="pr-2">{buttonLabel}</div>}
            <Icon />
          </Button>
        </AlertDialogTrigger>
      )}
      {outline && (
        <AlertDialogTrigger asChild>
          <Button variant={"outline"}>
            {buttonLabel && <div className="pr-2">{buttonLabel}</div>}
            <Icon />
          </Button>
        </AlertDialogTrigger>
      )}
      {ghost && (
        <AlertDialogTrigger asChild>
          <Button variant={"ghost"}>
            {buttonLabel && <div className="pr-2">{buttonLabel}</div>}
            <Icon />
          </Button>
        </AlertDialogTrigger>
      )}
      {active && (
        <AlertDialogTrigger asChild>
          <Button variant={"outline"} className="border-primary">
            {buttonLabel && (
              <div className="pr-2 text-primary">{buttonLabel}</div>
            )}
            <Icon className="text-primary" />
          </Button>
        </AlertDialogTrigger>
      )}

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <div>{body}</div>
        <AlertDialogFooter>
          {buttonSecondaryLabel && (
            <AlertDialogCancel>{buttonSecondaryLabel}</AlertDialogCancel>
          )}
          {submitlabel && (
            <AlertDialogAction onClick={onClick}>
              {submitlabel}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogUi>
  );
};
