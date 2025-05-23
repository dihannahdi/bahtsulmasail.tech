import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
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
        // Add logic here to look up the user from the credentials supplied
        // This is where you would call your Django backend API to verify credentials
        console.log("NextAuth authorize: ", credentials);

        // **IMPORTANT: Replace this with actual backend validation**
        // const res = await fetch("YOUR_DJANGO_LOGIN_API_ENDPOINT", {
        //   method: 'POST',
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" }
        // });
        // const user = await res.json();

        // For demonstration, let's assume a mock user if credentials are provided
        // In a real application, `user` would come from your backend if authentication is successful.
        // It must include at least an `id` and `name` or `email`.
        if (credentials?.email && credentials?.password) {
          // Replace with actual user object from your backend
          // The user object MUST have an `id`. It can be a string or number.
          // It should also typically include `name` and/or `email`.
          const user = {
            id: "1", // Ensure this ID is unique and from your backend
            name: "Test User",
            email: credentials.email,
            // You can add other properties like roles, accessToken, etc.
            // accessToken: backendApiResponse.token, 
          };
          console.log("Mock user authorized: ", user);
          return user;
        } else {
          // If you return null then an error will be displayed to the user
          console.log("Authorization failed: No credentials or invalid.");
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
          // throw new Error("Invalid credentials");
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
      // Persist the OAuth access_token and user id to the token right after signin
      if (account && user) {
        token.accessToken = account.access_token;
        token.id = user.id;
        // You might want to add custom properties from your user object here
        // For example, if your Django backend returns a role:
        // token.role = user.role;
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