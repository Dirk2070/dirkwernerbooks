import { useState } from 'react'
import { ExternalLink, Filter, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/contexts/LanguageContext'
import { booksData, genres } from '@/lib/books-data'

const Books = () => {
  const { language, t } = useLanguage()
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const filteredBooks = booksData.filter(book => 
    selectedGenre === 'all' || book.genre === selectedGenre
  )

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title[language].localeCompare(b.title[language])
      case 'genre':
        return a.genre.localeCompare(b.genre)
      case 'newest':
      default:
        return b.year - a.year
    }
  })

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('books.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('books.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedGenre === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedGenre('all')}
            >
              {t('books.filterAll')}
            </Button>
            {Object.entries(genres).map(([key, genre]) => (
              <Button
                key={key}
                variant={selectedGenre === key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedGenre(key)}
                style={{
                  backgroundColor: selectedGenre === key ? genre.color : undefined,
                  borderColor: genre.color
                }}
              >
                {genre.icon} {genre.name[language]}
              </Button>
            ))}
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
          >
            <option value="newest">{t('books.sortNewest')}</option>
            <option value="title">{t('books.sortTitle')}</option>
            <option value="genre">{t('books.sortGenre')}</option>
          </select>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedBooks.map((book) => (
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
                
                <div className="space-y-3">
                  {/* Genre Badge */}
                  <div className="flex items-center space-x-2">
                    <span 
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: genres[book.genre]?.color }}
                    ></span>
                    <span className="text-sm text-muted-foreground">
                      {genres[book.genre]?.name[language]}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-foreground line-clamp-2 leading-tight">
                    {book.title[language]}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {book.description[language]}
                  </p>

                  {/* Year and Formats */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      {t('books.year')}: {book.year}
                    </span>
                    <div className="flex space-x-1">
                      {book.formats.includes('ebook') && <span className="text-sm" title="eBook">📱</span>}
                      {book.formats.includes('print') && <span className="text-sm" title="Print">📖</span>}
                      {book.formats.includes('audiobook') && <span className="text-sm" title="Audiobook">🎧</span>}
                    </div>
                  </div>

                  {/* Shop Links */}
                  <div className="space-y-2 pt-2 border-t border-border">
                    <div className="text-sm font-medium text-foreground">
                      {t('books.shopLinks')}:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {book.shops.books2read && (
                        <Button asChild size="sm" variant="outline" className="text-xs">
                          <a href={book.shops.books2read} target="_blank" rel="noopener noreferrer">
                            📚 Books2Read
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </Button>
                      )}
                      {book.shops.amazon_de && (
                        <Button asChild size="sm" variant="outline" className="text-xs">
                          <a href={book.shops.amazon_de} target="_blank" rel="noopener noreferrer">
                            🛒 Amazon.de
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </Button>
                      )}
                      {book.shops.apple_books && (
                        <Button asChild size="sm" variant="outline" className="text-xs">
                          <a href={book.shops.apple_books} target="_blank" rel="noopener noreferrer">
                            🍎 Apple Books
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            {language === 'de' 
              ? `${sortedBooks.length} von ${booksData.length} Büchern angezeigt`
              : `Showing ${sortedBooks.length} of ${booksData.length} books`
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default Books

