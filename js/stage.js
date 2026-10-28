/** Medidas da prancheta do Figma — todo o layout interno é escrito nesses pixels. */
const STAGE_WIDTH = 1620
const STAGE_HEIGHT = 2160

/** Aviso legal fixo no rodapé esquerdo de todas as telas. */
const DISCLAIMER =
  'Esta autoavaliação tem caráter estritamente educativo e não substitui a' +
  ' consulta médica nem o diagnóstico clínico laboratorial'

/**
 * Palco de tamanho fixo (1620x2160) escalado para caber inteiro na viewport.
 * Cada tela do quiz é desenhada em pixels do Figma e o palco cuida do encaixe,
 * então o design permanece proporcionalmente idêntico em qualquer resolução.
 *
 * Devolve `mount(node)`, que troca a tela em cartaz. O aviso legal fica no
 * palco, e não em cada tela, porque acompanha todas as etapas na mesma
 * posição — e depois da tela no DOM, para sobrepor a arte de fundo dela.
 */
function createStage(container) {
  const stage = el('div', { className: 'stage' })
  const disclaimer = el('p', { className: 'stage__disclaimer' }, DISCLAIMER)

  stage.append(disclaimer)
  container.append(el('div', { className: 'stage-viewport' }, stage))

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

  /** Tela em cartaz, guardada para desmontar antes de pôr a próxima. */
  let current = null

  return {
    mount(node) {
      /* Sem React não existe unmount: quem precisa desfazer algo ao sair de
         cena (o laço de animação do `Loading`) anexa um `destroy` ao nó, e é
         aqui que ele é chamado. */
      current?.destroy?.()
      current?.remove()
      current = node
      stage.insertBefore(node, disclaimer)
    },
  }
}
