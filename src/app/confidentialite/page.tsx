import { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/lib/config/site";

export const metadata: Metadata = {
  title: `Politique de confidentialité — ${SITE.nomCommercial}`,
  description: `Politique de confidentialité et gestion des données personnelles du site ${SITE.nomCommercial}. RGPD, cookies et droits des utilisateurs.`,
};

export default function ConfidentialitePage() {
  return (
    <LegalPage title="Confidentialité">
      <h1>Politique de confidentialité</h1>
      <p>
        <em>Dernière mise à jour : [DATE DE MISE À JOUR]</em>
      </p>
      <p>
        La société <strong>{SITE.raisonSociale}</strong>, {SITE.formeJuridique}{" "}
        au capital de {SITE.capitalSocial}, immatriculée au {SITE.rcs}, dont le
        siège social est situé au {SITE.adresse}, représentée par son gérant{" "}
        {SITE.gerant}, s&rsquo;engage à protéger la vie privée des utilisateurs
        de son site <strong>{SITE.url}</strong>, conformément au Règlement
        Général sur la Protection des Données (RGPD — Règlement UE 2016/679) et
        à la loi Informatique et Libertés.
      </p>

      <h2>1. Responsable du traitement</h2>
      <ul>
        <li>{SITE.raisonSociale}, {SITE.formeJuridique}</li>
        <li>Représentée par : {SITE.gerant} (gérant)</li>
        <li>Siège social : {SITE.adresse}</li>
        <li>SIRET : {SITE.siret}</li>
        <li>Email : <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
        <li>Téléphone : <a href={`tel:${SITE.telephone.replace(/\s/g, "")}`}>{SITE.telephone}</a></li>
      </ul>

      <h2>2. Données collectées</h2>
      <p>
        Dans le cadre du service de commande click&nbsp;&amp;&nbsp;collect, nous
        collectons les données suivantes :
      </p>
      <ul>
        <li><strong>Nom et prénom</strong> — pour identifier le client lors du retrait.</li>
        <li><strong>Adresse email</strong> — pour confirmer la commande et envoyer les informations de retrait.</li>
        <li><strong>Numéro de téléphone</strong> — pour vous contacter en cas de problème avec votre commande.</li>
      </ul>
      <p>
        <strong>Aucune donnée bancaire</strong> n&rsquo;est collectée ni stockée
        par nos soins. Le paiement est intégralement géré par Stripe.
      </p>

      <h2>3. Finalités et base légale</h2>
      <p>Vos données sont traitées pour les finalités suivantes :</p>
      <ul>
        <li>
          <strong>Exécution du contrat de vente</strong> (article 6.1.b du
          RGPD) : traitement de votre commande, envoi de l&rsquo;email de
          confirmation et de retrait, gestion de la relation client.
        </li>
        <li>
          <strong>Obligation légale</strong> (article 6.1.c du RGPD) :
          conservation des factures et données comptables conformément aux
          obligations légales.
        </li>
      </ul>

      <h2>4. Durée de conservation</h2>
      <ul>
        <li>
          <strong>Données de commande</strong> (nom, email, téléphone, détails
          de la commande) : 3 ans à compter de la dernière commande, ou durée
          légale de conservation comptable si supérieure.
        </li>
        <li>
          <strong>Données de facturation</strong> : 10 ans (obligation
          comptable).
        </li>
      </ul>

      <h2>5. Sous-traitants et destinataires</h2>
      <p>
        Vos données peuvent être transmises aux sous-traitants suivants,
        exclusivement pour les besoins du service :
      </p>
      <ul>
        <li>
          <strong>{SITE.baseDonnees}</strong> — hébergement de la base de
          données contenant vos informations de commande.
        </li>
        <li>
          <strong>{SITE.paiement}</strong> — traitement sécurisé du paiement
          par carte bancaire (certifié PCI-DSS). Stripe a accès aux données
          bancaires nécessaires au paiement ; nous n&rsquo;y avons pas accès.
        </li>
        <li>
          <strong>{SITE.emailService}</strong> — envoi des emails
          transactionnels (confirmation de commande, informations de retrait).
        </li>
        <li>
          <strong>{SITE.hebergeur}</strong> — hébergement du site web.
        </li>
      </ul>
      <p>
        Ces sous-traitants sont situés aux États-Unis ou en Union européenne et
        offrent des garanties de protection conformes au RGPD (clauses
        contractuelles types ou décision d&rsquo;adéquation le cas échéant).
      </p>

      <h2>6. Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez des droits suivants sur vos données
        personnelles :
      </p>
      <ul>
        <li><strong>Droit d&rsquo;accès</strong> : obtenir la confirmation que vos données sont traitées et en recevoir une copie.</li>
        <li><strong>Droit de rectification</strong> : corriger des données inexactes ou incomplètes.</li>
        <li><strong>Droit à l&rsquo;effacement</strong> : demander la suppression de vos données, sous réserve des obligations légales de conservation.</li>
        <li><strong>Droit à la limitation du traitement</strong> : demander la suspension temporaire du traitement dans certains cas.</li>
        <li><strong>Droit d&rsquo;opposition</strong> : vous opposer au traitement de vos données pour des motifs légitimes.</li>
        <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré et couramment utilisé.</li>
      </ul>
      <p>
        Pour exercer ces droits, envoyez un email à{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> en précisant votre
        nom et l&rsquo;objet de votre demande. Nous répondrons dans un délai
        maximum d&rsquo;un mois.
      </p>
      <p>
        En cas de litige, vous pouvez adresser une réclamation à la Commission
        Nationale de l&rsquo;Informatique et des Libertés (CNIL) :{" "}
        <a
          href="https://www.cnil.fr"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.cnil.fr
        </a>
        .
      </p>

      <h2>7. Cookies et traceurs</h2>

      <h3>7.1 Cookies utilisés</h3>
      <p>
        Ce site utilise exclusivement des <strong>cookies strictement
        nécessaires</strong> à son fonctionnement :
      </p>
      <ul>
        <li>
          <strong>Cookies de session Supabase</strong> (<code>sb-*</code>) :
          utilisés uniquement pour l&rsquo;authentification de
          l&rsquo;espace d&rsquo;administration du site. Ces cookies ne sont
          pas déposés lors de la navigation sur les pages publiques.
          Durée : session.
        </li>
      </ul>

      <h3>7.2 Stockage local du panier</h3>
      <p>
        Le panier d&rsquo;achat est stocké dans le <strong>localStorage</strong>{" "}
        de votre navigateur (clé : <code>nftuf-cart</code>). Le localStorage
        n&rsquo;est pas un cookie : il n&rsquo;est ni transmis au serveur ni
        accessible par des tiers. Son contenu est supprimé lorsque vous videz
        les données de votre navigateur.
      </p>

      <h3>7.3 Absence de traceurs tiers</h3>
      <p>
        <strong>
          Aucun cookie publicitaire, analytique ou de traçage tiers
          n&rsquo;est déposé sur ce site.
        </strong>{" "}
        Nous n&rsquo;utilisons ni Google Analytics, ni Facebook Pixel, ni aucun
        outil de suivi comportemental. Il n&rsquo;est donc pas nécessaire de
        recueillir votre consentement pour le dépôt de cookies.
      </p>

      <h2>8. Sécurité</h2>
      <p>
        Nous mettons en œuvre les mesures techniques et organisationnelles
        appropriées pour protéger vos données personnelles contre tout accès non
        autorisé, altération, divulgation ou destruction. Les communications
        entre votre navigateur et notre site sont chiffrées via le protocole
        HTTPS.
      </p>

      <h2>9. Modification de la politique</h2>
      <p>
        Nous nous réservons le droit de modifier la présente politique de
        confidentialité à tout moment. La date de dernière mise à jour figure en
        haut de cette page. Nous vous invitons à la consulter régulièrement.
      </p>
    </LegalPage>
  );
}
