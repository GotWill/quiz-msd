/** Arte da pílula de cada alternativa (a letra já vem embutida na imagem). */
const OPTION_ART = {
  A: 'assets/screens/opcao-a.png',
  B: 'assets/screens/opcao-b.png',
  C: 'assets/screens/opcao-c.png',
}

/** Topo de cada pílula no frame do Figma (1620x2160). */
const OPTION_TOPS = [761, 1118, 1474]

/**
 * Frame 2 — tela de pergunta com três alternativas.
 *
 * Escolher uma alternativa registra os pontos dela e segue para a etapa
 * seguinte.
 *
 * @param {QuizQuestion} question
 * @param {(points: number) => void} onAnswer Recebe os pontos da alternativa
 *   escolhida e avança o quiz.
 */
function Question(question, onAnswer) {
  const { eyebrow, lines, options, layout = {} } = question
  const { eyebrowTop = 363, questionTop = 478, left } = layout

  /*
   * Só a primeira escolha conta. Em tela sensível ao toque um toque duplo
   * dispara o handler duas vezes no mesmo tick, o que somaria duas respostas
   * e pularia a pergunta seguinte.
   */
  let answered = false

  const choose = (points) => {
    if (answered) return
    answered = true
    onAnswer(points)
  }

  return el(
    'section',
    { className: 'question', 'aria-labelledby': `${question.id}-enunciado` },

    el('img', {
      className: 'question__bg',
      src: 'assets/screens/fundo-interno.jpg',
      alt: '',
      'aria-hidden': 'true',
    }),

    el(
      'p',
      {
        className: 'question__eyebrow',
        style: { top: `${eyebrowTop}px`, left: px(left) },
      },
      eyebrow,
    ),

    el(
      'h2',
      {
        className: 'question__text',
        id: `${question.id}-enunciado`,
        style: { top: `${questionTop}px`, left: px(left) },
      },
      lines.map((line, i) => [i > 0 && el('br'), line]),
    ),

    el(
      'ul',
      { className: 'question__options' },
      options.map((option, i) =>
        el(
          'li',
          {
            className: 'question__option',
            style: { top: `${OPTION_TOPS[i]}px` },
          },
          el(
            'button',
            {
              className: 'question__option-button',
              type: 'button',
              onclick: () => choose(option.points),
            },
            el('img', {
              src: OPTION_ART[option.letter],
              alt: '',
              'aria-hidden': 'true',
            }),
            el('span', { className: 'sr-only' }, `Alternativa ${option.letter}: `),
            el('span', { className: 'question__option-label' }, option.label),
          ),
        ),
      ),
    ),
  )
}
