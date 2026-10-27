import { Fragment, useRef } from 'react'
import fundo from '../assets/screens/fundo-interno.jpg'
import opcaoA from '../assets/screens/opcao-a.png'
import opcaoB from '../assets/screens/opcao-b.png'
import opcaoC from '../assets/screens/opcao-c.png'
import type { OptionLetter, QuizQuestion } from '../data/questions'
import './Question.css'

/** Arte da pílula de cada alternativa (a letra já vem embutida na imagem). */
const OPTION_ART: Record<OptionLetter, string> = {
  A: opcaoA,
  B: opcaoB,
  C: opcaoC,
}

/** Topo de cada pílula no frame do Figma (1620x2160). */
const OPTION_TOPS = [761, 1118, 1474]

/** Medida opcional da arte: quando ausente, vale o padrão do CSS. */
const px = (value?: number) => (value === undefined ? undefined : `${value}px`)

interface QuestionProps {
  question: QuizQuestion
  /** Recebe os pontos da alternativa escolhida e avança o quiz. */
  onAnswer: (points: number) => void
}

/**
 * Frame 2 — tela de pergunta com três alternativas.
 *
 * Escolher uma alternativa registra os pontos dela e segue para a etapa
 * seguinte.
 */
function Question({ question, onAnswer }: QuestionProps) {
  const { eyebrow, lines, options, layout = {} } = question
  const { eyebrowTop = 363, questionTop = 478, left } = layout

  /*
   * Só a primeira escolha conta. Em tela sensível ao toque um toque duplo
   * dispara o handler duas vezes no mesmo tick, o que somaria duas respostas
   * e pularia a pergunta seguinte.
   *
   * Precisa ser `ref`, não `state`: um `setAnswered(true)` só valeria no
   * próximo render, e o segundo clique ainda leria `false`.
   */
  const answered = useRef(false)

  const choose = (points: number) => {
    if (answered.current) return
    answered.current = true
    onAnswer(points)
  }

  return (
    <section className="question" aria-labelledby={`${question.id}-enunciado`}>
      <img className="question__bg" src={fundo} alt="" aria-hidden="true" />

      <p
        className="question__eyebrow"
        style={{ top: `${eyebrowTop}px`, left: px(left) }}
      >
        {eyebrow}
      </p>

      <h2
        className="question__text"
        id={`${question.id}-enunciado`}
        style={{ top: `${questionTop}px`, left: px(left) }}
      >
        {lines.map((line, i) => (
          <Fragment key={line}>
            {i > 0 && <br />}
            {line}
          </Fragment>
        ))}
      </h2>

      <ul className="question__options">
        {options.map((option, i) => (
          <li
            className="question__option"
            key={option.letter}
            style={{ top: `${OPTION_TOPS[i]}px` }}
          >
            <button
              className="question__option-button"
              type="button"
              onClick={() => choose(option.points)}
            >
              <img src={OPTION_ART[option.letter]} alt="" aria-hidden="true" />
              <span className="sr-only">{`Alternativa ${option.letter}: `}</span>
              <span className="question__option-label">{option.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Question
