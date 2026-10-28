/**
 * Conteúdo das telas de resultado do quiz.
 *
 * `score`, `headline` e `body` reproduzem as quebras de linha exatas da arte —
 * os blocos são posicionados em medidas fixas, então as quebras fazem parte do
 * layout. `ruleWidths` são os filetes sob as duas primeiras linhas do score.
 * `layout` ajusta o que varia entre as faixas de risco.
 *
 * Uma linha do `body` pode ser uma lista de trechos em vez de um texto, onde
 * `{ sub }` marca o corpo menor rebaixado — o "1c" de HbA1c, por exemplo.
 */

/**
 * Trecho de uma linha: texto puro ou corpo menor rebaixado.
 * @typedef {string | { sub: string }} ResultSegment
 */

/** @typedef {string | ResultSegment[]} ResultLine */

/**
 * Medidas em pixels do frame do Figma (1620x2160).
 * @typedef {object} ResultLayout
 * @property {number} [bodyTop]
 * @property {number} [bodyWidth]
 */

/**
 * @typedef {object} RiskResult
 * @property {string} id
 * @property {[number, number]} range Total de pontos que cai nesta faixa,
 *   inclusivo nas duas pontas. As três faixas cobrem 0 a 8 sem buraco nem
 *   sobreposição.
 * @property {string[]} score
 * @property {[number, number]} ruleWidths Larguras dos dois filetes, de cima
 *   para baixo.
 * @property {string[]} headline
 * @property {ResultLine[]} body
 * @property {string} reference Chamada das referências listadas na tela final.
 * @property {ResultLayout} [layout]
 */

/** @type {RiskResult[]} */
const RESULTS = [
  {
    id: 'baixo',
    range: [0, 2],
    score: ['Pontuação 0 a 2 pontos', 'Risco baixo', 'Hábitos protetores'],
    ruleWidths: [667, 568],
    headline: [
      'Parabéns! Seus hábitos',
      'apontam para um caminho',
      'de proteção.',
    ],
    body: [
      'Seu estilo de vida e histórico sugerem um',
      'baixo risco para o desenvolvimento de',
      'diabetes no momento. Lembre-se de',
      'manter seus exames anuais de rotina em',
      'dia e continue atento aos sinais sutis que o',
      'seu corpo envia diariamente. A prevenção',
      'é construída nos pequenos hábitos de',
      'cada dia!',
    ],
    reference: '1-3',
  },
  {
    id: 'moderado',
    range: [3, 5],
    score: ['Pontuação 3 a 5 pontos', 'Risco moderado', 'Ponto de atenção'],
    ruleWidths: [667, 509],
    headline: [
      'Atenção aos sinais:',
      'pequenos ajustes fazem',
      'uma grande diferença.',
    ],
    body: [
      'Você apresenta alguns fatores de risco',
      'relacionados à rotina ou histórico familiar.',
      'Pequenas mudanças de hábitos, como',
      'incluir 15 minutos a mais de caminhada no',
      'dia, priorizar alimentos frescos e fazer',
      'pausas ativas no trabalho, ajudam a proteger',
      'o seu metabolismo. Que tal aproveitar para',
      'agendar um check-up preventivo com',
      'avaliação de glicemia?',
    ],
    reference: '1-3',
    /* Caixa do corpo é mais larga neste frame; sem isso a linha mais
       comprida não caberia e quebraria fora do ponto do design. */
    layout: { bodyWidth: 1115 },
  },
  {
    id: 'elevado',
    range: [6, 8],
    score: [
      'Pontuação 6 a 8 pontos',
      'Risco elevado',
      'Convite ao cuidado médico',
    ],
    ruleWidths: [667, 779],
    headline: ['O seu corpo merece uma', 'escuta cuidadosa agora.'],
    body: [
      'Suas respostas indicam múltiplos fatores de',
      'risco ou a presença de sinais que merecem',
      'atenção clínica. O diabetes tipo 2 pode',
      'evoluir de forma silenciosa por muitos anos,',
      'mas o diagnóstico precoce permite',
      'intervenções eficazes que protegem o seu',
      'coração, sua visão e seus rins.',
      'Recomendamos agendar uma consulta com',
      'um profissional de saúde para avaliação',
      'clínica e exames específicos (glicemia de',
      ['jejum e hemoglobina glicada (HbA', { sub: '1c' }, ').'],
    ],
    reference: '1-3',
    /* O corpo é mais longo nesta faixa e sobe no frame. */
    layout: { bodyTop: 973, bodyWidth: 1115 },
  },
]

/**
 * Tela de resultado correspondente ao total de pontos.
 *
 * Os intervalos cobrem 0 a 8, que é toda a amplitude possível de 4 perguntas
 * valendo até 2 pontos cada. Um total fora disso só aconteceria por engano de
 * conteúdo, então é melhor falhar alto do que exibir a faixa errada em uma
 * peça de saúde.
 *
 * @param {number} score
 * @returns {RiskResult}
 */
function resultForScore(score) {
  const result = RESULTS.find(
    ({ range }) => score >= range[0] && score <= range[1],
  )

  if (!result) {
    throw new Error(`Pontuação ${score} não corresponde a nenhuma faixa de risco`)
  }

  return result
}
