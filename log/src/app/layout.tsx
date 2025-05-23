import { Inter } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/hooks/use-auth";
import { PageLoaderProvider } from "@/components/PageLoaderProvider";
import { PageLoader } from "@/components/ui/page-loader";

const inter = Inter({ subsets: ['latin'] })

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export const metadata = {
  title: 'Islamic Insight Nexus',
  description: 'Platform komprehensif untuk menjelajahi teks-teks hukum Islam dengan kemampuan pencarian lanjutan dan alat analisis modern.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="light" attribute="class">
            <TooltipProvider>
              <AuthProvider>
                <PageLoaderProvider>
                  {children}
                  <Toaster />
                  <Sonner />
                </PageLoaderProvider>
              </AuthProvider>
            </TooltipProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
} 