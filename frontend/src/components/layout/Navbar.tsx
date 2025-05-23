'use client'; // This component now uses client-side hooks

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import ThemeToggleButton from '@/components/common/ThemeToggleButton'; // Import the new component
import { usePathname } from 'next/navigation'; // Import usePathname
import { cn } from '@/lib/utils'; // For conditional classes

export default function Navbar() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const pathname = usePathname(); // Get current path

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/history-of-bahtsul-masail", label: "Sejarah" },
    { href: "/faq", label: "FAQ" },
    { href: "/about", label: "Tentang Kami" },
  ];

  return (
    <nav className="bg-background/80 backdrop-blur-md text-foreground shadow-md border-b border-border/60 sticky top-0 z-50 transition-all duration-300">
      {/* Applied theme-aware background, text, and a bottom border */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center">
            <Link href="/" legacyBehavior>
              <a className="text-2xl sm:text-3xl font-bold hover:opacity-80 transition-opacity text-islamic-green font-serif">
                {/* Consider using a logo component here later */}
                BahtsulMasail.tech
              </a>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} legacyBehavior>
                <a 
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ease-in-out",
                    "hover:bg-secondary/10 hover:text-secondary focus:bg-secondary/10 focus:text-secondary focus:outline-none",
                    pathname === link.href 
                      ? "text-secondary font-semibold bg-secondary/10"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </a>
              </Link>
            ))}
            
            {!loading && session && (
              <Link href="/admin/documents" legacyBehavior>
                 <a 
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 ease-in-out",
                    "hover:bg-secondary/10 hover:text-secondary focus:bg-secondary/10 focus:text-secondary focus:outline-none",
                    pathname === "/admin/documents" 
                      ? "text-secondary font-semibold bg-secondary/10"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Doc Management
                </a>
              </Link>
            )}

            {/* Auth Buttons & Theme Toggle - General styling, can be more specific with btn-islamic-primary etc. */}
            {!loading && !session && (
              <button
                onClick={() => signIn()} 
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm hover:shadow-md"
              >
                Sign In
              </button>
            )}
            {!loading && session && (
              <button
                onClick={() => signOut({ callbackUrl: '/' })} 
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm hover:shadow-md"
              >
                Sign Out
              </button>
            )}
            {loading && (
               <span className="text-muted-foreground px-3 py-2 text-sm">Loading...</span>
            )}
            
            <ThemeToggleButton /> {/* Added Theme Toggle Button */}

          </div>
          <div className="-mr-2 flex md:hidden items-center">
            {/* Theme toggle for mobile, placed before hamburger for consistency */}
            <ThemeToggleButton />
            <button 
              type="button" 
              className="ml-2 p-2 rounded-md text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-controls="mobile-menu"
              aria-expanded="false" // This would be dynamic with state
            >
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu - content needs to be styled with theme variables too */}
      {/* Example: <div className="md:hidden bg-background border-t border-border" id="mobile-menu"> ... */}
    </nav>
  );
} 