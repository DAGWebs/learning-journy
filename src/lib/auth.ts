import { DefaultSession, NextAuthOptions, getServerSession } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/db";
import GoogleProvider from "next-auth/providers/google";

// Extend the default session interface to include user id and credits
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      credits: number;
    } & DefaultSession["user"];
  }
}

// Extend the JWT interface to include user id and credits
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    credits: number;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt", // Use JWT strategy for session management
  },
  callbacks: {
    jwt: async ({ token }) => {
      // Fetch user from database using email from the token
      const db_user = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });
      // If the user is found in the database, add id and credits to the token
      if (db_user) {
        token.id = db_user.id;
        token.credits = db_user.credits;
      }
      return token;
    },
    session: ({ session, token }) => {
      // Map the token details to the session user object
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.credits = token.credits;
      }
      return session;
    },
  },
  // Secret to encode and decode JWT tokens
  secret: process.env.NEXTAUTH_SECRET as string,

  // Use Prisma as the database adapter for next-auth
  adapter: PrismaAdapter(prisma),

  providers: [
    // Google authentication provider configuration
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

// Function to get the authenticated session from the server
export const getAuthSession = () => {
  return getServerSession(authOptions);
};
