/**
 * Conteúdo das perguntas do quiz.
 *
 * `lines` reproduz a quebra de linha exata da arte do Figma — o bloco é
 * posicionado em medidas fixas, então as quebras fazem parte do layout.
 * `layout` ajusta o bloco de texto quando o frame varia: `eyebrowTop` e
 * `questionTop` deslocam na vertical e `left` na horizontal (sem `left`
 * vale o padrão do CSS).
 *
 * A pontuação segue o briefing (FINDRISC adaptado): A = 0, B = 1 e C = 2 em
 * todas as perguntas, totalizando de 0 a 8 pontos. As faixas que traduzem esse
 * total em uma tela de resultado ficam em `results.js`.
 *
 * Nos rótulos das alternativas, `\n` marca uma quebra obrigatória do design
 * (a pílula renderiza com `white-space: pre-line`); sem `\n` o texto quebra
 * naturalmente dentro da largura da pílula, como no Figma.
 */

/**
 * As três pílulas da tela, na ordem em que aparecem.
 * @typedef {'A' | 'B' | 'C'} OptionLetter
 */

/**
 * @typedef {object} QuestionOption
 * @property {OptionLetter} letter
 * @property {string} label
 * @property {number} points Peso da alternativa no total de risco: A = 0, B = 1, C = 2.
 */

/**
 * Medidas em pixels do frame do Figma (1620x2160).
 * @typedef {object} QuestionLayout
 * @property {number} [eyebrowTop]
 * @property {number} [questionTop]
 * @property {number} [left]
 */

/**
 * @typedef {object} QuizQuestion
 * @property {string} id
 * @property {string} eyebrow
 * @property {string[]} lines
 * @property {QuestionLayout} [layout]
 * @property {QuestionOption[]} options
 */

/** @type {QuizQuestion[]} */
const QUESTIONS = [
  {
    id: 'movimento',
    eyebrow: '1: Movimento & Rotina Ativa',
    lines: [
      'Você pratica pelo menos 30 minutos',
      'diários de atividade física (caminhada,',
      'academia, escadas, esportes) no trabalho',
      'ou no lazer?',
    ],
    layout: { eyebrowTop: 363, questionTop: 478 },
    options: [
      { letter: 'A', label: 'Sim, na maior parte dos dias.', points: 0 },
      { letter: 'B', label: 'Às vezes (1 a 2 vezes por semana).', points: 1 },
      { letter: 'C', label: 'Raramente ou quase nunca.', points: 2 },
    ],
  },
  {
    id: 'nutricao',
    eyebrow: '2: Nutrição & Combustível Diário',
    lines: [
      'Com que frequência você consome',
      'vegetais, legumes, verduras ou frutas',
      'frescas na sua rotina alimentar?',
    ],
    layout: { eyebrowTop: 415, questionTop: 530 },
    options: [
      { letter: 'A', label: 'Diariamente, em quase todas as refeições.', points: 0 },
      { letter: 'B', label: 'Alguns dias da semana.', points: 1 },
      {
        letter: 'C',
        label:
          'Raramente ou quase nunca / Predomínio de ultraprocessados e fast-food.',
        points: 2,
      },
    ],
  },
  {
    id: 'historico',
    eyebrow: '3: Histórico Familiar',
    lines: [
      'Alguém na sua família direta (pais, irmãos,',
      'avós ou tios) já recebeu o diagnóstico de',
      'diabetes tipo 2?',
    ],
    layout: { eyebrowTop: 415, questionTop: 530 },
    options: [
      { letter: 'A', label: 'Não que eu saiba / Sem histórico conhecido.', points: 0 },
      {
        letter: 'B',
        label: 'Sim, parentes de segundo grau\n(avós, tios ou primos).',
        points: 1,
      },
      {
        letter: 'C',
        label: 'Sim, parentes de primeiro grau\n(mãe, pai ou irmãos).',
        points: 2,
      },
    ],
  },
  {
    id: 'sinais',
    eyebrow: '4: Escuta dos Sinais Silenciosos',
    lines: [
      'Nas últimas semanas, você tem percebido',
      'algum destes sinais com frequência: sede',
      'excessiva, cansaço fora do habitual,',
      'necessidade frequente de urinar ou visão',
      'embaçada?',
    ],
    layout: { eyebrowTop: 346, questionTop: 442, left: 214 },
    options: [
      { letter: 'A', label: 'Não notei nenhum desses sinais.', points: 0 },
      {
        letter: 'B',
        label:
          'Às vezes sinto um ou outro, mas associo\nao estresse do dia a dia.',
        points: 1,
      },
      {
        letter: 'C',
        label: 'Sim, tenho sentido esses sinais com\ncerta regularidade.',
        points: 2,
      },
    ],
  },
]
