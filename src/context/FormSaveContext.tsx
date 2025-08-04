'use client';
// src/contexts/FormContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your context state and actions
interface FormContextType {
  triggerSidebarUpdate: () => void;
  sidebarUpdateKey: number; // A key to force a re-render
}

// Create the context with a default value
const FormContext = createContext<FormContextType | undefined>(undefined);

// Create a provider component that will wrap your application or a part of it
export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarUpdateKey, setSidebarUpdateKey] = useState(0);

  const triggerSidebarUpdate = () => {
    // By changing this key, any component that uses this key
    // as a React key will be forced to re-render.
    setSidebarUpdateKey((prevKey) => prevKey + 1);
  };

  const value = {
    triggerSidebarUpdate,
    sidebarUpdateKey,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

// Custom hook for easier access to the context
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
