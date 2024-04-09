"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

type ActiveLinkProps = {
  children: React.ReactNode;
  href: string;
  activeClassName: string;
  queryParam?: string;
  comparator?: string;
  scroll?: boolean;
};

export default function ActiveLink({
  children,
  href,
  activeClassName,
  queryParam,
  comparator,
  scroll = true,
  ...props
}: ActiveLinkProps) {
  const currentRoute = usePathname();
  let isActive;

  if (comparator) {
    isActive = queryParam === comparator;
  } else {
    isActive = currentRoute === href;
  }

  return (
    <Link
      href={href}
      className={isActive ? activeClassName : undefined}
      scroll={scroll}
      {...props}
    >
      {children}
    </Link>
  );
}
