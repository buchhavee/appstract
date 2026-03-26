# Appstract – Shared Shopping Experience

**Live demo:** [appstract.vercel.app](https://appstract.vercel.app)

Appstract er en marketing-landingpage for et shared shopping/co-shopping-produkt, der kan integreres direkte i eksisterende webshops. Siden er bygget som en moderne, animeret Next.js-applikation med fokus på nem indholdsstyring via JSON-filer.

---

## Teknologier

| Teknologi                 | Version | Formål                                                                                           |
| ------------------------- | ------- | ------------------------------------------------------------------------------------------------ |
| **Next.js**               | 15      | React-framework med App Router, server components og optimeret billedhåndtering via `next/image` |
| **React**                 | 19      | UI-bibliotek – bruger hooks og funktionelle komponenter gennemgående                             |
| **TypeScript**            | 5       | Statisk typning i hele projektet for bedre DX og færre fejl                                      |
| **Tailwind CSS**          | 4       | Utility-first CSS-framework til styling – konfigureret via PostCSS                               |
| **Framer Motion**         | 12      | Animationsbibliotek til scroll-baserede og interaktive animationer                               |
| **Three.js**              | 0.183   | 3D-grafik bibliotek til WebGL-rendering                                                          |
| **@react-three/fiber**    | 9       | React-renderer til Three.js – bruges til 3D-komponenter                                          |
| **Lenis**                 | 1       | Smooth scroll-bibliotek for en poleret scrolloplevelse                                           |
| **Lucide React**          | 0.575   | Ikonbibliotek – bruges til UI-ikoner i hele applikationen                                        |
| **Vercel Analytics**      | –       | Brugeranalyse og performance tracking                                                            |
| **Vercel Speed Insights** | –       | Core Web Vitals-monitorering                                                                     |
| **ESLint**                | 9       | Linting med `eslint-config-next`                                                                 |

---

## Projektstruktur

```
appstract/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout: font, metadata, SEO, cookie consent
│   ├── page.tsx                      # Forsiden – samler alle sektioner
│   ├── globals.css                   # Design tokens, Tailwind-konfiguration og base styles
│   ├── about/
│   │   └── page.tsx                  # About-siden med team og CTA
│   └── omnichannel/
│       └── page.tsx                  # Omnichannel-siden med hero, KPI-grid og CTA
│
├── components/
│   ├── SmoothScroll.tsx              # Lenis smooth scroll-wrapper med progress bar
│   ├── layout/
│   │   ├── Navbar.tsx                # Responsiv navbar med auto-hide ved scroll
│   │   └── MobileMenu.tsx            # Fullscreen mobilmenu med animationer
│   ├── sections/                     # Sidespecifikke sektioner
│   │   ├── Hero.tsx                  # Hero: tab-rotation, baggrundsbilleder, swipe
│   │   ├── Results.tsx               # Resultater: parallax-billede og KPI-modal
│   │   ├── Concept.tsx               # Koncept: telefon-mockups og hotspots
│   │   ├── Feature.tsx               # Features: spotlight-kort og chat-illustration
│   │   ├── Cases.tsx                 # Cases: interaktiv ekspanderbar liste
│   │   ├── Contact.tsx               # Kontakt-CTA med 3D flydende billeder
│   │   ├── Footer.tsx                # Footer
│   │   ├── case-components/          # Subkomponenter til Cases
│   │   ├── contact-components/       # Subkomponenter til Contact (modal, form, bekræftelse)
│   │   ├── about/                    # About-sidens sektioner
│   │   │   ├── AboutHero.tsx         # Hero med gradient baggrund
│   │   │   ├── TeamSection.tsx       # Teamgrid – mapper over about.json
│   │   │   ├── TeamMemberCard.tsx    # Enkelt teammedlem-kort
│   │   │   ├── TeamPhoto.tsx         # Fuld-bredde team-foto sektion
│   │   │   └── AboutCta.tsx          # CTA der åbner contact-modal
│   │   └── omnichannel/              # Omnichannel-sidens sektioner
│   │       ├── OmnichannelHero.tsx   # Hero med gradient baggrund
│   │       ├── KpiBentoGrid.tsx      # KPI-kategorier i bento-grid
│   │       ├── KpiShowcase.tsx       # KPI-uddybende sektion
│   │       └── OmnichannelCta.tsx    # CTA der åbner contact-modal
│   └── ui/                           # Genbrugelige UI-komponenter
│       ├── Button.tsx                # Primær knap-komponent
│       ├── ConicButton.tsx           # Knap med animeret conic gradient-border
│       ├── SpotlightCard.tsx         # Kort med mouse-tracking spotlight-effekt
│       ├── RotatingCardStack.tsx     # 3D-roterende kortstack
│       ├── LiquidBackground.tsx      # WebGL shader-baseret flydende baggrund
│       ├── Modal.tsx                 # Genbrugelig modal med backdrop og scroll-lock
│       ├── CookieConsent.tsx         # GDPR cookie consent-banner
│       ├── Tag.tsx                   # Tagline-badge komponent
│       ├── Logo.tsx                  # Logo-komponent
│       ├── BurgerButton.tsx          # Animeret burgermenu-knap
│       └── DesktopNavLinks.tsx       # Navigationlinks til desktop
│
├── data/                             # JSON-filer med alt tekstindhold ← RET HER
│   ├── navbar.json                   # Navigation og links
│   ├── hero.json                     # Hero-sektionens tabs, tekst og billeder
│   ├── results.json                  # Resultater-sektionens tekst og features
│   ├── resultskpi.json               # KPI-data til Results-modal
│   ├── concept.json                  # Koncept-sektionens tekst, hotspots og features
│   ├── feature.json                  # Feature-sektionens tekst, kort og chat-beskeder
│   ├── cases.json                    # Cases med billeder, statistik og ekspanderet indhold
│   ├── casescomponent.json           # Cases-sektionens overskrifter
│   ├── contact.json                  # Kontakt-tekster, kontorinformation og formularfelter
│   ├── cookies.json                  # Cookie consent-kategorier og tekster
│   ├── footer.json                   # Footer-links og kontoradresser
│   ├── omnichannel.json              # Omnichannel-sidens hero, KPI-kategorier og CTA
│   └── about.json                    # About-sidens hero, teammedlemmer og CTA
│
├── lib/
│   ├── animations.ts                 # Framer Motion-varianter (fadeInUp, stagger, etc.)
│   └── hooks/
│       ├── useBodyScrollLock.ts      # Scroll-lock ved modaler/mobilmenu
│       └── useIsMobile.ts            # Mobil-detektion
│
└── public/
    ├── fonts/                        # Lokale skriftfiler (Bw Gradual DEMO)
    └── images/
        ├── 3d/                       # 3D-illustrationer til kontakt-sektionen
        ├── cases/                    # Case-billeder og -logoer
        ├── concept/                  # Telefon-mockups
        ├── hero/                     # Hero-baggrundsbilleder
        ├── logo/                     # Logo-filer
        ├── results/                  # Resultater-billeder
        └── team/                     # Teammedlem-fotos og team-foto
```

---

## Guide til indholdsopdatering via JSON

Alt tekstindhold, billeder og links styres udelukkende fra `data/`-mappen. Du behøver aldrig åbne en komponentfil for at opdatere sidens indhold.

### Navbar – `data/navbar.json`

```json
{
  "logo": {
    "text": "Appstract", // Logotekst
    "href": "/" // Link ved klik på logo
  },
  "links": [
    {
      "label": "Omnichannel", // Tekst i navigationen
      "href": "/omnichannel" // Intern sti
    },
    {
      "label": "Demo",
      "href": "https://...",
      "external": true // true = åbner i nyt faneblad
    }
  ],
  "cta": {
    "label": "Contact", // Tekst på CTA-knap i navbar
    "href": "#contact" // Anchor-link eller sti
  }
}
```

---

### Hero – `data/hero.json`

Heroes venstre side roterer automatisk mellem tabs. Hvert tab har sit eget billede og tekst.

```json
{
  "cta": {
    "label": "Explore", // Tekst på hero-knap
    "href": "#explore" // Anchor-link
  },
  "tabs": [
    {
      "label": "Shared Shopping", // Tab-knap tekst
      "headline": "Designed for...", // Stor overskrift
      "description": "...", // Brødtekst under overskrift
      "image": "/images/hero/hero-bg1.png", // Baggrundsbillede (læg i public/images/hero/)
      "objectPosition": "62% center" // CSS object-position for billedbeskæring
    }
    // Tilføj flere tabs ved at kopiere ovenstående objekt
  ]
}
```

**Tilføj en ny tab:** Kopier et tab-objekt, ret indholdet og angiv et nyt billede under `public/images/hero/`.

---

### Results – `data/results.json`

```json
{
  "tagline": "Results", // Lille tag over overskrift
  "headline": "Real Business Impact", // Sektionens overskrift
  "description": "...", // Brødtekst
  "features": [
    {
      "icon": "BarChart3", // Lucide-ikonnavn (se lucide.dev)
      "title": "...", // Feature-overskrift
      "description": "..." // Feature-beskrivelse
    }
  ],
  "actions": {
    "label": "Other KPI's", // Knaptekst
    "href": "#learn-more" // Link
  }
}
```

---

### Concept – `data/concept.json`

Telefon-mockup-sektionen med interaktive hotspots og feature-kort.

```json
{
  "tagline": "Concept",
  "headline": "Don't export engagement. Own it.",
  "description": "...",
  "phoneOverlayText": "...", // Tekst på overlay over telefonerne
  "demoUrl": "https://...", // Link på "Try Demo"-knappen
  "hotspots": [
    {
      "phone": "left", // Hvilken telefon: "left", "center" eller "right"
      "top": "67%", // Vertikal placering i procent (CSS top)
      "left": "45%", // Horisontal placering i procent (CSS left)
      "label": "..." // Tekst i tooltip-boblen
    }
    // Flyt hotspots ved at justere top/left-procenterne
  ],
  "features": [
    {
      "icon": "ShoppingCart", // Lucide-ikonnavn
      "title": "...",
      "description": "..."
    }
  ]
}
```

**Flyt et hotspot:** Justér `top` og `left` i procent. `phone` angiver hvilken telefon hotspot'et tilhører visuelt, men påvirker ikke placeringen direkte.

---

### Feature – `data/feature.json`

Feature-sektionen med spotlight-kort til venstre og chat-illustration til højre.

```json
{
  "tagline": "Why Appstract",
  "headline": {
    "line1": "Turn Shoppers Into...", // Første linje af overskrift
    "line2": "Customers naturally..." // Anden linje
  },
  "cards": [
    {
      "title": "...",
      "description": "...",
      "features": ["...", "..."], // Liste af features (vises som punkter)
      "featuresLabel": "Appstract enables:",
      "carousel": [
        {
          "icon": "Zap", // Lucide-ikonnavn
          "title": "Faster Decisions",
          "iconBg": "#6D5EFC", // Baggrundsfarve på ikon-cirkel (hex)
          "cardBg": "#D8D4F8" // Baggrundsfarve på carousel-kort
        }
        // Tilføj/fjern carousel-kort efter behov
      ]
    }
  ]
}
```

---

### Cases – `data/cases.json`

Hvert case-objekt vises som en rækkeitem i listen. Klik ekspanderer kortet med statistik og billedgalleri.

```json
{
  "cases": [
    {
      "name": "Bahne", // Case-navn
      "logo": "/images/cases/bahne.svg", // Sti til logo (SVG anbefales)
      "tagLabel": "CASE", // Label på tag-badge
      "description": "...", // Kort beskrivelse
      "featured": true, // true = vises først/fremhævet
      "href": "/cases/bahne", // Fremtidig case-sti (ikke aktiv endnu)
      "status": "Coming Soon!", // Valgfri statusbadge (fjern nøglen for at skjule)
      "expandedContent": {
        "headline": "...",
        "bullets": ["...", "..."], // Tekstpunkter i ekspanderet visning
        "stats": [
          { "label": "Conversion increase", "value": "+34%" }
          // Tilføj op til 3-4 stats
        ],
        "images": [
          {
            "src": "/images/cases/case-bahne1.png", // Billedsti
            "title": "Shop Together", // Billedtitel
            "description": "..." // Billedbeskrivelse
          }
          // Tilføj op til 3 billeder
        ]
      }
    }
    // Tilføj en ny case ved at kopiere hele objektet
  ]
}
```

**Tilføj en ny case:** Kopier et case-objekt, ret felterne og læg logo og billeder i `public/images/cases/`.

---

### Contact – `data/contact.json`

Styrer kontakt-sektionens tekster samt indholdet i contact-modalen (åbnes fra CTA-knapper og navbar).

```json
{
  "headline": "...", // Overskrift i kontakt-sektionen
  "description": "...",
  "modal": {
    "tagline": "Contact us",
    "headline": "...",
    "offices": [
      {
        "city": "Copenhagen",
        "company": "Appstract ApS",
        "address": "Strandgade 56, 2nd floor",
        "postalCity": "1401 Copenhagen, Denmark",
        "phone": "+45 2614 8222"
      }
      // Tilføj/ret kontoradresser her
    ],
    "email": {
      "label": "Email",
      "address": "hey@appstract.co" // ← Ret emailadresse her
    },
    "form": {
      "fields": [
        {
          "name": "fullName",
          "placeholder": "Full Name *",
          "type": "text", // "text", "email", "tel" eller "textarea"
          "required": true
        }
        // Tilføj formularfelter ved at kopiere et felt-objekt
      ],
      "submitButton": "Submit"
    },
    "confirmation": {
      "headline": "Thank you!", // Tekst efter indsendelse
      "description": "...",
      "closeButton": "Close"
    }
  }
}
```

---

### Footer – `data/footer.json`

```json
{
  "offices": [
    {
      "city": "Copenhagen",
      "lines": ["Strandgade 56, 2nd", "1401 Copenhagen", "Denmark"]
      // Ret adresselinjer direkte her
    }
  ],
  "links": [
    { "label": "LinkedIn", "href": "https://...", "external": true },
    { "label": "Contact", "href": "#contact" }
    // Tilføj/fjern links ved at tilføje/slette objekter
  ],
  "copyright": "© 2025 Appstract – All rights reserved."
}
```

---

### Omnichannel-siden – `data/omnichannel.json`

```json
{
  "hero": {
    "tagline": "Omnichannel", // Tag over overskrift
    "headline": "...",
    "description": "..."
  },
  "categories": [
    {
      "title": "Revenue & Conversion",
      "icon": "TrendingUp", // Lucide-ikonnavn
      "description": "...",
      "kpis": ["Conversion rate", "..."] // Liste af KPI'er – tilføj/fjern frit
    }
    // Tilføj en ny kategori ved at kopiere et kategori-objekt
  ],
  "cta": {
    "headline": "...",
    "description": "...",
    "buttonLabel": "Book a demo",
    "buttonLink": "/contact" // Intern sti eller anchor
  }
}
```

---

### About-siden – `data/about.json`

```json
{
  "hero": {
    "tagline": "About Us",
    "headline": "...",
    "description": "..."
  },
  "team": {
    "headline": "Meet the people behind Appstract",
    "description": "...",
    "members": [
      {
        "name": "Kim Lowert",
        "role": "Co-founder & CEO",
        "bio": "...",
        "image": "/images/team/person1.png" // Sti til profilbillede (anbefalet: kvadrat, min. 200×200px)
      }
      // ← Tilføj et nyt teammedlem ved at kopiere ovenstående objekt
    ]
  },
  "teamPhoto": {
    "headline": "We build together",
    "description": "...",
    "image": "/images/team/team.jpg" // Sti til team-foto (anbefalet: 16:7 ratio)
  },
  "cta": {
    "headline": "...",
    "description": "...",
    "buttonLabel": "Get in touch"
  }
}
```

**Tilføj et nyt teammedlem:**

1. Tilføj et objekt i `"members"`-arrayet i `data/about.json`
2. Læg profilbilledet i `public/images/team/` (fx `person4.png`)
3. Opdater `"image"`-stien i JSON til den nye fil

---

## Billeder

Alle billeder ligger i `public/images/` og refereres med rod-relative stier (fx `/images/hero/hero-bg1.png`).

| Mappe      | Indhold                               | Anbefalet format          |
| ---------- | ------------------------------------- | ------------------------- |
| `hero/`    | Hero-baggrundsbilleder                | PNG/WebP, min. 1920×1080  |
| `cases/`   | Case-logoer og case-screenshots       | SVG (logo), PNG (screens) |
| `concept/` | Telefon-mockup-billeder               | PNG med transparent       |
| `results/` | Billeder til resultater-sektionen     | PNG/WebP                  |
| `3d/`      | 3D-illustrationer til kontakt-sektion | PNG med transparent       |
| `logo/`    | Appstract logo-filer                  | SVG                       |
| `team/`    | Teammedlem-fotos og team-foto         | PNG/JPG, kvadrat (folks)  |

**Erstat et billede:** Læg det nye billede i den korrekte mappe med **samme filnavn** – JSON-stien forbliver uændret.

**Skift til et nyt filnavn:** Opdater `"image"`-feltet i den tilhørende JSON-fil til den nye sti.

---

## Ikoner

Projektet bruger [Lucide React](https://lucide.dev/icons). Overalt i JSON-filerne angives ikonnavnet som en streng (fx `"icon": "TrendingUp"`). Find det korrekte navn på lucide.dev og brug det præcis som vist på siden (PascalCase).

---

## Kom i gang

```bash
# Klon repositoriet
git clone https://github.com/buchhavee/appstract.git
cd appstract

# Installer dependencies
npm install

# Start udviklingsserveren
npm run dev
```

Åbn [http://localhost:3000](http://localhost:3000) i browseren.

```bash
npm run build   # Byg til produktion
npm start       # Start produktionsserver
npm run lint    # Kør linting
```

---

## Deployment

Projektet er deployet på **Vercel** og tilgængeligt på [appstract.vercel.app](https://appstract.vercel.app). Push til `main` deployer automatisk via Vercel-integration.

---

## Bemærkninger

- Alle komponenter er markeret med `"use client"` da de bruger interaktivitet, animationer eller hooks
- Skrifttypen Bw Gradual er en **demo-version** og er kun til brug i dette uddannelsesprojekt
- Path aliases er konfigureret med `@/*` som peger på roden af projektet
- Contact-modalen åbnes globalt via et custom DOM-event (`window.dispatchEvent(new Event("modalOpen"))`) – det samme event bruges fra navbar, footer og alle CTA-knapper på tværs af sider

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

Projektet bruger skrifttypen **Bw Gradual**, som er indlæst lokalt via `next/font/local` i flere vægte (Light, Regular, Medium, Bold, ExtraBold) med `font-display: swap` for optimal loading.

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
