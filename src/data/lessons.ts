export interface LessonStep {
  title: string
  content: string
  fen?: string
  highlightSquares?: string[]
}

export interface Lesson {
  id: string
  level: number
  title: string
  description: string
  icon: string
  steps: LessonStep[]
  xpReward: number
  coinReward: number
}

export const lessons: Lesson[] = [
  {
    id: 'pieces-king',
    level: 1,
    title: 'O Rei',
    description: 'Conheça o Rei, a peça mais importante do xadrez!',
    icon: '♚',
    xpReward: 20,
    coinReward: 10,
    steps: [
      { title: 'Quem é o Rei?', content: 'O Rei é a peça mais importante do jogo! Se o seu Rei for capturado, você perde. Ele usa uma coroa e é muito especial.', fen: '8/8/8/8/4K3/8/8/8 w - - 0 1', highlightSquares: ['e4'] },
      { title: 'Como o Rei se move?', content: 'O Rei pode andar uma casa em qualquer direção: para frente, para trás, para os lados e nas diagonais.', fen: '8/8/8/3.1.3/3.K.3/3.1.3/8/8 w - - 0 1', highlightSquares: ['d5','e5','f5','d4','f4','d3','e3','f3'] },
      { title: 'Proteja seu Rei!', content: 'Sempre mantenha seu Rei seguro. Ele é como o presidente do seu exército de xadrez!' },
    ],
  },
  {
    id: 'pieces-queen',
    level: 1,
    title: 'A Rainha',
    description: 'A peça mais poderosa do tabuleiro!',
    icon: '♛',
    xpReward: 20,
    coinReward: 10,
    steps: [
      { title: 'A Poderosa Rainha', content: 'A Rainha é a peça mais poderosa! Ela pode se mover em qualquer direção e quantas casas quiser.', fen: '8/8/8/8/4Q3/8/8/8 w - - 0 1', highlightSquares: ['e4'] },
      { title: 'Movimentos da Rainha', content: 'A Rainha combina os movimentos da Torre e do Bispo. Ela anda em linhas retas e diagonais!', fen: '4Q3/4.3/4.3/4.3/QQQQQQQQ/4.3/4.3/4Q3 w - - 0 1' },
      { title: 'Cuide da sua Rainha', content: 'A Rainha vale 9 pontos. Não a perca facilmente! Use-a com inteligência.' },
    ],
  },
  {
    id: 'pieces-rook',
    level: 1,
    title: 'A Torre',
    description: 'A torre que domina linhas e colunas!',
    icon: '♜',
    xpReward: 20,
    coinReward: 10,
    steps: [
      { title: 'A Torre Forte', content: 'A Torre parece um castelo! Ela é muito forte e vale 5 pontos.', fen: '8/8/8/8/4R3/8/8/8 w - - 0 1', highlightSquares: ['e4'] },
      { title: 'Movimentos da Torre', content: 'A Torre se move em linhas retas: para frente, para trás, para esquerda e para direita. Quantas casas quiser!', highlightSquares: ['e1','e2','e3','e5','e6','e7','e8','a4','b4','c4','d4','f4','g4','h4'] },
      { title: 'Dica!', content: 'Duas Torres juntas são muito poderosas. Elas controlam linhas inteiras!' },
    ],
  },
  {
    id: 'pieces-bishop',
    level: 1,
    title: 'O Bispo',
    description: 'O mestre das diagonais!',
    icon: '♝',
    xpReward: 20,
    coinReward: 10,
    steps: [
      { title: 'O Bispo Diagonal', content: 'O Bispo se move apenas nas diagonais. Ele vale 3 pontos.', fen: '8/8/8/8/4B3/8/8/8 w - - 0 1', highlightSquares: ['e4'] },
      { title: 'Casas do Bispo', content: 'Cada Bispo fica sempre na mesma cor de casa. Um fica nas casas claras, outro nas escuras. Eles são parceiros!' },
      { title: 'Bispos são rápidos!', content: 'O Bispo pode cruzar o tabuleiro inteiro em um só movimento, usando as diagonais!' },
    ],
  },
  {
    id: 'pieces-knight',
    level: 1,
    title: 'O Cavalo',
    description: 'A peça mais divertida e única!',
    icon: '♞',
    xpReward: 20,
    coinReward: 10,
    steps: [
      { title: 'O Cavalo Saltador', content: 'O Cavalo é a única peça que pode pular sobre outras! Ele se move em forma de "L".', fen: '8/8/8/8/4N3/8/8/8 w - - 0 1', highlightSquares: ['e4'] },
      { title: 'Movimento em L', content: 'O Cavalo anda 2 casas em uma direção e 1 casa para o lado. Parece a letra L!', highlightSquares: ['d6','f6','c5','g5','c3','g3','d2','f2'] },
      { title: 'Cavalo Surpresa!', content: 'O Cavalo vale 3 pontos. Por poder pular peças, ele é ótimo para fazer ataques surpresa!' },
    ],
  },
  {
    id: 'pieces-pawn',
    level: 1,
    title: 'O Peão',
    description: 'Pequeno mas com grande potencial!',
    icon: '♟',
    xpReward: 20,
    coinReward: 10,
    steps: [
      { title: 'O Corajoso Peão', content: 'O Peão é a peça mais numerosa. Cada jogador começa com 8 peões! Ele vale 1 ponto.', fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' },
      { title: 'Como o Peão anda?', content: 'O Peão anda para frente uma casa. No primeiro movimento, ele pode andar duas casas! Ele captura na diagonal.' },
      { title: 'Promoção!', content: 'Se um Peão chegar ao outro lado do tabuleiro, ele pode virar qualquer outra peça! Geralmente vira uma Rainha. Incrível, né?' },
    ],
  },
  {
    id: 'movements-basic',
    level: 2,
    title: 'Movimentos Básicos',
    description: 'Aprenda como cada peça se movimenta!',
    icon: '🎯',
    xpReward: 30,
    coinReward: 15,
    steps: [
      { title: 'Regra de Ouro', content: 'No xadrez, cada peça tem seu próprio jeito de se mover. Vamos relembrar todos!' },
      { title: 'Peças de Linha Reta', content: 'Torre: linhas retas (horizontal e vertical). Bispo: diagonais. Rainha: ambos!' },
      { title: 'Peças Especiais', content: 'Rei: uma casa em qualquer direção. Cavalo: em "L" e pula peças. Peão: para frente, captura na diagonal.' },
    ],
  },
  {
    id: 'movements-castling',
    level: 2,
    title: 'Roque',
    description: 'O movimento especial do Rei e da Torre!',
    icon: '🏰',
    xpReward: 30,
    coinReward: 15,
    steps: [
      { title: 'O que é Roque?', content: 'Roque é um movimento especial onde o Rei e a Torre se movem juntos! É o único movimento onde duas peças se movem ao mesmo tempo.' },
      { title: 'Como fazer?', content: 'O Rei anda duas casas em direção à Torre, e a Torre pula para o outro lado do Rei. Existem dois tipos: roque curto e roque longo.', fen: 'r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1' },
      { title: 'Quando posso fazer?', content: 'Só pode fazer roque se: o Rei e a Torre não se moveram, não há peças entre eles, o Rei não está em xeque, e o Rei não passa por casa atacada.' },
    ],
  },
  {
    id: 'captures-intro',
    level: 3,
    title: 'Capturas',
    description: 'Aprenda a capturar peças do oponente!',
    icon: '⚔️',
    xpReward: 35,
    coinReward: 20,
    steps: [
      { title: 'Como Capturar?', content: 'Para capturar uma peça do oponente, mova sua peça para a casa onde a peça inimiga está. A peça inimiga sai do tabuleiro!' },
      { title: 'Valores das Peças', content: 'Peão: 1 ponto. Cavalo: 3 pontos. Bispo: 3 pontos. Torre: 5 pontos. Rainha: 9 pontos. Rei: não tem valor, pois não pode ser capturado!' },
      { title: 'Trocas Inteligentes', content: 'Trocar uma peça de menor valor por uma de maior valor é bom! Isso se chama "ganhar material".' },
    ],
  },
  {
    id: 'check-intro',
    level: 4,
    title: 'Xeque!',
    description: 'Quando o Rei está em perigo!',
    icon: '⚠️',
    xpReward: 40,
    coinReward: 25,
    steps: [
      { title: 'O que é Xeque?', content: 'Xeque é quando uma peça está atacando o Rei inimigo. O jogador PRECISA sair do xeque!' },
      { title: 'Como sair do Xeque?', content: 'Existem 3 formas: mover o Rei para uma casa segura, bloquear o ataque com outra peça, ou capturar a peça que está dando xeque.' },
      { title: 'Cuidado!', content: 'Você nunca pode fazer um movimento que coloque seu próprio Rei em xeque. Isso é proibido!' },
    ],
  },
  {
    id: 'checkmate-intro',
    level: 5,
    title: 'Xeque-Mate!',
    description: 'O objetivo final do xadrez!',
    icon: '🏆',
    xpReward: 50,
    coinReward: 30,
    steps: [
      { title: 'O que é Xeque-Mate?', content: 'Xeque-Mate é quando o Rei está em xeque e NÃO tem como escapar. O jogo acaba e quem deu o mate vence!' },
      { title: 'Mate do Pastor', content: 'Um dos mates mais rápidos! Acontece em apenas 4 movimentos. Mas cuidado, jogadores experientes sabem se defender.', fen: 'r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 1' },
      { title: 'Pratique!', content: 'O xeque-mate é a melhor parte do xadrez. Pratique bastante para aprender diferentes padrões de mate!' },
    ],
  },
  {
    id: 'tactics-fork',
    level: 6,
    title: 'Garfo (Fork)',
    description: 'Ataque duas peças ao mesmo tempo!',
    icon: '🍴',
    xpReward: 50,
    coinReward: 30,
    steps: [
      { title: 'O que é um Garfo?', content: 'Um Garfo acontece quando uma peça ataca duas ou mais peças inimigas ao mesmo tempo! O oponente só pode salvar uma.' },
      { title: 'Garfo de Cavalo', content: 'O Cavalo é o mestre dos garfos! Por se mover em "L", ele pode atacar peças em posições inesperadas.', fen: '4k3/8/8/8/3N4/8/8/4K3 w - - 0 1' },
      { title: 'Outros Garfos', content: 'Peões, Bispos, Torres e Rainhas também podem fazer garfos. Fique atento a essas oportunidades!' },
    ],
  },
  {
    id: 'tactics-pin',
    level: 6,
    title: 'Cravada (Pin)',
    description: 'Prenda as peças do oponente!',
    icon: '📌',
    xpReward: 50,
    coinReward: 30,
    steps: [
      { title: 'O que é uma Cravada?', content: 'Uma Cravada acontece quando uma peça não pode se mover porque revelaria um ataque a uma peça mais valiosa atrás dela.' },
      { title: 'Cravada Absoluta', content: 'Se a peça atrás é o Rei, a peça cravada literalmente NÃO PODE se mover. Isso é uma cravada absoluta!' },
      { title: 'Use as Cravadas!', content: 'Bispos e Torres são ótimos para fazer cravadas. Procure por peças inimigas alinhadas!' },
    ],
  },
  {
    id: 'strategy-center',
    level: 7,
    title: 'Controle o Centro',
    description: 'O centro do tabuleiro é a chave!',
    icon: '🎯',
    xpReward: 50,
    coinReward: 30,
    steps: [
      { title: 'Por que o Centro?', content: 'As casas centrais (d4, d5, e4, e5) são as mais importantes. Peças no centro controlam mais casas!', fen: 'rnbqkbnr/pppppppp/8/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq - 0 1', highlightSquares: ['d4','d5','e4','e5'] },
      { title: 'Peões no Centro', content: 'Colocar peões no centro é uma boa estratégia de abertura. Eles controlam casas importantes e abrem caminho para suas peças.' },
      { title: 'Desenvolva as Peças', content: 'Tire suas peças das posições iniciais! Cavalos e Bispos devem sair cedo para ajudar a controlar o centro.' },
    ],
  },
  {
    id: 'first-game',
    level: 8,
    title: 'Sua Primeira Partida',
    description: 'Está na hora de jogar!',
    icon: '🎮',
    xpReward: 100,
    coinReward: 50,
    steps: [
      { title: 'Você está pronto!', content: 'Parabéns! Você aprendeu o suficiente para jogar sua primeira partida de xadrez!' },
      { title: 'Dicas para começar', content: '1. Controle o centro. 2. Desenvolva as peças. 3. Proteja o Rei com o Roque. 4. Pense antes de mover!' },
      { title: 'Divirta-se!', content: 'O mais importante é se divertir! Não tenha medo de errar. Cada partida é uma chance de aprender algo novo. Vá para a página "Jogar" e comece!' },
    ],
  },
]

export const levelNames: Record<number, string> = {
  1: 'Conhecendo as Peças',
  2: 'Movimentos',
  3: 'Capturas',
  4: 'Xeque',
  5: 'Xeque-Mate',
  6: 'Táticas Básicas',
  7: 'Estratégia',
  8: 'Primeiras Partidas',
}
