"use client";
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  const { setTheme, theme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800 dark:text-white">
          <Link href="/">MyApp</Link>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center space-x-8">
          {["Home", "About", "Contact"].map((item) => (
            <li key={item}>
              <Link
                href={`/${item.toLowerCase()}`}
                className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth and Theme Controls */}
        <div className="flex items-center space-x-4">
          {/* Auth Buttons */}
          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="outline"
                className="text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 border-2 border-gray-200 dark:border-gray-600",
                },
              }}
            />
          </SignedIn>

          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                <Sun className="h-5 w-5 transition-transform duration-300 ease-in-out transform rotate-0 scale-100 dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-5 w-5 transition-transform duration-300 ease-in-out transform rotate-90 scale-0 dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              {["light", "dark", "system"].map((mode) => (
                <DropdownMenuItem
                  key={mode}
                  onClick={() => setTheme(mode)}
                  className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;