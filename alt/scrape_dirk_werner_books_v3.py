import requests
from bs4 import BeautifulSoup
import json
import time
import re
from datetime import datetime

class DirkWernerBookScraper:
    def __init__(self):
        self.author_name = "Dirk Werner"
        self.author_id = "B0CB9KB4QT"
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Connection': 'keep-alive',
        }
        self.books = {}
        
        # Ihre bekannten ASINs
        self.known_asins = [
            'B0CW1G3XR6', 'B0DNBSQXXL', 'B0DY7K1148', 'B0DV56DC5P',
            'B0DQKXWYKY', 'B0D5K8M4N9', 'B0CJB4SJVL', 'B0D1N8DK8V',
            'B0D8VRG91Y', 'B0D6PXSNF2', 'B0CW6X8KNR', 'B0D8Q8G5VF',
            'B0D8JQ46ZX', 'B0DGBF3HRN', 'B0D1N84R38', 'B0D28FCMZK',
            'B0D8NT9T86', 'B0DGBCQRSX', 'B0D1N8P89T', 'B0DJN15Q3J'
        ]
        
    def scrape_by_asins(self):
        """Holt Informationen direkt über ASINs"""
        print("Hole Bücher über bekannte ASINs...")
        
        for asin in self.known_asins:
            # Versuche beide Marktplätze
            for marketplace, domain in [('de', 'amazon.de'), ('en', 'amazon.com')]:
                url = f"https://www.{domain}/dp/{asin}"
                
                try:
                    response = requests.get(url, headers=self.headers)
                    if response.status_code == 404:
                        continue
                        
                    soup = BeautifulSoup(response.content, 'html.parser')
                    
                    # Titel extrahieren
                    title_elem = soup.find('span', {'id': 'productTitle'})
                    if not title_elem:
                        # Alternative Titel-Selektoren
                        title_elem = soup.find('h1', {'id': 'title'})
                        if title_elem:
                            title_elem = title_elem.find('span')
                    
                    if title_elem:
                        title = title_elem.text.strip()
                        
                        # ASIN zu books hinzufügen
                        if asin not in self.books:
                            self.books[asin] = {
                                'asin': asin,
                                'titles': {},
                                'formats': set(),
                                'urls': {},
                                'marketplaces': [],
                                'authors': set()
                            }
                        
                        self.books[asin]['titles'][marketplace] = title
                        self.books[asin]['urls'][marketplace] = url
                        if marketplace not in self.books[asin]['marketplaces']:
                            self.books[asin]['marketplaces'].append(marketplace)
                        
                        # Autor verifizieren
                        author_elem = soup.find('span', class_='author')
                        if author_elem:
                            author_text = author_elem.text.strip()
                            if 'Dirk Werner' in author_text:
                                self.books[asin]['authors'].add('Dirk Werner')
                        
                        # Format erkennen
                        format_elem = soup.find('div', {'id': 'tmm-grid-swatch-KINDLE'})
                        if format_elem or 'kindle' in url.lower():
                            self.books[asin]['formats'].add('ebook')
                        
                        format_elem = soup.find('div', {'id': 'tmm-grid-swatch-PAPERBACK'})
                        if format_elem:
                            self.books[asin]['formats'].add('print')
                        
                        # Preis
                        price_elem = soup.find('span', class_='a-price-whole')
                        if price_elem:
                            self.books[asin]['price_' + marketplace] = price_elem.text.strip()
                        
                        print(f"  ✓ {title[:60]}... ({asin}) - {marketplace.upper()}")
                        break  # Erfolgreich gefunden, nächste ASIN
                        
                except Exception as e:
                    if 'Errno 11001' not in str(e):  # Ignoriere DNS-Fehler
                        print(f"  ❌ Fehler bei {asin} auf {domain}: {e}")
                
                time.sleep(1)  # Höflichkeitspause

    def get_additional_books_from_author_page(self):
        """Versucht zusätzliche Bücher von der Autorenseite zu finden"""
        print("\nSuche nach zusätzlichen Büchern auf der Autorenseite...")
        
        for marketplace, domain in [('de', 'amazon.de'), ('com', 'amazon.com')]:
            # Direkte Autorenseite
            author_url = f"https://www.{domain}/stores/author/{self.author_id}"
            print(f"Prüfe: {author_url}")
            
            try:
                response = requests.get(author_url, headers=self.headers)
                if response.status_code == 200:
                    soup = BeautifulSoup(response.content, 'html.parser')
                    
                    # Suche nach Produkt-Links
                    links = soup.find_all('a', href=re.compile(r'/dp/[A-Z0-9]{10}'))
                    
                    for link in links:
                        href = link.get('href', '')
                        asin_match = re.search(r'/dp/([A-Z0-9]{10})', href)
                        
                        if asin_match:
                            asin = asin_match.group(1)
                            if asin not in self.books and asin not in self.known_asins:
                                self.known_asins.append(asin)
                                print(f"  + Neue ASIN gefunden: {asin}")
                
            except Exception as e:
                print(f"  Fehler beim Abrufen der Autorenseite: {e}")
            
            time.sleep(2)

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
            'Between Pride and Downfall': 'Zwischen Stolz und Fall',
            'Case Solved': 'Fall gelöst',
            'Shadows of Arcanum': 'Schatten von Arcanum',
            'Nanogenesis': 'Nanogenesis',
            'Lyra Code': 'Lyra Code',
            'Simulation Conspiracy': 'Simulationsverschwörung',
            'Immersed': 'Eingetaucht',
            'Ensnared': 'Verstrickt',
            'What Influences Therapy': 'Was Therapie beeinflusst',
            'The Challenge of Suicide': 'Die Herausforderung Suizid'
        }
        
        for asin, book_data in self.books.items():
            # Sammle alle Titel
            all_titles = ' '.join(book_data['titles'].values())
            
            # Versuche Übersetzungen zu finden
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
        """Genre-Erkennung basierend auf Titel"""
        title_lower = title.lower()
        
        genre_keywords = {
            'psychology': ['cult', 'sekten', 'self-love', 'selbstliebe', 'battle within', 'innere kampf', 
                          'therapy', 'therapie', 'suicide', 'suizid', 'emotional', 'psyche', 'würde'],
            'thriller': ['trance', 'echo', 'logen', 'lodges', 'fatal', 'deadly', 'tödlich', 'verhängnis',
                        'case', 'fall', 'mystery', 'shadows', 'schatten'],
            'relationship': ['love', 'liebe', 'distance', 'distanz', 'heart', 'herz', 'seminar', 
                           'beziehung', 'relationship'],
            'fiction': ['arcanum', 'nanogenesis', 'simulation', 'matrix', 'lyra', 'code', 
                       'conspiracy', 'verschwörung', 'immersed', 'ensnared'],
            'philosophy': ['dignity', 'würde', 'pride', 'stolz', 'downfall', 'fall']
        }
        
        for genre, keywords in genre_keywords.items():
            for keyword in keywords:
                if keyword in title_lower:
                    return genre
        
        return 'general'

    def save_results(self):
        """Speichert die Ergebnisse"""
        books_list = []
        
        for asin, book_data in self.books.items():
            # Beste verfügbare Titel wählen
            title_de = (book_data['titles'].get('de') or 
                       book_data['titles'].get('de_matched', ''))
            
            title_en = (book_data['titles'].get('en') or 
                       book_data['titles'].get('en_matched', ''))
            
            # Haupttitel bestimmen
            main_title = title_de or title_en
            
            # Formate
            formats = list(book_data['formats']) if book_data['formats'] else ['ebook']
            
            book_info = {
                'asin': asin,
                'asin_de': asin if 'de' in book_data['marketplaces'] else None,
                'asin_en': asin if 'en' in book_data['marketplaces'] else None,
                'title': main_title,
                'title_de': title_de,
                'title_en': title_en,
                'formats': formats,
                'genre': self.detect_genre(main_title),
                'url_de': book_data['urls'].get('de', ''),
                'url_en': book_data['urls'].get('en', ''),
                'cover_url': f"https://images-na.ssl-images-amazon.com/images/P/{asin}.01.LZZZZZZZ.jpg",
                'author': 'Dirk Werner'
            }
            
            books_list.append(book_info)
        
        # Nach Genre und Titel sortieren
        books_list.sort(key=lambda x: (x['genre'], x['title'] or ''))
        
        # JSON speichern
        with open('dirk_werner_books.json', 'w', encoding='utf-8') as f:
            json.dump(books_list, f, ensure_ascii=False, indent=2)
        
        # JavaScript-Array
        js_content = f"""// Dirk Werner Books Data
// Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

const books = {json.dumps(books_list, ensure_ascii=False, indent=2)};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {{
    module.exports = books;
}}
"""
        with open('books_array.js', 'w', encoding='utf-8') as f:
            f.write(js_content)
        
        # CSV für Übersicht
        import csv
        with open('dirk_werner_books.csv', 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=['asin', 'title', 'title_de', 'title_en', 'formats', 'genre'])
            writer.writeheader()
            for book in books_list:
                writer.writerow({
                    'asin': book['asin'],
                    'title': book['title'],
                    'title_de': book['title_de'],
                    'title_en': book['title_en'],
                    'formats': ', '.join(book['formats']),
                    'genre': book['genre']
                })
        
        print(f"\n✅ {len(books_list)} Bücher erfolgreich gespeichert!")
        print("📁 Dateien erstellt:")
        print("   - dirk_werner_books.json")
        print("   - books_array.js")
        print("   - dirk_werner_books.csv")
        
        # Zusammenfassung
        print("\n📊 Zusammenfassung nach Genre:")
        genre_count = {}
        for book in books_list:
            genre = book['genre']
            genre_count[genre] = genre_count.get(genre, 0) + 1
        
        for genre, count in sorted(genre_count.items()):
            print(f"   - {genre}: {count} Bücher")

    def run(self):
        """Führt den Scraping-Prozess aus"""
        print("🚀 Starte Dirk Werner Bücher-Scraper v3...")
        print(f"⏰ Start: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        
        # Schritt 1: Bekannte ASINs abrufen
        self.scrape_by_asins()
        
        # Schritt 2: Zusätzliche Bücher suchen
        self.get_additional_books_from_author_page()
        
        # Schritt 3: Neu gefundene ASINs abrufen
        if len(self.known_asins) > 20:
            print(f"\n{len(self.known_asins) - 20} neue ASINs gefunden, hole Details...")
            self.scrape_by_asins()
        
        # Schritt 4: Titel matchen
        self.match_german_english_titles()
        
        # Schritt 5: Ergebnisse speichern
        self.save_results()
        
        print(f"\n✅ Scraping abgeschlossen!")
        print(f"⏰ Ende: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

if __name__ == "__main__":
    scraper = DirkWernerBookScraper()
    scraper.run()