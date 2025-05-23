import { ReactNode, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/components/ui/use-toast';
import { Spinner } from '@/components/ui/spinner';

interface AdminRouteProps {
  children: ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Show loading state while authentication status is being determined
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="lg" className="text-islamic-green" />
      </div>
    );
  }
  
  // Use useEffect to handle navigation and toast after render
  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to access this page.",
        variant: "destructive",
      });
      navigate('/', { replace: true });
    }
    
    // If authenticated but not admin, show access denied
    else if (!isLoading && isAuthenticated && user?.role !== 'admin') {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page. Administrator access required.",
        variant: "destructive",
      });
      navigate('/', { replace: true });
    }
  }, [isLoading, isAuthenticated, user, toast, navigate]);
  
  // If authentication checks passed, render the children
  if (!isLoading && isAuthenticated && user?.role === 'admin') {
    return <>{children}</>;
  }
  
  // Return empty during redirects to prevent flickering
  return null;
} 