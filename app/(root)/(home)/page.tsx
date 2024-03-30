import { Button } from "@/components/ui/button";
import { navItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center">
      <div className="flex max-w-md flex-col justify-center">
        <Image
          src="/assets/logo-ismafer.png"
          alt="logo"
          width={300}
          height={300}
          className="self-center"
        />
        <p className="py-6 font-light text-[--light]">
          Ferramentas de uso rápido para criação de anúncios da Ismafer.
        </p>
        <div className="flex flex-col gap-6">
          {navItems.map((item) => (
            <Link href={item.route} key={item.name}>
              <Button className="w-full text-lg">{item.name}</Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
