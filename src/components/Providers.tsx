// Use the client's specific settings or configurations.
"use client";

// Importing necessary libraries and components for theme handling.
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// Importing the type definitions for the ThemeProviderProps from next-themes.
import { type ThemeProviderProps } from "next-themes/dist/types";

/**
 * Creates a ThemeProvider component that wraps the provided children and applies the specified theme props.
 *
 * @param {React.ReactNode} children - The children to be wrapped by the ThemeProvider component.
 * @param {ThemeProviderProps} props - The props to be applied to the ThemeProvider component.
 * @return {React.ReactNode} The wrapped children with the applied theme props.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Using the NextThemesProvider from 'next-themes' to handle theme application.
  // It sets the theme data on an HTML attribute, uses the system's theme by default, and allows toggling to the system theme.
  return (
    <NextThemesProvider
      // Use "class" attribute for theming (for CSS).
      attribute="class"
      // Set the default theme to be the system theme.
      defaultTheme="system"
      // Enable the system theme toggle functionality.
      enableSystem
      // Spread any other provided props.
      {...props}
    >
      {children}  {/* Render the children inside the themed context. */}
    </NextThemesProvider>
  );
}
