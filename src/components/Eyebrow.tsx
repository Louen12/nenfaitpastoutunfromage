import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  color?: string;
}

export default function Eyebrow({ children, color = "vert" }: EyebrowProps) {
  return (
    <div className="flex items-center gap-3">
      <span className={`block w-8 h-px bg-${color}`} />
      <span className={`text-[11px] font-mono uppercase tracking-widest text-${color}`}>
        {children}
      </span>
    </div>
  );
}
