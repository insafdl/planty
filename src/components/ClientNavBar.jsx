import { Link, useLocation } from 'react-router-dom'
import { Menu, X, User, Calendar, Heart } from 'lucide-react'
import { useState } from 'react'

export default function ClientNavBar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-2xl text-primary-500">
          Planty<span className="text-primary-300">*</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link to="/client/salons" className={location.pathname === '/client/salons' ? 'text-primary-500 font-semibold' : 'hover:text-primary-500 transition-colors'}>
            Instituts
          </Link>
          <Link to="/client/reserver" className={location.pathname === '/client/reserver' ? 'text-primary-500 font-semibold' : 'hover:text-primary-500 transition-colors'}>
            Réserver
          </Link>
          <Link to="/client/favoris" className={location.pathname === '/client/favoris' ? 'text-primary-500 font-semibold' : 'hover:text-primary-500 transition-colors'}>
            Favoris
          </Link>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Link to="/client/connexion" className="btn-primary">Se déconnecter</Link>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4 text-sm">
          <Link to="/client/salons" onClick={() => setOpen(false)} className="font-medium flex items-center gap-2">
            <Heart size={16} />
            Instituts
          </Link>
          <Link to="/client/reserver" onClick={() => setOpen(false)} className="font-medium flex items-center gap-2">
            <Calendar size={16} />
            Réserver
          </Link>
          <Link to="/client/favoris" onClick={() => setOpen(false)} className="font-medium flex items-center gap-2">
            <Heart size={16} />
            Favoris
          </Link>
          <Link to="/client/profil" onClick={() => setOpen(false)} className="font-medium flex items-center gap-2">
            <User size={16} />
            Mon profil
          </Link>
          <Link to="/client/connexion" onClick={() => setOpen(false)} className="btn-primary text-center">Se déconnecter</Link>
        </div>
      )}
    </header>
  )
}