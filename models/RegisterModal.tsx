"use client";
import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { registerSchema } from "../schema/userSchema";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "./Modal";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";

type registerSchema = z.infer<typeof registerSchema>;

const RegisterModal = () => {
  const { toast } = useToast();
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const loginModal = useLoginModal();

  const form = useForm<registerSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      confirmPassword: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: registerSchema) => {
    try {
      const firstName = data.firstName;
      const lastName = data.lastName;
      const email = data.email;
      const password = data.password;
      setIsLoading(true);
      await axios.post("/api/register", {
        firstName,
        lastName,
        email,
        password,
      });
      setIsLoading(false);
      toast({
        description: "Account Created",
      });
      signIn("credentials", {
        email,
        password,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Invalid User Details",
        description: "Please re-check your login details. ",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const body = (
    <div className="w-[400px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 ">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="space-y-0  w-[300px]">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter your first name..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="space-y-0 mb-2">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter your last name..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-0 mb-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter your email..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-0 mb-2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter your Password..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-0 mb-2">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Confirm your Password..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!isLoading ? (
            <div className="mt-4">
              <Button
                disabled={isLoading}
                type="submit"
                className="w-full mt-4"
              >
                Register
              </Button>
            </div>
          ) : (
            <div className="mt-4 ">
              <Button disabled type="submit" className="w-full mt-4">
                <ReloadIcon className="m-2 h-4 w-4 animate-spin " />
                Please wait
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );

  const footer = (
    <div>
      <p>
        Already have an account?{" "}
        <a
          className="underline cursor-pointer"
          onClick={() => {
            loginModal.onOpen();
          }}
        >
          Sign In
        </a>
      </p>
    </div>
  );
  return (
    <>
      <Modal
        title="Get Started"
        description="Lets create your account."
        body={body}
        footer={footer}
      />
    </>
  );
};

export default RegisterModal;
