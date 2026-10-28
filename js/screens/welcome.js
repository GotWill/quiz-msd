/** Frame 1 — "tela_inicial" / BOAS-VINDAS. */
function Welcome(onStart) {
  return el(
    'section',
    { className: 'welcome', 'aria-labelledby': 'welcome-title' },

    el('img', {
      className: 'welcome__bg',
      src: 'assets/screens/boas-vindas-bg.jpg',
      alt: '',
      'aria-hidden': 'true',
    }),

    el(
      'h1',
      { className: 'welcome__title', id: 'welcome-title' },
      'BOAS-VINDAS',
    ),

    el(
      'div',
      { className: 'welcome__lead' },
      el('p', null, 'Nem todo alerta faz barulho.'),
      el(
        'p',
        { className: 'welcome__lead--strong' },
        'Vamos ouvir os sinais do seu corpo?',
      ),
      el(
        'p',
        null,
        'Responda a 4 perguntas rápidas',
        el('br'),
        'sobre a sua rotina e retire seu',
        el('br'),
        'kit de autocuidado!',
      ),
    ),

    el(
      'button',
      { className: 'welcome__cta', type: 'button', onclick: onStart },
      el('img', {
        src: 'assets/screens/boas-vindas-botao.png',
        alt: '',
        'aria-hidden': 'true',
      }),
      el('span', { className: 'sr-only' }, 'Iniciar autoavaliação'),
    ),

    /* A mão fica acima do botão na arte original, por isso não captura cliques. */
    el('img', {
      className: 'welcome__hand',
      src: 'assets/screens/mao.png',
      alt: '',
      'aria-hidden': 'true',
    }),
  )
}
