import { Mail, User, Shield, Copyright, ExternalLink, FileText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/contexts/LanguageContext'

const Impressum = () => {
  const { language, t } = useLanguage()

  const sections = [
    {
      icon: <User className="h-6 w-6" />,
      title: t('impressum.responsible'),
      content: (
        <div className="space-y-2">
          <p className="font-semibold text-foreground">{t('impressum.name')}</p>
          <p className="text-muted-foreground">{t('impressum.profession')}</p>
          <a
            href={`mailto:${t('impressum.email')}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <Mail className="h-4 w-4 mr-2" />
            {t('impressum.email')}
          </a>
        </div>
      )
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('impressum.disclaimer'),
      content: (
        <p className="text-muted-foreground leading-relaxed">
          {t('impressum.disclaimerContent')}
        </p>
      )
    },
    {
      icon: <Copyright className="h-6 w-6" />,
      title: t('impressum.copyright'),
      content: (
        <p className="text-muted-foreground leading-relaxed">
          {t('impressum.copyrightContent')}
        </p>
      )
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: t('impressum.privacy'),
      content: (
        <p className="text-muted-foreground leading-relaxed">
          {t('impressum.privacyContent')}
        </p>
      )
    },
    {
      icon: <ExternalLink className="h-6 w-6" />,
      title: t('impressum.externalLinks'),
      content: (
        <p className="text-muted-foreground leading-relaxed">
          {t('impressum.externalLinksContent')}
        </p>
      )
    }
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('impressum.title')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('impressum.subtitle')}
          </p>
        </div>

        {/* Legal Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="text-blue-600 mt-1">
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-foreground mb-4">
                      {section.title}
                    </h2>
                    {section.content}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Legal Information */}
        <div className="mt-12 p-6 bg-muted/30 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              {language === 'de' 
                ? 'Diese Website entspricht den deutschen Rechtsvorschriften.'
                : 'This website complies with German legal requirements.'
              }
            </p>
            <p className="text-xs text-muted-foreground">
              {language === 'de' 
                ? 'Letzte Aktualisierung: Januar 2025'
                : 'Last updated: January 2025'
              }
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-4">
              {language === 'de' 
                ? 'Fragen zu rechtlichen Angelegenheiten?' 
                : 'Questions about legal matters?'
              }
            </h3>
            <p className="text-muted-foreground mb-6">
              {language === 'de' 
                ? 'Bei Fragen zu diesen rechtlichen Hinweisen können Sie mich gerne kontaktieren.'
                : 'If you have questions about these legal notices, please feel free to contact me.'
              }
            </p>
            <a
              href={`mailto:${t('impressum.email')}`}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              <Mail className="h-5 w-5 mr-2" />
              {language === 'de' ? 'Kontakt aufnehmen' : 'Get in touch'}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Impressum

