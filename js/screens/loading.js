/** Duração do processamento simulado, em milissegundos. */
const DEFAULT_DURATION = 1800

/**
 * Frame 6 — "Calculando...".
 *
 * A barra é preenchida da esquerda para a direita ao longo de `duration` e,
 * ao chegar em 100%, dispara `onDone` para seguir para a etapa seguinte.
 * A largura é escrita direto no DOM: evita redesenhar a tela inteira centenas
 * de vezes e mantém o preenchimento visível mesmo sob `prefers-reduced-motion`,
 * já que aqui o movimento é a própria informação, não enfeite.
 *
 * @param {() => void} [onDone]
 * @param {number} [duration]
 */
function Loading(onDone, duration = DEFAULT_DURATION) {
  const fill = el('div', { className: 'loading__fill' })

  const node = el(
    'section',
    { className: 'loading', 'aria-labelledby': 'loading-title' },

    el('img', {
      className: 'loading__bg',
      src: 'assets/screens/fundo-interno.jpg',
      alt: '',
      'aria-hidden': 'true',
    }),

    el('h2', { className: 'loading__title', id: 'loading-title' }, 'Calculando...'),

    el('img', {
      className: 'loading__track',
      src: 'assets/screens/barra-trilha.png',
      alt: '',
      'aria-hidden': 'true',
    }),

    el(
      'div',
      {
        className: 'loading__bar',
        role: 'progressbar',
        'aria-label': 'Calculando o resultado da autoavaliação',
      },
      fill,
    ),
  )

  const start = performance.now()
  let frame = 0

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1)
    fill.style.width = `${progress * 100}%`

    if (progress < 1) frame = requestAnimationFrame(tick)
    else onDone?.()
  }

  frame = requestAnimationFrame(tick)

  /* O palco chama isto ao trocar de etapa. Sem o cancelamento, sair da tela
     antes do fim (ou recomeçar o quiz) deixaria um laço escrevendo em um nó
     já descartado, e o `onDone` ainda dispararia o avanço de uma etapa que
     não está mais na tela. */
  node.destroy = () => cancelAnimationFrame(frame)

  return node
}
