// ImageContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { CameraCapturedPicture } from 'expo-camera';

// Define the context type
type ImageContextType = {
  image: CameraCapturedPicture | null;
  updateImage: (image: CameraCapturedPicture) => void;
};

// Create the context with a default value
const ImageContext = createContext<ImageContextType | undefined>(undefined);

type ImageProviderProps = {
  children: ReactNode;
};

export const ImageProvider = ({ children }: ImageProviderProps) => {
  const [image, setImage] = useState<CameraCapturedPicture | null>(null);

  const updateImage = (image: CameraCapturedPicture) => {
    setImage(image);
  };

  return (
    <ImageContext.Provider value={{ image, updateImage }}>
      {children}
    </ImageContext.Provider>
  );
};

// Custom hook to use the ImageContext
export const useImage = () => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error('useImage must be used within an ImageProvider');
  }
  return context;
};
