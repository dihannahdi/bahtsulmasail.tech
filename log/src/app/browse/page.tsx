import { lazy } from "react";
import MainLayout from "@/components/layout/MainLayout";

// Lazy-loaded components
const Browse = lazy(() => import("@/pages/Browse"));

export const metadata = {
  title: 'Browse - Islamic Insight Nexus',
  description: 'Browse our collection of Islamic legal texts, rulings, and scholarly opinions.',
};

export default function BrowsePage() {
  return (
    <MainLayout>
      <Browse />
    </MainLayout>
  );
} 