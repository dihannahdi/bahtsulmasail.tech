'use client';

import { signIn, getProviders } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Define a type for the provider object we expect
interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

type Providers = Record<string, Provider>;

export default function SignInPage() {
  const [providers, setProviders] = useState<Providers | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res as Providers | null); // Cast here if necessary, ensure type safety
    };
    fetchProviders();
  }, []);

  useEffect(() => {
    const callbackError = searchParams?.get("error");
    if (callbackError) {
      // Map common NextAuth errors to more user-friendly messages
      switch (callbackError) {
        case "CredentialsSignin":
          setError("Invalid email or password. Please try again.");
          break;
        case "Callback":
        case "OAuthAccountNotLinked":
          setError("There was an issue with your sign-in method. Please try another one or contact support if the issue persists.");
          break;
        default:
          setError("An unexpected error occurred during sign-in.");
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn('credentials', {
      redirect: false, // Handle redirect manually after checking result
      email,
      password,
      // callbackUrl: '/', // Optional: specify where to redirect on success
    });

    setLoading(false);

    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        setError("Invalid email or password. Please try again.");
      } else {
        setError(result.error); // Or a generic message
      }
    } else if (result?.ok) {
      // Sign-in was successful
      const callbackUrl = searchParams?.get('callbackUrl') || '/';
      router.push(callbackUrl); // Redirect to home or intended page
    } else {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign In</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {providers?.credentials && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>
        )}

        {/* Placeholder for other providers like Google, etc. */}
        {/* {providers && Object.values(providers).map((provider) => {
          if (provider.id === 'credentials') return null; // Don't render button for credentials
          return (
            <div key={provider.name} className="mt-4">
              <button 
                onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in with {provider.name}
              </button>
            </div>
          );
        })} */}

        <p className="mt-8 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          {/* <Link href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </Link> */}
          (Sign up page to be created)
        </p>
      </div>
    </div>
  );
} 