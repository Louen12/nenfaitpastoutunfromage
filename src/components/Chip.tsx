import type { ReactNode } from "react";

type Tone = "cream" | "vert" | "dark" | "open" | "rouge";

interface ChipProps {
  children: ReactNode;
  tone?: Tone;
  sm?: boolean;
}

const toneStyles: Record<Tone, string> = {
  cream: "bg-creme text-texte",
  vert: "bg-vert text-creme-clair",
  dark: "bg-encre text-creme-clair",
  open: "bg-vert-eau text-vert-prof",
  rouge: "bg-rouge/10 text-rouge",
};

export default function Chip({ children, tone = "cream", sm = false }: ChipProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full font-sans font-medium whitespace-nowrap",
        sm ? "text-[10px] px-2 py-0.5" : "text-xs px-3 py-1",
        toneStyles[tone],
      ].join(" ")}
    >
      {children}
    </span>
  );
}
