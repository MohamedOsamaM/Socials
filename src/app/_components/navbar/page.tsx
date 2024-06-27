"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import logo from "../../assets/Screenshot 2024-06-25 153522.png";
import Image from "next/image";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 z-[99999] sticky top-0 left-0 right-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src={logo}
              alt="logo"
              className="rounded-full h-auto w-auto"
              style={{ width: '50px', height: 'auto' }}
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Socials
            </span>
          </Link>
          <button
            onClick={handleToggle}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isNavOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          {isMounted && (
            <div
              className={`${isNavOpen ? "" : "hidden"
                } w-full md:block md:w-auto`}
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link
                    href="/"
                    className="block py-2 px-3 text-white hover:text-purple-700 transition-all rounded md:bg-transparent  md:p-0 dark:text-white "
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/addPost"
                    className="block py-2 px-3 text-white hover:text-purple-700 transition-all rounded md:bg-transparent  md:p-0 dark:text-white "
                    aria-current="page"
                  >
                    add post
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sign-in"
                    className="block py-2 px-3 text-white hover:text-purple-700 transition-all rounded md:bg-transparent  md:p-0 dark:text-white "
                    aria-current="page"
                  >
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sign-up"
                    className="block py-2 px-3 text-white hover:text-purple-700 transition-all rounded md:bg-transparent  md:p-0 dark:text-white "
                    aria-current="page"
                  >
                    Sign up
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sign-in"
                    className="block py-2 px-3 text-white hover:text-purple-700 transition-all rounded md:bg-transparent  md:p-0 dark:text-white "
                    aria-current="page"
                    onClick={() => { localStorage.removeItem('usertoken') }}
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
