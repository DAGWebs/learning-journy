"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

// Type definition for the component's props
type Props = {};

/**
 * SigninButton component provides a button for users to initiate the
 * sign-in process via Google.
 *
 * @param {Props} props - Props for the component (currently empty).
 *
 * @example
 * <SigninButton />
 */
const SigninButton = (props: Props) => {
  return (
    <Button
      variant="ghost"
      // On button click, the signIn function from next-auth is invoked
      // with the "google" provider to initiate the sign-in process
      onClick={() => {
        signIn("google");
      }}
    >
      Log in
    </Button>
  );
};

export default SigninButton;
