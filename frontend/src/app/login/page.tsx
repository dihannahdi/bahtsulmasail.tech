'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login({ email, password });
      router.push('/dashboard'); // Redirect to dashboard after successful login
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // Implement social login logic here
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-[#1a0b2e] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[rgba(26,11,46,0.8)] backdrop-blur-lg rounded-3xl p-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-4 right-4">
          <div className="w-8 h-8 bg-cyan-400 rounded-lg opacity-80"></div>
        </div>
        <div className="absolute top-20 left-4">
          <div className="w-6 h-6 bg-cyan-400 rounded-lg rotate-45 opacity-60"></div>
        </div>

        {/* Main content */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 relative">
            <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white rotate-45"></div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome to Nixon+!</h1>
          <p className="text-gray-400 text-sm">
            Credentials are only used to authenticate in ProfHub. All saved data will be stored in your database.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full bg-[rgba(26,11,46,0.6)] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
              disabled={loading}
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-[rgba(26,11,46,0.6)] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg py-3 font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'LOG IN'}
          </button>

          <div className="mt-6 text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <button
                type="button"
                onClick={() => handleSocialLogin('apple')}
                className="p-2 bg-[rgba(26,11,46,0.6)] rounded-full border border-gray-700 hover:border-cyan-400 transition-colors"
                disabled={loading}
              >
                <Image src="/apple-icon.svg" alt="Apple" width={24} height={24} />
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                className="p-2 bg-[rgba(26,11,46,0.6)] rounded-full border border-gray-700 hover:border-cyan-400 transition-colors"
                disabled={loading}
              >
                <Image src="/google-icon.svg" alt="Google" width={24} height={24} />
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                className="p-2 bg-[rgba(26,11,46,0.6)] rounded-full border border-gray-700 hover:border-cyan-400 transition-colors"
                disabled={loading}
              >
                <Image src="/facebook-icon.svg" alt="Facebook" width={24} height={24} />
              </button>
            </div>
            <p className="text-gray-400 text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-cyan-400 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
} 