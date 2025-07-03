'use client';

import { createContext, useState, ReactNode } from 'react';

interface AvatarContextType {
  avatarUrl: string | null;
  updateAvatarUrl: (url: string | null) => void;
}

export const AvatarContext = createContext<AvatarContextType>(
  {} as AvatarContextType
);

function AvatarState({ children }: { children: ReactNode }) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const updateAvatarUrl = (url: string | null) => {
    setAvatarUrl(url);
  };

  return (
    <AvatarContext.Provider value={{ avatarUrl, updateAvatarUrl }}>
      {children}
    </AvatarContext.Provider>
  );
}

export default AvatarState;
