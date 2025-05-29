"use client"
import React from 'react'
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from '@clerk/nextjs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Navbar = () => {
  const { setTheme } = useTheme();

  return (
    <nav className="flex items-center justify-between p-4 border-b">
      {/* Navigation Links */}
      <ul className="flex items-center space-x-6">
        <li className="cursor-pointer hover:text-gray-600">Home</li>
        <li className="cursor-pointer hover:text-gray-600">About</li>
        <li className="cursor-pointer hover:text-gray-600">Contact</li>
      </ul>

<SignedOut>
  <SignInButton/>
</SignedOut>
<SignedIn>
  <UserButton/>
</SignedIn>


      {/* Theme Toggle */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}

export default Navbar