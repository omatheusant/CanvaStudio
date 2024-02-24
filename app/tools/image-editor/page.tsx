"use client";

import FilerobotImageEditor, { TABS } from "react-filerobot-image-editor";
import { colors, translations } from "./utils/constants";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ImageEditor = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [hasImage, setHasImage] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
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
      setImageUrl(imageUrl);
      setHasImage(true);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className={`size-full text-sm`}>
      {!hasImage && (
        <div className="flex size-full items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <h3 className=" text-4xl font-semibold md:text-5xl lg:text-6xl">
              Editor de Imagens
            </h3>
            <p className="mb-2 text-lg ">
              Nenhuma imagem foi encontrada, selecione uma imagem e comece a
              editar.
            </p>

            <Input
              name="nome"
              id="nome"
              type="file"
              accept="image/*"
              className="hidden"
              ref={inputRef}
              onChange={handleImageUpload}
            />

            <Button onClick={handleClick} className="text-base font-semibold">
              Selecionar imagem
            </Button>
          </div>
        </div>
      )}
      {hasImage && (
        <FilerobotImageEditor
          translations={translations}
          theme={{ palette: colors, typography: {} }}
          source={imageUrl}
          onSave={(editedImageObject, designState) =>
            console.log("saved", editedImageObject, designState)
          }
          annotationsCommon={{
            fill: "#ff0000",
          }}
          Text={{
            text: "Filerobot...",
            fonts: [
              { label: "Saira", value: "Saira" },
              "Sans-serif",
              "Serif",
              "Times New Roman",
              "Monospace",
              { label: "Comic Sans", value: "Comic-sans" },
            ],
          }}
          Rotate={{ angle: 90, componentType: "slider" }}
          Crop={{
            presetsItems: [
              {
                titleKey: "classicTv",
                descriptionKey: "4:3",
                ratio: 4 / 3,
                // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
              },
              {
                titleKey: "cinemascope",
                descriptionKey: "21:9",
                ratio: 21 / 9,
                // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
              },
            ],
            presetsFolders: [
              {
                titleKey: "socialMedia", // will be translated into Social Media as backend contains this translation key
                // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
                groups: [
                  {
                    titleKey: "facebook",
                    items: [
                      {
                        titleKey: "profile",
                        width: 180,
                        height: 180,
                        descriptionKey: "fbProfileSize",
                      },
                      {
                        titleKey: "coverPhoto",
                        width: 820,
                        height: 312,
                        descriptionKey: "fbCoverPhotoSize",
                      },
                    ],
                  },
                ],
              },
            ],
          }}
          tabsIds={[
            TABS.FILTERS,
            TABS.ADJUST,
            TABS.FINETUNE,
            TABS.ANNOTATE,
            TABS.RESIZE,
            TABS.WATERMARK,
          ]} // or {['Adjust', 'Annotate', 'Watermark']}
          defaultTabId={TABS.ADJUST} // or 'Annotate'
        />
      )}
    </div>
  );
};

export default ImageEditor;
