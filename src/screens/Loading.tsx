import { useEffect, useRef } from 'react'
import fundo from '../assets/screens/fundo-interno.jpg'
import trilha from '../assets/screens/barra-trilha.png'
import './Loading.css'

/** Duração do processamento simulado, em milissegundos. */
export const DEFAULT_DURATION = 1800

interface LoadingProps {
  onDone?: () => void
  duration?: number
}

/**
 * Frame 6 — "Calculando...".
 *
 * A barra é preenchida da esquerda para a direita ao longo de `duration` e,
 * ao chegar em 100%, dispara `onDone` para seguir para a etapa seguinte.
 * A largura é escrita direto no DOM via ref: evita centenas de renders e
 * mantém o preenchimento visível mesmo sob `prefers-reduced-motion`, já que
 * aqui o movimento é a própria informação, não enfeite.
 */
function Loading({ onDone, duration = DEFAULT_DURATION }: LoadingProps) {
  const fillRef = useRef<HTMLDivElement>(null)
  const onDoneRef = useRef(onDone)

  useEffect(() => {
    onDoneRef.current = onDone
  })

  useEffect(() => {
    const fill = fillRef.current
    if (!fill) return

    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      fill.style.width = `${progress * 100}%`

      if (progress < 1) frame = requestAnimationFrame(tick)
      else onDoneRef.current?.()
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [duration])

  return (
    <section className="loading" aria-labelledby="loading-title">
      <img className="loading__bg" src={fundo} alt="" aria-hidden="true" />

      <h2 className="loading__title" id="loading-title">
        Calculando...
      </h2>

      <img className="loading__track" src={trilha} alt="" aria-hidden="true" />

      <div
        className="loading__bar"
        role="progressbar"
        aria-label="Calculando o resultado da autoavaliação"
      >
        <div className="loading__fill" ref={fillRef} />
      </div>
    </section>
  )
}

export default Loading
