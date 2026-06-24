"use client";

import { useTransition } from "react";
import { type Tables } from "@/utils/supabase/database.types";
import { createActualite, updateActualite, deleteActualite } from "@/app/admin/actualites/actions";
import { Field, Input, Textarea, Toggle, SubmitButton, DeleteButton } from "./FormField";
import ImageUpload from "./ImageUpload";

type Actualite = Tables<"actualites">;

export default function ActualiteForm({ actualite }: { actualite?: Actualite }) {
  const [isPending, startTransition] = useTransition();
  const isEdit = !!actualite;

  function handleSubmit(formData: FormData) {
    if (isEdit) {
      updateActualite(actualite.id, formData);
    } else {
      createActualite(formData);
    }
  }

  function handleDelete() {
    if (confirm("Supprimer cette actualité ?")) {
      startTransition(() => deleteActualite(actualite!.id));
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <Field label="Titre *">
        <Input name="titre" required defaultValue={actualite?.titre} placeholder="Nouveau fromage de saison !" />
      </Field>

      <Field label="Contenu">
        <Textarea name="contenu" defaultValue={actualite?.contenu ?? ""} placeholder="Texte de l'actualité…" />
      </Field>

      <ImageUpload currentUrl={actualite?.image_url} />

      <Toggle label="Publié" name="publie" defaultChecked={actualite?.publie ?? false} />

      <div className="space-y-2 pt-2">
        <SubmitButton label={isEdit ? "Mettre à jour" : "Créer l'actualité"} />
        {isEdit && <DeleteButton onDelete={handleDelete} />}
      </div>

      {isPending && <p className="text-sm text-mute text-center">Suppression…</p>}
    </form>
  );
}
