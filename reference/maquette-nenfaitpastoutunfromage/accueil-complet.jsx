// ─────────────────────────────────────────────────────────────────────────
// Page d'accueil complète — reproduit l'esprit de la référence client :
//   hero "mur peint" + sceau qui flotte, puis grand titre éditorial.
// Puis on enchaîne : L'ARTISAN · LE CAMION · marchés · boutique · insta.
// Tout est en placeholders rayés tant que les photos ne sont pas livrées.
// ─────────────────────────────────────────────────────────────────────────

const sAC = {
  body:   { fontFamily: NFTUF.sans, fontSize: 14, lineHeight: 1.6, color: NFTUF.texte },
  small:  { fontFamily: NFTUF.sans, fontSize: 12, lineHeight: 1.5, color: NFTUF.mute },
  mono:   { fontFamily: NFTUF.mono, fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase' },
  h1:     { fontFamily: NFTUF.serif, fontWeight: 400, fontSize: 38, lineHeight: 1.02, letterSpacing: -0.6, color: NFTUF.encre, textWrap: 'balance' },
  h2:     { fontFamily: NFTUF.serif, fontWeight: 400, fontSize: 28, lineHeight: 1.08, letterSpacing: -0.4, color: NFTUF.encre, textWrap: 'balance' },
  h3:     { fontFamily: NFTUF.serif, fontWeight: 500, fontSize: 19, lineHeight: 1.15, color: NFTUF.encre },
  pad:    { padding: '0 22px' },
};

// ─────────────────────────────────────────────────────────────────────────
// Topbar minimale "type site" : sceau flottant à gauche, panier + burger à droite.
// Posée en absolu par-dessus la photo hero, sur fond sombre.
// ─────────────────────────────────────────────────────────────────────────
function AcTopbarOnPhoto() {
  return (
    <div style={{
      position: 'absolute', top: 8, left: 0, right: 0,
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
      padding: '8px 16px 0', zIndex: 3,
    }}>
      {/* sceau flottant — comme un sticker épinglé sur le coin */}
      <div style={{
        width: 92, height: 92, borderRadius: 999,
        background: NFTUF.cremeClair,
        boxShadow: '0 6px 18px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.04)',
        display: 'grid', placeItems: 'center',
      }}>
        <NFTUFLogo size={86} color={NFTUF.cremeClair} light={NFTUF.vert} />
      </div>
      {/* actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, paddingTop: 16, color: NFTUF.cremeClair }}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 7h14l-1.3 9a1.6 1.6 0 0 1-1.6 1.4H7.9a1.6 1.6 0 0 1-1.6-1.4L5 7zm3 0a3 3 0 0 1 6 0"/>
        </svg>
        <svg width="24" height="16" viewBox="0 0 24 16"><path d="M2 2h20M2 8h20M2 14h20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Hero "mur peint" — reproduction de l'esprit de la photo de référence.
//   - fond vert profond (placeholder photo)
//   - logo peint visible dessus (faux peint = même logo SVG, légère opacité)
//   - sceau qui flotte en topbar
// ─────────────────────────────────────────────────────────────────────────
function HeroPaintedWall() {
  return (
    <div style={{
      position: 'relative',
      height: 430,
      background: NFTUF.vertProf,
      overflow: 'hidden',
    }}>
      {/* texture "mur peint" : dégradé + grain léger */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(120% 80% at 30% 30%, #1f5a3d 0%, ${NFTUF.vertProf} 55%, #0d2c1d 100%),
          repeating-linear-gradient(180deg, rgba(255,255,255,0.018) 0 2px, transparent 2px 5px)
        `,
      }}/>
      {/* étagère / reflet horizontal — clin d'œil au plan d'origine */}
      <div style={{
        position: 'absolute', top: '78%', left: 0, right: 0, height: 1,
        background: 'rgba(207,228,213,0.18)',
      }}/>

      {/* PLACEHOLDER mention : photo à remplacer */}
      <div style={{
        position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
        fontFamily: NFTUF.mono, fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase',
        color: 'rgba(207,228,213,0.4)',
      }}>
        ↳ photo : mur peint du camion
      </div>

      {/* Logo "peint" sur le mur — léger relief, opacité élevée */}
      <div style={{
        position: 'absolute', top: 110, left: '50%', transform: 'translateX(-50%)',
        textAlign: 'center', width: '92%',
      }}>
        {/* arche typographique du haut */}
        <svg width="100%" height="58" viewBox="0 0 360 58" style={{ display: 'block' }}>
          <defs>
            <path id="ac-arc-top" d="M 22 50 A 200 200 0 0 1 338 50" />
          </defs>
          <text fill={NFTUF.cremeClair} fillOpacity="0.92"
            style={{ fontFamily: NFTUF.serif, fontWeight: 600, fontSize: 26, letterSpacing: 1.8 }}>
            <textPath href="#ac-arc-top" startOffset="50%" textAnchor="middle">
              N'EN FAIS PAS TOUT UN FROMAGE
            </textPath>
          </text>
        </svg>

        {/* mini-logo central (part de fromage, mention fromagerie / crèmerie) */}
        <div style={{ marginTop: 4, opacity: 0.92 }}>
          <NFTUFLogo size={110} color="transparent" light={NFTUF.cremeClair} />
        </div>

        {/* bandeau ◆ FROMAGERIE — CRÈMERIE ◆ */}
        <div style={{
          marginTop: -2, fontFamily: NFTUF.serif, fontWeight: 600, fontSize: 14,
          letterSpacing: 3, color: NFTUF.cremeClair, opacity: 0.92,
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14,
        }}>
          <span style={{ fontSize: 9 }}>◆</span>
          <span>FROMAGERIE</span>
          <span style={{ width: 14 }}/>
          <span>CRÈMERIE</span>
          <span style={{ fontSize: 9 }}>◆</span>
        </div>
      </div>

      <AcTopbarOnPhoto />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Bloc titre éditorial juste sous le hero : reprend exactement la mise
// en page de la référence (eyebrow tirets, gros titre, italique green).
// ─────────────────────────────────────────────────────────────────────────
function HeroTitle() {
  return (
    <div style={{ padding: '34px 22px 32px', background: NFTUF.cremeClair }}>
      <div style={{
        fontFamily: NFTUF.sans, fontSize: 13, color: NFTUF.encre,
        display: 'inline-flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ width: 14, height: 1, background: NFTUF.encre }}/>
        Fromagerie itinérante
        <span style={{ width: 14, height: 1, background: NFTUF.encre }}/>
      </div>
      <h1 style={{ ...sAC.h1, fontSize: 38, margin: '14px 0 0' }}>
        Présent toute l'année<br/>
        sur vos <em style={{ fontStyle: 'italic', color: NFTUF.vert, fontWeight: 400 }}>marchés préférés</em>
      </h1>
      <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
        <NBtn variant="primary">Voir les marchés →</NBtn>
        <NBtn variant="ghost">La boutique</NBtn>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// L'ARTISAN — bloc présentation : portrait + texte + chiffres clés.
// ─────────────────────────────────────────────────────────────────────────
function ArtisanBlock() {
  return (
    <div style={{ background: NFTUF.off, padding: '40px 0 44px', borderTop: `1px solid ${NFTUF.ligne}` }}>
      <div style={{ ...sAC.pad }}>
        <NEyebrow>L'artisan · Maxime</NEyebrow>
        <h2 style={{ ...sAC.h2, margin: '10px 0 14px' }}>
          Un seul fromager,<br/>
          <em style={{ fontStyle: 'italic', color: NFTUF.vert }}>quinze fermes choisies</em>.
        </h2>
      </div>

      <div style={{ padding: '8px 18px 0' }}>
        <PhotoSlot label="portrait-maxime.jpg" h={320} r={4} tone="kraft" />
      </div>

      <div style={{ ...sAC.pad, paddingTop: 20 }}>
        <p style={{ ...sAC.body, margin: 0 }}>
          Affineur de formation, j'ai longtemps travaillé en cave avant de monter mon
          propre camion en 2021. Aujourd'hui, je sélectionne mes fromages directement
          chez quinze producteurs en circuit court — Jura, Auvergne, Normandie,
          Bourgogne — et je les affine moi-même dans ma cave à Massy.
        </p>
        <p style={{ ...sAC.body, margin: '14px 0 0' }}>
          Pas de boutique fixe, pas d'intermédiaire. Juste le camion, les marchés,
          et le goût du travail bien fait.
        </p>

        <div style={{ marginTop: 18 }}>
          <a style={{ fontFamily: NFTUF.sans, fontWeight: 600, fontSize: 14, color: NFTUF.vert, textDecoration: 'underline', textUnderlineOffset: 4 }}>
            Lire son histoire →
          </a>
        </div>
      </div>

      {/* Chiffres-clés */}
      <div style={{ marginTop: 28, padding: '22px 22px 0', borderTop: `1px solid ${NFTUF.ligne}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
          {[
            { n: '2021', l: 'Création' },
            { n: '15',   l: 'Fermes partenaires' },
            { n: '0',    l: 'Intermédiaires' },
          ].map((c, i) => (
            <div key={i}>
              <div style={{ fontFamily: NFTUF.serif, fontWeight: 500, fontSize: 32, color: NFTUF.vert, lineHeight: 1 }}>{c.n}</div>
              <div style={{ ...sAC.mono, color: NFTUF.mute, marginTop: 6, fontSize: 9.5 }}>{c.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// LE CAMION — bloc fourgon : grande photo + spécifications + CTA itinéraire.
// ─────────────────────────────────────────────────────────────────────────
function CamionBlock() {
  const specs = [
    { l: 'Cave d\'affinage embarquée',  v: '+8 à +12 °C' },
    { l: 'Comptoir réfrigéré',          v: '+4 °C · 2,4 m' },
    { l: 'Marchés par semaine',         v: '4 + 1 fixe' },
    { l: 'Rayon d\'action',             v: 'Île-de-France · 30 km' },
  ];
  return (
    <div style={{ background: NFTUF.vertProf, color: NFTUF.cremeClair, padding: '44px 0 48px', position: 'relative' }}>
      <div style={{ ...sAC.pad }}>
        <div style={{
          ...sAC.mono, fontSize: 11,
          color: NFTUF.vertSauge,
          display: 'inline-flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ width: 18, height: 1, background: NFTUF.vertSauge, opacity: 0.6 }}/>
          Le camion
        </div>
        <h2 style={{ ...sAC.h2, color: NFTUF.cremeClair, margin: '10px 0 14px' }}>
          Un fourgon-fromagerie,<br/>
          <em style={{ fontStyle: 'italic', color: NFTUF.vertSauge }}>aménagé sur-mesure</em>.
        </h2>
        <p style={{ ...sAC.body, color: NFTUF.vertEau, margin: 0, maxWidth: 320 }}>
          Conçu avec un carrossier-frigoriste : une cave d'affinage, un comptoir
          en chêne, une vitrine réfrigérée 2,4 m. Tout pour vendre du fromage
          comme en boutique — mais partout.
        </p>
      </div>

      <div style={{ padding: '24px 18px 0' }}>
        <PhotoSlot label="camion-ouvert.jpg" h={240} r={4} tone="sombre" />
      </div>

      {/* Spécifications en grille — façon fiche technique */}
      <div style={{ padding: '26px 22px 0' }}>
        {specs.map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
            padding: '12px 0',
            borderTop: `1px solid #2a5a3e`,
          }}>
            <span style={{ ...sAC.mono, fontSize: 10, color: NFTUF.vertSauge }}>
              {String(i + 1).padStart(2, '0')} · {s.l}
            </span>
            <span style={{ fontFamily: NFTUF.serif, fontWeight: 500, fontSize: 15, color: NFTUF.cremeClair, letterSpacing: 0.2 }}>
              {s.v}
            </span>
          </div>
        ))}
        <div style={{ borderTop: `1px solid #2a5a3e` }}/>
      </div>

      <div style={{ padding: '26px 22px 0', display: 'flex', gap: 10 }}>
        <NBtn variant="cream">Voir l'itinéraire</NBtn>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Marchés — strip 4 cartes horizontales (reprend le bloc accueil V1).
// ─────────────────────────────────────────────────────────────────────────
function MarchesBlock() {
  return (
    <div style={{ background: NFTUF.creme, padding: '40px 0 44px', borderTop: `1px solid ${NFTUF.ligne}` }}>
      <div style={{ ...sAC.pad, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div>
          <NEyebrow>Sem. 47</NEyebrow>
          <h2 style={{ ...sAC.h2, margin: '8px 0 0' }}>Cette semaine</h2>
        </div>
        <a style={{ ...sAC.small, color: NFTUF.vert, textDecoration: 'underline', textUnderlineOffset: 3 }}>Carte →</a>
      </div>

      <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '18px 18px 4px' }}>
        {[
          { j: 'Mer.', date: '20', lieu: 'Versailles',     h: '7h–13h', state: 'open' },
          { j: 'Jeu.', date: '21', lieu: 'Boulogne',       h: '8h–14h', state: null },
          { j: 'Sam.', date: '23', lieu: 'Local · Massy',  h: '9h–12h', state: 'fix' },
          { j: 'Dim.', date: '24', lieu: 'Sceaux',         h: '8h–13h', state: null },
        ].map((m, i) => (
          <div key={i} style={{
            minWidth: 168, background: NFTUF.cremeClair,
            borderRadius: 6, padding: 14,
            boxShadow: `inset 0 0 0 1px ${NFTUF.ligne}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontFamily: NFTUF.serif, fontSize: 30, fontWeight: 500, color: NFTUF.vert, lineHeight: 1 }}>{m.date}</span>
              <span style={{ ...sAC.mono, fontSize: 10, color: NFTUF.mute }}>{m.j} Nov</span>
            </div>
            <div style={{ ...sAC.h3, marginTop: 10 }}>{m.lieu}</div>
            <div style={{ ...sAC.small, marginTop: 4 }}>{m.h}</div>
            {m.state === 'open' && <div style={{ marginTop: 10 }}><NChip tone="open" sm>● Ouvert · 4h restantes</NChip></div>}
            {m.state === 'fix'  && <div style={{ marginTop: 10 }}><NChip tone="cream" sm>Marché fixe</NChip></div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Boutique preview — 4 produits, grille 2×2.
// ─────────────────────────────────────────────────────────────────────────
function BoutiqueBlock() {
  const prods = [
    { n: 'Comté 24 mois',         p: '8,90 €',  t: '/ 200g',       tone: 'creme' },
    { n: 'Camembert fermier',     p: '6,50 €',  t: '/ pièce',      tone: 'kraft' },
    { n: 'Bleu d\'Auvergne AOP',  p: '7,20 €',  t: '/ 200g',       tone: 'creme' },
    { n: 'Panier découverte',     p: '32,00 €', t: '/ 4 fromages', tone: 'vert'  },
  ];
  return (
    <div style={{ background: NFTUF.cremeClair, padding: '44px 22px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div>
          <NEyebrow>Click & collect</NEyebrow>
          <h2 style={{ ...sAC.h2, margin: '8px 0 0' }}>La boutique</h2>
        </div>
        <a style={{ ...sAC.small, color: NFTUF.vert, textDecoration: 'underline', textUnderlineOffset: 3 }}>Tout voir</a>
      </div>
      <p style={{ ...sAC.body, margin: '10px 0 18px' }}>
        Commandez en ligne, choisissez votre point de retrait — local ou marché de la semaine.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {prods.map((p, i) => (
          <div key={i}>
            <PhotoSlot label={p.n.toLowerCase().replace(/[' ]/g,'-') + '.jpg'} h={148} r={4} tone={p.tone} />
            <div style={{ padding: '10px 2px 0' }}>
              <div style={{ fontFamily: NFTUF.serif, fontSize: 16, color: NFTUF.encre, lineHeight: 1.2 }}>{p.n}</div>
              <div style={{ marginTop: 4, display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span style={{ fontFamily: NFTUF.serif, fontWeight: 500, fontSize: 15, color: NFTUF.encre }}>{p.p}</span>
                <span style={{ ...sAC.small, fontSize: 11 }}>{p.t}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Instagram preview — eyebrow + grille 3×2.
// ─────────────────────────────────────────────────────────────────────────
function InstaBlock() {
  return (
    <div style={{ background: NFTUF.off, padding: '40px 0 36px', borderTop: `1px solid ${NFTUF.ligne}` }}>
      <div style={{ ...sAC.pad, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div>
          <NEyebrow>@nenfaispas.fromage</NEyebrow>
          <h2 style={{ ...sAC.h2, margin: '8px 0 0' }}>Côté <em style={{ fontStyle: 'italic', color: NFTUF.vert }}>coulisses</em></h2>
        </div>
        <a style={{ ...sAC.small, color: NFTUF.vert, textDecoration: 'underline', textUnderlineOffset: 3 }}>Instagram</a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4, padding: '18px 18px 0' }}>
        {['arrivage.jpg','meule.jpg','marché-aube.jpg','découpe.jpg','client.jpg','panier.jpg'].map((l, i) => (
          <PhotoSlot key={i} label={l} h={108} r={2} tone={i%2 ? 'creme' : 'kraft'} />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────────────────
function AcFooter() {
  return (
    <div style={{
      padding: '44px 22px 32px', textAlign: 'center',
      background: NFTUF.vertProf, color: NFTUF.cremeClair,
    }}>
      <NFTUFLogo size={72} color={NFTUF.vertProf} light={NFTUF.cremeClair} />
      <p style={{
        fontFamily: NFTUF.serif, fontSize: 18, lineHeight: 1.3,
        margin: '18px auto 0', maxWidth: 280, fontStyle: 'italic', opacity: 0.92,
      }}>
        « Le fromage, c'est une histoire de mains et de patience. »
      </p>
      <div style={{
        marginTop: 22, display: 'flex', justifyContent: 'center',
        gap: 18, fontFamily: NFTUF.mono, fontSize: 11, letterSpacing: 1.5, opacity: 0.85,
      }}>
        <span>INSTAGRAM</span><span>·</span><span>FACEBOOK</span><span>·</span><span>CONTACT</span>
      </div>
      <div style={{ marginTop: 28, ...sAC.mono, fontSize: 9, opacity: 0.55 }}>
        MASSY · ÎLE-DE-FRANCE · SIRET 000 000 000 00000
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// PAGE D'ACCUEIL COMPLÈTE — assemble tous les blocs ci-dessus.
// ─────────────────────────────────────────────────────────────────────────
function HomeAccueilComplet() {
  return (
    <div style={{ background: NFTUF.cremeClair, minHeight: '100%', paddingBottom: 78 }}>
      <HeroPaintedWall />
      <HeroTitle />
      <ArtisanBlock />
      <CamionBlock />
      <MarchesBlock />
      <BoutiqueBlock />
      <InstaBlock />
      <AcFooter />

      <div style={{ position: 'sticky', bottom: 0 }}>
        <NTabBar active="home" />
      </div>
    </div>
  );
}

Object.assign(window, { HomeAccueilComplet });
