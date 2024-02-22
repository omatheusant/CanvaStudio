"use client";

import React, { useRef } from "react";

const ImageCutter = () => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const handleImageUpload = () => {};

  return (
    <section>
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
