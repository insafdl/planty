import { useState } from 'react'
import { Plus, Search, Phone, Mail, MoreVertical, Pencil, Trash2, Star, Calendar, X, Check, ChevronDown } from 'lucide-react'
import Navbar from '../components/Navbar'
import DashboardSidebar from '../components/DashboardSidebar'

// ── Données mock ──────────────────────────────────────────────────────────────
const INITIAL_TEAM = [
  {
    id: 1,
    firstName: 'Sarah',
    lastName: 'Medjber',
    role: 'Esthéticienne senior',
    phone: '+213 555 01 23 45',
    email: 'sarah@sharon-beauty.dz',
    color: 'bg-pink-200',
    initials: 'SM',
    specialties: ['Soins visage', 'Épilation', 'Maquillage'],
    rating: 4.9,
    rdvThisMonth: 38,
    hoursPerWeek: 40,
    status: 'Confirmé',
    since: '2021-03-15',
  },
  {
    id: 2,
    firstName: 'Lyna',
    lastName: 'Bouziane',
    role: 'Manucure & Pédicure',
    phone: '+213 555 09 87 65',
    email: 'lyna@sharon-beauty.dz',
    color: 'bg-indigo-200',
    initials: 'LB',
    specialties: ['Manucure', 'Nail art', 'Pédicure'],
    rating: 4.7,
    rdvThisMonth: 52,
    hoursPerWeek: 35,
    status: 'Confirmé',
    since: '2022-06-01',
  },
  {
    id: 3,
    firstName: 'Rania',
    lastName: 'Hamdi',
    role: 'Coiffeuse',
    phone: '+213 555 11 22 33',
    email: 'rania@sharon-beauty.dz',
    color: 'bg-teal-200',
    initials: 'RH',
    specialties: ['Coupe', 'Coloration', 'Lissage'],
    rating: 4.8,
    rdvThisMonth: 44,
    hoursPerWeek: 40,
    status: 'Confirmé',
    since: '2020-11-10',
  },
  {
    id: 4,
    firstName: 'Imane',
    lastName: 'Oukaci',
    role: 'Apprentie esthéticienne',
    phone: '+213 555 44 55 66',
    email: 'imane@sharon-beauty.dz',
    color: 'bg-orange-200',
    initials: 'IO',
    specialties: ['Soins corps', 'Épilation'],
    rating: 4.4,
    rdvThisMonth: 18,
    hoursPerWeek: 24,
    status: 'Attente',
    since: '2023-09-01',
  },
]

const ROLES = [
  'Esthéticienne senior', 'Esthéticienne', 'Apprentie esthéticienne',
  'Manucure & Pédicure', 'Coiffeuse', 'Maquilleuse', 'Responsable accueil',
]

const SPECIALTIES_LIST = [
  'Soins visage', 'Soins corps', 'Épilation', 'Maquillage',
  'Manucure', 'Pédicure', 'Nail art', 'Coupe', 'Coloration', 'Lissage', 'Massage',
]

const AVATAR_COLORS = [
  'bg-pink-200', 'bg-indigo-200', 'bg-teal-200', 'bg-orange-200',
  'bg-purple-200', 'bg-rose-200', 'bg-sky-200', 'bg-lime-200',
]

function formatSince(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
}

function getInitials(first, last) {
  return `${first[0]}${last[0]}`.toUpperCase()
}

// ── Modal Ajouter / Modifier ──────────────────────────────────────────────────
function MemberModal({ member, onClose, onSave }) {
  const isEdit = !!member?.id
  const [form, setForm] = useState(member ?? {
    firstName: '', lastName: '', role: '', phone: '', email: '',
    color: AVATAR_COLORS[0], specialties: [], hoursPerWeek: 40, status: 'Confirmé',
  })
  const [errors, setErrors] = useState({})

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const toggleSpec = s => set('specialties',
    form.specialties.includes(s)
      ? form.specialties.filter(x => x !== s)
      : [...form.specialties, s]
  )

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Requis'
    if (!form.lastName.trim()) e.lastName = 'Requis'
    if (!form.role) e.role = 'Requis'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSave = () => {
    if (!validate()) return
    onSave({
      ...form,
      initials: getInitials(form.firstName, form.lastName),
      since: form.since ?? new Date().toISOString().split('T')[0],
      rating: form.rating ?? 5.0,
      rdvThisMonth: form.rdvThisMonth ?? 0,
      id: form.id ?? Date.now(),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-display text-lg font-bold text-gray-900">
            {isEdit ? 'Modifier le membre' : 'Ajouter un membre'}
          </h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Couleur avatar */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">Couleur de l'avatar</label>
            <div className="flex gap-2 flex-wrap">
              {AVATAR_COLORS.map(c => (
                <button key={c} onClick={() => set('color', c)}
                  className={`w-7 h-7 rounded-full ${c} border-2 transition-all ${form.color === c ? 'border-primary-500 scale-110' : 'border-transparent'}`}
                />
              ))}
            </div>
          </div>

          {/* Prénom + Nom */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Prénom *</label>
              <input value={form.firstName} onChange={e => set('firstName', e.target.value)}
                className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition ${errors.firstName ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="Sarah" />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Nom *</label>
              <input value={form.lastName} onChange={e => set('lastName', e.target.value)}
                className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition ${errors.lastName ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="Medjber" />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Rôle */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Rôle *</label>
            <div className="relative">
              <select value={form.role} onChange={e => set('role', e.target.value)}
                className={`w-full border rounded-xl px-3 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition ${errors.role ? 'border-red-400' : 'border-gray-200'}`}>
                <option value="">Sélectionner...</option>
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
          </div>

          {/* Téléphone + Email */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Téléphone</label>
              <input value={form.phone} onChange={e => set('phone', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition"
                placeholder="+213 5xx xx xx xx" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
              <input value={form.email} onChange={e => set('email', e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition"
                placeholder="prenom@salon.dz" />
            </div>
          </div>

          {/* Heures + Statut */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Heures / semaine</label>
              <input type="number" value={form.hoursPerWeek} onChange={e => set('hoursPerWeek', Number(e.target.value))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition"
                min={1} max={60} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Statut</label>
              <div className="relative">
                <select value={form.status} onChange={e => set('status', e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition">
                  <option value="Confirmé">Actif</option>
                  <option value="Attente">En congé</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Spécialités */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-2">Spécialités</label>
            <div className="flex flex-wrap gap-1.5">
              {SPECIALTIES_LIST.map(s => (
                <button key={s} onClick={() => toggleSpec(s)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                    form.specialties.includes(s)
                      ? 'bg-primary-500 text-white border-primary-500'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-primary-300'
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 p-5 border-t border-gray-100">
          <button onClick={onClose} className="btn-outline flex-1 text-sm">Annuler</button>
          <button onClick={handleSave} className="btn-primary flex-1 text-sm flex items-center justify-center gap-2">
            <Check size={14} />
            {isEdit ? 'Enregistrer' : 'Ajouter'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Modal suppression ─────────────────────────────────────────────────────────
function DeleteModal({ member, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 size={20} className="text-red-500" />
        </div>
        <h3 className="font-display text-lg font-bold text-gray-900 mb-2">Supprimer ce membre ?</h3>
        <p className="text-sm text-gray-500 mb-5">
          <span className="font-medium text-gray-700">{member.firstName} {member.lastName}</span> sera retiré de l'équipe. Cette action est irréversible.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="btn-outline flex-1 text-sm">Annuler</button>
          <button onClick={onConfirm} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-xl transition-colors text-sm">
            Supprimer
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Page principale ───────────────────────────────────────────────────────────
export default function MonEquipe() {
  const [team, setTeam] = useState(INITIAL_TEAM)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('Tous')
  const [modal, setModal] = useState(null)
  const [menuOpen, setMenuOpen] = useState(null)
  const [toast, setToast] = useState(null)

  const showToast = msg => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const filtered = team.filter(m => {
    const q = search.toLowerCase()
    const matchSearch = !q ||
      `${m.firstName} ${m.lastName}`.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      m.specialties.some(s => s.toLowerCase().includes(q))
    const matchStatus = filterStatus === 'Tous' || m.status === filterStatus
    return matchSearch && matchStatus
  })

  const actifs = team.filter(m => m.status === 'Confirmé').length
  const avgRating = team.length ? (team.reduce((s, m) => s + m.rating, 0) / team.length).toFixed(1) : '—'
  const totalRdv = team.reduce((s, m) => s + m.rdvThisMonth, 0)

  const handleSave = member => {
    setTeam(prev => {
      const idx = prev.findIndex(m => m.id === member.id)
      if (idx >= 0) { const u = [...prev]; u[idx] = member; return u }
      return [...prev, member]
    })
    setModal(null)
    showToast(team.find(m => m.id === member.id) ? 'Membre mis à jour ✓' : 'Membre ajouté ✓')
  }

  const handleDelete = () => {
    setTeam(prev => prev.filter(m => m.id !== modal.member.id))
    setModal(null)
    showToast('Membre supprimé')
  }

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
              <h1 className="font-display text-2xl font-bold text-gray-900">Mon équipe</h1>
              <p className="text-sm text-gray-400">{team.length} membre{team.length > 1 ? 's' : ''} au total</p>
            </div>
            <button onClick={() => setModal({ type: 'add' })} className="btn-primary flex items-center gap-1.5">
              <Plus size={14} /> Ajouter un membre
            </button>
          </div>

          {/* Stats — même pattern que Dashboard */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { value: team.length, label: 'Membres',      sub: "dans l'équipe",  subColor: 'text-gray-400' },
              { value: actifs,      label: 'Actifs',        sub: 'en ce moment',   subColor: 'text-green-500' },
              { value: avgRating,   label: 'Note moyenne',  sub: '★ sur 5',        subColor: 'text-amber-500' },
              { value: totalRdv,    label: 'RDV ce mois',   sub: 'au total',       subColor: 'text-primary-500' },
            ].map(s => (
              <div key={s.label} className="card p-4">
                <div className="font-display text-3xl font-bold text-gray-900 mb-1">{s.value}</div>
                <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                <div className={`text-xs font-semibold ${s.subColor}`}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Recherche + filtres */}
          <div className="flex items-center gap-3 mb-5">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher par nom, rôle, spécialité…"
                className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition bg-white"
              />
            </div>
            <div className="flex gap-2 text-xs">
              {[
                { value: 'Tous',      label: 'Tous' },
                { value: 'Confirmé',  label: 'Actifs' },
                { value: 'Attente',   label: 'En congé' },
              ].map(f => (
                <button key={f.value} onClick={() => setFilterStatus(f.value)}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                    filterStatus === f.value ? 'bg-primary-500 text-white' : 'text-gray-500 hover:bg-gray-100'
                  }`}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tableau membres */}
          {filtered.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="text-sm text-gray-400">Aucun membre trouvé.</p>
            </div>
          ) : (
            <div className="card p-5">
              <div className="space-y-1">
                {filtered.map((m, i) => (
                  <div key={m.id}>
                    {i > 0 && <div className="border-t border-gray-50 my-1" />}
                    <div className="flex items-center gap-4 py-2 group">

                      {/* Avatar */}
                      <div className={`w-10 h-10 ${m.color} rounded-full flex items-center justify-center text-xs font-bold text-gray-700 shrink-0`}>
                        {m.initials}
                      </div>

                      {/* Nom + rôle + spécialités */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-gray-900">{m.firstName} {m.lastName}</span>
                          <span className={m.status === 'Confirmé' ? 'status-confirmed' : 'status-pending'}>
                            {m.status === 'Confirmé' ? 'Actif' : 'En congé'}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400 mb-1">{m.role}</div>
                        <div className="flex gap-1 flex-wrap">
                          {m.specialties.slice(0, 3).map(s => (
                            <span key={s} className="bg-primary-50 text-primary-500 text-[10px] font-medium px-2 py-0.5 rounded-full">{s}</span>
                          ))}
                          {m.specialties.length > 3 && (
                            <span className="bg-gray-100 text-gray-400 text-[10px] font-medium px-2 py-0.5 rounded-full">+{m.specialties.length - 3}</span>
                          )}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="hidden md:flex items-center gap-6 shrink-0">
                        <div className="text-center">
                          <div className="text-sm font-bold text-gray-900">{m.rdvThisMonth}</div>
                          <div className="text-[10px] text-gray-400">RDV / mois</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center gap-0.5 justify-center">
                            <Star size={11} className="fill-amber-400 text-amber-400" />
                            <span className="text-sm font-bold text-gray-900">{m.rating}</span>
                          </div>
                          <div className="text-[10px] text-gray-400">Note</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-bold text-gray-900">{m.hoursPerWeek}h</div>
                          <div className="text-[10px] text-gray-400">/ semaine</div>
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="hidden lg:flex flex-col gap-1 shrink-0 w-44">
                        {m.phone && (
                          <a href={`tel:${m.phone}`} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary-500 transition-colors">
                            <Phone size={11} />{m.phone}
                          </a>
                        )}
                        {m.email && (
                          <a href={`mailto:${m.email}`} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary-500 transition-colors">
                            <Mail size={11} /><span className="truncate">{m.email}</span>
                          </a>
                        )}
                        <div className="flex items-center gap-1.5 text-xs text-gray-300">
                          <Calendar size={11} />Depuis {formatSince(m.since)}
                        </div>
                      </div>

                      {/* Menu kebab */}
                      <div className="relative shrink-0">
                        <button
                          onClick={() => setMenuOpen(menuOpen === m.id ? null : m.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <MoreVertical size={15} />
                        </button>
                        {menuOpen === m.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(null)} />
                            <div className="absolute right-0 top-8 z-20 bg-white rounded-xl shadow-lg border border-gray-100 w-36 py-1 overflow-hidden">
                              <button
                                onClick={() => { setMenuOpen(null); setModal({ type: 'edit', member: m }) }}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <Pencil size={13} /> Modifier
                              </button>
                              <button
                                onClick={() => { setMenuOpen(null); setModal({ type: 'delete', member: m }) }}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                              >
                                <Trash2 size={13} /> Supprimer
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ajouter depuis la liste */}
              <div className="border-t border-gray-100 mt-3 pt-3">
                <button
                  onClick={() => setModal({ type: 'add' })}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-500 transition-colors"
                >
                  <Plus size={14} /> Ajouter un membre
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Modals */}
      {modal?.type === 'add'    && <MemberModal onClose={() => setModal(null)} onSave={handleSave} />}
      {modal?.type === 'edit'   && <MemberModal member={modal.member} onClose={() => setModal(null)} onSave={handleSave} />}
      {modal?.type === 'delete' && <DeleteModal member={modal.member} onClose={() => setModal(null)} onConfirm={handleDelete} />}

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