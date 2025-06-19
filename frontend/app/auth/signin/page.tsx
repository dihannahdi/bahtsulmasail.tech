'use client';

import { signIn, getProviders } from 'next-auth/react';
import { useState, useEffect, Suspense } from 'react';
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

function SignInForm() {
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
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>
      <p className="text-lg text-gray-600">Please sign in to continue.</p>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInForm />
    </Suspense>
  );
} 