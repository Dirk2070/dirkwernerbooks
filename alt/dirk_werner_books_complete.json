import requests
from bs4 import BeautifulSoup
import json
import time
import re
from datetime import datetime
import csv

class DirkWernerBookScraper:
    def __init__(self):
        self.author_name = "Dirk Werner"
        self.author_id = "B0CB9KB4QT"
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        }
        self.session = requests.Session()
        self.session.headers.update(self.headers)
        self.books = {}
        
        # Ihre vollständige ASIN-Liste von Amazon.de
        self.known_asins = [
            'B0CW1G3XR6', 'B0DNBSQXXL', 'B0DY7K1148', 'B0DV56DC5P',
            'B0DT7F2VVS', 'B0DS9Y8W5V', 'B0DHV3LPL1', 'B0DJL6VXDJ',
            'B0DJY7S893', 'B0DHG8WCDK', 'B0DHV6WTZQ', 'B0DJNS7TVB',
            'B0DFVQP4JT', 'B0DFD4GVKM', 'B0DDJVX6GQ', 'B0DCTZF166',
            'B0DC28N8WZ', 'B0CW1JS3B5', 'B0D9J2X8D3', 'B0D9762V4T',
            'B0D429HGV1', 'B0D4HXWHN8', 'B0D3BMXBN1', 'B0CQSM6WGQ',
            'B0CNPY5PJH', 'B0C9ZYHD9T', 'B0D7Z9D9KG', 'B0D7Q4BF74'
        ]
        
        # Bekannte Titel für bessere Zuordnung
        self.known_titles = {
            'en': [
                "How to Recognize Cults", "Self-Love Over Perfection", "The Battle Within",
                "Fatal Trance", "Deadly Echo", "The Legacy of the Lodges", 
                "Seminar of Hearts", "The Dignity of the Psyche", "Emotional Inferno",
                "Love and Distance", "Between Pride and Downfall", "Case Solved",
                "Shadows of Arcanum", "Nanogenesis", "Lyra Code", "Simulation Conspiracy",
                "Immersed", "Ensnared", "What Influences Therapy", "The Challenge of Suicide",
                "Dealing with Jealous People", "The Betrayal", "Hidden Truth",
                "Psychological Thrillers Collection", "Mind Games", "The Therapist's Secret",
                "Dark Psychology", "Mental Maze"
            ],
            'de': [
                "Wie man Sekten erkennt", "Selbstliebe statt Perfektion", "Der innere Kampf",
                "Verhängnisvolle Trance", "Tödliches Echo", "Das Vermächtnis der Logen",
                "Seminar der Herzen", "Die Würde der Psyche", "Emotionales Inferno",
                "Liebe und Distanz", "Zwischen Stolz und Fall", "Fall gelöst",
                "Schatten von Arcanum", "Nanogenesis", "Lyra Code", "Simulationsverschwörung",
                "Eingetaucht", "Verstrickt", "Was Therapie beeinflusst", "Die Herausforderung Suizid",
                "Umgang mit Eifersüchtigen", "Der Verrat", "Verborgene Wahrheit",
                "Psychothriller Sammlung", "Gedankenspiele", "Das Geheimnis des Therapeuten",
                "Dunkle Psychologie", "Mentales Labyrinth"
            ]
        }

    def get_book_details(self, asin):
        """Holt detaillierte Informationen für eine ASIN von allen Marktplätzen"""
        book_data = {
            'asin': asin,
            'titles': {},
            'formats': set(),
            'urls': {},
            'marketplaces': [],
            'prices': {},
            'series': None,
            'publication_date': None,
            'page_count': None,
            'language': [],
            'kindle_unlimited': False,
            'bestseller_rank': {}
        }
        
        # Prüfe alle wichtigen Amazon-Marktplätze
        marketplaces = [
            ('de', 'amazon.de'),
            ('com', 'amazon.com'),
            ('uk', 'amazon.co.uk'),
            ('fr', 'amazon.fr'),
            ('es', 'amazon.es'),
            ('it', 'amazon.it'),
            ('nl', 'amazon.nl'),
            ('ca', 'amazon.ca'),
            ('au', 'amazon.com.au')
        ]
        
        for marketplace, domain in marketplaces:
            url = f"https://www.{domain}/dp/{asin}"
            
            try:
                response = self.session.get(url, timeout=10)
                if response.status_code == 404:
                    continue
                
                soup = BeautifulSoup(response.content, 'html.parser')
                
                # Titel extrahieren
                title_elem = soup.find('span', {'id': 'productTitle'}) or \
                            soup.find('h1', {'id': 'title'})
                
                if title_elem:
                    if title_elem.name == 'h1':
                        title_span = title_elem.find('span')
                        title = title_span.text.strip() if title_span else title_elem.text.strip()
                    else:
                        title = title_elem.text.strip()
                    
                    # Autor verifizieren
                    author_found = False
                    author_elems = soup.find_all(['span', 'a'], class_=['author', 'contributorNameID']) + \
                                  soup.find_all('a', href=re.compile(r'/stores/author/'))
                    
                    for elem in author_elems:
                        if 'Dirk Werner' in elem.text:
                            author_found = True
                            break
                    
                    if not author_found and marketplace == 'de':
                        # Bei deutschen Büchern trotzdem speichern (da wir die ASINs kennen)
                        author_found = True
                    
                    if author_found:
                        book_data['titles'][marketplace] = title
                        book_data['urls'][marketplace] = url
                        book_data['marketplaces'].append(marketplace)
                        
                        # Preis extrahieren
                        price_elem = soup.find('span', class_='a-price-whole') or \
                                    soup.find('span', class_='a-price-range')
                        if price_elem:
                            book_data['prices'][marketplace] = price_elem.text.strip()
                        
                        # Kindle Unlimited prüfen
                        if 'kindle unlimited' in soup.text.lower():
                            book_data['kindle_unlimited'] = True
                        
                        # Format erkennen
                        format_section = soup.find('div', id='formats')
                        if format_section:
                            format_text = format_section.text.lower()
                        else:
                            format_text = soup.text.lower()
                        
                        if 'kindle' in format_text or 'ebook' in format_text:
                            book_data['formats'].add('ebook')
                        if 'taschenbuch' in format_text or 'paperback' in format_text:
                            book_data['formats'].add('paperback')
                        if 'gebunden' in format_text or 'hardcover' in format_text:
                            book_data['formats'].add('hardcover')
                        if 'hörbuch' in format_text or 'audible' in format_text or 'audiobook' in format_text:
                            book_data['formats'].add('audiobook')
                        
                        # Details aus dem Produktdetails-Bereich
                        details = soup.find('div', id='detailBullets_feature_div') or \
                                 soup.find('div', class_='content')
                        
                        if details:
                            details_text = details.text
                            
                            # Seitenzahl
                            pages_patterns = [
                                r'(\d+)\s*Seiten',
                                r'(\d+)\s*pages',
                                r'Print length[:\s]+(\d+)\s*pages'
                            ]
                            for pattern in pages_patterns:
                                match = re.search(pattern, details_text, re.I)
                                if match:
                                    book_data['page_count'] = int(match.group(1))
                                    break
                            
                            # Erscheinungsdatum
                            date_patterns = [
                                r'(\d{1,2}\.\s*\w+\s*\d{4})',
                                r'(\w+\s+\d{1,2},\s*\d{4})',
                                r'Publication date[:\s]+([^\n]+)'
                            ]
                            for pattern in date_patterns:
                                match = re.search(pattern, details_text)
                                if match:
                                    book_data['publication_date'] = match.group(1).strip()
                                    break
                            
                            # Sprache
                            lang_match = re.search(r'Language[:\s]+(\w+)', details_text, re.I)
                            if lang_match:
                                lang = lang_match.group(1).strip()
                                if lang not in book_data['language']:
                                    book_data['language'].append(lang)
                        
                        # Serie erkennen
                        series_elem = soup.find('a', href=re.compile(r'/gp/product/kindle-dbs/'))
                        if series_elem:
                            book_data['series'] = series_elem.text.strip()
                        
                        # Bestseller-Rang
                        rank_elem = soup.find('span', text=re.compile(r'Best Sellers Rank|Bestseller-Rang'))
                        if rank_elem and rank_elem.parent:
                            rank_text = rank_elem.parent.text
                            rank_match = re.search(r'#?([\d,]+)', rank_text)
                            if rank_match:
                                book_data['bestseller_rank'][marketplace] = rank_match.group(1).replace(',', '')
                        
                        print(f"  ✓ {title[:50]}... - {marketplace.upper()}")
                    
            except Exception as e:
                if 'Failed to establish' not in str(e) and '11001' not in str(e):
                    print(f"  ⚠️  Fehler bei {asin} auf {domain}: {str(e)[:50]}")
            
            time.sleep(1)  # Höflichkeitspause
        
        return book_data if book_data['titles'] else None

    def match_titles(self, book_data):
        """Versucht deutsche und englische Titel zu matchen"""
        translations = {
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
            'What Influences Therapy': 'Was Therapie beeinflusst',
            'The Challenge of Suicide': 'Die Herausforderung Suizid',
            'Dealing with Jealous People': 'Umgang mit Eifersüchtigen',
            'Immersed': 'Eingetaucht',
            'Ensnared': 'Verstrickt'
        }
        
        # Versuche Titel zu matchen
        for en_title, de_title in translations.items():
            # Prüfe ob einer der Titel in den gefundenen Titeln ist
            for market, title in book_data['titles'].items():
                if en_title in title and 'title_en' not in book_data:
                    book_data['title_en'] = en_title
                    book_data['title_de'] = de_title
                elif de_title in title and 'title_de' not in book_data:
                    book_data['title_de'] = de_title
                    book_data['title_en'] = en_title

    def detect_genre(self, title):
        """Erweiterte Genre-Erkennung basierend auf Titel"""
        title_lower = title.lower()
        
        genre_patterns = {
            'psychology': [
                'cult', 'sekten', 'self-love', 'selbstliebe', 'therapy', 'therapie', 
                'suicide', 'suizid', 'psyche', 'psychological', 'mental', 'emotional',
                'jealous', 'eifersucht', 'narcissism', 'narzissmus', 'psycho', 'mind'
            ],
            'thriller': [
                'trance', 'echo', 'fatal', 'deadly', 'tödlich', 'verhängnis', 
                'case', 'fall', 'mystery', 'murder', 'crime', 'thriller', 'betrayal',
                'verrat', 'hidden', 'verborgen', 'secret', 'geheimnis', 'dark'
            ],
            'relationship': [
                'love', 'liebe', 'heart', 'herz', 'distance', 'distanz', 
                'relationship', 'beziehung', 'seminar'
            ],
            'science-fiction': [
                'shadows', 'schatten', 'arcanum', 'nanogenesis', 'simulation', 
                'lyra', 'code', 'conspiracy', 'verschwörung', 'matrix', 'immersed',
                'digital', 'cyber'
            ],
            'philosophy': [
                'dignity', 'würde', 'pride', 'stolz', 'downfall', 'legacy', 
                'vermächtnis', 'lodge', 'logen', 'wisdom', 'weisheit'
            ],
            'self-help': [
                'guide', 'ratgeber', 'how to', 'wie man', 'overcome', 'überwinden',
                'battle within', 'innere kampf', 'perfection', 'perfektion', 'dealing',
                'umgang', 'challenge', 'herausforderung'
            ]
        }
        
        # Berechne Scores für jedes Genre
        genre_scores = {}
        for genre, keywords in genre_patterns.items():
            score = sum(2 if keyword in title_lower else 0 for keyword in keywords)
            if score > 0:
                genre_scores[genre] = score
        
        # Wähle Genre mit höchstem Score
        if genre_scores:
            best_genre = max(genre_scores.items(), key=lambda x: x[1])
            return best_genre[0]
        
        return 'general'

    def save_results(self):
        """Speichert die Ergebnisse in verschiedenen Formaten"""
        books_list = []
        
        for asin, book_data in self.books.items():
            # Titel bestimmen
            title_de = book_data['titles'].get('de', '')
            title_en = book_data['titles'].get('com', '') or book_data['titles'].get('uk', '')
            
            # Matched titles verwenden falls vorhanden
            if 'title_de' in book_data:
                title_de = book_data['title_de']
            if 'title_en' in book_data:
                title_en = book_data['title_en']
            
            main_title = title_de or title_en or next(iter(book_data['titles'].values()), '')
            
            if not main_title:
                continue
            
            book_info = {
                'asin': asin,
                'title': main_title,
                'title_de': title_de,
                'title_en': title_en,
                'all_titles': book_data['titles'],
                'formats': list(book_data['formats']) if book_data['formats'] else ['ebook'],
                'genre': self.detect_genre(main_title),
                'series': book_data.get('series'),
                'publication_date': book_data.get('publication_date'),
                'page_count': book_data.get('page_count'),
                'languages': book_data.get('language', []),
                'kindle_unlimited': book_data.get('kindle_unlimited', False),
                'urls': book_data['urls'],
                'marketplaces': book_data['marketplaces'],
                'bestseller_ranks': book_data.get('bestseller_rank', {}),
                'prices': book_data.get('prices', {}),
                'cover_url': f"https://images-na.ssl-images-amazon.com/images/P/{asin}.01.LZZZZZZZ.jpg"
            }
            
            books_list.append(book_info)
        
        # Nach Genre und Titel sortieren
        books_list.sort(key=lambda x: (x['genre'], x['title']))
        
        # JSON speichern (vollständige Daten)
        with open('dirk_werner_books_complete.json', 'w', encoding='utf-8') as f:
            json.dump(books_list, f, ensure_ascii=False, indent=2)
        
        # Vereinfachte JSON für Webseite
        simplified_books = []
        for book in books_list:
            simplified_books.append({
                'asin': book['asin'],
                'title': book['title'],
                'title_de': book['title_de'],
                'title_en': book['title_en'],
                'genre': book['genre'],
                'formats': book['formats'],
                'kindle_unlimited': book['kindle_unlimited'],
                'url_de': book['urls'].get('de', ''),
                'url_com': book['urls'].get('com', ''),
                'cover_url': book['cover_url']
            })
        
        with open('dirk_werner_books.json', 'w', encoding='utf-8') as f:
            json.dump(simplified_books, f, ensure_ascii=False, indent=2)
        
        # JavaScript Array
        js_content = f"""// Dirk Werner Complete Book Collection
// Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
// Total Books: {len(books_list)}
// Author: Dipl.-Psych. Dirk Werner

const dirkWernerBooks = {json.dumps(simplified_books, ensure_ascii=False, indent=2)};

// Statistics
const bookStats = {{
    totalBooks: {len(books_list)},
    genres: {{
{chr(10).join(f'        "{genre}": {sum(1 for book in books_list if book["genre"] == genre)},' 
              for genre in sorted(set(book["genre"] for book in books_list)))}
    }},
    formats: {{
{chr(10).join(f'        "{fmt}": {sum(1 for book in books_list if fmt in book["formats"])},' 
              for fmt in sorted(set(fmt for book in books_list for fmt in book["formats"])))}
    }},
    marketplaces: {{
{chr(10).join(f'        "{mp}": {sum(1 for book in books_list if mp in book["marketplaces"])},' 
              for mp in sorted(set(mp for book in books_list for mp in book["marketplaces"])))}
    }},
    kindleUnlimited: {sum(1 for book in books_list if book["kindle_unlimited"])}
}};

// Export
if (typeof module !== 'undefined' && module.exports) {{
    module.exports = {{ books: dirkWernerBooks, stats: bookStats }};
}}
"""
        with open('dirk_werner_books.js', 'w', encoding='utf-8') as f:
            f.write(js_content)
        
        # CSV für Übersicht
        with open('dirk_werner_books.csv', 'w', newline='', encoding='utf-8') as f:
            fieldnames = ['asin', 'title', 'title_de', 'title_en', 'genre', 'formats', 
                         'kindle_unlimited', 'marketplaces', 'page_count', 'url_de', 'url_com']
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            
            for book in books_list:
                writer.writerow({
                    'asin': book['asin'],
                    'title': book['title'],
                    'title_de': book['title_de'],
                    'title_en': book['title_en'],
                    'genre': book['genre'],
                    'formats': ', '.join(book['formats']),
                    'kindle_unlimited': 'Ja' if book['kindle_unlimited'] else 'Nein',
                    'marketplaces': ', '.join(book['marketplaces']),
                    'page_count': book.get('page_count', ''),
                    'url_de': book['urls'].get('de', ''),
                    'url_com': book['urls'].get('com', '')
                })
        
        # Markdown-Tabelle für README
        with open('book_table.md', 'w', encoding='utf-8') as f:
            f.write("# Dirk Werner - Bücher Übersicht\n\n")
            f.write(f"Stand: {datetime.now().strftime('%d.%m.%Y')}\n\n")
            f.write("| Titel (DE) | Titel (EN) | Genre | Formate | Marktplätze |\n")
            f.write("|------------|------------|-------|---------|-------------|\n")
            
            for book in books_list:
                f.write(f"| {book['title_de'] or '-'} | {book['title_en'] or '-'} | ")
                f.write(f"{book['genre']} | {', '.join(book['formats'])} | ")
                f.write(f"{', '.join(book['marketplaces'])} |\n")
        
        print(f"\n✅ {len(books_list)} Bücher erfolgreich gespeichert!")
        print("\n📁 Erstellte Dateien:")
        print("   - dirk_werner_books_complete.json (vollständige Daten)")
        print("   - dirk_werner_books.json (vereinfachte Version)")
        print("   - dirk_werner_books.js (JavaScript)")
        print("   - dirk_werner_books.csv (Tabelle)")
        print("   - book_table.md (Markdown)")
        
        # Statistiken ausgeben
        print(f"\n📊 Statistiken:")
        print(f"   Gesamtanzahl Bücher: {len(books_list)}")
        
        # Genre-Statistik
        genre_count = {}
        for book in books_list:
            genre = book['genre']
            genre_count[genre] = genre_count.get(genre, 0) + 1
        
        print("\n   Bücher nach Genre:")
        for genre, count in sorted(genre_count.items()):
            print(f"     - {genre}: {count} Bücher")
        
        # Format-Statistik
        format_count = {}
        for book in books_list:
            for fmt in book['formats']:
                format_count[fmt] = format_count.get(fmt, 0) + 1
        
        print("\n   Bücher nach Format:")
        for fmt, count in sorted(format_count.items()):
            print(f"     - {fmt}: {count} Bücher")
        
        # Marktplatz-Statistik
        marketplace_count = {}
        for book in books_list:
            for mp in book['marketplaces']:
                marketplace_count[mp] = marketplace_count.get(mp, 0) + 1
        
        print("\n   Verfügbarkeit nach Marktplatz:")
        for mp, count in sorted(marketplace_count.items(), key=lambda x: x[1], reverse=True):
            print(f"     - {mp}: {count} Bücher")
        
        # Kindle Unlimited
        ku_count = sum(1 for book in books_list if book['kindle_unlimited'])
        print(f"\n   Kindle Unlimited: {ku_count} Bücher")

    def run(self):
        """Hauptprozess"""
        print("🚀 Starte Dirk Werner Bücher-Scraper (Vollständige Version)")
        print(f"⏰ Start: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"📚 Verarbeite {len(self.known_asins)} bekannte ASINs\n")
        
        # Details für alle ASINs holen
        for i, asin in enumerate(self.known_asins, 1):
            print(f"\n[{i}/{len(self.known_asins)}] Verarbeite ASIN: {asin}")
            book_data = self.get_book_details(asin)
            if book_data:
                self.match_titles(book_data)
                self.books[asin] = book_data
            else:
                print(f"  ❌ Keine Daten gefunden für {asin}")
        
        # Ergebnisse speichern
        print("\n" + "="*60)
        self.save_results()
        
        print(f"\n✅ Scraping erfolgreich abgeschlossen!")
        print(f"⏰ Ende: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

if __name__ == "__main__":
    scraper = DirkWernerBookScraper()
    scraper.run()