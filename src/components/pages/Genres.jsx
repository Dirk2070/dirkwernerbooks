import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/contexts/LanguageContext'
import { genres, getBooksByGenre } from '@/lib/books-data'

const Genres = () => {
  const { language, t } = useLanguage()

  const genreDetails = {
    psychology: {
      examples: t('genres.psychology.examples'),
      description: t('genres.psychology.description')
    },
    mystery: {
      examples: t('genres.mystery.examples'),
      description: t('genres.mystery.description')
    },
    scifi: {
      examples: t('genres.scifi.examples'),
      description: t('genres.scifi.description')
    },
    leadership: {
      examples: t('genres.leadership.examples'),
      description: t('genres.leadership.description')
    }
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('genres.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('genres.subtitle')}
          </p>
        </div>

        {/* Genres Grid */}
        <div className="space-y-8">
          {Object.entries(genres).map(([key, genre]) => {
            const booksInGenre = getBooksByGenre(key)
            const details = genreDetails[key]
            
            return (
              <Card key={key} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                    {/* Genre Info */}
                    <div 
                      className="lg:col-span-2 p-8 lg:p-12"
                      style={{ backgroundColor: `${genre.color}05` }}
                    >
                      <div className="flex items-center space-x-4 mb-6">
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                          style={{ backgroundColor: `${genre.color}20`, color: genre.color }}
                        >
                          {genre.icon}
                        </div>
                        <div>
                          <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                            {genre.name[language]}
                          </h2>
                          <div className="flex items-center space-x-2 mt-2">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {booksInGenre.length} {language === 'de' ? 'Bücher' : 'Books'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-lg text-foreground mb-6 leading-relaxed">
                        {details?.description}
                      </p>

                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-3">
                          {language === 'de' ? 'Beispiele:' : 'Examples:'}
                        </h4>
                        <p className="text-muted-foreground">
                          {details?.examples}
                        </p>
                      </div>

                      <Button 
                        asChild 
                        className="group"
                        style={{ backgroundColor: genre.color }}
                      >
                        <Link to={`${language === 'de' ? '/books' : '/en/books'}?genre=${key}`}>
                          {t('genres.viewBooks')}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>

                    {/* Featured Books */}
                    <div className="p-6 bg-muted/30">
                      <h4 className="font-semibold text-foreground mb-4">
                        {language === 'de' ? 'Aktuelle Bücher' : 'Recent Books'}
                      </h4>
                      <div className="space-y-4">
                        {booksInGenre.slice(0, 3).map((book) => (
                          <div key={book.id} className="flex items-start space-x-3">
                            <div className="w-12 h-16 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden flex-shrink-0">
                              <img
                                src={`/assets/${book.cover}`}
                                alt={book.title[language]}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = '/assets/placeholder-book.jpg'
                                }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-medium text-sm text-foreground line-clamp-2 leading-tight">
                                {book.title[language]}
                              </h5>
                              <p className="text-xs text-muted-foreground mt-1">
                                {book.year}
                              </p>
                              <div className="flex space-x-1 mt-1">
                                {book.formats.includes('ebook') && <span className="text-xs">📱</span>}
                                {book.formats.includes('print') && <span className="text-xs">📖</span>}
                                {book.formats.includes('audiobook') && <span className="text-xs">🎧</span>}
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {booksInGenre.length > 3 && (
                          <div className="text-center pt-2">
                            <Button asChild variant="ghost" size="sm">
                              <Link to={`${language === 'de' ? '/books' : '/en/books'}?genre=${key}`}>
                                +{booksInGenre.length - 3} {language === 'de' ? 'weitere' : 'more'}
                              </Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              {language === 'de' 
                ? 'Entdecken Sie alle Bücher' 
                : 'Discover All Books'
              }
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              {language === 'de' 
                ? 'Tauchen Sie ein in die vielfältige Welt von Dirk Werner und finden Sie das perfekte Buch für Ihre Interessen.'
                : 'Dive into the diverse world of Dirk Werner and find the perfect book for your interests.'
              }
            </p>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link to={language === 'de' ? '/books' : '/en/books'}>
                <BookOpen className="mr-2 h-5 w-5" />
                {language === 'de' ? 'Alle Bücher ansehen' : 'View All Books'}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Genres

