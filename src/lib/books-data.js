// Complete book catalog for Dirk Werner (Psychotherapist)

export const booksData = [
  // Psychology & Self-Help Books
  {
    id: 'dankbarkeit-im-alltag',
    title: {
      de: 'Dankbarkeit im Alltag: Ein interaktives Tagebuch für mehr Zufriedenheit und Lebensfreude',
      en: 'Gratitude in Everyday Life: An Interactive Journal for More Satisfaction and Joy'
    },
    genre: 'psychology',
    description: {
      de: 'Tauchen Sie ein in die Welt der Dankbarkeit und erleben Sie, wie sie Ihr Leben positiv verändern kann. Ein interaktiver Begleiter auf einer inspirierenden Reise der Selbstreflexion.',
      en: 'Dive into the world of gratitude and experience how it can positively change your life. An interactive companion on an inspiring journey of self-reflection.'
    },
    year: 2024,
    formats: ['ebook', 'print'],
    cover: 'dankbarkeit-im-alltag.jpg',
    shops: {
      books2read: 'https://books2read.com/Dirk-Werner-Author',
      amazon_de: 'https://amazon.de/dp/B0CW1G3XR6',
      amazon_com: 'https://amazon.com/dp/B0CW1G3XR6'
    }
  },
  
  {
    id: 'battle-within',
    title: {
      de: 'The Battle Within: A Guide to Overcoming Inner Struggles',
      en: 'The Battle Within: A Guide to Overcoming Inner Struggles'
    },
    genre: 'psychology',
    description: {
      de: 'Ein aufschlussreiches Handbuch, das Leser durch die Komplexität innerer Kämpfe führt und Strategien für emotionales Wohlbefinden bietet.',
      en: 'An insightful handbook that guides readers through the complexities of internal struggles and offers strategies for achieving emotional wellness.'
    },
    year: 2024,
    formats: ['ebook', 'print'],
    cover: 'battle-within.jpg',
    shops: {
      books2read: 'https://books2read.com/Dirk-Werner-Author',
      amazon_de: 'https://amazon.de/dp/B0DNBSQXXL',
      amazon_com: 'https://amazon.com/dp/B0DNBSQXXL'
    }
  },
  
  {
    id: 'suizidpraevention-basics',
    title: {
      de: 'Suizidprävention: Basics',
      en: 'Suicide Prevention: Basics'
    },
    genre: 'psychology',
    description: {
      de: 'Grundlegende Informationen und Strategien zur Suizidprävention für Fachkräfte und Betroffene.',
      en: 'Basic information and strategies for suicide prevention for professionals and those affected.'
    },
    year: 2024,
    formats: ['ebook', 'print'],
    cover: 'placeholder-psychology.jpg',
    shops: {
      books2read: 'https://books2read.com/Dirk-Werner-Author',
      amazon_de: 'https://amazon.de/dp/B0DY7K1148',
      amazon_com: 'https://amazon.com/dp/B0DY7K1148'
    }
  },
  
  {
    id: 'goldene-regeln-beziehung',
    title: {
      de: '101 goldene Regeln für eine harmonische Beziehung',
      en: '101 Golden Rules for a Harmonious Relationship'
    },
    genre: 'psychology',
    description: {
      de: 'Praktische Ratschläge und bewährte Strategien für eine erfüllte und harmonische Partnerschaft.',
      en: 'Practical advice and proven strategies for a fulfilling and harmonious partnership.'
    },
    year: 2024,
    formats: ['ebook', 'print'],
    cover: 'placeholder-relationship.jpg',
    shops: {
      books2read: 'https://books2read.com/Dirk-Werner-Author',
      amazon_de: 'https://amazon.de/dp/B0DV56DC5P',
      amazon_com: 'https://amazon.com/dp/B0DV56DC5P'
    }
  },
  
  {
    id: 'selbstsabotage-ueberwinden',
    title: {
      de: 'Selbstsabotage überwinden: Entfessle dein wahres Potenzial',
      en: 'Overcoming Self-Sabotage: Unleash Your True Potential'
    },
    genre: 'psychology',
    description: {
      de: 'Ein Leitfaden zur Überwindung selbstzerstörerischer Muster und zur Entfaltung des vollen Potenzials.',
      en: 'A guide to overcoming self-destructive patterns and unleashing your full potential.'
    },
    year: 2024,
    formats: ['ebook', 'print'],
    cover: 'selbstsabotage-ueberwinden.jpg',
    shops: {
      books2read: 'https://books2read.com/Dirk-Werner-Author',
      amazon_de: 'https://amazon.de/dp/B0DT7F2VVS',
      amazon_com: 'https://amazon.com/dp/B0DT7F2VVS'
    }
  },
  
  {
    id: 'gemeinsam-den-weg-gehen',
    title: {
      de: 'Gemeinsam den Weg gehen: Empathie im Umgang mit Suizidgedanken',
      en: 'Walking the Path Together: Empathy in Dealing with Suicidal Thoughts'
    },
    genre: 'psychology',
    description: {
      de: 'Ein einfühlsamer Ratgeber für den Umgang mit Suizidgedanken bei sich selbst und anderen.',
      en: 'A compassionate guide for dealing with suicidal thoughts in yourself and others.'
    },
    year: 2024,
    formats: ['ebook', 'print'],
    cover: 'placeholder-psychology.jpg',
    shops: {
      books2read: 'https://books2read.com/Dirk-Werner-Author',
      amazon_de: 'https://amazon.de/dp/B0DS9Y8W5V',
      amazon_com: 'https://amazon.com/dp/B0DS9Y8W5V'
    }
  },
  
  {
    id: 'psychotherapie-mittel-methoden',
    title: {
      de: 'Psychotherapie: Mittel und Methoden',
      en: 'Psychotherapy: Methods and Tools'
    },
    genre: 'psychology',
    description: {
      de: 'Professioneller Leitfaden zu psychotherapeutischen Methoden und Techniken für Fachkräfte.',
      en: 'Professional guide to psychotherapeutic methods and techniques for practitioners.'
    },
    year: 2024,
    formats: ['ebook', 'print'],
    cover: 'placeholder-professional.jpg',
    shops: {
      books2read: 'https://books2read.com/Dirk-Werner-Author',
      amazon_de: 'https://amazon.de/dp/B0DHV3LPL1',
      amazon_com: 'https://amazon.com/dp/B0DHV3LPL1'
    }
  },
  
  {
    id: 'self-love-over-perfection',
    title: {
      de: 'Self-Love Over Perfection: A Guide to Overcoming Female Narcissism',
      en: 'Self-Love Over Perfection: A Guide to Overcoming Female Narcissism'
    },
    genre: 'psychology',
    description: {
      de: 'Ein Leitfaden zum Verständnis und zur Überwindung weiblichen Narzissmus und zum Aufbau echter Selbstachtung.',
      en: 'A guide to understanding and overcoming female narcissism and building genuine self-esteem.'
    },
    year: 2024,
    formats: ['ebook', 'print'],
    cover: 'placeholder-psychology.jpg',
    shops: {
      books2read: 'https://books2read.com/Dirk-Werner-Author',
      amazon_de: 'https://amazon.de/dp/B0DJL6VXDJ',
      amazon_com: 'https://amazon.com/dp/B0DJL6VXDJ'
    }
  },
  
  {
    id: 'how-to-recognize-cults',
    title: {
      de: 'How to Recognize Cults: A Guide to Protecting Yourself from Manipulation and Control',
      en: 'How to Recognize Cults: A Guide to Protecting Yourself from Manipulation and Control'
    },
    genre: 'psychology',
    description: {
      de: 'Ein essentieller Leitfaden eines erfahrenen klinischen Psychotherapeuten zum Verständnis von Kultmanipulation.',
      en: 'An essential guide by a seasoned clinical psychotherapist for understanding cult manipulation.'
    },
    year: 2024,
    formats: ['ebook', 'print'],
    cover: 'how-to-recognize-cults.jpg',
    shops: {
      books2read: 'https://books2read.com/Dirk-Werner-Author',
      amazon_de: 'https://amazon.de/dp/B0DJY7S893',
      amazon_com: 'https://amazon.com/dp/B0DJY7S893'
    }
  },
  
  // Dr. Seelmann Mystery Series - German
  {
    id: 'verhaengnisvolle-trance',
    title: {
      de: 'Verhängnisvolle Trance: Dr. Seelmanns erster Fall',
      en: 'Fatal Trance: Dr. Seelmann\'s First Case'
    },
    genre: 'mystery',
    description: {
      de: 'Der erste Fall von Dr. Lukas Seelmann, einem brillanten Psychologen mit außergewöhnlicher Hypnosegabe.',
      en: 'The first case of Dr. Lukas Seelmann, a brilliant psychologist with extraordinary hypnosis abilities.'
    },
    year: 2024,
    formats: ['ebook', 'print', 'audiobook'],
    cover: 'verhaengnisvolle-trance.jpg',
    shops: {
      books2read: 'https://books2read.com/Dirk-Werner-Author',
      amazon_de: 'https://amazon.de/dp/B0DHG8WCDK',
      amazon_com: 'https://amazon.com/dp/B0DHG8WCDK',
      apple_books: 'https://books.apple.com/author/dirk-werner'
    }
  },
  
  {
    id: 'toedliches-echo',
    title: {
      de: 'Tödliches Echo: Dr. Seelmanns zweiter Fall',
      en: 'Deadly Echo: Dr. Seelmann\'s Second Case'
    },
    genre: 'mystery',
    description: {
      de: 'Dr. Seelmann und Inspektorin Jana Wehring ermitteln in einer Serie künstlerischer Morde in Münchens Kunstszene.',
      en: 'Dr. Seelmann and Inspector Jana Wehring investigate a series of artistic murders in Munich\'s art scene.'
    },
    year: 2024,
    formats: ['ebook', 'print', 'audiobook'],
    cover: 'toedliches-echo.jpg',
    shops: {
      books2read: 'https://books2read.com/Dirk-Werner-Author',
      amazon_de: 'https://amazon.de/dp/B0DHV6WTZQ',
      amazon_com: 'https://amazon.com/dp/B0DHV6WTZQ',
      apple_books: 'https://books.apple.com/author/dirk-werner'
    }
  },
  
  {
    id: 'vermaechtnis-der-logen',
    title: {
      de: 'Das Vermächtnis der Logen: Dr. Seelmanns dritter Fall',
      en: 'The Legacy of the Lodges: Dr. Seelmann\'s Third Case'
    },
    genre: 'mystery',
    description: {
      de: 'Der dritte Fall führt Dr. Seelmann in die geheimnisvolle Welt der Logen und ihrer dunklen Geheimnisse.',
      en: 'The third case leads Dr. Seelmann into the mysterious world of lodges and their dark secrets.'
    },
    year: 2024,
    formats: ['ebook', 'print', 'audiobook'],
    cover: 'vermaechtnis-der-logen.jpg',
    shops: {
      books2read: 'https://books2read.com/Dirk-Werner-Author',
      amazon_de: 'https://amazon.de/dp/B0DJNS7TVB',
      amazon_com: 'https://amazon.com/dp/B0DJNS7TVB',
      apple_books: 'https://books.apple.com/author/dirk-werner'
    }
  },
  
  // Dr. Seelmann Mystery Series - English
  {
    id: 'fatal-trance-en',
    title: {
      de: 'Fatal Trance: Dr. Seelmann\'s First Case (English)',
      en: 'Fatal Trance: Dr. Seelmann\'s First Case'
    },
    genre: 'mystery',
    description: {
      de: 'Englische Version des ersten Dr. Seelmann Falls.',
      en: 'English version of the first Dr. Seelmann case.'
    },
    year: 2024,
    formats: ['ebook', 'print', 'audiobook'],
    cover: 'placeholder-mystery.jpg',
    shops: {
      books2read: 'https://books2read.com/Dirk-Werner-Author',
      amazon_de: 'https://amazon.de/dp/B0DFVQP4JT',
      amazon_com: 'https://amazon.com/dp/B0DFVQP4JT',
      apple_books: 'https://books.apple.com/author/dirk-werner'
    }
  },
  
  {
    id: 'deadly-echo-en',
    title: {
      de: 'Deadly Echo: Dr. Seelmann\'s Second Case (English)',
      en: 'Deadly Echo: Dr. Seelmann\'s Second Case'
    },
    genre: 'mystery',
    description: {
      de: 'Englische Version, die Kunsttherapie und verdrängte Erinnerungen erforscht.',
      en: 'English version exploring art therapy and repressed memories.'
    },
    year: 2024,
    formats: ['ebook', 'print', 'audiobook'],
    cover: 'deadly-echo.jpg',
    shops: {
      books2read: 'https://books2read.com/Dirk-Werner-Author',
      amazon_de: 'https://amazon.de/dp/B0DFD4GVKM',
      amazon_com: 'https://amazon.com/dp/B0DFD4GVKM',
      apple_books: 'https://books.apple.com/author/dirk-werner'
    }
  },
  
  {
    id: 'legacy-lodges-en',
    title: {
      de: 'The Legacy of the Lodges: Dr. Seelmann\'s Third Case (English)',
      en: 'The Legacy of the Lodges: Dr. Seelmann\'s Third Case'
    },
    genre: 'mystery',
    description: {
      de: 'Englische Version des dritten Falls.',
      en: 'English version of the third case.'
    },
    year: 2024,
    formats: ['ebook', 'print', 'audiobook'],
    cover: 'placeholder-mystery.jpg',
    shops: {
      books2read: 'https://books2read.com/Dirk-Werner-Author',
      amazon_de: 'https://amazon.de/dp/B0DDJVX6GQ',
      amazon_com: 'https://amazon.com/dp/B0DDJVX6GQ',
      apple_books: 'https://books.apple.com/author/dirk-werner'
    }
  },
  
  // Science Fiction & Thriller
  {
    id: 'simulation-chronicles',
    title: {
      de: 'The Simulation Chronicles',
      en: 'The Simulation Chronicles'
    },
    genre: 'scifi',
    description: {
      de: 'Ein bewusstseinsverändernder Science-Fiction-Thriller, in dem die Realität die ultimative Illusion ist.',
      en: 'A mind-bending sci-fi thriller where reality is the ultimate illusion.'
    },
    year: 2024,
    formats: ['ebook', 'print'],
    cover: 'simulation-chronicles.jpg',
    shops: {
      books2read: 'https://books2read.com/Dirk-Werner-Author',
      amazon_de: 'https://amazon.de/dp/B0DCTZF166',
      amazon_com: 'https://amazon.com/dp/B0DCTZF166'
    }
  },
  
  {
    id: 'nanogenesis',
    title: {
      de: 'Nanogenesis: The Rise of Superhumans',
      en: 'Nanogenesis: The Rise of Superhumans'
    },
    genre: 'scifi',
    description: {
      de: 'In der weitläufigen Metropole Neo-Tokyo, wo Technologie und Natur miteinander verwoben sind, arbeitet Dr. Eliana Moraes.',
      en: 'In the sprawling metropolis of Neo-Tokyo, where technology and nature intertwine, Dr. Eliana Moraes works.'
    },
    year: 2024,
    formats: ['ebook', 'print'],
    cover: 'placeholder-scifi.jpg',
    shops: {
      books2read: 'https://books2read.com/Dirk-Werner-Author',
      amazon_de: 'https://amazon.de/dp/B0DC28N8WZ',
      amazon_com: 'https://amazon.com/dp/B0DC28N8WZ'
    }
  },
  
  {
    id: 'key-enlightened',
    title: {
      de: 'The Key of the Enlightened',
      en: 'The Key of the Enlightened'
    },
    genre: 'scifi',
    description: {
      de: 'Ein kryptisches Artefakt. Ein schockierender Mord. Ein Wettlauf um die Wahrheit im Schatten eines alten Alpenklosters.',
      en: 'A cryptic artifact. A shocking murder. A race to uncover the truth in the shadow of an ancient Alpine monastery.'
    },
    year: 2024,
    formats: ['ebook', 'print'],
    cover: 'placeholder-thriller.jpg',
    shops: {
      books2read: 'https://books2read.com/Dirk-Werner-Author',
      amazon_de: 'https://amazon.de/dp/B0CW1JS3B5',
      amazon_com: 'https://amazon.com/dp/B0CW1JS3B5'
    }
  },
  
  // Leadership & Business
  {
    id: 'emotionale-intelligenz-leadership',
    title: {
      de: 'Emotionale Intelligenz und Leadership: Wie Sie Ihre Stärken optimal nutzen',
      en: 'Emotional Intelligence and Leadership: How to Optimally Use Your Strengths'
    },
    genre: 'leadership',
    description: {
      de: 'Ein Leitfaden für emotionale Intelligenz und Führungskompetenzen für moderne Führungskräfte.',
      en: 'A guide to emotional intelligence and leadership skills for modern executives.'
    },
    year: 2024,
    formats: ['ebook', 'print'],
    cover: 'emotionale-intelligenz-leadership.jpg',
    shops: {
      books2read: 'https://books2read.com/Dirk-Werner-Author',
      amazon_de: 'https://amazon.de/dp/B0D9J2X8D3',
      amazon_com: 'https://amazon.com/dp/B0D9J2X8D3'
    }
  },
  
  {
    id: 'thought-leader',
    title: {
      de: 'Thought Leader',
      en: 'Thought Leader'
    },
    genre: 'leadership',
    description: {
      de: 'Emotionale Intelligenz und Leadership für Führungskräfte, die ihre Stärken optimal nutzen möchten.',
      en: 'Emotional intelligence and leadership for executives who want to optimally use their strengths.'
    },
    year: 2024,
    formats: ['ebook', 'print'],
    cover: 'placeholder-leadership.jpg',
    shops: {
      books2read: 'https://books2read.com/Dirk-Werner-Author',
      amazon_de: 'https://amazon.de/dp/B0D9762V4T',
      amazon_com: 'https://amazon.com/dp/B0D9762V4T'
    }
  }
];

// Genre definitions with colors and icons
export const genres = {
  psychology: {
    name: { de: 'Psychologie & Selbsthilfe', en: 'Psychology & Self-Help' },
    color: '#3b82f6',
    icon: '🧠',
    description: {
      de: 'Wissenschaftlich fundierte Ratgeber mit praxisnaher Tiefe – von Selbsthilfe bis Fachliteratur für Profis.',
      en: 'Science-based guides with practical depth – from self-help to professional literature.'
    }
  },
  mystery: {
    name: { de: 'Krimi & Psychothriller', en: 'Mystery & Psychological Thriller' },
    color: '#dc2626',
    icon: '🕵️',
    description: {
      de: 'Spannende Fälle mit psychologischer Raffinesse. Hauptfigur: Dr. Lukas Seelmann, ein brillanter Ermittler mit Tiefgang.',
      en: 'Gripping cases with psychological finesse. Main character: Dr. Lukas Seelmann, a brilliant investigator.'
    }
  },
  scifi: {
    name: { de: 'Science Fiction & Thriller', en: 'Science Fiction & Thriller' },
    color: '#7c3aed',
    icon: '🚀',
    description: {
      de: 'Fesselnde Geschichten, die Realität, Technologie und menschliches Bewusstsein erforschen.',
      en: 'Captivating stories exploring reality, technology, and human consciousness.'
    }
  },
  leadership: {
    name: { de: 'Leadership & Business', en: 'Leadership & Business' },
    color: '#059669',
    icon: '💼',
    description: {
      de: 'Emotionale Intelligenz und Führungskompetenzen für moderne Führungskräfte.',
      en: 'Emotional intelligence and leadership skills for modern executives.'
    }
  }
};

// Helper functions
export const getBooksByGenre = (genre) => {
  return booksData.filter(book => book.genre === genre);
};

export const getFeaturedBooks = () => {
  return booksData.slice(0, 4);
};

export const getBookById = (id) => {
  return booksData.find(book => book.id === id);
};

