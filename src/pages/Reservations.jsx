import { useState } from 'react'
import { Search, Filter, Phone, Calendar, Clock, Scissors, CheckCircle, XCircle, AlertCircle, ChevronDown, Download, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import DashboardSidebar from '../components/DashboardSidebar'

// ── Mock data ─────────────────────────────────────────────────────────────────

const RESERVATIONS = [
  { id: 'PLT-2026-08472', name: 'Leila Mansouri',   phone: '0555 123 456', date: '2026-05-09', time: '09:30', service: 'Massage relaxant 40 min',    price: 2500, status: 'confirmed' },
  { id: 'PLT-2026-08471', name: 'Karima Benali',    phone: '0661 987 321', date: '2026-05-09', time: '11:00', service: 'Soin visage hydratant 45 min', price: 3200, status: 'pending'   },
  { id: 'PLT-2026-08470', name: 'Sonia Dahmani',    phone: '0770 456 789', date: '2026-05-09', time: '14:00', service: 'Épilation complète 30 min',    price: 1800, status: 'confirmed' },
  { id: 'PLT-2026-08469', name: 'Rania Khelifi',    phone: '0555 654 321', date: '2026-05-10', time: '10:00', service: 'Manucure + vernis 45 min',     price: 1500, status: 'confirmed' },
  { id: 'PLT-2026-08468', name: 'Amira Boudissa',   phone: '0660 111 222', date: '2026-05-10', time: '11:30', service: 'Massage dos 30 min',           price: 2000, status: 'pending'   },
  { id: 'PLT-2026-08467', name: 'Yasmine Hamdi',    phone: '0771 333 444', date: '2026-05-12', time: '09:00', service: 'Soin corps complet 60 min',    price: 4500, status: 'confirmed' },
  { id: 'PLT-2026-08466', name: 'Dalya Messaoudi',  phone: '0555 777 888', date: '2026-05-14', time: '15:00', service: 'Épilation visage 15 min',      price: 800,  status: 'cancelled' },
  { id: 'PLT-2026-08465', name: 'Nadia Ferhat',     phone: '0661 999 000', date: '2026-05-15', time: '10:30', service: 'Manucure gel 60 min',          price: 2200, status: 'confirmed' },
  { id: 'PLT-2026-08464', name: 'Sara Hadj',        phone: '0770 222 333', date: '2026-05-16', time: '14:30', service: 'Massage relaxant 40 min',      price: 2500, status: 'pending'   },
  { id: 'PLT-2026-08463', name: 'Meryen Boukhari',  phone: '0555 444 555', date: '2026-05-20', time: '11:00', service: 'Soin visage hydratant 45 min', price: 3200, status: 'confirmed' },
  { id: 'PLT-2026-08462', name: 'Asma Tlili',       phone: '0660 666 777', date: '2026-05-22', time: '09:30', service: 'Épilation complète 30 min',    price: 1800, status: 'cancelled' },
  { id: 'PLT-2026-08461', name: 'Fatima Zerrouk',   phone: '0771 888 999', date: '2026-05-25', time: '16:00', service: 'Soin corps complet 60 min',    price: 4500, status: 'confirmed' },
]

const STATUS_CONFIG = {
  confirmed: { label: 'Confirmé',  className: 'status-confirmed', Icon: CheckCircle,  color: 'text-green-500'  },
  pending:   { label: 'En attente', className: 'status-pending',   Icon: AlertCircle,  color: 'text-amber-500'  },
  cancelled: { label: 'Annulé',    className: 'bg-red-100 text-red-600 text-xs font-semibold px-2.5 py-0.5 rounded-full', Icon: XCircle, color: 'text-red-400' },
}

const MONTHS_FR = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  const days = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam']
  return `${days[date.getDay()]} ${d} ${MONTHS_FR[m - 1]}`
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

const AVATAR_COLORS = [
  'bg-pink-200 text-pink-700',
  'bg-purple-200 text-purple-700',
  'bg-blue-200 text-blue-700',
  'bg-teal-200 text-teal-700',
  'bg-amber-200 text-amber-700',
  'bg-rose-200 text-rose-700',
  'bg-indigo-200 text-indigo-700',
]

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Reservations() {
  const [search,       setSearch]      = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy,       setSortBy]      = useState('date-asc')
  const [showFilters,  setShowFilters] = useState(false)

  // Filter + sort
  const filtered = RESERVATIONS
    .filter(r => {
      const q = search.toLowerCase()
      const matchSearch = r.name.toLowerCase().includes(q) || r.phone.includes(q) || r.service.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)
      const matchStatus = statusFilter === 'all' || r.status === statusFilter
      return matchSearch && matchStatus
    })
    .sort((a, b) => {
      if (sortBy === 'date-asc')  return `${a.date}${a.time}` < `${b.date}${b.time}` ? -1 : 1
      if (sortBy === 'date-desc') return `${a.date}${a.time}` > `${b.date}${b.time}` ? -1 : 1
      if (sortBy === 'name')      return a.name.localeCompare(b.name)
      return 0
    })

  // Group by date
  const grouped = filtered.reduce((acc, r) => {
    if (!acc[r.date]) acc[r.date] = []
    acc[r.date].push(r)
    return acc
  }, {})
  const groupedDates = Object.keys(grouped).sort()

  // Stats
  const total     = RESERVATIONS.length
  const confirmed = RESERVATIONS.filter(r => r.status === 'confirmed').length
  const pending   = RESERVATIONS.filter(r => r.status === 'pending').length
  const cancelled = RESERVATIONS.filter(r => r.status === 'cancelled').length

  const todayStr = new Date().toISOString().split('T')[0]
  const todayCount = RESERVATIONS.filter(r => r.date === todayStr).length

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-body">
      <Navbar variant="dashboard" />
      <div className="flex flex-1">
        <DashboardSidebar isPremium={false} />

        <main className="flex-1 p-6 overflow-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display text-2xl font-bold text-gray-900">Réservations</h1>
              <p className="text-sm text-gray-400">
                {todayCount > 0
                  ? `${todayCount} rendez-vous aujourd'hui`
                  : 'Toutes les réservations de votre institut'}
              </p>
            </div>
            <div className="flex gap-3">
              <button className="btn-outline text-sm flex items-center gap-1.5">
                <Download size={14} /> Exporter
              </button>
              <Link to="/reserver/sharon-beauty" className="btn-primary text-sm flex items-center gap-1.5">
                <Plus size={14} /> Nouveau RDV
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { value: total,     label: 'Total',       sub: 'ce mois',        subColor: 'text-gray-400' },
              { value: confirmed, label: 'Confirmés',   sub: `${Math.round(confirmed/total*100)}% du total`, subColor: 'text-green-500' },
              { value: pending,   label: 'En attente',  sub: 'À confirmer',    subColor: 'text-amber-500' },
              { value: cancelled, label: 'Annulés',     sub: `${Math.round(cancelled/total*100)}% du total`, subColor: 'text-red-400' },
            ].map(s => (
              <div key={s.label} className="card p-4">
                <div className="font-display text-3xl font-bold text-gray-900 mb-1">{s.value}</div>
                <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                <div className={`text-xs font-semibold ${s.subColor}`}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Search + filters */}
          <div className="card p-4 mb-6">
            <div className="flex gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 bg-gray-50"
                  placeholder="Rechercher par nom, téléphone, service…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>

              {/* Status tabs */}
              <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
                {[
                  { key: 'all',       label: 'Tous' },
                  { key: 'confirmed', label: 'Confirmés' },
                  { key: 'pending',   label: 'En attente' },
                  { key: 'cancelled', label: 'Annulés' },
                ].map(tab => (
                  <button key={tab.key} onClick={() => setStatusFilter(tab.key)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${statusFilter === tab.key ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <div className="relative">
                <button onClick={() => setShowFilters(f => !f)}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  <Filter size={14} /> Trier <ChevronDown size={13} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                {showFilters && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-20 w-44 py-1">
                    {[
                      { key: 'date-asc',  label: 'Date (proche d\'abord)' },
                      { key: 'date-desc', label: 'Date (loin d\'abord)' },
                      { key: 'name',      label: 'Nom (A → Z)' },
                    ].map(opt => (
                      <button key={opt.key} onClick={() => { setSortBy(opt.key); setShowFilters(false) }}
                        className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${sortBy === opt.key ? 'text-primary-600 bg-primary-50' : 'text-gray-600 hover:bg-gray-50'}`}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Reservations list grouped by date */}
          {groupedDates.length === 0 ? (
            <div className="card p-12 text-center">
              <div className="text-4xl mb-3">🔍</div>
              <p className="font-semibold text-gray-700 mb-1">Aucune réservation trouvée</p>
              <p className="text-sm text-gray-400">Essayez un autre terme de recherche</p>
            </div>
          ) : (
            <div className="space-y-6">
              {groupedDates.map(date => {
                const isToday = date === todayStr
                return (
                  <div key={date}>
                    {/* Date header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`text-sm font-bold ${isToday ? 'text-primary-500' : 'text-gray-500'}`}>
                        {isToday ? "Aujourd'hui · " : ''}{formatDate(date)}
                      </div>
                      <div className="flex-1 h-px bg-gray-100" />
                      <span className="text-xs text-gray-400 font-medium">
                        {grouped[date].length} RDV
                      </span>
                    </div>

                    {/* Cards */}
                    <div className="space-y-2">
                      {grouped[date].map((r, idx) => {
                        const cfg    = STATUS_CONFIG[r.status]
                        const StatusIcon = cfg.Icon
                        const avatarColor = AVATAR_COLORS[r.name.charCodeAt(0) % AVATAR_COLORS.length]

                        return (
                          <div key={r.id}
                            className={`card p-4 flex items-center gap-4 hover:shadow-md transition-shadow ${r.status === 'cancelled' ? 'opacity-60' : ''}`}>

                            {/* Avatar */}
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${avatarColor}`}>
                              {getInitials(r.name)}
                            </div>

                            {/* Name + phone */}
                            <div className="w-44 shrink-0">
                              <p className="text-sm font-semibold text-gray-900 truncate">{r.name}</p>
                              <a href={`tel:${r.phone}`}
                                className="text-xs text-gray-400 hover:text-primary-500 transition-colors flex items-center gap-1 mt-0.5">
                                <Phone size={10} /> {r.phone}
                              </a>
                            </div>

                            {/* Date + time */}
                            <div className="w-36 shrink-0">
                              <p className="text-xs text-gray-500 flex items-center gap-1">
                                <Calendar size={11} className="text-gray-400" /> {formatDate(r.date)}
                              </p>
                              <p className="text-sm font-bold text-gray-800 flex items-center gap-1 mt-0.5">
                                <Clock size={11} className="text-primary-400" /> {r.time}
                              </p>
                            </div>

                            {/* Service */}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-gray-400 flex items-center gap-1 mb-0.5">
                                <Scissors size={10} /> Prestation
                              </p>
                              <p className="text-sm font-medium text-gray-800 truncate">{r.service}</p>
                            </div>

                            {/* Price */}
                            <div className="w-24 text-right shrink-0">
                              <p className="text-xs text-gray-400 mb-0.5">Montant</p>
                              <p className="text-sm font-bold text-gray-900">{r.price.toLocaleString()} DA</p>
                            </div>

                            {/* Status */}
                            <div className="shrink-0 flex flex-col items-end gap-2">
                              <span className={cfg.className}>{cfg.label}</span>
                              {r.status === 'pending' && (
                                <div className="flex gap-1">
                                  <button className="text-[10px] font-bold px-2 py-1 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                                    Confirmer
                                  </button>
                                  <button className="text-[10px] font-bold px-2 py-1 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors">
                                    Refuser
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}