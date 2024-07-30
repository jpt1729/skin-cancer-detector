// ImageContext.tsx

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { CameraCapturedPicture } from "expo-camera";

// Define the context type
type ImageContextType = {
  image: CameraCapturedPicture | null;
  updateImage: (image: CameraCapturedPicture) => void;
  imageReady: boolean;
  imageDetails: any;
};

// Create the context with a default value
const ImageContext = createContext<ImageContextType | undefined>(undefined);

type ImageProviderProps = {
  children: ReactNode;
};

export const ImageProvider = ({ children }: ImageProviderProps) => {
  const [image, setImage] = useState<CameraCapturedPicture | null>(null);
  const [imageReady, setImageReady] = useState(false);
  const [imageDetails, setImageDetails] = useState({
    resolution: {
      width: 256,
      height: 256,
    },
  });
  const updateImage = (image: CameraCapturedPicture) => {
    setImage(image);
  };
  useEffect(() => {
    const getFinalResolution = async () => {
      const imageDetailsResponse = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/model-details`
      );
      const updatedImageDetails = await imageDetailsResponse.json();
      setImageDetails(updatedImageDetails)
      setImageReady(true)
    };
    getFinalResolution();
  }, [setImageReady]);
  return (
    <ImageContext.Provider value={{ image, updateImage, imageReady, imageDetails }}>
      {children}
    </ImageContext.Provider>
  );
};

// Custom hook to use the ImageContext
export const useImage = () => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error("useImage must be used within an ImageProvider");
  }
  return context;
};
