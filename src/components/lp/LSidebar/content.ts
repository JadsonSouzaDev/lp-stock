import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  Megaphone,
} from "lucide-react";

import { MenuItem } from "./type";

export const menuItems: MenuItem[] = [
  {
    icon: Megaphone,
    label: "Campanhas",
    href: "/admin/campanhas",
  },
  {
    icon: Package,
    label: "Produtos",
    href: "/admin/produtos",
  },
  {
    icon: Users,
    label: "Clientes",
    href: "/admin/clientes",
  },
  {
    icon: ShoppingCart,
    label: "Pedidos",
    href: "/admin/pedidos",
  },
  {
    icon: DollarSign,
    label: "Controle de caixa",
    href: "/admin/controle-de-caixa",
  },
];
