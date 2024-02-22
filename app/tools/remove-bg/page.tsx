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
    resetState,
  } = useImageMatting();

  const handleClick = () => {
    imageInputRef.current?.click();
  };

  const handleNewImage = () => {
    resetState();
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
      <h1 className="mb-4 text-4xl">Removedor de Fundo</h1>
      <div className="relative -z-10 flex min-h-[400px] w-fit min-w-[600px] flex-col items-center justify-center gap-3 rounded-xl bg-primary-black shadow-lg shadow-primary-black">
        {isProcessing && (
          <div className="relative flex size-full items-center justify-center">
            <Image
              width={500}
              height={500}
              src={originalImageUrl}
              alt="Imagem com fundo"
              className="blur-sm"
            />
            <div className="absolute flex flex-col items-center justify-center">
              <Image
                src="/assets/loading.svg"
                alt="loading gif"
                width={80}
                height={80}
              />
              <p className="text-lg font-thin">{processMessage}</p>
            </div>
          </div>
        )}
        {!isProcessing && !hasProcessedImage && (
          <Button
            onClick={handleClick}
            className="primary-gradient font-semibold"
          >
            Selecionar imagem
          </Button>
        )}

        {imageUrl && (
          <div>
            <Image
              fill
              src={imageUrl}
              alt="Imagem sem fundo"
              className="relative"
            />
            <div className="absolute -right-36 bottom-0  flex flex-col items-end gap-3">
              <a href={imageUrl} download="remove-bg-image">
                <Button className="primary-gradient z-20 font-semibold">
                  Download
                </Button>
              </a>
              <Button
                variant="outline"
                onClick={handleNewImage}
                className=" z-20 font-semibold"
              >
                Nova imagem
              </Button>
            </div>
          </div>
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
