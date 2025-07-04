'use client';

import { createContext, useState, ReactNode, useCallback } from 'react';

interface AvatarContextType {
  avatarUrl: string | null;
  updateAvatarUrl: (url: string | null) => void;
  avatarPreview: string | null;
  updateAvatarPreview: (url: string | null) => void;
}

export const AvatarContext = createContext<AvatarContextType>(
  {} as AvatarContextType
);

function AvatarState({ children }: { children: ReactNode }) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  // Dependency array for useCallback: setAvatarUrl & setAvatarPreview are stable, so no dependencies needed
  const updateAvatarUrl = useCallback((url: string | null) => {
    setAvatarUrl(url || '');
  }, []);

  const updateAvatarPreview = useCallback((url: string | null) => {
    setAvatarPreview(url || '');
  }, []);

  return (
    <AvatarContext.Provider
      value={{
        avatarUrl,
        updateAvatarUrl,
        avatarPreview,
        updateAvatarPreview,
      }}>
      {children}
    </AvatarContext.Provider>
  );
}

export default AvatarState;
