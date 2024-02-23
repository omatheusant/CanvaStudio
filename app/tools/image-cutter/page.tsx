"use client";

import { Button } from "@/components/ui/button";
import { useCropContext } from "@/context/CropContext";
import { downloadImagesAsZip } from "@/lib/utils";
import Image from "next/image";
import React, { useRef } from "react";

const ImageCutter = () => {
  const { croppedImages, processImage, originalImageUrl, hasProcessedImages } =
    useCropContext();

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    imageInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();

    reader.onload = async (event) => {
      const imageUrl = event.target?.result as string;

      console.log("image received, processing...");
      processImage(imageUrl);
    };

    reader.readAsDataURL(file);
  };

  const handleDownloadAll = () => {
    const allImages = [originalImageUrl, ...croppedImages];
    downloadImagesAsZip(allImages);
  };

  return (
    <section className="flex h-full flex-col items-center gap-6">
      <h1 className="text-center text-4xl font-semibold">
        Cortador de imagens
      </h1>

      <div className="relative size-fit">
        <div className="custom-scrollbar relative flex h-[400px] max-h-[400px] w-[70vw] max-w-[700px] flex-wrap items-center justify-center gap-3 overflow-auto rounded-xl bg-primary-black p-6 shadow-lg shadow-primary-black">
          {originalImageUrl && (
            <Image
              src={originalImageUrl}
              width={200}
              height={200}
              alt="Original image"
            />
          )}
          {croppedImages.map((image, index) => (
            <Image
              key={index}
              src={image}
              width={200}
              height={200}
              alt="Cropped Image"
            />
          ))}
        </div>
        {!hasProcessedImages && (
          <Button
            style={{ transform: "translate(-50%, -50%)" }}
            onClick={handleClick}
            className="primary-gradient absolute left-[50%] top-[50%] font-semibold"
          >
            Selecionar imagem
          </Button>
        )}
        {hasProcessedImages && (
          <Button
            onClick={handleDownloadAll}
            className="primary-gradient absolute bottom-2 right-2 font-semibold"
          >
            Baixar Imagens
          </Button>
        )}
      </div>
      <input
        ref={imageInputRef}
        id="imageUpload"
        accept="image/*"
        type="file"
        className="hidden"
        onChange={handleImageUpload}
      />
    </section>
  );
};

export default ImageCutter;
