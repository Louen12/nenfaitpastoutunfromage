"use client";

import { usePathname } from "next/navigation";
import { CartProvider } from "@/lib/cart";
import TabBar from "./TabBar";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <CartProvider>
      <main className="flex-1 pb-20">{children}</main>
      <TabBar />
    </CartProvider>
  );
}
