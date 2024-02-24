"use client";

import FilerobotImageEditor, { TABS } from "react-filerobot-image-editor";
import { colors, translations } from "./utils/constants";

const ImageEditor = () => {
  return (
    <div className={`size-full text-sm`}>
      {/* @ts-ignore */}
      <FilerobotImageEditor
        translations={translations}
        theme={{ palette: colors, typography: {} }}
        source="https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg"
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
        ]} // or {['Adjust', 'Annotate', 'Watermark']}
        defaultTabId={TABS.ADJUST} // or 'Annotate'
      />
    </div>
  );
};

export default ImageEditor;
