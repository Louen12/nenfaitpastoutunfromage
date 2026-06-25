import { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/lib/config/site";

export const metadata: Metadata = {
  title: `Conditions générales de vente — ${SITE.nomCommercial}`,
  description: `CGV du site ${SITE.nomCommercial}. Commande, paiement, retrait click & collect et droit de rétractation.`,
};

export default function CGVPage() {
  return (
    <LegalPage title="CGV">
      <h1>Conditions générales de vente</h1>
      <p>
        <em>Dernière mise à jour : [DATE DE MISE À JOUR]</em>
      </p>

      <h2>1. Objet</h2>
      <p>
        Les présentes conditions générales de vente (CGV) régissent les ventes
        de produits fromagers et de crèmerie proposés par la société{" "}
        <strong>{SITE.raisonSociale}</strong>, {SITE.formeJuridique} au capital
        de {SITE.capitalSocial}, via le site <strong>{SITE.url}</strong>, en
        mode click&nbsp;&amp;&nbsp;collect exclusivement.
      </p>
      <p>
        Toute commande passée sur le site implique l&rsquo;acceptation sans
        réserve des présentes CGV.
      </p>

      <h2>2. Identité du vendeur</h2>
      <ul>
        <li>Dénomination sociale : {SITE.raisonSociale}</li>
        <li>Forme juridique : {SITE.formeJuridique}</li>
        <li>Capital social : {SITE.capitalSocial}</li>
        <li>Siège social : {SITE.adresse}</li>
        <li>SIRET : {SITE.siret}</li>
        <li>Immatriculation : {SITE.rcs}</li>
        <li>N° TVA intracommunautaire : {SITE.tva}</li>
        <li>Gérant : {SITE.gerant}</li>
        <li>Email : <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
        <li>Téléphone : <a href={`tel:${SITE.telephone.replace(/\s/g, "")}`}>{SITE.telephone}</a></li>
      </ul>

      <h2>3. Produits</h2>
      <p>
        Les produits proposés à la vente sont des fromages, produits laitiers
        et paniers composés. Les photographies illustrant les produits sont
        fournies à titre indicatif ; des variations d&rsquo;aspect peuvent
        exister sans altérer les qualités gustatives du produit.
      </p>
      <p>
        Les produits sont des <strong>denrées alimentaires périssables</strong>{" "}
        nécessitant le respect de la chaîne du froid.
      </p>

      <h2>4. Prix</h2>
      <p>
        Les prix sont indiqués en euros, toutes taxes comprises (TTC).
      </p>
      <p>
        {/* ⚠️ Adapter selon le régime TVA confirmé */}
        [Si la société est assujettie à la TVA : « Le taux de TVA applicable
        est celui en vigueur au jour de la commande (5,5 % pour les produits
        alimentaires). » / Si la société bénéficie de la franchise en base de
        TVA : « TVA non applicable, article 293 B du Code général des
        impôts. »]
      </p>
      <p>
        La société {SITE.raisonSociale} se réserve le droit de modifier ses prix
        à tout moment. Les produits sont facturés sur la base des tarifs en
        vigueur au moment de la validation de la commande.
      </p>

      <h2>5. Commande</h2>
      <p>
        Le client sélectionne les produits souhaités, les ajoute à son panier,
        puis valide sa commande en choisissant un lieu et un créneau de retrait.
        La commande est confirmée après paiement.
      </p>
      <p>
        Un email de confirmation récapitulant la commande, le lieu et
        l&rsquo;horaire de retrait est envoyé au client.
      </p>

      <h2>6. Paiement</h2>
      <p>
        Le paiement s&rsquo;effectue en ligne, de manière sécurisée, par carte
        bancaire via la plateforme <strong>Stripe</strong> (Stripe Payments
        Europe Ltd.). Stripe est certifié <strong>PCI-DSS</strong> (Payment
        Card Industry Data Security Standard).
      </p>
      <p>
        <strong>
          Aucune donnée bancaire n&rsquo;est stockée sur nos serveurs ni dans
          notre base de données.
        </strong>{" "}
        L&rsquo;intégralité du traitement du paiement est déléguée à Stripe.
      </p>
      <p>
        La commande est considérée comme validée après confirmation du paiement
        par Stripe.
      </p>

      <h2>7. Retrait des commandes (click&nbsp;&amp;&nbsp;collect)</h2>
      <p>
        <strong>
          Aucune livraison n&rsquo;est proposée. Les commandes sont
          exclusivement retirées par le client.
        </strong>
      </p>
      <p>Deux modes de retrait sont disponibles :</p>
      <ul>
        <li>
          <strong>Au local</strong> : à l&rsquo;adresse{" "}
          {SITE.adresse}, sur les créneaux indiqués lors de la commande
          (vendredi 16h–19h).
        </li>
        <li>
          <strong>Sur un marché</strong> : sur l&rsquo;un des marchés de la
          semaine, au jour et à l&rsquo;horaire précisé lors de la commande.
        </li>
      </ul>
      <p>
        Le client est tenu de respecter le créneau de retrait sélectionné. En
        cas d&rsquo;impossibilité de se présenter au retrait, le client doit
        contacter le vendeur par email ou téléphone au moins 24 heures à
        l&rsquo;avance.
      </p>
      <p>
        Toute commande non retirée dans le créneau prévu, et sans information
        préalable du client, pourra être considérée comme abandonnée. Les
        produits étant périssables, aucun remboursement ne pourra être exigé
        dans ce cas.
      </p>

      <h2>8. Droit de rétractation</h2>
      <p>
        Conformément à l&rsquo;article L.221-28 du Code de la consommation, le{" "}
        <strong>
          droit de rétractation ne s&rsquo;applique pas aux contrats de
          fourniture de biens susceptibles de se détériorer ou de se périmer
          rapidement
        </strong>
        .
      </p>
      <p>
        Les produits vendus par {SITE.raisonSociale} étant des denrées
        alimentaires périssables (fromages, produits laitiers), le client{" "}
        <strong>ne dispose pas d&rsquo;un droit de rétractation</strong> après
        validation de sa commande.
      </p>

      <h2>9. Disponibilité des produits</h2>
      <p>
        Les produits sont proposés dans la limite des stocks disponibles. En cas
        d&rsquo;indisponibilité d&rsquo;un produit après passation de la
        commande, le client en sera informé par email dans les meilleurs délais.
        Il pourra choisir entre le remplacement du produit par un produit de
        qualité et de prix équivalent, ou le remboursement du produit
        indisponible.
      </p>

      <h2>10. Réclamations</h2>
      <p>
        Pour toute réclamation relative à une commande, le client peut contacter{" "}
        {SITE.raisonSociale} :
      </p>
      <ul>
        <li>Par email : <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
        <li>Par téléphone : <a href={`tel:${SITE.telephone.replace(/\s/g, "")}`}>{SITE.telephone}</a></li>
      </ul>
      <p>
        En cas de produit défectueux ou de non-conformité, le client est invité
        à signaler le problème dans les 24 heures suivant le retrait, en
        fournissant si possible une photographie du produit concerné.
      </p>

      <h2>11. Médiation de la consommation</h2>
      <p>
        Conformément aux articles L.612-1 et suivants du Code de la
        consommation, en cas de litige non résolu, le client peut recourir
        gratuitement au service de médiation :
      </p>
      <ul>
        <li>Médiateur : [NOM DU MÉDIATEUR DE LA CONSOMMATION]</li>
        <li>Site web : [URL DU MÉDIATEUR]</li>
        <li>Adresse : [ADRESSE DU MÉDIATEUR]</li>
      </ul>
      <p>
        Le client peut également déposer sa réclamation sur la plateforme
        européenne de règlement en ligne des litiges :{" "}
        <a
          href="https://ec.europa.eu/consumers/odr"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://ec.europa.eu/consumers/odr
        </a>
        .
      </p>

      <h2>12. Droit applicable</h2>
      <p>
        Les présentes CGV sont soumises au droit français. Tout litige relatif à
        leur interprétation ou à leur exécution relève de la compétence des
        tribunaux français compétents.
      </p>
    </LegalPage>
  );
}
