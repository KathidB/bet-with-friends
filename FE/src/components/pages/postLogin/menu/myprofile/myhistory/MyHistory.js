import { useEffect, useState } from 'react'
import { useAuth } from '../../../../../auth/authcontext/AuthContext'
import { PredictionLogic } from '../../predictions/data/PredictionLogic'
import { BsArrowRight } from 'react-icons/bs'
import { BsArrowLeft } from 'react-icons/bs'

import './myhistory.css'

function MyHistory () {
  const { ipMan } = useAuth()
  const [historyBets, setHistoryBets] = useState([])
  const [historyPage, setHistoryPage] = useState(1)
  const [totalHistory, setTotalHistory] = useState(0)
  const [selectedCompetition, setSelectedCompetition] = useState(2001)

  const limitHistory = 10
  const whatPageIsIT = Math.ceil(totalHistory / limitHistory)

  const { competitions } = PredictionLogic()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://${ipMan}:5000/api/v1/bet/history?competetition=${selectedCompetition}&page=${historyPage}&limit=${limitHistory}`

        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            'X-Total-Count': 'true'
          }
        })

        if (response.ok) {
          const jsonData = await response.json()
          setHistoryBets(jsonData)
          setTotalHistory(response.headers.get('X-Total-Count'))
        } else {
          const errorText = await response.text()
          console.error('Błąd pobierania danych:', errorText)
        }
      } catch (error) {
        console.error('Błąd pobierania danych:', error)
      }
    }

    fetchData()
  }, [selectedCompetition, ipMan, historyPage])

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

  const handlePrevPage = () => {
    setHistoryPage(prevValue => prevValue - 1)
  }

  const handleNextPage = () => {
    setHistoryPage(prevValue => prevValue + 1)
  }

  const handleCompetitionChange = competitionId => {
    setSelectedCompetition(competitionId)
    setHistoryPage(1)
  }

  console.log(historyBets)

  return (
    <>
      <div className='history'>
        <div className='competition-buttons history-buttons'>
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
              <img
                width={50}
                height={50}
                src={competition.emblem}
                alt=''
                className='comp-button-img'
              />
              {handleCompetitionNames(competition.name)}
            </button>
          ))}
        </div>

        {historyBets.length > 0 ? (
          <div className='history-pages'>
            <button
              className='schedule-list-btn span-brand'
              disabled={historyPage === 1}
              aria-label='Page left'
              onClick={handlePrevPage}
            >
              <BsArrowLeft />
            </button>
            <span className='schedule-btn-span'>
              Przeglądaj listę {`${historyPage} / ${whatPageIsIT}`}
            </span>
            <button
              className='schedule-list-btn span-brand'
              onClick={handleNextPage}
              disabled={
                historyPage === Math.ceil(totalHistory / limitHistory) ||
                whatPageIsIT === 0
              }
              aria-label='Page right'
            >
              <BsArrowRight />
            </button>
          </div>
        ) : (
          <p>Brak historii typowania...</p>
        )}

        <div className='history-list'>
          <ul className='history-ul'>
            {historyBets
              .map(bets => (
                <>
                  {console.log(bets)}
                  <div
                    key={bets.match.score.public_id}
                    className={`history-data-item ${
                      bets.match.score?.full_time &&
                      (Number(bets.match.score.full_time.split('-')[0]) ===
                        bets.home_team &&
                      Number(bets.match.score.full_time.split('-')[1]) ===
                        bets.away_team
                        ? 'hit'
                        : (Number(bets.match.score.full_time.split('-')[0]) >
                            Number(bets.match.score.full_time.split('-')[1]) &&
                            bets.home_team > bets.away_team) ||
                          (Number(bets.match.score.full_time.split('-')[0]) <
                            Number(bets.match.score.full_time.split('-')[1]) &&
                            bets.home_team < bets.away_team) ||
                          (Number(bets.match.score.full_time.split('-')[0]) ===
                            Number(bets.match.score.full_time.split('-')[1]) &&
                            bets.home_team === bets.away_team)
                        ? 'target'
                        : 'miss')
                    }`}
                  >
                    <p>
                      {new Date(bets.match.utc_date).toLocaleDateString(
                        'en-GB'
                      )}
                      {` `}
                      {bets.match.utc_date.slice(11, -3)}
                    </p>

                    <img
                      className='cometition-emblem'
                      src={bets.match.competition.emblem}
                      alt='cometition emblem'
                      height={30}
                    />

                    <p>
                      Typowałeś: {bets.home_team}-{bets.away_team}
                    </p>
                  </div>
                  <li
                    className={`history-item ${
                      bets.match.score?.full_time &&
                      (Number(bets.match.score.full_time.split('-')[0]) ===
                        bets.home_team &&
                      Number(bets.match.score.full_time.split('-')[1]) ===
                        bets.away_team
                        ? 'hit-boxa'
                        : (Number(bets.match.score.full_time.split('-')[0]) >
                            Number(bets.match.score.full_time.split('-')[1]) &&
                            bets.home_team > bets.away_team) ||
                          (Number(bets.match.score.full_time.split('-')[0]) <
                            Number(bets.match.score.full_time.split('-')[1]) &&
                            bets.home_team < bets.away_team) ||
                          (Number(bets.match.score.full_time.split('-')[0]) ===
                            Number(bets.match.score.full_time.split('-')[1]) &&
                            bets.home_team === bets.away_team)
                        ? 'target-box'
                        : 'miss-box')
                    }`}
                    key={bets.public_id}
                  >
                    <div className='history-result'>
                      <img
                        className='history-home-team-img'
                        src={bets.match.home_team.crest}
                        width={25}
                        alt='home team crest'
                      />
                      <p>{bets.match.home_team.short_name}</p>
                    </div>

                    <p>
                      {bets.match.score?.full_time ? (
                        <span className='history-span-result'>
                          Wynik: <br /> {bets.match.score?.full_time}
                        </span>
                      ) : (
                        <span className='history-span-result'>
                          Wynik <br /> TBD
                        </span>
                      )}
                    </p>

                    <div className='history-result history-right'>
                      <p>{bets.match.away_team.short_name}</p>
                      <img
                        className='history-away-team-img'
                        src={bets.match.away_team.crest}
                        width={25}
                        alt='home team crest'
                      />
                    </div>
                  </li>
                </>
              ))
              .reverse()}
          </ul>
        </div>
      </div>
    </>
  )
}

export default MyHistory
