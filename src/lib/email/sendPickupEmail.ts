import { Resend } from "resend";

interface CommandeInfo {
  numero: number;
  client_nom: string;
  client_email: string;
  total_cents: number;
  retrait_type: string;
  retrait_date: string | null;
  retrait_creneau: string | null;
}

interface ItemInfo {
  nom_produit: string;
  unite_label: string | null;
  prix_unitaire_cents: number;
  quantite: number;
}

interface MarcheInfo {
  nom: string;
  commune: string;
  adresse: string | null;
  jour_semaine: number | null;
  heure_debut: string | null;
  heure_fin: string | null;
}

const JOURS = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

function centsToEuros(cents: number): string {
  return (cents / 100).toFixed(2).replace(".", ",");
}

function buildRetraitBlock(commande: CommandeInfo, marche?: MarcheInfo): string {
  if (commande.retrait_type === "marche" && marche) {
    const jour = marche.jour_semaine !== null ? JOURS[marche.jour_semaine] : "";
    const horaires =
      marche.heure_debut && marche.heure_fin
        ? `${marche.heure_debut.slice(0, 5)} – ${marche.heure_fin.slice(0, 5)}`
        : "";
    return `
      <tr><td style="padding:12px 16px;background:#d7ebe0;border-radius:8px;">
        <p style="margin:0 0 4px;font-weight:600;color:#1a1a17;">Retrait au marché</p>
        <p style="margin:0;font-size:14px;color:#333;">${marche.nom} — ${marche.commune}</p>
        ${marche.adresse ? `<p style="margin:2px 0 0;font-size:13px;color:#6b6b5f;">${marche.adresse}</p>` : ""}
        <p style="margin:2px 0 0;font-size:13px;color:#6b6b5f;">${jour}${horaires ? ` · ${horaires}` : ""}</p>
      </td></tr>`;
  }

  const date = commande.retrait_date
    ? new Date(commande.retrait_date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })
    : "";
  const creneau = commande.retrait_creneau ?? "";

  return `
    <tr><td style="padding:12px 16px;background:#d7ebe0;border-radius:8px;">
      <p style="margin:0 0 4px;font-weight:600;color:#1a1a17;">Retrait au local</p>
      ${date ? `<p style="margin:0;font-size:14px;color:#333;">${date}</p>` : ""}
      ${creneau ? `<p style="margin:2px 0 0;font-size:13px;color:#6b6b5f;">Créneau : ${creneau}</p>` : ""}
    </td></tr>`;
}

function buildItemsTable(items: ItemInfo[]): string {
  const rows = items
    .map((item) => {
      const label = item.unite_label ? ` (${item.unite_label})` : "";
      const lineTotal = item.prix_unitaire_cents * item.quantite;
      return `<tr>
        <td style="padding:6px 0;font-size:14px;color:#333;border-bottom:1px solid #e8e3d5;">
          ${item.nom_produit}${label} &times; ${item.quantite}
        </td>
        <td style="padding:6px 0;font-size:14px;color:#333;text-align:right;border-bottom:1px solid #e8e3d5;">
          ${centsToEuros(lineTotal)}&nbsp;&euro;
        </td>
      </tr>`;
    })
    .join("");

  return `<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rows}</table>`;
}

function buildHtml(commande: CommandeInfo, items: ItemInfo[], marche?: MarcheInfo): string {
  const prenom = commande.client_nom.split(" ")[0];

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f4ecd8;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4ecd8;">
    <tr><td align="center" style="padding:32px 16px;">
      <table width="100%" style="max-width:520px;background:#ffffff;border-radius:12px;overflow:hidden;">

        <!-- Header -->
        <tr><td style="background:#1d5b3a;padding:24px 20px;text-align:center;">
          <p style="margin:0;font-size:20px;font-weight:700;color:#f4ecd8;font-family:Georgia,serif;">
            N'en fais pas tout un fromage
          </p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:24px 20px;">
          <p style="margin:0 0 16px;font-size:18px;font-weight:600;color:#1a1a17;">
            Merci ${prenom} !
          </p>
          <p style="margin:0 0 20px;font-size:14px;color:#444;line-height:1.5;">
            Votre commande <strong>#${commande.numero}</strong> est bien enregistrée.
            Voici le récapitulatif de votre retrait.
          </p>

          <!-- Retrait -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
            ${buildRetraitBlock(commande, marche)}
          </table>

          <!-- Articles -->
          <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#6b6b5f;text-transform:uppercase;letter-spacing:0.5px;">
            Détail de la commande
          </p>
          ${buildItemsTable(items)}

          <!-- Total -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:4px;">
            <tr>
              <td style="padding:10px 0;font-size:16px;font-weight:700;color:#1a1a17;">Total</td>
              <td style="padding:10px 0;font-size:16px;font-weight:700;color:#1a1a17;text-align:right;">
                ${centsToEuros(commande.total_cents)}&nbsp;&euro;
              </td>
            </tr>
          </table>

          <!-- Note -->
          <p style="margin:20px 0 0;padding:12px 16px;background:#f4ecd8;border-radius:8px;font-size:13px;color:#6b6b5f;line-height:1.5;">
            Présentez cet email ou donnez simplement votre nom au moment du retrait.
            Au plaisir de vous retrouver !
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:16px 20px;text-align:center;border-top:1px solid #e8e3d5;">
          <p style="margin:0;font-size:11px;color:#9b9b8f;">
            N'en fais pas tout un fromage — Fromagerie artisanale itinérante
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function sendPickupEmail(
  commande: CommandeInfo,
  items: ItemInfo[],
  marche?: MarcheInfo,
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping email");
    return;
  }

  const resend = new Resend(apiKey);

  const from = process.env.EMAIL_FROM ?? "onboarding@resend.dev";
  const bcc = process.env.ARTISAN_EMAIL ?? undefined;

  await resend.emails.send({
    from,
    to: commande.client_email,
    bcc: bcc ? [bcc] : undefined,
    subject: `Commande #${commande.numero} — Récapitulatif de retrait`,
    html: buildHtml(commande, items, marche),
  });
}
