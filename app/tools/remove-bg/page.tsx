"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useImageMatting } from "./components/img-matting-context";

const RemoveBg = () => {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const {
    imageUrl,
    originalImageUrl,
    hasProcessedImage,
    isProcessing,
    processMessage,
    processImage,
  } = useImageMatting();

  const handleClick = () => {
    imageInputRef.current?.click();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <section className="flex h-full flex-col items-center gap-2 font-semibold">
      <h1 className="text-3xl">Removedor de Fundo</h1>
      <div className="relative flex min-h-[400px] w-fit min-w-[600px] flex-col items-center justify-center gap-5 rounded-xl bg-primary-black shadow-lg shadow-primary-black">
        {!isProcessing && !hasProcessedImage && (
          <Button
            onClick={handleClick}
            className="primary-gradient font-semibold"
          >
            Selecionar imagem
          </Button>
        )}

        {!imageUrl && originalImageUrl && (
          <div className="relative flex size-full items-center justify-center">
            <Image
              width={500}
              height={500}
              src={originalImageUrl}
              alt="Imagem com fundo"
              className="blur-sm"
            />
            <p className="absolute">{processMessage}</p>
          </div>
        )}

        {imageUrl && (
          <>
            <Image
              fill
              src={imageUrl}
              alt="Imagem sem fundo"
              className="relative"
            />
            <a
              href={imageUrl}
              download="remove-bg-image"
              className="absolute -bottom-5"
            >
              <Button className="font-semibold">Download</Button>
            </a>
          </>
        )}

        <input
          ref={imageInputRef}
          id="imageUpload"
          accept="image/*"
          type="file"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>
    </section>
  );
};

export default RemoveBg;
