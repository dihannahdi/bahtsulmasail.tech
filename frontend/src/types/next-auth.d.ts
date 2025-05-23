import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user?: {
      id?: string | null; // Or number, depending on your backend ID type
      // Add other custom properties you expect on the user object in the session
      // role?: string | null;
    } & DefaultSession["user"]; // Keep existing properties like name, email, image
    accessToken?: string | null; // If you plan to expose accessToken directly on session
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the user object returned in the Credentials provider's `authorize` callback.
   */
  interface User extends DefaultUser {
    id: string; // Or number, ensure this matches your backend user ID type
    // Add other custom properties returned by your authorize callback or OAuth profile
    // role?: string;
    // accessToken?: string; // If your authorize callback returns it directly on user
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    id?: string | null; // Or number
    accessToken?: string | null;
    // Add other custom properties you added to the token in the jwt callback
    // role?: string | null;
  }
} 