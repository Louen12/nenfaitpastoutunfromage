// All mobile screens for N'enFaitPasToutUnFromage.
// Each screen returns full content for inside an IOSDevice (402×874).

const sH = {  // shared shorthand for spacing helpers
  pad: { padding: '0 18px' },
  hr: { height: 1, background: NFTUF.ligne, border: 0, margin: 0 },
  h1: { fontFamily: NFTUF.serif, fontWeight: 500, fontSize: 38, lineHeight: 1.02, letterSpacing: -0.8, color: NFTUF.encre, textWrap: 'balance' },
  h2: { fontFamily: NFTUF.serif, fontWeight: 500, fontSize: 26, lineHeight: 1.08, letterSpacing: -0.4, color: NFTUF.encre },
  h3: { fontFamily: NFTUF.serif, fontWeight: 500, fontSize: 19, lineHeight: 1.15, color: NFTUF.encre },
  body: { fontFamily: NFTUF.sans, fontSize: 14, lineHeight: 1.55, color: NFTUF.texte },
  small: { fontFamily: NFTUF.sans, fontSize: 12, lineHeight: 1.5, color: NFTUF.mute },
  prix: { fontFamily: NFTUF.serif, fontWeight: 500, fontSize: 18, color: NFTUF.encre },
};

// ─────────────────────────────────────────────────────────────
// 01 — ACCUEIL (storytelling, longue page mobile)
// ─────────────────────────────────────────────────────────────
function HomeScreen() {
  return (
    <div style={{ background: NFTUF.cremeClair, minHeight: '100%', paddingBottom: 78 }}>
      <NTopbar title="Fromagerie" />

      {/* HERO ───────────────────────────────────── */}
      <div style={{ position: 'relative', padding: '28px 22px 0' }}>
        <NEyebrow>Île-de-France · depuis 2021</NEyebrow>
        <h1 style={{ ...sH.h1, margin: '14px 0 12px' }}>
          Le fromage qui<br/>
          <em style={{ fontStyle: 'italic', color: NFTUF.vert, fontWeight: 400 }}>vient à vous</em>.
        </h1>
        <p style={{ ...sH.body, margin: 0, maxWidth: 320 }}>
          Un camion, quatre marchés par semaine, et une sélection de fromages affinés par un seul artisan.
        </p>
        <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
          <NBtn variant="primary">Voir les marchés →</NBtn>
          <NBtn variant="ghost">La boutique</NBtn>
        </div>
      </div>

      {/* HERO IMAGE ───────────────────────────────── */}
      <div style={{ padding: '24px 18px 0' }}>
        <PhotoSlot label="camion-marché.jpg" h={240} r={4} tone="kraft" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 4px 0' }}>
          <span style={{ fontFamily: NFTUF.mono, fontSize: 10, color: NFTUF.mute, letterSpacing: 1 }}>
            ↳ Le camion sur le marché de Versailles
          </span>
          <span style={{ fontFamily: NFTUF.mono, fontSize: 10, color: NFTUF.mute }}>01 / 04</span>
        </div>
      </div>

      {/* MARCHÉS CETTE SEMAINE ────────────────────── */}
      <div style={{ marginTop: 38, padding: '22px 0 24px', background: NFTUF.creme, borderTop: `1px solid ${NFTUF.ligne}`, borderBottom: `1px solid ${NFTUF.ligne}` }}>
        <div style={{ ...sH.pad, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <NEyebrow>Sem. 47</NEyebrow>
            <h2 style={{ ...sH.h2, margin: '6px 0 0' }}>Cette semaine</h2>
          </div>
          <a style={{ ...sH.small, color: NFTUF.vert, textDecoration: 'underline', textUnderlineOffset: 3 }}>Tout voir</a>
        </div>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '0 18px 4px' }}>
          {[
            { j: 'Mer.', date: '20', lieu: 'Versailles', h: '7h–13h', state: 'open' },
            { j: 'Jeu.', date: '21', lieu: 'Boulogne',   h: '8h–14h', state: null },
            { j: 'Sam.', date: '23', lieu: 'Local · Massy', h: '9h–12h', state: 'fix' },
            { j: 'Dim.', date: '24', lieu: 'Sceaux',     h: '8h–13h', state: null },
          ].map((m, i) => (
            <div key={i} style={{
              minWidth: 168, background: NFTUF.cremeClair,
              borderRadius: 6, padding: 14,
              boxShadow: `inset 0 0 0 1px ${NFTUF.ligne}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontFamily: NFTUF.serif, fontSize: 30, fontWeight: 500, color: NFTUF.vert, lineHeight: 1 }}>{m.date}</span>
                <span style={{ fontFamily: NFTUF.mono, fontSize: 11, color: NFTUF.mute, letterSpacing: 1.5, textTransform: 'uppercase' }}>{m.j} Nov</span>
              </div>
              <div style={{ ...sH.h3, marginTop: 10 }}>{m.lieu}</div>
              <div style={{ ...sH.small, marginTop: 4 }}>{m.h}</div>
              {m.state === 'open' && <div style={{ marginTop: 10 }}><NChip tone="open" sm>● Ouvert · 4h restantes</NChip></div>}
              {m.state === 'fix' && <div style={{ marginTop: 10 }}><NChip tone="cream" sm>Marché fixe</NChip></div>}
            </div>
          ))}
        </div>
      </div>

      {/* STORY ───────────────────────────────────── */}
      <div style={{ padding: '36px 22px 0' }}>
        <NEyebrow>L'artisan</NEyebrow>
        <h2 style={{ ...sH.h2, margin: '10px 0 14px', textWrap: 'pretty' }}>
          « J'ai choisi un camion plutôt qu'une boutique. Plus de marchés, plus de visages. »
        </h2>
        <p style={{ ...sH.body, margin: '0 0 16px' }}>
          Maxime, fromager itinérant, sillonne l'Île-de-France pour vous proposer des fromages affinés à la main, sélectionnés directement chez quinze producteurs en circuit court.
        </p>
        <a style={{ fontFamily: NFTUF.sans, fontWeight: 600, fontSize: 14, color: NFTUF.vert, textDecoration: 'underline', textUnderlineOffset: 4 }}>
          Lire son histoire →
        </a>
      </div>

      <div style={{ padding: '20px 18px 0' }}>
        <PhotoSlot label="portrait-maxime.jpg" h={300} r={4} tone="vert" />
      </div>

      {/* BOUTIQUE PREVIEW ───────────────────────── */}
      <div style={{ padding: '40px 22px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div>
            <NEyebrow>Click & collect</NEyebrow>
            <h2 style={{ ...sH.h2, margin: '6px 0 0' }}>La boutique</h2>
          </div>
          <a style={{ ...sH.small, color: NFTUF.vert, textDecoration: 'underline', textUnderlineOffset: 3 }}>Tout voir</a>
        </div>
        <p style={{ ...sH.body, margin: '10px 0 18px' }}>
          Commandez en ligne, choisissez votre point de retrait — local ou marché de la semaine.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {[
            { n: 'Comté 24 mois', p: '8,90 €', t: '/ 200g', tone: 'creme' },
            { n: 'Camembert fermier', p: '6,50 €', t: '/ pièce', tone: 'kraft' },
            { n: 'Bleu d\'Auvergne AOP', p: '7,20 €', t: '/ 200g', tone: 'creme' },
            { n: 'Panier découverte', p: '32,00 €', t: '/ 4 fromages', tone: 'vert' },
          ].map((p, i) => (
            <div key={i}>
              <PhotoSlot label={p.n.toLowerCase().replace(/[' ]/g,'-') + '.jpg'} h={148} r={4} tone={p.tone} />
              <div style={{ padding: '10px 2px 0' }}>
                <div style={{ fontFamily: NFTUF.serif, fontSize: 16, color: NFTUF.encre, lineHeight: 1.2 }}>{p.n}</div>
                <div style={{ marginTop: 4, display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ ...sH.prix, fontSize: 15 }}>{p.p}</span>
                  <span style={{ ...sH.small, fontSize: 11 }}>{p.t}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INSTA TEASE ───────────────────────────── */}
      <div style={{ padding: '44px 22px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div>
            <NEyebrow>@nenfaispas.fromage</NEyebrow>
            <h2 style={{ ...sH.h2, margin: '6px 0 0' }}>Côté coulisses</h2>
          </div>
          <a style={{ ...sH.small, color: NFTUF.vert, textDecoration: 'underline', textUnderlineOffset: 3 }}>Instagram</a>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4, padding: '16px 18px 0' }}>
        {['arrivage.jpg','meule.jpg','marché-aube.jpg','découpe.jpg','client.jpg','panier.jpg'].map((l, i) => (
          <PhotoSlot key={i} label={l} h={108} r={2} tone={i%2 ? 'creme' : 'kraft'} />
        ))}
      </div>

      {/* FOOTER MINI ─────────────────────────── */}
      <div style={{ padding: '44px 22px 28px', textAlign: 'center', marginTop: 24, background: NFTUF.vertProf, color: NFTUF.cremeClair }}>
        <NFTUFLogo size={72} color={NFTUF.vertProf} light={NFTUF.cremeClair} />
        <p style={{ fontFamily: NFTUF.serif, fontSize: 18, lineHeight: 1.3, margin: '18px auto 0', maxWidth: 280, fontStyle: 'italic', opacity: 0.92 }}>
          « Le fromage, c'est une histoire de mains et de patience. »
        </p>
        <div style={{ marginTop: 22, display: 'flex', justifyContent: 'center', gap: 18, fontFamily: NFTUF.mono, fontSize: 11, letterSpacing: 1.5, opacity: 0.8 }}>
          <span>INSTAGRAM</span><span>·</span><span>FACEBOOK</span><span>·</span><span>CONTACT</span>
        </div>
        <div style={{ marginTop: 28, fontFamily: NFTUF.mono, fontSize: 9, opacity: 0.5, letterSpacing: 1 }}>
          MASSY · ÎLE-DE-FRANCE · SIRET 000 000 000 00000
        </div>
      </div>

      {/* TAB BAR fixe en bas */}
      <div style={{ position: 'sticky', bottom: 0 }}>
        <NTabBar active="home" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 02 — STORY / Le Fromager
// ─────────────────────────────────────────────────────────────
function StoryScreen() {
  return (
    <div style={{ background: NFTUF.cremeClair, minHeight: '100%', paddingBottom: 78 }}>
      <NTopbar title="L'artisan" back />
      <div style={{ padding: '22px 22px 0' }}>
        <NEyebrow>Chapitre 01</NEyebrow>
        <h1 style={{ ...sH.h1, margin: '12px 0 8px', fontSize: 34 }}>
          Du laboratoire <em style={{ color: NFTUF.vert, fontWeight: 400 }}>au camion</em>
        </h1>
        <p style={{ ...sH.small, margin: 0 }}>par Maxime · lecture 3 min</p>
      </div>
      <div style={{ padding: '20px 18px 0' }}>
        <PhotoSlot label="atelier.jpg" h={260} r={4} tone="kraft" />
      </div>
      <div style={{ padding: '24px 22px 0' }}>
        <p style={{ ...sH.body, fontSize: 15, margin: 0 }}>
          <span style={{ fontFamily: NFTUF.serif, fontSize: 44, lineHeight: 0.7, float: 'left', marginRight: 8, marginTop: 8, color: NFTUF.vert }}>J</span>
          'ai longtemps travaillé en cave d'affinage. Quand j'ai voulu me lancer, l'idée de m'enfermer dans une boutique fixe ne m'a jamais convaincu. Le camion s'est imposé : aller à la rencontre des gens, changer de marché, sentir les saisons.
        </p>
        <p style={{ ...sH.body, fontSize: 15, margin: '16px 0 0' }}>
          Aujourd'hui, je tourne sur quatre marchés en semaine, plus un marché fixe le samedi devant mon local de Massy. Tout est affiné à la main, dans une cave que je contrôle au degré près.
        </p>
      </div>

      <div style={{ padding: '32px 22px 0' }}>
        <NEyebrow>Les producteurs</NEyebrow>
        <h2 style={{ ...sH.h2, margin: '8px 0 14px' }}>15 fermes, 0 intermédiaire</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            { l: 'Ferme du Vallon', r: 'Jura · Comté', km: '410 km' },
            { l: 'GAEC Bouvier', r: 'Auvergne · Bleus', km: '380 km' },
            { l: 'Chèvrerie de l\'Yonne', r: 'Bourgogne · Crottins', km: '180 km' },
            { l: 'Fromagerie Marchand', r: 'Normandie · Camemberts', km: '220 km' },
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderTop: i ? `1px solid ${NFTUF.ligne}` : 'none' }}>
              <div style={{ width: 36, height: 36, borderRadius: 999, background: NFTUF.vert, color: NFTUF.cremeClair, display: 'grid', placeItems: 'center', fontFamily: NFTUF.serif, fontWeight: 500, fontSize: 14 }}>{f.l[0]}</div>
              <div style={{ marginLeft: 12, flex: 1 }}>
                <div style={{ ...sH.h3, fontSize: 16 }}>{f.l}</div>
                <div style={{ ...sH.small, marginTop: 2 }}>{f.r}</div>
              </div>
              <span style={{ ...sH.small, fontFamily: NFTUF.mono, letterSpacing: 1 }}>{f.km}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'sticky', bottom: 0, marginTop: 32 }}>
        <NTabBar active="home" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 03 — MARCHÉS · vue CARTE
// ─────────────────────────────────────────────────────────────
function MarchesCarteScreen() {
  return (
    <div style={{ background: NFTUF.cremeClair, minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
      <NTopbar title="Marchés" />
      <div style={{ padding: '14px 18px 12px', display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, display: 'flex', background: '#fff', borderRadius: 999, boxShadow: `inset 0 0 0 1px ${NFTUF.ligne}`, padding: '8px 14px', alignItems: 'center', gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="6" cy="6" r="4.5" fill="none" stroke={NFTUF.mute} strokeWidth="1.4"/><path d="M9.5 9.5l3 3" stroke={NFTUF.mute} strokeWidth="1.4" strokeLinecap="round"/></svg>
          <span style={{ fontFamily: NFTUF.sans, fontSize: 13, color: NFTUF.mute }}>Code postal ou commune</span>
        </div>
        <div style={{ display: 'flex', background: NFTUF.vertProf, color: NFTUF.cremeClair, borderRadius: 999, padding: '0 4px' }}>
          <span style={{ background: NFTUF.vert, color: NFTUF.cremeClair, padding: '7px 14px', borderRadius: 999, fontFamily: NFTUF.sans, fontSize: 12, fontWeight: 600, alignSelf: 'center', margin: 3 }}>Carte</span>
          <span style={{ padding: '7px 14px', fontFamily: NFTUF.sans, fontSize: 12, fontWeight: 500, alignSelf: 'center' }}>Liste</span>
        </div>
      </div>

      {/* MAP MOCK */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#e9e5d4' }}>
        {/* fake map: organic shapes */}
        <svg width="100%" height="100%" viewBox="0 0 400 700" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
          <rect width="400" height="700" fill="#ece6d2"/>
          {/* zones */}
          <path d="M0 0 L400 0 L380 150 L260 220 L320 320 L240 420 L300 540 L240 700 L0 700 Z" fill="#dfd9bf" opacity="0.7"/>
          <path d="M260 220 L320 320 L240 420 L300 540 L400 540 L400 200 Z" fill="#cdd8c2" opacity="0.45"/>
          {/* rivers */}
          <path d="M-10 320 C 80 280, 160 360, 240 340 S 380 380, 420 350" stroke="#a9c4d4" strokeWidth="6" fill="none"/>
          <path d="M-10 320 C 80 280, 160 360, 240 340 S 380 380, 420 350" stroke="#bcd4e0" strokeWidth="3" fill="none"/>
          {/* roads */}
          {[100, 200, 300, 460, 560, 640].map((y, i) => (
            <line key={i} x1="0" y1={y} x2="400" y2={y} stroke="#fff" strokeOpacity="0.55" strokeWidth="1"/>
          ))}
          {[60, 160, 230, 320].map((x, i) => (
            <line key={i} x1={x} y1="0" x2={x} y2="700" stroke="#fff" strokeOpacity="0.55" strokeWidth="1"/>
          ))}
        </svg>
        {/* markers */}
        {[
          { x: 90, y: 220, lbl: 'MER 20', sel: false },
          { x: 240, y: 180, lbl: 'JEU 21', sel: false },
          { x: 175, y: 460, lbl: 'SAM 23', sel: true },
          { x: 300, y: 360, lbl: 'DIM 24', sel: false },
        ].map((m, i) => (
          <div key={i} style={{ position: 'absolute', left: m.x, top: m.y, transform: 'translate(-50%,-100%)' }}>
            <div style={{
              background: m.sel ? NFTUF.vert : NFTUF.cremeClair,
              color: m.sel ? NFTUF.cremeClair : NFTUF.vertProf,
              fontFamily: NFTUF.mono, fontSize: 10, letterSpacing: 1, fontWeight: 700,
              padding: '5px 9px', borderRadius: 999,
              boxShadow: `0 4px 10px rgba(0,0,0,0.18), 0 0 0 2px ${m.sel ? NFTUF.cremeClair : NFTUF.vert}`,
              whiteSpace: 'nowrap', marginBottom: 4,
            }}>{m.lbl}</div>
            <div style={{
              width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
              borderTop: `8px solid ${m.sel ? NFTUF.vert : NFTUF.cremeClair}`,
              margin: '0 auto',
            }}/>
          </div>
        ))}
        {/* legend */}
        <div style={{ position: 'absolute', left: 14, bottom: 14, background: NFTUF.cremeClair, padding: '8px 12px', borderRadius: 4, fontFamily: NFTUF.mono, fontSize: 10, color: NFTUF.encre, letterSpacing: 1, boxShadow: '0 4px 16px rgba(0,0,0,.12)' }}>
          ÎLE-DE-FRANCE · 25KM
        </div>
      </div>

      {/* bottom sheet preview of selected marché */}
      <div style={{ background: NFTUF.cremeClair, borderTop: `1px solid ${NFTUF.ligne}`, padding: '14px 20px 0' }}>
        <div style={{ width: 36, height: 4, background: NFTUF.ligne, borderRadius: 99, margin: '0 auto 12px' }}/>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ ...sH.h2, fontSize: 22 }}>Local · Massy</span>
          <NChip tone="vert" sm>Marché fixe</NChip>
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 8, fontFamily: NFTUF.sans, fontSize: 13, color: NFTUF.texte }}>
          <span><b style={{ color: NFTUF.encre }}>Sam. 23 nov</b> · 9h – 12h</span>
        </div>
        <div style={{ ...sH.small, marginTop: 4 }}>14 rue de l'Atelier, 91300 Massy</div>
        <div style={{ display: 'flex', gap: 10, padding: '14px 0 16px' }}>
          <NBtn variant="primary" sm>Itinéraire</NBtn>
          <NBtn variant="ghost" sm>Commander pour ce retrait</NBtn>
        </div>
      </div>
      <NTabBar active="marches" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 04 — MARCHÉS · vue LISTE
// ─────────────────────────────────────────────────────────────
function MarchesListeScreen() {
  const rows = [
    { j: 'Mercredi', d: '20 nov.', lieu: 'Marché Notre-Dame', ville: 'Versailles 78', h: '7h – 13h', km: '24 km', state: 'open' },
    { j: 'Jeudi',    d: '21 nov.', lieu: 'Place Bir-Hakeim',  ville: 'Boulogne 92',   h: '8h – 14h', km: '18 km', state: null },
    { j: 'Vendredi', d: '22 nov.', lieu: 'Place du Marché',    ville: 'Antony 92',     h: '7h – 13h30', km: '8 km', state: null },
    { j: 'Samedi',   d: '23 nov.', lieu: 'Local de Massy',     ville: 'Massy 91',      h: '9h – 12h', km: '0 km', state: 'fix' },
    { j: 'Dimanche', d: '24 nov.', lieu: 'Marché de Sceaux',   ville: 'Sceaux 92',     h: '8h – 13h', km: '4 km', state: null },
  ];
  return (
    <div style={{ background: NFTUF.cremeClair, minHeight: '100%', paddingBottom: 78 }}>
      <NTopbar title="Marchés" />
      <div style={{ padding: '14px 18px 12px', display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, display: 'flex', background: '#fff', borderRadius: 999, boxShadow: `inset 0 0 0 1px ${NFTUF.ligne}`, padding: '8px 14px', alignItems: 'center', gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><circle cx="6" cy="6" r="4.5" fill="none" stroke={NFTUF.mute} strokeWidth="1.4"/><path d="M9.5 9.5l3 3" stroke={NFTUF.mute} strokeWidth="1.4" strokeLinecap="round"/></svg>
          <span style={{ fontFamily: NFTUF.sans, fontSize: 13, color: NFTUF.mute }}>Code postal ou commune</span>
        </div>
        <div style={{ display: 'flex', background: NFTUF.vertProf, color: NFTUF.cremeClair, borderRadius: 999, padding: '0 4px' }}>
          <span style={{ padding: '7px 14px', fontFamily: NFTUF.sans, fontSize: 12, fontWeight: 500, alignSelf: 'center' }}>Carte</span>
          <span style={{ background: NFTUF.vert, color: NFTUF.cremeClair, padding: '7px 14px', borderRadius: 999, fontFamily: NFTUF.sans, fontSize: 12, fontWeight: 600, alignSelf: 'center', margin: 3 }}>Liste</span>
        </div>
      </div>

      <div style={{ ...sH.pad, marginTop: 8 }}>
        <NEyebrow>Sem. 47 · Du 18 au 24 nov.</NEyebrow>
        <h2 style={{ ...sH.h2, margin: '8px 0 16px' }}>Où me trouver</h2>
      </div>

      <div style={{ padding: '0 0 12px' }}>
        {rows.map((m, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '16px 22px', borderTop: `1px solid ${NFTUF.ligne}` }}>
            <div style={{ width: 50, flexShrink: 0, textAlign: 'center', borderRight: `1px solid ${NFTUF.ligne}`, paddingRight: 10 }}>
              <div style={{ fontFamily: NFTUF.mono, fontSize: 9.5, letterSpacing: 1.5, color: NFTUF.mute, textTransform: 'uppercase' }}>{m.j.slice(0,3)}.</div>
              <div style={{ fontFamily: NFTUF.serif, fontSize: 28, color: NFTUF.vert, fontWeight: 500, lineHeight: 1 }}>{m.d.split(' ')[0]}</div>
              <div style={{ fontFamily: NFTUF.mono, fontSize: 9.5, color: NFTUF.mute, letterSpacing: 1, marginTop: 2 }}>{m.d.split(' ')[1]}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ ...sH.h3, fontSize: 17 }}>{m.lieu}</span>
                {m.state === 'open' && <NChip tone="open" sm>● Ouvert</NChip>}
                {m.state === 'fix' && <NChip tone="vert" sm>Fixe</NChip>}
              </div>
              <div style={{ ...sH.small, marginTop: 4 }}>{m.ville} · {m.h}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: NFTUF.mono, fontSize: 11, color: NFTUF.encre, letterSpacing: 0.5 }}>{m.km}</div>
              <svg width="14" height="14" viewBox="0 0 14 14" style={{ marginTop: 4 }}><path d="M5 2l5 5-5 5" stroke={NFTUF.vert} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        ))}
      </div>
      <NTabBar active="marches" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 05 — BOUTIQUE
// ─────────────────────────────────────────────────────────────
function BoutiqueScreen() {
  const cats = ['Tous', 'Pâtes pressées', 'Pâtes molles', 'Bleus', 'Chèvres', 'Paniers'];
  const prods = [
    { n: 'Comté 24 mois',      p: '8,90 €', u: '/ 200g',     stk: 'En stock',  tone: 'creme' },
    { n: 'Camembert fermier',  p: '6,50 €', u: '/ pièce',    stk: 'En stock',  tone: 'kraft' },
    { n: 'Bleu d\'Auvergne',   p: '7,20 €', u: '/ 200g',     stk: 'Plus que 3', tone: 'creme' },
    { n: 'Crottin de Chavignol', p: '4,80 €', u: '/ pièce', stk: 'En stock',   tone: 'kraft' },
    { n: 'Saint-Nectaire AOP', p: '9,40 €', u: '/ 250g',     stk: 'Rupture', tone: 'creme' },
    { n: 'Panier découverte',  p: '32,00 €', u: '/ 4 fromages', stk: 'En stock', tone: 'vert' },
  ];
  return (
    <div style={{ background: NFTUF.cremeClair, minHeight: '100%', paddingBottom: 78 }}>
      <NTopbar title="Boutique" />
      <div style={{ padding: '18px 22px 0' }}>
        <NEyebrow>Click & collect</NEyebrow>
        <h2 style={{ ...sH.h2, margin: '8px 0 6px' }}>Notre sélection</h2>
        <p style={{ ...sH.small, margin: 0 }}>32 références · mis à jour il y a 2h</p>
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '16px 18px 14px', overflowX: 'auto' }}>
        {cats.map((c, i) => (
          <span key={i} style={{
            padding: '7px 14px', borderRadius: 999, whiteSpace: 'nowrap',
            background: i === 0 ? NFTUF.encre : 'transparent',
            color: i === 0 ? NFTUF.cremeClair : NFTUF.encre,
            boxShadow: i === 0 ? 'none' : `inset 0 0 0 1px ${NFTUF.ligne}`,
            fontFamily: NFTUF.sans, fontSize: 13, fontWeight: i === 0 ? 600 : 500,
          }}>{c}</span>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, padding: '0 18px' }}>
        {prods.map((p, i) => (
          <div key={i}>
            <div style={{ position: 'relative' }}>
              <PhotoSlot label={p.n.toLowerCase().replace(/[' ]/g,'-') + '.jpg'} h={160} r={4} tone={p.tone} />
              {p.stk === 'Rupture' && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,20,18,0.55)', display: 'grid', placeItems: 'center', borderRadius: 4 }}>
                  <NChip tone="rouge" sm>Rupture</NChip>
                </div>
              )}
              {p.stk === 'Plus que 3' && (
                <div style={{ position: 'absolute', bottom: 8, left: 8 }}>
                  <NChip tone="rouge" sm>Plus que 3</NChip>
                </div>
              )}
            </div>
            <div style={{ padding: '10px 2px 0' }}>
              <div style={{ fontFamily: NFTUF.serif, fontSize: 16, color: NFTUF.encre, lineHeight: 1.2 }}>{p.n}</div>
              <div style={{ marginTop: 4, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ ...sH.prix, fontSize: 15 }}>{p.p}</span>
                  <span style={{ ...sH.small, fontSize: 11, marginLeft: 4 }}>{p.u}</span>
                </div>
                {p.stk !== 'Rupture' && (
                  <button style={{ width: 30, height: 30, borderRadius: 999, border: 'none', background: NFTUF.vert, color: NFTUF.cremeClair, fontSize: 18, lineHeight: 1, cursor: 'pointer' }}>+</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: '24px 22px' }}>
        <NBtn variant="ghost" full>Charger plus de produits</NBtn>
      </div>
      <NTabBar active="shop" />
    </div>
  );
}

Object.assign(window, { HomeScreen, StoryScreen, MarchesCarteScreen, MarchesListeScreen, BoutiqueScreen });
