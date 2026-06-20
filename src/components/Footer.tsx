import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">♞</span>
              <span className="font-extrabold text-lg text-[var(--color-primary)]">Chess For Everyone</span>
            </div>
            <p className="text-sm text-gray-500">
              Ensinando xadrez para crianças de forma divertida e acessível, promovendo inclusão e desenvolvimento.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-3">Links</h3>
            <div className="flex flex-col gap-2">
              <Link to="/learn" className="text-sm text-gray-500 no-underline hover:text-[var(--color-primary)]">Aprender</Link>
              <Link to="/play" className="text-sm text-gray-500 no-underline hover:text-[var(--color-primary)]">Jogar</Link>
              <Link to="/impact" className="text-sm text-gray-500 no-underline hover:text-[var(--color-primary)]">Impacto Social</Link>
              <Link to="/parents" className="text-sm text-gray-500 no-underline hover:text-[var(--color-primary)]">Dashboard dos Pais</Link>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-3">Acessibilidade</h3>
            <p className="text-sm text-gray-500">
              Nosso app é 100% gratuito e acessível. Disponível para todas as crianças, independente de sua condição.
            </p>
          </div>
        </div>
        <div className="border-t mt-8 pt-4 text-center text-sm text-gray-400 flex items-center justify-center gap-1">
          Feito com <Heart size={14} className="text-red-500 fill-red-500" /> para todas as crianças do mundo
        </div>
      </div>
    </footer>
  )
}
