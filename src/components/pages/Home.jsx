import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Users, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/contexts/LanguageContext'
import { getFeaturedBooks, genres } from '@/lib/books-data'

const Home = () => {
  const { language, t } = useLanguage()
  const featuredBooks = getFeaturedBooks()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  {t('home.title')}
                </h1>
                <p className="text-xl lg:text-2xl text-blue-600 dark:text-blue-400 font-medium">
                  {t('home.subtitle')}
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {t('home.description')}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">26+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'de' ? 'Jahre Erfahrung' : 'Years Experience'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">17+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'de' ? 'Bücher' : 'Books'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">4</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'de' ? 'Genres' : 'Genres'}
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link to={language === 'de' ? '/books' : '/en/books'}>
                    <BookOpen className="mr-2 h-5 w-5" />
                    {t('home.allBooks')}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to={language === 'de' ? '/biography' : '/en/biography'}>
                    <Users className="mr-2 h-5 w-5" />
                    {language === 'de' ? 'Über den Autor' : 'About the Author'}
                  </Link>
                </Button>
              </div>
            </div>

            {/* Author Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl border-8 border-white dark:border-gray-800">
                  <img
                    src="/assets/author-photo.jpg"
                    alt="Dipl.-Psych. Dirk Werner"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg border border-gray-200 dark:border-gray-700">
                  <Award className="h-8 w-8 text-yellow-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t('home.featuredBooks')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === 'de' 
                ? 'Entdecken Sie eine Auswahl der neuesten und beliebtesten Werke von Dirk Werner'
                : 'Discover a selection of the latest and most popular works by Dirk Werner'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredBooks.map((book) => (
              <Card key={book.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="aspect-[3/4] mb-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                    <img
                      src={`/assets/${book.cover}`}
                      alt={book.title[language]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = '/assets/placeholder-book.jpg'
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span 
                        className="inline-block w-3 h-3 rounded-full"
                        style={{ backgroundColor: genres[book.genre]?.color }}
                      ></span>
                      <span className="text-sm text-muted-foreground">
                        {genres[book.genre]?.name[language]}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground line-clamp-2 leading-tight">
                      {book.title[language]}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {book.description[language]}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        {book.year}
                      </span>
                      <div className="flex space-x-1">
                        {book.formats.includes('ebook') && <span className="text-xs">📱</span>}
                        {book.formats.includes('print') && <span className="text-xs">📖</span>}
                        {book.formats.includes('audiobook') && <span className="text-xs">🎧</span>}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link to={language === 'de' ? '/books' : '/en/books'}>
                {t('home.allBooks')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Genres Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t('home.genresTitle')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {language === 'de' 
                ? 'Von Psychologie bis Science Fiction – entdecken Sie die vielfältigen Themenwelten'
                : 'From psychology to science fiction – discover the diverse thematic worlds'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(genres).map(([key, genre]) => (
              <Card key={key} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${genre.color}20`, color: genre.color }}
                  >
                    {genre.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {genre.name[language]}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {genre.description[language]}
                  </p>
                  <Button 
                    asChild 
                    variant="ghost" 
                    size="sm" 
                    className="mt-4 group-hover:bg-accent"
                  >
                    <Link to={language === 'de' ? '/genres' : '/en/genres'}>
                      {language === 'de' ? 'Mehr erfahren' : 'Learn more'}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

