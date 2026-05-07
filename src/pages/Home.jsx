import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, MapPin, Clock, Star, CheckCircle, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import InstituteCard from '../components/InstituteCard'
import { institutes, categories } from '../data'

const recommended = institutes.filter(i => i.verified)
const newOnes = institutes.filter(i => i.isNew)

const testimonials = [
  { initial: 'A', color: 'bg-pink-400', name: 'Aoma Kheïfi', institute: 'Sharon Beauty – Alger', rating: 4, text: 'Facile à utiliser et à naviguer. J\'ai trouvé un excellent institut à deux pas de chez moi. L\'équipe est professionnelle et les résultats sont au rendez-vous.' },
  { initial: 'L', color: 'bg-indigo-500', name: 'Leïla Daoud', institute: 'Nour Beauty – Oran', rating: 5, text: 'L\'application Planty m\'a fait gagner un temps précieux. Plus besoin d\'appeler pour prendre RDV, tout se fait en quelques clics. Je recommande à toutes mes amies !' },
  { initial: 'S', color: 'bg-teal-500', name: 'Sara Mansouri', institute: 'Jolie Spa – Constantine', rating: 5, text: 'Très bon service, j\'ai trouvé un institut proche de chez moi avec des avis vérifiés. La réservation est simple et les confirmations arrivent rapidement.' },
]

const stats = [
  { value: '500+', label: 'Instituts partenaires' },
  { value: '12 000+', label: 'Réservations ce mois' },
  { value: '4.8/5', label: 'Note moyenne' },
  { value: '48', label: 'Wilayas couvertes' },
]

export default function Home() {
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-100 via-white to-purple-200 pt-20 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-pink-200 text-primary-500 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 shadow-sm">
            <MapPin size={12} /> Disponible partout en Algérie
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
            Trouvez et réservez les<br />meilleurs instituts de beauté
            <span className="block text-primary-500 italic font-normal mt-1">près de chez vous</span>
          </h1>
          <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">
            Des centaines d'instituts vérifiés, des avis authentiques, une réservation en 2 clics — disponible 24h/24.
          </p>
          {/* Search bar */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 flex flex-col md:flex-row gap-2 mb-6 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 flex-1 px-3">
              <Search size={18} className="text-gray-400 shrink-0" />
              <input className="flex-1 text-sm outline-none placeholder-gray-400" placeholder="Catégorie" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="hidden md:block w-px bg-gray-100" />
            <div className="flex items-center gap-2 flex-1 px-3">
              <MapPin size={18} className="text-gray-400 shrink-0" />
              <input className="flex-1 text-sm outline-none placeholder-gray-400" placeholder="Position actuelle" value={city} onChange={e => setCity(e.target.value)} />
            </div>
            <div className="hidden md:block w-px bg-gray-100" />
            <div className="flex items-center gap-2 flex-1 px-3">
              <Clock size={18} className="text-gray-400 shrink-0" />
              <input className="flex-1 text-sm outline-none placeholder-gray-400" placeholder="Heure" />
            </div>
            <Link to="/instituts" className="btn-primary whitespace-nowrap">Rechercher</Link>
          </div>
          {/* Category pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                className={`text-sm px-4 py-1.5 rounded-full border transition-all ${activeCategory === cat ? 'bg-primary-500 text-white border-primary-500' : 'bg-white border-gray-200 text-gray-600 hover:border-primary-300'}`}>
                {cat}
              </button>
            ))}
            <button className="text-sm px-4 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-primary-300 bg-white">Voir tout</button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 text-center">
          {stats.map(s => (
            <div key={s.value}>
              <div className="font-display text-3xl font-bold text-primary-500">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-gray-900">Instituts <span className="text-primary-500">recommandés</span></h2>
            <p className="text-sm text-gray-500 mt-1">Sélectionnés pour leur qualité et leurs avis clients</p>
          </div>
          <Link to="/instituts" className="text-sm text-primary-500 font-semibold flex items-center gap-1 hover:gap-2 transition-all">Voir tous les instituts <ArrowRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {recommended.slice(0, 4).map(i => <InstituteCard key={i.id} institute={i} />)}
        </div>
      </section>

      {/* New */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold text-gray-900">Nouveaux sur <span className="text-primary-500">Planty</span></h2>
            <p className="text-sm text-gray-500 mt-1">Découvrez les derniers instituts référencés cette semaine</p>
          </div>
          <Link to="/instituts" className="text-sm text-primary-500 font-semibold flex items-center gap-1 hover:gap-2 transition-all">Voir tous <ArrowRight size={14} /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {newOnes.slice(0, 4).map(i => <InstituteCard key={i.id} institute={i} showNew />)}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold text-gray-900 mb-3">Comment ça <span className="text-primary-500">marche</span> ?</h2>
          <p className="text-gray-500 mb-14">Réserver un soin n'a jamais été aussi simple</p>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { n: '1', title: 'Cherchez', text: 'Entrez votre ville ou activez votre position pour trouver les instituts à proximité.', color: 'bg-primary-500' },
              { n: '2', title: 'Choisissez', text: 'Consultez les profils, les services, les tarifs et les avis clients pour faire le bon choix.', color: 'bg-purple-500' },
              { n: '3', title: 'Réservez', text: 'Sélectionnez un créneau disponible et confirmez votre RDV en quelques secondes.', color: 'bg-teal-500' },
            ].map(step => (
              <div key={step.n} className="flex flex-col items-center">
                <div className={`w-14 h-14 ${step.color} text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg mb-5`}>{step.n}</div>
                <h3 className="font-display text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl font-bold text-gray-900">Ce que disent nos <span className="text-primary-500">clientes</span></h2>
            <p className="text-sm text-gray-500 mt-1">Des milliers de clientes satisfaites chaque mois</p>
          </div>
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-amber-400 text-amber-400" />)}
            <span className="text-sm font-semibold text-gray-700 ml-1">4.8</span>
            <span className="text-sm text-gray-500">par 2 400+ avis</span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.name} className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}>{t.initial}</div>
                <div>
                  <div className="font-semibold text-sm text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.institute}</div>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={13} className={i < t.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'} />)}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Pro */}
      <section className="bg-gradient-to-br from-gray-900 via-primary-900 to-purple-900 py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-primary-300 text-xs font-bold uppercase tracking-widest mb-4">Pour les professionnels</p>
          <h2 className="font-display text-4xl font-bold text-white mb-4">Développez votre activité avec Planty</h2>
          <p className="text-gray-300 mb-8">Référencez votre institut, gérez vos réservations et touchez des milliers de clientes dans votre région.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/inscription" className="btn-primary">Référencer mon institut</Link>
            <Link to="/tarifs" className="btn-outline !border-white !text-white hover:!bg-white/10">Voir les tarifs</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}