type Tone = "kraft" | "vert" | "creme" | "sombre";

interface PhotoSlotProps {
  label?: string;
  height?: string;
  className?: string;
  tone?: Tone;
}

const toneStyles: Record<Tone, { bg: string; stripe: string; text: string }> = {
  kraft: {
    bg: "bg-kraft/30",
    stripe: "bg-kraft/20",
    text: "text-kraft",
  },
  vert: {
    bg: "bg-vert-eau/40",
    stripe: "bg-vert-sauge/25",
    text: "text-vert",
  },
  creme: {
    bg: "bg-creme",
    stripe: "bg-ligne/40",
    text: "text-mute",
  },
  sombre: {
    bg: "bg-encre/10",
    stripe: "bg-encre/5",
    text: "text-mute",
  },
};

export default function PhotoSlot({
  label = "Photo",
  height = "h-48",
  className = "",
  tone = "kraft",
}: PhotoSlotProps) {
  const styles = toneStyles[tone];

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${height} ${styles.bg} ${className}`}
    >
      {/* Diagonal stripes */}
      <div
        className={`absolute inset-0 ${styles.stripe}`}
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent, transparent 8px, currentColor 8px, currentColor 9px)",
          opacity: 0.12,
        }}
      />
      {/* Label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-xs font-mono uppercase tracking-widest ${styles.text} opacity-60`}>
          {label}
        </span>
      </div>
    </div>
  );
}
