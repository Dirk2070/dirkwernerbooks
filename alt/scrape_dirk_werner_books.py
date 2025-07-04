import requests
from bs4 import BeautifulSoup
import json
import time
import re
from datetime import datetime

class DirkWernerBookScraper:
    def __init__(self):
        self.author_id = "B0CB9KB4QT"
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Connection': 'keep-alive',
        }
        self.books = {}
        
    def get_book_details_from_page(self, asin, marketplace='de'):
        """Holt detaillierte Informationen von der Produktseite"""
        domain = 'amazon.de' if marketplace == 'de' else 'amazon.com'
        url = f"https://www.{domain}/dp/{asin}"
        
        try:
            response = requests.get(url, headers=self.headers)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Titel extrahieren
            title_elem = soup.find('span', {'id': 'productTitle'})
            title = title_elem.text.strip() if title_elem else ""
            
            # Untertitel falls vorhanden
            subtitle_elem = soup.find('span', {'id': 'productSubtitle'})
            if subtitle_elem:
                title += ": " + subtitle_elem.text.strip()
            
            # Format erkennen
            format_info = []
            
            # Kindle/E-Book Check
            if soup.find(text=re.compile(r'Kindle|E-Book', re.I)):
                format_info.append('ebook')
            
            # Taschenbuch/Paperback Check
            if soup.find(text=re.compile(r'Taschenbuch|Paperback|Broschiert', re.I)):
                format_info.append('print')
            
            # Hörbuch Check
            if soup.find(text=re.compile(r'Audible|Hörbuch|Audio', re.I)):
                format_info.append('audio')
            
            # Preis
            price_elem = soup.find('span', class_='a-price-whole')
            price = price_elem.text.strip() if price_elem else ""
            
            return {
                'title': title,
                'formats': format_info,
                'price': price,
                'url': url
            }
            
        except Exception as e:
            print(f"Fehler beim Abrufen von Details für ASIN {asin}: {e}")
            return None

    def scrape_author_page(self, marketplace='de'):
        """Scraped die Autorenseite für alle Bücher"""
        domain = 'amazon.de' if marketplace == 'de' else 'amazon.com'
        base_url = f"https://www.{domain}/stores/author/{self.author_id}/allbooks"
        
        print(f"Scraping {marketplace.upper()} Amazon Autorenseite...")
        
        try:
            response = requests.get(base_url, headers=self.headers)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Methode 1: data-asin Attribute
            products = soup.find_all(attrs={'data-asin': True})
            
            for product in products:
                asin = product.get('data-asin')
                if not asin or len(asin) != 10:
                    continue
                
                # Basis-Informationen aus der Übersichtsseite
                title_elem = product.find(['h2', 'span'], class_=re.compile(r'a-size-.*|a-text-normal'))
                title = title_elem.text.strip() if title_elem else ""
                
                # Link zum Produkt
                link_elem = product.find('a', class_='a-link-normal')
                link = f"https://www.{domain}{link_elem.get('href')}" if link_elem else ""
                
                # Buch zu Dictionary hinzufügen
                if asin not in self.books:
                    self.books[asin] = {
                        'asin': asin,
                        'titles': {},
                        'formats': set(),
                        'urls': {},
                        'marketplaces': []
                    }
                
                # Marketplace-spezifische Daten speichern
                self.books[asin]['titles'][marketplace] = title
                self.books[asin]['urls'][marketplace] = link
                self.books[asin]['marketplaces'].append(marketplace)
                
                print(f"Gefunden: {title} (ASIN: {asin})")
            
            # Methode 2: Alternative Selektoren falls data-asin nicht funktioniert
            if not products:
                links = soup.find_all('a', href=re.compile(r'/dp/[A-Z0-9]{10}'))
                for link in links:
                    href = link.get('href', '')
                    asin_match = re.search(r'/dp/([A-Z0-9]{10})', href)
                    if asin_match:
                        asin = asin_match.group(1)
                        title = link.text.strip() or link.get('title', '').strip()
                        
                        if asin not in self.books:
                            self.books[asin] = {
                                'asin': asin,
                                'titles': {},
                                'formats': set(),
                                'urls': {},
                                'marketplaces': []
                            }
                        
                        self.books[asin]['titles'][marketplace] = title
                        self.books[asin]['urls'][marketplace] = f"https://www.{domain}{href}"
                        self.books[asin]['marketplaces'].append(marketplace)
            
            return True
            
        except Exception as e:
            print(f"Fehler beim Scraping der {marketplace.upper()} Seite: {e}")
            return False

    def scrape_books2read(self):
        """Scraped Books2Read für zusätzliche Informationen und fehlende Bücher"""
        url = "https://books2read.com/Dirk-Werner-Author"
        
        print("\nScraping Books2Read...")
        
        try:
            response = requests.get(url, headers=self.headers)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Verschiedene mögliche Selektoren für Bücher auf Books2Read
            # Option 1: Suche nach Buch-Containern
            book_containers = soup.find_all(['div', 'article'], class_=re.compile(r'book|product|item', re.I))
            
            if not book_containers:
                # Option 2: Suche nach Links mit Buchtiteln
                book_containers = soup.find_all('a', href=re.compile(r'/u/|/b/'))
            
            books_found = 0
            
            for container in book_containers:
                # Titel extrahieren
                title = None
                if container.name == 'a':
                    title = container.text.strip()
                else:
                    title_elem = container.find(['h2', 'h3', 'h4', 'a'], class_=re.compile(r'title|name', re.I))
                    if not title_elem:
                        title_elem = container.find(['h2', 'h3', 'h4', 'a'])
                    if title_elem:
                        title = title_elem.text.strip()
                
                if not title:
                    continue
                
                # Amazon-Links in diesem Container oder in der Nähe finden
                if container.name == 'a':
                    # Wenn container selbst ein Link ist, suchen wir im parent
                    parent = container.parent
                    amazon_links = parent.find_all('a', href=re.compile(r'amazon', re.I)) if parent else []
                else:
                    amazon_links = container.find_all('a', href=re.compile(r'amazon', re.I))
                
                # ASINs aus Amazon-Links extrahieren
                asin_found = False
                for link in amazon_links:
                    href = link.get('href', '')
                    asin_match = re.search(r'/dp/([A-Z0-9]{10})', href)
                    if asin_match:
                        asin = asin_match.group(1)
                        asin_found = True
                        
                        # Prüfen ob ASIN bereits existiert
                        if asin not in self.books:
                            self.books[asin] = {
                                'asin': asin,
                                'titles': {},
                                'formats': set(),
                                'urls': {},
                                'marketplaces': [],
                                'books2read': True
                            }
                        
                        # Books2Read Titel hinzufügen
                        self.books[asin]['titles']['books2read'] = title
                        
                        # Marketplace aus URL bestimmen
                        if 'amazon.de' in href:
                            self.books[asin]['urls']['de'] = href
                            if 'de' not in self.books[asin]['marketplaces']:
                                self.books[asin]['marketplaces'].append('de')
                        elif 'amazon.com' in href:
                            self.books[asin]['urls']['en'] = href
                            if 'en' not in self.books[asin]['marketplaces']:
                                self.books[asin]['marketplaces'].append('en')
                        
                        print(f"Books2Read: {title} (ASIN: {asin})")
                        books_found += 1
                
                # Wenn kein ASIN gefunden wurde, trotzdem speichern für spätere Zuordnung
                if not asin_found and title:
                    # Temporär mit Titel als Schlüssel speichern
                    temp_key = f"BOOKS2READ_{title[:30]}"
                    self.books[temp_key] = {
                        'asin': None,
                        'titles': {'books2read': title},
                        'formats': set(),
                        'urls': {},
                        'marketplaces': [],
                        'books2read': True,
                        'needs_asin': True
                    }
            
            print(f"Books2Read: {books_found} Bücher mit ASINs gefunden")
            
            # Zusätzlich: Versuche Format-Informationen zu extrahieren
            format_indicators = {
                'ebook': ['kindle', 'e-book', 'ebook', 'digital'],
                'print': ['paperback', 'hardcover', 'taschenbuch', 'broschiert', 'print'],
                'audio': ['audible', 'audiobook', 'hörbuch', 'audio']
            }
            
            for asin, book_data in self.books.items():
                if 'books2read' in book_data.get('titles', {}):
                    title_lower = book_data['titles']['books2read'].lower()
                    for format_type, keywords in format_indicators.items():
                        for keyword in keywords:
                            if keyword in title_lower:
                                book_data['formats'].add(format_type)
            
            return True
            
        except Exception as e:
            print(f"Fehler beim Scraping von Books2Read: {e}")
            return False

    def get_detailed_info(self):
        """Holt detaillierte Informationen für jedes gefundene Buch"""
        print("\nHole detaillierte Informationen für jedes Buch...")
        
        for asin, book_data in self.books.items():
            # Überspringe Einträge ohne ASIN
            if not asin or asin.startswith('BOOKS2READ_'):
                continue
                
            print(f"\nVerarbeite: {book_data['titles'].get('de', book_data['titles'].get('en', book_data['titles'].get('books2read', 'Unbekannt')))}")
            
            # Details von beiden Marktplätzen holen
            for marketplace in book_data['marketplaces']:
                details = self.get_book_details_from_page(asin, marketplace)
                if details:
                    # Erweiterte Titel speichern
                    if details['title']:
                        book_data['titles'][f'{marketplace}_full'] = details['title']
                    
                    # Formate sammeln
                    if details['formats']:
                        book_data['formats'].update(details['formats'])
                    
                time.sleep(2)  # Höflichkeitspause
    
    def match_german_english_titles(self):
        """Versucht deutsche und englische Titel zu matchen"""
        # Bekannte Übersetzungen
        known_translations = {
            'How to Recognize Cults': 'Wie man Sekten erkennt',
            'Self-Love Over Perfection': 'Selbstliebe statt Perfektion',
            'The Battle Within': 'Der innere Kampf',
            'Fatal Trance': 'Verhängnisvolle Trance',
            'Deadly Echo': 'Tödliches Echo',
            'The Legacy of the Lodges': 'Das Vermächtnis der Logen',
            'Seminar of Hearts': 'Seminar der Herzen',
            'The Dignity of the Psyche': 'Die Würde der Psyche'
        }
        
        for asin, book_data in self.books.items():
            de_title = book_data['titles'].get('de', '')
            en_title = book_data['titles'].get('en', '')
            books2read_title = book_data['titles'].get('books2read', '')
            
            # Prüfen ob Übersetzung bekannt ist
            for en, de in known_translations.items():
                if en in en_title or en in books2read_title:
                    book_data['titles']['de_matched'] = de
                elif de in de_title or de in books2read_title:
                    book_data['titles']['en_matched'] = en

    def detect_genre(self, title):
        """Erkennt das Genre basierend auf dem Titel"""
        genre_keywords = {
            'psychology': ['Cult', 'Self-Love', 'Battle Within', 'Psychologie', 'Therapie', 'Suizid', 'Mental', 'Emotional'],
            'thriller': ['Trance', 'Echo', 'Logen', 'Tod', 'Verhängnis', 'Case', 'Mystery'],
            'relationship': ['Beziehung', 'Herzschmerz', 'Liebe', 'Tests', 'Relationship', 'Love'],
            'fiction': ['Shadows', 'Nanogenesis', 'Simulation', 'Matrix', 'Chronicles', 'Lyra', 'Code'],
            'philosophy': ['Würde', 'Psyche', 'Dignity', 'Philosophy']
        }
        
        title_lower = title.lower()
        for genre, keywords in genre_keywords.items():
            for keyword in keywords:
                if keyword.lower() in title_lower:
                    return genre
        return 'general'

    def save_results(self):
        """Speichert die Ergebnisse in verschiedenen Formaten"""
        # Konvertiere sets zu lists für JSON-Serialisierung
        books_list = []
        
        for asin, book_data in self.books.items():
            # Überspringe Einträge ohne gültige ASIN
            if not asin or asin.startswith('BOOKS2READ_'):
                if book_data.get('needs_asin'):
                    print(f"⚠️  Buch ohne ASIN gefunden: {book_data['titles'].get('books2read', 'Unbekannt')}")
                continue
            
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
                    # Versuchen Sprache zu erkennen
                    if any(word in books2read_title.lower() for word in ['der', 'die', 'das', 'und', 'für']):
                        title_de = books2read_title
                    else:
                        title_en = books2read_title
            
            book_info = {
                'asin': asin,
                'asin_de': asin if 'de' in book_data['marketplaces'] else None,
                'asin_en': asin if 'en' in book_data['marketplaces'] else None,
                'title': title_de or title_en,
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
        
        # Nach Titel sortieren
        books_list.sort(key=lambda x: x['title'] or x['title_en'] or '')
        
        # JSON-Datei speichern
        with open('dirk_werner_books.json', 'w', encoding='utf-8') as f:
            json.dump(books_list, f, ensure_ascii=False, indent=2)
        
        # JavaScript-Array für direkte Verwendung
        js_array = "const books = " + json.dumps(books_list, ensure_ascii=False, indent=2) + ";"
        with open('books_array.js', 'w', encoding='utf-8') as f:
            f.write(js_array)
        
        # CSV für Übersicht
        import csv
        with open('dirk_werner_books.csv', 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=['asin', 'title_de', 'title_en', 'formats', 'genre', 'from_books2read'])
            writer.writeheader()
            for book in books_list:
                writer.writerow({
                    'asin': book['asin'],
                    'title_de': book['title_de'],
                    'title_en': book['title_en'],
                    'formats': ', '.join(book['formats']),
                    'genre': book['genre'],
                    'from_books2read': book['from_books2read']
                })
        
        print(f"\n✅ {len(books_list)} Bücher erfolgreich gespeichert!")
        print("📁 Dateien erstellt:")
        print("   - dirk_werner_books.json")
        print("   - books_array.js")
        print("   - dirk_werner_books.csv")

    def run(self):
        """Führt den kompletten Scraping-Prozess aus"""
        print("🚀 Starte Dirk Werner Bücher-Scraper...")
        print(f"⏰ Start: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        
        # Schritt 1: Deutsche Amazon-Seite
        self.scrape_author_page('de')
        time.sleep(3)
        
        # Schritt 2: US Amazon-Seite
        self.scrape_author_page('en')
        time.sleep(3)
        
        # Schritt 3: Books2Read scrapen
        self.scrape_books2read()
        time.sleep(2)
        
        # Schritt 4: Detaillierte Informationen (optional - dauert länger)
        # self.get_detailed_info()
        
        # Schritt 5: Titel matchen
        self.match_german_english_titles()
        
        # Schritt 6: Ergebnisse speichern
        self.save_results()
        
        print(f"\n✅ Scraping abgeschlossen!")
        print(f"⏰ Ende: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

# Script ausführen
if __name__ == "__main__":
    scraper = DirkWernerBookScraper()
    scraper.run()