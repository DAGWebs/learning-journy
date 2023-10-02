// Direct the code to run only in the client side.
"use client";

import React from "react";

// Import various dropdown components.
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// Import the User type for type safety.
import { User } from "next-auth";

// Import the signOut function from next-auth to handle user logout.
import { signOut } from "next-auth/react";

// Import the LogOut icon from lucide-react.
import { LogOut } from "lucide-react";

// Import the UserAvatar component to display user's avatar.
import UserAvatar from "@/components/UserAvatar";

// Define the props type, expecting a user object of the type User.
type Props = {
  user: User;
};

export const UserAccountNav = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {/* Display the user's avatar as the trigger for the dropdown. */}
        <UserAvatar user={user} />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {/* Display the user's name and email. */}
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user?.name && <p className="font-medium">{user.name}</p>}
            {user?.email && (
              <p className="w-[200px] truncate text-sm text-gray-700">
                {user.email}
              </p>
            )}
          </div>
        </div>

        {/* Separator line. */}
        <DropdownMenuSeparator />

        {/* Sign Out option. */}
        <div className="text-center">
          <DropdownMenuItem
            className="p-3  hover:text-red-900 hover:font-bold transition-all text-red-600 cursor-pointer flex items-center text-center"
            onSelect={() => {
              signOut(); // Sign the user out when this menu item is selected.
            }}
          >
            Sign Out <LogOut className="w-4 h-4 ml-2" />
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
