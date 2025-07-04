import { useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image = '/assets/author-photo.jpg',
  url = 'https://dirkwernerbooks.com',
  type = 'website'
}) => {
  const { language } = useLanguage()

  const defaultTitles = {
    de: 'Dipl.-Psych. Dirk Werner - Psychologe & Autor | Bücher, Ratgeber & Krimis',
    en: 'Dipl.-Psych. Dirk Werner - Psychologist & Author | Books, Guides & Mysteries'
  }

  const defaultDescriptions = {
    de: 'Entdecken Sie die Bücher von Dipl.-Psych. Dirk Werner: Psychologie-Ratgeber, spannende Krimis der Dr. Seelmann-Serie, Science Fiction und Leadership-Guides. Über 26 Jahre Erfahrung als Psychotherapeut.',
    en: 'Discover the books by Dipl.-Psych. Dirk Werner: Psychology guides, thrilling Dr. Seelmann mystery series, science fiction and leadership guides. Over 26 years of experience as a psychotherapist.'
  }

  const defaultKeywords = {
    de: 'Dirk Werner, Psychologe, Psychotherapeut, Bücher, Ratgeber, Krimi, Dr. Seelmann, Science Fiction, Leadership, Psychologie, Selbsthilfe',
    en: 'Dirk Werner, Psychologist, Psychotherapist, Books, Guides, Mystery, Dr. Seelmann, Science Fiction, Leadership, Psychology, Self-help'
  }

  const finalTitle = title || defaultTitles[language]
  const finalDescription = description || defaultDescriptions[language]
  const finalKeywords = keywords || defaultKeywords[language]

  useEffect(() => {
    // Update document title
    document.title = finalTitle

    // Update meta tags
    const updateMetaTag = (name, content, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`
      let meta = document.querySelector(selector)
      
      if (!meta) {
        meta = document.createElement('meta')
        if (property) {
          meta.setAttribute('property', name)
        } else {
          meta.setAttribute('name', name)
        }
        document.head.appendChild(meta)
      }
      
      meta.setAttribute('content', content)
    }

    // Basic meta tags
    updateMetaTag('description', finalDescription)
    updateMetaTag('keywords', finalKeywords)
    updateMetaTag('author', 'Dipl.-Psych. Dirk Werner')
    updateMetaTag('robots', 'index, follow')
    updateMetaTag('language', language)

    // Open Graph tags
    updateMetaTag('og:title', finalTitle, true)
    updateMetaTag('og:description', finalDescription, true)
    updateMetaTag('og:image', image, true)
    updateMetaTag('og:url', url, true)
    updateMetaTag('og:type', type, true)
    updateMetaTag('og:site_name', 'Dirk Werner Books', true)
    updateMetaTag('og:locale', language === 'de' ? 'de_DE' : 'en_US', true)

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', finalTitle)
    updateMetaTag('twitter:description', finalDescription)
    updateMetaTag('twitter:image', image)
    updateMetaTag('twitter:site', '@dirk_werner1')
    updateMetaTag('twitter:creator', '@dirk_werner1')

    // Additional SEO tags
    updateMetaTag('theme-color', '#2563eb')
    updateMetaTag('msapplication-TileColor', '#2563eb')

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)

    // Alternate language links
    let alternateDe = document.querySelector('link[hreflang="de"]')
    if (!alternateDe) {
      alternateDe = document.createElement('link')
      alternateDe.setAttribute('rel', 'alternate')
      alternateDe.setAttribute('hreflang', 'de')
      document.head.appendChild(alternateDe)
    }
    alternateDe.setAttribute('href', url.replace('/en/', '/'))

    let alternateEn = document.querySelector('link[hreflang="en"]')
    if (!alternateEn) {
      alternateEn = document.createElement('link')
      alternateEn.setAttribute('rel', 'alternate')
      alternateEn.setAttribute('hreflang', 'en')
      document.head.appendChild(alternateEn)
    }
    alternateEn.setAttribute('href', url.includes('/en/') ? url : url + 'en/')

  }, [finalTitle, finalDescription, finalKeywords, image, url, type, language])

  // Structured Data (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Dirk Werner",
    "jobTitle": "Psychologist and Author",
    "description": finalDescription,
    "url": "https://dirkwernerbooks.com",
    "image": "https://dirkwernerbooks.com/assets/author-photo.jpg",
    "sameAs": [
      "https://www.books2read.com/Dirk-Werner-Author",
      "https://linktr.ee/Dirk_Werner",
      "https://www.tiktok.com/@innergrowthguide5",
      "https://www.youtube.com/@DirkWerner-d5v",
      "https://x.com/dirk_werner1",
      "https://www.instagram.com/dirk.werner.d.w.2070/",
      "https://de.linkedin.com/in/dirk-werner-657a81a8",
      "https://www.xing.com/profile/Dirk_Werner30"
    ],
    "knowsAbout": [
      "Psychology",
      "Psychotherapy",
      "Creative Writing",
      "Mystery Fiction",
      "Science Fiction",
      "Leadership",
      "Self-Help"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Psychology Degree"
    },
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Clinical Psychotherapist",
      "description": "Licensed psychological psychotherapist with over 26 years of experience"
    },
    "author": {
      "@type": "CreativeWork",
      "name": "Multiple published books in psychology, mystery, and science fiction genres"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export default SEO

