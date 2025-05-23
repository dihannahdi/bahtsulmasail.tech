import { ReactNode } from 'react';
import { PageLoaderContext, usePageLoaderProvider } from '@/hooks/usePageLoader';
import { PageLoader } from '@/components/ui/page-loader';

interface PageLoaderProviderProps {
  children: ReactNode;
}

export function PageLoaderProvider({ children }: PageLoaderProviderProps) {
  const pageLoaderValue = usePageLoaderProvider();

  return (
    <PageLoaderContext.Provider value={pageLoaderValue}>
      <PageLoader show={pageLoaderValue.isLoading} />
      {children}
    </PageLoaderContext.Provider>
  );
} 