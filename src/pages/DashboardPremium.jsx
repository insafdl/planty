import { Link } from 'react-router-dom'
import { Download, FileText, Plus, TrendingUp, TrendingDown } from 'lucide-react'
import Navbar from '../components/Navbar'
import DashboardSidebar from '../components/DashboardSidebar'

const RECENT_RDV = [
  { client: 'Leila Mansouri', service: 'Massage', employee: 'Camille B.', date: '25 Fév · 9h30', status: 'Confirmé' },
  { client: 'Karima Boudiaf', service: 'Soin visage', employee: 'Camille B.', date: '25 Fév · 11h', status: 'Attente' },
  { client: 'Sonia Daoud', service: 'Épilation', employee: 'Sara M.', date: '24 Fév · 14h', status: 'Confirmé' },
  { client: 'Rym Khelifi', service: 'Manucure', employee: 'Sara M.', date: '23 Fév · 15h30', status: 'Annulé' },
]

const LOYAL = [
  { name: 'Leila Mansouri', visits: '8 RDV · 3 mois', amount: 9600, color: 'bg-pink-400', initial: 'L' },
  { name: 'Karima Boudiaf', visits: '6 RDV · 2 mois', amount: 7200, color: 'bg-indigo-400', initial: 'K' },
  { name: 'Sonia Daoud', visits: '5 RDV · 3 min', amount: 5800, color: 'bg-teal-400', initial: 'S' },
]

const OCCUPATION = [
  { day: 'Lundi', pct: 92, color: 'bg-primary-500' },
  { day: 'Mardi', pct: 75, color: 'bg-orange-400' },
  { day: 'Mercredi', pct: 88, color: 'bg-primary-500' },
  { day: 'Vendredi', pct: 95, color: 'bg-yellow-400' },
]

const MONTHS_CHART = ['Sep', 'Oct', 'Nov', 'Déc', 'Jan', 'Fév']

export default function DashboardPremium() {
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
                Bonjour Sharon <span className="bg-primary-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">Premium</span>
              </h1>
              <p className="text-sm text-gray-400">Mercredi 25 Février 2026</p>
            </div>
            <div className="flex gap-3">
              <button className="btn-outline text-sm flex items-center gap-1.5"><Download size={14} /> CSV</button>
              <button className="btn-outline text-sm flex items-center gap-1.5"><FileText size={14} /> PDF</button>
              <Link to="/reserver/sharon-beauty" className="btn-primary flex items-center gap-1.5"><Plus size={14} /> Nouveau RDV</Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { value: '143 800 DA', label: 'Revenus ce mois', sub: '↑ +18% vs mois dernier', up: true },
              { value: '47', label: 'RDV ce mois', sub: '↑ +12%', up: true },
              { value: '4.8', label: 'Note moyenne', sub: '↑ +0.2', up: true },
              { value: '89', label: 'Clients uniques', sub: '↑ +7 ce mois', up: true },
            ].map(s => (
              <div key={s.label} className="card p-4">
                <div className="font-display text-2xl font-bold text-gray-900 mb-1">{s.value}</div>
                <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                <div className={`text-xs font-semibold flex items-center gap-1 ${s.up ? 'text-green-500' : 'text-red-500'}`}>
                  {s.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />}{s.sub}
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Revenue chart */}
            <div className="card p-5">
              <h2 className="font-semibold text-gray-800 mb-1">Revenus mensuels</h2>
              <p className="text-xs text-gray-400 mb-4">6 derniers mois</p>
              <div className="flex items-end gap-2 h-24">
                {[40, 55, 65, 80, 70, 100].map((h, i) => (
                  <div key={i} className={`flex-1 rounded-t-lg transition-all ${i === 5 ? 'bg-primary-500' : 'bg-primary-100'}`} style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="flex justify-between mt-1">
                {MONTHS_CHART.map(m => <span key={m} className="text-xs text-gray-400">{m}</span>)}
              </div>
            </div>

            {/* Occupation */}
            <div className="card p-5">
              <h2 className="font-semibold text-gray-800 mb-1">Taux d'occupation</h2>
              <p className="text-xs text-gray-400 mb-4">Par jour de la semaine</p>
              <div className="space-y-3">
                {OCCUPATION.map(o => (
                  <div key={o.day} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-20">{o.day}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div className={`h-2 rounded-full ${o.color}`} style={{ width: `${o.pct}%` }} />
                    </div>
                    <span className="text-xs font-bold text-gray-700 w-8 text-right">{o.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Loyal clients */}
            <div className="card p-5">
              <h2 className="font-semibold text-gray-800 mb-4">Clients fidèles</h2>
              <div className="space-y-3">
                {LOYAL.map(c => (
                  <div key={c.name} className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${c.color} rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}>{c.initial}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-gray-900">{c.name}</div>
                      <div className="text-xs text-gray-400">{c.visits}</div>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{c.amount.toLocaleString()} DA</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent reservations */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800">Réservations récentes</h2>
              <Link to="#" className="text-xs text-primary-500 font-semibold">Voir tout →</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['Client', 'Prestation', 'Employée', 'Date', 'Statut'].map(h => (
                      <th key={h} className="text-left text-xs font-bold text-gray-400 uppercase tracking-wide pb-3 pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {RECENT_RDV.map(r => (
                    <tr key={r.client} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 pr-4 font-medium text-gray-900">{r.client}</td>
                      <td className="py-3 pr-4 text-gray-600">{r.service}</td>
                      <td className="py-3 pr-4 text-gray-600">{r.employee}</td>
                      <td className="py-3 pr-4 text-gray-600">{r.date}</td>
                      <td className="py-3">
                        <span className={r.status === 'Confirmé' ? 'status-confirmed' : r.status === 'Attente' ? 'status-pending' : 'status-cancelled'}>{r.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}