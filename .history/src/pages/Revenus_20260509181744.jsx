import { useState } from 'react'
import { TrendingUp, TrendingDown, Download, Calendar, ChevronDown, Star, Lock } from 'lucide-react'
import Navbar from '../components/Navbar'
import DashboardSidebar from '../components/DashboardSidebar'

// ── Données mock ──────────────────────────────────────────────────────────────
const MONTHS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']

const MONTHLY_DATA = [
  { month: 'Jan', revenue: 42000, rdv: 28, avg: 1500 },
  { month: 'Fév', revenue: 38500, rdv: 24, avg: 1604 },
  { month: 'Mar', revenue: 55000, rdv: 35, avg: 1571 },
  { month: 'Avr', revenue: 61200, rdv: 40, avg: 1530 },
  { month: 'Mai', revenue: 58900, rdv: 38, avg: 1550 },
  { month: 'Juin', revenue: 72400, rdv: 46, avg: 1574 },
  { month: 'Juil', revenue: 65000, rdv: 42, avg: 1548 },
  { month: 'Août', revenue: 48000, rdv: 30, avg: 1600 },
  { month: 'Sep', revenue: 69500, rdv: 44, avg: 1580 },
  { month: 'Oct', revenue: 74200, rdv: 48, avg: 1546 },
  { month: 'Nov', revenue: 80100, rdv: 52, avg: 1540 },
  { month: 'Déc', revenue: 91500, rdv: 58, avg: 1578 },
]

const TOP_SERVICES = [
  { name: 'Soin visage hydratant', count: 124, revenue: 186000, color: 'bg-pink-400' },
  { name: 'Épilation complète', count: 98, revenue: 147000, color: 'bg-primary-400' },
  { name: 'Massage relaxant', count: 87, revenue: 130500, color: 'bg-violet-400' },
  { name: 'Manucure gel', count: 76, revenue: 76000, color: 'bg-amber-400' },
  { name: 'Lissage brésilien', count: 42, revenue: 126000, color: 'bg-teal-400' },
]

const TRANSACTIONS = [
  { id: 'RES-0091', date: 'Sam 9 Mai', client: 'Leila M.',    initial: 'L', color: 'bg-pink-200',   service: 'Soin visage', amount: 1500, status: 'Confirmé' },
  { id: 'RES-0090', date: 'Sam 9 Mai', client: 'Karima B.',   initial: 'K', color: 'bg-indigo-200', service: 'Épilation',   amount: 1200, status: 'Confirmé' },
  { id: 'RES-0089', date: 'Ven 8 Mai', client: 'Sonia D.',    initial: 'S', color: 'bg-teal-200',   service: 'Massage',     amount: 2000, status: 'Confirmé' },
  { id: 'RES-0088', date: 'Ven 8 Mai', client: 'Rania H.',    initial: 'R', color: 'bg-orange-200', service: 'Manucure',    amount: 800,  status: 'Confirmé' },
  { id: 'RES-0087', date: 'Jeu 7 Mai', client: 'Amira T.',    initial: 'A', color: 'bg-rose-200',   service: 'Lissage',     amount: 3500, status: 'Annulé'   },
  { id: 'RES-0086', date: 'Jeu 7 Mai', client: 'Dalya N.',    initial: 'D', color: 'bg-purple-200', service: 'Soin visage', amount: 1500, status: 'Confirmé' },
  { id: 'RES-0085', date: 'Mer 6 Mai', client: 'Yasmine K.',  initial: 'Y', color: 'bg-sky-200',    service: 'Épilation',   amount: 1200, status: 'Confirmé' },
  { id: 'RES-0084', date: 'Mer 6 Mai', client: 'Nadia S.',    initial: 'N', color: 'bg-lime-200',   service: 'Massage',     amount: 2000, status: 'Confirmé' },
]

const PERIODS = ['Cette semaine', 'Ce mois', 'Cette année']

function fmt(n) {
  return n.toLocaleString('fr-DZ') + ' DA'
}

// ── Mini bar chart SVG ────────────────────────────────────────────────────────
function BarChart({ data, activeMonth }) {
  const max = Math.max(...data.map(d => d.revenue))
  const w = 720
  const h = 140
  const barW = 36
  const gap = (w - data.length * barW) / (data.length + 1)

  return (
    <svg viewBox={`0 0 ${w} ${h + 24}`} className="w-full">
      {data.map((d, i) => {
        const x = gap + i * (barW + gap)
        const barH = (d.revenue / max) * h
        const y = h - barH
        const isActive = d.month === activeMonth
        return (
          <g key={d.month}>
            <rect
              x={x} y={y} width={barW} height={barH}
              rx={6}
              fill={isActive ? '#e91e8c' : '#fce7f1'}
              opacity={isActive ? 1 : 0.7}
            />
            <text
              x={x + barW / 2} y={h + 16}
              textAnchor="middle"
              fontSize={10}
              fill={isActive ? '#e91e8c' : '#9ca3af'}
              fontWeight={isActive ? '600' : '400'}
            >
              {d.month}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ── Page principale ───────────────────────────────────────────────────────────
export default function Revenus() {
  const [period, setPeriod] = useState('Ce mois')
  const [activeMonth, setActiveMonth] = useState('Déc')
  const [periodOpen, setPeriodOpen] = useState(false)

  const currentMonth = MONTHLY_DATA.find(d => d.month === activeMonth) ?? MONTHLY_DATA[11]
  const prevMonth    = MONTHLY_DATA[MONTHLY_DATA.findIndex(d => d.month === activeMonth) - 1]

  const totalYear    = MONTHLY_DATA.reduce((s, d) => s + d.revenue, 0)
  const totalRdvYear = MONTHLY_DATA.reduce((s, d) => s + d.rdv, 0)
  const avgMonthly   = Math.round(totalYear / 12)
  const maxMonth     = MONTHLY_DATA.reduce((a, b) => a.revenue > b.revenue ? a : b)

  const revDiff = prevMonth
    ? Math.round(((currentMonth.revenue - prevMonth.revenue) / prevMonth.revenue) * 100)
    : null

  const maxServiceRev = Math.max(...TOP_SERVICES.map(s => s.revenue))

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
                Revenus
                <span className="text-xs font-semibold bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star size={10} className="fill-amber-500 text-amber-500" /> Premium
                </span>
              </h1>
              <p className="text-sm text-gray-400">Analyse complète de votre activité financière</p>
            </div>
            <div className="flex gap-3">
              {/* Sélecteur période */}
              <div className="relative">
                <button
                  onClick={() => setPeriodOpen(v => !v)}
                  className="btn-outline flex items-center gap-1.5 text-sm"
                >
                  <Calendar size={14} /> {period} <ChevronDown size={13} />
                </button>
                {periodOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setPeriodOpen(false)} />
                    <div className="absolute right-0 top-10 z-20 bg-white rounded-xl shadow-lg border border-gray-100 w-44 py-1 overflow-hidden">
                      {PERIODS.map(p => (
                        <button key={p} onClick={() => { setPeriod(p); setPeriodOpen(false) }}
                          className={`w-full px-4 py-2 text-sm text-left transition-colors ${period === p ? 'text-primary-500 font-medium bg-primary-50' : 'text-gray-700 hover:bg-gray-50'}`}>
                          {p}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <button className="btn-outline flex items-center gap-1.5 text-sm">
                <Download size={14} /> Exporter
              </button>
            </div>
          </div>

          {/* Stats annuelles */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { value: fmt(totalYear),    label: 'Revenus annuels',    sub: 'exercice 2025',            subColor: 'text-primary-500' },
              { value: fmt(avgMonthly),   label: 'Moyenne mensuelle',  sub: `max : ${fmt(maxMonth.revenue)} (${maxMonth.month})`, subColor: 'text-green-500' },
              { value: totalRdvYear,      label: 'RDV réalisés',       sub: 'cette année',               subColor: 'text-gray-400'   },
              { value: fmt(Math.round(totalYear / totalRdvYear)), label: 'Panier moyen', sub: 'par réservation', subColor: 'text-amber-500' },
            ].map(s => (
              <div key={s.label} className="card p-4">
                <div className="font-display text-2xl font-bold text-gray-900 mb-1 truncate">{s.value}</div>
                <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                <div className={`text-xs font-semibold truncate ${s.subColor}`}>{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">

            {/* Graphique annuel */}
            <div className="lg:col-span-2 card p-5">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-semibold text-gray-800">Revenus mensuels — 2025</h2>
                <span className="text-xs text-gray-400">Cliquez sur un mois pour les détails</span>
              </div>
              <p className="text-xs text-gray-400 mb-4">Mois sélectionné : <span className="font-semibold text-gray-700">{activeMonth}</span> — {fmt(currentMonth.revenue)}</p>

              {/* Barres cliquables */}
              <div className="flex items-end gap-1.5 h-36 mb-2">
                {MONTHLY_DATA.map(d => {
                  const max = Math.max(...MONTHLY_DATA.map(x => x.revenue))
                  const pct = (d.revenue / max) * 100
                  const isActive = d.month === activeMonth
                  return (
                    <button key={d.month} onClick={() => setActiveMonth(d.month)}
                      className="flex-1 flex flex-col items-center gap-1 group"
                    >
                      <div
                        className={`w-full rounded-t-lg transition-all ${isActive ? 'bg-primary-500' : 'bg-primary-100 group-hover:bg-primary-200'}`}
                        style={{ height: `${pct}%` }}
                      />
                      <span className={`text-[10px] font-medium ${isActive ? 'text-primary-500' : 'text-gray-400'}`}>{d.month}</span>
                    </button>
                  )
                })}
              </div>

              {/* Détail mois sélectionné */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <p className="font-bold text-gray-900">{fmt(currentMonth.revenue)}</p>
                  <p className="text-xs text-gray-400">Revenus</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900">{currentMonth.rdv}</p>
                  <p className="text-xs text-gray-400">Réservations</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <p className="font-bold text-gray-900">{fmt(currentMonth.avg)}</p>
                    {revDiff !== null && (
                      <span className={`text-xs font-semibold flex items-center gap-0.5 ${revDiff >= 0 ? 'text-green-500' : 'text-red-400'}`}>
                        {revDiff >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                        {Math.abs(revDiff)}%
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">Panier moyen</p>
                </div>
              </div>
            </div>

            {/* Top services */}
            <div className="card p-5">
              <h2 className="font-semibold text-gray-800 mb-4">Top services</h2>
              <div className="space-y-3">
                {TOP_SERVICES.map((s, i) => (
                  <div key={s.name}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-xs font-bold text-gray-400 w-4 shrink-0">#{i + 1}</span>
                        <span className="text-xs font-medium text-gray-700 truncate">{s.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-gray-900 shrink-0 ml-2">{fmt(s.revenue)}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${s.color}`}
                        style={{ width: `${(s.revenue / maxServiceRev) * 100}%` }} />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-0.5">{s.count} réservations</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Transactions récentes */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800">Transactions récentes</h2>
              <span className="text-xs text-gray-400">{TRANSACTIONS.length} dernières</span>
            </div>
            <div className="space-y-1">
              {TRANSACTIONS.map((t, i) => (
                <div key={t.id}>
                  {i > 0 && <div className="border-t border-gray-50 my-1" />}
                  <div className="flex items-center gap-4 py-1.5 group">
                    {/* Avatar */}
                    <div className={`w-8 h-8 ${t.color} rounded-full flex items-center justify-center text-xs font-bold text-gray-700 shrink-0`}>
                      {t.initial}
                    </div>
                    {/* Infos */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">{t.client}</span>
                        <span className="text-xs text-gray-400">{t.service}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-400">{t.id}</span>
                        <span className="text-gray-200">·</span>
                        <span className="text-xs text-gray-400">{t.date}</span>
                      </div>
                    </div>
                    {/* Statut */}
                    <span className={t.status === 'Confirmé' ? 'status-confirmed' : 'bg-red-100 text-red-500 text-xs font-medium px-2 py-0.5 rounded-full'}>
                      {t.status}
                    </span>
                    {/* Montant */}
                    <span className={`text-sm font-bold shrink-0 ${t.status === 'Annulé' ? 'text-gray-300 line-through' : 'text-gray-900'}`}>
                      {fmt(t.amount)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}