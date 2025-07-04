# Dirk Werner Author Website

Eine vollständige zweisprachige (Deutsch/Englisch) Autorenwebsite für Dipl.-Psych. Dirk Werner.

## 🌟 Features

### ✅ Vollständig implementiert:
- **Zweisprachige Website** (Deutsch/Englisch) mit dynamischem Sprachwechsel
- **Responsive Design** für Desktop, Tablet und Mobile
- **Vollständiger Buchkatalog** mit 20+ Büchern in 4 Genres
- **Professionelle Biografie** mit Berufserfahrung und Qualifikationen
- **Genre-Übersicht** mit detaillierten Beschreibungen
- **Kontaktseite** mit Social Media Integration
- **Impressum mit Disclaimer** (deutsche Rechtskonformität)
- **SEO-Optimierung** mit Meta-Tags, Sitemap und strukturierten Daten
- **Professionelles Design** mit modernen UI-Komponenten

### 📚 Buchkatalog:
- **Psychologie & Selbsthilfe** (8 Bücher)
- **Krimi & Psychothriller** (Dr. Seelmann-Serie, 7 Bücher)
- **Science Fiction & Thriller** (3 Bücher)
- **Leadership & Business** (2 Bücher)

### 🔗 Social Media Integration:
- TikTok, YouTube, X/Twitter, Instagram
- LinkedIn, XING, Books2Read, Linktree
- Praxis-Website Integration

## 🚀 Deployment

### Für Cloudflare Pages:
1. Repository auf GitHub/GitLab erstellen
2. Code hochladen
3. Cloudflare Pages mit Repository verbinden
4. Build-Einstellungen: `pnpm run build`, Output: `dist`
5. Domain dirkwernerbooks.com verbinden

### Lokale Entwicklung:
```bash
cd dirkwernerbooks
pnpm install
pnpm run dev
```

### Production Build:
```bash
pnpm run build
pnpm run preview
```

## 📁 Projektstruktur

```
dirkwernerbooks/
├── src/
│   ├── components/
│   │   ├── pages/          # Alle Seiten-Komponenten
│   │   ├── ui/             # UI-Komponenten
│   │   ├── Header.jsx      # Navigation
│   │   ├── Footer.jsx      # Footer mit Links
│   │   └── SEO.jsx         # SEO-Komponente
│   ├── contexts/
│   │   └── LanguageContext.jsx  # Sprachverwaltung
│   ├── lib/
│   │   ├── translations.js      # Übersetzungen
│   │   └── books-data.js        # Buchkatalog
│   └── assets/             # Bilder und Medien
├── public/
│   ├── robots.txt          # SEO
│   └── sitemap.xml         # Sitemap
└── dist/                   # Build-Output
```

## 🛠 Technologie-Stack

- **React 18** mit Vite
- **Tailwind CSS** für Styling
- **Lucide Icons** für Icons
- **React Router** für Navigation
- **Responsive Design** mit Mobile-First Ansatz

## 📧 Kontakt

**Geschäftliche Anfragen:** werner-productions-media@protonmail.com

## 📄 Rechtliches

- Vollständiges Impressum nach deutschem Recht
- Datenschutz-Hinweise
- Haftungsausschluss
- Urheberrechts-Informationen

## 🌐 Domain

**Ziel-Domain:** dirkwernerbooks.com (über Cloudflare verwaltet)

---

**Erstellt:** Januar 2025  
**Status:** Produktionsbereit  
**Sprachen:** Deutsch (Standard), Englisch

