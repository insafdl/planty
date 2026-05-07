import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const plans = [
  {
    name: 'Découverte',
    price: '0',
    period: '/mois',
    desc: 'Démarrez gratuitement',
    color: 'bg-white',
    border: 'border-gray-200',
    btn: 'btn-outline',
    features: [
      'Apparition dans les recherches',
      "Jusqu'à 5 services listés",
      '1 tableau de bord basique',
    ],
    cta: 'Commencer',
  },
  {
    name: 'Premium',
    price: '19',
    period: '/mois',
    desc: 'Le plus populaire',
    color: 'bg-white',
    border: 'border-primary-400',
    btn: 'btn-primary',
    badge: '⭐ Recommandé',
    features: [
      'Tout le plan Découverte',
      'Réservations illimitées',
      'Gestion d\'équipe (3 membres)',
      'Statistiques avancées',
      'Exports CSV/PDF',
      'Notifications SMS clientes',
    ],
    cta: 'Commencer',
  },
  {
    name: 'Excellence',
    price: '29',
    period: '/mois',
    desc: 'Pour les meilleurs',
    color: 'bg-white',
    border: 'border-gray-200',
    btn: 'btn-outline',
    features: [
      'Tout le plan Premium',
      'Campagnes SMS marketing',
      'Équipe illimitée',
      'Rapports exportables',
      'Support prioritaire dédié',
    ],
    cta: 'Commencer',
  },
]

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="bg-gradient-to-br from-pink-50 to-purple-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-5xl font-bold text-gray-900 mb-4">Développez Votre Institut de Beauté</h1>
          <p className="text-gray-500 text-lg">Choisissez l'offre qui correspond à vos ambitions et touchez plus de clients en Algérie.</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map(p => (
            <div key={p.name} className={`rounded-2xl border-2 ${p.border} p-7 relative ${p.name === 'Premium' ? 'shadow-xl shadow-primary-100 scale-105' : ''}`}>
              {p.badge && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-xs font-bold px-4 py-1 rounded-full">{p.badge}</span>}
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{p.desc}</div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-1">{p.name}</h2>
              <div className="flex items-end gap-1 mb-6">
                <span className="font-display text-5xl font-bold text-gray-900">{p.price} €</span>
                <span className="text-gray-400 mb-2">{p.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle size={15} className="text-primary-500 shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/inscription" className={`${p.btn} block text-center py-3`}>{p.cta}</Link>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  )
}