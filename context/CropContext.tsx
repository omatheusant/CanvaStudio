"use client";

import React, { createContext, useCallback, useContext, useState } from "react";

interface CropContextType {
  croppedImages: Array<string>;
  originalImageUrl: string;
  processImage: (path: string) => Promise<void>;
  hasProcessedImages: boolean;
}

const CropContext = createContext<CropContextType>({
  croppedImages: [],
  originalImageUrl: "",
  processImage: async () => {},
  hasProcessedImages: false,
});

const CropContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [originalImageUrl, setOriginalImageUrl] = useState<string>("");
  const [croppedImages, setCroppedImages] = useState<string[]>([]);
  const [hasProcessedImages, setHasProcessedImages] = useState<boolean>(false);

  const resizeImage = (image: any, width: number, height: number) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Calculate the aspect ratio of the original image
    const aspectRatio = image.width / image.height;

    // Calculate the dimensions for the resized image
    let newWidth = width;
    let newHeight = height;
    if (aspectRatio > 1) {
      // Landscape image
      newHeight = width / aspectRatio;
    } else {
      // Portrait image
      newWidth = height * aspectRatio;
    }

    // Set the canvas dimensions to the resized dimensions
    canvas.width = newWidth;
    canvas.height = newHeight;

    // Draw the image onto the canvas
    ctx?.drawImage(image, 0, 0, newWidth, newHeight);

    // Return the data URL of the resized image
    return canvas.toDataURL("image/jpeg", 1.0);
  };

  const processImage = useCallback(async (path: string) => {
    setOriginalImageUrl(path);

    const response = await fetch(path);
    const blob = await response.blob();

    const image = new Image();
    const imageUrl = URL.createObjectURL(blob);
    image.src = imageUrl;

    image.onload = () => {
      const resizedOriginalImage = resizeImage(image, 1200, 1200);
      setOriginalImageUrl(resizedOriginalImage);
      const canvasSize = { width: image.width, height: image.height };
      const cortes = [
        { nome: "Superior Esquerdo", x: 0, y: 0 },
        { nome: "Superior Direito", x: canvasSize.width, y: 0 },
        { nome: "Inferior Esquerdo", x: 0, y: canvasSize.height },
        { nome: "Inferior Direito", x: canvasSize.width, y: canvasSize.height },
        { nome: "Meio Superior", x: canvasSize.width / 2, y: 0 },
        {
          nome: "Meio Inferior",
          x: canvasSize.width / 2,
          y: canvasSize.height,
        },
        { nome: "Esquerda Meio", x: 0, y: canvasSize.height / 2 },
        { nome: "Direita Meio", x: canvasSize.width, y: canvasSize.height / 2 },
        { nome: "Centro", x: canvasSize.width / 2, y: canvasSize.height / 2 },
        { nome: "Canto Superior Esquerdo", x: 100, y: 100 },
      ];

      const processed = cortes.map((corte) => {
        const canvasCorte = document.createElement("canvas");
        canvasCorte.width = canvasSize.width;
        canvasCorte.height = canvasSize.height;
        const ctxCorte = canvasCorte.getContext("2d");
        // @ts-ignore
        ctxCorte.drawImage(
          image,
          -corte.x,
          -corte.y,
          canvasSize.width * 2,
          canvasSize.height * 2,
        );

        setHasProcessedImages(true);

        return resizeImage(canvasCorte, 1200, 1200);
      });

      // Update the state with the array of cropped images
      setCroppedImages(processed);
    };
  }, []);
  return (
    <CropContext.Provider
      value={{
        croppedImages,
        originalImageUrl,
        processImage,
        hasProcessedImages,
      }}
    >
      {children}
    </CropContext.Provider>
  );
};

export const useCropContext = () => {
  const context = useContext(CropContext);

  if (!context) {
    throw new Error("You cant use this context outside a context provider");
  }
  return context;
};

export { CropContext, CropContextProvider };
