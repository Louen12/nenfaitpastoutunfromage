// Variations stylistiques du HOME — pour explorer 2 directions alternatives

const sV = {
  body: { fontFamily: NFTUF.sans, fontSize: 14, lineHeight: 1.55, color: NFTUF.texte },
  mono: { fontFamily: NFTUF.mono, fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase' },
};

// ─────────────────────────────────────────────────────────────
// VARIANT B — DARK · Vert sapin plein bandeau, ambiance cave/affinage
// ─────────────────────────────────────────────────────────────
function HomeVariantSombre() {
  return (
    <div style={{ background: NFTUF.vertProf, minHeight: '100%', color: NFTUF.cremeClair, paddingBottom: 78 }}>
      <NTopbar title="Fromagerie" dark />

      <div style={{ padding: '32px 22px 0' }}>
        <div style={{ ...sV.mono, color: '#9fd1b3', display: 'inline-flex', gap: 8, alignItems: 'center' }}>
          <span style={{ width: 18, height: 1, background: '#9fd1b3' }}/>
          OUVERT · VERSAILLES JUSQU'À 13H
        </div>
        <h1 style={{
          fontFamily: NFTUF.serif, fontWeight: 400, fontSize: 54, lineHeight: 0.95,
          margin: '18px 0 14px', color: NFTUF.cremeClair, letterSpacing: -1.4,
        }}>
          Affiné<br/>
          <em style={{ fontStyle: 'italic', color: '#cfe4d5', fontWeight: 300 }}>en cave,</em><br/>
          vendu sur<br/>
          la route.
        </h1>
        <p style={{ ...sV.body, color: '#c8d6c2', maxWidth: 300, margin: 0 }}>
          Un fromager, un camion, quinze fermes partenaires. Pas de boutique fixe — uniquement vos marchés.
        </p>
      </div>

      <div style={{ padding: '28px 18px 0' }}>
        <PhotoSlot label="cave-affinage.jpg" h={240} r={4} tone="sombre" />
      </div>

      {/* gros marqueur "cette semaine" */}
      <div style={{ padding: '32px 22px 0' }}>
        <div style={{ ...sV.mono, color: '#9fd1b3' }}>↗ Cette semaine · 4 marchés</div>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 14, borderTop: '1px solid #2a5a3e' }}>
          {[
            { d: '20', j: 'MER', l: 'Versailles',  h: '7H–13H', s: 'ouvert' },
            { d: '21', j: 'JEU', l: 'Boulogne',    h: '8H–14H' },
            { d: '23', j: 'SAM', l: 'Local Massy', h: '9H–12H', s: 'fixe' },
            { d: '24', j: 'DIM', l: 'Sceaux',      h: '8H–13H' },
          ].map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'baseline', padding: '16px 0', borderBottom: '1px solid #2a5a3e' }}>
              <span style={{ fontFamily: NFTUF.serif, fontSize: 30, color: NFTUF.cremeClair, fontWeight: 400, width: 56 }}>{m.d}</span>
              <span style={{ ...sV.mono, width: 50, color: '#9fd1b3' }}>{m.j}</span>
              <span style={{ flex: 1, fontFamily: NFTUF.serif, fontSize: 20, color: NFTUF.cremeClair }}>{m.l}</span>
              <span style={{ ...sV.mono, color: '#c8d6c2', fontSize: 10 }}>{m.h}</span>
              {m.s === 'ouvert' && <span style={{ marginLeft: 10, width: 8, height: 8, background: '#9fd1b3', borderRadius: 99 }}/>}
              {m.s === 'fixe' && <span style={{ marginLeft: 10, ...sV.mono, color: '#9fd1b3', fontSize: 9 }}>★</span>}
              {!m.s && <span style={{ marginLeft: 10, width: 8 }}/>}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14 }}>
          <NBtn variant="cream" full>Voir sur la carte →</NBtn>
        </div>
      </div>

      {/* Quote géant */}
      <div style={{ padding: '50px 22px 50px' }}>
        <div style={{ fontFamily: NFTUF.serif, fontSize: 88, lineHeight: 0.6, color: '#9fd1b3', opacity: 0.5, height: 24 }}>“</div>
        <p style={{
          fontFamily: NFTUF.serif, fontWeight: 400, fontSize: 24, lineHeight: 1.25,
          color: NFTUF.cremeClair, margin: '8px 0 0', fontStyle: 'italic',
        }}>
          Le fromage, c'est de la patience. Le reste, c'est du commerce.
        </p>
        <p style={{ ...sV.mono, color: '#9fd1b3', marginTop: 14 }}>— Maxime, fromager</p>
      </div>

      {/* boutique grid (sombre) */}
      <div style={{ padding: '0 18px' }}>
        <div style={{ padding: '0 4px 16px' }}>
          <div style={{ ...sV.mono, color: '#9fd1b3' }}>Click & Collect</div>
          <h2 style={{ fontFamily: NFTUF.serif, fontSize: 28, fontWeight: 400, color: NFTUF.cremeClair, margin: '6px 0 0' }}>La sélection</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            { n: 'Comté 24 mois',     p: '8,90 €' },
            { n: 'Camembert fermier', p: '6,50 €' },
            { n: 'Bleu d\'Auvergne',  p: '7,20 €' },
            { n: 'Panier découverte', p: '32 €'   },
          ].map((p, i) => (
            <div key={i}>
              <PhotoSlot label={p.n.toLowerCase().replace(/[' ]/g,'-') + '.jpg'} h={140} r={2} tone="sombre" />
              <div style={{ padding: '10px 2px 0' }}>
                <div style={{ fontFamily: NFTUF.serif, fontSize: 15, color: NFTUF.cremeClair }}>{p.n}</div>
                <div style={{ ...sV.mono, color: '#9fd1b3', marginTop: 2, fontSize: 10 }}>{p.p}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 20 }}>
          <NBtn variant="cream" full>Voir tous les fromages</NBtn>
        </div>
      </div>

      <div style={{ height: 60 }}/>
      <NTabBar active="home" dark />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// VARIANT C — EDITORIAL · Type géante, vrai magazine, asymétrique
// ─────────────────────────────────────────────────────────────
function HomeVariantEditorial() {
  return (
    <div style={{ background: NFTUF.off, minHeight: '100%', paddingBottom: 78 }}>
      <NTopbar title="N° 24" />

      {/* Masthead façon journal */}
      <div style={{ padding: '14px 22px 0', borderBottom: `1px solid ${NFTUF.encre}`, paddingBottom: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ ...sV.mono, color: NFTUF.encre, fontSize: 10 }}>SEM. 47 · NOV. 2026</span>
          <span style={{ ...sV.mono, color: NFTUF.encre, fontSize: 10 }}>ÉDITION HEBDOMADAIRE</span>
        </div>
      </div>

      {/* Type géant */}
      <div style={{ padding: '24px 16px 0' }}>
        <h1 style={{
          fontFamily: NFTUF.serif, fontWeight: 400, fontSize: 92, lineHeight: 0.86,
          color: NFTUF.encre, margin: 0, letterSpacing: -3.5,
        }}>
          N'en<br/>
          <em style={{ fontStyle: 'italic', color: NFTUF.vert, fontWeight: 400 }}>fais&nbsp;pas</em><br/>
          tout&nbsp;un<br/>
          fromage.
        </h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 14, paddingBottom: 14, borderBottom: `1px solid ${NFTUF.encre}` }}>
          <span style={{ ...sV.mono, color: NFTUF.encre, fontSize: 10 }}>UN CAMION,<br/>QUATRE MARCHÉS.</span>
          <span style={{ ...sV.mono, color: NFTUF.vert, fontSize: 10 }}>EST. 2021 →</span>
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        <PhotoSlot label="camion-versailles.jpg" h={260} r={0} tone="kraft" />
      </div>

      {/* article-style lede */}
      <div style={{ padding: '24px 22px 0', display: 'grid', gridTemplateColumns: '70px 1fr', gap: 14 }}>
        <div>
          <div style={{ ...sV.mono, color: NFTUF.vert, fontSize: 9 }}>L'ARTISAN</div>
          <div style={{ width: 36, height: 1, background: NFTUF.vert, marginTop: 4 }}/>
        </div>
        <div>
          <h2 style={{ fontFamily: NFTUF.serif, fontWeight: 400, fontSize: 22, lineHeight: 1.1, margin: 0, color: NFTUF.encre, textWrap: 'balance' }}>
            « J'ai choisi un camion plutôt qu'une boutique. Plus de marchés, plus de visages. »
          </h2>
          <p style={{ ...sV.body, margin: '12px 0 0', fontSize: 13 }}>
            Maxime, 34 ans, sillonne l'Île-de-France avec un fourgon réfrigéré et une sélection de quinze producteurs. <a style={{ color: NFTUF.vert }}>Lire →</a>
          </p>
        </div>
      </div>

      {/* index de marchés façon sommaire */}
      <div style={{ padding: '40px 22px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderBottom: `2px solid ${NFTUF.encre}`, paddingBottom: 6 }}>
          <span style={{ fontFamily: NFTUF.serif, fontSize: 24, color: NFTUF.encre }}>Sommaire</span>
          <span style={{ ...sV.mono, color: NFTUF.encre, fontSize: 10 }}>4 ÉTAPES</span>
        </div>
        {[
          { n: '01', l: 'Versailles', d: 'Mer. 20', p: '004' },
          { n: '02', l: 'Boulogne',   d: 'Jeu. 21', p: '008' },
          { n: '03', l: 'Antony',     d: 'Ven. 22', p: '012' },
          { n: '04', l: 'Massy ◆',    d: 'Sam. 23', p: '016' },
          { n: '05', l: 'Sceaux',     d: 'Dim. 24', p: '020' },
        ].map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 10, padding: '12px 0', borderBottom: `1px dotted ${NFTUF.ligne}` }}>
            <span style={{ ...sV.mono, fontSize: 10, color: NFTUF.vert, width: 24 }}>{r.n}</span>
            <span style={{ fontFamily: NFTUF.serif, fontSize: 18, color: NFTUF.encre, flex: 1 }}>{r.l}</span>
            <span style={{ ...sV.mono, fontSize: 10, color: NFTUF.mute }}>{r.d}</span>
            <span style={{ fontFamily: NFTUF.serif, fontSize: 14, color: NFTUF.encre, width: 28, textAlign: 'right' }}>p. {r.p}</span>
          </div>
        ))}
      </div>

      {/* feuilleton: produits façon "rayon" éditorial */}
      <div style={{ padding: '40px 16px 0' }}>
        <div style={{ padding: '0 6px 12px', borderBottom: `2px solid ${NFTUF.encre}`, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: NFTUF.serif, fontSize: 24, color: NFTUF.encre }}>Au comptoir</span>
          <span style={{ ...sV.mono, color: NFTUF.vert, fontSize: 10 }}>→ BOUTIQUE</span>
        </div>
        {[
          { n: 'Comté 24 mois',      p: '8,90 €', d: 'Note de noisette grillée, cristaux marqués.', tone: 'creme' },
          { n: 'Camembert fermier',  p: '6,50 €', d: 'Lait cru, croûte fleurie, cœur coulant.',       tone: 'kraft' },
          { n: 'Bleu d\'Auvergne',   p: '7,20 €', d: 'Persillé puissant, AOP, texture crayeuse.',     tone: 'creme' },
        ].map((p, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 14, padding: '18px 6px', borderBottom: `1px solid ${NFTUF.ligne}` }}>
            <PhotoSlot label="" h={100} w={100} r={2} tone={p.tone} />
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: NFTUF.serif, fontSize: 18, color: NFTUF.encre }}>{p.n}</span>
                <span style={{ fontFamily: NFTUF.serif, fontSize: 16, color: NFTUF.vert }}>{p.p}</span>
              </div>
              <p style={{ ...sV.body, fontSize: 12.5, margin: '4px 0 0' }}>{p.d}</p>
              <div style={{ marginTop: 8 }}>
                <NBtn variant="ghost" sm>Ajouter au panier</NBtn>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer éditorial */}
      <div style={{ marginTop: 36, padding: '28px 22px', background: NFTUF.encre, color: NFTUF.cremeClair }}>
        <div style={{ ...sV.mono, color: '#9fd1b3', fontSize: 10 }}>COLOPHON</div>
        <p style={{ fontFamily: NFTUF.serif, fontStyle: 'italic', fontSize: 17, lineHeight: 1.3, margin: '10px 0 0' }}>
          Une fromagerie artisanale itinérante, basée à Massy. Éditée chaque dimanche soir, mise à jour selon la saison.
        </p>
        <div style={{ marginTop: 18, ...sV.mono, fontSize: 10, color: '#9fd1b3' }}>INSTAGRAM · FACEBOOK · CONTACT</div>
      </div>
      <NTabBar active="home" />
    </div>
  );
}

Object.assign(window, { HomeVariantSombre, HomeVariantEditorial });
