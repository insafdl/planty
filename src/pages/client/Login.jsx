import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

export default function ClientLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [userType, setUserType] = useState('client')
  const navigate = useNavigate()

  const handleLogin = () => {
    if (userType === 'institut') {
      navigate('/dashboard')
    } else {
      navigate('/client/salons')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <Link to="/" className="font-display font-bold text-3xl text-primary-500 mb-2">
        Planty<span className="text-primary-300">*</span>
      </Link>
      <p className="text-sm text-gray-400 mb-10">Votre espace beauté personnel</p>

      <div className="card p-8 w-full max-w-md shadow-xl shadow-pink-100/50">
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-5">Bon retour !</h1>

        {/* User type toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => setUserType('client')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              userType === 'client'
                ? 'bg-white text-primary-500 shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Cliente
          </button>
          <button
            onClick={() => setUserType('institut')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
              userType === 'institut'
                ? 'bg-white text-primary-500 shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Institut
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1.5">
              {userType === 'institut' ? 'Email professionnel' : 'Adresse email'}
            </label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="vous@example.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-400 transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1.5">Mot de passe</label>
            <div className="relative">
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary-400 transition-colors pr-10"
              />
              <button
                onClick={() => setShowPass(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center text-xs">
            <label className="flex items-center gap-1.5 text-gray-500 cursor-pointer">
              <input type="checkbox" className="accent-primary-500" /> Se souvenir de moi
            </label>
            <Link to="#" className="text-primary-500 font-medium hover:underline">Mot de passe oublié ?</Link>
          </div>
        </div>

        <button onClick={handleLogin} className="btn-primary block text-center w-full py-3 mt-6">
          Se connecter
        </button>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100" /></div>
          <div className="relative text-center"><span className="bg-white px-3 text-xs text-gray-400">ou continuer avec</span></div>
        </div>

        <button className="w-full border border-gray-200 rounded-xl py-2.5 text-sm font-medium text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continuer avec Google
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Pas encore de compte ?{' '}
          <Link
            to={userType === 'institut' ? '/inscription' : '/client/inscription'}
            className="text-primary-500 font-semibold hover:underline"
          >
            {userType === 'institut' ? 'Référencer mon institut' : 'Créer un compte'}
          </Link>
        </p>

        {/* Demo shortcut */}
        <div className="mt-5 pt-5 border-t border-gray-100">
          <p className="text-xs text-center text-gray-400 mb-2">Connexion rapide (démo)</p>
          {userType === 'client' ? (
            <Link to="/client/salons" className="text-xs border border-gray-200 rounded-xl py-2 text-center hover:border-primary-300 hover:text-primary-500 transition-colors block">
              Accéder en tant que cliente
            </Link>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              <Link to="/dashboard" className="text-xs border border-gray-200 rounded-xl py-2 text-center hover:border-primary-300 hover:text-primary-500 transition-colors">Gratuit</Link>
              <Link to="/dashboard/premium" className="text-xs border border-gray-200 rounded-xl py-2 text-center hover:border-primary-300 hover:text-primary-500 transition-colors">Premium</Link>
              <Link to="/dashboard/admin" className="text-xs border border-gray-200 rounded-xl py-2 text-center hover:border-primary-300 hover:text-primary-500 transition-colors">Admin</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}