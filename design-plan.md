# Dirk Werner Author Website - Design Plan

## Website Structure

### Pages:
1. **Home / Startseite** - Landing page with introduction
2. **Books / Bücher** - Complete book catalog
3. **Biography / Biografie** - Author biography and photo
4. **Genres / Genres** - Genre overview with descriptions
5. **Contact / Kontakt** - Social media links and contact information

### Navigation:
- Fixed header with logo and navigation menu
- Language switcher (DE/EN) prominently displayed
- Mobile-responsive hamburger menu
- Footer with social media icons and links

## Design System

### Color Palette:
- **Primary**: Deep blue (#1e3a8a) - Professional, trustworthy
- **Secondary**: Warm gold (#f59e0b) - Accent color for highlights
- **Background**: Clean white (#ffffff) with subtle gray sections (#f8fafc)
- **Text**: Dark gray (#1f2937) for readability
- **Accent**: Teal (#0d9488) for links and interactive elements

### Typography:
- **Headlines**: Inter, 36px (desktop), 28px (mobile)
- **Subheadings**: Inter, 24px (desktop), 20px (mobile)
- **Body Text**: Inter, 18px (desktop), 16px (mobile)
- **Navigation**: Inter, 16px
- **Buttons**: Inter, 16px, medium weight

### Layout Principles:
- Clean, modern design with plenty of white space
- Card-based layout for books and content sections
- Responsive grid system (CSS Grid/Flexbox)
- Maximum content width: 1200px
- Mobile-first approach

## Page Layouts

### 1. Home Page Layout:
```
[Header with Logo + Navigation + Language Toggle]
[Hero Section with Author Photo + Introduction]
[Featured Books Carousel]
[Genre Overview Cards]
[Social Media Links]
[Footer]
```

### 2. Books Page Layout:
```
[Header]
[Page Title + Filter/Sort Options]
[Book Grid Layout - 3 columns desktop, 1 column mobile]
Each Book Card:
- Cover Image
- Title + Subtitle
- Genre Badge
- Description (truncated)
- Publication Year
- Format Icons (eBook, Print, Audio)
- Shop Links (Books2Read, Amazon, Apple)
[Footer]
```

### 3. Biography Page Layout:
```
[Header]
[Author Photo + Bio Text Side by Side]
[Professional Background Section]
[Achievements/Credentials]
[Footer]
```

### 4. Genres Page Layout:
```
[Header]
[Genre Cards with Icons and Descriptions]
[Example Books for Each Genre]
[Footer]
```

### 5. Contact Page Layout:
```
[Header]
[Contact Information]
[Social Media Grid with Icons]
[Professional Links]
[Footer]
```

## Interactive Elements

### Hover Effects:
- Book covers: Slight scale and shadow increase
- Navigation links: Underline animation
- Social media icons: Color transition
- Buttons: Background color transition

### Animations:
- Smooth scroll between sections
- Fade-in animations for content on scroll
- Language switch transition
- Mobile menu slide animation

### Responsive Breakpoints:
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## Book Display Strategy

### Book Cards Include:
- High-quality cover image
- Title and subtitle
- Genre badge with color coding
- Brief description (2-3 lines)
- Publication year
- Available formats (icons)
- Direct shop links
- "Read More" button for full details

### Genre Color Coding:
- Psychology/Self-Help: Blue (#3b82f6)
- Mystery/Crime: Dark red (#dc2626)
- Science Fiction: Purple (#7c3aed)
- Leadership/Business: Green (#059669)

## Bilingual Implementation

### Language Toggle:
- Prominent DE/EN switcher in header
- Flag icons or text labels
- Smooth content transition
- URL structure: /en/ for English, / for German

### URL Structure for dirkwernerbooks.com:
- **Primary Domain**: https://dirkwernerbooks.com (German default)
- **English Version**: https://dirkwernerbooks.com/en/
- **SEO Benefit**: Domain contains "books" keyword for better search visibility
- **Branding**: Perfect match for author website focused on book catalog

## Social Media Integration

### Social Icons Layout:
- Header: Compact icons linking to profiles
- Footer: Larger icons with platform names
- Contact page: Full grid with descriptions

### Platforms to Include:
- TikTok, YouTube (2 channels), X/Twitter
- Instagram, LinkedIn, Xing
- Books2Read, Amazon profiles
- Newsletter signup
- Professional website link

## Technical Specifications

### Framework: React with TypeScript
### Styling: Tailwind CSS
### Icons: Lucide React
### Deployment: Static hosting
### Performance: Optimized images, lazy loading
### SEO: Meta tags, structured data, sitemap

## Accessibility Features

### Requirements:
- Alt text for all images
- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios
- Focus indicators
- Semantic HTML structure

## Mobile Optimization

### Mobile-Specific Features:
- Touch-friendly button sizes (44px minimum)
- Swipeable book carousel
- Collapsible navigation menu
- Optimized image sizes
- Fast loading times
- Thumb-friendly interaction zones

