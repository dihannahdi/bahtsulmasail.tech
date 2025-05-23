import { lazy } from "react";
import MainLayout from "@/components/layout/MainLayout";

// Lazy-loaded components
const About = lazy(() => import("@/pages/About"));

export const metadata = {
  title: 'About - Islamic Insight Nexus',
  description: 'Learn more about Islamic Insight Nexus, our mission, and our team.',
};

export default function AboutPage() {
  return (
    <MainLayout>
      <About />
    </MainLayout>
  );
} 