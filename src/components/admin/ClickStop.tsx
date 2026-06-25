"use client";

export default function ClickStop({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={className} onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
      {children}
    </div>
  );
}
