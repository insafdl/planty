import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { X, ChevronRight, ChevronLeft, CheckCircle, Clock, CreditCard, Building2, MapPin, Calendar } from 'lucide-react'
import { institutes, CALENDAR, TIME_SLOTS, UNAVAILABLE_SLOTS } from '../data'

const MONTHS = CALENDAR.months
const DAYS = CALENDAR.days

function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate() }
function getFirstDay(y, m) { return (new Date(y, m, 1).getDay() + 6) % 7 }

const STEPS = ['Service', 'Date & Heure', 'Récapitulatif', 'Paiement', 'Confirme']

export default function Reservation() {
  const { id } = useParams()
  const institute = institutes.find(i => i.id === id) || institutes[0]

  const [step, setStep] = useState(0)
  const [selectedService, setSelectedService] = useState(null)
  const today = new Date()
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())
  const [selectedDay, setSelectedDay] = useState(19)
  const [selectedSlot, setSelectedSlot] = useState('10:00')
  const [message, setMessage] = useState('')
  const [payMethod, setPayMethod] = useState('card')
  const [cardNum, setCardNum] = useState('4532 1234 5678 9012')
  const [expiry, setExpiry] = useState('08 / 28')
  const [cvv, setCvv] = useState('•••')
  const [cardName, setCardName] = useState('SARAH MANSOURI')
  const [promo, setPromo] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const service = institute.services.find(s => s.id === selectedService)
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDay(year, month)

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1) }
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1) }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white border-b border-gray-100 px-6 h-14 flex items-center justify-between">
          <Link to="/" className="font-display font-bold text-xl text-primary-500">Planty</Link>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center font-bold text-xs">{institute.initials}</div>
            {institute.name}
          </div>
          <Link to="/" className="text-gray-400 hover:text-gray-600"><X size={20} /></Link>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center p-6 animate-fade-in">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-200">
            <CheckCircle size={30} className="text-white" />
          </div>
          <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">Rendez-vous confirmé !</h1>
          <p className="text-gray-500 mb-8 text-center">Un e-mail de confirmation a été envoyé à<br /><span className="font-medium text-gray-700">sarah@example.com</span></p>
          <div className="card p-6 w-full max-w-md mb-6">
            {[
              ['N° de réservation', 'PLT-2026-08472'],
              ['Institut', institute.name],
              ['Prestation', service?.name || 'Soin visage hydratant'],
              ['Esthéticienne', 'Camille B.'],
              ['Date & Heure', `Vendredi ${selectedDay} ${MONTHS[month].slice(0,3)} à ${selectedSlot}`],
              ['Adresse', institute.address],
              ['Montant payé', `${(service?.price || 2500).toLocaleString()} DA`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-b border-gray-50 text-sm">
                <span className="text-gray-400 text-xs uppercase tracking-wide">{k}</span>
                <span className={`font-semibold ${k === 'Montant payé' ? 'text-primary-500' : 'text-gray-800'}`}>{v}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mb-8">
            <button className="btn-outline text-xs flex items-center gap-1.5"><Calendar size={13} /> Ajouter à Google Agenda</button>
            <button className="btn-outline text-xs flex items-center gap-1.5"><Calendar size={13} /> Ajouter à Apple Agenda</button>
          </div>
          <p className="text-xs text-gray-400 mb-6 flex items-center gap-1.5"><Clock size={11} /> Un SMS de rappel vous sera envoyé la veille de votre rendez-vous.</p>
          <div className="flex gap-3">
            <Link to="/dashboard" className="btn-outline">Mes réservations</Link>
            <Link to="/" className="btn-primary">Retour à l'accueil →</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-6 h-14 flex items-center justify-between sticky top-0 z-50">
        <Link to="/" className="font-display font-bold text-xl text-primary-500">Planty</Link>
        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <div className="w-7 h-7 bg-pink-100 rounded-lg flex items-center justify-center font-bold text-xs">{institute.initials}</div>
          {institute.name}
          <span className="text-xs text-gray-400">· {institute.district}</span>
        </div>
        <Link to={`/instituts/${institute.id}`} className="text-gray-400 hover:text-gray-600"><X size={20} /></Link>
      </header>

      {/* Stepper */}
      <div className="bg-white border-b border-gray-100 px-6 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < step ? 'bg-green-500 text-white' : i === step ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                {i < step ? <CheckCircle size={14} /> : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${i === step ? 'text-primary-500' : i < step ? 'text-green-600' : 'text-gray-400'}`}>{s}</span>
              {i < STEPS.length - 1 && <div className={`flex-1 h-px mx-2 ${i < step ? 'bg-green-300' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">

          {/* STEP 0: Service */}
          {step === 0 && (
            <div className="card p-6 animate-fade-in">
              <h2 className="font-display text-2xl font-bold mb-1 flex items-center gap-2"><span className="w-7 h-7 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span> Choisissez votre prestation</h2>
              <p className="text-sm text-gray-400 mb-6 ml-9">Cliquez sur le soin que vous souhaitez réserver</p>
              <div className="grid md:grid-cols-2 gap-3 mb-6">
                {institute.services.map(s => (
                  <div key={s.id} onClick={() => setSelectedService(s.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedService === s.id ? 'border-primary-500 bg-pink-50' : 'border-gray-100 hover:border-primary-200'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-2xl">{s.icon}</span>
                      <span className="text-xs text-gray-400">{s.duration} min</span>
                    </div>
                    <div className="font-semibold text-sm text-gray-900 mb-1">{s.name}</div>
                    <div className="text-xs text-gray-400 mb-2 leading-relaxed">{s.description}</div>
                    <div className="font-bold text-gray-900">{s.price.toLocaleString()} DA</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <button disabled={!selectedService} onClick={() => setStep(1)} className="btn-primary disabled:opacity-40 flex items-center gap-2">Choisir la date <ChevronRight size={15} /></button>
              </div>

              {/* Aesthetician selected */}
              <div className="mt-6 p-4 border-2 border-green-200 bg-green-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-green-700 mb-1 flex items-center gap-1"><CheckCircle size={12} /> Esthéticienne sélectionnée</div>
                    <p className="text-xs text-gray-500">Déjà choisie depuis sa fiche profil</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">C</div>
                    <div>
                      <div className="font-semibold text-sm">Camille B.</div>
                      <div className="text-xs text-gray-400">Sharon Beauty · 4.9 ★</div>
                    </div>
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">Confirmée ✓</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 1: Date & Time */}
          {step === 1 && (
            <div className="card p-6 animate-fade-in">
              <h2 className="font-display text-2xl font-bold mb-1 flex items-center gap-2"><span className="w-7 h-7 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span> Date &amp; Heure</h2>
              <p className="text-sm text-gray-400 mb-6 ml-9">Sélectionnez un jour disponible puis un créneau</p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Calendar */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <button onClick={prevMonth} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100"><ChevronLeft size={14} /></button>
                    <span className="font-semibold">{MONTHS[month]} {year}</span>
                    <button onClick={nextMonth} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100"><ChevronRight size={14} /></button>
                  </div>
                  <div className="grid grid-cols-7 gap-0.5 mb-1">
                    {DAYS.map(d => <div key={d} className="text-center text-xs text-gray-400 font-medium py-1">{d}</div>)}
                  </div>
                  <div className="grid grid-cols-7 gap-0.5">
                    {[...Array(firstDay)].map((_, i) => <div key={`e${i}`} />)}
                    {[...Array(daysInMonth)].map((_, i) => {
                      const day = i + 1
                      const isSelected = day === selectedDay
                      const isPast = new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate())
                      return (
                        <button key={day} disabled={isPast} onClick={() => setSelectedDay(day)}
                          className={`text-xs py-2 rounded-lg transition-all ${isSelected ? 'bg-primary-500 text-white font-bold' : isPast ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-primary-50 text-gray-700'}`}>
                          {day}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Slots */}
                <div>
                  <div className="font-semibold text-sm mb-3">Vendredi {selectedDay} {MONTHS[month]} {year}</div>
                  <div className="text-xs text-gray-400 font-semibold uppercase mb-2">Matin</div>
                  <div className="grid grid-cols-3 gap-1.5 mb-4">
                    {TIME_SLOTS.morning.map(t => (
                      <button key={t} disabled={UNAVAILABLE_SLOTS.includes(t)} onClick={() => setSelectedSlot(t)}
                        className={`text-xs py-2 rounded-lg border transition-all ${selectedSlot === t ? 'bg-primary-500 text-white border-primary-500 font-semibold' : UNAVAILABLE_SLOTS.includes(t) ? 'bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed' : 'border-gray-200 hover:border-primary-300'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                  <div className="text-xs text-gray-400 font-semibold uppercase mb-2">Après-midi</div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {TIME_SLOTS.afternoon.map(t => (
                      <button key={t} disabled={UNAVAILABLE_SLOTS.includes(t)} onClick={() => setSelectedSlot(t)}
                        className={`text-xs py-2 rounded-lg border transition-all ${selectedSlot === t ? 'bg-primary-500 text-white border-primary-500 font-semibold' : UNAVAILABLE_SLOTS.includes(t) ? 'bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed' : 'border-gray-200 hover:border-primary-300'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <button onClick={() => setStep(0)} className="btn-outline flex items-center gap-2"><ChevronLeft size={15} /> Retour</button>
                <button onClick={() => setStep(2)} className="btn-primary flex items-center gap-2">Confirmer le créneau <ChevronRight size={15} /></button>
              </div>
            </div>
          )}

          {/* STEP 2: Summary */}
          {step === 2 && (
            <div className="card p-6 animate-fade-in">
              <h2 className="font-display text-2xl font-bold mb-1 flex items-center gap-2"><span className="w-7 h-7 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span> Récapitulatif</h2>
              <p className="text-sm text-gray-400 mb-6 ml-9">Vérifiez votre réservation avant le paiement</p>
              <div className="grid md:grid-cols-2 gap-4 mb-5">
                {[
                  ['Prestation', service?.name || '—'],
                  ['Esthéticienne', 'Camille B. (Sharon Beauty)'],
                  ['Date', `Vendredi ${selectedDay} ${MONTHS[month].slice(0,3)}`],
                  ['Heure', selectedSlot],
                  ['Adresse', institute.address],
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
                <textarea rows={3} value={message} onChange={e => setMessage(e.target.value)} placeholder="Ex : peau sensible, allergie aux parfums…" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-300 resize-none placeholder-gray-300" />
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
            <div className="card p-6 animate-fade-in">
              <h2 className="font-display text-2xl font-bold mb-1 flex items-center gap-2"><span className="w-7 h-7 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span> Paiement</h2>
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
                    <input value={cardNum} onChange={e => setCardNum(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-300" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Expiration</label>
                      <input value={expiry} onChange={e => setExpiry(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-300" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">CVV</label>
                      <input value={cvv} onChange={e => setCvv(e.target.value)} type="password" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-300" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Nom sur la carte</label>
                    <input value={cardName} onChange={e => setCardName(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-300" />
                  </div>
                  <p className="text-xs text-gray-400 flex items-center gap-1.5"><span className="text-green-500">🔒</span> Paiement chiffré SSL 256 bits. Vos données sont protégées.</p>
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
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100 mb-4">
              <div className={`w-10 h-10 ${institute.color} rounded-xl flex items-center justify-center font-bold text-sm`}>{institute.initials}</div>
              <div>
                <div className="font-semibold text-sm">{institute.name}</div>
                <div className="text-xs text-gray-400">{institute.district}</div>
              </div>
            </div>
            <h3 className="text-sm font-bold text-gray-700 mb-3">Votre réservation</h3>
            {[
              ['Prestation', service?.name || <span className="text-gray-300">Non sélectionnée</span>],
              ['Esthéticienne', 'Camille B.'],
              ['Date', step >= 1 ? `Ven. ${selectedDay} mars` : <span className="text-gray-300">—</span>],
              ['Heure', step >= 1 ? selectedSlot : <span className="text-gray-300">—</span>],
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
            {!service && <p className="text-xs text-gray-400 mt-3">← Sélectionnez un service</p>}
            <p className="text-xs text-gray-400 mt-3 flex items-center gap-1.5"><Clock size={10} /> Annulation gratuite 24h avant</p>
          </div>
        </div>
      </div>
    </div>
  )
}