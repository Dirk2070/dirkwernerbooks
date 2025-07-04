import requests
from bs4 import BeautifulSoup
import json
import time
import re
from datetime import datetime
from urllib.parse import quote

class DirkWernerBookScraper:
    def __init__(self):
        self.author_name = "Dirk Werner"
        self.author_id = "B0CB9KB4QT"  # Ihre Autor-ID
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache',
            'Upgrade-Insecure-Requests': '1'
        }
        self.books = {}
        self.debug = True
        
    def search_author_books(self, marketplace='de'):
        """Sucht Bücher über die Amazon-Suche"""
        domain = 'amazon.de' if marketplace == 'de' else 'amazon.com'
        
        # Verschiedene Suchanfragen
        search_queries = [
            f'"{self.author_name}" bücher',
            f'"{self.author_name}" author',
            f'"Dirk Werner" "How to Recognize Cults"',
            f'"Dirk Werner" "Self-Love Over Perfection"',
            f'"Dirk Werner" "Battle Within"'
        ]
        
        all_books_found = 0
        
        for query in search_queries:
            search_url = f"https://www.{domain}/s?k={quote(query)}&i=stripbooks"
            print(f"\nSuche nach: {query}")
            print(f"URL: {search_url}")
            
            try:
                response = requests.get(search_url, headers=self.headers)
                if response.status_code != 200:
                    print(f"❌ Status Code: {response.status_code}")
                    continue
                    
                soup = BeautifulSoup(response.content, 'html.parser')
                
                # Debug speichern
                if self.debug and all_books_found == 0:
                    with open(f'debug_search_{marketplace}.html', 'w', encoding='utf-8') as f:
                        f.write(soup.prettify()[:10000])
                
                # Suchergebnisse durchsuchen
                results = soup.find_all('div', {'data-asin': True, 'data-index': True})
                
                for result in results:
                    asin = result.get('data-asin')
                    if not asin or len(asin) != 10:
                        continue
                    
                    # Titel extrahieren
                    title_elem = result.find(['h2', 'span'], class_=['a-size-mini', 'a-size-base', 'a-size-medium'])
                    if not title_elem:
                        title_elem = result.find('h2')
                    
                    title = title_elem.text.strip() if title_elem else ""
                    
                    # Autor prüfen
                    author_elem = result.find(['span', 'a'], class_='a-size-base')
                    author_text = author_elem.text.strip() if author_elem else ""
                    
                    # Nur Bücher von Dirk Werner
                    if 'Dirk Werner' in author_text or 'Dirk Werner' in title:
                        if asin not in self.books:
                            self.books[asin] = {
                                'asin': asin,
                                'titles': {},
                                'formats': set(),
                                'urls': {},
                                'marketplaces': []
                            }
                        
                        self.books[asin]['titles'][marketplace] = title
                        self.books[asin]['urls'][marketplace] = f"https://www.{domain}/dp/{asin}"
                        if marketplace not in self.books[asin]['marketplaces']:
                            self.books[asin]['marketplaces'].append(marketplace)
                        
                        # Format erkennen
                        format_text = result.text.lower()
                        if 'kindle' in format_text:
                            self.books[asin]['formats'].add('ebook')
                        if 'taschenbuch' in format_text or 'paperback' in format_text:
                            self.books[asin]['formats'].add('print')
                        if 'audible' in format_text or 'hörbuch' in format_text:
                            self.books[asin]['formats'].add('audio')
                        
                        print(f"  📚 Gefunden: {title} (ASIN: {asin})")
                        all_books_found += 1
                
                time.sleep(2)  # Höflichkeitspause
                
            except Exception as e:
                print(f"❌ Fehler bei Suche: {e}")
                import traceback
                traceback.print_exc()
        
        print(f"\nGesamt gefunden über Suche: {all_books_found} Bücher")
        return all_books_found > 0

    def scrape_direct_urls(self):
        """Direktes Scraping bekannter Buch-URLs"""
        known_books = [
            {
                'url': 'https://www.amazon.de/dp/B0DQKXWYKY',
                'title': 'How to Recognize Cults',
                'title_de': 'Wie man Sekten erkennt'
            },
            {
                'url': 'https://www.amazon.de/dp/B0D5K8M4N9',
                'title': 'Self-Love Over Perfection',
                'title_de': 'Selbstliebe statt Perfektion'
            },
            # Fügen Sie hier weitere bekannte Bücher hinzu
        ]
        
        print("\nPrüfe bekannte Buch-URLs...")
        
        for book_info in known_books:
            url = book_info['url']
            asin_match = re.search(r'/dp/([A-Z0-9]{10})', url)
            
            if asin_match:
                asin = asin_match.group(1)
                
                try:
                    response = requests.get(url, headers=self.headers)
                    if response.status_code == 200:
                        soup = BeautifulSoup(response.content, 'html.parser')
                        
                        # Titel von der Produktseite
                        title_elem = soup.find('span', {'id': 'productTitle'})
                        page_title = title_elem.text.strip() if title_elem else book_info['title']
                        
                        if asin not in self.books:
                            self.books[asin] = {
                                'asin': asin,
                                'titles': {},
                                'formats': set(),
                                'urls': {},
                                'marketplaces': []
                            }
                        
                        self.books[asin]['titles']['de'] = book_info.get('title_de', page_title)
                        self.books[asin]['titles']['en'] = book_info['title']
                        self.books[asin]['urls']['de'] = url
                        self.books[asin]['marketplaces'].append('de')
                        
                        print(f"  ✓ {book_info['title']} (ASIN: {asin})")
                    
                    time.sleep(1)
                    
                except Exception as e:
                    print(f"  ❌ Fehler bei {url}: {e}")

    def scrape_books2read(self):
        """Books2Read Alternative mit besserem Parsing"""
        urls = [
            "https://books2read.com/author/dirk-werner",
            "https://books2read.com/u/Dirk-Werner",
            "https://books2read.com/ap/xBvOOl/Dirk-Werner"  # Beispiel-URL
        ]
        
        print("\nScraping Books2Read...")
        
        for url in urls:
            print(f"Versuche URL: {url}")
            
            try:
                response = requests.get(url, headers=self.headers)
                if response.status_code != 200:
                    continue
                    
                soup = BeautifulSoup(response.content, 'html.parser')
                
                # Speichere Debug-HTML
                if self.debug:
                    with open('debug_books2read_full.html', 'w', encoding='utf-8') as f:
                        f.write(response.text)
                
                # Suche nach Büchern mit verschiedenen Patterns
                patterns = [
                    soup.find_all('div', class_=re.compile(r'book', re.I)),
                    soup.find_all('article', class_=re.compile(r'book', re.I)),
                    soup.find_all(['div', 'article'], {'itemtype': 'http://schema.org/Book'}),
                    soup.find_all('a', href=re.compile(r'/b/[A-Za-z0-9]+'))
                ]
                
                books_found = 0
                
                for elements in patterns:
                    if not elements:
                        continue
                        
                    for elem in elements:
                        # Titel finden
                        title_elem = elem.find(['h2', 'h3', 'h4', 'a'])
                        if title_elem:
                            title = title_elem.text.strip()
                            
                            # Amazon-Links suchen
                            amazon_links = elem.find_all('a', href=re.compile(r'amazon', re.I))
                            if not amazon_links and elem.parent:
                                amazon_links = elem.parent.find_all('a', href=re.compile(r'amazon', re.I))
                            
                            for link in amazon_links:
                                href = link.get('href', '')
                                asin_match = re.search(r'/dp/([A-Z0-9]{10})', href)
                                if asin_match:
                                    asin = asin_match.group(1)
                                    
                                    if asin not in self.books:
                                        self.books[asin] = {
                                            'asin': asin,
                                            'titles': {'books2read': title},
                                            'formats': set(),
                                            'urls': {},
                                            'marketplaces': [],
                                            'books2read': True
                                        }
                                    
                                    print(f"  📚 Books2Read: {title} (ASIN: {asin})")
                                    books_found += 1
                                    break
                
                if books_found > 0:
                    print(f"Books2Read: {books_found} Bücher gefunden")
                    return True
                    
            except Exception as e:
                print(f"❌ Fehler bei Books2Read {url}: {e}")
        
        return False

    def match_german_english_titles(self):
        """Erweiterte Titel-Zuordnung"""
        known_translations = {
            'How to Recognize Cults': 'Wie man Sekten erkennt',
            'Self-Love Over Perfection': 'Selbstliebe statt Perfektion',
            'The Battle Within': 'Der innere Kampf',
            'Fatal Trance': 'Verhängnisvolle Trance',
            'Deadly Echo': 'Tödliches Echo',
            'The Legacy of the Lodges': 'Das Vermächtnis der Logen',
            'Seminar of Hearts': 'Seminar der Herzen',
            'The Dignity of the Psyche': 'Die Würde der Psyche',
            'Emotional Inferno': 'Emotionales Inferno',
            'Love and Distance': 'Liebe und Distanz',
            'Case Solved': 'Fall gelöst',
            'Shadows of Arcanum': 'Schatten von Arcanum',
            'Nanogenesis': 'Nanogenesis',
            'Lyra Code': 'Lyra Code',
            'Simulation Conspiracy': 'Simulationsverschwörung'
        }
        
        for asin, book_data in self.books.items():
            # Alle verfügbaren Titel sammeln
            all_titles = ' '.join(book_data['titles'].values())
            
            # Übersetzungen zuordnen
            for en, de in known_translations.items():
                if en.lower() in all_titles.lower():
                    if not book_data['titles'].get('de'):
                        book_data['titles']['de_matched'] = de
                    if not book_data['titles'].get('en'):
                        book_data['titles']['en_matched'] = en
                elif de.lower() in all_titles.lower():
                    if not book_data['titles'].get('en'):
                        book_data['titles']['en_matched'] = en
                    if not book_data['titles'].get('de'):
                        book_data['titles']['de_matched'] = de

    def detect_genre(self, title):
        """Erweiterte Genre-Erkennung"""
        genre_keywords = {
            'psychology': ['Cult', 'Self-Love', 'Battle Within', 'Psychologie', 'Therapie', 'Emotional', 'Mental', 'Sekten', 'Selbstliebe'],
            'thriller': ['Trance', 'Echo', 'Logen', 'Tod', 'Verhängnis', 'Case', 'Mystery', 'Fatal', 'Deadly'],
            'relationship': ['Beziehung', 'Herzschmerz', 'Liebe', 'Love', 'Distance', 'Heart', 'Seminar'],
            'fiction': ['Shadows', 'Nanogenesis', 'Simulation', 'Matrix', 'Chronicles', 'Lyra', 'Code', 'Arcanum'],
            'philosophy': ['Würde', 'Psyche', 'Dignity', 'Philosophy']
        }
        
        title_lower = title.lower()
        for genre, keywords in genre_keywords.items():
            for keyword in keywords:
                if keyword.lower() in title_lower:
                    return genre
        return 'general'

    def save_results(self):
        """Speichert die Ergebnisse"""
        books_list = []
        
        for asin, book_data in self.books.items():
            # Beste verfügbare Titel wählen
            title_de = (book_data['titles'].get('de_full') or 
                       book_data['titles'].get('de') or
                       book_data['titles'].get('de_matched', ''))
            
            title_en = (book_data['titles'].get('en_full') or 
                       book_data['titles'].get('en') or
                       book_data['titles'].get('en_matched', ''))
            
            # Falls kein Titel gefunden, Books2Read verwenden
            if not title_de and not title_en:
                books2read_title = book_data['titles'].get('books2read', '')
                if books2read_title:
                    if any(word in books2read_title.lower() for word in ['der', 'die', 'das', 'und']):
                        title_de = books2read_title
                    else:
                        title_en = books2read_title
            
            book_info = {
                'asin': asin,
                'asin_de': asin if 'de' in book_data['marketplaces'] else None,
                'asin_en': asin if 'en' in book_data['marketplaces'] else None,
                'title': title_de or title_en or book_data['titles'].get('books2read', ''),
                'title_de': title_de,
                'title_en': title_en,
                'formats': list(book_data['formats']) if book_data['formats'] else ['ebook'],
                'genre': self.detect_genre(title_de or title_en),
                'url_de': book_data['urls'].get('de', ''),
                'url_en': book_data['urls'].get('en', ''),
                'cover_url': f"https://images-na.ssl-images-amazon.com/images/P/{asin}.01.LZZZZZZZ.jpg",
                'from_books2read': book_data.get('books2read', False)
            }
            
            books_list.append(book_info)
        
        # Nach Genre und dann Titel sortieren
        books_list.sort(key=lambda x: (x['genre'], x['title'] or x['title_en'] or ''))
        
        # JSON speichern
        with open('dirk_werner_books.json', 'w', encoding='utf-8') as f:
            json.dump(books_list, f, ensure_ascii=False, indent=2)
        
        # JavaScript-Array
        js_array = "const books = " + json.dumps(books_list, ensure_ascii=False, indent=2) + ";"
        with open('books_array.js', 'w', encoding='utf-8') as f:
            f.write(js_array)
        
        # CSV
        import csv
        with open('dirk_werner_books.csv', 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=['asin', 'title_de', 'title_en', 'formats', 'genre', 'url_de'])
            writer.writeheader()
            for book in books_list:
                writer.writerow({
                    'asin': book['asin'],
                    'title_de': book['title_de'],
                    'title_en': book['title_en'],
                    'formats': ', '.join(book['formats']),
                    'genre': book['genre'],
                    'url_de': book['url_de']
                })
        
        print(f"\n✅ {len(books_list)} Bücher erfolgreich gespeichert!")
        print("📁 Dateien erstellt:")
        print("   - dirk_werner_books.json")
        print("   - books_array.js")
        print("   - dirk_werner_books.csv")
        
        # Zusammenfassung anzeigen
        print("\n📊 Gefundene Bücher:")
        for book in books_list:
            print(f"  - {book['title'] or book['title_en']} ({book['asin']}) - {book['genre']}")

    def run(self):
        """Führt den kompletten Scraping-Prozess aus"""
        print("🚀 Starte Dirk Werner Bücher-Scraper v2...")
        print(f"⏰ Start: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        
        # Methode 1: Direkte URLs
        self.scrape_direct_urls()
        
        # Methode 2: Amazon-Suche
        self.search_author_books('de')
        time.sleep(2)
        self.search_author_books('en')
        time.sleep(2)
        
        # Methode 3: Books2Read
        self.scrape_books2read()
        
        # Titel matchen
        self.match_german_english_titles()
        
        # Ergebnisse speichern
        self.save_results()
        
        print(f"\n✅ Scraping abgeschlossen!")
        print(f"⏰ Ende: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

if __name__ == "__main__":
    scraper = DirkWernerBookScraper()
    scraper.run()