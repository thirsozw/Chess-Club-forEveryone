import { Link } from 'react-router-dom'
import { BookOpen, Brain, Target, Lightbulb, Focus, Shield, Sparkles, ArrowRight } from 'lucide-react'
import AnimatedCounter from '../components/AnimatedCounter'

const benefits = [
  { icon: Brain, title: 'Pensamento Crítico', desc: 'Analise situações e tome decisões inteligentes', color: '#6C63FF' },
  { icon: Target, title: 'Resolução de Problemas', desc: 'Encontre soluções criativas para desafios', color: '#FF6B6B' },
  { icon: Lightbulb, title: 'Criatividade', desc: 'Imagine novas possibilidades e estratégias', color: '#FFE66D' },
  { icon: Focus, title: 'Concentração', desc: 'Desenvolva foco e atenção aos detalhes', color: '#4ECDC4' },
  { icon: Shield, title: 'Disciplina', desc: 'Aprenda paciência e persistência', color: '#51CF66' },
  { icon: Sparkles, title: 'Tomada de Decisão', desc: 'Avalie opções e escolha o melhor caminho', color: '#FF9FF3' },
]

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 text-white">
        <div className="absolute inset-0 opacity-10">
          {['♔','♕','♖','♗','♘','♙'].map((p, i) => (
            <span
              key={i}
              className="absolute text-6xl anim-float"
              style={{ left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 25}%`, animationDelay: `${i * 0.5}s` }}
            >
              {p}
            </span>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="text-center max-w-3xl mx-auto anim-fade-up">
            <div className="text-7xl md:text-8xl mb-6 anim-scale-in">♞</div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">Chess For Everyone</h1>
            <p className="text-lg md:text-xl opacity-90 mb-8 font-medium">
              Aprenda xadrez de forma divertida enquanto desenvolve habilidades para a vida.
            </p>
            <Link
              to="/learn"
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-2xl font-extrabold text-lg no-underline hover:bg-purple-50 hover:scale-105 transition-all shadow-lg"
            >
              Começar Jornada <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none"><path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H0Z" fill="var(--color-bg)"/></svg>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AnimatedCounter end={15} label="Lições" icon="📚" />
          <AnimatedCounter end={8} label="Puzzles" icon="🧩" />
          <AnimatedCounter end={11} label="Temas" icon="🎨" />
          <AnimatedCounter end={100} suffix="%" label="Gratuito" icon="💝" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12 anim-fade-up">
          <h2 className="text-3xl md:text-4xl font-black mb-3">
            Por que o Xadrez <span className="gradient-text">Importa</span>?
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            O xadrez desenvolve habilidades essenciais que vão muito além do tabuleiro
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon
            return (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all anim-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: b.color + '20' }}>
                  <Icon size={28} style={{ color: b.color }} />
                </div>
                <h3 className="font-bold text-lg mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm">{b.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white text-center anim-fade-up">
          <BookOpen size={48} className="mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-black mb-3">Pronto para começar?</h2>
          <p className="opacity-90 mb-6 max-w-xl mx-auto">
            Junte-se a milhares de crianças que estão aprendendo xadrez enquanto se divertem!
          </p>
          <Link
            to="/learn"
            className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-2xl font-extrabold no-underline hover:scale-105 transition-transform"
          >
            Começar Agora <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}
