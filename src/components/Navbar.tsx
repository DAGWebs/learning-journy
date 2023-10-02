// Importing necessary libraries and components.
import Link from "next/link";
import React from "react";

// Importing custom components.
import SigninButton from "@/components/SigninButton";
import { UserAccountNav } from "@/components/UserAccountNav";
import { ThemeToggle } from "@/components/ThemeToggle";

// Importing authentication helper function.
import { getAuthSession } from "@/lib/auth";

type Props = {};

/**
 * Renders the navigation bar component.
 *
 * @param {Props} props - The props object containing the component's properties.
 * @return {JSX.Element} The JSX element representing the navigation bar.
 */
const Navbar = async (props: Props) => {
  // Retrieve the current authentication session.
  const session = await getAuthSession();

  return (
    <nav className="fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] border-b border-zinc-300 py-2">
      <div className="flex items-center justify-center h-full gap-2 px-8 mx-auto sm:justify-between max-7xl">
        {/* Logo/Brand Name Link */}
        <Link href="/gallery" className="items-center hidden gap-2 sm:flex">
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:bloack dark:border-white">
            Mentor Minds AI
          </p>
        </Link>

        <div className="flex items-center">
          {/* Gallery Link */}
          <Link href={"/gallery"} className="mr-3">
            Gallery
          </Link>

          {/* Conditional rendering of links based on if a user session exists */}
          {session?.user && (
            <>
              {/* Course creation link */}
              <Link href={"/create"} className="mr-3">
                Create Course
              </Link>
              {/* Settings link */}
              <Link href={"/settings"} className="mr-3">
                Settings
              </Link>
            </>
          )}

          {/* Theme Toggle Component */}
          <ThemeToggle className="mr-3 ml-3" />

          <div className="flex items-center">
            {/* Conditional rendering of user account nav or sign in button based on if a user session exists */}
            {session?.user ? (
              <UserAccountNav user={session.user} />
            ) : (
              <SigninButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Export the Navbar component.
export default Navbar;
