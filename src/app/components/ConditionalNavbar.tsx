"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/app/components/Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  if (pathname?.startsWith("/wedding")) {
    return null;
  }

  return <Navbar />;
}

