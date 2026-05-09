import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, X, ExternalLink, Clock, CreditCard, Scissors, Tag, Calendar } from 'lucide-react'
import Navbar from '../components/Navbar'
import DashboardSidebar from '../components/DashboardSidebar'

// ── Constants ────────────────────────────────────────────────────────────────

const MONTHS_FR = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']
const DAYS_FR   = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim']

const TYPE_CONFIG = {
  appointment: {
    label: 'Rendez-vous',
    bg: 'bg-primary-100',
    dot: 'bg-primary-500',
    text: 'text-primary-700',
    badge: 'bg-primary-500 text-white',
    Icon: Scissors,
  },
  subscription: {
    label: 'Abonnement',
    bg: 'bg-amber-100',
    dot: 'bg-amber-500',
    text: 'text-amber-700',
    badge: 'bg-amber-500 text-white',
    Icon: CreditCard,
  },
  personal: {
    label: 'Personnel',
    bg: 'bg-gray-100',
    dot: 'bg-gray-400',
    text: 'text-gray-600',
    badge: 'bg-gray-400 text-white',
    Icon: Tag,
  },
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const pad = n => String(n).padStart(2, '0')
const toKey = d => `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`
const parseKey = k => { const [y,m,d] = k.split('-').map(Number); return new Date(y,m-1,d) }

const todayKey = toKey(new Date())

function makeKey(offset) {
  const d = new Date(); d.setDate(d.getDate() + offset); return toKey(d)
}

function buildGoogleUrl(event, dateKey) {
  const d = parseKey(dateKey)
  const ymd = `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}`
  const hStart = event.time ? event.time.replace(':','')+'00' : '090000'
  const hEnd   = event.time ? pad(Number(event.time.split(':')[0])+1)+event.time.split(':')[1]+'00' : '100000'
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${ymd}T${hStart}/${ymd}T${hEnd}&details=${encodeURIComponent(event.note||'')}`
}

function downloadICS(event, dateKey) {
  const d = parseKey(dateKey)
  const ymd = `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}`
  const hStart = event.time ? event.time.replace(':','')+'00' : '090000'
  const hEnd   = event.time ? pad(Number(event.time.split(':')[0])+1)+event.time.split(':')[1]+'00' : '100000'
  const ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nBEGIN:VEVENT\r\nDTSTART:${ymd}T${hStart}\r\nDTEND:${ymd}T${hEnd}\r\nSUMMARY:${event.title}\r\nDESCRIPTION:${event.note||''}\r\nEND:VEVENT\r\nEND:VCALENDAR`
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([ics], {type:'text/calendar'}))
  a.download = `${event.title.replace(/\s+/g,'_')}.ics`
  a.click()
}

// ── Seed data ────────────────────────────────────────────────────────────────

const INITIAL = {
  [todayKey]: [
    { id:1, type:'appointment', title:'Soin du visage - Institut Planty', time:'10:00', note:'Apporter votre carnet de fidélité' },
    { id:2, type:'subscription', title:'Renouvellement abonnement mensuel', time:'', note:'Paiement en ligne ou en caisse' },
  ],
  [makeKey(3)]: [
    { id:3, type:'appointment', title:'Massage relaxant 60 min', time:'14:30', note:'' },
  ],
  [makeKey(5)]: [
    { id:4, type:'personal', title:'Récupérer produits commandés', time:'', note:'' },
  ],
  [makeKey(10)]: [
    { id:5, type:'appointment', title:'Épilation - Leila M.', time:'11:00', note:'' },
  ],
  [makeKey(15)]: [
    { id:6, type:'subscription', title:'Renouvellement abonnement trimestriel', time:'09:00', note:'' },
  ],
  [makeKey(20)]: [
    { id:7, type:'appointment', title:'Soin corps complet', time:'15:00', note:'' },
  ],
}

// ── Add Event Modal ──────────────────────────────────────────────────────────

function AddEventModal({ dateKey, onClose, onAdd }) {
  const [title, setTitle] = useState('')
  const [type,  setType]  = useState('personal')
  const [time,  setTime]  = useState('')
  const [note,  setNote]  = useState('')

  const d = parseKey(dateKey)
  const label = `${DAYS_FR[(d.getDay()+6)%7]} ${d.getDate()} ${MONTHS_FR[d.getMonth()]} ${d.getFullYear()}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5 font-body">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-gray-900">Nouvel événement</h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
            <X size={16} className="text-gray-400" />
          </button>
        </div>
        <p className="text-xs text-gray-400">📅 {label}</p>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</label>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(TYPE_CONFIG).map(([k,cfg]) => (
              <button key={k} onClick={() => setType(k)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${type===k ? cfg.badge+' border-transparent' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}>
                {cfg.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Titre *</label>
          <input
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 text-gray-800"
            placeholder="Ex : Soin du visage…"
            value={title} onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Heure (optionnel)</label>
          <input type="time"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 text-gray-800"
            value={time} onChange={e => setTime(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Note (optionnel)</label>
          <textarea rows={2}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 text-gray-800 resize-none"
            placeholder="Informations supplémentaires…"
            value={note} onChange={e => setNote(e.target.value)}
          />
        </div>

        <button
          onClick={() => { if(title.trim()){ onAdd({title:title.trim(),type,time,note}) } }}
          disabled={!title.trim()}
          className="w-full bg-primary-500 hover:bg-primary-600 disabled:opacity-40 text-white py-2.5 rounded-xl font-semibold text-sm transition-colors">
          Ajouter l'événement
        </button>
      </div>
    </div>
  )
}

// ── Event Popover ────────────────────────────────────────────────────────────

function EventPopover({ event, dateKey, onClose, onDelete }) {
  const cfg = TYPE_CONFIG[event.type]
  const Icon = cfg.Icon
  return (
    <div className="absolute z-40 left-0 top-full mt-1 w-60 bg-white rounded-xl shadow-xl border border-gray-100 p-4 space-y-3 font-body">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className={`w-5 h-5 rounded-full ${cfg.dot} flex items-center justify-center shrink-0`}>
            <Icon size={10} className="text-white" />
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-wide ${cfg.text}`}>{cfg.label}</span>
        </div>
        <button onClick={onClose} className="p-0.5 hover:bg-gray-100 rounded-full">
          <X size={12} className="text-gray-400" />
        </button>
      </div>
      <p className="text-sm font-semibold text-gray-800 leading-snug">{event.title}</p>
      {event.time && <p className="text-xs text-gray-500 flex items-center gap-1"><Clock size={10}/> {event.time}</p>}
      {event.note && <p className="text-xs text-gray-400 italic">{event.note}</p>}

      <div className="flex flex-col gap-1.5 pt-1">
        <a href={buildGoogleUrl(event,dateKey)} target="_blank" rel="noreferrer"
          className="flex items-center gap-1.5 text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
          <ExternalLink size={11}/> Ajouter à Google Agenda
        </a>
        <button onClick={() => downloadICS(event,dateKey)}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors">
          <Calendar size={11}/> Calendrier Apple (.ics)
        </button>
        <button onClick={() => { onDelete(event.id); onClose() }}
          className="flex items-center gap-1.5 text-xs font-medium text-red-500 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors">
          <X size={11}/> Supprimer
        </button>
      </div>
    </div>
  )
}

// ── Event Chip ───────────────────────────────────────────────────────────────

function EventChip({ event, dateKey, onDelete }) {
  const [open, setOpen] = useState(false)
  const cfg = TYPE_CONFIG[event.type]

  return (
    <div className="relative">
      <button
        onClick={e => { e.stopPropagation(); setOpen(o => !o) }}
        className={`w-full text-left text-[10px] font-semibold px-1.5 py-0.5 rounded ${cfg.bg} ${cfg.text} truncate leading-4 hover:opacity-80 transition-opacity block`}>
        <span className={`inline-block w-1.5 h-1.5 rounded-full ${cfg.dot} mr-1 align-middle`}/>
        {event.time && <span className="mr-0.5 opacity-70">{event.time}</span>}
        {event.title}
      </button>
      {open && (
        <EventPopover
          event={event} dateKey={dateKey}
          onClose={() => setOpen(false)}
          onDelete={id => { onDelete(id); setOpen(false) }}
        />
      )}
    </div>
  )
}

// ── Calendar Grid ─────────────────────────────────────────────────────────────

function CalendarGrid({ year, month, events, onDayClick, onDelete }) {
  const firstDay = new Date(year, month, 1)
  const startOffset = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(year, month+1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const cells = []
  for (let i = startOffset - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, current: false, key: null })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${year}-${pad(month+1)}-${pad(d)}`
    cells.push({ day: d, current: true, key })
  }
  const remaining = 42 - cells.length
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, current: false, key: null })
  }

  return (
    <div>
      <div className="grid grid-cols-7 mb-1">
        {DAYS_FR.map(d => (
          <div key={d} className="text-center text-xs font-semibold text-gray-400 py-2">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-100 rounded-xl overflow-hidden border border-gray-100">
        {cells.map((cell, i) => {
          const isToday   = cell.key === todayKey
          const dayEvents = cell.key ? (events[cell.key] || []) : []
          const MAX_SHOW  = 2

          return (
            <div key={i}
              className={`min-h-[90px] p-1.5 flex flex-col gap-0.5 relative
                ${cell.current ? 'bg-white hover:bg-primary-50 cursor-pointer' : 'bg-gray-50 cursor-default'}
                transition-colors
              `}
              onClick={() => cell.current && onDayClick(cell.key)}>

              <div className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold mb-0.5 self-end
                ${isToday ? 'bg-primary-500 text-white' : cell.current ? 'text-gray-700' : 'text-gray-300'}`}>
                {cell.day}
              </div>

              {dayEvents.slice(0, MAX_SHOW).map(ev => (
                <EventChip key={ev.id} event={ev} dateKey={cell.key}
                  onDelete={id => onDelete(cell.key, id)} />
              ))}
              {dayEvents.length > MAX_SHOW && (
                <span className="text-[10px] text-gray-400 font-medium px-1">
                  +{dayEvents.length - MAX_SHOW} autre{dayEvents.length-MAX_SHOW>1?'s':''}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Agenda Sidebar ────────────────────────────────────────────────────────────

function AgendaList({ year, month, events, onDelete }) {
  const days = Object.keys(events)
    .filter(k => { const d=parseKey(k); return d.getFullYear()===year && d.getMonth()===month })
    .sort()

  if (!days.length) return (
    <div className="flex flex-col items-center justify-center h-32 text-center">
      <Calendar size={24} className="text-gray-200 mb-2"/>
      <p className="text-xs text-gray-400">Aucun événement ce mois</p>
    </div>
  )

  return (
    <div className="space-y-4 overflow-y-auto max-h-[420px] pr-1">
      {days.map(dateKey => {
        const d = parseKey(dateKey)
        const isToday = dateKey === todayKey
        return (
          <div key={dateKey}>
            <div className={`text-xs font-bold mb-2 ${isToday ? 'text-primary-500' : 'text-gray-400'}`}>
              {isToday ? "Aujourd'hui · " : ''}{DAYS_FR[(d.getDay()+6)%7]} {d.getDate()} {MONTHS_FR[d.getMonth()]}
            </div>
            <div className="space-y-1.5">
              {(events[dateKey]||[]).map(ev => {
                const cfg = TYPE_CONFIG[ev.type]
                const Icon = cfg.Icon
                return (
                  <div key={ev.id} className={`flex items-start gap-2.5 p-2.5 rounded-xl ${cfg.bg} group`}>
                    <div className={`w-5 h-5 rounded-full ${cfg.dot} flex items-center justify-center shrink-0 mt-0.5`}>
                      <Icon size={10} className="text-white"/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-semibold ${cfg.text} truncate`}>{ev.title}</p>
                      {ev.time && <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1"><Clock size={9}/>{ev.time}</p>}
                    </div>
                    <button onClick={() => onDelete(dateKey, ev.id)}
                      className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-black/10 rounded-full transition-all shrink-0 mt-0.5">
                      <X size={10} className="text-gray-400"/>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function CalendrierInstitut() {
  const now = new Date()
  const [year,  setYear]  = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [events, setEvents] = useState(INITIAL)
  const [modal, setModal] = useState(null)

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y=>y-1) } else setMonth(m=>m-1)
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y=>y+1) } else setMonth(m=>m+1)
  }

  function handleAdd(dateKey, data) {
    setEvents(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey]||[]), { id: Date.now(), ...data }]
    }))
  }

  function handleDelete(dateKey, id) {
    setEvents(prev => {
      const updated = (prev[dateKey]||[]).filter(e=>e.id!==id)
      if (!updated.length) { const n={...prev}; delete n[dateKey]; return n }
      return { ...prev, [dateKey]: updated }
    })
  }

  const totalThisMonth = Object.keys(events)
    .filter(k => { const d=parseKey(k); return d.getFullYear()===year && d.getMonth()===month })
    .reduce((acc,k) => acc + (events[k]||[]).length, 0)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-body">
      
      <div className="flex flex-1">
        <DashboardSidebar isPremium={false} />

        <main className="flex-1 p-6 overflow-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display text-2xl font-bold text-gray-900">Mon Calendrier</h1>
              <p className="text-sm text-gray-400">Institut Planty</p>
            </div>
            <button onClick={() => setModal(todayKey)}
              className="btn-primary flex items-center gap-1.5 text-sm">
              <Plus size={14}/> Nouvel événement
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">

            {/* Calendar card */}
            <div className="lg:col-span-2 card p-5">
              {/* Month nav */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-lg font-bold text-gray-900 capitalize">
                  {MONTHS_FR[month]} {year}
                </h2>
                <div className="flex items-center gap-1">
                  <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                    <ChevronLeft size={16} className="text-gray-600"/>
                  </button>
                  <button
                    onClick={() => { setYear(now.getFullYear()); setMonth(now.getMonth()) }}
                    className="text-xs font-semibold text-primary-500 hover:text-primary-600 px-2 py-1 rounded-lg hover:bg-primary-50 transition-colors">
                    Aujourd'hui
                  </button>
                  <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                    <ChevronRight size={16} className="text-gray-600"/>
                  </button>
                </div>
              </div>

              {/* Legend */}
              <div className="flex gap-4 mb-4">
                {Object.entries(TYPE_CONFIG).map(([k,cfg]) => (
                  <div key={k} className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span className={`w-2 h-2 rounded-full ${cfg.dot}`}/>
                    {cfg.label}
                  </div>
                ))}
              </div>

              <CalendarGrid
                year={year} month={month}
                events={events}
                onDayClick={key => setModal(key)}
                onDelete={handleDelete}
              />
            </div>

            {/* Agenda sidebar */}
            <div className="card p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-800">Agenda — {MONTHS_FR[month]}</h2>
                <span className="text-xs text-gray-400">{totalThisMonth} événement{totalThisMonth>1?'s':''}</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {Object.entries(TYPE_CONFIG).map(([k,cfg])=>{
                  const count = Object.entries(events)
                    .filter(([key])=>{const d=parseKey(key);return d.getFullYear()===year&&d.getMonth()===month})
                    .reduce((acc,[,evs])=>acc+evs.filter(e=>e.type===k).length,0)
                  return count > 0 ? (
                    <span key={k} className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cfg.badge}`}>
                      {count} {cfg.label}
                    </span>
                  ) : null
                })}
              </div>

              <AgendaList year={year} month={month} events={events} onDelete={handleDelete}/>

              <button onClick={() => setModal(todayKey)}
                className="btn-outline text-sm flex items-center justify-center gap-1.5 w-full">
                <Plus size={13}/> Ajouter un événement
              </button>
            </div>
          </div>
        </main>
      </div>

      {modal && (
        <AddEventModal
          dateKey={modal}
          onClose={() => setModal(null)}
          onAdd={(data) => { handleAdd(modal, data); setModal(null) }}
        />
      )}
    </div>
  )
}