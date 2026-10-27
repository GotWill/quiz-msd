import fundo from '../assets/screens/fundo-interno.jpg'
import botaoRefazer from '../assets/screens/botao-refazer.png'
import { REFERENCES, type ReferencePart } from '../data/references'
import './Thanks.css'

/** Destaque de cada trecho da bibliografia, como na arte. */
const renderReference = (part: ReferencePart) => {
  if (part.bold) return <strong key={part.text}>{part.text}</strong>
  if (part.italic) return <cite key={part.text}>{part.text}</cite>
  return part.text
}

interface ThanksProps {
  onRestart: () => void
}

/** Frame 10 — agradecimento, recomeço do quiz e bibliografia. */
function Thanks({ onRestart }: ThanksProps) {
  return (
    <section className="thanks" aria-labelledby="thanks-titulo">
      <img className="thanks__bg" src={fundo} alt="" aria-hidden="true" />

      <h2 className="thanks__title" id="thanks-titulo">
        Obrigado por
        <br />
        participar
      </h2>

      <button className="thanks__cta" type="button" onClick={onRestart}>
        <img src={botaoRefazer} alt="" aria-hidden="true" />
        <span className="sr-only">Recomeçar avaliação</span>
      </button>

      <p className="thanks__references">{REFERENCES.map(renderReference)}</p>
    </section>
  )
}

export default Thanks
