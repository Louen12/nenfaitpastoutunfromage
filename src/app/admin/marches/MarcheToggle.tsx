"use client";

import ToggleSwitch from "@/components/admin/ToggleSwitch";
import { toggleActif } from "./actions";

export default function MarcheToggle({
  id,
  actif,
}: {
  id: string;
  actif: boolean;
}) {
  return (
    <ToggleSwitch
      checked={actif}
      onToggle={(val) => toggleActif(id, val)}
      label="Actif cette semaine"
    />
  );
}
