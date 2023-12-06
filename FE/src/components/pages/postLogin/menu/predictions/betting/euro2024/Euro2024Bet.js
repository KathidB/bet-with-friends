import { useEffect, useState } from 'react'
function Euro2024Bet ({ matchList }) {
  const [bet, setBet] = useState([])

  const [currentPage] = useState(1)
  const [selectedCompetition] = useState(2001)
  const [totalBets, setTobalBets] = useState(null)
  const limit = 10
  console.log('PONIŻEJ WYNIKI POBIERANIA BET:')

  useEffect(() => {
    const getMatches = async () => {
      try {
        const matchesResponse = await fetch(
          `http://130.162.44.103:5000/api/v1/bet?competetition=${selectedCompetition}&page=${currentPage}&limit=${limit}`,
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'X-Total-Count': 'true'
            }
          }
        )

        if (matchesResponse.ok) {
          const matchesData = await matchesResponse.json()
          console.log('Pobranie danych zakończone sukcesem:', matchesData)
          setBet(matchesData)
          setTobalBets(matchesResponse.headers.get('X-Total-Count'))
        } else {
          console.error('Błąd podczas pobierania danych')
        }
      } catch (error) {
        console.error('Błąd podczas wysyłania żądania:', error)
      }
    }

    getMatches()
  }, [currentPage, selectedCompetition])

  console.log('TUTAJ SĄ MECZE DO BETOWANIA:', bet)
  console.log('TYLE JEST MECZY DO BETOWANIA:', totalBets)

  return matchList.length > 0 ? (
    <>
      <table className='schedule-table'>
        <thead>
          <tr>
            <th className='crest'></th>
            <th>Gospodarze</th>
            <th>Wynik</th>
            <th>Goście</th>
            <th className='crest'></th>
            <th>Termin</th>
          </tr>
        </thead>
        <tbody>
          {matchList.map(match => (
            <tr key={match.score.public_id}>
              <td className='crest'>
                <img width={45} src={match.home_team.crest} alt='' />
              </td>
              <td>{match.home_team.short_name}</td>
              <td>{match.score.full_time ?? 'TBD'}</td>

              <td>{match.away_team.short_name}</td>
              <td className='crest'>
                <img width={45} src={match.away_team.crest} alt='' />
              </td>
              <td>{match.utc_date.replace('T', ' ').slice(0, -3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) : (
    'Oczekiwanie na rozgrywki..'
  )
}

export default Euro2024Bet
