"use client";

import { useTransition } from "react";
import { type Tables } from "@/utils/supabase/database.types";
import { createMarche, updateMarche, deleteMarche } from "@/app/admin/marches/actions";
import { Field, Input, Select, Toggle, SubmitButton, DeleteButton } from "./FormField";

type Marche = Tables<"marches">;

const JOURS = [
  { value: "1", label: "Lundi" },
  { value: "2", label: "Mardi" },
  { value: "3", label: "Mercredi" },
  { value: "4", label: "Jeudi" },
  { value: "5", label: "Vendredi" },
  { value: "6", label: "Samedi" },
  { value: "0", label: "Dimanche" },
];

export default function MarcheForm({ marche }: { marche?: Marche }) {
  const [isPending, startTransition] = useTransition();
  const isEdit = !!marche;

  function handleSubmit(formData: FormData) {
    if (isEdit) {
      updateMarche(marche.id, formData);
    } else {
      createMarche(formData);
    }
  }

  function handleDelete() {
    if (confirm("Supprimer ce marché ?")) {
      startTransition(() => deleteMarche(marche!.id));
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <Field label="Nom du marché *">
        <Input name="nom" required defaultValue={marche?.nom} placeholder="Marché Notre-Dame" />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Commune *">
          <Input name="commune" required defaultValue={marche?.commune} placeholder="Ploumilliau" />
        </Field>
        <Field label="Code postal">
          <Input name="code_postal" defaultValue={marche?.code_postal ?? ""} placeholder="22300" />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Département">
          <Input name="departement" defaultValue={marche?.departement ?? ""} placeholder="78" />
        </Field>
        <Field label="Type">
          <Select name="type" defaultValue={marche?.type ?? "itinerant"}>
            <option value="itinerant">Itinérant</option>
            <option value="local_fixe">Local fixe</option>
          </Select>
        </Field>
      </div>

      <Field label="Adresse">
        <Input name="adresse" defaultValue={marche?.adresse ?? ""} placeholder="Place du Marché" />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Latitude">
          <Input name="latitude" type="text" inputMode="decimal" defaultValue={marche?.latitude ?? ""} placeholder="48.8049" />
        </Field>
        <Field label="Longitude">
          <Input name="longitude" type="text" inputMode="decimal" defaultValue={marche?.longitude ?? ""} placeholder="2.1204" />
        </Field>
      </div>

      <Field label="Jour de la semaine">
        <Select name="jour_semaine" defaultValue={marche?.jour_semaine?.toString() ?? ""}>
          <option value="">— Non défini —</option>
          {JOURS.map((j) => (
            <option key={j.value} value={j.value}>{j.label}</option>
          ))}
        </Select>
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Heure début">
          <Input name="heure_debut" type="time" defaultValue={marche?.heure_debut ?? ""} />
        </Field>
        <Field label="Heure fin">
          <Input name="heure_fin" type="time" defaultValue={marche?.heure_fin ?? ""} />
        </Field>
      </div>

      <div className="space-y-3">
        <Toggle label="Actif cette semaine" name="actif" defaultChecked={marche?.actif ?? true} />
        <Toggle label="Point de retrait (click & collect)" name="point_retrait" defaultChecked={marche?.point_retrait ?? true} />
      </div>

      <div className="space-y-2 pt-2">
        <SubmitButton label={isEdit ? "Mettre à jour" : "Créer le marché"} />
        {isEdit && <DeleteButton onDelete={handleDelete} />}
      </div>

      {isPending && <p className="text-sm text-mute text-center">Suppression…</p>}
    </form>
  );
}
