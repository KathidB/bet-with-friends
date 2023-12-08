import { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'

import './matchbet.css'

function CLBet ({ matchList }) {
  const [betResults, setBetResults] = useState({})
  const [loading, setLoading] = useState(false)

  const handleInputChange = (matchId, team, value) => {
    // Schowaj komunikat o błędzie, gdy użytkownik wypełni pola

    setBetResults(prevResults => ({
      ...prevResults,
      [matchId]: { ...prevResults[matchId], [team]: value }
    }))
  }

  // ...

  const handleBetSubmit = async (matchId, e) => {
    if (e) e.preventDefault()

    const currentBetResults = betResults[matchId]

    try {
      setLoading(true)
      const betEndpoint = `http://130.162.44.103:5000/api/v1/bet/${matchId}`
      const response = await fetch(betEndpoint, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentBetResults)
      })
      setLoading(false)

      if (response.ok) {
        setBetResults(prevResults => {
          const updatedResults = { ...prevResults }
          updatedResults[matchId] = {
            ...currentBetResults,
            submitted: true
          }
          return updatedResults
        })
        console.log(currentBetResults)
        console.log('Zakład wysłany pomyślnie')
      } else {
        console.error('Błąd podczas wysyłania zakładu')
      }
    } catch (error) {
      console.error('Błąd podczas wysyłania zakładu:', error)
    }
  }

  return matchList.length > 0 ? (
    <table className='bet-table'>
      <thead>
        <tr>
          <th className='crest'></th>
          <th>Gospodarze</th>
          <th>Goście</th>
          <th className='crest'></th>
          <th className='crest'>Termin</th>
          <th>Zakład</th>
        </tr>
      </thead>
      <tbody>
        {matchList.map(match => (
          <tr key={match.score.public_id}>
            <td className='crest'>
              <img width={25} height={25} src={match.home_team.crest} alt='' />
            </td>
            <td>{match.home_team.short_name}</td>

            <td>{match.away_team.short_name}</td>
            <td className='crest'>
              <img width={25} height={25} src={match.away_team.crest} alt='' />
            </td>
            <td className='crest'>
              {new Date(match.utc_date).toLocaleDateString('en-GB')} (
              {match.utc_date.replace('T', ' ').slice(11, -3)})
            </td>

            <td className='td-bet'>
              <form
                className='bet-form'
                onSubmit={e => handleBetSubmit(match.public_id, e)}
              >
                <input
                  min={0}
                  max={20}
                  required
                  className='bet-input'
                  type='number'
                  disabled={betResults[match.public_id]?.submitted}
                  placeholder={match.home_team.short_name}
                  value={betResults[match.public_id]?.home_team || ''}
                  onChange={e =>
                    handleInputChange(
                      match.public_id,
                      'home_team',
                      e.target.value
                    )
                  }
                />
                <span> : </span>
                <input
                  min={0}
                  max={20}
                  required
                  className='bet-input'
                  type='number'
                  disabled={betResults[match.public_id]?.submitted}
                  placeholder={match.away_team.short_name}
                  value={betResults[match.public_id]?.away_team || ''}
                  onChange={e =>
                    handleInputChange(
                      match.public_id,
                      'away_team',
                      e.target.value
                    )
                  }
                />

                <button
                  type='submit'
                  className='bet-button'
                  disabled={betResults[match.public_id]?.submitted}
                >
                  {loading ? (
                    <>
                      <FaSpinner className='spinner-icon' />
                    </>
                  ) : null}

                  {betResults[match.public_id]?.submitted
                    ? 'Wysłane'
                    : 'WYŚLIJ'}
                </button>
              </form>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    'Oczekiwanie na następne rozgrywki...'
  )
}

export default CLBet
