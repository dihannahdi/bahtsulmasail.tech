import { Metadata } from "next";
import { HeroSection } from "./components/sections/HeroSection";
import { TraditionSection } from "./components/sections/TraditionSection";
import { TechnologySection } from "./components/sections/TechnologySection";
import { FeaturesSection } from "./components/sections/FeaturesSection";
import { CommunitySection } from "./components/sections/CommunitySection";
import { CallToActionSection } from "./components/sections/CallToActionSection";

export const metadata: Metadata = {
  title: "Bahtsul Masail - Islamic Legal Consultation Platform",
  description: "A modern platform for Islamic legal consultation and scholarly discourse.",
  keywords: ["Bahtsul Masail", "Islamic Law", "Legal Consultation", "Islamic Studies", "Fiqh"],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <TraditionSection />
      <TechnologySection />
      <FeaturesSection />
      <CommunitySection />
      <CallToActionSection />
    </main>
  );
}
