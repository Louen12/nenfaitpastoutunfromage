// Screens B — Produit, Panier, Checkout (point de retrait), Confirmation, Insta

const sB = {
  pad: { padding: '0 22px' },
  h1: { fontFamily: NFTUF.serif, fontWeight: 500, fontSize: 32, lineHeight: 1.05, letterSpacing: -0.6, color: NFTUF.encre },
  h2: { fontFamily: NFTUF.serif, fontWeight: 500, fontSize: 22, lineHeight: 1.1, color: NFTUF.encre },
  h3: { fontFamily: NFTUF.serif, fontWeight: 500, fontSize: 17, lineHeight: 1.2, color: NFTUF.encre },
  body: { fontFamily: NFTUF.sans, fontSize: 14, lineHeight: 1.55, color: NFTUF.texte },
  small: { fontFamily: NFTUF.sans, fontSize: 12, lineHeight: 1.5, color: NFTUF.mute },
  prix: { fontFamily: NFTUF.serif, fontWeight: 500, fontSize: 18, color: NFTUF.encre },
  mono: { fontFamily: NFTUF.mono, fontSize: 11, letterSpacing: 1.4, color: NFTUF.mute, textTransform: 'uppercase' },
};

// ─────────────────────────────────────────────────────────────
// 06 — FICHE PRODUIT
// ─────────────────────────────────────────────────────────────
function ProduitScreen() {
  return (
    <div style={{ background: NFTUF.cremeClair, minHeight: '100%', paddingBottom: 100 }}>
      <NTopbar title="Comté 24 mois" back />

      {/* image principale */}
      <div style={{ padding: '0 0 0' }}>
        <PhotoSlot label="comte-24-mois.jpg" h={340} r={0} tone="kraft" />
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', padding: '10px 0' }}>
          {[0,1,2,3].map(i => (
            <span key={i} style={{ width: i === 0 ? 18 : 5, height: 5, borderRadius: 99, background: i === 0 ? NFTUF.vert : NFTUF.ligne }}/>
          ))}
        </div>
      </div>

      <div style={{ ...sB.pad, paddingTop: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <NChip tone="open" sm>● En stock · 8</NChip>
          <span style={sB.mono}>AOP · Jura</span>
        </div>
        <h1 style={{ ...sB.h1, margin: '14px 0 4px' }}>Comté <em style={{ fontStyle: 'italic', color: NFTUF.vert, fontWeight: 400 }}>24 mois</em></h1>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6 }}>
          <span style={{ ...sB.prix, fontSize: 26 }}>8,90 €</span>
          <span style={sB.small}>les 200g · soit 44,50 € / kg</span>
        </div>

        <div style={{ marginTop: 22 }}>
          <p style={{ ...sB.body, margin: 0 }}>
            Affiné 24 mois en cave de chez nous, ce Comté développe des notes de noisette grillée et une cristallisation marquée. Idéal sur un plateau ou en cuisine.
          </p>
        </div>

        {/* propriétés */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 22 }}>
          {[
            { l: 'Lait', v: 'Cru de vache' },
            { l: 'Affinage', v: '24 mois' },
            { l: 'Producteur', v: 'Ferme du Vallon' },
            { l: 'Distance', v: '410 km' },
          ].map((p, i) => (
            <div key={i} style={{ padding: 12, background: NFTUF.creme, borderRadius: 4 }}>
              <div style={sB.mono}>{p.l}</div>
              <div style={{ ...sB.h3, fontSize: 14, marginTop: 4 }}>{p.v}</div>
            </div>
          ))}
        </div>

        {/* accord */}
        <div style={{ marginTop: 22, padding: '14px 16px', background: NFTUF.vertProf, color: NFTUF.cremeClair, borderRadius: 4, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" style={{ flexShrink: 0, marginTop: 2 }}>
            <path d="M5 2v8a5 5 0 0 0 10 0V2M10 15v3M7 18h6" stroke={NFTUF.cremeClair} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
          </svg>
          <div>
            <div style={{ ...sB.mono, color: '#a8c4b0' }}>Le conseil du fromager</div>
            <div style={{ ...sB.body, color: NFTUF.cremeClair, marginTop: 4, fontSize: 13 }}>
              Sortez-le 30 minutes avant dégustation. À marier avec un Vin Jaune ou un Savagnin.
            </div>
          </div>
        </div>

        {/* quantité */}
        <div style={{ marginTop: 26, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ ...sB.h3, fontSize: 15 }}>Quantité</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', padding: '6px 12px', borderRadius: 999, boxShadow: `inset 0 0 0 1px ${NFTUF.ligne}` }}>
            <button style={{ width: 28, height: 28, borderRadius: 999, border: 'none', background: 'transparent', fontSize: 18, color: NFTUF.encre, cursor: 'pointer' }}>−</button>
            <span style={{ fontFamily: NFTUF.serif, fontSize: 18, minWidth: 14, textAlign: 'center' }}>2</span>
            <button style={{ width: 28, height: 28, borderRadius: 999, border: 'none', background: NFTUF.vert, color: NFTUF.cremeClair, fontSize: 18, cursor: 'pointer' }}>+</button>
          </div>
        </div>
      </div>

      {/* CTA fixe en bas */}
      <div style={{ position: 'sticky', bottom: 0, padding: '14px 18px 20px', background: NFTUF.cremeClair, borderTop: `1px solid ${NFTUF.ligne}`, display: 'flex', gap: 12, alignItems: 'center' }}>
        <div>
          <div style={sB.mono}>Total</div>
          <div style={{ ...sB.prix, fontSize: 22 }}>17,80 €</div>
        </div>
        <NBtn variant="primary" full>Ajouter au panier</NBtn>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 07 — PANIER
// ─────────────────────────────────────────────────────────────
function PanierScreen() {
  const items = [
    { n: 'Comté 24 mois', q: 2, p: '17,80 €', u: '200g', tone: 'creme' },
    { n: 'Camembert fermier', q: 1, p: '6,50 €', u: 'pièce', tone: 'kraft' },
    { n: 'Bleu d\'Auvergne', q: 1, p: '7,20 €', u: '200g', tone: 'creme' },
  ];
  return (
    <div style={{ background: NFTUF.cremeClair, minHeight: '100%', paddingBottom: 78 }}>
      <NTopbar title="Panier" back />

      <div style={{ ...sB.pad, paddingTop: 16, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div>
          <NEyebrow>4 articles</NEyebrow>
          <h2 style={{ ...sB.h2, marginTop: 6 }}>Votre panier</h2>
        </div>
        <a style={{ ...sB.small, color: NFTUF.vert, textDecoration: 'underline' }}>Vider</a>
      </div>

      <div style={{ marginTop: 18 }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 22px', borderTop: `1px solid ${NFTUF.ligne}` }}>
            <PhotoSlot label="" h={72} w={72} r={4} tone={it.tone} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ ...sB.h3, fontSize: 15 }}>{it.n}</div>
              <div style={{ ...sB.small, marginTop: 2 }}>{it.u}</div>
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff', padding: '3px 9px', borderRadius: 999, boxShadow: `inset 0 0 0 1px ${NFTUF.ligne}` }}>
                  <button style={{ width: 22, height: 22, borderRadius: 999, border: 'none', background: 'transparent', fontSize: 14, color: NFTUF.encre, cursor: 'pointer' }}>−</button>
                  <span style={{ fontFamily: NFTUF.serif, fontSize: 14, minWidth: 10, textAlign: 'center' }}>{it.q}</span>
                  <button style={{ width: 22, height: 22, borderRadius: 999, border: 'none', background: NFTUF.vert, color: NFTUF.cremeClair, fontSize: 14, cursor: 'pointer' }}>+</button>
                </div>
                <span style={{ ...sB.prix, fontSize: 15 }}>{it.p}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* récap */}
      <div style={{ margin: '24px 22px 0', padding: '18px 18px', background: NFTUF.creme, borderRadius: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', ...sB.body }}>
          <span>Sous-total</span><span style={{ color: NFTUF.encre }}>31,50 €</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', ...sB.body, marginTop: 6 }}>
          <span>Frais de retrait</span><span style={{ color: NFTUF.vert, fontWeight: 600 }}>Gratuit</span>
        </div>
        <div style={{ height: 1, background: NFTUF.ligne, margin: '14px 0' }}/>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontFamily: NFTUF.serif, fontSize: 18, color: NFTUF.encre }}>Total</span>
          <span style={{ ...sB.prix, fontSize: 24 }}>31,50 €</span>
        </div>
      </div>

      <div style={{ padding: '20px 22px 0' }}>
        <NBtn variant="primary" full>Choisir mon point de retrait →</NBtn>
        <p style={{ ...sB.small, textAlign: 'center', marginTop: 12 }}>Paiement sécurisé Stripe · CGV</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 08 — CHECKOUT · POINT DE RETRAIT (la feature signature)
// ─────────────────────────────────────────────────────────────
function CheckoutRetraitScreen() {
  return (
    <div style={{ background: NFTUF.cremeClair, minHeight: '100%', paddingBottom: 100 }}>
      <NTopbar title="Retrait" back />

      <div style={{ ...sB.pad, paddingTop: 14 }}>
        {/* stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
          {['Panier', 'Retrait', 'Paiement'].map((s, i) => (
            <React.Fragment key={i}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{
                  width: 20, height: 20, borderRadius: 999,
                  background: i < 2 ? NFTUF.vert : '#fff',
                  color: i < 2 ? NFTUF.cremeClair : NFTUF.mute,
                  boxShadow: i < 2 ? 'none' : `inset 0 0 0 1px ${NFTUF.ligne}`,
                  display: 'grid', placeItems: 'center',
                  fontFamily: NFTUF.serif, fontSize: 11, fontWeight: 600,
                }}>{i < 1 ? '✓' : i + 1}</span>
                <span style={{ ...sB.body, fontWeight: i === 1 ? 600 : 500, color: i <= 1 ? NFTUF.encre : NFTUF.mute, fontSize: 12 }}>{s}</span>
              </div>
              {i < 2 && <div style={{ flex: 1, height: 1, background: i < 1 ? NFTUF.vert : NFTUF.ligne }}/>}
            </React.Fragment>
          ))}
        </div>

        <NEyebrow>Étape 2 / 3</NEyebrow>
        <h2 style={{ ...sB.h1, fontSize: 28, margin: '8px 0 6px' }}>Où voulez-vous <em style={{ fontStyle: 'italic', color: NFTUF.vert, fontWeight: 400 }}>récupérer</em> votre commande ?</h2>
        <p style={{ ...sB.body, margin: 0 }}>Deux options selon votre planning de la semaine.</p>

        {/* OPTION A — Local */}
        <div style={{ marginTop: 22, padding: 18, background: '#fff', borderRadius: 8, boxShadow: `inset 0 0 0 2px ${NFTUF.vert}` }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <span style={{
              width: 22, height: 22, borderRadius: 999,
              background: NFTUF.vert, display: 'grid', placeItems: 'center',
              flexShrink: 0, marginTop: 2,
            }}>
              <span style={{ width: 8, height: 8, background: NFTUF.cremeClair, borderRadius: 999 }}/>
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ ...sB.h3 }}>Au local — Massy</span>
                <NChip tone="vert" sm>Recommandé</NChip>
              </div>
              <div style={sB.mono}>OPTION A · MARCHÉ FIXE</div>
              <div style={{ marginTop: 12, padding: 12, background: NFTUF.creme, borderRadius: 4 }}>
                <div style={{ ...sB.body, color: NFTUF.encre, fontWeight: 500 }}>Samedi 23 nov.</div>
                <div style={{ ...sB.body, marginTop: 2 }}>9h00 — 12h00</div>
                <div style={{ ...sB.small, marginTop: 6 }}>14 rue de l'Atelier, 91300 Massy</div>
              </div>
            </div>
          </div>
        </div>

        {/* OPTION B — Marché de la semaine */}
        <div style={{ marginTop: 14, padding: 18, background: '#fff', borderRadius: 8, boxShadow: `inset 0 0 0 1px ${NFTUF.ligne}` }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <span style={{
              width: 22, height: 22, borderRadius: 999,
              background: '#fff', boxShadow: `inset 0 0 0 1.5px ${NFTUF.ligne}`,
              flexShrink: 0, marginTop: 2,
            }}/>
            <div style={{ flex: 1 }}>
              <div style={{ ...sB.h3 }}>Sur un marché</div>
              <div style={sB.mono}>OPTION B · 4 MARCHÉS DE LA SEMAINE</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
                {[
                  { j: 'Mer.', d: '20', lieu: 'Versailles', h: '7h–13h', km: '24 km' },
                  { j: 'Jeu.', d: '21', lieu: 'Boulogne',   h: '8h–14h', km: '18 km' },
                  { j: 'Ven.', d: '22', lieu: 'Antony',     h: '7h–13h30', km: '8 km' },
                  { j: 'Dim.', d: '24', lieu: 'Sceaux',     h: '8h–13h', km: '4 km' },
                ].map((m, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: 10,
                    background: NFTUF.creme, borderRadius: 4,
                    opacity: 0.55,
                  }}>
                    <span style={{ width: 14, height: 14, borderRadius: 99, boxShadow: `inset 0 0 0 1.2px ${NFTUF.mute}` }}/>
                    <span style={{ width: 38, fontFamily: NFTUF.mono, fontSize: 10, color: NFTUF.mute, letterSpacing: 1, textTransform: 'uppercase' }}>{m.j} {m.d}</span>
                    <span style={{ flex: 1, ...sB.body, fontSize: 13, color: NFTUF.encre }}>{m.lieu} <span style={{ color: NFTUF.mute }}>· {m.h}</span></span>
                    <span style={{ fontFamily: NFTUF.mono, fontSize: 10, color: NFTUF.mute }}>{m.km}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* note */}
        <div style={{ marginTop: 16, ...sB.small, display: 'flex', gap: 8 }}>
          <span style={{ width: 14, height: 14, borderRadius: 99, background: NFTUF.creme, display: 'grid', placeItems: 'center', fontFamily: NFTUF.serif, fontSize: 10, color: NFTUF.vert, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>i</span>
          <span>Votre commande sera préparée le jour du retrait. Le fromager vous attend avec votre nom.</span>
        </div>
      </div>

      <div style={{ position: 'sticky', bottom: 0, padding: '14px 18px 20px', background: NFTUF.cremeClair, borderTop: `1px solid ${NFTUF.ligne}`, display: 'flex', gap: 12, alignItems: 'center' }}>
        <div>
          <div style={sB.mono}>Total</div>
          <div style={{ ...sB.prix, fontSize: 20 }}>31,50 €</div>
        </div>
        <NBtn variant="primary" full>Continuer vers paiement</NBtn>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 09 — CHECKOUT · PAIEMENT (Stripe)
// ─────────────────────────────────────────────────────────────
function CheckoutPaiementScreen() {
  return (
    <div style={{ background: NFTUF.cremeClair, minHeight: '100%', paddingBottom: 100 }}>
      <NTopbar title="Paiement" back />
      <div style={{ ...sB.pad, paddingTop: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
          {['Panier','Retrait','Paiement'].map((s, i) => (
            <React.Fragment key={i}>
              <span style={{ width: 20, height: 20, borderRadius: 999, background: NFTUF.vert, color: NFTUF.cremeClair, display: 'grid', placeItems: 'center', fontFamily: NFTUF.serif, fontSize: 11, fontWeight: 600 }}>{i < 2 ? '✓' : 3}</span>
              <span style={{ ...sB.body, fontWeight: i === 2 ? 600 : 500, color: NFTUF.encre, fontSize: 12 }}>{s}</span>
              {i < 2 && <div style={{ flex: 1, height: 1, background: NFTUF.vert }}/>}
            </React.Fragment>
          ))}
        </div>

        {/* récap retrait */}
        <div style={{ padding: 14, background: NFTUF.creme, borderRadius: 4, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={sB.mono}>RETRAIT</div>
              <div style={{ ...sB.body, fontWeight: 600, color: NFTUF.encre, marginTop: 4 }}>Local de Massy · Sam. 23 nov.</div>
              <div style={sB.small}>9h00 — 12h00</div>
            </div>
            <a style={{ ...sB.small, color: NFTUF.vert, textDecoration: 'underline' }}>Modifier</a>
          </div>
        </div>

        <NEyebrow>Vos coordonnées</NEyebrow>
        <div style={{ marginTop: 10, display: 'grid', gap: 10 }}>
          {[
            { l: 'Prénom et nom', v: 'Camille Bernard' },
            { l: 'E-mail', v: 'camille.b@gmail.com' },
            { l: 'Téléphone', v: '06 12 34 56 78' },
          ].map((f, i) => (
            <div key={i} style={{ padding: '10px 14px', background: '#fff', borderRadius: 6, boxShadow: `inset 0 0 0 1px ${NFTUF.ligne}` }}>
              <div style={{ ...sB.small, fontSize: 10.5, letterSpacing: 0.4, textTransform: 'uppercase' }}>{f.l}</div>
              <div style={{ fontFamily: NFTUF.sans, fontSize: 15, color: NFTUF.encre, marginTop: 2 }}>{f.v}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 22 }}>
          <NEyebrow>Paiement</NEyebrow>
          <div style={{ marginTop: 10, padding: 16, background: '#fff', borderRadius: 6, boxShadow: `inset 0 0 0 1px ${NFTUF.ligne}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 36, height: 24, background: '#1a1f71', borderRadius: 3, color: '#fff', fontSize: 9, fontWeight: 700, display: 'grid', placeItems: 'center', fontFamily: NFTUF.sans }}>VISA</div>
                <span style={{ ...sB.body, color: NFTUF.encre }}>•••• 4242</span>
              </div>
              <span style={{ ...sB.small }}>Stripe</span>
            </div>
          </div>
          <p style={{ ...sB.small, marginTop: 8 }}>Paiement chiffré, conforme PCI-DSS · aucune donnée stockée chez nous.</p>
        </div>
      </div>

      <div style={{ position: 'sticky', bottom: 0, padding: '14px 18px 20px', background: NFTUF.cremeClair, borderTop: `1px solid ${NFTUF.ligne}`, display: 'flex', gap: 12, alignItems: 'center' }}>
        <div>
          <div style={sB.mono}>Total</div>
          <div style={{ ...sB.prix, fontSize: 20 }}>31,50 €</div>
        </div>
        <NBtn variant="dark" full>Payer 31,50 € →</NBtn>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 10 — CONFIRMATION
// ─────────────────────────────────────────────────────────────
function ConfirmationScreen() {
  return (
    <div style={{ background: NFTUF.vertProf, minHeight: '100%', color: NFTUF.cremeClair, position: 'relative', overflow: 'hidden' }}>
      <NTopbar title="Confirmation" dark />
      {/* sceau XL en filigrane */}
      <div style={{ position: 'absolute', top: 80, right: -60, opacity: 0.07 }}>
        <NFTUFLogo size={340} color={NFTUF.vertProf} light={NFTUF.cremeClair} />
      </div>

      <div style={{ position: 'relative', padding: '40px 26px 0' }}>
        <div style={{ width: 64, height: 64, borderRadius: 999, background: NFTUF.cremeClair, display: 'grid', placeItems: 'center' }}>
          <svg width="32" height="32" viewBox="0 0 32 32"><path d="M7 17l6 6L25 9" stroke={NFTUF.vert} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div style={{ ...sB.mono, marginTop: 28, color: '#a8c4b0' }}>COMMANDE #2841 · CONFIRMÉE</div>
        <h1 style={{ ...sB.h1, color: NFTUF.cremeClair, margin: '12px 0 10px' }}>
          Merci Camille,<br/>
          <em style={{ fontStyle: 'italic', color: '#9fd1b3', fontWeight: 400 }}>à samedi.</em>
        </h1>
        <p style={{ ...sB.body, color: '#d5e3d9', margin: 0, fontSize: 15 }}>
          Votre commande sera prête au local de Massy samedi 23 novembre entre 9h et 12h.
        </p>

        {/* récap card kraft */}
        <div style={{ marginTop: 26, background: NFTUF.cremeClair, color: NFTUF.encre, borderRadius: 6, padding: 18, position: 'relative' }}>
          {/* perforation */}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 64, height: 1, background: `repeating-linear-gradient(90deg, ${NFTUF.ligne} 0 5px, transparent 5px 10px)` }}/>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={sB.mono}>RETRAIT</div>
              <div style={{ ...sB.h3, marginTop: 4 }}>Local de Massy</div>
              <div style={sB.small}>14 rue de l'Atelier, 91300</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={sB.mono}>SAMEDI</div>
              <div style={{ fontFamily: NFTUF.serif, fontSize: 32, color: NFTUF.vert, fontWeight: 500, lineHeight: 1 }}>23</div>
              <div style={sB.mono}>NOV · 9H–12H</div>
            </div>
          </div>

          <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${NFTUF.ligne}` }}>
            {[
              ['Comté 24 mois · ×2', '17,80 €'],
              ['Camembert fermier · ×1', '6,50 €'],
              ['Bleu d\'Auvergne · ×1', '7,20 €'],
            ].map(([n, p], i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', ...sB.body, fontSize: 13, marginTop: i ? 6 : 0 }}>
                <span>{n}</span><span style={{ color: NFTUF.encre }}>{p}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 22, paddingTop: 6 }}>
            <span style={{ ...sB.h3 }}>Payé</span>
            <span style={{ ...sB.prix, fontSize: 22 }}>31,50 €</span>
          </div>
        </div>

        <p style={{ ...sB.body, color: '#d5e3d9', marginTop: 22, fontSize: 13 }}>
          Un récapitulatif vous a été envoyé par e-mail. Présentez-le au local — ou donnez simplement votre nom.
        </p>

        <div style={{ marginTop: 26, display: 'grid', gap: 10 }}>
          <NBtn variant="cream" full>Ajouter au calendrier</NBtn>
          <NBtn variant="ghost" full style={{ color: NFTUF.cremeClair, boxShadow: `inset 0 0 0 1.5px ${NFTUF.cremeClair}` }}>Retour à l'accueil</NBtn>
        </div>

        <div style={{ height: 30 }}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 11 — FLUX INSTAGRAM
// ─────────────────────────────────────────────────────────────
function InstaScreen() {
  return (
    <div style={{ background: NFTUF.cremeClair, minHeight: '100%', paddingBottom: 78 }}>
      <NTopbar title="Actu" />
      <div style={{ ...sB.pad, paddingTop: 18 }}>
        <NEyebrow>@nenfaispas.fromage</NEyebrow>
        <h2 style={{ ...sB.h1, fontSize: 30, margin: '10px 0 6px' }}>Côté <em style={{ color: NFTUF.vert, fontStyle: 'italic', fontWeight: 400 }}>coulisses</em></h2>
        <p style={{ ...sB.body, margin: 0, fontSize: 13 }}>Les dernières publications, depuis Instagram.</p>
      </div>

      {/* post featured */}
      <div style={{ padding: '20px 18px 0' }}>
        <div style={{ background: '#fff', borderRadius: 6, overflow: 'hidden', boxShadow: `inset 0 0 0 1px ${NFTUF.ligne}` }}>
          <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 999, background: NFTUF.vert, color: NFTUF.cremeClair, display: 'grid', placeItems: 'center', fontFamily: NFTUF.serif, fontWeight: 600, fontSize: 14 }}>N</div>
            <div>
              <div style={{ fontFamily: NFTUF.sans, fontSize: 13, fontWeight: 600, color: NFTUF.encre }}>nenfaispas.fromage</div>
              <div style={{ ...sB.small, fontSize: 10.5 }}>il y a 4h · Massy</div>
            </div>
          </div>
          <PhotoSlot label="arrivage-jura.jpg" h={300} r={0} tone="kraft" />
          <div style={{ padding: 14 }}>
            <div style={{ display: 'flex', gap: 16, color: NFTUF.encre, marginBottom: 8 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={NFTUF.encre} strokeWidth="1.6"><path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/></svg>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={NFTUF.encre} strokeWidth="1.6"><path d="M21 12a8 8 0 0 1-11.5 7L4 21l1.7-5A8 8 0 1 1 21 12z"/></svg>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={NFTUF.encre} strokeWidth="1.6"><path d="M4 12L20 4l-3 16-5-7-8-1z"/></svg>
            </div>
            <div style={{ ...sB.body, fontSize: 13 }}>
              <b style={{ color: NFTUF.encre }}>142 j'aime</b>
            </div>
            <p style={{ ...sB.body, fontSize: 13, marginTop: 6 }}>
              <b style={{ color: NFTUF.encre }}>nenfaispas.fromage</b> Nouvel arrivage de Comté 36 mois — ferme du Vallon. Dispo dès demain à Versailles 🧀
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 18px 0' }}>
        <NEyebrow>Plus de publications</NEyebrow>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4, padding: '12px 18px 0' }}>
        {['meule.jpg','marché-aube.jpg','découpe.jpg','client.jpg','panier.jpg','degustation.jpg','chevre.jpg','bleu.jpg','camion.jpg'].map((l, i) => (
          <PhotoSlot key={i} label={l} h={108} r={2} tone={['kraft','creme','vert'][i%3]} />
        ))}
      </div>
      <NTabBar active="insta" />
    </div>
  );
}

Object.assign(window, { ProduitScreen, PanierScreen, CheckoutRetraitScreen, CheckoutPaiementScreen, ConfirmationScreen, InstaScreen });
