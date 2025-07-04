# Dirk Werner Books - Author Website

Eine moderne, zweisprachige (Deutsch/Englisch) Autorenwebsite für Dipl.-Psych. Dirk Werner, entwickelt mit React, Vite und Tailwind CSS.

## 🚀 Features

- **Zweisprachig**: Vollständige Unterstützung für Deutsch und Englisch
- **Responsive Design**: Optimiert für alle Geräte und Bildschirmgrößen
- **Moderne UI**: Erstellt mit shadcn/ui Komponenten und Tailwind CSS
- **SEO-optimiert**: Meta-Tags, Open Graph, strukturierte Daten
- **Performance**: Schnelle Ladezeiten durch Vite-Build-System
- **Accessibility**: Barrierefreie Benutzeroberfläche

## 📚 Inhalte

- **Homepage**: Überblick über den Autor und ausgewählte Bücher
- **Bücher-Katalog**: Vollständige Übersicht aller 17+ Bücher
- **Biografie**: Professioneller Hintergrund und Erfahrung
- **Genres**: Psychologie, Krimi, Science Fiction, Leadership
- **Kontakt**: Social Media Links und geschäftliche Anfragen
- **Impressum**: Rechtliche Hinweise und Datenschutz

## 🛠️ Technologie-Stack

- **Frontend**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.7
- **UI Components**: shadcn/ui
- **Routing**: React Router DOM 7.6.1
- **Icons**: Lucide React
- **Package Manager**: pnpm

## 🚀 Deployment

### Cloudflare Pages

1. **Repository verbinden**:
   - Cloudflare Dashboard → Pages → Create a project
   - GitHub Repository: `Dirk2070/dirkwernerbooks`

2. **Build-Einstellungen**:
   - **Framework preset**: Vite
   - **Build command**: `pnpm run build`
   - **Build output directory**: `dist`
   - **Node.js version**: 18 (oder höher)

3. **Environment Variables** (falls benötigt):
   - Keine erforderlich für dieses Projekt

4. **Domain**: `dirkwernerbooks.com`

## 📦 Lokale Entwicklung

### Voraussetzungen

- Node.js 18+ 
- pnpm (empfohlen) oder npm

### Installation

```bash
# Repository klonen
git clone https://github.com/Dirk2070/dirkwernerbooks.git
cd dirkwernerbooks

# Dependencies installieren
pnpm install

# Entwicklungsserver starten
pnpm dev

# Build für Produktion
pnpm build

# Build preview
pnpm preview
```

### Projektstruktur

```
src/
├── components/
│   ├── ui/          # shadcn/ui Komponenten
│   ├── pages/       # Seiten-Komponenten
│   ├── Header.jsx   # Navigation
│   ├── Footer.jsx   # Footer
│   └── SEO.jsx      # SEO-Komponente
├── contexts/
│   └── LanguageContext.jsx  # Zweisprachigkeit
├── lib/
│   ├── books-data.js    # Bücher-Daten
│   ├── translations.js  # Übersetzungen
│   └── utils.js         # Utility-Funktionen
├── assets/              # Bilder und Medien
└── hooks/               # Custom Hooks
```

## 🌐 Zweisprachigkeit

Die Website unterstützt vollständig Deutsch und Englisch:

- **URL-Struktur**: `/` (Deutsch) und `/en/` (Englisch)
- **Sprachumschaltung**: Globus-Icon in der Navigation
- **Übersetzungen**: Zentrale Verwaltung in `src/lib/translations.js`
- **SEO**: Hreflang-Tags für Suchmaschinen

## 📊 Performance

- **Bundle-Größe**: ~327 KB (99 KB gzipped)
- **CSS-Größe**: ~98 KB (15 KB gzipped)
- **Build-Zeit**: ~2.6 Sekunden
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)

## 🔧 Konfiguration

### Vite Config
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### Tailwind CSS
```javascript
// components.json
{
  "tailwind": {
    "config": "",
    "css": "src/App.css",
    "baseColor": "neutral",
    "cssVariables": true
  }
}
```

## 📝 Bücher-Daten

Die Bücher-Daten werden in `src/lib/books-data.js` verwaltet:

- **17+ Bücher** in verschiedenen Genres
- **Mehrsprachige Titel** und Beschreibungen
- **Shop-Links** zu Amazon, Books2Read, Apple Books
- **Genre-Kategorisierung** mit Farben und Icons

## 🎨 Design-System

- **Farben**: Neutrales Farbschema mit blauen Akzenten
- **Typografie**: System-Fonts mit Tailwind CSS
- **Komponenten**: shadcn/ui für konsistente UI
- **Dark Mode**: Unterstützt (vorbereitet)

## 🔍 SEO & Analytics

- **Meta-Tags**: Vollständige SEO-Optimierung
- **Open Graph**: Social Media Sharing
- **Strukturierte Daten**: JSON-LD für Suchmaschinen
- **Sitemap**: Automatisch generiert
- **Robots.txt**: Suchmaschinen-Crawling

## 📱 Responsive Design

- **Mobile-First**: Optimiert für mobile Geräte
- **Breakpoints**: Tailwind CSS Standard
- **Touch-Friendly**: Große Touch-Targets
- **Performance**: Optimierte Bilder und Assets

## 🚀 Deployment-Status

- ✅ **GitHub Repository**: https://github.com/Dirk2070/dirkwernerbooks
- ✅ **Cloudflare Pages**: Automatisches Deployment
- ✅ **Domain**: dirkwernerbooks.com
- ✅ **SSL**: Automatisch durch Cloudflare

## 📞 Support

Bei Fragen oder Problemen:

- **E-Mail**: werner-productions-media@protonmail.com
- **GitHub Issues**: [Repository Issues](https://github.com/Dirk2070/dirkwernerbooks/issues)

## 📄 Lizenz

© 2024 Dirk Werner. Alle Rechte vorbehalten.

---

**Entwickelt mit ❤️ für Leser weltweit** 