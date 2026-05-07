import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'

export default function InstituteCard({ institute, showNew = false }) {
  return (
    <Link to={`/instituts/${institute.id}`} className="block group">
      <div className="relative rounded-2xl overflow-hidden mb-3 aspect-[4/3]">
        <div className={`w-full h-full ${institute.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}>
          <div className="w-16 h-16 rounded-2xl bg-primary-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
            {institute.initials}
          </div>
        </div>
        {institute.popular && (
          <span className="absolute top-3 left-3 bg-white text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
            Populaire
          </span>
        )}
        {showNew && institute.isNew && (
          <span className="absolute top-3 left-3 bg-primary-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            Nouveau
          </span>
        )}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 group-hover:text-primary-500 transition-colors">{institute.name}</h3>
        <div className="flex items-center gap-1.5 mt-0.5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className={i < Math.floor(institute.rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'} />
            ))}
          </div>
          <span className="text-xs text-gray-500">{institute.rating} ({institute.reviews})</span>
          <span className="text-xs text-primary-500 font-medium ml-1 bg-primary-50 px-2 py-0.5 rounded-full">{institute.category}</span>
        </div>
      </div>
    </Link>
  )
}