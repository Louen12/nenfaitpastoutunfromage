"use client";

import ToggleSwitch from "@/components/admin/ToggleSwitch";
import { toggleDisponible } from "./actions";

export default function ProduitToggle({
  id,
  disponible,
}: {
  id: string;
  disponible: boolean;
}) {
  return (
    <ToggleSwitch
      checked={disponible}
      onToggle={(val) => toggleDisponible(id, val)}
      label="Disponible"
    />
  );
}
