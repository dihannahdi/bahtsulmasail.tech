"use client";

import { useState, useCallback, createContext, useContext } from 'react';

type PageLoaderContextType = {
  showLoader: () => void;
  hideLoader: () => void;
  isLoading: boolean;
};

const defaultContext: PageLoaderContextType = {
  showLoader: () => {},
  hideLoader: () => {},
  isLoading: false,
};

export const PageLoaderContext = createContext<PageLoaderContextType>(defaultContext);

export const usePageLoaderProvider = () => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = useCallback(() => {
    setIsLoading(true);
  }, []);

  const hideLoader = useCallback(() => {
    setIsLoading(false);
  }, []);

  return {
    showLoader,
    hideLoader,
    isLoading,
  };
};

export const usePageLoader = () => useContext(PageLoaderContext); 