import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, MapPin, Star, CheckCircle, X, ArrowRight } from 'lucide-react'
import ClientNavBar from '../../components/ClientNavBar';

const categories = ['Massage', 'Soin visage', 'Manucure', 'Épilation', 'Coiffure', 'Hammam', 'Extension cils', 'Pédicure']
const cities = ['Alger', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Sétif', 'Tlemcen', 'Batna']

const SALONS = [
  { id: 'sharon-beauty', name: 'Sharon Beauty', district: 'Bab El Oued', city: 'Alger', rating: 4.9, reviews: 128, tags: ['Soin visage', 'Massage', 'Épilation'], verified: true, color: 'bg-pink-200', initials: 'SB', openNow: true },
  { id: 'nour-beauty', name: 'Nour Beauty Center', district: 'Hydra', city: 'Alger', rating: 4.8, reviews: 95, tags: ['Massage', 'Hammam', 'Soin visage'], verified: true, color: 'bg-indigo-200', initials: 'NB', openNow: true },
  { id: 'jolie-spa', name: 'Jolie Spa & Beauté', district: 'El Biar', city: 'Alger', rating: 4.7, reviews: 64, tags: ['Hammam', 'Massage', 'Manucure'], verified: true, color: 'bg-teal-200', initials: 'JS', openNow: false },
  { id: 'bella-rosa', name: 'Bella Rosa Institut', district: 'Kouba', city: 'Alger', rating: 4.6, reviews: 41, tags: ['Manucure', 'Pédicure', 'Extension cils'], verified: false, color: 'bg-rose-200', initials: 'BR', openNow: true },
  { id: 'orient-spa', name: 'Orient Spa Luxe', district: 'Haï Sabah', city: 'Oran', rating: 4.9, reviews: 87, tags: ['Hammam', 'Soin visage', 'Massage'], verified: true, color: 'bg-amber-200', initials: 'OS', openNow: true },
  { id: 'royal-beauty', name: 'Royal Beauty Oran', district: 'Centre-ville', city: 'Oran', rating: 4.5, reviews: 53, tags: ['Coiffure', 'Manucure', 'Maquillage'], verified: true, color: 'bg-purple-200', initials: 'RB', openNow: false },
  { id: 'yasmine-beauty', name: 'Institut Yasmine', district: "Sidi M'Cid", city: 'Constantine', rating: 4.8, reviews: 72, tags: ['Soin visage', 'Épilation', 'Manucure'], verified: true, color: 'bg-green-200', initials: 'IY', openNow: true },
  { id: 'diamant-beaute', name: 'Diamant Beauté', district: 'Bab Ezzouar', city: 'Alger', rating: 4.7, reviews: 39, tags: ['Extension cils', 'Sourcils', 'Manucure'], verified: false, color: 'bg-yellow-200', initials: 'DB', openNow: true },
]

export default function ClientSalonPicker() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [highlighted, setHighlighted] = useState(null)

  const filtered = SALONS.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    const matchCity = !selectedCity || s.city === selectedCity
    const matchCat = !selectedCategory || s.tags.includes(selectedCategory)
    return matchSearch && matchCity && matchCat
  })

  const handleSelect = (id) => {
    navigate(`/client/reserver/${id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientNavBar />

      {/* Step indicator — salon pick is step 0 of the overall flow */}
      <div className="bg-white border-b border-gray-100 px-6 py-3">
        <div className="max-w-2xl mx-auto flex items-center">
          {['Institut', 'Service', 'Date & Heure', 'Récapitulatif', 'Paiement'].map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i === 0 ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                {i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${i === 0 ? 'text-primary-500' : 'text-gray-400'}`}>{s}</span>
              {i < 4 && <div className="flex-1 h-px mx-2 bg-gray-200" />}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-6">
          <h2 className="font-display text-2xl font-bold text-gray-900 flex items-center gap-2 mb-1">
            <span className="w-7 h-7 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
            Choisissez votre institut
          </h2>
          <p className="text-sm text-gray-400 ml-9">Sélectionnez l'institut où vous souhaitez prendre rendez-vous</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex-1 shadow-sm">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input
              className="flex-1 text-sm outline-none placeholder-gray-400"
              placeholder="Rechercher un institut ou un soin..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-gray-300 hover:text-gray-500">
                <X size={14} />
              </button>
            )}
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
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 mb-6">
          <button
            onClick={() => setSelectedCategory('')}
            className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all ${!selectedCategory ? 'bg-primary-500 text-white border-primary-500' : 'border-gray-200 text-gray-600 hover:border-primary-300 bg-white'}`}
          >
            Tous
          </button>
          {categories.map(c => (
            <button key={c}
              onClick={() => setSelectedCategory(c === selectedCategory ? '' : c)}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all ${selectedCategory === c ? 'bg-primary-500 text-white border-primary-500' : 'border-gray-200 text-gray-600 hover:border-primary-300 bg-white'}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-xs text-gray-400 mb-4">
          <span className="font-semibold text-gray-700">{filtered.length}</span> institut{filtered.length !== 1 ? 's' : ''} disponible{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Salon list */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Search size={36} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium">Aucun institut trouvé</p>
            <button onClick={() => { setSearch(''); setSelectedCity(''); setSelectedCategory('') }} className="text-xs text-primary-500 mt-2 hover:underline">
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map(salon => (
              <button
                key={salon.id}
                onClick={() => handleSelect(salon.id)}
                onMouseEnter={() => setHighlighted(salon.id)}
                onMouseLeave={() => setHighlighted(null)}
                className={`text-left rounded-2xl border-2 transition-all duration-200 overflow-hidden group ${
                  highlighted === salon.id
                    ? 'border-primary-400 shadow-lg shadow-primary-100 scale-[1.01]'
                    : 'border-gray-100 hover:border-primary-200 bg-white shadow-sm'
                }`}
              >
                {/* Color band */}
                <div className={`${salon.color} h-24 relative flex items-center justify-center`}>
                  <span className="text-3xl font-display font-bold text-white/50">{salon.initials}</span>

                  {/* Open/closed */}
                  <div className={`absolute top-2.5 left-2.5 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    salon.openNow ? 'bg-green-500 text-white' : 'bg-black/30 text-white'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${salon.openNow ? 'bg-white' : 'bg-gray-300'}`} />
                    {salon.openNow ? 'Ouvert' : 'Fermé'}
                  </div>

                  {/* Verified */}
                  {salon.verified && (
                    <div className="absolute top-2.5 right-2.5 bg-white/90 text-green-600 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle size={10} /> Vérifié
                    </div>
                  )}

                  {/* Hover arrow */}
                  <div className={`absolute bottom-2.5 right-2.5 w-7 h-7 bg-white rounded-full flex items-center justify-center transition-all duration-200 ${highlighted === salon.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
                    <ArrowRight size={13} className="text-primary-500" />
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 bg-white">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">{salon.name}</h3>
                    <div className="flex items-center gap-0.5 shrink-0">
                      <Star size={11} className="fill-amber-400 text-amber-400" />
                      <span className="text-xs font-bold text-gray-700">{salon.rating}</span>
                      <span className="text-xs text-gray-400">({salon.reviews})</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                    <MapPin size={10} /> {salon.district}, {salon.city}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {salon.tags.slice(0, 3).map(t => (
                      <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}