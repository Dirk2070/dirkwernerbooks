import { Heart, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '@/contexts/LanguageContext'

const Footer = () => {
  const { language } = useLanguage()

  const socialLinks = [
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@innergrowthguide5',
      icon: '📱'
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@DirkWerner-d5v',
      icon: '📺'
    },
    {
      name: 'X/Twitter',
      url: 'https://x.com/dirk_werner1',
      icon: '🐦'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/dirk.werner.d.w.2070/',
      icon: '📷'
    },
    {
      name: 'LinkedIn',
      url: 'https://de.linkedin.com/in/dirk-werner-657a81a8',
      icon: '💼'
    },
    {
      name: 'Xing',
      url: 'https://www.xing.com/profile/Dirk_Werner30',
      icon: '🔗'
    }
  ]

  const bookLinks = [
    {
      name: 'Books2Read',
      url: 'https://www.books2read.com/Dirk-Werner-Author',
      icon: '📚'
    },
    {
      name: 'Apple Books',
      url: 'https://books.apple.com/author/dirk-werner',
      icon: '🍎'
    }
  ]

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/assets/logo.png" 
                alt="Werner Productions" 
                className="h-8 w-auto"
              />
              <div>
                <div className="font-bold text-primary">Dirk Werner</div>
                <div className="text-sm text-muted-foreground">
                  {language === 'de' ? 'Psychotherapeut & Autor' : 'Psychotherapist & Author'}
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {language === 'de' 
                ? 'Seit über 26 Jahren psychotherapeutisch tätig. Autor von 17+ Büchern in den Bereichen Psychologie, Krimis und Science Fiction.'
                : 'Psychotherapist for over 26 years. Author of 17+ books in psychology, mystery, and science fiction.'
              }
            </p>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">
              {language === 'de' ? 'Social Media' : 'Social Media'}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <span className="text-base">{link.icon}</span>
                  <span>{link.name}</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>

          {/* Books & Professional */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">
              {language === 'de' ? 'Bücher & Professionell' : 'Books & Professional'}
            </h3>
            <div className="space-y-2">
              {bookLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <span className="text-base">{link.icon}</span>
                  <span>{link.name}</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
              <a
                href="https://www.dirk-werner-psychotherapie.de"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <span className="text-base">🌐</span>
                <span>
                  {language === 'de' ? 'Praxis-Website' : 'Practice Website'}
                </span>
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://linktr.ee/Dirk_Werner"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <span className="text-base">🔗</span>
                <span>Linktree</span>
                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 Dirk Werner. {language === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <Link
                to={language === 'en' ? '/en/impressum' : '/impressum'}
                className="hover:text-foreground transition-colors duration-200"
              >
                {language === 'de' ? 'Impressum' : 'Legal Notice'}
              </Link>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <span>
                  {language === 'de' ? 'Erstellt mit' : 'Made with'}
                </span>
                <Heart className="h-4 w-4 text-red-500" />
                <span>
                  {language === 'de' ? 'für Leser weltweit' : 'for readers worldwide'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

