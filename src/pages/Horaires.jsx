import { useState } from 'react'
import { Clock, Check, Plus, Trash2, X, Copy } from 'lucide-react'
import Navbar from '../components/Navbar'
import DashboardSidebar from '../components/DashboardSidebar'

// ── Données initiales ─────────────────────────────────────────────────────────
const INITIAL_HOURS = [
  { id: 1, day: 'Lundi',    open: true,  slots: [{ from: '09:00', to: '19:00' }] },
  { id: 2, day: 'Mardi',    open: true,  slots: [{ from: '09:00', to: '19:00' }] },
  { id: 3, day: 'Mercredi', open: true,  slots: [{ from: '09:00', to: '13:00' }, { from: '14:00', to: '19:00' }] },
  { id: 4, day: 'Jeudi',    open: true,  slots: [{ from: '09:00', to: '19:00' }] },
  { id: 5, day: 'Vendredi', open: true,  slots: [{ from: '09:00', to: '19:00' }] },
  { id: 6, day: 'Samedi',   open: true,  slots: [{ from: '09:00', to: '17:00' }] },
  { id: 7, day: 'Dimanche', open: false, slots: [{ from: '09:00', to: '17:00' }] },
]

// Génère les options de créneaux toutes les 30 min
const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const h = String(Math.floor(i / 2)).padStart(2, '0')
  const m = i % 2 === 0 ? '00' : '30'
  return `${h}:${m}`
})

function totalHours(slots) {
  return slots.reduce((acc, s) => {
    const [fh, fm] = s.from.split(':').map(Number)
    const [th, tm] = s.to.split(':').map(Number)
    const diff = (th * 60 + tm) - (fh * 60 + fm)
    return acc + (diff > 0 ? diff / 60 : 0)
  }, 0)
}

// ── Page principale ───────────────────────────────────────────────────────────
export default function Horaires() {
  const [hours, setHours] = useState(INITIAL_HOURS)
  const [toast, setToast] = useState(null)

  const showToast = msg => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  // Toggle ouvert/fermé
  const toggleDay = id => {
    setHours(prev => prev.map(d => d.id === id ? { ...d, open: !d.open } : d))
  }

  // Modifier un créneau
  const updateSlot = (dayId, slotIdx, field, value) => {
    setHours(prev => prev.map(d => {
      if (d.id !== dayId) return d
      const slots = d.slots.map((s, i) => i === slotIdx ? { ...s, [field]: value } : s)
      return { ...d, slots }
    }))
  }

  // Ajouter un créneau
  const addSlot = dayId => {
    setHours(prev => prev.map(d => {
      if (d.id !== dayId) return d
      const last = d.slots[d.slots.length - 1]
      return { ...d, slots: [...d.slots, { from: last?.to ?? '14:00', to: '19:00' }] }
    }))
  }

  // Supprimer un créneau
  const removeSlot = (dayId, slotIdx) => {
    setHours(prev => prev.map(d => {
      if (d.id !== dayId) return d
      return { ...d, slots: d.slots.filter((_, i) => i !== slotIdx) }
    }))
  }

  // Copier les horaires d'un jour vers tous les jours ouverts
  const copyToAll = dayId => {
    const source = hours.find(d => d.id === dayId)
    setHours(prev => prev.map(d =>
      d.open && d.id !== dayId ? { ...d, slots: source.slots.map(s => ({ ...s })) } : d
    ))
    showToast('Horaires copiés sur tous les jours ouverts ✓')
  }

  const handleSave = () => showToast('Horaires enregistrés ✓')

  const openDays = hours.filter(d => d.open).length
  const totalWeekHours = hours
    .filter(d => d.open)
    .reduce((acc, d) => acc + totalHours(d.slots), 0)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <Navbar variant="dashboard" />
      <div className="flex flex-1">
        <DashboardSidebar isPremium={false} />

        <main className="flex-1 p-6 overflow-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display text-2xl font-bold text-gray-900">Horaires d'ouverture</h1>
              <p className="text-sm text-gray-400">Définissez vos jours et plages horaires</p>
            </div>
            <button onClick={handleSave} className="btn-primary flex items-center gap-1.5">
              <Check size={14} /> Enregistrer
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { value: openDays,                        label: 'Jours ouverts',    sub: 'cette semaine',      subColor: 'text-primary-500' },
              { value: 7 - openDays,                    label: 'Jours fermés',     sub: 'cette semaine',      subColor: 'text-gray-400' },
              { value: `${totalWeekHours.toFixed(0)}h`, label: 'Heures / semaine', sub: 'temps d\'ouverture', subColor: 'text-green-500' },
              { value: `${(totalWeekHours / 5).toFixed(1)}h`, label: 'Moy. / jour', sub: 'jours ouvrés',     subColor: 'text-amber-500' },
            ].map(s => (
              <div key={s.label} className="card p-4">
                <div className="font-display text-3xl font-bold text-gray-900 mb-1">{s.value}</div>
                <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                <div className={`text-xs font-semibold ${s.subColor}`}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Grille des jours */}
          <div className="card p-5 space-y-1">
            {hours.map((day, i) => (
              <div key={day.id}>
                {i > 0 && <div className="border-t border-gray-50 my-2" />}
                <div className="flex items-start gap-4 py-1">

                  {/* Toggle + nom du jour */}
                  <div className="flex items-center gap-3 w-36 shrink-0 pt-1">
                    <button
                      onClick={() => toggleDay(day.id)}
                      className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${day.open ? 'bg-primary-500' : 'bg-gray-200'}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${day.open ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </button>
                    <span className={`text-sm font-semibold ${day.open ? 'text-gray-900' : 'text-gray-300'}`}>
                      {day.day}
                    </span>
                  </div>

                  {/* Créneaux ou Fermé */}
                  {day.open ? (
                    <div className="flex-1 space-y-2">
                      {day.slots.map((slot, si) => (
                        <div key={si} className="flex items-center gap-2">
                          {/* De */}
                          <select
                            value={slot.from}
                            onChange={e => updateSlot(day.id, si, 'from', e.target.value)}
                            className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition bg-white"
                          >
                            {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>

                          <span className="text-xs text-gray-400 shrink-0">→</span>

                          {/* À */}
                          <select
                            value={slot.to}
                            onChange={e => updateSlot(day.id, si, 'to', e.target.value)}
                            className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition bg-white"
                          >
                            {TIME_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>

                          {/* Durée */}
                          <span className="text-xs text-gray-400 w-12 shrink-0">
                            {(() => {
                              const [fh, fm] = slot.from.split(':').map(Number)
                              const [th, tm] = slot.to.split(':').map(Number)
                              const diff = (th * 60 + tm) - (fh * 60 + fm)
                              if (diff <= 0) return <span className="text-red-400">⚠</span>
                              return `${diff >= 60 ? Math.floor(diff/60)+'h' : ''}${diff % 60 ? (diff%60)+'m' : ''}`
                            })()}
                          </span>

                          {/* Supprimer créneau */}
                          {day.slots.length > 1 && (
                            <button
                              onClick={() => removeSlot(day.id, si)}
                              className="p-1 text-gray-300 hover:text-red-400 transition-colors"
                            >
                              <X size={14} />
                            </button>
                          )}
                        </div>
                      ))}

                      {/* Actions du jour */}
                      <div className="flex items-center gap-3 pt-1">
                        {day.slots.length < 3 && (
                          <button
                            onClick={() => addSlot(day.id)}
                            className="flex items-center gap-1 text-xs text-primary-500 hover:text-primary-600 font-medium transition-colors"
                          >
                            <Plus size={12} /> Ajouter une pause
                          </button>
                        )}
                        <button
                          onClick={() => copyToAll(day.id)}
                          className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors ml-auto"
                        >
                          <Copy size={12} /> Copier sur tous
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center pt-1">
                      <span className="text-sm text-gray-300 italic">Fermé</span>
                    </div>
                  )}

                  {/* Total heures du jour */}
                  {day.open && (
                    <div className="text-right shrink-0 pt-1">
                      <span className="text-xs font-semibold text-gray-500">
                        {totalHours(day.slots).toFixed(1)}h
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Note bas de page */}
          <p className="text-xs text-gray-400 mt-4 flex items-center gap-1.5">
            <Clock size={11} />
            Les horaires sont affichés aux clients sur votre page de réservation.
          </p>

        </main>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gray-900 text-white text-sm font-medium px-4 py-3 rounded-2xl shadow-xl"
          style={{ animation: 'fadeUp 0.3s ease' }}>
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shrink-0">
            <Check size={11} />
          </div>
          {toast}
        </div>
      )}
    </div>
  )
}