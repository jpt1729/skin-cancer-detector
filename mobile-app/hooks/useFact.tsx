// ImageContext.tsx

import React, { createContext, useContext, ReactNode } from 'react';
import { skinCancerFacts } from "@/constants/Quotes";
// Define the context type
type FactContextType = {
  fact: string;
};

// Create the context with a default value
const ImageContext = createContext<FactContextType>({
    fact: "Exposure to ultraviolet (UV) radiation from the sun or tanning beds increases the risk of skin cancer."
});

type FactProviderProps = {
  children: ReactNode;
};

export const FactProvider = ({ children }: FactProviderProps) => {
    const fact = skinCancerFacts[
        Math.floor(Math.random() * skinCancerFacts.length)
      ]
  return (
    <ImageContext.Provider value={{ fact }}>
      {children}
    </ImageContext.Provider>
  );
};

// Custom hook to use the ImageContext
export const useFact = () => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error('useImage must be used within an ImageProvider');
  }
  return context;
};