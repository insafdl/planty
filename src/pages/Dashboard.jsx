import { Link } from 'react-router-dom'
import { Download, Plus, Lock, TrendingUp, Star } from 'lucide-react'
import Navbar from '../components/Navbar'
import DashboardSidebar from '../components/DashboardSidebar'

const DAYS = ['Lu 23', 'Ma 24', 'Me 25', 'Je 26', 'Ve 27', 'Sa 28', 'Di 1']
const APPOINTMENTS = [
  { time: '09h30', name: 'Leila M.', color: 'bg-pink-400', day: 1 },
  { time: '10h00', name: 'Karima', color: 'bg-orange-400', day: 2 },
  { time: '10h30', name: 'Rania', color: 'bg-red-400', day: 3 },
  { time: '11h00', name: 'Dalya', color: 'bg-pink-300', day: 4 },
  { time: '10h00', name: 'Sara H.', color: 'bg-purple-400', day: 1 },
  { time: '11h00', name: 'Amira', color: 'bg-blue-400', day: 2 },
  { time: '11h00', name: 'Yasmine', color: 'bg-yellow-400', day: 3 },
  { time: '10h30', name: 'Nadia', color: 'bg-green-400', day: 4 },
  { time: '14h00', name: 'Meryen', color: 'bg-indigo-400', day: 1 },
  { time: '14h00', name: 'Asma', color: 'bg-pink-400', day: 2 },
  { time: '14h00', name: 'Sonia', color: 'bg-teal-400', day: 3 },
  { time: '14h00', name: 'Fatima', color: 'bg-orange-400', day: 4 },
  { time: '14h30', name: 'Hourla', color: 'bg-rose-400', day: 5 },
]

const TODAY_RDV = [
  { time: '09:30', name: 'Leila Mansouri', service: 'Massage 40min', status: 'Confirmé', color: 'bg-pink-200', initial: 'L' },
  { time: '11:00', name: 'Karima B.', service: 'Soin visage 45min', status: 'Attente', color: 'bg-indigo-200', initial: 'K' },
  { time: '14:00', name: 'Sonia D.', service: 'Épilation 10min', status: 'Confirmé', color: 'bg-teal-200', initial: 'S' },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar variant="dashboard" />
      <div className="flex flex-1">
        <DashboardSidebar isPremium={false} />

        <main className="flex-1 p-6 overflow-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display text-2xl font-bold text-gray-900 flex items-center gap-2">Bonjour Sharon 👋</h1>
              <p className="text-sm text-gray-400">Mercredi 25 Février 2026</p>
            </div>
            <div className="flex gap-3">
              <button className="btn-outline text-sm flex items-center gap-1.5"><Download size={14} /> Exporter</button>
              <Link to="/reserver/sharon-beauty" className="btn-primary flex items-center gap-1.5"><Plus size={14} /> Nouveau RDV</Link>
            </div>
          </div>

          {/* Premium banner */}
          <div className="bg-gradient-to-r from-gray-900 to-primary-900 rounded-2xl p-4 flex items-center justify-between mb-6 text-white">
            <div>
              <div className="font-bold mb-0.5">Passez à Premium pour booster votre activité</div>
              <div className="text-sm text-white/70">Statistiques avancées, gestion d'équipe, exports CSV/PDF, campagnes SMS et clients fidèles.</div>
            </div>
            <Link to="/tarifs" className="btn-primary shrink-0 ml-4">Voir les offres →</Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { value: '12', label: 'RDV ce mois', sub: '+3 ce mois', subColor: 'text-green-500' },
              { value: '3', label: 'En attente', sub: 'À confirmer', subColor: 'text-amber-500' },
              { value: '14h DA', label: 'Revenus', sub: '', locked: true },
              { value: '4.8', label: 'Note', sub: '', locked: true },
            ].map(s => (
              <div key={s.label} className="card p-4">
                <div className={`font-display text-3xl font-bold mb-1 ${s.locked ? 'text-gray-200 select-none blur-sm' : 'text-gray-900'}`}>{s.value}</div>
                <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                {s.locked ? <div className="flex items-center gap-1 text-xs text-gray-400"><Lock size={10} /> Premium requis</div>
                  : <div className={`text-xs font-semibold ${s.subColor}`}>{s.sub}</div>}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-2 card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-800">Calendrier — Cette semaine</h2>
                <div className="flex gap-2 text-xs">
                  {['Mois', 'Semaine', 'Jour'].map(v => (
                    <button key={v} className={`px-3 py-1 rounded-lg ${v === 'Semaine' ? 'bg-primary-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>{v}</button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {DAYS.map((d, i) => (
                  <div key={d} className={`text-xs text-center font-medium py-1.5 rounded-lg ${i === 2 ? 'bg-primary-500 text-white' : 'text-gray-400'}`}>{d}</div>
                ))}
              </div>
              <div className="mt-2 space-y-1">
                {['10h', '11h', '14h'].map(hour => (
                  <div key={hour} className="flex gap-1 items-start">
                    <div className="text-xs text-gray-300 w-8 pt-1 shrink-0">{hour}</div>
                    <div className="grid grid-cols-7 gap-1 flex-1">
                      {[1,2,3,4,5,6,7].map(day => {
                        const appt = APPOINTMENTS.find(a => a.day === day && a.time.startsWith(hour.replace('h', ':')))
                        return (
                          <div key={day} className={`h-7 rounded text-xs flex items-center justify-center text-white font-medium ${appt ? appt.color : ''}`}>
                            {appt ? appt.name.split(' ')[0] : ''}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's RDV */}
            <div className="card p-5">
              <h2 className="font-semibold text-gray-800 mb-4">RDV du jour</h2>
              <div className="space-y-3">
                {TODAY_RDV.map(r => (
                  <div key={r.name} className="flex items-center gap-3">
                    <div className="text-xs text-gray-500 w-10 shrink-0 font-medium">{r.time}</div>
                    <div className={`w-8 h-8 ${r.color} rounded-full flex items-center justify-center text-xs font-bold shrink-0`}>{r.initial}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-gray-900 truncate">{r.name}</div>
                      <div className="text-xs text-gray-400">{r.service}</div>
                    </div>
                    <span className={r.status === 'Confirmé' ? 'status-confirmed' : 'status-pending'}>{r.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Locked stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {['Revenus détaillés', 'Top services', 'Clients fidèles'].map(s => (
              <div key={s} className="card p-5 flex flex-col items-center justify-center h-32 text-center">
                <Lock size={22} className="text-gray-300 mb-2" />
                <div className="text-xs text-gray-400 font-medium">Disponible en Premium</div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}