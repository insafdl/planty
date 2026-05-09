import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { X, ChevronRight, ChevronLeft, CheckCircle, Clock, CreditCard, Building2, MapPin, Calendar, Star } from 'lucide-react'
import ClientNavBar from '../../components/ClientNavBar';

// Mock salon data
const salons = [
  {
    id: 'sharon-beauty', name: 'Sharon Beauty', district: 'Bab El Oued', city: 'Alger',
    address: '25 Rue des Oliviers, Bab El Oued, Alger', color: 'bg-pink-200', initials: 'SB',
    rating: 4.9, reviews: 128,
    services: [
      { id: 's1', name: 'Soin visage hydratant', duration: '45 min', price: 2500, desc: 'Nettoyage en profondeur + hydratation intense' },
      { id: 's2', name: 'Massage relaxant', duration: '40 min', price: 2000, desc: 'Massage corps complet aux huiles essentielles' },
      { id: 's3', name: 'Épilation complète', duration: '60 min', price: 3500, desc: 'Épilation intégrale à la cire chaude' },
      { id: 's4', name: 'Manucure semi-permanent', duration: '60 min', price: 1800, desc: 'Pose gel longue durée + nail art au choix' },
      { id: 's5', name: 'Hammam + Gommage', duration: '90 min', price: 4500, desc: 'Hammam traditionnel + gommage au savon beldi' },
    ],
  },
  {
    id: 'nour-beauty', name: 'Nour Beauty Center', district: 'Hydra', city: 'Alger',
    address: '12 Avenue Pasteur, Hydra, Alger', color: 'bg-indigo-200', initials: 'NB',
    rating: 4.8, reviews: 95,
    services: [
      { id: 's1', name: 'Massage aux pierres chaudes', duration: '60 min', price: 3200, desc: 'Relaxation profonde avec pierres volcaniques' },
      { id: 's2', name: 'Soin visage anti-âge', duration: '50 min', price: 3800, desc: 'Traitement lifting naturel + sérum collagène' },
      { id: 's3', name: 'Manucure + Pédicure', duration: '75 min', price: 2500, desc: 'Soin complet mains et pieds' },
    ],
  },
]

const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
const DAYS_SHORT = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di']
const TIME_SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00']
const UNAVAILABLE = ['09:30', '11:00', '14:30']

function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate() }
function getFirstDay(y, m) { return (new Date(y, m, 1).getDay() + 6) % 7 }

const STEPS = ['Institut', 'Service', 'Date & Heure', 'Récapitulatif', 'Paiement']

export default function ClientReservation() {
  const { id } = useParams()
  const salon = salons.find(s => s.id === id)
  const navigate = useNavigate()

  useEffect(() => {
    if (!salon) navigate('/client/reserver', { replace: true })
  }, [salon, navigate])

  if (!salon) return null

  const [step, setStep] = useState(0)
  const [selectedService, setSelectedService] = useState(null)
  const today = new Date()
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [message, setMessage] = useState('')
  const [payMethod, setPayMethod] = useState('card')
  const [cardNum, setCardNum] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [cardName, setCardName] = useState('')
  const [promo, setPromo] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const service = salon.services.find(s => s.id === selectedService)
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDay(year, month)

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1) }
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1) }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white border-b border-gray-100 px-6 h-14 flex items-center justify-between">
          <Link to="/" className="font-display font-bold text-xl text-primary-500">Planty<span className="text-primary-300">*</span></Link>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <div className={`w-8 h-8 ${salon.color} rounded-full flex items-center justify-center font-bold text-xs`}>{salon.initials}</div>
            {salon.name}
          </div>
          <Link to="/client/salons" className="text-gray-400 hover:text-gray-600"><X size={20} /></Link>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-200">
            <CheckCircle size={30} className="text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">Rendez-vous confirmé !</h1>
          <p className="text-gray-500 mb-8 text-center">
            Un e-mail de confirmation a été envoyé à<br />
            <span className="font-medium text-gray-700">votre@email.com</span>
          </p>
          <div className="card p-6 w-full max-w-md mb-6">
            {[
              ['N° de réservation', 'PLT-2026-' + Math.floor(Math.random() * 90000 + 10000)],
              ['Institut', salon.name],
              ['Adresse', salon.address],
              ['Prestation', service?.name || '—'],
              ['Date & Heure', selectedDay && selectedSlot ? `${selectedDay} ${MONTHS[month].slice(0,3)} à ${selectedSlot}` : '—'],
              ['Montant payé', service ? `${service.price.toLocaleString()} DA` : '—'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2.5 border-b border-gray-50 text-sm">
                <span className="text-gray-400 text-xs uppercase tracking-wide">{k}</span>
                <span className={`font-semibold ${k === 'Montant payé' ? 'text-primary-500' : 'text-gray-800'}`}>{v}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mb-6">
            <button className="btn-outline text-xs flex items-center gap-1.5"><Calendar size={13} /> Google Agenda</button>
            <button className="btn-outline text-xs flex items-center gap-1.5"><Calendar size={13} /> Apple Agenda</button>
          </div>
          <p className="text-xs text-gray-400 mb-6 flex items-center gap-1.5">
            <Clock size={11} /> Un SMS de rappel vous sera envoyé la veille du rendez-vous.
          </p>
          <div className="flex gap-3">
            <Link to="/client/salons" className="btn-outline">Retour aux instituts</Link>
            <Link to="/client/salons" className="btn-primary">Mes réservations →</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ClientNavBar />

      {/* Stepper — i=0 is "Institut" (already done), steps 1-4 map to state step 0-3 */}
      <div className="bg-white border-b border-gray-100 px-6 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {STEPS.map((s, i) => {
            const done = i === 0 || i <= step       // Institut always done; others if passed
            const active = i === step + 1            // current booking step (+1 offset for Institut)
            return (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${done ? 'bg-green-500 text-white' : active ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {done ? <CheckCircle size={13} /> : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${active ? 'text-primary-500' : done ? 'text-green-600' : 'text-gray-400'}`}>{s}</span>
                {i < STEPS.length - 1 && <div className={`flex-1 h-px mx-2 ${done ? 'bg-green-300' : 'bg-gray-200'}`} />}
              </div>
            )
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">

          {/* STEP 0: Choose service */}
          {step === 0 && (
            <div className="card p-6">
              <h2 className="font-display text-2xl font-bold mb-1 flex items-center gap-2">
                <span className="w-7 h-7 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Choisissez votre soin
              </h2>
              <p className="text-sm text-gray-400 mb-6 ml-9">Sélectionnez la prestation que vous souhaitez réserver</p>
              <div className="grid md:grid-cols-2 gap-3 mb-6">
                {salon.services.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedService(s.id)}
                    className={`text-left p-4 rounded-xl border-2 transition-all ${selectedService === s.id ? 'border-primary-500 bg-pink-50' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="font-semibold text-sm text-gray-900">{s.name}</span>
                      <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${selectedService === s.id ? 'border-primary-500 bg-primary-500' : 'border-gray-300'}`}>
                        {selectedService === s.id && <CheckCircle size={12} className="text-white" />}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{s.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={11} /> {s.duration}</span>
                      <span className="text-sm font-bold text-primary-600">{s.price.toLocaleString()} DA</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => selectedService && setStep(1)}
                  disabled={!selectedService}
                  className={`btn-primary flex items-center gap-2 ${!selectedService ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Choisir une date <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 1: Date & Time */}
          {step === 1 && (
            <div className="card p-6">
              <h2 className="font-display text-2xl font-bold mb-1 flex items-center gap-2">
                <span className="w-7 h-7 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Date & Heure
              </h2>
              <p className="text-sm text-gray-400 mb-6 ml-9">Sélectionnez votre créneau disponible</p>

              {/* Calendar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={prevMonth} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"><ChevronLeft size={16} /></button>
                  <span className="font-semibold text-gray-900">{MONTHS[month]} {year}</span>
                  <button onClick={nextMonth} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"><ChevronRight size={16} /></button>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {DAYS_SHORT.map(d => (
                    <div key={d} className="text-xs text-center text-gray-400 font-medium py-1">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {[...Array(firstDay)].map((_, i) => <div key={`e-${i}`} />)}
                  {[...Array(daysInMonth)].map((_, i) => {
                    const d = i + 1
                    const isPast = d < today.getDate() && month === today.getMonth() && year === today.getFullYear()
                    const isSelected = selectedDay === d
                    const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear()
                    return (
                      <button
                        key={d}
                        onClick={() => !isPast && setSelectedDay(d)}
                        disabled={isPast}
                        className={`h-9 w-full rounded-xl text-sm font-medium transition-all ${
                          isSelected ? 'bg-primary-500 text-white' :
                          isToday ? 'bg-primary-100 text-primary-700 font-bold' :
                          isPast ? 'text-gray-200 cursor-not-allowed' :
                          'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        {d}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Time slots */}
              {selectedDay && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">Créneaux disponibles — {selectedDay} {MONTHS[month]}</p>
                  <div className="grid grid-cols-4 gap-2">
                    {TIME_SLOTS.map(slot => {
                      const unavailable = UNAVAILABLE.includes(slot)
                      const isSelected = selectedSlot === slot
                      return (
                        <button
                          key={slot}
                          onClick={() => !unavailable && setSelectedSlot(slot)}
                          disabled={unavailable}
                          className={`py-2 rounded-xl text-sm font-medium transition-all ${
                            isSelected ? 'bg-primary-500 text-white' :
                            unavailable ? 'bg-gray-100 text-gray-300 cursor-not-allowed line-through' :
                            'border border-gray-200 text-gray-700 hover:border-primary-300 hover:text-primary-600'
                          }`}
                        >
                          {slot}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-6">
                <button onClick={() => setStep(0)} className="btn-outline flex items-center gap-2"><ChevronLeft size={15} /> Retour</button>
                <button
                  onClick={() => selectedDay && selectedSlot && setStep(2)}
                  disabled={!selectedDay || !selectedSlot}
                  className={`btn-primary flex items-center gap-2 ${(!selectedDay || !selectedSlot) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Continuer <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Summary */}
          {step === 2 && (
            <div className="card p-6">
              <h2 className="font-display text-2xl font-bold mb-1 flex items-center gap-2">
                <span className="w-7 h-7 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                Récapitulatif
              </h2>
              <p className="text-sm text-gray-400 mb-6 ml-9">Vérifiez votre réservation avant le paiement</p>
              <div className="grid md:grid-cols-2 gap-4 mb-5">
                {[
                  ['Prestation', service?.name || '—'],
                  ['Institut', salon.name],
                  ['Date', selectedDay ? `${selectedDay} ${MONTHS[month]}` : '—'],
                  ['Heure', selectedSlot || '—'],
                  ['Adresse', salon.address],
                  ['Prix total', service ? `${service.price.toLocaleString()} DA` : '—'],
                ].map(([k, v]) => (
                  <div key={k} className="bg-gray-50 rounded-xl p-3">
                    <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-1">{k}</div>
                    <div className="text-sm font-semibold text-gray-900">{v}</div>
                  </div>
                ))}
              </div>
              <div className="mb-5">
                <label className="text-sm font-semibold text-gray-700 block mb-2">Message pour l'esthéticienne (optionnel)</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Ex : peau sensible, allergie aux parfums, préférences particulières..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-300 resize-none placeholder-gray-300"
                />
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700 mb-5">
                <span className="font-bold">Politique d'annulation :</span> Annulation gratuite jusqu'à 24h avant. En dessous de 24h, 50% du montant sera retenu.
              </div>
              <div className="flex justify-between">
                <button onClick={() => setStep(1)} className="btn-outline flex items-center gap-2"><ChevronLeft size={15} /> Retour</button>
                <button onClick={() => setStep(3)} className="btn-primary flex items-center gap-2">Procéder au paiement <ChevronRight size={15} /></button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment */}
          {step === 3 && (
            <div className="card p-6">
              <h2 className="font-display text-2xl font-bold mb-1 flex items-center gap-2">
                <span className="w-7 h-7 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                Paiement
              </h2>
              <p className="text-sm text-gray-400 mb-6 ml-9">Choisissez votre méthode de paiement</p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { id: 'card', icon: <CreditCard size={18} />, label: 'Carte bancaire' },
                  { id: 'cib', icon: <Building2 size={18} />, label: 'CIB / Dahabia' },
                  { id: 'onsite', icon: <MapPin size={18} />, label: 'Sur place' },
                ].map(m => (
                  <button key={m.id} onClick={() => setPayMethod(m.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${payMethod === m.id ? 'border-primary-500 bg-pink-50' : 'border-gray-100 hover:border-gray-200'}`}>
                    {m.icon}
                    <span className="text-xs font-medium text-gray-700">{m.label}</span>
                  </button>
                ))}
              </div>
              {payMethod === 'card' && (
                <div className="space-y-3 mb-6">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Numéro de carte</label>
                    <input value={cardNum} onChange={e => setCardNum(e.target.value)} placeholder="0000 0000 0000 0000" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-300" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Expiration</label>
                      <input value={expiry} onChange={e => setExpiry(e.target.value)} placeholder="MM / AA" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-300" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">CVV</label>
                      <input value={cvv} onChange={e => setCvv(e.target.value)} type="password" placeholder="•••" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-300" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Nom sur la carte</label>
                    <input value={cardName} onChange={e => setCardName(e.target.value)} placeholder="VOTRE NOM" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-300" />
                  </div>
                  <p className="text-xs text-gray-400 flex items-center gap-1.5"><span className="text-green-500">🔒</span> Paiement chiffré SSL 256 bits. Vos données sont protégées.</p>
                </div>
              )}
              {payMethod === 'cib' && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700 mb-6">
                  Vous serez redirigé vers la plateforme sécurisée de votre banque pour finaliser le paiement.
                </div>
              )}
              {payMethod === 'onsite' && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700 mb-6">
                  Vous paierez directement à l'institut le jour de votre rendez-vous. Votre créneau est réservé sans prépaiement.
                </div>
              )}
              <div className="flex gap-3 mb-5">
                <input value={promo} onChange={e => setPromo(e.target.value)} placeholder="Code promotionnel" className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-300" />
                <button className="btn-outline">Appliquer</button>
              </div>
              <div className="flex justify-between">
                <button onClick={() => setStep(2)} className="btn-outline flex items-center gap-2"><ChevronLeft size={15} /> Retour</button>
                <button onClick={() => setConfirmed(true)} className="btn-primary flex items-center gap-2">
                  ✓ Confirmer et payer{service ? ` — ${service.price.toLocaleString()} DA` : ''}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar summary */}
        <div className="lg:col-span-1">
          <div className="card p-5 sticky top-20">
            {/* Salon info */}
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100 mb-4">
              <div className={`w-10 h-10 ${salon.color} rounded-xl flex items-center justify-center font-bold text-sm`}>{salon.initials}</div>
              <div>
                <div className="font-semibold text-sm">{salon.name}</div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Star size={10} className="fill-amber-400 text-amber-400" />
                  {salon.rating} · {salon.reviews} avis
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
              <MapPin size={11} /> {salon.address}
            </div>
            <h3 className="text-sm font-bold text-gray-700 mb-3">Votre réservation</h3>
            {[
              ['Prestation', service?.name || <span className="text-gray-300">Non sélectionnée</span>],
              ['Durée', service?.duration || <span className="text-gray-300">—</span>],
              ['Date', selectedDay ? `${selectedDay} ${MONTHS[month].slice(0,3)}` : <span className="text-gray-300">—</span>],
              ['Heure', selectedSlot || <span className="text-gray-300">—</span>],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-xs py-2 border-b border-gray-50">
                <span className="text-gray-400">{k}</span>
                <span className="font-semibold text-gray-800">{v}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm pt-3">
              <span className="font-bold">Total</span>
              <span className="font-bold text-gray-900">{service ? `${service.price.toLocaleString()} DA` : '—'}</span>
            </div>
            {!service && <p className="text-xs text-gray-400 mt-3">← Sélectionnez un soin pour commencer</p>}
            <p className="text-xs text-gray-400 mt-3 flex items-center gap-1.5"><Clock size={10} /> Annulation gratuite 24h avant</p>
          </div>
        </div>
      </div>
    </div>
  )
}