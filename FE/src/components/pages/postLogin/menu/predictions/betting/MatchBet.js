import { useState, useEffect } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { BsArrowLeft } from 'react-icons/bs'
import { useAuth } from '../../../../../auth/authcontext/AuthContext'

import './matchbet.css'

function MatchBet ({
  matchList,
  currentPage,
  totalMatches,
  limit,
  setCurrentPage,
  setTotalMatches
}) {
  const [submittedBets, setSubmittedBets] = useState([])
  const [betResults, setBetResult] = useState({
    matchId: '',
    away_team_bet: '',
    home_team_bet: ''
  })
  const { ipMan } = useAuth()

  const handleBetSubmit = async (e, matchId) => {
    e.preventDefault()
    const { away_team_bet, home_team_bet } = betResults[matchId]

    try {
      const betEndpoint = `http://${ipMan}:5000/api/v1/bet/${matchId}`
      const response = await fetch(betEndpoint, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          away_team: away_team_bet,
          home_team: home_team_bet
        })
      })

      if (response.ok) {
        setSubmittedBets([...submittedBets, matchId])

        console.log('Poszło', betResults)
        setTotalMatches(prevTotalMatches => prevTotalMatches + 1)
      } else {
        console.error('Błąd podczas wysyłania zakładu')
      }
    } catch (error) {
      console.error('Błąd podczas wysyłania zakładu:', error)
    }
  }

  return matchList.length > 0 ? (
    <>
      {/* //  Lista buttonów z zawodami */}

      <p className='competition-name'>{matchList[0]?.competition.name}</p>

      <p className='schedule-btns'>
        <button
          className='schedule-list-btn span-brand'
          disabled={currentPage === 1}
          aria-label='Page left'
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
          aria-label='Page right'
        >
          <BsArrowRight />
        </button>
      </p>

      <table className='bet-table'>
        <thead>
          <tr>
            <th className='crest'></th>
            <th>Gospodarze</th>
            <th>Goście</th>
            <th className='crest'></th>
            <th className='crest'>Termin</th>
            <th>Typuj</th>
          </tr>
        </thead>
        <tbody>
          {matchList.map(match => {
            const isBetSubmitted = submittedBets.includes(match.public_id)
            return (
              <tr key={match.public_id}>
                <td className='crest'>
                  <img
                    width={25}
                    height={25}
                    src={match.home_team.crest}
                    alt={`Crest of ${match.home_team.short_name}`}
                  />
                </td>
                <td>{match.home_team.short_name}</td>
                <td>{match.away_team.short_name}</td>
                <td className='crest'>
                  <img
                    width={25}
                    height={25}
                    src={match.away_team.crest}
                    alt={`Crest of ${match.away_team.short_name}`}
                  />
                </td>
                <td className='crest'>
                  {new Date(match.utc_date).toLocaleDateString('en-GB')} (
                  {match.utc_date.replace('T', ' ').slice(11, -3)})
                </td>
                <td className='td-bet'>
                  <form
                    onSubmit={e => handleBetSubmit(e, match.public_id)}
                    className='bet-form'
                  >
                    <input
                      min={0}
                      max={20}
                      required
                      className='bet-input'
                      type='number'
                      disabled={isBetSubmitted}
                      value={betResults[match.public_id]?.home_team_bet || ''}
                      onChange={e =>
                        setBetResult({
                          ...betResults,
                          [match.public_id]: {
                            ...betResults[match.public_id],
                            home_team_bet: e.target.value
                          }
                        })
                      }
                      placeholder={match.home_team.short_name}
                    />
                    <span className='bet-span'> : </span>
                    <input
                      min={0}
                      max={20}
                      required
                      className='bet-input'
                      type='number'
                      disabled={isBetSubmitted}
                      placeholder={match.away_team.short_name}
                      value={betResults[match.public_id]?.away_team_bet || ''}
                      onChange={e =>
                        setBetResult({
                          ...betResults,
                          [match.public_id]: {
                            ...betResults[match.public_id],
                            away_team_bet: e.target.value
                          }
                        })
                      }
                    />

                    <button
                      type='submit'
                      className='bet-button'
                      disabled={isBetSubmitted}
                    >
                      Wyślij
                    </button>
                  </form>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  ) : (
    <p>Oczekiwanie na nadchodzące rozgrywki...</p>
  )
}

export default MatchBet
