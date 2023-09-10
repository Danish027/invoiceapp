"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { loginSchema } from "../schema/userSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "./Modal";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signIn } from "next-auth/react";
import useLoginModal from "@/hooks/useLoginModal";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

type loginSchema = z.infer<typeof loginSchema>;

// main function
const LoginModal = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [custom, setCustom] = useState(false);

  const loginModal = useLoginModal();

  const form = useForm<loginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  function onSubmit(data: loginSchema) {
    const email = data.email;
    const password = data.password;
    signIn("credentials", {
      email,
      password,
    }).then((callback) => {
      if (callback?.ok) {
        toast({
          description: "Loged in successfully",
        });
        setCustom(true);
        router.push("/dashboard", { scroll: false });
      }
    });
  }

  const body = (
    <div className="w-[400px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 ">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-0  w-[300px]">
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
          {!isLoading ? (
            <div className="space-y-3">
              <Button
                disabled={isLoading}
                type="submit"
                className="w-full mt-4"
              >
                Login
              </Button>
            </div>
          ) : (
            <div className=" ">
              <Button disabled type="submit" className="w-full mt-4">
                <ReloadIcon className="m-2 h-4 w-4 animate-spin" />
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
        Don&apos; have an account yet?{" "}
        <a
          className="underline cursor-pointer"
          onClick={() => {
            loginModal.onClose();
          }}
        >
          Sign Up
        </a>
      </p>
      {custom && <Link href={"/dashboard"}>Dashboard</Link>}
    </div>
  );
  return (
    <>
      <Modal
        title="Welcome Back!"
        description="Enter your details to get logged in"
        body={body}
        footer={footer}
      />
    </>
  );
};

export default LoginModal;
