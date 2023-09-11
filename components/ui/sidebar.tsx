"use client";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Logo from "../customeUI/mainPageUI/Logo";
import { Company, SafeUser } from "@/schema/type";

import { BsExclamationLg } from "react-icons/bs";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  UserProfile,
} from "@clerk/nextjs";
import { Button } from "./button";
import { Skeleton } from "./skeleton";

const Sidebar = ({
  currentUser,
  showSidebar,
}: {
  currentUser?: SafeUser | null;
  showSidebar: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // const user = currentUser;
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  if (!showSidebar) {
    return null;
  }

  return (
    <>
      {isClient ? (
        <>
          <button
            onClick={toggleSidebar}
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            aria-controls="default-sidebar"
            type="button"
            className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-foreground rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>

          <aside
            id="default-sidebar"
            className={`fixed top-0 left-0 z-40 w-60 h-screen transition-transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } sm:translate-x-0`}
            aria-label="Sidebar"
          >
            <div className="h-full px-3 py-4 overflow-y-auto bg-background border-r">
              <div
                className=" sm:hidden lg:hidden absolute top-4 right-4
            mb-10
            "
              >
                <button onClick={toggleSidebar}>
                  <IoMdClose size={25} />
                </button>
              </div>
              <div className="flex flex-col justify-between h-full">
                <ul className="space-y-2 font-medium mt-10  sm:mt-0">
                  <li className="relative pr-9 pb-2 border-b">
                    <Logo />
                    <div className=" absolute right-0 top-4 px-[7px] rounded-xl bg-primary/20">
                      Beta
                    </div>
                  </li>

                  <li
                    onClick={() => {
                      if (isOpen) {
                        setIsOpen(false);
                      }
                    }}
                  >
                    <Link
                      href="/dashboard"
                      className="flex items-center p-2 text-foreground rounded-lg  hover:bg-accent"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-6 h-6 text-gray-500  transition duration-75 group-hover:text-primary "
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                        <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                      </svg>
                      <span className="ml-3 pt-[2px]">Dashboard</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/invoices"
                      className="flex items-center p-2 text-foreground rounded-lg  hover:bg-accent "
                    >
                      <svg
                        aria-hidden="true"
                        className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                      </svg>
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Invoices
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/estimates"
                      className="flex items-center p-2 text-foreground rounded-lg  hover:bg-accent"
                    >
                      <svg
                        aria-hidden="true"
                        className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                        <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                      </svg>
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Estimates
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/customers"
                      className="flex items-center p-2 text-foreground rounded-lg  hover:bg-accent"
                    >
                      <svg
                        aria-hidden="true"
                        className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Customers
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products"
                      className="flex items-center p-2 text-foreground rounded-lg  hover:bg-accent"
                    >
                      <svg
                        aria-hidden="true"
                        className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="flex-1 ml-3 whitespace-nowrap">
                        Products
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/profile"
                      className="flex items-center p-2 text-foreground rounded-lg  hover:bg-accent"
                    >
                      <svg
                        aria-hidden="true"
                        className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <div className="flex  ">
                        <span className="flex-1 ml-3 whitespace-nowrap">
                          Profile
                        </span>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </>
      ) : (
        <div>
          <Skeleton className="h-screen w-60" />
        </div>
      )}
    </>
  );
};

export default Sidebar;
