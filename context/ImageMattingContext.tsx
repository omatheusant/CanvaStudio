"use client";

// Importing the removeBackground function from the "@imgly/background-removal" package.
import removeBackground from "@imgly/background-removal";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

// Defining the structure of the context that will be used to share state across components.
interface ImageMattingContextType {
  status: string;
  isProcessing: boolean;
  processMessage: string;
  hasProcessedImage: boolean;
  imageUrl: string;
  originalImageUrl: string;
  processImage: (path: string) => Promise<void>;
  resetState: () => void;
  inferenceTime: number;
}

// Creating the context with initial values.
const ImageMattingContext = createContext<ImageMattingContextType>({
  status: "idle",
  isProcessing: false,
  processMessage: "",
  hasProcessedImage: false,
  imageUrl: "",
  originalImageUrl: "",
  processImage: async () => {},
  resetState: () => {},
  inferenceTime: 0,
});

// Messages associated with different processing statuses.
const STATUS_MESSAGES: Record<string, string> = {
  idle: "",
  init: "Incializando...",
  fetching: "Baixando imagem...",
  processing: "Removendo fundo...",
  done: "",
  error: "Error: Algo deu errado.",
};
// Statuses that indicate the processing is ongoing.
const PROCESSING_STATUS = ["init", "fetching", "processing"];

// A component that provides the ImageMattingContext to its children.
const ImageMattingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // State variables for managing the context.
  const [status, setStatus] = useState<string>("idle");
  const processMessage = useMemo<string>(
    () => STATUS_MESSAGES[status],
    [status],
  );
  const [hasProcessedImage, setHasProcessedImage] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [originalImageUrl, setOriginalImageUrl] = useState<string>("");
  const [inferenceTime, setInferenceTime] = useState<number>(0);

  // Function to reset the state to its initial values.
  function resetState() {
    setStatus("idle");
    setHasProcessedImage(false);
    setImageUrl("");
  }

  // Callback function to process an image.
  const processImage = useCallback(async (path: string) => {
    setOriginalImageUrl(path);

    // Fetching the image file from the provided path.
    const response = await fetch(path);
    const blob = await response.blob();
    const startTime = Date.now();

    // Initiating the processing status and removing the background.
    setStatus("init");
    let imageBlob: Blob;
    try {
      imageBlob = await removeBackground(blob, {
        progress: (key: string, current: number, total: number) => {
          if (key.startsWith("fetch:")) {
            setStatus("fetching");
          } else if (key.startsWith("compute:inference")) {
            setStatus("processing");
          }
        },
      });
    } catch (error) {
      // If an error occurs during processing, set the status to error.
      setStatus("error");
      console.error(error);
      return;
    }
    // Calculate the time taken for inference.
    const timeDiffInSeconds = (Date.now() - startTime) / 1000;
    setInferenceTime(timeDiffInSeconds);
    // Update the state with the processed image and set the status to idle.
    setHasProcessedImage(true);
    setImageUrl(URL.createObjectURL(imageBlob));
    setStatus("idle");
  }, []);

  // Providing the context value to its children.
  return (
    <ImageMattingContext.Provider
      value={{
        status,
        isProcessing: PROCESSING_STATUS.includes(status),
        processMessage,
        hasProcessedImage,
        imageUrl,
        originalImageUrl,
        processImage,
        resetState,
        inferenceTime,
      }}
    >
      {children}
    </ImageMattingContext.Provider>
  );
};

// Custom hook for consuming the ImageMattingContext.
export const useImageMatting = (): ImageMattingContextType => {
  const context = useContext(ImageMattingContext);
  if (context === undefined) {
    throw new Error(
      "useImageMatting must be used within an ImageMattingProvider",
    );
  }
  return context;
};

// Exporting the context and its provider for external use.
export { ImageMattingContext, ImageMattingContextProvider };
