"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ClientShellProps {
  navbar: ReactNode;
  footer: ReactNode;
  stickyBar: ReactNode;
  children: ReactNode;
}

export default function ClientShell({ navbar, footer, stickyBar, children }: ClientShellProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && navbar}
      {children}
      {!isAdmin && footer}
      {!isAdmin && stickyBar}
      {!isAdmin && <div className="h-16 md:h-0" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />}
    </>
  );
}
