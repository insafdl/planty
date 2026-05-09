import { useState } from 'react'
import { Plus, Pencil, Trash2, Clock, X, CheckCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import DashboardSidebar from '../components/DashboardSidebar'
import { institutes } from '../data'

// On prend l'institut connecté (sharon-beauty pour l'instant)
const MY_INSTITUTE_ID = 'sharon-beauty'
const institute = institutes.find(i => i.id === MY_INSTITUTE_ID)

const ICONS = ['💆', '🤲', '💅', '✨', '🌟', '🦵', '♨️', '🌋', '💇', '🧖', '🪷', '🫧']

const EMPTY_FORM = { name: '', duration: '', price: '', icon: '💆', description: '' }

// ── Service Modal ─────────────────────────────────────────────────────────────

function ServiceModal({ initial = EMPTY_FORM, onClose, onSave, title }) {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    setErrors(e => ({ ...e, [field]: '' }))
  }

  function validate() {
    const e = {}
    if (!form.name.trim())        e.name     = 'Le nom est requis'
    if (!form.duration || form.duration <= 0) e.duration = 'Durée invalide'
    if (!form.price    || form.price    <= 0) e.price    = 'Prix invalide'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSave() {
    if (!validate()) return
    onSave({ ...form, duration: Number(form.duration), price: Number(form.price) })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-5 font-body">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
            <X size={16} className="text-gray-400" />
          </button>
        </div>

        {/* Icône */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Icône</label>
          <div className="flex flex-wrap gap-2">
            {ICONS.map(ic => (
              <button key={ic} onClick={() => set('icon', ic)}
                className={`w-10 h-10 text-xl rounded-xl border-2 transition-all ${form.icon === ic ? 'border-primary-500 bg-primary-50' : 'border-gray-100 hover:border-gray-300'}`}>
                {ic}
              </button>
            ))}
          </div>
        </div>

        {/* Nom */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Nom du service *</label>
          <input
            className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
            placeholder="Ex : Soin visage hydratant"
            value={form.name}
            onChange={e => set('name', e.target.value)}
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
        </div>

        {/* Durée + Prix */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Durée (min) *</label>
            <div className="relative">
              <input type="number" min="5"
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 pr-12 ${errors.duration ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                placeholder="60"
                value={form.duration}
                onChange={e => set('duration', e.target.value)}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 flex items-center gap-1">
                <Clock size={11} /> min
              </span>
            </div>
            {errors.duration && <p className="text-xs text-red-500">{errors.duration}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Prix (DA) *</label>
            <div className="relative">
              <input type="number" min="0"
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 pr-10 ${errors.price ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                placeholder="2500"
                value={form.price}
                onChange={e => set('price', e.target.value)}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">DA</span>
            </div>
            {errors.price && <p className="text-xs text-red-500">{errors.price}</p>}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Description (optionnel)</label>
          <textarea rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none"
            placeholder="Décrivez brièvement le service…"
            value={form.description}
            onChange={e => set('description', e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button onClick={onClose} className="btn-outline flex-1">Annuler</button>
          <button onClick={handleSave} className="btn-primary flex-1 flex items-center justify-center gap-2">
            <CheckCircle size={15} /> Enregistrer
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Delete confirm ────────────────────────────────────────────────────────────

function DeleteModal({ service, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center space-y-4 font-body">
        <div className="text-4xl">{service.icon}</div>
        <h3 className="font-display text-lg font-bold text-gray-900">Supprimer ce service ?</h3>
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-800">"{service.name}"</span> sera définitivement supprimé et ne sera plus visible par vos clients.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="btn-outline flex-1">Annuler</button>
          <button onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold text-sm py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
            <Trash2 size={14} /> Supprimer
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Service Card ──────────────────────────────────────────────────────────────

function ServiceCard({ service, onEdit, onDelete }) {
  return (
    <div className="card p-5 flex gap-4 hover:shadow-md transition-shadow group">
      {/* Icon */}
      <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-2xl shrink-0 border border-primary-100">
        {service.icon}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">{service.name}</h3>
            {service.description && (
              <p className="text-xs text-gray-400 mt-0.5 leading-relaxed line-clamp-2">{service.description}</p>
            )}
          </div>
          {/* Actions — visible on hover */}
          <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <button onClick={() => onEdit(service)}
              className="p-1.5 rounded-lg hover:bg-primary-50 text-gray-400 hover:text-primary-500 transition-colors">
              <Pencil size={14} />
            </button>
            <button onClick={() => onDelete(service)}
              className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors">
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-3">
          <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
            <Clock size={11} /> {service.duration} min
          </span>
          <span className="text-sm font-bold text-gray-900">
            {Number(service.price).toLocaleString()} DA
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function MesServices() {
  const [services, setServices] = useState(institute.services || [])
  const [addModal,    setAddModal]    = useState(false)
  const [editTarget,  setEditTarget]  = useState(null) // service object
  const [deleteTarget, setDeleteTarget] = useState(null) // service object
  const [toast, setToast] = useState(null)

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  function handleAdd(data) {
    const newService = { id: Date.now(), ...data }
    setServices(s => [...s, newService])
    showToast('Service ajouté avec succès ✓')
  }

  function handleEdit(data) {
    setServices(s => s.map(sv => sv.id === editTarget.id ? { ...sv, ...data } : sv))
    setEditTarget(null)
    showToast('Service modifié avec succès ✓')
  }

  function handleDelete() {
    setServices(s => s.filter(sv => sv.id !== deleteTarget.id))
    setDeleteTarget(null)
    showToast('Service supprimé')
  }

  const totalRevenuePotentiel = services.reduce((acc, s) => acc + s.price, 0)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-body">
      <Navbar variant="dashboard" />
      <div className="flex flex-1">
        <DashboardSidebar isPremium={false} />

        <main className="flex-1 p-6 overflow-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display text-2xl font-bold text-gray-900">Mes services</h1>
              <p className="text-sm text-gray-400">{institute.name} · {services.length} service{services.length > 1 ? 's' : ''} proposé{services.length > 1 ? 's' : ''}</p>
            </div>
            <button onClick={() => setAddModal(true)} className="btn-primary flex items-center gap-1.5 text-sm">
              <Plus size={14} /> Ajouter un service
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="card p-4">
              <div className="font-display text-3xl font-bold text-gray-900 mb-1">{services.length}</div>
              <div className="text-xs text-gray-500">Services actifs</div>
            </div>
            <div className="card p-4">
              <div className="font-display text-3xl font-bold text-gray-900 mb-1">
                {services.length > 0 ? Math.round(services.reduce((a, s) => a + s.duration, 0) / services.length) : 0} min
              </div>
              <div className="text-xs text-gray-500">Durée moyenne</div>
            </div>
            <div className="card p-4">
              <div className="font-display text-3xl font-bold text-gray-900 mb-1">
                {services.length > 0 ? Math.round(services.reduce((a, s) => a + s.price, 0) / services.length).toLocaleString() : 0} DA
              </div>
              <div className="text-xs text-gray-500">Prix moyen</div>
            </div>
          </div>

          {/* Services grid */}
          {services.length === 0 ? (
            <div className="card p-16 text-center">
              <div className="text-5xl mb-4">🌸</div>
              <h3 className="font-display text-xl font-bold text-gray-800 mb-2">Aucun service pour l'instant</h3>
              <p className="text-sm text-gray-400 mb-6">Ajoutez vos prestations pour qu'elles apparaissent sur votre profil et soient réservables en ligne.</p>
              <button onClick={() => setAddModal(true)} className="btn-primary inline-flex items-center gap-2">
                <Plus size={15} /> Ajouter mon premier service
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {services.map(service => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onEdit={s => setEditTarget(s)}
                  onDelete={s => setDeleteTarget(s)}
                />
              ))}

              {/* Add card */}
              <button onClick={() => setAddModal(true)}
                className="card p-5 border-2 border-dashed border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all flex flex-col items-center justify-center gap-3 text-gray-400 hover:text-primary-500 min-h-[100px]">
                <Plus size={22} />
                <span className="text-sm font-medium">Ajouter un service</span>
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      {addModal && (
        <ServiceModal
          title="Nouveau service"
          onClose={() => setAddModal(false)}
          onSave={handleAdd}
        />
      )}
      {editTarget && (
        <ServiceModal
          title="Modifier le service"
          initial={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={handleEdit}
        />
      )}
      {deleteTarget && (
        <DeleteModal
          service={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-fade-in">
          <CheckCircle size={16} className="text-green-400" /> {toast}
        </div>
      )}
    </div>
  )
}