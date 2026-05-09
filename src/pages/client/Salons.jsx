import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, MapPin, Star, CheckCircle, Heart } from 'lucide-react'
import ClientNavBar from '../../components/ClientNavBar'

// Mock data matching the app's data shape
const categories = ['Massage', 'Soin visage', 'Manucure', 'Épilation', 'Coiffure', 'Hammam', 'Extension cils', 'Pédicure']
const cities = ['Alger', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Sétif', 'Tlemcen', 'Batna']

const salons = [
  { id: 'sharon-beauty', name: 'Sharon Beauty', district: 'Bab El Oued', city: 'Alger', category: 'Soin visage', rating: 4.9, reviews: 128, price: 'À partir de 1 500 DA', tags: ['Soin visage', 'Massage', 'Épilation'], verified: true, isNew: false, color: 'bg-pink-200', initials: 'SB', openNow: true, duration: '45 min' },
  { id: 'nour-beauty', name: 'Nour Beauty Center', district: 'Hydra', city: 'Alger', category: 'Massage', rating: 4.8, reviews: 95, price: 'À partir de 2 000 DA', tags: ['Massage', 'Hammam', 'Soin visage'], verified: true, isNew: false, color: 'bg-indigo-200', initials: 'NB', openNow: true, duration: '60 min' },
  { id: 'jolie-spa', name: 'Jolie Spa & Beauté', district: 'El Biar', city: 'Alger', category: 'Hammam', rating: 4.7, reviews: 64, price: 'À partir de 2 500 DA', tags: ['Hammam', 'Massage', 'Manucure'], verified: true, isNew: true, color: 'bg-teal-200', initials: 'JS', openNow: false, duration: '90 min' },
  { id: 'bella-rosa', name: 'Bella Rosa Institut', district: 'Kouba', city: 'Alger', category: 'Manucure', rating: 4.6, reviews: 41, price: 'À partir de 800 DA', tags: ['Manucure', 'Pédicure', 'Extension cils'], verified: false, isNew: true, color: 'bg-rose-200', initials: 'BR', openNow: true, duration: '30 min' },
  { id: 'orient-spa', name: 'Orient Spa Luxe', district: 'Haï Sabah', city: 'Oran', category: 'Hammam', rating: 4.9, reviews: 87, price: 'À partir de 3 000 DA', tags: ['Hammam', 'Soin visage', 'Massage'], verified: true, isNew: false, color: 'bg-amber-200', initials: 'OS', openNow: true, duration: '120 min' },
  { id: 'royal-beauty', name: 'Royal Beauty Oran', district: 'Centre-ville', city: 'Oran', category: 'Coiffure', rating: 4.5, reviews: 53, price: 'À partir de 1 200 DA', tags: ['Coiffure', 'Manucure', 'Maquillage'], verified: true, isNew: false, color: 'bg-purple-200', initials: 'RB', openNow: false, duration: '45 min' },
  { id: 'yasmine-beauty', name: 'Institut Yasmine', district: 'Sidi M\'Cid', city: 'Constantine', category: 'Soin visage', rating: 4.8, reviews: 72, price: 'À partir de 1 800 DA', tags: ['Soin visage', 'Épilation', 'Manucure'], verified: true, isNew: true, color: 'bg-green-200', initials: 'IY', openNow: true, duration: '50 min' },
  { id: 'diamant-beaute', name: 'Diamant Beauté', district: 'Bab Ezzouar', city: 'Alger', category: 'Extension cils', rating: 4.7, reviews: 39, price: 'À partir de 3 500 DA', tags: ['Extension cils', 'Sourcils', 'Manucure'], verified: false, isNew: true, color: 'bg-yellow-200', initials: 'DB', openNow: true, duration: '90 min' },
]

function SalonCard({ salon, liked, onToggleLike }) {
  return (
    <div className="card overflow-hidden group hover:shadow-lg transition-all duration-300">
      {/* Image placeholder */}
      <div className={`${salon.color} h-36 relative flex items-center justify-center`}>
        <div className="text-4xl font-display font-bold text-white/60">{salon.initials}</div>
        {salon.isNew && (
          <span className="absolute top-3 left-3 bg-primary-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">Nouveau</span>
        )}
        {salon.verified && (
          <span className="absolute top-3 right-10 bg-white/90 text-green-600 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle size={10} /> Vérifié
          </span>
        )}
        <button
          onClick={() => onToggleLike(salon.id)}
          className="absolute top-2.5 right-2.5 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Heart size={13} className={liked ? 'fill-red-400 text-red-400' : 'text-gray-400'} />
        </button>
        {!salon.openNow && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-xs text-center py-1 font-medium">Fermé actuellement</div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">{salon.name}</h3>
          <div className="flex items-center gap-0.5 shrink-0">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold text-gray-700">{salon.rating}</span>
            <span className="text-xs text-gray-400">({salon.reviews})</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
          <MapPin size={11} /> {salon.district}, {salon.city}
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {salon.tags.slice(0, 2).map(t => (
            <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{t}</span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-primary-600">{salon.price}</span>
          <Link
            to={`/client/reserver/${salon.id}`}
            className="text-xs bg-primary-500 hover:bg-primary-600 text-white px-3 py-1.5 rounded-lg font-semibold transition-colors"
          >
            Réserver
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ClientSalons() {
  const [search, setSearch] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('rating')
  const [liked, setLiked] = useState(new Set())
  const [showOnlyOpen, setShowOnlyOpen] = useState(false)

  const toggleLike = id => setLiked(prev => {
    const next = new Set(prev)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })

  const filtered = salons.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    const matchCity = !selectedCity || s.city === selectedCity
    const matchCat = !selectedCategory || s.tags.includes(selectedCategory)
    const matchOpen = !showOnlyOpen || s.openNow
    return matchSearch && matchCity && matchCat && matchOpen
  }).sort((a, b) => sortBy === 'rating' ? b.rating - a.rating : b.reviews - a.reviews)

  return (
    <div className="min-h-screen bg-white">
      <ClientNavBar />

      {/* Hero search */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">Trouver votre institut idéal</h1>
          <p className="text-gray-500 text-sm mb-6">Réservez en quelques clics, 24h/24</p>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex-1 shadow-sm">
              <Search size={16} className="text-gray-400 shrink-0" />
              <input
                className="flex-1 text-sm outline-none"
                placeholder="Soin, institut..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none cursor-pointer shadow-sm"
            >
              <option value="">Toutes les villes</option>
              {cities.map(c => <option key={c}>{c}</option>)}
            </select>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none cursor-pointer shadow-sm"
            >
              <option value="">Tous les soins</option>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none cursor-pointer shadow-sm"
            >
              <option value="rating">Mieux notés</option>
              <option value="popular">Plus populaires</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category pills */}
      <div className="border-b border-gray-100 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto">
          <button
            onClick={() => setSelectedCategory('')}
            className={`shrink-0 text-sm px-4 py-1.5 rounded-full border transition-all ${!selectedCategory ? 'bg-primary-500 text-white border-primary-500' : 'border-gray-200 text-gray-600 hover:border-primary-300'}`}
          >
            Tous
          </button>
          {categories.map(c => (
            <button key={c}
              onClick={() => setSelectedCategory(c === selectedCategory ? '' : c)}
              className={`shrink-0 text-sm px-4 py-1.5 rounded-full border transition-all ${selectedCategory === c ? 'bg-primary-500 text-white border-primary-500' : 'border-gray-200 text-gray-600 hover:border-primary-300'}`}
            >
              {c}
            </button>
          ))}
          <div className="ml-auto shrink-0">
            <label className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer whitespace-nowrap">
              <input
                type="checkbox"
                checked={showOnlyOpen}
                onChange={e => setShowOnlyOpen(e.target.checked)}
                className="accent-primary-500"
              />
              Ouverts maintenant
            </label>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-900">{filtered.length}</span> instituts trouvés
            {selectedCity && <span> à <span className="text-primary-500 font-medium">{selectedCity}</span></span>}
          </p>
          {liked.size > 0 && (
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Heart size={12} className="fill-red-400 text-red-400" /> {liked.size} favori{liked.size > 1 ? 's' : ''}
            </span>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Search size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-medium">Aucun institut trouvé</p>
            <p className="text-sm mt-1">Essayez d'élargir vos critères de recherche</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map(s => (
              <SalonCard
                key={s.id}
                salon={s}
                liked={liked.has(s.id)}
                onToggleLike={toggleLike}
              />
            ))}
          </div>
        )}
      </div>

      {/* CTA footer */}
      <div className="bg-gradient-to-r from-gray-900 to-primary-900 py-12 px-6 text-center text-white mt-6">
        <p className="text-primary-300 text-xs font-bold uppercase tracking-widest mb-3">Vous êtes professionnel ?</p>
        <h2 className="font-display text-2xl font-bold mb-3">Référencez votre institut sur Planty</h2>
        <Link to="/inscription" className="btn-primary inline-block">Commencer gratuitement →</Link>
      </div>
    </div>
  )
}