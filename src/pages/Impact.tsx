import { Heart, Globe, Users, BookOpen } from 'lucide-react'

const stories = [
  { name: 'Maria', age: 10, location: 'Rio de Janeiro, Brasil', emoji: '👧🏽', story: 'Maria mora em um orfanato no Rio de Janeiro. Quando conheceu o xadrez, descobriu que podia ser estrategista e competir de igual para igual com qualquer pessoa. Hoje ela ensina outras meninas a jogar.', quote: '"O xadrez me mostrou que posso ser qualquer coisa que eu quiser."' },
  { name: 'Pedro', age: 9, location: 'Comunidade da Maré, Rio de Janeiro', emoji: '👦🏾', story: 'Pedro aprendeu xadrez em um projeto social na comunidade. As peças viraram seus melhores amigos. Ele melhorou na escola e sonha em ser campeão de xadrez.', quote: '"Cada peça tem seu valor, assim como cada pessoa."' },
  { name: 'Aisha & Yuki', age: 11, location: 'Amizade internacional', emoji: '👧🏿🤝👧🏻', story: 'Aisha mora na Nigéria e Yuki no Japão. Elas se conheceram em um torneio online de xadrez e se tornaram grandes amigas, mesmo sem falar o mesmo idioma.', quote: '"O tabuleiro é nossa linguagem comum."' },
]

const values = [
  { icon: Globe, title: 'Universal', desc: 'O xadrez não depende de idioma, país ou cultura.', color: '#6C63FF' },
  { icon: Heart, title: 'Inclusivo', desc: 'Não importa renda, gênero ou condição social.', color: '#FF6B6B' },
  { icon: Users, title: 'Conecta pessoas', desc: 'Aproxima pessoas de diferentes culturas e origens.', color: '#4ECDC4' },
  { icon: BookOpen, title: 'Transforma vidas', desc: 'Gera impacto positivo real na educação e autoestima.', color: '#51CF66' },
]

export default function Impact() {
  return (
    <div>
      <section className="bg-gradient-to-br from-pink-500 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center anim-fade-up">
          <Heart size={48} className="mx-auto mb-4" />
          <h1 className="text-3xl md:text-5xl font-black mb-4">Chess Changes Lives</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">O xadrez é muito mais que um jogo. É uma ferramenta de transformação social.</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon
            return (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-md text-center anim-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: v.color + '20' }}>
                  <Icon size={28} style={{ color: v.color }} />
                </div>
                <h3 className="font-bold mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500">{v.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-16">
        <h2 className="text-3xl font-black text-center mb-10">Histórias que <span className="gradient-text">Inspiram</span></h2>
        <div className="space-y-8">
          {stories.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg anim-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="text-6xl text-center md:text-left">{s.emoji}</div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{s.name}, {s.age} anos</h3>
                  <p className="text-sm text-gray-400 mb-3">📍 {s.location}</p>
                  <p className="text-gray-600 mb-4">{s.story}</p>
                  <blockquote className="border-l-4 border-[var(--color-primary)] pl-4 italic text-[var(--color-primary)] font-semibold">{s.quote}</blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-purple-50 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center anim-fade-up">
          <p className="text-lg text-gray-600 mb-4">Este projeto foi inspirado por um projeto social real de ensino de xadrez para meninas de um orfanato no Rio de Janeiro.</p>
          <p className="text-2xl font-black text-[var(--color-primary)]">Cada criança merece a chance de aprender e sonhar. ♟️</p>
        </div>
      </section>
    </div>
  )
}
