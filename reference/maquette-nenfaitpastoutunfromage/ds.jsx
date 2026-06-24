// Design System — N'en fais pas tout un fromage
// Tokens, Logo, helpers shared by all screens.

const NFTUF = {
  // Couleurs
  vert:        '#1d5b3a',   // vert sapin du logo — principal
  vertProf:    '#143f2a',   // vert profond — fonds sombres
  vertLight:   '#2a7a4e',   // vert clair — hover / lien actif
  vertSauge:   '#9fd1b3',   // vert sauge — accents sur fonds sombres
  vertEau:     '#cfe4d5',   // vert pâle — italiques sur photo, texte secondaire sombre
  creme:       '#f4ecd8',   // papier crème — fond principal
  cremeClair:  '#faf6ea',   // crème clair — cartes, surfaces hautes
  off:         '#fffdf7',   // off-white — fond éditorial
  encre:       '#1a1a17',   // encre — texte principal
  texte:       '#3a3a32',   // texte corps
  mute:        '#7a7468',   // texte secondaire / labels
  ligne:       '#e6dec6',   // séparateurs sur crème
  ligneSombre: '#2a5a3e',   // séparateurs sur vert profond
  kraft:       '#c9b896',   // kraft — placeholders photo
  rouge:       '#9a3b2e',   // accent rouge — rupture / badge promo

  // Typographie
  serif:   '"Fraunces", "Cormorant Garamond", "Times New Roman", serif',
  sans:    '"Inter", -apple-system, system-ui, sans-serif',
  mono:    '"JetBrains Mono", ui-monospace, "SF Mono", monospace',
};

// ─────────────────────────────────────────────────────────────
// Logo — recréation SVG du sceau circulaire du client (placeholder
// propre, à remplacer par le PNG officiel)
// ─────────────────────────────────────────────────────────────
function NFTUFLogo({ size = 96, color = NFTUF.vert, light = NFTUF.cremeClair, mono = false }) {
  const fg = mono ? light : light;
  const bg = mono ? color : color;
  const r = 100;
  // Texte sur arc — deux arcs (haut N'EN FAIS PAS / bas TOUT UN FROMAGE)
  const arcTop = 'M 18 100 A 82 82 0 0 1 182 100';
  const arcBot = 'M 18 100 A 82 82 0 0 0 182 100';
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ display: 'block' }}>
      <circle cx="100" cy="100" r={r} fill={bg} />
      <circle cx="100" cy="100" r={r - 4} fill="none" stroke={fg} strokeOpacity="0.0" strokeWidth="0.5" />
      <defs>
        <path id="arcT" d={arcTop} />
        <path id="arcB" d={arcBot} />
      </defs>
      <text fill={fg} style={{ fontFamily: NFTUF.serif, fontWeight: 600, fontSize: 16, letterSpacing: 3 }}>
        <textPath href="#arcT" startOffset="50%" textAnchor="middle">N'EN FAIS PAS</textPath>
      </text>
      <text fill={fg} style={{ fontFamily: NFTUF.serif, fontWeight: 600, fontSize: 16, letterSpacing: 2.4 }}>
        <textPath href="#arcB" startOffset="50%" textAnchor="middle">TOUT UN FROMAGE</textPath>
      </text>
      {/* Petits séparateurs */}
      <circle cx="22" cy="100" r="1.6" fill={fg} />
      <circle cx="178" cy="100" r="1.6" fill={fg} />
      {/* Mention FROMAGERIE */}
      <text x="100" y="78" fill={fg} textAnchor="middle"
        style={{ fontFamily: NFTUF.serif, fontWeight: 500, fontSize: 8.5, letterSpacing: 1.6 }}>
        FROMAGERIE
      </text>
      {/* Icône fromage stylisée — formes simples, pas de dessin complexe */}
      <g transform="translate(100 110)">
        {/* part de brie / camembert vue de dessus */}
        <path d="M -22 6 L 22 6 L 14 -16 Z" fill="none" stroke={fg} strokeWidth="2" strokeLinejoin="round" />
        <path d="M -22 6 L 22 6 L 22 12 L -22 12 Z" fill={fg} opacity="0.85" />
        {/* meule à côté */}
        <ellipse cx="-2" cy="0" rx="9" ry="3.5" fill="none" stroke={fg} strokeWidth="1.5" />
      </g>
      <text x="100" y="142" fill={fg} textAnchor="middle"
        style={{ fontFamily: NFTUF.serif, fontWeight: 500, fontSize: 8.5, letterSpacing: 1.6 }}>
        CRÈMERIE
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// PhotoSlot — placeholder image rayé avec label mono
// ─────────────────────────────────────────────────────────────
function PhotoSlot({ label = 'photo', h = 200, w = '100%', r = 0, tone = 'kraft', children }) {
  const palette = {
    kraft:   { a: '#c9b896', b: '#b8a47e', c: '#5b4a2a' },
    vert:    { a: '#2a7a4e', b: '#1d5b3a', c: '#0f3520' },
    creme:   { a: '#e6dec6', b: '#d9cfb0', c: '#7a6b3e' },
    sombre:  { a: '#2a2a25', b: '#1a1a17', c: '#c9b896' },
  }[tone];
  return (
    <div style={{
      width: w, height: h, borderRadius: r,
      background: `repeating-linear-gradient(45deg, ${palette.a} 0 14px, ${palette.b} 14px 28px)`,
      color: palette.c, position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: NFTUF.mono, fontSize: 11, letterSpacing: 1, textTransform: 'lowercase',
    }}>
      <span style={{
        background: palette.a, padding: '4px 10px', borderRadius: 2,
        boxShadow: `inset 0 0 0 1px ${palette.c}33`,
      }}>{label}</span>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Bouton primaire / secondaire
// ─────────────────────────────────────────────────────────────
function NBtn({ children, variant = 'primary', full = false, sm = false, icon, ...rest }) {
  const base = {
    fontFamily: NFTUF.sans, fontWeight: 600, fontSize: sm ? 13 : 15,
    padding: sm ? '10px 16px' : '14px 22px', borderRadius: 999,
    border: 'none', cursor: 'pointer', letterSpacing: 0.2,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    width: full ? '100%' : undefined,
  };
  const variants = {
    primary:   { background: NFTUF.vert, color: NFTUF.cremeClair },
    dark:      { background: NFTUF.encre, color: NFTUF.cremeClair },
    ghost:     { background: 'transparent', color: NFTUF.vert, boxShadow: `inset 0 0 0 1.5px ${NFTUF.vert}` },
    cream:     { background: NFTUF.cremeClair, color: NFTUF.vertProf, boxShadow: `inset 0 0 0 1px ${NFTUF.ligne}` },
  };
  return <button style={{ ...base, ...variants[variant] }} {...rest}>{children}{icon}</button>;
}

// ─────────────────────────────────────────────────────────────
// Chip / Tag
// ─────────────────────────────────────────────────────────────
function NChip({ children, tone = 'cream', sm = false }) {
  const tones = {
    cream: { bg: NFTUF.cremeClair, fg: NFTUF.vertProf, bd: NFTUF.ligne },
    vert:  { bg: NFTUF.vert,        fg: NFTUF.cremeClair, bd: NFTUF.vert },
    dark:  { bg: NFTUF.encre,       fg: NFTUF.cremeClair, bd: NFTUF.encre },
    open:  { bg: '#e8f0e6',         fg: '#0f3520',        bd: '#c8d6c2' },
    rouge: { bg: '#f3d9d2',         fg: NFTUF.rouge,      bd: '#e6b8ac' },
  }[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: tones.bg, color: tones.fg,
      padding: sm ? '3px 8px' : '5px 11px',
      borderRadius: 999, fontFamily: NFTUF.sans, fontWeight: 500,
      fontSize: sm ? 11 : 12, letterSpacing: 0.3,
      boxShadow: `inset 0 0 0 1px ${tones.bd}`,
    }}>{children}</span>
  );
}

// ─────────────────────────────────────────────────────────────
// Topbar — barre de nav mobile commune
// ─────────────────────────────────────────────────────────────
function NTopbar({ title, dark = false, back = false, action }) {
  const bg = dark ? NFTUF.vertProf : NFTUF.cremeClair;
  const fg = dark ? NFTUF.cremeClair : NFTUF.encre;
  return (
    <div style={{
      height: 52, paddingTop: 8,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '8px 16px 0', background: bg, color: fg,
      borderBottom: `1px solid ${dark ? '#0f3520' : NFTUF.ligne}`,
    }}>
      <div style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        {back ? (
          <svg width="22" height="22" viewBox="0 0 22 22"><path d="M14 4l-7 7 7 7" fill="none" stroke={fg} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        ) : (
          <svg width="22" height="14" viewBox="0 0 22 14"><path d="M1 1h20M1 7h20M1 13h20" stroke={fg} strokeWidth="1.6" strokeLinecap="round"/></svg>
        )}
      </div>
      <div style={{
        fontFamily: NFTUF.serif, fontSize: 15, fontWeight: 600, letterSpacing: 0.4,
        textTransform: 'uppercase', color: fg,
      }}>{title}</div>
      <div style={{ width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        {action || (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke={fg} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 7h14l-1.3 9a1.6 1.6 0 0 1-1.6 1.4H7.9a1.6 1.6 0 0 1-1.6-1.4L5 7zm3 0a3 3 0 0 1 6 0"/>
          </svg>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Bottom tab bar (5 onglets : Accueil / Marchés / Boutique / Insta / Compte)
// ─────────────────────────────────────────────────────────────
function NTabBar({ active = 'home', dark = false }) {
  const bg = dark ? NFTUF.vertProf : NFTUF.cremeClair;
  const fg = dark ? NFTUF.cremeClair : NFTUF.encre;
  const muted = dark ? '#8aa893' : NFTUF.mute;
  const tabs = [
    { id: 'home',    label: 'Accueil',   icon: <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" /> },
    { id: 'marches', label: 'Marchés',   icon: <><path d="M12 2c4 0 7 3 7 7 0 5-7 13-7 13S5 14 5 9c0-4 3-7 7-7z"/><circle cx="12" cy="9" r="2.5" fill={bg}/></> },
    { id: 'shop',    label: 'Boutique',  icon: <path d="M4 7h16l-1.5 12.5a1.5 1.5 0 0 1-1.5 1.3H7a1.5 1.5 0 0 1-1.5-1.3L4 7zm4 0V5a4 4 0 0 1 8 0v2"/> },
    { id: 'insta',   label: 'Actu',      icon: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4" fill={bg}/><circle cx="17" cy="7" r="1" fill={bg}/></> },
    { id: 'cart',    label: 'Panier',    icon: <path d="M5 7h14l-1.5 9.5a2 2 0 0 1-2 1.7h-7a2 2 0 0 1-2-1.7L5 7zm3 0a4 4 0 0 1 8 0M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/> },
  ];
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(5,1fr)',
      background: bg, borderTop: `1px solid ${dark ? '#0f3520' : NFTUF.ligne}`,
      padding: '8px 4px 18px',
    }}>
      {tabs.map(t => {
        const on = t.id === active;
        return (
          <div key={t.id} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            color: on ? (dark ? NFTUF.cremeClair : NFTUF.vert) : muted,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="1.6"
              strokeLinecap="round" strokeLinejoin="round">{t.icon}</svg>
            <span style={{ fontFamily: NFTUF.sans, fontWeight: on ? 600 : 500, fontSize: 10, letterSpacing: 0.3 }}>{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Petite étiquette mono (rappel artisan / kraft)
// ─────────────────────────────────────────────────────────────
function NEyebrow({ children, color = NFTUF.vert }) {
  return (
    <div style={{
      fontFamily: NFTUF.mono, fontSize: 11, letterSpacing: 2,
      textTransform: 'uppercase', color, opacity: 0.85,
      display: 'inline-flex', alignItems: 'center', gap: 8,
    }}>
      <span style={{ width: 18, height: 1, background: color, opacity: 0.4 }} />
      {children}
    </div>
  );
}

Object.assign(window, { NFTUF, NFTUFLogo, PhotoSlot, NBtn, NChip, NTopbar, NTabBar, NEyebrow });
