import { useLayoutEffect, useRef, type ReactNode } from 'react'
import './Stage.css'

/** Medidas da prancheta do Figma — todo o layout interno é escrito nesses pixels. */
export const STAGE_WIDTH = 1620
export const STAGE_HEIGHT = 2160

interface StageProps {
  children: ReactNode
}

/**
 * Palco de tamanho fixo (1620x2160) escalado para caber inteiro na viewport.
 * Cada tela do quiz é desenhada em pixels do Figma e o palco cuida do encaixe,
 * então o design permanece proporcionalmente idêntico em qualquer resolução.
 */
function Stage({ children }: StageProps) {
  const stageRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const fit = () => {
      const scale = Math.min(
        window.innerWidth / STAGE_WIDTH,
        window.innerHeight / STAGE_HEIGHT,
      )
      stage.style.setProperty('--stage-scale', String(scale))
    }

    fit()
    window.addEventListener('resize', fit)
    window.addEventListener('orientationchange', fit)
    window.visualViewport?.addEventListener('resize', fit)

    return () => {
      window.removeEventListener('resize', fit)
      window.removeEventListener('orientationchange', fit)
      window.visualViewport?.removeEventListener('resize', fit)
    }
  }, [])

  return (
    <div className="stage-viewport">
      <div className="stage" ref={stageRef}>
        {children}
      </div>
    </div>
  )
}

export default Stage
