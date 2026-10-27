import botaoIniciar from '../assets/screens/boas-vindas-botao.png'
import fundo from '../assets/screens/boas-vindas-bg.jpg'
import mao from '../assets/screens/mao.png'
import './Welcome.css'

interface WelcomeProps {
  onStart: () => void
}

/** Frame 1 — "tela_inicial" / BOAS-VINDAS. */
function Welcome({ onStart }: WelcomeProps) {
  return (
    <section className="welcome" aria-labelledby="welcome-title">
      <img className="welcome__bg" src={fundo} alt="" aria-hidden="true" />

      <h1 className="welcome__title" id="welcome-title">
        BOAS-VINDAS
      </h1>

      <div className="welcome__lead">
        <p>Nem todo alerta faz barulho.</p>
        <p className="welcome__lead--strong">
          Vamos ouvir os sinais do seu corpo?
        </p>
        <p>
          Responda a 4 perguntas rápidas
          <br />
          sobre a sua rotina e retire seu
          <br />
          kit de autocuidado!
        </p>
      </div>

      <button className="welcome__cta" type="button" onClick={onStart}>
        <img src={botaoIniciar} alt="" aria-hidden="true" />
        <span className="sr-only">Iniciar autoavaliação</span>
      </button>

      {/* A mão fica acima do botão na arte original, por isso não captura cliques. */}
      <img className="welcome__hand" src={mao} alt="" aria-hidden="true" />
    </section>
  )
}

export default Welcome
