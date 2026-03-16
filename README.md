# Appstract – Shared Shopping Experience

**Live demo:** [appstract.vercel.app](https://appstract.vercel.app)

Appstract er en landingpage for et fiktivt SaaS-produkt, der tilbyder en co-shopping-oplevelse, som kan integreres direkte i eksisterende webshops. Idéen bag produktet er, at brugere kan shoppe sammen i realtid – dele kurve, chatte og få fælles anbefalinger.

Projektet er udviklet som del af 4. semester på KEA (Københavns Erhvervsakademi) og fungerer som en moderne, animeret one-page marketingside, der demonstrerer produktets koncept og værdi.

---

## Teknologier

| Teknologi                 | Version | Formål                                                                                           |
| ------------------------- | ------- | ------------------------------------------------------------------------------------------------ |
| **Next.js**               | 16.1.6  | React-framework med App Router, server components og optimeret billedhåndtering via `next/image` |
| **React**                 | 19.2.3  | UI-bibliotek – bruger hooks og funktionelle komponenter gennemgående                             |
| **TypeScript**            | 5.9.3   | Statisk typning i hele projektet for bedre DX og færre fejl                                      |
| **Tailwind CSS**          | 4       | Utility-first CSS-framework til styling – konfigureret via PostCSS                               |
| **Framer Motion**         | 12.34.2 | Animationsbibliotek til scroll-baserede og interaktive animationer                               |
| **Lenis**                 | 1.3.17  | Smooth scroll-bibliotek for en poleret scrolloplevelse                                           |
| **Lucide React**          | 0.575.0 | Ikonbibliotek – bruges til UI-ikoner i hele applikationen                                        |
| **Vercel Analytics**      | 1.6.1   | Brugeranalyse og performance tracking                                                            |
| **Vercel Speed Insights** | 1.3.1   | Core Web Vitals-monitorering                                                                     |
| **ESLint**                | 9       | Linting med `eslint-config-next` (Core Web Vitals + TypeScript-regler)                           |

---

## Projektstruktur

```
appstract/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout med font, metadata, SEO og cookie consent
│   ├── page.tsx                # Hoved-page – samler alle sektioner
│   └── globals.css             # Design tokens, Tailwind-konfiguration og base styles
│
├── components/
│   ├── SmoothScroll.tsx        # Lenis smooth scroll-wrapper med progress bar
│   ├── layout/                 # Layout-komponenter
│   │   ├── Navbar.tsx          # Responsiv navbar med auto-hide ved scroll
│   │   └── MobileMenu.tsx      # Fullscreen mobilmenu med animationer
│   ├── sections/               # Sektioner på landingpagen
│   │   ├── Hero.tsx            # Hero-sektion med tab-rotation og swipe-gestures
│   │   ├── Results.tsx         # Resultater-sektion med parallax-billede og KPI-modal
│   │   ├── Concept.tsx         # Koncept-sektion med telefon-mockups og gradient-baggrund
│   │   ├── Feature.tsx         # Feature-sektion med spotlight-kort og chat-illustration
│   │   ├── Cases.tsx           # Cases-sektion med interaktiv ekspanderbar liste
│   │   ├── Contact.tsx         # Kontakt-CTA med 3D flydende billeder og parallax
│   │   ├── Footer.tsx          # Footer
│   │   ├── case-components/    # Subkomponenter til Cases
│   │   └── contact-components/ # Subkomponenter til Contact (modal, form, bekræftelse)
│   └── ui/                     # Genbrugelige UI-komponenter
│       ├── Button.tsx          # Primær knap-komponent
│       ├── ConicButton.tsx     # Knap med animeret conic gradient-border
│       ├── SpotlightCard.tsx   # Kort med mouse-tracking spotlight-effekt
│       ├── RotatingCardStack.tsx # 3D-roterende kortstack med perspektiv
│       ├── LiquidBackground.tsx # WebGL shader-baseret flydende baggrund
│       ├── Modal.tsx           # Genbrugelig modal med backdrop og scroll-lock
│       ├── CookieConsent.tsx   # GDPR cookie consent-banner med detaljeret styring
│       ├── Tag.tsx             # Tagline-badge komponent
│       ├── Logo.tsx            # Logo-komponent
│       ├── BurgerButton.tsx    # Animeret burgermenu-knap
│       └── DesktopNavLinks.tsx # Navigationlinks til desktop
│
├── data/                       # JSON-filer med alt tekstindhold (content-layer)
│   ├── hero.json
│   ├── results.json
│   ├── resultskpi.json
│   ├── concept.json
│   ├── feature.json
│   ├── cases.json
│   ├── casescomponent.json
│   ├── contact.json
│   ├── cookies.json
│   ├── footer.json
│   └── navbar.json
│
├── lib/                        # Hjælpefunktioner og hooks
│   ├── animations.ts           # Fælles Framer Motion-varianter (fadeInUp, stagger, etc.)
│   └── hooks/
│       ├── useBodyScrollLock.ts # Custom hook til scroll-lock ved modaler/mobilmenu
│       └── useIsMobile.ts      # Custom hook til mobil-detektion
│
└── public/
    ├── fonts/                  # Lokale skriftfiler (Bw Gradual DEMO)
    └── images/                 # Billeder sorteret i undermapper
        ├── 3d/                 # 3D-illustrationer til kontakt-sektionen
        ├── cases/              # Case-billeder
        ├── concept/            # Telefon-mockups
        ├── hero/               # Hero-billeder
        ├── logo/               # Logo-filer
        └── results/            # Resultater-billeder
```

---

## Arkitektur og designbeslutninger

### Content-layer med JSON

Alt tekstindhold er adskilt fra komponenterne og ligger i `data/`-mappen som JSON-filer. Det gør det nemt at opdatere tekst uden at røre komponentlogikken, og det holder komponenterne rene og fokuserede på visuel præsentation.

### Design tokens og fluid typografi

I `globals.css` er der defineret et komplet design token-system med CSS custom properties. Alle font-størrelser, spacings og border-radii bruger `clamp()` til fluid skalering, så siden tilpasser sig glidende mellem mobile og desktop-viewports uden traditionelle breakpoints i mange tilfælde.

### Animationer

Framer Motion bruges gennemgående til scroll-triggered animationer via `whileInView`, parallax-effekter med `useScroll` og `useTransform`, samt staggered reveal-animationer. Fælles animation-varianter er centraliseret i `lib/animations.ts` for konsistens.

### Smooth scroll

Lenis håndterer smooth scrolling og er integreret i en `SmoothScroll`-wrapper. Den kommunikerer med modaler og mobilmenuen via custom DOM-events (`modalOpen`, `modalClose`, `mobileMenuOpen`, `mobileMenuClose`), så scroll pauses korrekt, når modaler er åbne.

### WebGL-baggrund

`LiquidBackground`-komponenten renderer en animated shader-baggrund via WebGL2. Den bruger custom GLSL fragment shaders til at skabe en flydende, organisk visuel effekt bag Hero- og kontaktsektionen.

### SEO og metadata

Root layout eksporterer udførlig metadata inklusiv Open Graph-tags, Twitter Card, robots-konfiguration, favicon og Apple Web App-indstillinger. Theme color er sat til `#6D5EFC` (Appstracts lilla).

### Font

Projektet bruger skrifttypen **Bw Gradual DEMO**, som er indlæst lokalt via `next/font/local` i flere vægte (Light, Regular, Medium, Bold, ExtraBold) med `font-display: swap` for optimal loading.

### Cookie consent

Der er implementeret en GDPR-kompatibel cookie consent-komponent med fire kategorier (nødvendige, funktionelle, analytics, marketing) og versioneret samtykke, der gemmes i `localStorage`.

---

## Kom i gang

### Forudsætninger

- **Node.js** 18+
- **npm** (medfølger Node.js)

### Installation

```bash
# Klon repositoriet
git clone https://github.com/buchhavee/appstract.git
cd appstract

# Installer dependencies
npm install
```

### Udvikling

```bash
# Start udviklingsserveren
npm run dev
```

Åbn [http://localhost:3000](http://localhost:3000) i browseren.

### Build og produktion

```bash
# Byg til produktion
npm run build

# Start produktionsserver
npm start
```

### Linting

```bash
npm run lint
```

---

## Deployment

Projektet er deployet på **Vercel** og tilgængeligt på [appstract.vercel.app](https://appstract.vercel.app). Vercel Analytics og Speed Insights er integreret for at monitorere performance og brugeradfærd.

---

## Bemærkninger

- Projektet er en **one-page applikation** uden routing – alt indhold renderes på én side
- Alle komponenter er markeret med `"use client"`, da de bruger interaktivitet, animationer eller hooks
- Skrifttypen Bw Gradual er en **demo-version** og er kun til brug i dette uddannelsesprojekt
- Path aliases er konfigureret med `@/*` som peger på roden af projektet, hvilket giver rene imports
