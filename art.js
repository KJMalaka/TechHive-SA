/* =========================================================
 * TechHive SA — inline SVG product illustrations
 * Each function returns an SVG string for a given device type
 * and brand color palette. Uses currentColor for theme-awareness.
 * ========================================================= */

// Brand color palettes — subtle accents so the art feels brand-coded
const BRAND_COLORS = {
  Apple:   { primary: '#8e8e93', accent: '#007aff', screen: '#1c1c1e' },
  Samsung: { primary: '#1428a0', accent: '#1428a0', screen: '#0a0a0f' },
  Dell:    { primary: '#007db8', accent: '#007db8', screen: '#0a0a0f' },
  HP:      { primary: '#0096d6', accent: '#0096d6', screen: '#0a0a0f' },
  ASUS:    { primary: '#00539b', accent: '#ef4023', screen: '#0a0a0f' },
  Lenovo:  { primary: '#e2231a', accent: '#e2231a', screen: '#0a0a0f' }
};

function brandColors(brand) {
  return BRAND_COLORS[brand] || { primary: '#64748b', accent: '#2563eb', screen: '#1c1c1e' };
}

/* ---------- PHONE (iPhone / Galaxy / etc.) ---------- */
function svgPhone(brand, productName = '') {
  const c = brandColors(brand);
  const isApple = brand === 'Apple';
  // Notch / island for Apple, hole-punch for others
  const topFeature = isApple
    ? `<rect x="88" y="28" width="44" height="12" rx="6" fill="#000"/>`
    : `<circle cx="110" cy="32" r="4" fill="#000"/>`;

  return `
<svg viewBox="0 0 220 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${productName}">
  <defs>
    <linearGradient id="phone-body-${brand}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c.primary}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="${c.primary}" stop-opacity="0.6"/>
    </linearGradient>
    <linearGradient id="phone-screen-${brand}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${c.accent}" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="${c.screen}"/>
    </linearGradient>
  </defs>
  <!-- phone body -->
  <rect x="40" y="20" width="140" height="280" rx="22" fill="url(#phone-body-${brand})" stroke="#2a2a2a" stroke-width="2"/>
  <!-- screen -->
  <rect x="52" y="32" width="116" height="256" rx="14" fill="url(#phone-screen-${brand})"/>
  <!-- camera island / notch -->
  ${topFeature}
  <!-- home indicator -->
  <rect x="90" y="278" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.4)"/>
  <!-- camera bump on back (subtle hint) -->
  <rect x="150" y="40" width="22" height="30" rx="6" fill="rgba(0,0,0,0.25)"/>
  <circle cx="161" cy="50" r="4" fill="#1a1a1a"/>
  <circle cx="161" cy="62" r="4" fill="#1a1a1a"/>
  <!-- side buttons -->
  <rect x="38" y="80" width="3" height="20" rx="1" fill="#1a1a1a"/>
  <rect x="38" y="108" width="3" height="36" rx="1" fill="#1a1a1a"/>
  <rect x="179" y="94" width="3" height="44" rx="1" fill="#1a1a1a"/>
</svg>`.trim();
}

/* ---------- LAPTOP (MacBook / Dell / ThinkPad / ZenBook) ---------- */
function svgLaptop(brand, productName = '') {
  const c = brandColors(brand);
  // Logo hint on lid
  const logo = brand === 'Apple'
    ? `<circle cx="160" cy="90" r="7" fill="rgba(255,255,255,0.6)"/>`
    : `<rect x="152" y="84" width="16" height="12" rx="2" fill="rgba(255,255,255,0.4)"/>`;

  return `
<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${productName}">
  <defs>
    <linearGradient id="laptop-screen-${brand}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${c.accent}" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="${c.screen}"/>
    </linearGradient>
    <linearGradient id="laptop-lid-${brand}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c.primary}" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="${c.primary}" stop-opacity="0.55"/>
    </linearGradient>
    <linearGradient id="laptop-base-${brand}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${c.primary}" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="${c.primary}" stop-opacity="0.95"/>
    </linearGradient>
  </defs>
  <!-- screen back/lid -->
  <rect x="55" y="30" width="210" height="140" rx="6" fill="url(#laptop-lid-${brand})" stroke="#2a2a2a" stroke-width="1.5"/>
  <!-- screen bezel -->
  <rect x="62" y="36" width="196" height="128" rx="3" fill="#0a0a0f"/>
  <!-- screen content -->
  <rect x="66" y="40" width="188" height="120" rx="2" fill="url(#laptop-screen-${brand})"/>
  <!-- faint window UI -->
  <rect x="74" y="48" width="70" height="4" rx="1" fill="rgba(255,255,255,0.25)"/>
  <rect x="74" y="58" width="120" height="2" rx="1" fill="rgba(255,255,255,0.18)"/>
  <rect x="74" y="64" width="90" height="2" rx="1" fill="rgba(255,255,255,0.18)"/>
  <rect x="74" y="70" width="104" height="2" rx="1" fill="rgba(255,255,255,0.18)"/>
  <!-- camera notch -->
  <rect x="156" y="36" width="8" height="2" rx="1" fill="#333"/>
  <!-- base -->
  <path d="M 35 170 L 285 170 L 300 195 L 20 195 Z" fill="url(#laptop-base-${brand})" stroke="#2a2a2a" stroke-width="1.5"/>
  <!-- trackpad hint -->
  <rect x="130" y="178" width="60" height="8" rx="2" fill="rgba(0,0,0,0.15)"/>
  <!-- brand logo on lid (visible when closed, but we hint it) -->
  ${logo}
</svg>`.trim();
}

/* ---------- WATCH (Apple Watch, Galaxy Watch) ---------- */
function svgWatch(brand, productName = '') {
  const c = brandColors(brand);
  return `
<svg viewBox="0 0 220 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${productName}">
  <defs>
    <linearGradient id="watch-face-${brand}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${c.accent}" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="${c.screen}"/>
    </linearGradient>
    <linearGradient id="watch-band-${brand}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${c.primary}" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="${c.primary}" stop-opacity="0.45"/>
    </linearGradient>
  </defs>
  <!-- top band -->
  <path d="M 80 10 L 140 10 L 135 70 L 85 70 Z" fill="url(#watch-band-${brand})"/>
  <!-- bottom band -->
  <path d="M 85 190 L 135 190 L 140 250 L 80 250 Z" fill="url(#watch-band-${brand})"/>
  <!-- body -->
  <rect x="55" y="68" width="110" height="124" rx="28" fill="${c.primary}" stroke="#2a2a2a" stroke-width="2"/>
  <!-- face bezel -->
  <rect x="62" y="75" width="96" height="110" rx="22" fill="#0a0a0f"/>
  <!-- face content -->
  <rect x="68" y="81" width="84" height="98" rx="18" fill="url(#watch-face-${brand})"/>
  <!-- digital time -->
  <text x="110" y="125" text-anchor="middle" font-family="Inter, sans-serif" font-size="22" font-weight="700" fill="rgba(255,255,255,0.95)">10:42</text>
  <text x="110" y="148" text-anchor="middle" font-family="Inter, sans-serif" font-size="9" fill="rgba(255,255,255,0.75)">SUN 19 APR</text>
  <!-- tiny heart indicator -->
  <text x="110" y="168" text-anchor="middle" font-size="12">❤️</text>
  <!-- crown -->
  <rect x="165" y="105" width="8" height="18" rx="2" fill="#1a1a1a"/>
  <circle cx="169" cy="114" r="3" fill="${c.accent}"/>
</svg>`.trim();
}

/* ---------- EARBUDS (Galaxy Buds, AirPods-ish) ---------- */
function svgEarbuds(brand, productName = '') {
  const c = brandColors(brand);
  return `
<svg viewBox="0 0 280 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${productName}">
  <defs>
    <radialGradient id="bud-grad-${brand}" cx="0.5" cy="0.4" r="0.7">
      <stop offset="0%" stop-color="${c.primary}" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="${c.primary}" stop-opacity="0.55"/>
    </radialGradient>
    <linearGradient id="case-grad-${brand}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${c.primary}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${c.primary}" stop-opacity="0.65"/>
    </linearGradient>
  </defs>
  <!-- charging case -->
  <rect x="85" y="110" width="110" height="70" rx="30" fill="url(#case-grad-${brand})" stroke="#2a2a2a" stroke-width="1.5"/>
  <!-- case seam -->
  <line x1="95" y1="130" x2="185" y2="130" stroke="rgba(0,0,0,0.15)" stroke-width="1"/>
  <!-- charging LED -->
  <circle cx="140" cy="165" r="3" fill="${c.accent}"/>
  <!-- left earbud -->
  <ellipse cx="75" cy="70" rx="35" ry="40" fill="url(#bud-grad-${brand})" stroke="#2a2a2a" stroke-width="1.5"/>
  <circle cx="75" cy="55" r="10" fill="rgba(0,0,0,0.4)"/>
  <circle cx="75" cy="55" r="5" fill="#0a0a0f"/>
  <!-- left stem -->
  <rect x="70" y="95" width="10" height="30" rx="4" fill="url(#bud-grad-${brand})" stroke="#2a2a2a" stroke-width="1"/>
  <!-- right earbud -->
  <ellipse cx="205" cy="70" rx="35" ry="40" fill="url(#bud-grad-${brand})" stroke="#2a2a2a" stroke-width="1.5"/>
  <circle cx="205" cy="55" r="10" fill="rgba(0,0,0,0.4)"/>
  <circle cx="205" cy="55" r="5" fill="#0a0a0f"/>
  <!-- right stem -->
  <rect x="200" y="95" width="10" height="30" rx="4" fill="url(#bud-grad-${brand})" stroke="#2a2a2a" stroke-width="1"/>
</svg>`.trim();
}

/* ---------- GAMING (RGB keyboard/desktop) ---------- */
function svgGaming(brand, productName = '') {
  const c = brandColors(brand);
  return `
<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${productName}">
  <defs>
    <linearGradient id="gaming-screen-${brand}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c.accent}" stop-opacity="0.85"/>
      <stop offset="50%" stop-color="#a855f7" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="${c.screen}"/>
    </linearGradient>
    <linearGradient id="gaming-body-${brand}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${c.primary}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="${c.primary}" stop-opacity="0.55"/>
    </linearGradient>
    <linearGradient id="rgb-${brand}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ef4444"/>
      <stop offset="33%" stop-color="#f59e0b"/>
      <stop offset="66%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
  </defs>
  <!-- screen back/lid -->
  <rect x="55" y="25" width="210" height="140" rx="6" fill="url(#gaming-body-${brand})" stroke="#2a2a2a" stroke-width="1.5"/>
  <!-- screen bezel -->
  <rect x="62" y="31" width="196" height="128" rx="3" fill="#0a0a0f"/>
  <!-- screen content with gaming gradient -->
  <rect x="66" y="35" width="188" height="120" rx="2" fill="url(#gaming-screen-${brand})"/>
  <!-- fake game HUD -->
  <rect x="74" y="43" width="40" height="4" rx="1" fill="rgba(255,255,255,0.7)"/>
  <rect x="74" y="51" width="28" height="3" rx="1" fill="rgba(239,68,68,0.8)"/>
  <rect x="220" y="43" width="30" height="4" rx="1" fill="rgba(255,255,255,0.6)"/>
  <!-- crosshair -->
  <circle cx="160" cy="95" r="8" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="1.5"/>
  <line x1="160" y1="87" x2="160" y2="83" stroke="rgba(255,255,255,0.55)" stroke-width="1.5"/>
  <line x1="160" y1="103" x2="160" y2="107" stroke="rgba(255,255,255,0.55)" stroke-width="1.5"/>
  <line x1="152" y1="95" x2="148" y2="95" stroke="rgba(255,255,255,0.55)" stroke-width="1.5"/>
  <line x1="168" y1="95" x2="172" y2="95" stroke="rgba(255,255,255,0.55)" stroke-width="1.5"/>
  <!-- base -->
  <path d="M 35 165 L 285 165 L 300 190 L 20 190 Z" fill="url(#gaming-body-${brand})" stroke="#2a2a2a" stroke-width="1.5"/>
  <!-- RGB strip on keyboard -->
  <rect x="80" y="173" width="160" height="3" rx="1" fill="url(#rgb-${brand})" opacity="0.9"/>
  <!-- keyboard rows -->
  <rect x="100" y="180" width="120" height="4" rx="1" fill="rgba(0,0,0,0.25)"/>
  <!-- ROG / gaming logo hint -->
  <polygon points="160,43 167,50 160,57 153,50" fill="rgba(255,255,255,0.35)"/>
</svg>`.trim();
}

/* ---------- Dispatcher: choose SVG based on product category ---------- */
function getProductSVG(product) {
  const type = (product.type || '').toLowerCase();
  const name = (product.name || '').toLowerCase();
  const brand = product.brand || '';

  // Prefer explicit mapping from product.artType if set
  if (product.artType) {
    switch (product.artType) {
      case 'phone': return svgPhone(brand, product.name);
      case 'laptop': return svgLaptop(brand, product.name);
      case 'watch': return svgWatch(brand, product.name);
      case 'earbuds': return svgEarbuds(brand, product.name);
      case 'gaming': return svgGaming(brand, product.name);
    }
  }

  // Fallback: infer from name + type
  if (/phone|galaxy s|iphone/.test(name)) return svgPhone(brand, product.name);
  if (/watch/.test(name)) return svgWatch(brand, product.name);
  if (/buds|earbud|airpod/.test(name)) return svgEarbuds(brand, product.name);
  if (type === 'gaming' || /gaming|rog|zephyrus|pavilion/.test(name)) return svgGaming(brand, product.name);
  return svgLaptop(brand, product.name);
}