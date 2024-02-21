import { NavbarItem } from "@/types/type";

export const navItems: NavbarItem[] = [
  {
    label: "Ferramentas",
    route: "/tools",
    subItems: [
      {
        name: "Remover Fundo",
        route: "/tools/remove-bg",
        description: "Remova fundos de imagens com facilidade.",
        imageUrl: "/assets/remove-bg.jpg",
      },
      {
        name: "Editor",
        route: `/tools/editor/`,
        description: "Crie e edite designs personalizados.",
        imageUrl: "/assets/editor.png",
      },
    ],
  },
];
