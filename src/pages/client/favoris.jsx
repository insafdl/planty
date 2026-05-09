import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, MapPin, Star, Clock, CheckCircle, Search, Trash2, ArrowRight, Sparkles } from 'lucide-react'
import ClientNavbar from '../../components/ClientNavBar';

const ALL_SALONS = [
  { id: 'sharon-beauty', name: 'Sharon Beauty', district: 'Bab El Oued', city: 'Alger', rating: 4.9, reviews: 128, price: 'À partir de 1 500 DA', tags: ['Soin visage', 'Massage', 'Épilation'], verified: true, color: 'bg-pink-200', initials: 'SB', openNow: true, lastVisit: 'il y a 2 semaines', nextSlot: 'Demain à 10h00' },
  { id: 'nour-beauty', name: 'Nour Beauty Center', district: 'Hydra', city: 'Alger', rating: 4.8, reviews: 95, price: 'À partir de 2 000 DA', tags: ['Massage', 'Hammam', 'Soin visage'], verified: true, color: 'bg-indigo-200', initials: 'NB', openNow: true, lastVisit: 'il y a 1 mois', nextSlot: 'Lundi à 14h30' },
  { id: 'jolie-spa', name: 'Jolie Spa & Beauté', district: 'El Biar', city: 'Alger', rating: 4.7, reviews: 64, price: 'À partir de 2 500 DA', tags: ['Hammam', 'Massage', 'Manucure'], verified: true, color: 'bg-teal-200', initials: 'JS', openNow: false, lastVisit: 'il y a 3 semaines', nextSlot: 'Mercredi à 11h00' },
  { id: 'bella-rosa', name: 'Bella Rosa Institut', district: 'Kouba', city: 'Alger', rating: 4.6, reviews: 41, price: 'À partir de 800 DA', tags: ['Manucure', 'Pédicure', 'Extension cils'], verified: false, color: 'bg-rose-200', initials: 'BR', openNow: true, lastVisit: 'jamais visité', nextSlot: 'Aujourd\'hui à 16h00' },
  { id: 'orient-spa', name: 'Orient Spa Luxe', district: 'Haï Sabah', city: 'Oran', rating: 4.9, reviews: 87, price: 'À partir de 3 000 DA', tags: ['Hammam', 'Soin visage', 'Massage'], verified: true, color: 'bg-amber-200', initials: 'OS', openNow: true, lastVisit: 'il y a 2 mois', nextSlot: 'Jeudi à 09h30' },
]

// Start with first 3 as favourited
const DEFAULT_FAVS = new Set(['sharon-beauty', 'nour-beauty', 'jolie-spa'])


function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-6">
        <Heart size={32} className="text-pink-300" />
      </div>
      <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Aucun favori pour l'instant</h2>
      <p className="text-gray-400 text-sm max-w-xs mb-8 leading-relaxed">
        Explorez les instituts et appuyez sur le ❤️ pour sauvegarder vos coups de cœur ici.
      </p>
      <Link to="/client/salons" className="btn-primary flex items-center gap-2">
        Découvrir les instituts <ArrowRight size={15} />
      </Link>
    </div>
  )
}

export default function ClientFavoris() {
  const [favs, setFavs] = useState(DEFAULT_FAVS)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all') // all | open | verified

  const removeFav = id => {
    setFavs(prev => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  const favSalons = ALL_SALONS.filter(s => favs.has(s.id))

  const filtered = favSalons.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
      s.city.toLowerCase().includes(search.toLowerCase())
    const matchFilter =
      filter === 'all' ? true :
      filter === 'open' ? s.openNow :
      filter === 'verified' ? s.verified : true
    return matchSearch && matchFilter
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientNavbar />

      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Heart size={20} className="fill-red-400 text-red-400" />
                <h1 className="font-display text-2xl font-bold text-gray-900">Mes Favoris</h1>
              </div>
              <p className="text-sm text-gray-400">
                {favSalons.length === 0
                  ? 'Aucun institut sauvegardé'
                  : `${favSalons.length} institut${favSalons.length > 1 ? 's' : ''} sauvegardé${favSalons.length > 1 ? 's' : ''}`}
              </p>
            </div>

            {favSalons.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                {/* Search */}
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 flex-1 sm:w-56">
                  <Search size={14} className="text-gray-400 shrink-0" />
                  <input
                    className="flex-1 text-sm outline-none bg-transparent placeholder-gray-400"
                    placeholder="Rechercher..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                {/* Filter pills */}
                <div className="flex gap-2">
                  {[
                    { key: 'all', label: 'Tous' },
                    { key: 'open', label: 'Ouverts' },
                    { key: 'verified', label: 'Vérifiés' },
                  ].map(f => (
                    <button
                      key={f.key}
                      onClick={() => setFilter(f.key)}
                      className={`text-xs px-3 py-2 rounded-xl border transition-all font-medium ${
                        filter === f.key
                          ? 'bg-primary-500 text-white border-primary-500'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-primary-300'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {favSalons.length === 0 ? (
          <EmptyState />
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Search size={32} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium text-sm">Aucun résultat pour "{search}"</p>
            <button onClick={() => setSearch('')} className="text-xs text-primary-500 mt-2 hover:underline">
              Effacer la recherche
            </button>
          </div>
        ) : (
          <>
            {/* Quick-book suggestion banner */}
            {filtered.some(s => s.openNow) && (
              <div className="bg-gradient-to-r from-primary-500 to-pink-500 rounded-2xl p-4 mb-6 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Des créneaux disponibles aujourd'hui !</p>
                    <p className="text-xs text-white/70">Certains de vos instituts favoris ont des places libres.</p>
                  </div>
                </div>
                <Link
                  to={`/client/reserver/${filtered.find(s => s.openNow)?.id}`}
                  className="shrink-0 bg-white text-primary-600 text-xs font-bold px-4 py-2 rounded-xl hover:bg-pink-50 transition-colors"
                >
                  Réserver →
                </Link>
              </div>
            )}

            {/* Cards grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(salon => (
                <div key={salon.id} className="card overflow-hidden group hover:shadow-lg transition-all duration-300">
                  {/* Top colour band */}
                  <div className={`${salon.color} h-32 relative flex items-center justify-center`}>
                    <span className="text-4xl font-display font-bold text-white/50">{salon.initials}</span>

                    {/* Status badge */}
                    <div className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                      salon.openNow
                        ? 'bg-green-500 text-white'
                        : 'bg-black/30 text-white'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${salon.openNow ? 'bg-white' : 'bg-gray-300'}`} />
                      {salon.openNow ? 'Ouvert' : 'Fermé'}
                    </div>

                    {/* Verified */}
                    {salon.verified && (
                      <div className="absolute top-3 right-12 bg-white/90 text-green-600 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle size={10} /> Vérifié
                      </div>
                    )}

                    {/* Remove from favs */}
                    <button
                      onClick={() => removeFav(salon.id)}
                      title="Retirer des favoris"
                      className="absolute top-2.5 right-2.5 w-7 h-7 bg-white/90 hover:bg-red-50 rounded-full flex items-center justify-center transition-colors group/heart"
                    >
                      <Heart size={13} className="fill-red-400 text-red-400 group-hover/heart:fill-red-500" />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">{salon.name}</h3>
                      <div className="flex items-center gap-0.5 shrink-0">
                        <Star size={11} className="fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-gray-700">{salon.rating}</span>
                        <span className="text-xs text-gray-400">({salon.reviews})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                      <MapPin size={11} /> {salon.district}, {salon.city}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {salon.tags.slice(0, 2).map(t => (
                        <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{t}</span>
                      ))}
                      {salon.tags.length > 2 && (
                        <span className="text-xs text-gray-400">+{salon.tags.length - 2}</span>
                      )}
                    </div>

                    {/* Next slot */}
                    <div className="flex items-center gap-1.5 text-xs text-primary-600 font-medium mb-3 bg-primary-50 rounded-lg px-2.5 py-1.5">
                      <Clock size={11} />
                      Prochain créneau : <span className="font-bold">{salon.nextSlot}</span>
                    </div>

                    {/* Last visit */}
                    <p className="text-xs text-gray-400 mb-4">
                      Dernière visite : <span className="text-gray-600 font-medium">{salon.lastVisit}</span>
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        to={`/client/reserver/${salon.id}`}
                        className="flex-1 text-xs bg-primary-500 hover:bg-primary-600 text-white px-3 py-2 rounded-xl font-semibold transition-colors text-center"
                      >
                        Réserver
                      </Link>
                      <button
                        onClick={() => removeFav(salon.id)}
                        className="text-xs border border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-400 px-3 py-2 rounded-xl transition-colors flex items-center gap-1"
                      >
                        <Trash2 size={12} /> Retirer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Discover more */}
            <div className="mt-10 text-center">
              <p className="text-sm text-gray-400 mb-3">Envie de découvrir d'autres instituts ?</p>
              <Link to="/client/salons" className="btn-outline inline-flex items-center gap-2">
                Explorer tous les instituts <ArrowRight size={14} />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}