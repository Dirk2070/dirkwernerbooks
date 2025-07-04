import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from '@/contexts/LanguageContext'
import SEO from '@/components/SEO'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Home from '@/components/pages/Home'
import Books from '@/components/pages/Books'
import Biography from '@/components/pages/Biography'
import Genres from '@/components/pages/Genres'
import Contact from '@/components/pages/Contact'
import Impressum from '@/components/pages/Impressum'
import './App.css'

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <SEO />
          <Header />
          <main>
            <Routes>
              {/* German routes */}
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<Books />} />
              <Route path="/biography" element={<Biography />} />
              <Route path="/genres" element={<Genres />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/impressum" element={<Impressum />} />
              
              {/* English routes */}
              <Route path="/en" element={<Home />} />
              <Route path="/en/books" element={<Books />} />
              <Route path="/en/biography" element={<Biography />} />
              <Route path="/en/genres" element={<Genres />} />
              <Route path="/en/contact" element={<Contact />} />
              <Route path="/en/impressum" element={<Impressum />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App