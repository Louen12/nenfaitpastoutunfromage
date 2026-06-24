"use client";

import { useTransition } from "react";
import { type Tables } from "@/utils/supabase/database.types";
import { centsToEuros } from "@/lib/utils";
import { createProduit, updateProduit, deleteProduit } from "@/app/admin/produits/actions";
import { Field, Input, Textarea, Select, Toggle, SubmitButton, DeleteButton } from "./FormField";
import ImageUpload from "./ImageUpload";

type Produit = Tables<"produits">;
type Categorie = Tables<"categories">;

export default function ProduitForm({
  produit,
  categories,
}: {
  produit?: Produit;
  categories: Categorie[];
}) {
  const [isPending, startTransition] = useTransition();
  const isEdit = !!produit;

  function handleSubmit(formData: FormData) {
    if (isEdit) {
      updateProduit(produit.id, formData);
    } else {
      createProduit(formData);
    }
  }

  function handleDelete() {
    if (confirm("Supprimer ce produit ?")) {
      startTransition(() => deleteProduit(produit!.id));
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <Field label="Nom *">
        <Input name="nom" required defaultValue={produit?.nom} placeholder="Comté 24 mois" />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Prix (€) *">
          <Input
            name="prix"
            type="text"
            inputMode="decimal"
            required
            defaultValue={produit ? centsToEuros(produit.prix_cents) : ""}
            placeholder="12,50"
          />
        </Field>
        <Field label="Unité">
          <Input name="unite_label" defaultValue={produit?.unite_label ?? "pièce"} placeholder="pièce" />
        </Field>
      </div>

      <Field label="Catégorie">
        <Select name="categorie_id" defaultValue={produit?.categorie_id ?? ""}>
          <option value="">— Aucune —</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nom}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Description">
        <Textarea name="description" defaultValue={produit?.description ?? ""} placeholder="Un beau Comté fruité…" />
      </Field>

      <ImageUpload currentUrl={produit?.image_url} />

      <Field label="Stock (vide = non suivi)">
        <Input
          name="stock"
          type="number"
          min="0"
          defaultValue={produit?.stock ?? ""}
          placeholder="Laisser vide pour ne pas suivre"
        />
      </Field>

      <div className="space-y-3 rounded-lg bg-off border border-ligne p-4">
        <p className="text-xs font-medium text-mute uppercase tracking-wide">Fiche détaillée</p>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Lait">
            <Input name="lait" defaultValue={produit?.lait ?? ""} placeholder="Vache" />
          </Field>
          <Field label="Affinage">
            <Input name="affinage" defaultValue={produit?.affinage ?? ""} placeholder="24 mois" />
          </Field>
        </div>
        <Field label="Producteur">
          <Input name="producteur" defaultValue={produit?.producteur ?? ""} placeholder="Fromagerie Dubois" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Région">
            <Input name="region" defaultValue={produit?.region ?? ""} placeholder="Jura" />
          </Field>
          <Field label="Distance (km)">
            <Input name="distance_km" type="number" min="0" defaultValue={produit?.distance_km ?? ""} />
          </Field>
        </div>
        <Field label="Conseil du fromager">
          <Textarea name="conseil_fromager" defaultValue={produit?.conseil_fromager ?? ""} placeholder="Se marie bien avec…" />
        </Field>
      </div>

      <div className="space-y-3">
        <Toggle label="Disponible" name="disponible" defaultChecked={produit?.disponible ?? true} />
        <Toggle label="AOP" name="aop" defaultChecked={produit?.aop ?? false} />
        <Toggle label="Mise en avant (nouveauté)" name="en_avant" defaultChecked={produit?.en_avant ?? false} />
      </div>

      <div className="space-y-2 pt-2">
        <SubmitButton label={isEdit ? "Mettre à jour" : "Créer le produit"} />
        {isEdit && <DeleteButton onDelete={handleDelete} />}
      </div>

      {isPending && <p className="text-sm text-mute text-center">Suppression…</p>}
    </form>
  );
}
