import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, ChevronRight, ChevronLeft, Upload } from 'lucide-react'

const STEPS = ['Informations personnelles', 'Détails Institut', 'Services & Horaires', 'Confirmation']

const services = ['Manucure', 'Pédicure', 'Massage', 'Soin visage', 'Coiffure', 'Hammam', 'Extension cils', 'Épilation', 'Autre']
const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

export default function Register() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  // Step 0
  const [name, setName] = useState('')
  const [email, setEmail] = useState('sharon@beauty.com')
  const [phone, setPhone] = useState('+213 0XX XX XX XX')
  const [watsapp, setWatsapp] = useState('+213 0XX XX XX XX')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  // Step 1
  const [instName, setInstName] = useState('')
  const [instDesc, setInstDesc] = useState('')
  const [wilaya, setWilaya] = useState('')
  const [commune, setCommune] = useState('')
  const [address, setAddress] = useState('')
  const [website, setWebsite] = useState('')

  // Step 2
  const [selectedServices, setSelectedServices] = useState(['Massage'])
  const [selectedDays, setSelectedDays] = useState(['Mardi', 'Mercredi', 'Jeudi', 'Vendredi'])

  const toggleService = s => setSelectedServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  const toggleDay = d => setSelectedDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d])

  if (done) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 animate-fade-in">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200">
            <CheckCircle size={30} className="text-white" />
          </div>
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-3">Félicitations !</h1>
          <p className="text-gray-500 mb-6">Votre compte a été créé avec succès. Un email de confirmation a été envoyé à votre adresse.</p>
          <p className="text-sm text-gray-400 mb-8">Notre équipe vérifiera votre institut dans les prochaines heures et vous confirmera son activation.</p>
          <Link to="/dashboard" className="btn-primary inline-block px-10 py-3">Accéder à mon tableau de bord</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 h-14 flex items-center px-6">
        <Link to="/" className="font-display font-bold text-xl text-primary-500">Planty<span className="text-primary-300">*</span></Link>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-2xl mx-auto px-4 py-3 text-xs text-gray-400 flex gap-2">
        <Link to="/" className="hover:text-primary-500">Startups</Link>
        <span>/</span>
        <span>Inscription</span>
        <span>/</span>
        <span className="text-gray-600 font-medium">{STEPS[step]}</span>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-16">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-8">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < step ? 'bg-primary-500 text-white' : i === step ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                  {i < step ? <CheckCircle size={14} /> : i + 1}
                </div>
                <span className="text-xs mt-1 text-center hidden sm:block text-gray-400 font-medium">{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-2 mb-4 ${i < step ? 'bg-primary-400' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="card p-8 animate-fade-in">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-1">Créez votre compte</h2>
          <p className="text-sm text-gray-400 mb-7">Étape {step + 1} sur {STEPS.length} — {STEPS[step]}</p>

          {/* Step 0 */}
          {step === 0 && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5">Nom complet *</label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Ex : Amal Touimi" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5">Email professionnel *</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5">Numéro de téléphone *</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-400" />
                  <p className="text-xs text-gray-400 mt-1">Min. 8 caractères</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5">WhatsApp (optionnel)</label>
                  <input value={watsapp} onChange={e => setWatsapp(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5">Mot de passe *</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Confirmer" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5">Confirmer le mot de passe *</label>
                  <input type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} placeholder="Confirmer" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-400" />
                </div>
              </div>
            </div>
          )}

          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">Nom de l'Institut *</label>
                <input value={instName} onChange={e => setInstName(e.target.value)} placeholder="Ex : Institut Beauty" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-400" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">Description de l'Institut *</label>
                <textarea rows={3} value={instDesc} onChange={e => setInstDesc(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-400 resize-none" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5">Wilaya *</label>
                  <input value={wilaya} onChange={e => setWilaya(e.target.value)} placeholder="Ex : Alger" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1.5">Commune *</label>
                  <input value={commune} onChange={e => setCommune(e.target.value)} placeholder="Ex : Bab El Oued" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-400" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">Adresse complète *</label>
                <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Ex : 25 Rue des Oliviers, Alger" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-400" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">Site web (optionnel)</label>
                <input value={website} onChange={e => setWebsite(e.target.value)} placeholder="Ex : www.monbeauty.com" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-400" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">Logo de l'Institut *</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary-300 transition-colors">
                  <Upload size={24} className="text-gray-300" />
                  <p className="text-sm text-gray-400">Glissez-déposez ou cliquez pour sélectionner</p>
                  <p className="text-xs text-gray-300">PNG, JPG jusqu'à 5MB</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-3">Services proposés *</label>
                <div className="flex flex-wrap gap-2">
                  {services.map(s => (
                    <button key={s} onClick={() => toggleService(s)}
                      className={`text-sm px-4 py-1.5 rounded-full border transition-all ${selectedServices.includes(s) ? 'bg-primary-500 text-white border-primary-500' : 'border-gray-200 text-gray-600 hover:border-primary-300'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-3">Jours d'ouverture *</label>
                <div className="grid grid-cols-2 gap-2">
                  {dayNames.map(d => (
                    <button key={d} onClick={() => toggleDay(d)}
                      className={`text-sm px-4 py-2 rounded-xl border transition-all text-left ${selectedDays.includes(d) ? 'bg-primary-50 border-primary-400 text-primary-700 font-semibold' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                      {selectedDays.includes(d) ? '☑ ' : '☐ '}{d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3 - Summary */}
          {step === 3 && (
            <div>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm">A</div>
                    <span className="text-xs font-bold text-gray-600 uppercase">Informations personnelles</span>
                  </div>
                  <div className="text-xs space-y-1 text-gray-500">
                    <div><span className="text-gray-400">Nom</span><br/><span className="text-gray-800 font-medium">{name || 'Amal Touimi'}</span></div>
                    <div><span className="text-gray-400">Email</span><br/><span className="text-gray-800 font-medium">{email}</span></div>
                    <div><span className="text-gray-400">Tél.</span><br/><span className="text-gray-800 font-medium">{phone}</span></div>
                    <div className="text-green-600 font-semibold">✓ Vérifié</div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm">I</div>
                    <span className="text-xs font-bold text-gray-600 uppercase">Détails de l'Institut</span>
                  </div>
                  <div className="text-xs space-y-1 text-gray-500">
                    <div><span className="text-gray-400">Institut</span><br/><span className="text-gray-800 font-medium">{instName || 'Institut Beauty'}</span></div>
                    <div><span className="text-gray-400">Adresse</span><br/><span className="text-gray-800 font-medium">{address || '25 Rue des Oliviers, Alger'}</span></div>
                    <div><span className="text-gray-400">Wilaya</span><br/><span className="text-gray-800 font-medium">{wilaya || 'Alger'} – {commune || 'Bab El Oued'}</span></div>
                    <div className="text-green-600 font-semibold">✓ Validé</div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm">S</div>
                    <span className="text-xs font-bold text-gray-600 uppercase">Services & Horaires</span>
                  </div>
                  <div className="text-xs space-y-1 text-gray-500">
                    <div><span className="text-gray-400">Services</span><br/><div className="flex flex-wrap gap-1 mt-1">{selectedServices.slice(0,3).map(s => <span key={s} className="bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded text-xs">{s}</span>)}</div></div>
                    <div><span className="text-gray-400">Jours</span><br/><span className="text-gray-800 font-medium">{selectedDays.map(d => d.slice(0,3)).join(' · ')}</span></div>
                    <div className="text-green-600 font-semibold">✓ Activé</div>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-0.5">Offre sélectionnée</div>
                  <div className="font-bold text-primary-600">Essentiel — 2 900 DA / mois</div>
                  <div className="text-xs text-gray-400 mt-0.5">Sélectionnez une offre supérieure pour plus d'avantages</div>
                </div>
                <button className="btn-outline text-xs">Changer →</button>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            {step > 0 ? (
              <button onClick={() => setStep(s => s - 1)} className="btn-outline flex items-center gap-2"><ChevronLeft size={15} /> Précédent</button>
            ) : <div />}
            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep(s => s + 1)} className="btn-primary flex items-center gap-2">Suivant <ChevronRight size={15} /></button>
            ) : (
              <button onClick={() => setDone(true)} className="btn-primary flex items-center gap-2">Créer mon compte <CheckCircle size={15} /></button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}