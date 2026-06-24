import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const inputClass =
  "w-full rounded-lg border border-ligne bg-off px-3 py-2.5 text-sm text-encre placeholder:text-mute focus:outline-none focus:ring-2 focus:ring-vert/30 focus:border-vert";

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-texte mb-1">{label}</span>
      {children}
    </label>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={inputClass} {...props} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`${inputClass} min-h-[80px]`} {...props} />;
}

export function Select({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={inputClass} {...props}>
      {children}
    </select>
  );
}

export function Toggle({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="sr-only peer"
      />
      <div className="relative w-10 h-6 bg-ligne rounded-full peer-checked:bg-vert transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:size-5 after:transition-transform peer-checked:after:translate-x-4" />
      <span className="text-sm text-texte">{label}</span>
    </label>
  );
}

export function SubmitButton({ label = "Enregistrer" }: { label?: string }) {
  return (
    <button
      type="submit"
      className="w-full rounded-full bg-vert text-creme-clair font-semibold text-sm px-6 py-2.5 transition-colors hover:bg-vert-prof active:scale-[0.98]"
    >
      {label}
    </button>
  );
}

export function DeleteButton({
  onDelete,
}: {
  onDelete: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onDelete}
      className="w-full rounded-full border border-rouge text-rouge font-semibold text-sm px-6 py-2.5 transition-colors hover:bg-rouge/5"
    >
      Supprimer
    </button>
  );
}
