import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex flex-col items-center justify-center p-6">
      <Link to="/" className="font-display font-bold text-3xl text-primary-500 mb-10">Planty<span className="text-primary-300">*</span></Link>
      <div className="card p-8 w-full max-w-md">
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">Se connecter</h1>
        <p className="text-sm text-gray-500 mb-7">Accédez à votre tableau de bord</p>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1.5">Email professionnel</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="vous@example.com" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-400" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1.5">Mot de passe</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-400" />
          </div>
          <div className="flex justify-between items-center text-xs">
            <label className="flex items-center gap-1.5 text-gray-500 cursor-pointer"><input type="checkbox" className="accent-primary-500" /> Se souvenir de moi</label>
            <Link to="#" className="text-primary-500 font-medium hover:underline">Mot de passe oublié ?</Link>
          </div>
        </div>
        <Link to="/dashboard" className="btn-primary block text-center py-3 mt-6">Se connecter</Link>
        <p className="text-center text-sm text-gray-500 mt-5">Pas encore de compte ? <Link to="/inscription" className="text-primary-500 font-semibold hover:underline">Référencer mon institut</Link></p>
        <div className="mt-6 pt-5 border-t border-gray-100">
          <p className="text-xs text-center text-gray-400 mb-3">Connexion rapide (démo)</p>
          <div className="grid grid-cols-3 gap-2">
            <Link to="/dashboard" className="text-xs border border-gray-200 rounded-xl py-2 text-center hover:border-primary-300 hover:text-primary-500 transition-colors">Gratuit</Link>
            <Link to="/dashboard/premium" className="text-xs border border-gray-200 rounded-xl py-2 text-center hover:border-primary-300 hover:text-primary-500 transition-colors">Premium</Link>
            <Link to="/dashboard/admin" className="text-xs border border-gray-200 rounded-xl py-2 text-center hover:border-primary-300 hover:text-primary-500 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </div>
  )
}