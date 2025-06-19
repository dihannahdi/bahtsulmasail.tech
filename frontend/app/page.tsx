import { Metadata } from "next";
import HeroSection from "./components/home/HeroSection";
import FeaturesSection from "./components/home/FeaturesSection";
import ScholarlyAuthoritySection from "./components/home/ScholarlyAuthoritySection";
import TechnologyShowcaseSection from "./components/home/TechnologyShowcaseSection";
import GlobalImpactSection from "./components/home/GlobalImpactSection";
import TrustedBySection from "./components/home/TrustedBySection";
import CallToActionSection from "./components/home/CallToActionSection";

export const metadata: Metadata = {
  title: "BahtsulMasail.tech - Revolutionizing Islamic Legal Discourse",
  description: "AI-powered platform bridging traditional Islamic scholarship with cutting-edge technology. Semantic search across 1000+ texts, blockchain-verified fatwas, and real-time scholarly collaboration.",
  keywords: [
    "Bahtsul Masail", 
    "Islamic Law", 
    "AI Islamic Research", 
    "Blockchain Fatwas", 
    "Islamic Scholarship", 
    "Fiqh", 
    "Islamic Legal Consultation",
    "Arabic NLP",
    "Islamic Technology"
  ],
  openGraph: {
    title: "BahtsulMasail.tech - Revolutionary Islamic Legal Discourse Platform",
    description: "Where traditional Islamic scholarship meets cutting-edge AI technology",
    images: ["/og-image.jpg"],
  },
};

export default function Home() {
  return (
    <main className="bg-background text-foreground overflow-hidden">
      <HeroSection />
      <FeaturesSection />
      <ScholarlyAuthoritySection />
      <TechnologyShowcaseSection />
      <GlobalImpactSection />
      <TrustedBySection />
      <CallToActionSection />
    </main>
  );
}
