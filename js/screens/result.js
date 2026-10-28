/** Topo de cada filete sob as duas primeiras linhas do score. */
const RULE_TOPS = [404, 493]

/**
 * Uma linha é um texto simples ou uma lista de trechos.
 * @param {ResultLine} line
 * @returns {ResultSegment[]}
 */
function toParts(line) {
  return Array.isArray(line) ? line : [line]
}

/**
 * Repete as quebras de linha da arte dentro de um bloco de medida fixa.
 * Um trecho `{ sub }` vira corpo menor rebaixado, como o "1c" de HbA1c.
 *
 * @param {ResultLine[]} lines
 */
function withBreaks(lines) {
  return lines.map((line, i) => [
    i > 0 && el('br'),
    toParts(line).map((part) =>
      typeof part === 'string'
        ? part
        : el('sub', { className: 'result__subscript' }, part.sub),
    ),
  ])
}

/**
 * Frame 7 — tela de resultado por faixa de risco.
 *
 * @param {RiskResult} result
 * @param {() => void} onConclude
 */
function Result(result, onConclude) {
  const { score, ruleWidths, headline, body, reference, layout = {} } = result
  const { bodyTop, bodyWidth } = layout

  return el(
    'section',
    { className: 'result', 'aria-labelledby': `${result.id}-titulo` },

    el('img', {
      className: 'result__bg',
      src: 'assets/screens/fundo-interno.jpg',
      alt: '',
      'aria-hidden': 'true',
    }),

    /* Cada linha do score é um parágrafo porque o design separa as três
       com uma margem, e não apenas com a entrelinha. */
    el(
      'div',
      { className: 'result__score' },
      score.map((line) => el('p', null, line)),
    ),

    ruleWidths.map((width, i) =>
      el('div', {
        className: 'result__rule',
        style: { top: `${RULE_TOPS[i]}px`, width: `${width}px` },
      }),
    ),

    el(
      'h2',
      { className: 'result__headline', id: `${result.id}-titulo` },
      withBreaks(headline),
    ),

    el(
      'p',
      {
        className: 'result__body',
        style: { top: px(bodyTop), width: px(bodyWidth) },
      },
      withBreaks(body),
      el('sup', { className: 'result__reference' }, reference),
    ),

    el(
      'button',
      { className: 'result__cta', type: 'button', onclick: onConclude },
      el('img', {
        src: 'assets/screens/botao-concluir.png',
        alt: '',
        'aria-hidden': 'true',
      }),
      el('span', { className: 'sr-only' }, 'Concluir'),
    ),
  )
}
