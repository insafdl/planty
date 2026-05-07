import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar({ variant = 'public' }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  if (variant === 'dashboard') {
    return (
      <header className="bg-white border-b border-gray-100 h-14 flex items-center px-6 sticky top-0 z-50">
        <Link to="/" className="font-display font-bold text-xl text-primary-500 mr-8">Planty</Link>
        <nav className="flex gap-6 text-sm text-gray-500">
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'text-primary-500 font-semibold' : 'hover:text-gray-800'}>Tableau de bord</Link>
          <Link to="/dashboard/premium" className={location.pathname === '/dashboard/premium' ? 'text-primary-500 font-semibold' : 'hover:text-gray-800'}>Premium</Link>
          <Link to="/dashboard/admin" className={location.pathname === '/dashboard/admin' ? 'text-primary-500 font-semibold' : 'hover:text-gray-800'}>Super Admin</Link>
        </nav>
      </header>
    )
  }

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-2xl text-primary-500">
          Planty<span className="text-primary-300">*</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-primary-500 transition-colors">Accueil</Link>
          <Link to="/instituts" className="hover:text-primary-500 transition-colors">Instituts</Link>
          <Link to="/#how" className="hover:text-primary-500 transition-colors">Comment ça marche</Link>
          <Link to="/tarifs" className="hover:text-primary-500 transition-colors">Tarifs</Link>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Link to="/inscription" className="text-sm font-medium text-gray-600 hover:text-primary-500">Référencez votre institut</Link>
          <Link to="/connexion" className="btn-primary">Se connecter</Link>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4 text-sm">
          <Link to="/" onClick={() => setOpen(false)} className="font-medium">Accueil</Link>
          <Link to="/instituts" onClick={() => setOpen(false)} className="font-medium">Instituts</Link>
          <Link to="/tarifs" onClick={() => setOpen(false)} className="font-medium">Tarifs</Link>
          <Link to="/inscription" onClick={() => setOpen(false)} className="font-medium text-primary-500">Référencer mon institut</Link>
          <Link to="/connexion" onClick={() => setOpen(false)} className="btn-primary text-center">Se connecter</Link>
        </div>
      )}
    </header>
  )
}