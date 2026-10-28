/**
 * Sequência de telas do quiz — um frame do Figma por etapa, do convite até
 * o agradecimento, que reinicia o fluxo.
 *
 * Cada etapa recebe o contexto de navegação (`next`, `back`, `restart`),
 * `answer` para registrar a resposta de uma pergunta e `score` com a soma até
 * ali, de 0 a 8.
 *
 * Diferente do React, cada etapa constrói um nó novo a cada entrada em cena:
 * nenhum estado interno de uma pergunta atravessa para a seguinte, mesmo as
 * quatro ocupando a mesma posição na sequência.
 */
const STEPS = [
  { id: 'welcome', render: ({ next }) => Welcome(next) },
  ...QUESTIONS.map((question, i) => ({
    id: `q${i + 1}`,
    render: ({ answer }) => Question(question, (points) => answer(i, points)),
  })),
  { id: 'calculando', render: ({ next }) => Loading(next) },
  {
    id: 'resultado',
    render: ({ next, score }) => Result(resultForScore(score), next),
  },
  { id: 'obrigado', render: ({ restart }) => Thanks(restart) },
]

function App(container) {
  const stage = createStage(container)

  let index = 0
  /** Pontos de cada pergunta, na posição dela em `QUESTIONS`. */
  let answers = []

  const score = () => answers.reduce((total, points) => total + (points ?? 0), 0)

  const show = (value) => {
    index = value
    stage.mount(STEPS[index].render(context))
  }

  const next = () => show(Math.min(index + 1, STEPS.length - 1))
  const back = () => show(Math.max(index - 1, 0))

  /* Zerar as respostas junto com o índice: no totem, a pessoa seguinte não
     pode herdar a pontuação de quem respondeu antes. */
  const restart = () => {
    answers = []
    show(0)
  }

  const answer = (questionIndex, points) => {
    /* Grava na posição da pergunta, e não com `push`, para responder a
       mesma pergunta de novo substituir em vez de acumular. */
    answers[questionIndex] = points
    next()
  }

  /* `score` é lido na hora de renderizar, e não fixado agora, porque o
     contexto é o mesmo objeto do início ao fim do quiz. */
  const context = {
    next,
    back,
    restart,
    answer,
    get score() {
      return score()
    },
  }

  show(0)
}

App(document.getElementById('root'))
