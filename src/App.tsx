import { useCallback, useMemo, useState, type ReactNode } from 'react'
import Stage from './components/Stage'
import { QUESTIONS } from './data/questions'
import { resultForScore } from './data/results'
import Loading from './screens/Loading'
import Question from './screens/Question'
import Result from './screens/Result'
import Thanks from './screens/Thanks'
import Welcome from './screens/Welcome'

/** Ações de navegação disponíveis para qualquer etapa. */
interface Navigation {
  next: () => void
  back: () => void
  restart: () => void
}

interface StepContext extends Navigation {
  /** Registra a resposta de uma pergunta e segue para a etapa seguinte. */
  answer: (questionIndex: number, points: number) => void
  /** Soma das respostas até aqui, de 0 a 8. */
  score: number
}

interface Step {
  id: string
  render: (context: StepContext) => ReactNode
}

/**
 * Sequência de telas do quiz — um frame do Figma por etapa, do convite até
 * o agradecimento, que reinicia o fluxo.
 */
const STEPS: Step[] = [
  { id: 'welcome', render: ({ next }) => <Welcome onStart={next} /> },
  /*
   * As quatro perguntas ocupam a mesma posição na árvore, então a `key` é
   * necessária: sem ela o React reaproveita a instância de `Question` e o
   * estado interno dela atravessa de uma pergunta para a seguinte.
   */
  ...QUESTIONS.map((question, i) => ({
    id: `q${i + 1}`,
    render: ({ answer }: StepContext) => (
      <Question
        key={question.id}
        question={question}
        onAnswer={(points) => answer(i, points)}
      />
    ),
  })),
  { id: 'calculando', render: ({ next }) => <Loading onDone={next} /> },
  {
    id: 'resultado',
    render: ({ next, score }) => (
      <Result result={resultForScore(score)} onConclude={next} />
    ),
  },
  { id: 'obrigado', render: ({ restart }) => <Thanks onRestart={restart} /> },
]

function App() {
  const [index, setIndex] = useState(0)
  /** Pontos de cada pergunta, na posição dela em `QUESTIONS`. */
  const [answers, setAnswers] = useState<number[]>([])

  const next = useCallback(
    () => setIndex((i) => Math.min(i + 1, STEPS.length - 1)),
    [],
  )
  const back = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), [])

  /* Zerar as respostas junto com o índice: no totem, a pessoa seguinte não
     pode herdar a pontuação de quem respondeu antes. */
  const restart = useCallback(() => {
    setAnswers([])
    setIndex(0)
  }, [])

  const answer = useCallback(
    (questionIndex: number, points: number) => {
      /* Grava na posição da pergunta, e não com `push`, para responder a
         mesma pergunta de novo substituir em vez de acumular. */
      setAnswers((prev) => {
        const updated = [...prev]
        updated[questionIndex] = points
        return updated
      })
      next()
    },
    [next],
  )

  const score = useMemo(
    () => answers.reduce((total, points) => total + (points ?? 0), 0),
    [answers],
  )

  const context = useMemo<StepContext>(
    () => ({ next, back, restart, answer, score }),
    [next, back, restart, answer, score],
  )

  return <Stage>{STEPS[index].render(context)}</Stage>
}

export default App
