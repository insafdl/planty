import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="font-display font-bold text-2xl text-white mb-3">Planty.</div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              La plateforme de réservation beauté numéro 1 en Algérie. Trouvez, comparez et réservez les meilleurs instituts près de chez vous.
            </p>
            <div className="flex gap-3">
              {['f', 'in', 'yt'].map(s => (
                <div key={s} className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-300 cursor-pointer hover:bg-primary-500 transition-colors">{s}</div>
              ))}
            </div>
          </div>
          {[
            { title: 'PLATEFORME', links: ['Comment ça marche', 'Trouver un institut', 'Catégories', 'Avis clients', 'Blog beauté'] },
            { title: 'PROFESSIONNELS', links: ['Référencer votre institut', 'Nos offres', 'Dashboard Pro', 'Ressources', 'Devenir partenaire'] },
            { title: 'SUPPORT', links: ['Centre d\'aide', 'Nous contacter', 'Politique de confidentialité', 'Conditions d\'utilisation', 'Mentions légales'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l}><Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors">{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>© 2025 Planty. Tous droits réservés.</span>
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>Tous les systèmes opérationnels</span>
            <Link to="#" className="hover:text-gray-300">Confidentialité</Link>
            <Link to="#" className="hover:text-gray-300">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}