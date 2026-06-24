import type { ReactNode, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "dark" | "ghost" | "cream";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  full?: boolean;
  sm?: boolean;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  primary: "bg-vert text-creme-clair hover:bg-vert-prof",
  dark: "bg-encre text-creme-clair hover:bg-texte",
  ghost: "bg-transparent border border-vert text-vert hover:bg-vert/5",
  cream: "bg-creme-clair text-texte hover:bg-creme",
};

export default function Button({
  variant = "primary",
  full = false,
  sm = false,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center font-sans font-semibold rounded-full transition-colors",
        sm ? "text-xs px-4 py-1.5" : "text-sm px-6 py-2.5",
        full ? "w-full" : "",
        variantStyles[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}
