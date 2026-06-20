import { Clock, BookOpen, TrendingUp, Award, Shield } from 'lucide-react'
import { useGame } from '../context/GameContext'
import { lessons } from '../data/lessons'

export default function ParentDashboard() {
  const { state } = useGame()
  const completionPct = Math.round((state.completedLessons.length / lessons.length) * 100)

  const weeklyData = [
    { day: 'Seg', minutes: 15 }, { day: 'Ter', minutes: 20 }, { day: 'Qua', minutes: 10 },
    { day: 'Qui', minutes: 25 }, { day: 'Sex', minutes: 30 }, { day: 'Sáb', minutes: 45 }, { day: 'Dom', minutes: 35 },
  ]
  const maxMin = Math.max(...weeklyData.map(d => d.minutes))

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 anim-fade-up">
      <div className="flex items-center gap-3 mb-8">
        <Shield size={32} className="text-[var(--color-primary)]" />
        <div>
          <h1 className="text-3xl font-black">Dashboard dos Pais</h1>
          <p className="text-gray-500">Acompanhe o progresso do seu filho</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Clock, label: 'Tempo Total', value: `${state.totalPlayTime}min`, bg: 'bg-blue-50', color: 'text-blue-500' },
          { icon: BookOpen, label: 'Lições', value: `${state.completedLessons.length}/${lessons.length}`, bg: 'bg-green-50', color: 'text-green-500' },
          { icon: TrendingUp, label: 'Nível', value: state.level, bg: 'bg-purple-50', color: 'text-purple-500' },
          { icon: Award, label: 'Medalhas', value: state.medals.length, bg: 'bg-yellow-50', color: 'text-yellow-500' },
        ].map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} className={`${s.bg} rounded-2xl p-5 text-center`}>
              <Icon size={24} className={`mx-auto mb-2 ${s.color}`} />
              <div className="text-2xl font-black">{s.value}</div>
              <div className="text-xs text-gray-500 font-semibold">{s.label}</div>
            </div>
          )
        })}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
        <h2 className="text-lg font-bold mb-4">Atividade Semanal</h2>
        <div className="flex items-end gap-3 h-40">
          {weeklyData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-bold text-gray-500">{d.minutes}m</span>
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-purple-600 to-purple-400 min-h-[4px] transition-all duration-500"
                style={{ height: `${(d.minutes / maxMin) * 100}%` }}
              />
              <span className="text-xs text-gray-500 font-semibold">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-lg font-bold mb-4">Progresso Geral</h2>
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeDasharray={`${completionPct}, 100`} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-black">{completionPct}%</span>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500">das lições concluídas</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-lg font-bold mb-4">Habilidades</h2>
          <div className="space-y-3">
            {[
              { name: 'Pensamento Crítico', pct: Math.min(completionPct + 10, 100) },
              { name: 'Resolução de Problemas', pct: Math.min(completionPct + 5, 100) },
              { name: 'Concentração', pct: completionPct },
              { name: 'Estratégia', pct: Math.max(completionPct - 10, 0) },
            ].map((skill, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold">{skill.name}</span>
                  <span className="text-gray-500">{skill.pct}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-[var(--color-primary)] transition-all duration-700" style={{ width: `${skill.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
