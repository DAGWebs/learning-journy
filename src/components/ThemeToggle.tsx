"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * ThemeToggle component allows users to switch between different themes.
 * It provides options for "Light", "Dark", and "System" themes.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Standard div properties.
 *
 * @example
 * <ThemeToggle className="my-class" />
 */
export function ThemeToggle({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  // Fetches the setTheme method from next-themes.
  const { setTheme } = useTheme();

  return (
    <div className={className} {...props}>
      {/* Dropdown menu for theme selection */}
      <DropdownMenu>
        {/* Trigger for the dropdown menu */}
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            {/* Sun icon which appears for dark theme */}
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            {/* Moon icon which appears for light theme */}
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            {/* Accessibility: Label for screen readers */}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>

        {/* Content of the dropdown menu */}
        <DropdownMenuContent align="end">
          {/* Option to set the theme to "Light" */}
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          {/* Option to set the theme to "Dark" */}
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          {/* Option to set the theme based on system preference */}
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
