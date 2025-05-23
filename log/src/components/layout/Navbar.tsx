import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, Search, Book, Info, User, LogOut, Magnet } from "lucide-react";
import { useTheme } from "next-themes";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/use-auth";
import LoginModal from "../ui/auth/LoginModal";
import RegisterModal from "../ui/auth/RegisterModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { user, logout, isAuthenticated } = useAuth();
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  const navigation = [
    { name: "Beranda", href: "/" },
    { name: "Tentang", href: "/about" },
    { name: "Jelajahi", href: "/browse" },
    { name: "Dokumen", href: "/documents" },
    { name: "Pemrosesan", href: "/processing-info" },
    { name: "Sejarah Bahtsul Masail", href: "/history-bahtsul-masail" },
    { name: "Unggah", href: "/upload" },
  ];

  return (
    <header className="fixed w-full bg-background/80 backdrop-blur-md border-b z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <h1 className="text-xl font-serif font-semibold">
            <span className="text-gradient dark:text-white">Bahtsul</span>
            <span className="text-gradient dark:text-white">Masail</span>
            <span className="text-xs align-top text-foreground/60 ml-1 dark:text-white/60">.tech</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navigation.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              asChild
              className="text-sm"
            >
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Ubah tema</span>
          </Button>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size={isMobile ? "sm" : "default"} className="gap-2">
                  <User className="h-4 w-4" />
                  {user?.username}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profil</DropdownMenuItem>
                <DropdownMenuItem>Pengaturan</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                  <LogOut className="h-4 w-4 mr-2" />
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="outline"
                size={isMobile ? "sm" : "default"}
                className="mr-1"
                onClick={handleOpenLoginModal}
              >
                Masuk
              </Button>
              
              <Button 
                className="bg-islamic-green hover:bg-islamic-green/90"
                size={isMobile ? "sm" : "default"}
                onClick={handleOpenRegisterModal}
              >
                Daftar
              </Button>
            </>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden ml-1"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Buka menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="justify-start"
                  asChild
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link href={item.href}>{item.name}</Link>
                </Button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Auth Modals */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToRegister={handleOpenRegisterModal}
      />
      
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={handleOpenLoginModal}
      />
    </header>
  );
};

export default Navbar;
