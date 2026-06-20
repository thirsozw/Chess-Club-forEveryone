export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export const quizzes: Record<string, QuizQuestion[]> = {
  'pieces-king': [
    { question: 'Quantas casas o Rei pode andar por vez?', options: ['Uma casa', 'Duas casas', 'Quantas quiser', 'Três casas'], correctIndex: 0, explanation: 'O Rei se move apenas uma casa por vez, em qualquer direção!' },
    { question: 'O que acontece se seu Rei for capturado?', options: ['Nada', 'Você ganha', 'Você perde', 'O jogo recomeça'], correctIndex: 2, explanation: 'Se o Rei for capturado (xeque-mate), o jogo acaba e você perde!' },
    { question: 'Em que direções o Rei pode se mover?', options: ['Só para frente', 'Só nas diagonais', 'Em qualquer direção', 'Só para os lados'], correctIndex: 2, explanation: 'O Rei pode se mover em qualquer direção: frente, trás, lados e diagonais!' },
  ],
  'pieces-queen': [
    { question: 'A Rainha combina os movimentos de quais peças?', options: ['Rei e Cavalo', 'Torre e Bispo', 'Cavalo e Bispo', 'Torre e Rei'], correctIndex: 1, explanation: 'A Rainha combina os movimentos da Torre (retas) e do Bispo (diagonais)!' },
    { question: 'Quantos pontos vale a Rainha?', options: ['5 pontos', '7 pontos', '9 pontos', '10 pontos'], correctIndex: 2, explanation: 'A Rainha vale 9 pontos, sendo a peça mais valiosa!' },
    { question: 'Quantas Rainhas cada jogador começa?', options: ['Uma', 'Duas', 'Três', 'Nenhuma'], correctIndex: 0, explanation: 'Cada jogador começa com apenas uma Rainha!' },
  ],
  'pieces-rook': [
    { question: 'Como a Torre se move?', options: ['Em diagonais', 'Em linhas retas', 'Em L', 'Uma casa por vez'], correctIndex: 1, explanation: 'A Torre se move em linhas retas: horizontal e vertical!' },
    { question: 'Quantos pontos vale a Torre?', options: ['3 pontos', '5 pontos', '7 pontos', '9 pontos'], correctIndex: 1, explanation: 'A Torre vale 5 pontos!' },
  ],
  'pieces-bishop': [
    { question: 'Como o Bispo se move?', options: ['Em linhas retas', 'Em diagonais', 'Em L', 'Uma casa'], correctIndex: 1, explanation: 'O Bispo se move apenas nas diagonais!' },
    { question: 'O Bispo muda de cor de casa?', options: ['Sim, sempre', 'Não, nunca', 'Às vezes', 'Só quando captura'], correctIndex: 1, explanation: 'O Bispo sempre fica na mesma cor de casa durante todo o jogo!' },
  ],
  'pieces-knight': [
    { question: 'Qual peça move em L?', options: ['Bispo', 'Torre', 'Cavalo', 'Rainha'], correctIndex: 2, explanation: 'O Cavalo é a única peça que se move em forma de L!' },
    { question: 'O Cavalo pode pular sobre outras peças?', options: ['Não', 'Sim', 'Só sobre peões', 'Só no primeiro movimento'], correctIndex: 1, explanation: 'O Cavalo é a ÚNICA peça que pode pular sobre outras peças!' },
    { question: 'Quantos pontos vale o Cavalo?', options: ['1 ponto', '3 pontos', '5 pontos', '9 pontos'], correctIndex: 1, explanation: 'O Cavalo vale 3 pontos!' },
  ],
  'pieces-pawn': [
    { question: 'O que acontece quando um Peão chega ao fim do tabuleiro?', options: ['Ele morre', 'Vira outra peça', 'Volta ao início', 'Nada'], correctIndex: 1, explanation: 'O Peão é promovido e pode virar qualquer outra peça (geralmente Rainha)!' },
    { question: 'Quantos peões cada jogador começa?', options: ['6', '7', '8', '10'], correctIndex: 2, explanation: 'Cada jogador começa com 8 peões!' },
    { question: 'Como o Peão captura?', options: ['Para frente', 'Na diagonal', 'Para trás', 'Em L'], correctIndex: 1, explanation: 'O Peão anda para frente mas captura na diagonal!' },
  ],
  'movements-basic': [
    { question: 'Qual peça vale mais pontos?', options: ['Torre', 'Bispo', 'Rainha', 'Cavalo'], correctIndex: 2, explanation: 'A Rainha vale 9 pontos, mais que qualquer outra peça!' },
    { question: 'Qual peça só anda em diagonais?', options: ['Torre', 'Rainha', 'Bispo', 'Rei'], correctIndex: 2, explanation: 'O Bispo é a única peça que se move exclusivamente nas diagonais!' },
  ],
  'check-intro': [
    { question: 'O que é Xeque?', options: ['Quando o Rei é capturado', 'Quando o Rei está em perigo', 'Um tipo de empate', 'Um movimento especial'], correctIndex: 1, explanation: 'Xeque é quando o Rei está sendo atacado por uma peça inimiga!' },
    { question: 'Quantas formas existem de sair do Xeque?', options: ['1', '2', '3', '4'], correctIndex: 2, explanation: 'Existem 3 formas: mover o Rei, bloquear o ataque, ou capturar a peça atacante!' },
  ],
  'checkmate-intro': [
    { question: 'O que é Xeque-Mate?', options: ['Xeque que não pode ser evitado', 'Um empate', 'Um tipo de captura', 'Quando o Rei foge'], correctIndex: 0, explanation: 'Xeque-Mate é quando o Rei está em xeque e não há como escapar. Fim de jogo!' },
  ],
  'tactics-fork': [
    { question: 'O que é um Garfo no xadrez?', options: ['Um empate', 'Atacar duas peças ao mesmo tempo', 'Um tipo de defesa', 'Mover duas peças'], correctIndex: 1, explanation: 'Um Garfo é quando uma peça ataca duas ou mais peças inimigas ao mesmo tempo!' },
    { question: 'Qual peça é a melhor para fazer garfos?', options: ['Torre', 'Bispo', 'Cavalo', 'Peão'], correctIndex: 2, explanation: 'O Cavalo é o mestre dos garfos por seu movimento único em L!' },
  ],
}
