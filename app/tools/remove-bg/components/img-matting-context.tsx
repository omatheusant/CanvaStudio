"use client";

import removeBackground from "@imgly/background-removal";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface ImageMattingContextType {
  status: string;
  isProcessing: boolean;
  processMessage: string;
  hasProcessedImage: boolean;
  imageUrl: string;
  originalImageUrl: string | undefined;
  processImage: (path: string) => Promise<void>;
  resetState: () => void;
  inferenceTime: number;
}

const ImageMattingContext = createContext<ImageMattingContextType>({
  status: "idle",
  isProcessing: false,
  processMessage: "",
  hasProcessedImage: false,
  imageUrl: "",
  originalImageUrl: undefined,
  processImage: async () => {},
  resetState: () => {},
  inferenceTime: 0,
});

const STATUS_MESSAGES: Record<string, string> = {
  idle: "",
  init: "Incializando...",
  fetching: "Baixando imagem...",
  processing: "Removendo fundo...",
  done: "",
  error: "Error: Algo deu errado.",
};
const PROCESSING_STATUS = ["init", "fetching", "processing"];

const ImageMattingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [status, setStatus] = useState<string>("idle");
  const processMessage = useMemo<string>(
    () => STATUS_MESSAGES[status],
    [status],
  );
  const [hasProcessedImage, setHasProcessedImage] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [originalImageUrl, setOriginalImageUrl] = useState<
    string | undefined
  >();
  const [inferenceTime, setInferenceTime] = useState<number>(0);

  function resetState() {
    setStatus("idle");
    setHasProcessedImage(false);
    setImageUrl("");
  }

  const processImage = useCallback(async (path: string) => {
    setOriginalImageUrl(path);

    const response = await fetch(path);
    const blob = await response.blob();
    const startTime = Date.now();

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
      setStatus("error");
      console.error(error);
      return;
    }
    const timeDiffInSeconds = (Date.now() - startTime) / 1000;
    setInferenceTime(timeDiffInSeconds);
    setHasProcessedImage(true);
    setImageUrl(URL.createObjectURL(imageBlob));
    setStatus("idle");
  }, []);

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

export const useImageMatting = (): ImageMattingContextType => {
  const context = useContext(ImageMattingContext);
  if (context === undefined) {
    throw new Error(
      "useImageMatting must be used within a ImageMattingProvider",
    );
  }
  return context;
};

export { ImageMattingContext, ImageMattingContextProvider };
