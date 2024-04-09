import { Home, Package, ShoppingCart, Users, DollarSign } from "lucide-react";

import { MenuItem } from "./type";

export const menuItems: MenuItem[] = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    icon: ShoppingCart,
    label: "Pedidos",
    href: "/admin/pedidos",
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
    icon: DollarSign,
    label: "Controle de caixa",
    href: "/admin/controle-de-caixa",
  },
];
