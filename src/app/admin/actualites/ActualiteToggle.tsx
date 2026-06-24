"use client";

import ToggleSwitch from "@/components/admin/ToggleSwitch";
import { togglePublie } from "./actions";

export default function ActualiteToggle({
  id,
  publie,
}: {
  id: string;
  publie: boolean;
}) {
  return (
    <ToggleSwitch
      checked={publie}
      onToggle={(val) => togglePublie(id, val)}
      label="Publié"
    />
  );
}
