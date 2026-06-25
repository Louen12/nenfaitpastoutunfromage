import { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/lib/config/site";

export const metadata: Metadata = {
  title: `Mentions légales — ${SITE.nomCommercial}`,
  description: `Mentions légales du site ${SITE.nomCommercial}. Éditeur, hébergeur et informations juridiques.`,
};

export default function MentionsLegalesPage() {
  return (
    <LegalPage title="Mentions légales">
      <h1>Mentions légales</h1>

      <h2>1. Éditeur du site</h2>
      <p>
        Le site <strong>{SITE.url}</strong> est édité par :
      </p>
      <ul>
        <li>Dénomination sociale : {SITE.raisonSociale}</li>
        <li>Nom commercial : {SITE.nomCommercial}</li>
        <li>Forme juridique : {SITE.formeJuridique}</li>
        <li>Capital social : {SITE.capitalSocial}</li>
        <li>Siège social : {SITE.adresse}</li>
        <li>SIREN : {SITE.siren}</li>
        <li>SIRET : {SITE.siret}</li>
        <li>Immatriculation : {SITE.rcs}</li>
        <li>N° TVA intracommunautaire : {SITE.tva}</li>
        <li>Code NAF : {SITE.naf}</li>
        <li>Activité : {SITE.activite}</li>
        <li>Gérant : {SITE.gerant}</li>
        <li>
          Email :{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </li>
        <li>
          Téléphone :{" "}
          <a href={`tel:${SITE.telephone.replace(/\s/g, "")}`}>
            {SITE.telephone}
          </a>
        </li>
      </ul>

      <h2>2. Directeur de la publication</h2>
      <p>
        Le directeur de la publication est : <strong>{SITE.directeurPublication}</strong>,
        en qualité de gérant de la société {SITE.raisonSociale}.
      </p>

      <h2>3. Hébergement</h2>
      <p>
        Le site est hébergé par : <strong>{SITE.hebergeur}</strong>.
      </p>
      <p>
        La base de données est hébergée par : <strong>{SITE.baseDonnees}</strong>.
      </p>

      <h2>4. Propriété intellectuelle</h2>
      <p>
        L&rsquo;ensemble du contenu de ce site (textes, photographies, logos,
        éléments graphiques) est la propriété exclusive de la société{" "}
        {SITE.raisonSociale} ou de ses partenaires. Toute reproduction,
        représentation, modification ou exploitation, totale ou partielle, sans
        autorisation écrite préalable, est interdite et constitue une
        contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de
        la propriété intellectuelle.
      </p>

      <h2>5. Données personnelles</h2>
      <p>
        Les informations relatives au traitement de vos données personnelles
        sont détaillées dans notre{" "}
        <a href="/confidentialite">politique de confidentialité</a>.
      </p>

      <h2>6. Cookies</h2>
      <p>
        Ce site n&rsquo;utilise que des cookies strictement nécessaires à son
        fonctionnement (session d&rsquo;authentification de l&rsquo;espace
        d&rsquo;administration). Aucun cookie de traçage publicitaire ou
        analytique n&rsquo;est déposé. Pour en savoir plus, consultez notre{" "}
        <a href="/confidentialite">politique de confidentialité</a>.
      </p>
    </LegalPage>
  );
}
