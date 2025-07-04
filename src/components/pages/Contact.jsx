import { useState } from 'react'
import { ExternalLink, Mail, Globe, BookOpen, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/contexts/LanguageContext'

const Contact = () => {
  const { language, t } = useLanguage()
  const [email, setEmail] = useState('')

  const professionalLinks = [
    {
      name: language === 'de' ? 'Praxis-Website' : 'Practice Website',
      url: 'https://www.dirk-werner-psychotherapie.de',
      icon: <Globe className="h-5 w-5" />,
      description: language === 'de' 
        ? 'Professionelle psychotherapeutische Praxis' 
        : 'Professional psychotherapeutic practice'
    }
  ]

  const bookPlatforms = [
    {
      name: 'Books2Read',
      url: 'https://www.books2read.com/Dirk-Werner-Author',
      icon: '📚',
      description: language === 'de' 
        ? 'Zentrale Plattform für alle Bücher' 
        : 'Central platform for all books'
    },
    {
      name: 'Apple Books',
      url: 'https://books.apple.com/author/dirk-werner',
      icon: '🍎',
      description: language === 'de' 
        ? 'Hörbücher und eBooks' 
        : 'Audiobooks and eBooks'
    },
    {
      name: 'Linktree',
      url: 'https://linktr.ee/Dirk_Werner',
      icon: '🔗',
      description: language === 'de' 
        ? 'Alle Links an einem Ort' 
        : 'All links in one place'
    }
  ]

  const socialMedia = [
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@innergrowthguide5',
      icon: '📱',
      handle: '@innergrowthguide5',
      description: language === 'de' 
        ? 'Kurze Psychologie-Tipps und Einblicke' 
        : 'Short psychology tips and insights'
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@DirkWerner-d5v',
      icon: '📺',
      handle: '@DirkWerner-d5v',
      description: language === 'de' 
        ? 'Ausführliche Videos zu Psychologie und Büchern' 
        : 'In-depth videos on psychology and books'
    },
    {
      name: 'X/Twitter',
      url: 'https://x.com/dirk_werner1',
      icon: '🐦',
      handle: '@dirk_werner1',
      description: language === 'de' 
        ? 'Aktuelle Gedanken und Updates' 
        : 'Current thoughts and updates'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/dirk.werner.d.w.2070/',
      icon: '📷',
      handle: '@dirk.werner.d.w.2070',
      description: language === 'de' 
        ? 'Visuelle Einblicke in Arbeit und Leben' 
        : 'Visual insights into work and life'
    },
    {
      name: 'LinkedIn',
      url: 'https://de.linkedin.com/in/dirk-werner-657a81a8',
      icon: '💼',
      handle: 'Dirk Werner',
      description: language === 'de' 
        ? 'Professionelles Netzwerk und Karriere' 
        : 'Professional network and career'
    },
    {
      name: 'Xing',
      url: 'https://www.xing.com/profile/Dirk_Werner30',
      icon: '🔗',
      handle: 'Dirk Werner',
      description: language === 'de' 
        ? 'Deutschsprachiges Business-Netzwerk' 
        : 'German-speaking business network'
    }
  ]

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Newsletter signup would be implemented here
    alert(language === 'de' 
      ? 'Newsletter-Anmeldung wird bald verfügbar sein!' 
      : 'Newsletter signup will be available soon!'
    )
    setEmail('')
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('contact.title')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Business Contact */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t('contact.businessContact')}
              </h2>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-blue-600">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">
                        {t('contact.businessContact')}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {t('contact.businessText')}
                      </p>
                      <a
                        href={`mailto:${t('contact.businessEmail')}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {t('contact.businessEmail')}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Professional Links */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t('contact.professional')}
              </h2>
              <div className="space-y-4">
                {professionalLinks.map((link) => (
                  <Card key={link.name} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-4 group"
                      >
                        <div className="text-blue-600">
                          {link.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground group-hover:text-blue-600 transition-colors">
                            {link.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {link.description}
                          </p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Book Platforms */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t('contact.books')}
              </h2>
              <div className="space-y-4">
                {bookPlatforms.map((platform) => (
                  <Card key={platform.name} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <a
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-4 group"
                      >
                        <div className="text-2xl">
                          {platform.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground group-hover:text-blue-600 transition-colors">
                            {platform.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {platform.description}
                          </p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {t('contact.newsletter')}
              </h2>
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">
                    {t('contact.newsletterText')}
                  </p>
                  <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('contact.email')}
                      className="flex-1 px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      required
                    />
                    <Button type="submit">
                      <Send className="h-4 w-4 mr-2" />
                      {t('contact.subscribe')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Social Media */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {t('contact.social')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialMedia.map((social) => (
                <Card key={social.name} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="text-2xl">
                          {social.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-blue-600 transition-colors">
                            {social.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {social.handle}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {social.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-blue-600 group-hover:underline">
                          {language === 'de' ? 'Besuchen' : 'Visit'}
                        </span>
                        <ExternalLink className="h-3 w-3 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                      </div>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              {language === 'de' 
                ? 'Lassen Sie uns in Verbindung bleiben' 
                : 'Let\'s Stay Connected'
              }
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              {language === 'de' 
                ? 'Folgen Sie mir auf Ihren bevorzugten Plattformen für Updates zu neuen Büchern, psychologischen Einblicken und mehr.'
                : 'Follow me on your preferred platforms for updates on new books, psychological insights, and more.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <a href="https://linktr.ee/Dirk_Werner" target="_blank" rel="noopener noreferrer">
                  <BookOpen className="mr-2 h-5 w-5" />
                  {language === 'de' ? 'Alle Links' : 'All Links'}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="https://www.books2read.com/Dirk-Werner-Author" target="_blank" rel="noopener noreferrer">
                  <Mail className="mr-2 h-5 w-5" />
                  {language === 'de' ? 'Bücher entdecken' : 'Discover Books'}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact

