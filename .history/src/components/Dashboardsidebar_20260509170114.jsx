import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Calendar, BookOpen, Settings, Users, Clock,
  TrendingUp, Heart, MessageSquare, Tag, Lock
} from 'lucide-react'

const NAV = [
  { section: 'PRINCIPAL', items: [
    { icon: LayoutDashboard, label: 'Tableau de bord', to: '/dashboard' },
    { icon: Calendar, label: 'Calendrier', to: '/dashboard/calendrier', badge: 3 },
    { icon: BookOpen, label: 'Réservations', to: '/dashboard/reservations' },
  ]},
  { section: 'GESTION', items: [
    { icon: Settings, label: 'Mes services', to: '/dashboard/services' },
    { icon: Users, label: 'Mon équipe', to: '/dashboard/team' },
    { icon: Clock, label: 'Horaires', to: '/dashboard/hours' },
  ]},
  { section: 'STATISTIQUES', items: [
    { icon: TrendingUp, label: 'Revenus', to: '/dashboard/revenue', premium: true },
    { icon: Heart, label: 'Clients fidèles', to: '/dashboard/clients', premium: true },
  ]},
]

export default function DashboardSidebar({ isPremium = false, user = { name: 'Sharon Kamel', institute: 'Sharon Beauty' } }) {
  const location = useLocation()

  return (
    <div className="w-52 shrink-0 bg-white border-r border-gray-100 min-h-screen flex flex-col">
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="font-display font-bold text-xl text-primary-500">Planty</div>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${isPremium ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
          {isPremium ? 'PREMIUM' : 'GRATUIT'}
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {NAV.map(section => (
          <div key={section.section} className="mb-5">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 mb-2">{section.section}</div>
            {section.items.map(item => {
              const Icon = item.icon
              const active = location.pathname === item.to
              const locked = item.premium && !isPremium
              return (
                <Link key={item.label} to={locked ? '#' : item.to}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium mb-0.5 transition-all ${active ? 'bg-primary-50 text-primary-600' : locked ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                  <Icon size={15} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && <span className="bg-primary-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{item.badge}</span>}
                  {locked && <Lock size={11} className="text-gray-300" />}
                </Link>
              )
            })}
          </div>
        ))}

        {!isPremium && (
          <div className="bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl p-4 text-white mt-4">
            <div className="font-bold text-sm mb-1">Passez Premium</div>
            <p className="text-xs text-white/80 mb-3">Accédez aux stats, l'équipe, les exports et plus encore.</p>
            <Link to="/tarifs" className="bg-white text-primary-600 text-xs font-bold px-3 py-1.5 rounded-lg block text-center">Voir les offres →</Link>
          </div>
        )}
      </nav>

      <div className="px-4 py-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm">{user.name[0]}</div>
          <div>
            <div className="text-xs font-semibold text-gray-800">{user.name}</div>
            <div className="text-xs text-gray-400">{user.institute}</div>
          </div>
        </div>
      </div>
    </div>
  )
}