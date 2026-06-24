// 4 nouvelles propositions de PAGE D'ACCUEIL — le logo devient un vrai
// élément graphique du site, plus une vignette dans la topbar.

const sL = {
  body: { fontFamily: NFTUF.sans, fontSize: 14, lineHeight: 1.55, color: NFTUF.texte },
  mono: { fontFamily: NFTUF.mono, fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase' },
  small: { fontFamily: NFTUF.sans, fontSize: 12, lineHeight: 1.5, color: NFTUF.mute },
};

// petite section "marchés" réutilisée par toutes les variantes (compact)
function MarketsStrip({ dark = false }) {
  const fg = dark ? NFTUF.cremeClair : NFTUF.encre;
  const mut = dark ? '#a8c4b0' : NFTUF.mute;
  const bd = dark ? '#2a5a3e' : NFTUF.ligne;
  const acc = dark ? '#9fd1b3' : NFTUF.vert;
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '0 22px' }}>
        <NEyebrow color={acc}>Cette semaine · 4 marchés</NEyebrow>
        <a style={{ fontFamily: NFTUF.sans, fontSize: 12, color: acc, textDecoration: 'underline', textUnderlineOffset: 3 }}>Carte →</a>
      </div>
      <div style={{ padding: '14px 0 0' }}>
        {[
          { d: '20', j: 'MER', l: 'Versailles',  h: '7h–13h', s: '●' },
          { d: '21', j: 'JEU', l: 'Boulogne',    h: '8h–14h' },
          { d: '23', j: 'SAM', l: 'Local Massy', h: '9h–12h', s: '★' },
          { d: '24', j: 'DIM', l: 'Sceaux',      h: '8h–13h' },
        ].map((m, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', padding: '14px 22px', borderTop: `1px solid ${bd}` }}>
            <span style={{ fontFamily: NFTUF.serif, fontSize: 26, color: fg, fontWeight: 400, width: 46 }}>{m.d}</span>
            <span style={{ ...sL.mono, fontSize: 10, width: 44, color: mut }}>{m.j}</span>
            <span style={{ flex: 1, fontFamily: NFTUF.serif, fontSize: 18, color: fg }}>{m.l}</span>
            <span style={{ ...sL.mono, fontSize: 10, color: mut }}>{m.h}</span>
            <span style={{ marginLeft: 10, width: 12, textAlign: 'right', color: acc, fontSize: 11 }}>{m.s || ''}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// V1 — SCEAU CENTRAL · le logo est l'étiquette
// Le logo XL au centre, comme posé sur un fromage. Minimalisme.
// ─────────────────────────────────────────────────────────────
function HomeLogoSceau() {
  return (
    <div style={{ background: NFTUF.cremeClair, minHeight: '100%', paddingBottom: 78 }}>
      <NTopbar title="Fromagerie" />

      {/* Hero sceau ── ── */}
      <div style={{ position: 'relative', padding: '34px 22px 28px', textAlign: 'center', overflow: 'hidden' }}>
        {/* texture grain */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(circle at 10% 20%, ${NFTUF.creme} 0, transparent 30%), radial-gradient(circle at 80% 75%, ${NFTUF.creme} 0, transparent 30%)`,
          opacity: 0.6, pointerEvents: 'none',
        }}/>
        <div style={{ position: 'relative' }}>
          <div style={{ ...sL.mono, color: NFTUF.vert, fontSize: 10 }}>
            <span style={{ display: 'inline-block', width: 28, height: 1, background: NFTUF.vert, opacity: 0.5, verticalAlign: 'middle', marginRight: 10 }}/>
            EST · MASSY · MMXXI
            <span style={{ display: 'inline-block', width: 28, height: 1, background: NFTUF.vert, opacity: 0.5, verticalAlign: 'middle', marginLeft: 10 }}/>
          </div>
          <div style={{ display: 'grid', placeItems: 'center', margin: '18px 0' }}>
            <NFTUFLogo size={280} color={NFTUF.vert} light={NFTUF.cremeClair} />
          </div>
          <h1 style={{
            fontFamily: NFTUF.serif, fontSize: 26, lineHeight: 1.15, fontWeight: 400,
            color: NFTUF.encre, margin: 0, textWrap: 'balance', maxWidth: 320, marginInline: 'auto',
          }}>
            Le fromage <em style={{ color: NFTUF.vert, fontStyle: 'italic' }}>qui vient à vous</em> — un camion, quatre marchés, quinze fermes.
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
            <NBtn variant="primary">Voir les marchés</NBtn>
            <NBtn variant="ghost">La boutique</NBtn>
          </div>
        </div>
      </div>

      {/* règle décorative */}
      <div style={{ padding: '0 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: NFTUF.ligne }}/>
          <span style={{ ...sL.mono, fontSize: 9, color: NFTUF.mute }}>◆ ◆ ◆</span>
          <div style={{ flex: 1, height: 1, background: NFTUF.ligne }}/>
        </div>
      </div>

      {/* marchés */}
      <div style={{ padding: '28px 0 12px' }}>
        <MarketsStrip />
      </div>

      {/* photo + story */}
      <div style={{ padding: '24px 18px 0' }}>
        <PhotoSlot label="camion-versailles.jpg" h={240} r={4} tone="kraft" />
      </div>
      <div style={{ padding: '24px 22px 0' }}>
        <NEyebrow>L'artisan</NEyebrow>
        <h2 style={{ fontFamily: NFTUF.serif, fontWeight: 500, fontSize: 24, lineHeight: 1.15, color: NFTUF.encre, margin: '8px 0 12px' }}>
          « Plus de boutique fixe — uniquement vos marchés. »
        </h2>
        <p style={{ ...sL.body, margin: 0 }}>
          Maxime, fromager itinérant, sillonne l'Île-de-France avec un fourgon réfrigéré.
        </p>
      </div>

      <div style={{ height: 60 }}/>
      <NTabBar active="home" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// V2 — VITRINE · logo XL sur bandeau vert, façon enseigne du camion
// ─────────────────────────────────────────────────────────────
function HomeLogoVitrine() {
  return (
    <div style={{ background: NFTUF.cremeClair, minHeight: '100%', paddingBottom: 78 }}>
      <NTopbar title="Fromagerie" dark />

      {/* Bandeau enseigne ── ── */}
      <div style={{
        background: NFTUF.vertProf, color: NFTUF.cremeClair,
        padding: '40px 22px 36px', position: 'relative', overflow: 'hidden',
      }}>
        {/* clous décoratifs aux 4 coins */}
        {[
          { top: 14, left: 14 }, { top: 14, right: 14 },
          { bottom: 14, left: 14 }, { bottom: 14, right: 14 },
        ].map((p, i) => (
          <span key={i} style={{ position: 'absolute', ...p, width: 6, height: 6, borderRadius: 99, background: NFTUF.cremeClair, opacity: 0.35 }}/>
        ))}

        <div style={{ textAlign: 'center' }}>
          <div style={{ ...sL.mono, color: '#9fd1b3', fontSize: 10 }}>
            FROMAGERIE ARTISANALE ITINÉRANTE
          </div>
          <div style={{ display: 'grid', placeItems: 'center', margin: '20px 0 14px' }}>
            <NFTUFLogo size={240} color={NFTUF.vertProf} light={NFTUF.cremeClair} />
          </div>
          <div style={{ ...sL.mono, color: '#9fd1b3', fontSize: 10 }}>
            <span style={{ display: 'inline-block', width: 20, height: 1, background: '#9fd1b3', verticalAlign: 'middle', marginRight: 10 }}/>
            MMXXI · ÎLE-DE-FRANCE
            <span style={{ display: 'inline-block', width: 20, height: 1, background: '#9fd1b3', verticalAlign: 'middle', marginLeft: 10 }}/>
          </div>
        </div>
      </div>

      {/* Sous-titre éditorial */}
      <div style={{ padding: '32px 22px 0' }}>
        <h1 style={{
          fontFamily: NFTUF.serif, fontSize: 36, lineHeight: 1.02, fontWeight: 400,
          letterSpacing: -0.8, color: NFTUF.encre, margin: 0, textWrap: 'balance',
        }}>
          Le fromage qui<br/>
          <em style={{ fontStyle: 'italic', color: NFTUF.vert }}>vient à vous</em>.
        </h1>
        <p style={{ ...sL.body, margin: '14px 0 0', maxWidth: 320 }}>
          Un camion, quatre marchés par semaine, une cave d'affinage à Massy, et la liberté de tourner avec les saisons.
        </p>
        <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
          <NBtn variant="primary">Voir les marchés →</NBtn>
          <NBtn variant="ghost">La boutique</NBtn>
        </div>
      </div>

      <div style={{ padding: '32px 18px 0' }}>
        <PhotoSlot label="camion-marché.jpg" h={220} r={4} tone="kraft" />
      </div>

      <div style={{ padding: '32px 0 0' }}>
        <MarketsStrip />
      </div>

      <div style={{ height: 60 }}/>
      <NTabBar active="home" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// V3 — TAMPON SUR PHOTO · logo apposé sur la photo du camion
// Comme un cachet d'authenticité imprimé sur l'image.
// ─────────────────────────────────────────────────────────────
function HomeLogoTampon() {
  return (
    <div style={{ background: NFTUF.cremeClair, minHeight: '100%', paddingBottom: 78 }}>
      <NTopbar title="Fromagerie" />

      {/* Hero photo + tampon ── ── */}
      <div style={{ position: 'relative', height: 480, overflow: 'hidden' }}>
        <PhotoSlot label="camion-marché-versailles.jpg" h={480} r={0} tone="vert" />
        {/* assombrissement */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,63,42,0.15) 0%, rgba(20,63,42,0.65) 100%)' }}/>

        {/* tampon logo en haut à droite, légèrement tourné */}
        <div style={{ position: 'absolute', top: 30, right: 18, transform: 'rotate(-8deg)', opacity: 0.95 }}>
          <NFTUFLogo size={130} color="transparent" light={NFTUF.cremeClair} />
        </div>

        {/* texte hero en bas */}
        <div style={{ position: 'absolute', left: 22, right: 22, bottom: 24, color: NFTUF.cremeClair }}>
          <div style={{ ...sL.mono, fontSize: 10, color: '#cfe4d5', display: 'inline-flex', gap: 8, alignItems: 'center' }}>
            <span style={{ width: 18, height: 1, background: '#cfe4d5', opacity: 0.6 }}/>
            EST · 2021 · MASSY
          </div>
          <h1 style={{
            fontFamily: NFTUF.serif, fontSize: 44, lineHeight: 0.98, fontWeight: 400,
            letterSpacing: -1, margin: '10px 0 0', color: NFTUF.cremeClair, textWrap: 'balance',
          }}>
            Affiné en cave,<br/>vendu <em style={{ fontStyle: 'italic', color: '#cfe4d5' }}>sur la route</em>.
          </h1>
        </div>
      </div>

      {/* Bandeau actions */}
      <div style={{ padding: '20px 22px 0', display: 'flex', gap: 10 }}>
        <NBtn variant="primary" full>Voir les marchés</NBtn>
        <NBtn variant="ghost" full>Boutique</NBtn>
      </div>

      {/* Marchés */}
      <div style={{ padding: '36px 0 0' }}>
        <MarketsStrip />
      </div>

      {/* Citation */}
      <div style={{ padding: '36px 22px 0' }}>
        <div style={{ fontFamily: NFTUF.serif, fontSize: 70, lineHeight: 0.6, color: NFTUF.vert, opacity: 0.35, height: 24 }}>“</div>
        <p style={{
          fontFamily: NFTUF.serif, fontWeight: 400, fontSize: 22, lineHeight: 1.25,
          color: NFTUF.encre, margin: '8px 0 0', fontStyle: 'italic',
        }}>
          J'ai choisi un camion plutôt qu'une boutique. Plus de marchés, plus de visages.
        </p>
        <p style={{ ...sL.mono, color: NFTUF.vert, marginTop: 14, fontSize: 10 }}>— MAXIME, FROMAGER</p>
      </div>

      <div style={{ height: 60 }}/>
      <NTabBar active="home" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// V4 — FILIGRANE · logo géant en watermark derrière la une
// Le logo "habite" toute la page, en arrière-plan, comme une trame.
// ─────────────────────────────────────────────────────────────
function HomeLogoFiligrane() {
  return (
    <div style={{ background: NFTUF.creme, minHeight: '100%', paddingBottom: 78, position: 'relative', overflow: 'hidden' }}>
      <NTopbar title="Fromagerie" />

      {/* Logo géant en filigrane, débordant */}
      <div style={{ position: 'absolute', top: 110, left: '50%', transform: 'translateX(-50%)', opacity: 0.08, pointerEvents: 'none' }}>
        <NFTUFLogo size={620} color={NFTUF.creme} light={NFTUF.vert} />
      </div>

      {/* contenu au-dessus ── ── */}
      <div style={{ position: 'relative', padding: '36px 22px 0' }}>
        <NEyebrow>Sem. 47 · Île-de-France</NEyebrow>
        <h1 style={{
          fontFamily: NFTUF.serif, fontSize: 56, lineHeight: 0.92, fontWeight: 400,
          letterSpacing: -1.6, color: NFTUF.encre, margin: '14px 0 0', textWrap: 'balance',
        }}>
          N'en fais pas <em style={{ fontStyle: 'italic', color: NFTUF.vert, fontWeight: 400 }}>tout</em> un fromage.
        </h1>
        <p style={{ ...sL.body, fontSize: 15, margin: '16px 0 0', maxWidth: 320 }}>
          Fromagerie artisanale itinérante. Un fromager, quatre marchés, quinze fermes en circuit court.
        </p>
        <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
          <NBtn variant="primary">Voir les marchés</NBtn>
          <NBtn variant="ghost">La boutique</NBtn>
        </div>
      </div>

      {/* Photo posée par-dessus le filigrane */}
      <div style={{ position: 'relative', padding: '36px 18px 0' }}>
        <PhotoSlot label="portrait-maxime.jpg" h={280} r={4} tone="kraft" />
      </div>

      {/* Marchés */}
      <div style={{ position: 'relative', padding: '36px 0 0' }}>
        <MarketsStrip />
      </div>

      <div style={{ height: 60 }}/>
      <NTabBar active="home" />
    </div>
  );
}

Object.assign(window, { HomeLogoSceau, HomeLogoVitrine, HomeLogoTampon, HomeLogoFiligrane });
