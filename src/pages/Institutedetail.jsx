import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Star, MapPin, Phone, Clock, Heart, Share2, CheckCircle, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { institutes, CALENDAR, TIME_SLOTS, UNAVAILABLE_SLOTS } from '../data'

const DAYS = CALENDAR.days
const MONTHS = CALENDAR.months

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDay(year, month) {
  return (new Date(year, month, 1).getDay() + 6) % 7 // Mon=0
}

export default function InstituteDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const institute = institutes.find(i => i.id === id) || institutes[0]

  const today = new Date()
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())
  const [selectedDay, setSelectedDay] = useState(today.getDate())
  const [selectedSlot, setSelectedSlot] = useState('10:00')
  const [liked, setLiked] = useState(false)
  const [showAllReviews, setShowAllReviews] = useState(false)

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDay(year, month)

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1) }
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1) }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-3 text-xs text-gray-400 flex gap-2">
        <Link to="/" className="hover:text-primary-500">Accueil</Link>
        <span>/</span>
        <Link to="/instituts" className="hover:text-primary-500">{institute.city}</Link>
        <span>/</span>
        <span>{institute.category}</span>
        <span>/</span>
        <span className="text-gray-700 font-medium">{institute.name}</span>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="grid grid-cols-2 gap-3 rounded-2xl overflow-hidden h-72">
          <div className={`${institute.color} flex items-center justify-center relative`}>
            {institute.verified && <span className="absolute top-3 left-3 bg-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1"><CheckCircle size={12} className="text-green-500" /> Institut vérifié</span>}
            <div className="w-20 h-20 rounded-2xl bg-primary-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">{institute.initials}</div>
          </div>
          <div className="grid grid-rows-2 gap-3">
            <div className="bg-pink-100 rounded-2xl flex items-center justify-center text-4xl">A</div>
            <div className="bg-green-100 rounded-2xl"></div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left */}
          <div className="lg:col-span-2 space-y-10">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="font-display text-4xl font-bold text-gray-900 mb-2">{institute.name}</h1>
                  {institute.verified && <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full mb-3"><CheckCircle size={11} /> Institut vérifié Planty</span>}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} className={i < Math.floor(institute.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'} />)}
                      <span className="font-bold text-gray-800 ml-1">{institute.rating}</span>
                      <span className="text-gray-400">{institute.reviews} avis vérifiées</span>
                    </span>
                    <span>·</span>
                    <span>{institute.reservations} réservations ce mois</span>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-3">
                    <span className="flex items-center gap-1 text-xs text-gray-500"><MapPin size={12} /> {institute.address}</span>
                    <span className="text-xs bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full font-medium">{institute.category}</span>
                    <span className="text-xs bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full font-medium">Massage</span>
                    <span className="text-xs bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full font-medium">Manucure</span>
                    <span className="text-xs text-green-600 font-semibold">✓ Ouvert · ferme à 20h</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setLiked(!liked)} className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-primary-300 transition-colors">
                    <Heart size={16} className={liked ? 'fill-primary-500 text-primary-500' : 'text-gray-400'} />
                  </button>
                  <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:border-primary-300 transition-colors">
                    <Share2 size={16} className="text-gray-400" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mt-4 leading-relaxed">{institute.description}</p>
              <Link to={`/reserver/${institute.id}`} className="btn-primary mt-5 inline-flex items-center gap-2 py-3 px-8">Prendre un rendez-vous</Link>
            </div>

            {/* Services */}
            <div>
              <h2 className="font-display text-2xl font-bold mb-5">Services &amp; Tarifs</h2>
              <div className="space-y-3">
                {institute.services.map(s => (
                  <div key={s.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-primary-200 hover:bg-pink-50/30 transition-all group">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{s.icon}</span>
                      <div>
                        <div className="font-semibold text-sm text-gray-900">{s.name}</div>
                        <div className="text-xs text-gray-400">{s.duration} min · {s.description.slice(0, 50)}…</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-900">{s.price.toLocaleString()} DA</span>
                      <Link to={`/reserver/${institute.id}`} className="w-7 h-7 rounded-full bg-primary-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Plus size={14} /></Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team */}
            {institute.team.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold mb-5">Notre équipe</h2>
                <div className="grid grid-cols-3 gap-4">
                  {institute.team.map(m => (
                    <div key={m.id} className="text-center">
                      <div className={`w-16 h-16 ${m.color} rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-2`}>{m.name[0]}</div>
                      <div className="font-semibold text-sm">{m.name}</div>
                      <div className="text-xs text-gray-400 mb-1">{m.specialty}</div>
                      <div className="flex justify-center gap-0.5 mb-0.5">
                        {[...Array(5)].map((_, i) => <Star key={i} size={10} className={i < Math.floor(m.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'} />)}
                      </div>
                      <div className="text-xs text-gray-400">{m.reviews} RDV effectués</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {institute.clientReviews.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-display text-2xl font-bold">Avis clients</h2>
                  <span className="flex items-center gap-1 text-sm font-semibold"><Star size={14} className="fill-amber-400 text-amber-400" />{institute.rating} · {institute.reviews} avis</span>
                </div>
                <div className="space-y-4">
                  {(showAllReviews ? institute.clientReviews : institute.clientReviews.slice(0, 2)).map(r => (
                    <div key={r.id} className="border border-gray-100 rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-9 h-9 ${r.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}>{r.initial}</div>
                          <div>
                            <div className="font-semibold text-sm">{r.name}</div>
                            <div className="text-xs text-gray-400">{r.time}</div>
                          </div>
                        </div>
                        <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < r.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'} />)}</div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{r.comment}</p>
                      {r.reply && (
                        <div className="mt-3 bg-pink-50 rounded-xl p-3">
                          <div className="text-xs font-bold text-primary-600 mb-1">Réponse de {institute.name}</div>
                          <p className="text-xs text-gray-600">{r.reply}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {institute.clientReviews.length > 2 && (
                  <button onClick={() => setShowAllReviews(!showAllReviews)} className="mt-4 text-sm text-primary-500 font-semibold">
                    {showAllReviews ? 'Voir moins' : `Voir les ${institute.reviews} avis →`}
                  </button>
                )}
              </div>
            )}

            {/* Nearby */}
            {institute.nearby.length > 0 && (
              <div>
                <h2 className="font-display text-2xl font-bold mb-5">Établissements à proximité</h2>
                <div className="grid grid-cols-3 gap-4">
                  {institute.nearby.map(n => (
                    <Link key={n.id} to={`/instituts/${n.id}`} className="block group">
                      <div className={`${n.color} rounded-2xl h-28 flex items-center justify-center mb-2`}>
                        <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center font-bold text-sm">{n.initials}</div>
                      </div>
                      <div className="font-semibold text-sm group-hover:text-primary-500">{n.name}</div>
                      <div className="flex items-center gap-1 text-xs text-gray-400"><Star size={10} className="fill-amber-400 text-amber-400" />{n.rating}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Booking widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="card p-5 mb-4">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                  <div className={`w-10 h-10 ${institute.color} rounded-xl flex items-center justify-center font-bold text-sm`}>{institute.initials}</div>
                  <div>
                    <div className="font-semibold text-sm">{institute.name}</div>
                    <div className="flex items-center gap-1 text-xs text-gray-400"><MapPin size={10} /> {institute.district}, {institute.city}</div>
                  </div>
                </div>
                <h3 className="font-semibold text-sm text-gray-700 mb-3">Choisissez une date</h3>

                {/* Mini calendar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <button onClick={prevMonth} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100"><ChevronLeft size={14} /></button>
                    <span className="text-sm font-semibold">{MONTHS[month]} {year}</span>
                    <button onClick={nextMonth} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100"><ChevronRight size={14} /></button>
                  </div>
                  <div className="grid grid-cols-7 gap-0.5 mb-1">
                    {DAYS.map(d => <div key={d} className="text-center text-xs text-gray-400 font-medium py-1">{d}</div>)}
                  </div>
                  <div className="grid grid-cols-7 gap-0.5">
                    {[...Array(firstDay)].map((_, i) => <div key={`e${i}`} />)}
                    {[...Array(daysInMonth)].map((_, i) => {
                      const day = i + 1
                      const isToday = day === today.getDate() && month === today.getMonth()
                      const isSelected = day === selectedDay
                      const isPast = new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate())
                      return (
                        <button key={day} disabled={isPast} onClick={() => setSelectedDay(day)}
                          className={`text-xs py-1.5 rounded-lg transition-all ${isSelected ? 'bg-primary-500 text-white font-bold' : isToday ? 'border border-primary-300 text-primary-600 font-semibold' : isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-primary-50 text-gray-700'}`}>
                          {day}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Time slots */}
                <div className="mb-4">
                  <div className="text-xs font-semibold text-gray-500 mb-2">⊙ Créneaux — {['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'][new Date(year,month,selectedDay).getDay()]} {selectedDay} {MONTHS[month].slice(0,3)}</div>
                  <div className="text-xs font-semibold text-gray-400 mb-1.5">MATIN</div>
                  <div className="grid grid-cols-4 gap-1 mb-2">
                    {TIME_SLOTS.morning.map(t => (
                      <button key={t} disabled={UNAVAILABLE_SLOTS.includes(t)} onClick={() => setSelectedSlot(t)}
                        className={`text-xs py-1.5 rounded-lg border transition-all ${selectedSlot === t ? 'bg-primary-500 text-white border-primary-500 font-semibold' : UNAVAILABLE_SLOTS.includes(t) ? 'bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed line-through' : 'border-gray-200 hover:border-primary-300 text-gray-700'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                  <div className="text-xs font-semibold text-gray-400 mb-1.5">APRÈS-MIDI</div>
                  <div className="grid grid-cols-4 gap-1">
                    {TIME_SLOTS.afternoon.map(t => (
                      <button key={t} disabled={UNAVAILABLE_SLOTS.includes(t)} onClick={() => setSelectedSlot(t)}
                        className={`text-xs py-1.5 rounded-lg border transition-all ${selectedSlot === t ? 'bg-primary-500 text-white border-primary-500 font-semibold' : UNAVAILABLE_SLOTS.includes(t) ? 'bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed line-through' : 'border-gray-200 hover:border-primary-300 text-gray-700'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <Link to={`/reserver/${institute.id}`} className="btn-primary w-full block text-center py-3">Prendre un rendez-vous</Link>
                <p className="text-xs text-gray-400 text-center mt-2 flex items-center justify-center gap-1">
                  <Clock size={11} /> Annulation gratuite jusqu'à 24h avant
                </p>
              </div>

              {/* Info */}
              <div className="card p-5">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Horaires</div><div className="font-medium">{institute.hours}</div></div>
                  <div><div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Jours</div><div className="font-medium">{institute.days}</div></div>
                  <div><div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Téléphone</div><div className="font-medium">{institute.phone}</div></div>
                  <div><div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">Wilaya</div><div className="font-medium">{institute.city}</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}