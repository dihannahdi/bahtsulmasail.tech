import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("NextAuth authorize: ", credentials);

          if (!credentials?.email || !credentials?.password) {
            console.log("Authorization failed: Missing credentials.");
            return null;
          }

          // Call Django backend to authenticate user
          const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
          const res = await fetch(`${API_BASE_URL}/api/v1/auth/token/`, {
            method: 'POST',
            body: JSON.stringify({
              username: credentials.email,
              password: credentials.password
            }),
            headers: { 
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
          });

          if (!res.ok) {
            console.log("Authentication failed:", res.status, res.statusText);
            return null;
          }

          const data = await res.json();
          
          if (data.access && data.refresh) {
            // Create user object with tokens
            const user = {
              id: credentials.email, // Use email as ID for now
              name: credentials.email.split('@')[0], // Extract name from email
              email: credentials.email,
              accessToken: data.access,
              refreshToken: data.refresh,
            };
            console.log("User authenticated successfully:", user.email);
            return user;
          } else {
            console.log("Authorization failed: Invalid response from backend.");
            return null;
          }
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
    // ...add more providers here, e.g., GoogleProvider, GitHubProvider
  ],
  session: {
    strategy: "jwt", // Using JWT for session strategy
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the access_token and user info right after signin
      if (user) {
        const customUser = user as any; // Cast to any to access custom properties
        token.accessToken = customUser.accessToken;
        token.refreshToken = customUser.refreshToken;
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from JWT
      if (session.user) {
        session.user.id = token.id as string; // or number, ensure type consistency
        // session.user.role = token.role; // Example of adding custom property
      }
      // session.accessToken = token.accessToken as string; // Deprecated: custom field not directly on session
      // To pass accessToken to client, add it to session.user or a custom field within session
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin', // Path to your custom sign-in page
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for email/passwordless login)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out to disable)
  },
  // Add other NextAuth configurations here as needed, like database adapter, secret, etc.
  // secret: process.env.NEXTAUTH_SECRET, // IMPORTANT: Set a NEXTAUTH_SECRET in your .env.local for production
  debug: process.env.NODE_ENV === 'development', // Enable debug messages in development
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 