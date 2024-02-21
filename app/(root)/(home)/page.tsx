import { Button } from "@/components/ui/button";
import React from "react";

const HomePage = () => {
  return (
    <div className="flex items-center justify-center px-8">
      <div className=" flex flex-col items-center gap-3 text-center">
        <h1 className="text-6xl font-semibold">
          O que você vai <span className="text-gradient">criar </span>
          hoje?
        </h1>
        <span className="max-w-[70%]">
          Ferramentas de uso rápido para criação e edição de fotos, dedign e
          anúncios para diferentes marketplaces
        </span>
        <Button className="primary-gradient mt-3 h-12 w-64 text-xl font-semibold">
          Comece agora
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
