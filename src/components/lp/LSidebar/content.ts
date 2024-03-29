import { Home, LineChart, Package, ShoppingCart, Users } from "lucide-react";

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
    icon: LineChart,
    label: "Analytics",
    href: "/metricas",
  },
];
