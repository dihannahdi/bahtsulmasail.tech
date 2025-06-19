"use client";

import { useState, useEffect } from "react";
import { Search, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

// Lightweight CSS-based animations
const LightweightHeroSection = () => {
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const router = useRouter();

  const placeholderTexts = [
    "Search Islamic texts...",
    "Find scholarly opinions...",
    "Explore Fiqh rulings...",
    "Discover knowledge...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get('search') as string;
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Simple CSS background animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent animate-pulse-slow" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Title with CSS animation */}
        <div className="space-y-6 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground">
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              BahtsulMasail
            </span>
            <span className="block text-2xl md:text-3xl lg:text-4xl font-medium text-muted-foreground mt-2">
              Islamic Scholarly Research Platform
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Access centuries of Islamic scholarship with modern AI-powered semantic search
          </p>
        </div>

        {/* Lightweight search bar */}
        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mt-12 animate-fade-in-up animation-delay-300">
          <div className="flex items-center px-6 py-4 bg-background/80 backdrop-blur-sm border border-border rounded-full hover:border-primary/50 focus-within:border-primary transition-all duration-300 shadow-lg hover:shadow-xl">
            <input
              name="search"
              type="text"
              placeholder={placeholderTexts[currentPlaceholderIndex]}
              className="w-full px-4 text-foreground bg-transparent border-none focus:outline-none text-lg placeholder:transition-all placeholder:duration-500"
              autoComplete="off"
            />
            <button
              type="submit"
              className="p-2 text-primary hover:text-primary/80 transition-colors hover:scale-110 transition-transform duration-200"
            >
              <Search className="w-6 h-6" />
            </button>
          </div>
        </form>

        {/* Simple CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-fade-in-up animation-delay-600">
          <button
            onClick={() => router.push('/search')}
            className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-medium"
          >
            Start Exploring
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
          
          <button
            onClick={() => router.push('/about')}
            className="inline-flex items-center px-8 py-4 bg-background border border-border text-foreground rounded-full hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-medium"
          >
            Learn More
          </button>
        </div>

        {/* Simple stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-in-up animation-delay-900">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary">1000+</div>
            <div className="text-sm text-muted-foreground">Islamic Texts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary">50+</div>
            <div className="text-sm text-muted-foreground">Scholars</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LightweightHeroSection; 