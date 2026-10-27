import { Fragment } from 'react'
import fundo from '../assets/screens/fundo-interno.jpg'
import botaoConcluir from '../assets/screens/botao-concluir.png'
import type { ResultLine, ResultSegment, RiskResult } from '../data/results'
import './Result.css'

/** Topo de cada filete sob as duas primeiras linhas do score. */
const RULE_TOPS = [404, 493]

/** Medida opcional da arte: quando ausente, vale o padrão do CSS. */
const px = (value?: number) => (value === undefined ? undefined : `${value}px`)

/** Uma linha é um texto simples ou uma lista de trechos. */
const toParts = (line: ResultLine): ResultSegment[] =>
  Array.isArray(line) ? line : [line]

/** Texto puro da linha — serve de chave estável na lista. */
const lineText = (line: ResultLine) =>
  toParts(line)
    .map((part) => (typeof part === 'string' ? part : part.sub))
    .join('')

/**
 * Repete as quebras de linha da arte dentro de um bloco de medida fixa.
 * Um trecho `{ sub }` vira corpo menor rebaixado, como o "1c" de HbA1c.
 */
const withBreaks = (lines: ResultLine[]) =>
  lines.map((line, i) => (
    <Fragment key={lineText(line)}>
      {i > 0 && <br />}
      {toParts(line).map((part) =>
        typeof part === 'string' ? (
          part
        ) : (
          <sub className="result__subscript" key={part.sub}>
            {part.sub}
          </sub>
        ),
      )}
    </Fragment>
  ))

interface ResultProps {
  result: RiskResult
  onConclude: () => void
}

/** Frame 7 — tela de resultado por faixa de risco. */
function Result({ result, onConclude }: ResultProps) {
  const { score, ruleWidths, headline, body, reference, layout = {} } = result
  const { bodyTop, bodyWidth } = layout

  return (
    <section className="result" aria-labelledby={`${result.id}-titulo`}>
      <img className="result__bg" src={fundo} alt="" aria-hidden="true" />

      {/* Cada linha do score é um parágrafo porque o design separa as três
          com uma margem, e não apenas com a entrelinha. */}
      <div className="result__score">
        {score.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      {ruleWidths.map((width, i) => (
        <div
          className="result__rule"
          key={RULE_TOPS[i]}
          style={{ top: `${RULE_TOPS[i]}px`, width: `${width}px` }}
        />
      ))}

      <h2 className="result__headline" id={`${result.id}-titulo`}>
        {withBreaks(headline)}
      </h2>

      <p
        className="result__body"
        style={{ top: px(bodyTop), width: px(bodyWidth) }}
      >
        {withBreaks(body)}
        <sup className="result__reference">{reference}</sup>
      </p>

      <button className="result__cta" type="button" onClick={onConclude}>
        <img src={botaoConcluir} alt="" aria-hidden="true" />
        <span className="sr-only">Concluir</span>
      </button>
    </section>
  )
}

export default Result
