"use client";

import { usePathname } from "next/navigation";
import { FC, Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { routes } from "./routes";

export type LBreadcrumbItem = {
  label: string;
  href: string;
};

const LBreadcrumb: FC<{ items?: LBreadcrumbItem[] }> = ({
  items: endItems,
}) => {
  const pathname = usePathname();
  const startItems = routes[pathname as keyof typeof routes] || [];
  const items = [...startItems, ...(endItems || [])];

  return (
    <Breadcrumb className="py-8">
      <BreadcrumbList>
        {items.map((item, index) => (
          <Fragment key={index}>
            {index === items.length - 1 ? (
              <BreadcrumbPage key={`bc-page-${index}`}>
                {item.label}
              </BreadcrumbPage>
            ) : (
              <BreadcrumbItem key={`bc-item-${index}`}>
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {index < items.length - 1 && (
              <BreadcrumbSeparator key={`bc-separator-${index}`} />
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default LBreadcrumb;
