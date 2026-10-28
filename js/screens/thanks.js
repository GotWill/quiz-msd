/**
 * Destaque de cada trecho da bibliografia, como na arte.
 * @param {ReferencePart} part
 */
function renderReference(part) {
  if (part.bold) return el('strong', null, part.text)
  if (part.italic) return el('cite', null, part.text)
  return part.text
}

/**
 * Frame 10 — agradecimento, recomeço do quiz e bibliografia.
 * @param {() => void} onRestart
 */
function Thanks(onRestart) {
  return el(
    'section',
    { className: 'thanks', 'aria-labelledby': 'thanks-titulo' },

    el('img', {
      className: 'thanks__bg',
      src: 'assets/screens/fundo-interno.jpg',
      alt: '',
      'aria-hidden': 'true',
    }),

    el(
      'h2',
      { className: 'thanks__title', id: 'thanks-titulo' },
      'Obrigado por',
      el('br'),
      'participar',
    ),

    el(
      'button',
      { className: 'thanks__cta', type: 'button', onclick: onRestart },
      el('img', {
        src: 'assets/screens/botao-refazer.png',
        alt: '',
        'aria-hidden': 'true',
      }),
      el('span', { className: 'sr-only' }, 'Recomeçar avaliação'),
    ),

    el(
      'p',
      { className: 'thanks__references' },
      REFERENCES.map(renderReference),
    ),
  )
}
