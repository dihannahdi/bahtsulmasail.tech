import React, { lazy, Suspense, useEffect } from "react"; 
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/hooks/use-auth";
import AdminRoute from "@/components/layout/AdminRoute";
import { PageLoaderProvider } from "@/components/PageLoaderProvider";
import { PageLoader } from "@/components/ui/page-loader";
import { usePageLoader } from "@/hooks/usePageLoader";

// Loading component using our custom PageLoader
const LoadingFallback = () => <PageLoader show={true} />;

// Lazy-loaded components
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Browse = lazy(() => import("./pages/Browse"));
const Documents = lazy(() => import("./pages/Documents"));
const Upload = lazy(() => import("./pages/Upload"));
const ProcessingInfo = lazy(() => import("./pages/ProcessingInfo"));
const SemanticSearch = lazy(() => import("./pages/SemanticSearch"));
const FAQ = lazy(() => import("./pages/FAQ"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Contact = lazy(() => import("./pages/Contact"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse"));
const HistoryBahtsulMasail = lazy(() => import("./pages/history-bahtsul-masail"));
const EmailVerification = lazy(() => import("./components/ui/auth/EmailVerification"));

// For components exported as named exports, we need to handle them differently
const DocumentDetailPage = lazy(() => 
  import("./pages/DocumentDetailPage").then(module => ({
    default: module.DocumentDetailPage
  }))
);

const DocumentBrowsePage = lazy(() => 
  import("./pages/DocumentBrowsePage").then(module => ({
    default: module.DocumentBrowsePage
  }))
);

// Tashih routes
const TaqrirJamaiList = lazy(() => import("./components/tashih/TaqrirJamai/TaqrirJamaiList"));
const TaqrirJamaiDetail = lazy(() => import("./components/tashih/TaqrirJamai/TaqrirJamaiDetail"));
const TaqrirJamaiForm = lazy(() => import("./components/tashih/TaqrirJamai/TaqrirJamaiForm"));
const TaqrirKhassForm = lazy(() => import("./components/tashih/TaqrirKhass/TaqrirKhassForm"));
const MusohehDashboard = lazy(() => import("./components/tashih/Verification/MusohehDashboard"));
const TaqrirKhassVerification = lazy(() => import("./components/tashih/Verification/TaqrirKhassVerification"));
const RequestRevision = lazy(() => import("./components/tashih/Verification/RequestRevision"));

// Route change tracking component for loader
const RouteChangeTracker = () => {
  const { showLoader, hideLoader } = usePageLoader();
  const location = useLocation();
  
  useEffect(() => {
    // Check if this is the first location change after initial load
    const isFirstNavigation = !sessionStorage.getItem('hasNavigatedBefore');
    
    showLoader();
    
    // Show loader for longer on first navigation
    const loadingTime = isFirstNavigation ? 1200 : 600;
    
    const timer = setTimeout(() => {
      hideLoader();
      // Mark that navigation has occurred
      sessionStorage.setItem('hasNavigatedBefore', 'true');
    }, loadingTime);
    
    return () => clearTimeout(timer);
  }, [location.pathname, showLoader, hideLoader]);
  
  return null;
};

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="light" attribute="class">
          <TooltipProvider>
            <AuthProvider>
              <PageLoaderProvider>
                <RouteChangeTracker />
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/browse" element={<Browse />} />
                    <Route path="/documents" element={<Documents />} />
                    <Route path="/documents/browse" element={<DocumentBrowsePage />} />
                    <Route path="/documents/:id" element={<DocumentDetailPage />} />
                    <Route path="/upload" element={
                      <AdminRoute>
                        <Upload />
                      </AdminRoute>
                    } />
                    <Route path="/processing-info" element={<ProcessingInfo />} />
                    <Route path="/semantic-search" element={<SemanticSearch />} />
                    <Route path="/history-bahtsul-masail" element={<HistoryBahtsulMasail />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-of-use" element={<TermsOfUse />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/verify-email/:token" element={<EmailVerification />} />
                    <Route path="/tashih">
                      <Route index element={<Navigate to="/tashih/taqrir-jamai" replace />} />
                      
                      <Route path="taqrir-jamai" element={<TaqrirJamaiList />} />
                      <Route path="taqrir-jamai/:id" element={<TaqrirJamaiDetail />} />
                      <Route path="taqrir-jamai/create" element={<TaqrirJamaiForm />} />
                      <Route path="taqrir-jamai/:id/edit" element={<TaqrirJamaiForm isEdit={true} />} />
                      
                      <Route path="taqrir-jamai/:taqrirJamaiId/create-khass" element={<TaqrirKhassForm taqrirJamaiId={0} />} />
                      <Route path="taqrir-khass/:id/edit" element={<TaqrirKhassForm isEdit={true} taqrirJamaiId={0} />} />
                      
                      <Route path="verification" element={<MusohehDashboard />} />
                      <Route path="taqrir-khass/:id/verify" element={<TaqrirKhassVerification />} />
                      <Route path="taqrir-khass/:id/request-revision" element={<RequestRevision />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
                <Toaster />
                <Sonner />
              </PageLoaderProvider>
            </AuthProvider>
          </TooltipProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
