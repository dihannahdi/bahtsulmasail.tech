'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = authService.getUser();
    if (!currentUser) {
      router.push('/login');
    } else {
      setUser(currentUser);
    }
  }, [router]);

  const handleLogout = () => {
    authService.logout();
    router.push('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Welcome to your Dashboard
        </h1>
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-lg text-gray-700">
            Hello, <span className="font-semibold">{user.name || user.email}</span>!
          </p>
          <p className="text-sm text-gray-600">
            Your ID: {user.id}
          </p>
          <p className="text-sm text-gray-600">
            Email: {user.email}
          </p>
          <p className="text-sm text-gray-600">
            Role: {user.role}
          </p>
        </div>
        
        {/* Role-specific navigation */}
        {(user.role === 'mushoheh' || user.role === 'admin') && (
          <div className="mb-6">
            <button
              onClick={() => router.push('/dashboard/tashih')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mb-3"
            >
              Tashih Dashboard
            </button>
          </div>
        )}
        
        <p className="text-gray-600 mb-6 text-center">
          This is a placeholder for your dashboard content.
        </p>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
        >
          Logout
        </button>
      </div>
    </div>
  );
} 