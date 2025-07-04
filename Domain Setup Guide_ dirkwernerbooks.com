# Domain Setup Guide: dirkwernerbooks.com

## Domain Configuration

### Primary Domain: dirkwernerbooks.com
- **Perfect for**: Author website focused on book catalog
- **SEO Benefits**: Contains "books" keyword for better search visibility
- **Memorable**: Easy to remember and share

### Recommended Subdomain Structure:
- **Main Site**: `https://dirkwernerbooks.com` (German default)
- **English Version**: `https://dirkwernerbooks.com/en/`
- **Alternative**: `https://en.dirkwernerbooks.com` (if preferred)

## DNS Configuration

### Required DNS Records:
```
Type    Name    Value                           TTL
A       @       [Your hosting IP]              3600
A       www     [Your hosting IP]              3600
CNAME   en      dirkwernerbooks.com            3600
```

### SSL Certificate:
- Enable HTTPS for security and SEO
- Use Let's Encrypt or hosting provider SSL
- Redirect HTTP to HTTPS automatically

## SEO Optimization for dirkwernerbooks.com

### Meta Tags Configuration:
```html
<!-- German (Default) -->
<title>Dirk Werner - Psychologe & Autor | Bücher, Ratgeber & Krimis</title>
<meta name="description" content="Dipl.-Psych. Dirk Werner - Psychotherapeut und Autor von 17+ Büchern. Psychologie-Ratgeber, Dr. Seelmann Krimis, Science Fiction. Jetzt entdecken!">
<meta name="keywords" content="Dirk Werner, Psychologe, Bücher, Ratgeber, Psychotherapie, Dr. Seelmann, Krimi, Science Fiction">

<!-- English -->
<title>Dirk Werner - Psychologist & Author | Books, Guides & Mysteries</title>
<meta name="description" content="Dipl.-Psych. Dirk Werner - Psychotherapist and author of 17+ books. Psychology guides, Dr. Seelmann mysteries, science fiction. Discover now!">
<meta name="keywords" content="Dirk Werner, psychologist, books, guides, psychotherapy, Dr. Seelmann, mystery, science fiction">
```

### Structured Data (JSON-LD):
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Dirk Werner",
  "jobTitle": "Clinical Psychotherapist & Author",
  "url": "https://dirkwernerbooks.com",
  "sameAs": [
    "https://www.books2read.com/Dirk-Werner-Author",
    "https://linktr.ee/Dirk_Werner",
    "https://de.linkedin.com/in/dirk-werner-657a81a8",
    "https://www.dirk-werner-psychotherapie.de"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Private Psychotherapy Practice"
  },
  "alumniOf": "Psychology Diploma",
  "knowsAbout": ["Psychotherapy", "Psychology", "Creative Writing", "Mystery Writing"]
}
```

## Website Configuration

### URL Structure:
```
dirkwernerbooks.com/
├── index.html (German homepage)
├── books/ (Alle Bücher)
├── biography/ (Biografie)
├── genres/ (Genres)
├── contact/ (Kontakt)
└── en/
    ├── index.html (English homepage)
    ├── books/ (All Books)
    ├── biography/ (Biography)
    ├── genres/ (Genres)
    └── contact/ (Contact)
```

### Sitemap.xml Structure:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://dirkwernerbooks.com/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://dirkwernerbooks.com/en/"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://dirkwernerbooks.com/"/>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://dirkwernerbooks.com/en/</loc>
    <xhtml:link rel="alternate" hreflang="de" href="https://dirkwernerbooks.com/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://dirkwernerbooks.com/en/"/>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Additional pages... -->
</urlset>
```

## Hosting Recommendations

### Static Hosting Options:
1. **Netlify** (Recommended)
   - Free SSL certificate
   - Automatic deployments
   - Form handling for contact
   - CDN included

2. **Vercel**
   - Excellent React support
   - Fast global CDN
   - Easy custom domain setup

3. **GitHub Pages**
   - Free hosting
   - Custom domain support
   - Version control integration

### Deployment Steps:
1. Build the React application
2. Configure custom domain in hosting settings
3. Update DNS records to point to hosting provider
4. Enable SSL certificate
5. Set up redirects (www to non-www, HTTP to HTTPS)

## Performance Optimization

### Core Web Vitals:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Optimization Techniques:
- Compress and optimize all images
- Use WebP format for book covers
- Implement lazy loading for images
- Minify CSS and JavaScript
- Enable gzip compression
- Use CDN for static assets

## Analytics & Monitoring

### Google Analytics 4:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Google Search Console:
- Verify domain ownership
- Submit sitemap
- Monitor search performance
- Track indexing status

## Social Media Integration

### Open Graph Tags:
```html
<meta property="og:title" content="Dirk Werner - Psychologe & Autor">
<meta property="og:description" content="Psychotherapeut und Autor von 17+ Büchern">
<meta property="og:image" content="https://dirkwernerbooks.com/images/og-image.jpg">
<meta property="og:url" content="https://dirkwernerbooks.com">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Dirk Werner Books">
```

### Twitter Cards:
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@dirk_werner1">
<meta name="twitter:title" content="Dirk Werner - Psychologe & Autor">
<meta name="twitter:description" content="Psychotherapeut und Autor von 17+ Büchern">
<meta name="twitter:image" content="https://dirkwernerbooks.com/images/twitter-card.jpg">
```

## Security Considerations

### Security Headers:
```
Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

### GDPR Compliance:
- Cookie consent banner
- Privacy policy page
- Data protection notice
- Contact form data handling

## Backup & Maintenance

### Regular Tasks:
- Weekly content updates
- Monthly performance checks
- Quarterly security updates
- Annual domain renewal

### Backup Strategy:
- Daily automated backups
- Version control with Git
- Database backups (if applicable)
- Image asset backups

## Launch Checklist

### Pre-Launch:
- [ ] Domain purchased and configured
- [ ] DNS records updated
- [ ] SSL certificate installed
- [ ] Website fully tested
- [ ] All links verified
- [ ] Mobile responsiveness checked
- [ ] SEO meta tags implemented
- [ ] Analytics tracking installed

### Post-Launch:
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics
- [ ] Monitor website performance
- [ ] Check for broken links
- [ ] Verify social media sharing
- [ ] Test contact forms
- [ ] Monitor search rankings

## Contact Information Update

### Update All Profiles:
- Books2Read profile
- Social media bios
- Professional website
- Email signatures
- Business cards

### New Website URL:
**Primary**: https://dirkwernerbooks.com
**English**: https://dirkwernerbooks.com/en/

