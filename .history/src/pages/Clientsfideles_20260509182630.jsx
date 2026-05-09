import { useState } from 'react'
import { Heart, Search, Star, TrendingUp, ChevronDown, Phone, Calendar, Award, Crown, Gem } from 'lucide-react'
import Navbar from '../components/Navbar'
import DashboardSidebar from '../components/DashboardSidebar'

// ── Données mock ──────────────────────────────────────────────────────────────
const CLIENTS = [
  {
    id: 1, firstName: 'Leila',   lastName: 'Mansouri', initial: 'L', color: 'bg-pink-200',
    phone: '+213 555 11 22 33', since: '2020-04-10',
    visits: 48, totalSpent: 86400, lastVisit: '2026-05-09',
    avgSpend: 1800, rating: 5.0, tier: 'gold',
    services: ['Soin visage', 'Massage', 'Épilation'],
    nextRdv: 'Sam 17 Mai',
  },
  {
    id: 2, firstName: 'Karima',  lastName: 'Bensalem', initial: 'K', color: 'bg-indigo-200',
    phone: '+213 555 09 87 65', since: '2021-01-15',
    visits: 36, totalSpent: 57600, lastVisit: '2026-05-07',
    avgSpend: 1600, rating: 4.8, tier: 'gold',
    services: ['Manucure', 'Nail art', 'Pédicure'],
    nextRdv: 'Lun 12 Mai',
  },
  {
    id: 3, firstName: 'Sonia',   lastName: 'Dahmani',  initial: 'S', color: 'bg-teal-200',
    phone: '+213 555 44 55 66', since: '2021-06-20',
    visits: 29, totalSpent: 52200, lastVisit: '2026-04-30',
    avgSpend: 1800, rating: 4.9, tier: 'silver',
    services: ['Lissage', 'Coupe', 'Coloration'],
    nextRdv: null,
  },
  {
    id: 4, firstName: 'Rania',   lastName: 'Hamdi',    initial: 'R', color: 'bg-orange-200',
    phone: '+213 555 22 33 44', since: '2022-03-05',
    visits: 22, totalSpent: 33000, lastVisit: '2026-05-01',
    avgSpend: 1500, rating: 4.7, tier: 'silver',
    services: ['Épilation', 'Soin visage'],
    nextRdv: 'Mar 13 Mai',
  },
  {
    id: 5, firstName: 'Amira',   lastName: 'Toumi',    initial: 'A', color: 'bg-rose-200',
    phone: '+213 555 55 66 77', since: '2022-09-12',
    visits: 18, totalSpent: 27000, lastVisit: '2026-04-20',
    avgSpend: 1500, rating: 4.6, tier: 'silver',
    services: ['Massage', 'Soin corps'],
    nextRdv: null,
  },
  {
    id: 6, firstName: 'Dalya',   lastName: 'Nouri',    initial: 'D', color: 'bg-purple-200',
    phone: '+213 555 77 88 99', since: '2023-02-18',
    visits: 12, totalSpent: 16800, lastVisit: '2026-05-05',
    avgSpend: 1400, rating: 4.5, tier: 'bronze',
    services: ['Manucure', 'Épilation'],
    nextRdv: 'Jeu 15 Mai',
  },
  {
    id: 7, firstName: 'Yasmine', lastName: 'Kaci',     initial: 'Y', color: 'bg-sky-200',
    phone: '+213 555 33 44 55', since: '2023-05-30',
    visits: 9,  totalSpent: 12600, lastVisit: '2026-04-15',
    avgSpend: 1400, rating: 4.4, tier: 'bronze',
    services: ['Coupe', 'Coloration'],
    nextRdv: null,
  },
  {
    id: 8, firstName: 'Nadia',   lastName: 'Slimani',  initial: 'N', color: 'bg-lime-200',
    phone: '+213 555 66 77 88', since: '2023-08-14',
    visits: 7,  totalSpent: 9800,  lastVisit: '2026-03-28',
    avgSpend: 1400, rating: 4.3, tier: 'bronze',
    services: ['Soin visage'],
    nextRdv: null,
  },
]

const TIERS = {
  gold:   { label: 'Gold',   icon: Crown, bg: 'bg-amber-100',  text: 'text-amber-600',  border: 'border-amber-200',  dot: 'bg-amber-400'  },
  silver: { label: 'Silver', icon: Gem,   bg: 'bg-slate-100',  text: 'text-slate-500',  border: 'border-slate-200',  dot: 'bg-slate-400'  },
  bronze: { label: 'Bronze', icon: Award, bg: 'bg-orange-100', text: 'text-orange-500', border: 'border-orange-200', dot: 'bg-orange-400' },
}

const SORT_OPTIONS = [
  { value: 'visits',     label: 'Visites' },
  { value: 'totalSpent', label: 'Dépenses' },
  { value: 'lastVisit',  label: 'Dernière visite' },
  { value: 'rating',     label: 'Note' },
]

function fmt(n) { return n.toLocaleString('fr-DZ') + ' DA' }

function daysSince(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  return Math.floor(diff / 86400000)
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ClientsFideles() {
  const [search, setSearch]       = useState('')
  const [tierFilter, setTierFilter] = useState('all')
  const [sortBy, setSortBy]       = useState('visits')
  const [sortOpen, setSortOpen]   = useState(false)
  const [expanded, setExpanded]   = useState(null)

  const filtered = CLIENTS
    .filter(c => {
      const q = search.toLowerCase()
      const matchSearch = !q ||
        `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
        c.services.some(s => s.toLowerCase().includes(q))
      const matchTier = tierFilter === 'all' || c.tier === tierFilter
      return matchSearch && matchTier
    })
    .sort((a, b) => {
      if (sortBy === 'lastVisit') return new Date(b.lastVisit) - new Date(a.lastVisit)
      return b[sortBy] - a[sortBy]
    })

  const totalRevenue  = CLIENTS.reduce((s, c) => s + c.totalSpent, 0)
  const totalVisits   = CLIENTS.reduce((s, c) => s + c.visits, 0)
  const goldCount     = CLIENTS.filter(c => c.tier === 'gold').length
  const avgVisits     = Math.round(totalVisits / CLIENTS.length)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar variant="dashboard" />
      <div className="flex flex-1">
        <DashboardSidebar isPremium={true} />

        <main className="flex-1 p-6 overflow-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display text-2xl font-bold text-gray-900 flex items-center gap-2">
                Clients fidèles
                <span className="text-xs font-semibold bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star size={10} className="fill-amber-500 text-amber-500" /> Premium
                </span>
              </h1>
              <p className="text-sm text-gray-400">Vos clients les plus engagés et leur historique</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { value: CLIENTS.length, label: 'Clients fidèles', sub: 'inscrits',           subColor: 'text-primary-500' },
              { value: goldCount,      label: 'Membres Gold',     sub: '10+ visites',        subColor: 'text-amber-500'   },
              { value: fmt(totalRevenue), label: 'Revenus générés', sub: 'par ces clients',  subColor: 'text-green-500'   },
              { value: avgVisits,      label: 'Visites moy.',     sub: 'par client',         subColor: 'text-gray-400'    },
            ].map(s => (
              <div key={s.label} className="card p-4">
                <div className="font-display text-2xl font-bold text-gray-900 mb-1 truncate">{s.value}</div>
                <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                <div className={`text-xs font-semibold ${s.subColor}`}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Recherche + filtres + tri */}
          <div className="flex items-center gap-3 mb-5">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher par nom ou service…"
                className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition bg-white"
              />
            </div>

            {/* Filtres tier */}
            <div className="flex gap-2 text-xs">
              {[
                { value: 'all',    label: 'Tous' },
                { value: 'gold',   label: '👑 Gold' },
                { value: 'silver', label: '💎 Silver' },
                { value: 'bronze', label: '🏅 Bronze' },
              ].map(f => (
                <button key={f.value} onClick={() => setTierFilter(f.value)}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    tierFilter === f.value ? 'bg-primary-500 text-white' : 'text-gray-500 hover:bg-gray-100'
                  }`}>
                  {f.label}
                </button>
              ))}
            </div>

            {/* Tri */}
            <div className="relative">
              <button onClick={() => setSortOpen(v => !v)}
                className="btn-outline flex items-center gap-1.5 text-sm shrink-0">
                <TrendingUp size={13} />
                {SORT_OPTIONS.find(s => s.value === sortBy)?.label}
                <ChevronDown size={13} />
              </button>
              {sortOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                  <div className="absolute right-0 top-10 z-20 bg-white rounded-xl shadow-lg border border-gray-100 w-40 py-1 overflow-hidden">
                    {SORT_OPTIONS.map(o => (
                      <button key={o.value} onClick={() => { setSortBy(o.value); setSortOpen(false) }}
                        className={`w-full px-4 py-2 text-sm text-left transition-colors ${sortBy === o.value ? 'text-primary-500 font-medium bg-primary-50' : 'text-gray-700 hover:bg-gray-50'}`}>
                        {o.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Liste clients */}
          <div className="card p-5">
            <div className="space-y-1">
              {filtered.map((c, i) => {
                const tier    = TIERS[c.tier]
                const TierIcon = tier.icon
                const isOpen  = expanded === c.id
                const days    = daysSince(c.lastVisit)

                return (
                  <div key={c.id}>
                    {i > 0 && <div className="border-t border-gray-50 my-1" />}

                    {/* Ligne principale */}
                    <button
                      onClick={() => setExpanded(isOpen ? null : c.id)}
                      className="w-full flex items-center gap-4 py-2 group text-left"
                    >
                      {/* Rang */}
                      <span className="text-xs font-bold text-gray-300 w-5 shrink-0 text-center">
                        {filtered.indexOf(c) + 1}
                      </span>

                      {/* Avatar */}
                      <div className={`w-9 h-9 ${c.color} rounded-full flex items-center justify-center text-xs font-bold text-gray-700 shrink-0`}>
                        {c.initial}
                      </div>

                      {/* Nom + tier */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-gray-900">{c.firstName} {c.lastName}</span>
                          <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${tier.bg} ${tier.text} ${tier.border}`}>
                            <TierIcon size={9} /> {tier.label}
                          </span>
                          {c.nextRdv && (
                            <span className="status-confirmed text-[10px]">RDV {c.nextRdv}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-xs text-gray-400">
                            {c.visits} visite{c.visits > 1 ? 's' : ''}
                          </span>
                          <span className="text-gray-200">·</span>
                          <span className={`text-xs font-medium ${days > 60 ? 'text-amber-500' : 'text-gray-400'}`}>
                            {days === 0 ? "Aujourd'hui" : days === 1 ? 'Hier' : `Il y a ${days}j`}
                          </span>
                        </div>
                      </div>

                      {/* Stats compactes */}
                      <div className="hidden md:flex items-center gap-6 shrink-0">
                        <div className="text-center">
                          <p className="text-sm font-bold text-gray-900">{fmt(c.totalSpent)}</p>
                          <p className="text-[10px] text-gray-400">Total dépensé</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-gray-900">{fmt(c.avgSpend)}</p>
                          <p className="text-[10px] text-gray-400">Moy. / visite</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center gap-0.5 justify-center">
                            <Star size={11} className="fill-amber-400 text-amber-400" />
                            <span className="text-sm font-bold text-gray-900">{c.rating}</span>
                          </div>
                          <p className="text-[10px] text-gray-400">Note</p>
                        </div>
                      </div>

                      {/* Chevron */}
                      <ChevronDown size={15} className={`text-gray-300 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Détail expandé */}
                    {isOpen && (
                      <div className="ml-14 mb-3 mt-1 bg-gray-50 rounded-2xl p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Infos contact */}
                        <div className="space-y-2">
                          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Contact</p>
                          <a href={`tel:${c.phone}`} className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-primary-500 transition-colors">
                            <Phone size={11} /> {c.phone}
                          </a>
                          <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <Calendar size={11} /> Client depuis {formatDate(c.since)}
                          </div>
                        </div>

                        {/* Services préférés */}
                        <div className="space-y-2">
                          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Services</p>
                          <div className="flex flex-wrap gap-1">
                            {c.services.map(s => (
                              <span key={s} className="bg-primary-50 text-primary-500 text-[10px] font-medium px-2 py-0.5 rounded-full">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Fidélité */}
                        <div className="space-y-2">
                          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Fidélité</p>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">Visites</span>
                              <span className="font-semibold text-gray-800">{c.visits}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div className="h-1.5 rounded-full bg-primary-500"
                                style={{ width: `${Math.min((c.visits / 50) * 100, 100)}%` }} />
                            </div>
                            <p className="text-[10px] text-gray-400">
                              {c.visits >= 50 ? '🏆 Palier max atteint' : `${50 - c.visits} visites avant le palier suivant`}
                            </p>
                          </div>
                        </div>

                        {/* Prochain RDV */}
                        <div className="space-y-2">
                          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Prochain RDV</p>
                          {c.nextRdv ? (
                            <span className="status-confirmed">{c.nextRdv}</span>
                          ) : (
                            <p className="text-xs text-gray-400 italic">Aucun RDV prévu</p>
                          )}
                          <p className="text-[10px] text-gray-400">
                            Dernière visite : {formatDate(c.lastVisit)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}