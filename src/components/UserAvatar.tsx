import React from "react";
// Import Avatar and AvatarFallback components for user avatar display.
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Import User type for type safety.
import { User } from "next-auth";

// Import the next/image component to optimize image loading.
import Image from "next/image";

// Define the props type, expecting a user object with a type of User from next-auth.
type Props = {
  user: User;
};

const UserAvatar = ({ user }: Props) => {
  return (
    <Avatar>
      {/* Check if the user has an image. If they do, render the image. */}
      {user.image ? (
        <div className="relative w-full h-full aspect-square">
          <Image
            fill
            src={user.image} // Load the user's image.
            alt="user profile" // Provide a meaningful alt text for accessibility.
            referrerPolicy="no-referrer" // Avoid sending any referrer header.
          />
        </div>
      ) : (
        // If the user doesn't have an image, provide a fallback avatar.
        <AvatarFallback>
          {/* Render the user's name for screen readers for accessibility. */}
          <span className="sr-only">{user?.name}</span>
        </AvatarFallback>
      )}
    </Avatar>
  );
};

// Export the component for use in other parts of the app.
export default UserAvatar;
