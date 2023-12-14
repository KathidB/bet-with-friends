import { useEffect, useState } from 'react'
import { useAuth } from '../../../../auth/authcontext/AuthContext'

function Matches () {
  const [matchesData, setMatchesData] = useState([])
  const [competitionsList, setCompetitionsList] = useState([])
  const [currentCompetition, setCurrentCompetition] = useState(2001)

  const { ipMan } = useAuth()

  useEffect(() => {
    const getCompetitions = async () => {
      try {
        const competitionsResponse = await fetch(
          `http://130.162.44.103:5000/api/v1/competetition`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Total-Count': 'true'
            }
          }
        )
        if (competitionsResponse.ok) {
          const competitionsData = await competitionsResponse.json()
          setCompetitionsList(competitionsData)
          // zamiana bo w euro nie ma jeszcze meczy a jest na 1 miejscu w tabeli wiec jest pusta domyślnie.
          // competitionsData.reverse()

          // Sprawdź, czy Champions League jest w dostępnych konkurencjach
        } else {
          console.error('Błąd podczas pobierania danych')
        }
      } catch (error) {
        console.error('Błąd podczas wysyłania żądania:', error)
      }
    }

    getCompetitions()
  }, [ipMan])

  useEffect(() => {
    const getMatches = async () => {
      try {
        const pubMatchesResponse = await fetch(
          `http://130.162.44.103:5000/api/v1/matches?competetition=${currentCompetition}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Total-Count': 'true'
            }
          }
        )

        if (pubMatchesResponse.ok) {
          const matchesInfo = await pubMatchesResponse.json()
          setMatchesData(matchesInfo)
        } else {
          console.error(
            'Błąd podczas pobierania danych:',
            pubMatchesResponse.status
          )
        }
      } catch (error) {
        console.error('Błąd podczas wysyłania żądania:', error.message)
      }
    }

    getMatches()
  }, [ipMan, currentCompetition])

  const handleCompetitionChange = competitionId => {
    setCurrentCompetition(competitionId)
  }

  return (
    <section className='app-wrap'>
      <h2 className='section-title'>
        {' '}
        Tabela <span className='span-brand'>meczów</span>{' '}
      </h2>

      <p>
        Tabela przedstawia nadchodzące rozgrywki najpopularniejszych lig. Aby
        uczestniczyć w emocjonującym świecie obstawiania ze swoimi przyjaciółmi
        sprawdź, kiedy odbywają się najważniejsze mecze i zanurz się w
        atmosferze rywalizacji.
      </p>

      <div className='competition-buttons'>
        {competitionsList.map(competition => (
          <button
            key={competition.public_id}
            className={`competition-btn ${
              currentCompetition === competition.public_id
                ? 'active-schedule'
                : ''
            }`}
            onClick={() => handleCompetitionChange(competition.public_id)}
          >
            <img width={50} height={50} src={competition.emblem} alt='' />
            <span>{competition.name}</span>
          </button>
        ))}
      </div>

      <table className='schedule-table'>
        <thead>
          <tr>
            <th className='crest'></th>
            <th>Gospodarze</th>
            <th>Wynik</th>
            <th>Goście</th>
            <th className='crest'></th>
            <th className='crest'>Termin</th>
          </tr>
        </thead>
        <tbody>
          {matchesData.map(match => (
            <tr key={match.score.public_id}>
              <td className='crest'>
                <img
                  width={25}
                  height={25}
                  src={match.home_team.crest}
                  alt=''
                />
              </td>
              <td>{match.home_team.short_name}</td>
              <td>{match.score.full_time.replace('-', ' - ') ?? 'TBD'}</td>

              <td>{match.away_team.short_name}</td>
              <td className='crest'>
                <img
                  width={25}
                  height={25}
                  src={match.away_team.crest}
                  alt=''
                />
              </td>
              <td className='crest'>
                {' '}
                {new Date(match.utc_date).toLocaleDateString('en-GB')} (
                {match.utc_date.replace('T', ' ').slice(11, -3)})
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
export default Matches
