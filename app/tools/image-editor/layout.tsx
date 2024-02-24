import React from "react";

const ImageEditorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex size-full flex-col justify-between ">{children}</main>
  );
};

export default ImageEditorLayout;
