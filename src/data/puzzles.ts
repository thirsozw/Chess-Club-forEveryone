export interface Puzzle {
  id: string
  title: string
  description: string
  fen: string
  solution: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  xpReward: number
}

export const puzzles: Puzzle[] = [
  { id: 'p1', title: 'Mate em 1', description: 'Encontre o xeque-mate em um movimento!', fen: '6k1/5ppp/8/8/8/8/5PPP/4R1K1 w - - 0 1', solution: ['e1e8'], difficulty: 'easy', xpReward: 10 },
  { id: 'p2', title: 'Garfo de Cavalo', description: 'Use o Cavalo para atacar duas peças!', fen: '4k3/8/8/8/8/5N2/8/4K3 w - - 0 1', solution: ['f3e5'], difficulty: 'easy', xpReward: 10 },
  { id: 'p3', title: 'Captura a Rainha!', description: 'Capture a Rainha inimiga!', fen: '4k3/8/3q4/8/8/8/5B2/4K3 w - - 0 1', solution: ['f2d4'], difficulty: 'easy', xpReward: 10 },
  { id: 'p4', title: 'Mate com Torre', description: 'Use a Torre para dar xeque-mate!', fen: '7k/8/7K/8/8/8/8/R7 w - - 0 1', solution: ['a1a8'], difficulty: 'medium', xpReward: 20 },
  { id: 'p5', title: 'Descuberta', description: 'Faça um ataque descoberto!', fen: '4k3/8/4R3/4B3/8/8/8/4K3 w - - 0 1', solution: ['e5c3'], difficulty: 'medium', xpReward: 20 },
  { id: 'p6', title: 'Mate da Escadinha', description: 'Use duas Torres para dar mate!', fen: '7k/8/8/8/8/8/8/R3RK2 w - - 0 1', solution: ['a1a8'], difficulty: 'medium', xpReward: 20 },
  { id: 'p7', title: 'Cravada Mortal', description: 'Use uma cravada para ganhar material!', fen: '2kr4/8/8/8/8/8/8/R3K2R w K - 0 1', solution: ['a1a8'], difficulty: 'hard', xpReward: 30 },
  { id: 'p8', title: 'Mate Sufocado', description: 'Dê um xeque-mate sufocado com o Cavalo!', fen: '6rk/6pp/8/6N1/8/8/8/4K3 w - - 0 1', solution: ['g5f7'], difficulty: 'hard', xpReward: 30 },
]

export const dailyMotivation = [
  '"Xadrez é a ginástica da mente." — Blaise Pascal',
  '"No xadrez, como na vida, o melhor movimento é sempre o que você faz." — Bobby Fischer',
  '"Todo mestre já foi um desastre." — Provérbio do xadrez',
  '"O xadrez ensina que devemos pensar antes de agir."',
  '"O peão é a alma do xadrez." — François-André Danican Philidor',
  '"A persistência é o caminho do êxito." — Charles Chaplin',
  '"Jogar xadrez é pensar, é imaginar, é criar."',
  '"Cada partida de xadrez é como uma nova vida."',
  '"Errar faz parte. Aprender com os erros é o que nos faz crescer!"',
  '"O xadrez é um mar onde um mosquito pode beber e um elefante pode se banhar."',
]

export const medals = [
  { id: 'first-lesson', name: 'Primeiro Passo', description: 'Complete sua primeira lição', icon: '🎯' },
  { id: 'five-lessons', name: 'Estudante Dedicado', description: 'Complete 5 lições', icon: '📚' },
  { id: 'all-pieces', name: 'Conhecedor', description: 'Aprenda todas as peças', icon: '♟️' },
  { id: 'first-quiz', name: 'Quiz Master Jr.', description: 'Complete seu primeiro quiz', icon: '✅' },
  { id: 'perfect-quiz', name: 'Perfeição!', description: 'Tire 100% em um quiz', icon: '💯' },
  { id: 'streak-3', name: 'Consistente', description: 'Mantenha um streak de 3 dias', icon: '🔥' },
  { id: 'streak-7', name: 'Imparável', description: 'Mantenha um streak de 7 dias', icon: '⚡' },
  { id: 'first-puzzle', name: 'Solucionador', description: 'Resolva seu primeiro quebra-cabeça', icon: '🧩' },
  { id: 'level-5', name: 'Avançando!', description: 'Alcance o nível 5', icon: '⭐' },
  { id: 'level-10', name: 'Mestre Iniciante', description: 'Alcance o nível 10', icon: '🏅' },
  { id: 'first-game', name: 'Primeiro Jogo', description: 'Jogue sua primeira partida', icon: '🎮' },
  { id: 'collector', name: 'Colecionador', description: 'Ganhe 100 moedas', icon: '💰' },
]
