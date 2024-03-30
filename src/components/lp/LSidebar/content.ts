import { Home, Package, ShoppingCart, Users, DollarSign } from "lucide-react";

import { MenuItem } from "./type";

export const menuItems: MenuItem[] = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: ShoppingCart,
    label: "Pedidos",
    href: "/pedidos",
  },
  {
    icon: Package,
    label: "Produtos",
    href: "/produtos",
  },
  {
    icon: Users,
    label: "Clientes",
    href: "/clientes",
  },
  {
    icon: DollarSign,
    label: "Controle de caixa",
    href: "/controle-de-caixa",
  },
];
