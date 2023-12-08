import { BsArrowRight } from 'react-icons/bs'
import { BsArrowLeft } from 'react-icons/bs'
import CLBet from './betting/MatchBet'

import { PredictionLogic } from './data/PredictionLogic'
import TypingRacoon from './images/raccoon-header3.webp'

import './prediction.css'
function Prediction () {
  const {
    matchList,
    currentPage,
    totalMatches,
    competitions,
    setCurrentPage,
    selectedCompetition,
    limit,
    handleCompetitionChange
  } = PredictionLogic()

  const handleCompetitionNames = competitionName => {
    const translateCompetition = {
      'European Championship': 'Euro 2024',
      'UEFA Champions League': 'Champions League',
      'Premier League': 'Premier League',
      Championship: 'Championship',
      Bundesliga: 'Bundesliga',
      'Serie A': 'Serie A',
      'Campeonato Brasileiro Série A': 'Brasileiro Série A'
    }

    return translateCompetition[competitionName] || competitionName
  }

  return (
    <section className='app-wrap'>
      <div className='pred'>
        {/* BOX INFORMACYJNY: */}
        <div className='pred-box-info'>
          <img width={180} src={TypingRacoon} alt='' />
          <div className='pred-info-text'>
            <h2 className='section-title panel-header'>
              Typowanie wyników <span className='span-brand'> meczów</span>
            </h2>
            <p>
              Typuj wyniki meczów wybranych rozgrywek piłkarskich. Każdy mecz
              obstawiasz osobno. <br /> Pamiętaj, masz tylko jedną możliwość
              wysłania swojej predykcji, później nie ma możliwośći jej
              edytowania. Powodzenia!
            </p>
          </div>
        </div>
        <hr className='hr-panel'></hr>

        {/* BETOWANIE: */}

        <div className='schedule'>
          <div className='competition-buttons'>
            {competitions.map(competition => (
              <button
                key={competition.public_id}
                className={`competition-btn ${
                  selectedCompetition === competition.public_id
                    ? 'active-schedule'
                    : ''
                }`}
                onClick={() => handleCompetitionChange(competition.public_id)}
              >
                <img width={50} height={50} src={competition.emblem} alt='' />
                {handleCompetitionNames(competition.name)}
              </button>
            ))}
          </div>

          {/* //  Lista buttonów z zawodami */}
          <p className='competition-name'>{matchList[0]?.competition.name}</p>
          <p className='schedule-btns'>
            <button
              className='schedule-list-btn span-brand'
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prevValue => prevValue - 1)}
            >
              <BsArrowLeft />
            </button>
            <span className='schedule-btn-span'>
              Przeglądaj listę {currentPage} / {Math.ceil(totalMatches / limit)}
            </span>
            <button
              className='schedule-list-btn span-brand'
              onClick={() => setCurrentPage(prevValue => prevValue + 1)}
              disabled={currentPage === Math.ceil(totalMatches / limit)}
            >
              <BsArrowRight />
            </button>
          </p>

          {/* // W przysszłosci będzie wiecej zawodów do wyboru- do zmiany  2023*/}

          <CLBet matchList={matchList} />
        </div>
      </div>
    </section>
  )
}

export default Prediction
