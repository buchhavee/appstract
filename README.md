# Appstract – Shared Shopping Experience

**Live demo:** [appstract.vercel.app](https://appstract.vercel.app)

Dette er en landingpage for Appstract, der tilbyder en shared shopping/co-shopping-oplevelse, som kan integreres direkte i eksisterende webshops. Idéen bag produktet er, at brugere kan shoppe sammen i realtid – dele kurve, chatte og få fælles anbefalinger.

Projektet fungerer som en moderne, animeret one-page marketingside, der demonstrerer produktets koncept og værdi.

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

---

## Vedligeholdelsesguide

Denne guide beskriver, hvordan du ændrer tekst, placerer og udskifter billeder og andet indhold på Appstract-sitet – uden at skulle have dyb teknisk viden om Next.js eller React.

> **Tip:** Kør altid `npm run dev` og åbn [http://localhost:3000](http://localhost:3000) i browseren, så du kan se dine ændringer live, mens du arbejder.

---

### Generelt princip: JSON-filer styrer alt tekstindhold

Alt tekstindhold på siden er adskilt fra selve komponentkoden og samlet i JSON-filer i mappen `data/`. Det betyder, at du kan opdatere tekster, overskrifter, knaplabels og meget mere ved udelukkende at redigere disse filer – du behøver ikke røre ved komponentfilerne i `components/`.

```
data/
├── hero.json           # Hero-sektionen (tabs, overskrifter, beskrivelser)
├── results.json        # Resultater-sektionen (tagline, overskrift, features)
├── resultskpi.json     # KPI-modal (liste over KPI'er)
├── concept.json        # Koncept-sektionen (overskrift, hotspots, feature-kort)
├── feature.json        # Feature-sektionen (spotlight-kort og chat-beskeder)
├── cases.json          # Cases-sektionen (case-info, statistikker, billeder)
├── contact.json        # Kontakt-sektionen (overskrift, kontorinfo, formular)
├── navbar.json         # Navigationens links og CTA
├── footer.json         # Footer (kontorinfo, links, copyright)
└── cookies.json        # Cookie consent-banner
```

---

### Ændre tekst

#### Navbar

Fil: `data/navbar.json`

```json
{
  "logo": {
    "text": "Appstract",   // Logoteksten (bruges som alt-tekst)
    "href": "/"
  },
  "links": [
    { "label": "Concept", "href": "#concept" },   // Navigationlinks – skift "label" for at ændre linkteksten
    { "label": "Our work", "href": "#cases" }
  ],
  "cta": {
    "label": "Contact",    // Teksten på CTA-knappen øverst til højre
    "href": "#contact"
  }
}
```

#### Hero-sektionen

Fil: `data/hero.json`

Hero-sektionen viser fire tabs, der roterer automatisk. Hver tab har sin egen overskrift, beskrivelse og baggrundsbillede.

```json
{
  "cta": {
    "label": "Explore",         // Tekst på CTA-knappen i hero
    "href": "#explore"
  },
  "tabs": [
    {
      "label": "Shared Shopping",                    // Tabnavn (vist som fane nederst)
      "headline": "Designed for shopping together",  // Stor overskrift
      "description": "Your customers already...",    // Brødtekst under overskriften
      "image": "/images/hero/hero-bg1.png",          // Baggrundsbillede (se afsnittet om billeder)
      "objectPosition": "62% center"                 // Billedets fokuspunkt (se afsnittet om billedplacering)
    },
    // ... de øvrige tabs følger samme struktur
  ]
}
```

For at tilføje en ny tab kopierer du blot et eksisterende tab-objekt, indsætter det i arrayet og udfylder egne værdier.

#### Resultater-sektionen

Fil: `data/results.json`

```json
{
  "tagline": "Results",                             // Lille mærkat over overskriften
  "headline": "Real Business Impact...",            // Sektionens primære overskrift
  "description": "Shared shopping doesn't just...", // Brødtekst
  "features": [
    {
      "icon": "BarChart3",       // Lucide-ikonnavn (se https://lucide.dev/icons/)
      "title": "Higher Average Order Value",
      "description": "By enabling customers..."
    }
    // tilføj eller fjern feature-objekter efter behov
  ],
  "actions": {
    "label": "Other KPI's",     // Knaptekst til KPI-modal
    "href": "#learn-more"
  }
}
```

KPI-listen i den modal der åbner ved tryk på knappen redigeres i `data/resultskpi.json`:

```json
{
  "title": "Key Performance Indicators",   // Modaloverskrift
  "kpis": [
    {
      "label": "AOV - Average Order Value",  // KPI-navn
      "trend": "increase",                   // "increase", "decrease" eller "added"
      "leftIcon": "BadgeDollarSign"          // Lucide-ikonnavn
    }
    // tilføj eller fjern KPI-objekter efter behov
  ]
}
```

#### Koncept-sektionen

Fil: `data/concept.json`

```json
{
  "tagline": "Concept",
  "headline": "Don't export engagement. Own it.",
  "description": "Shopping is rarely a solo decision...",
  "hotspots": [
    {
      "phone": "left",        // Hvilken telefon: "left", "center" eller "right"
      "top": "77%",           // Vertikal position på telefonen (procent)
      "left": "45%",          // Horisontal position på telefonen (procent)
      "label": "Customers browse products..."  // Tooltip-tekst ved hover
    }
    // tre hotspots i alt – én pr. telefon
  ],
  "features": [
    {
      "icon": "ShoppingCart",         // Lucide-ikonnavn
      "title": "Shop together",
      "description": "A native, real-time co-shopping..."
    }
    // fire feature-kort i alt
  ]
}
```

#### Feature-sektionen

Fil: `data/feature.json`

```json
{
  "tagline": "Why Appstract",
  "headline": {
    "line1": "Turn Shoppers Into Acquisition Channels",
    "line2": "Customers naturally invite others..."
  },
  "cards": [
    {
      "title": "Stop losing group purchases",
      "description": "Customers rarely shop alone..."
    },
    {
      "title": "Conversion grows when shopping becomes social",
      "description": "Buying decisions rarely happen alone...",
      "features": ["Social shopping directly in your store", ...],  // Bullet-liste
      "featuresLabel": "Appstract enables:",
      "carousel": [...]   // Kort i den animerede carousel (icon, title, farver)
    }
  ],
  "chat": {
    "messages": [
      {
        "sender": "Emma",
        "message": "Girls look at this! 👀 ...",
        "isRight": true    // true = besked til højre (afsender), false = venstre (modtager)
      }
      // tilføj eller fjern besked-objekter efter behov
    ],
    "buttons": ["Invite friends", "View product"]   // Knapper i chat-illustrationen
  },
  "insight": {
    "text": "People don't distrust products —",
    "textEnd": "they distrust buying alone."         // Splittet citat-tekst
  }
}
```

#### Cases-sektionen

Fil: `data/cases.json`

```json
{
  "cases": [
    {
      "name": "Bahne",
      "logo": "/images/cases/bahne.svg",          // Logo-fil (SVG anbefales)
      "tagLabel": "CASE",                          // Lille mærkat over casenavn
      "description": "Full integration of...",    // Kort beskrivelse i lukket tilstand
      "featured": true,                            // true = fremhævet (større visning)
      "href": "/cases/bahne",                      // Link (bruges ikke aktivt endnu)
      "expandedContent": {
        "headline": "Bringing Social Shopping On-Site",
        "bullets": ["Bahne implemented...", ...],  // Punkter i udvidet visning
        "stats": [
          { "label": "Conversion increase", "value": "+34%" }
          // tilføj eller fjern statistikker efter behov
        ],
        "images": [
          {
            "src": "/images/cases/case-bahne1.png",
            "title": "Shop Together",
            "description": "Invite friends to browse..."
          }
          // tre billeder pr. case
        ]
      }
    }
    // tilføj en ny case ved at kopiere hele dette objekt
  ]
}
```

#### Kontakt-sektionen

Fil: `data/contact.json`

```json
{
  "headline": "Turn Conversations Into Conversions",
  "description": "Customers already discuss purchases...",
  "Trust": "Quick introduction tailored to your store.",  // Lille tillidsmarkør under knappen (bemærk: stort T)
  "button": { "label": "Schedule A Demo", "icon": "ArrowRight" },
  "modal": {
    "tagline": "Contact us",
    "headline": "Ready to turn shopping into a social...",
    "offices": [
      {
        "city": "Copenhagen",
        "company": "Appstract ApS",
        "address": "Strandgade 56, 2nd floor",
        "postalCity": "1401 Copenhagen, Denmark",
        "phone": "+45 2614 8222"
      }
      // tilføj eller fjern kontorer efter behov
    ],
    "email": { "label": "Email", "address": "hey@appstract.co" },
    "form": {
      "fields": [
        { "name": "fullName", "placeholder": "Full Name *", "type": "text", "required": true }
        // tilføj eller fjern formularfelter efter behov
      ],
      "submitButton": "Submit"
    },
    "confirmation": {
      "headline": "Thank you!",
      "description": "Your message has been sent...",
      "closeButton": "Close"
    }
  }
}
```

#### Footer

Fil: `data/footer.json`

```json
{
  "logo": { "text": "Appstract", "href": "/" },
  "offices": [
    {
      "city": "Copenhagen",
      "lines": ["Strandgade 56, 2nd", "1401 Copenhagen", "Denmark"]  // Hver streng = én linje
    }
  ],
  "links": [
    { "label": "LinkedIn", "href": "https://...", "external": true },  // external: true åbner i ny fane
    { "label": "Contact", "href": "#contact" }
    // tilføj eller fjern links efter behov
  ],
  "copyright": "© 2025 Appstract – All rights reserved."
}
```

---

### Udskifte billeder

Alle billeder ligger i `public/images/` og er organiseret i undermapper:

```
public/images/
├── hero/       # Baggrundsbilleder til hero-tabs (hero-bg1.png … hero-bg10.png)
├── concept/    # Telefon-mockups (phone-left.png, phone-center.png, phone-right.png)
├── results/    # Resultatbillede i højre side (results-image.png)
├── cases/      # Case-logoer (.svg) og case-screenshots (.png)
├── 3d/         # 3D-dekorationsbilleder i kontakt-sektionen
└── logo/       # Appstract logo-filer (logo-icon.svg, logo-text.svg)
```

**Grundregel:** Gem det nye billede i samme mappe og med **præcis samme filnavn** som det billede, du vil erstatte. Så behøver du ikke ændre noget i koden.

> **Billedformat:** Brug `.png` til fotografier og mockups, `.svg` til logoer og ikoner. Next.js optimerer automatisk `.png`- og `.jpg`-filer ved build.

#### Hero-baggrundsbilleder

Hero-sektionen har fire tabs, og hvert tab har sit eget baggrundsbillede defineret i `data/hero.json` under `"image"`.

**Sådan udskifter du et hero-billede:**

1. Gem det nye billede i `public/images/hero/` – f.eks. `hero-bg1.png`
2. Det er alt – billedet bruges nu automatisk for det tab, der refererer til `/images/hero/hero-bg1.png`

**Sådan tilføjer du et nyt hero-billede:**

1. Gem det nye billede i `public/images/hero/` med et beskrivende navn, f.eks. `hero-bg11.png`
2. Åbn `data/hero.json` og sæt `"image": "/images/hero/hero-bg11.png"` på det ønskede tab

**Billedets fokuspunkt** (hvilken del af billedet der vises centralt) styres med `"objectPosition"` i `hero.json`. Værdien er et CSS `object-position`-udtryk:

| Eksempelværdi | Effekt |
|---|---|
| `"center center"` | Centrer billedet (standard) |
| `"62% center"` | Fokuser 62% fra venstre |
| `"50% 40%"` | Fokuser 50% fra venstre og 40% fra toppen |

#### Koncept-telefoner

De tre telefon-mockups er hardkodet i `components/sections/Concept.tsx` med følgende filnavne:

| Fil | Telefon |
|---|---|
| `public/images/concept/phone-left.png` | Venstre telefon |
| `public/images/concept/phone-center.png` | Midterste telefon (forrest) |
| `public/images/concept/phone-right.png` | Højre telefon |

Udskift billederne ved at gemme nye filer med nøjagtig samme filnavne.

Anbefalet billedstørrelse (aspektforholdet er vigtigere end præcise pixel-dimensioner – billederne skaleres responsivt):
- Venstre og højre telefon: aspektforhold **375:812** (portrait), minimum 375 × 812 px
- Midterste telefon: aspektforhold **414:896** (portrait), minimum 414 × 896 px

#### Resultatbilledet

Fil: `public/images/results/results-image.png`

Erstat filen direkte. Billedet vises i højre side af resultatsektionen og har et automatisk parallax-scroll-effekt.

Anbefalet billedstørrelse: mindst **800 × 1000 px** portrait for at se godt ud i parallax-effekten.

#### Case-billeder og -logoer

Case-logoer og case-screenshots defineres i `data/cases.json`. Et logo-felt ser således ud:

```json
"logo": "/images/cases/bahne.svg"
```

og case-screenshots:

```json
"images": [
  { "src": "/images/cases/case-bahne1.png", "title": "...", "description": "..." },
  { "src": "/images/cases/case-bahne2.png", "title": "...", "description": "..." },
  { "src": "/images/cases/case-bahne3.png", "title": "...", "description": "..." }
]
```

**Sådan udskifter du et case-billede:**

1. Gem det nye billede i `public/images/cases/`
2. Opdater stien i `data/cases.json` til det nye filnavn

**Sådan tilføjer du en ny case:**

1. Gem casens logo og screenshots i `public/images/cases/`
2. Kopiér et eksisterende case-objekt i `data/cases.json` og udfyld felterne med den nye cases oplysninger

#### 3D-dekorationsbilleder (kontakt-sektionen)

De fire flydende 3D-billeder i kontakt-sektionen er defineret direkte i `components/sections/Contact.tsx` i `floatingImages`-arrayet:

```typescript
const floatingImages = [
  { src: "/images/3d/3dlinegraph.png",   alt: "3D Line Graph",   ... },
  { src: "/images/3d/3dchatbubble.png",  alt: "3D Chat Bubble",  ... },
  { src: "/images/3d/3denvelope.png",    alt: "3D Envelope",     ... },
  { src: "/images/3d/3dpiechart.png",    alt: "3D Pie Chart",    ... },
];
```

Udskift billederne ved at:

1. Gemme de nye billedfiler i `public/images/3d/`
2. Enten beholde de samme filnavne (ingen kodeændring nødvendig), **eller** opdatere `src`-feltet i `floatingImages`-arrayet i `components/sections/Contact.tsx`

#### Logo

| Fil | Brug |
|---|---|
| `public/images/logo/logo-icon.svg` | Logo-ikonet alene |
| `public/images/logo/logo-text.svg` | Logoets tekstdel |

Erstat SVG-filerne direkte.

---

### Ændre billedplacering

I visse tilfælde er billedets placering styret af kode i komponenterne frem for i JSON-filerne. Her er de vigtigste steder:

#### Hero: fokuspunkt pr. tab

Ændres i `data/hero.json` via `"objectPosition"` – se ovenfor.

#### Koncept-telefoner: størrelse og overlap

Telefonernes størrelser og indbyrdes overlap styres af Tailwind-klasser i `components/sections/Concept.tsx`. Find de tre `<motion.div>`-blokke med klassen `relative w-50 ...` og juster størrelsesklasserne (f.eks. `w-50`, `md:w-75`, `lg:w-96`) og overlap-klasserne (`-mx-22`, `md:-mx-30`, osv.).

#### Resultatbillede: fokuspunkt

Billedet i resultatsektionen har sit fokuspunkt sat i `components/sections/Results.tsx`:

```tsx
<Image
  src="/images/results/results-image.png"
  alt="Results"
  fill
  className="object-cover object-[65%_center]"   // ← juster dette
/>
```

Skift `object-[65%_center]` til en anden procentværdi for at flytte fokuspunktet. F.eks.:
- `object-center` → centrer
- `object-[30%_center]` → fokus 30% fra venstre

#### 3D-billeder: position i kontakt-sektionen

Hvert 3D-billedes placering og bevægelsesbane styres af felterne i `floatingImages`-arrayet i `components/sections/Contact.tsx`:

```typescript
{
  src: "/images/3d/3dlinegraph.png",
  positionClasses: "-top-13 md:-top-32 ... -left-13 md:-left-20 ...",  // CSS-position
  yRange: [100, -100],   // Parallax-bevægelse i pixels (fra/til ved scroll)
  rotateRange: [-5, 5],  // Rotationsinterval i grader ved scroll
  floatClass: "float-a", // CSS-animation-klasse (float-a, float-b, float-c, float-d)
}
```

- **`positionClasses`**: Tailwind-klasser der placerer billedet. F.eks. `-top-13` = 13 enheder over sin container. Brug responsive præfikser (`md:`, `lg:`, `xl:`) til at justere for forskellige skærmstørrelser.
- **`yRange`**: Parallax-effektens styrke. `[100, -100]` betyder, at billedet bevæger sig 100px ned ved start og 100px op ved scrollstop.
- **`rotateRange`**: Rotationsvinkel ved scroll. `[-5, 5]` = fra -5° til +5°.

---

### Workflow: Ændre, se og udgive

#### 1. Kør lokalt

```bash
npm run dev
```

Åbn [http://localhost:3000](http://localhost:3000). Ændringer i JSON-filer og komponenter vises øjeblikkeligt takket være Next.js hot reload.

#### 2. Kontrollér for fejl

```bash
npm run build
```

Sørg for, at buildet gennemføres uden fejl, inden du pusher til GitHub.

```bash
npm run lint
```

Tjekker for kodestilsfejl.

#### 3. Deploy til Vercel

Projektet deployes automatisk til [appstract.vercel.app](https://appstract.vercel.app), når du pusher til `main`-branchen på GitHub:

```bash
git add .
git commit -m "Beskrivende commit-besked"
git push
```

Vercel registrerer pushet og starter automatisk et nyt build. Processen tager typisk 1–2 minutter, hvorefter ændringerne er live.

**Verificér deployet:** Gå til [vercel.com/dashboard](https://vercel.com/dashboard), vælg projektet og tjek, at det seneste deployment viser statussen **Ready** (grøn). Hvis det fejler, klik på deploymentet og læs loggen for at se fejlbeskeden – oftest skyldes det en syntaksfejl i en JSON-fil eller en manglende billedfil. Ret fejlen lokalt, kør `npm run build` for at bekræfte rettelsen, og push igen.
