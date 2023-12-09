import MatchBet from './betting/MatchBet'
import { PredictionLogic } from './data/PredictionLogic'
import TypingRacoon from './images/raccoon-header3.webp'

import './prediction.css'
function Prediction () {
  const {
    matchList,
    currentPage,
    totalMatches,
    competitions,
    selectedCompetition,
    limit,
    setCurrentPage,
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
          <img
            className='typing-raccoon-top'
            width={180}
            src={TypingRacoon}
            alt=''
          />
          <div className='pred-info-text'>
            <h2 className='section-title panel-header'>
              Typowanie wyników <span className='span-brand'> meczów</span>
            </h2>
            <img
              className='typing-raccoon-bot'
              width={180}
              src={TypingRacoon}
              alt=''
            />
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

          {/* // W przysszłosci będzie wiecej zawodów do wyboru- do zmiany  2023*/}

          <MatchBet
            matchList={matchList}
            currentPage={currentPage}
            totalMatches={totalMatches}
            limit={limit}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </section>
  )
}

export default Prediction
