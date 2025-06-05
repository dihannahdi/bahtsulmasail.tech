'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginPortal from './components/LoginPortal';
import PitchContent from './components/PitchContent';

export default function PitchPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in via localStorage
    const authStatus = localStorage.getItem('pitchAuth');
    if (authStatus === 'authenticated') {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (username: string, password: string) => {
    if (username === 'bahtsulmasail' && password === 'airesearch') {
      localStorage.setItem('pitchAuth', 'authenticated');
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black text-white">
      {!isLoggedIn ? (
        <LoginPortal onLogin={handleLogin} />
      ) : (
        <PitchContent />
      )}
    </div>
  );
} 