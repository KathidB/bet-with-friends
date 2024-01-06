import { useState } from 'react'
import MatchBet from './betting/MatchBet'
import { PredictionLogic } from './data/PredictionLogic'
import TypingRacoon from './images/raccoon-header3.webp'
import { useAuth } from '../../../../auth/authcontext/AuthContext'

import './prediction.css'
function Prediction () {
  const { darkMode } = useAuth()
  const [isHowToModalVisible, setHowToModalVisibility] = useState(false)

  const {
    matchList,
    currentPage,
    totalMatches,
    competitions,
    selectedCompetition,
    limit,
    setCurrentPage,
    setTotalMatches,
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

  const handleHowTo = () => {
    setHowToModalVisibility(true)
  }

  const closeHowToModal = () => {
    setHowToModalVisibility(false)
  }

  return (
    <section className='app-wrap'>
      <div className='pred'>
        {/* BOX INFORMACYJNY: */}
        <div className='pred-box-info'>
          <img
            className='typing-raccoon-top'
            width={180}
            height={180}
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

            <button className='how-to-bet' onClick={handleHowTo}>
              Jak typować wyniki?
            </button>

            {/* MODAL */}
            {isHowToModalVisible && (
              <div className='how-to-modal' onClick={closeHowToModal}>
                <div
                  className={`how-to-modal-content ${
                    darkMode && 'darkmode-on'
                  }`}
                >
                  <h4>Instrukcja jak typować:</h4>
                  <span className='close-modal'>X</span>
                  <ol>
                    <li>
                      <p>
                        Obstawiać można na 5 dni wcześniej, aż do momentu
                        rozpoczęcia meczu.
                      </p>
                    </li>
                    <li>
                      <p>
                        Mecze typujesz tylko raz. Później nie ma możliwości
                        edycji predykcji.
                      </p>
                    </li>
                    <li>
                      <p>
                        Za trafiony poprawnie wynik otrzymasz 100 ptk.
                        <br />
                        Za wskazanie wynikiem zwycięzcy lub remisu 20pk.
                      </p>
                    </li>
                    <li>
                      <p>Ligi wyświetlają się tylko w trakcie rozgrywek.</p>
                    </li>
                  </ol>
                </div>
              </div>
            )}

            <p className='how-to-bet-p'>
              Typuj wyniki meczów wybranych rozgrywek piłkarskich. Każdy mecz
              obstawiasz osobno. <br /> Pamiętaj, masz tylko jedną możliwość
              wysłania swojej predykcji, później nie ma możliwośći jej
              edytowania. <br />
              Mecze można typować do 1 tygodnia do przodu. <br />
              <b>
                Poniższa lista lig przedstawia wyłącznie obecnie trwające
                rozgrywki.{` `}
              </b>
              Powodzenia!
            </p>
          </div>
        </div>
        <hr className='hr-panel'></hr>

        {/* LISTA COMPETITION DO BETOWANIA - NA GUZIKI: */}

        <div className='schedule'>
          <div className='competition-buttons'>
            {competitions.map(competition => (
              <button
                key={competition.public_id}
                style={
                  darkMode
                    ? { color: 'white', backgroundColor: '#1F1F1F' }
                    : { color: 'black' }
                }
                className={`competition-btn ${
                  selectedCompetition === competition.public_id
                    ? 'active-schedule'
                    : ''
                }`}
                onClick={() => handleCompetitionChange(competition.public_id)}
              >
                <img
                  width={50}
                  height={50}
                  src={competition.emblem}
                  alt=''
                  className='comp-button-img'
                  style={{ backgroundColor: 'white', borderRadius: '2px' }}
                />
                {handleCompetitionNames(competition.name)}
              </button>
            ))}
          </div>
          <hr className='hr-panel-bot'></hr>

          <MatchBet
            matchList={matchList}
            currentPage={currentPage}
            totalMatches={totalMatches}
            limit={limit}
            setCurrentPage={setCurrentPage}
            setTotalMatches={setTotalMatches}
          />
        </div>
      </div>
    </section>
  )
}

export default Prediction
