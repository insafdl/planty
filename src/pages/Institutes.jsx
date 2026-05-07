import { useState } from 'react'
import { Search, MapPin, Filter, SlidersHorizontal } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import InstituteCard from '../components/InstituteCard'
import { institutes, categories, cities } from '../data'

export default function Institutes() {
  const [search, setSearch] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('rating')

  const filtered = institutes.filter(i => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase())
    const matchCity = !selectedCity || i.city === selectedCity
    const matchCat = !selectedCategory || i.category === selectedCategory
    return matchSearch && matchCity && matchCat
  }).sort((a, b) => sortBy === 'rating' ? b.rating - a.rating : b.reservations - a.reservations)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-6">Trouver un institut</h1>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex-1">
              <Search size={16} className="text-gray-400" />
              <input className="flex-1 text-sm outline-none" placeholder="Rechercher un institut..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)} className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none cursor-pointer">
              <option value="">Toutes les villes</option>
              {cities.map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none cursor-pointer">
              <option value="">Toutes les catégories</option>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none cursor-pointer">
              <option value="rating">Mieux notés</option>
              <option value="reservations">Plus populaires</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category pills */}
      <div className="border-b border-gray-100 px-6 py-3">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto">
          <button onClick={() => setSelectedCategory('')} className={`shrink-0 text-sm px-4 py-1.5 rounded-full border transition-all ${!selectedCategory ? 'bg-primary-500 text-white border-primary-500' : 'border-gray-200 text-gray-600 hover:border-primary-300'}`}>Tous</button>
          {categories.map(c => (
            <button key={c} onClick={() => setSelectedCategory(c === selectedCategory ? '' : c)}
              className={`shrink-0 text-sm px-4 py-1.5 rounded-full border transition-all ${selectedCategory === c ? 'bg-primary-500 text-white border-primary-500' : 'border-gray-200 text-gray-600 hover:border-primary-300'}`}>{c}</button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <p className="text-sm text-gray-500 mb-6">{filtered.length} instituts trouvés</p>
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Search size={40} className="mx-auto mb-4 opacity-30" />
            <p>Aucun institut trouvé pour votre recherche</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(i => <InstituteCard key={i.id} institute={i} showNew />)}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}