import { Metadata } from 'next'
import { lazy } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { PageLoader } from "@/components/ui/page-loader";

// Lazy-loaded components
const Index = lazy(() => import("@/pages/Index"));

export const metadata: Metadata = {
  title: 'Home - Islamic Insight Nexus',
  description: 'Welcome to Islamic Insight Nexus - Your source for Islamic knowledge and insights',
}

export default function Home() {
  return (
    <MainLayout>
      <Index />
    </MainLayout>
  );
} 