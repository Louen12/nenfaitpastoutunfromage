"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

interface TopbarProps {
  title: string;
  back?: boolean;
  dark?: boolean;
  action?: ReactNode;
}

export default function Topbar({ title, back = false, dark = false, action }: TopbarProps) {
  const router = useRouter();

  const bg = dark ? "bg-vert-prof" : "bg-creme-clair";
  const text = dark ? "text-creme-clair" : "text-encre";
  const iconColor = dark ? "text-creme-clair" : "text-texte";

  return (
    <header className={`sticky top-0 z-40 flex items-center justify-between h-[52px] px-4 ${bg} ${text}`}>
      {/* Left: back arrow or hamburger */}
      <button
        onClick={back ? () => router.back() : undefined}
        className={`flex items-center justify-center size-9 -ml-1 ${iconColor}`}
        aria-label={back ? "Retour" : "Menu"}
      >
        {back ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="size-5">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {/* Center: title */}
      <h1 className="text-sm font-semibold font-sans tracking-tight truncate">
        {title}
      </h1>

      {/* Right: optional action or spacer */}
      <div className="flex items-center justify-center size-9 -mr-1">
        {action ?? <span className="size-5" />}
      </div>
    </header>
  );
}
