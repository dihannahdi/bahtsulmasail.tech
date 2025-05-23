'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface NextAuthProviderProps {
  children: React.ReactNode;
  // session?: any; // You can pass session if pre-fetched, but usually not needed for App Router root
}

export default function NextAuthProvider({ children }: NextAuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
} 