import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Globe } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, toggleLanguage, t } = useLanguage()
  const location = useLocation()

  const navigation = [
    { name: t('nav.home'), href: language === 'en' ? '/en' : '/' },
    { name: t('nav.books'), href: language === 'en' ? '/en/books' : '/books' },
    { name: t('nav.biography'), href: language === 'en' ? '/en/biography' : '/biography' },
    { name: t('nav.genres'), href: language === 'en' ? '/en/genres' : '/genres' },
    { name: t('nav.contact'), href: language === 'en' ? '/en/contact' : '/contact' },
    { name: t('nav.impressum'), href: language === 'en' ? '/en/impressum' : '/impressum' }
  ]

  const isActive = (href) => {
    if (href === '/' && location.pathname === '/') return true
    if (href === '/en' && location.pathname === '/en') return true
    return location.pathname === href
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={language === 'en' ? '/en' : '/'} className="flex items-center space-x-3">
            <img 
              src="/assets/logo.png" 
              alt="Werner Productions" 
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-foreground">
              Dirk Werner<span className="text-blue-600">Books</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-3 py-1 rounded-md bg-muted hover:bg-muted/80 transition-colors duration-200"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Language Toggle Mobile */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-2 py-1 rounded-md bg-muted hover:bg-muted/80 transition-colors duration-200"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50 dark:bg-blue-950'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

