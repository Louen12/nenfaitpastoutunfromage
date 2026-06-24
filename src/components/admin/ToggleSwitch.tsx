"use client";

import { useTransition } from "react";

export default function ToggleSwitch({
  checked,
  onToggle,
  label,
}: {
  checked: boolean;
  onToggle: (value: boolean) => Promise<void>;
  label?: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => onToggle(!checked))}
      className="flex items-center gap-2 disabled:opacity-50"
      aria-label={label}
    >
      <div
        className={`relative w-10 h-6 rounded-full transition-colors ${
          checked ? "bg-vert" : "bg-ligne"
        }`}
      >
        <div
          className={`absolute top-0.5 left-0.5 size-5 bg-white rounded-full transition-transform ${
            checked ? "translate-x-4" : ""
          }`}
        />
      </div>
    </button>
  );
}
