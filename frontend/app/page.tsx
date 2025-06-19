import { Metadata } from "next";
import LightweightHeroSection from "./components/sections/LightweightHeroSection";
// Performance optimization: temporarily removed heavy Framer Motion sections
// import { TraditionSection } from "./components/sections/TraditionSection";
// import { TechnologySection } from "./components/sections/TechnologySection";
// import { FeaturesSection } from "./components/sections/FeaturesSection";
// import { CommunitySection } from "./components/sections/CommunitySection";
// import { CallToActionSection } from "./components/sections/CallToActionSection";

export const metadata: Metadata = {
  title: "Bahtsul Masail - Islamic Legal Consultation Platform",
  description: "A modern platform for Islamic legal consultation and scholarly discourse.",
  keywords: ["Bahtsul Masail", "Islamic Law", "Legal Consultation", "Islamic Studies", "Fiqh"],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <LightweightHeroSection />
      {/* Temporarily removed for performance optimization */}
      {/* <TraditionSection />
      <TechnologySection />
      <FeaturesSection />
      <CommunitySection />
      <CallToActionSection /> */}
    </main>
  );
}
