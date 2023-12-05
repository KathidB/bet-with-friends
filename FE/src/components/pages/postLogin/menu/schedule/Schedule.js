import React, { useEffect, useState } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { BsArrowLeft } from 'react-icons/bs'
import './schedule.css'
function Schedule () {
  const [matchList, setMatchList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalMatches, setTotalMatches] = useState(null)
  const limit = 10
  const competitionId = '2001' // Zastąp wartość swoim id typu meczy

  // Przy meczach EURO przebudowa komponentu na paginacje pomiedzy zawodami.
  useEffect(() => {
    const getMatches = async () => {
      try {
        // 2001 - CL
        // 2018 - euro
        const matchesResponse = await fetch(
          `http://130.162.44.103:5000/api/v1/matches?competetition=${competitionId}&page=${currentPage}&limit=${limit}`,

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
          setMatchList(matchesData)

          setTotalMatches(matchesResponse.headers.get('X-Total-Count'))
        } else {
          console.error('Błąd podczas pobierania danych')
        }
      } catch (error) {
        console.error('Błąd podczas wysyłania żądania:', error)
      }
    }

    getMatches()
  }, [currentPage])

  return Object.keys(matchList).length > 0 ? (
    <section>
      <div className='schedule'>
        <h2 className='panel-header'>
          Terminarz <span className='span-brand'>rozgrywek</span>
        </h2>

        <p className='competition-name'>{matchList[0].competition.name}</p>
        <p className='schedule-btns'>
          <button
            className='schedule-list-btn span-brand'
            disabled={currentPage === 1 ? true : false}
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
            // total matches np. 16 przez 10 daje 1.6 i Ceil robi 2.
            disabled={currentPage === Math.ceil(totalMatches / limit)}
          >
            <BsArrowRight />
          </button>
        </p>
        <table className='schedule-table'>
          <thead>
            <tr>
              <th className='crest'></th>
              <th>Drużyna domowa</th>
              <th>Wynik</th>
              <th>Drużyna wyjazdowa</th>
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
      </div>
    </section>
  ) : (
    'Data pending...'
  )
}

export default Schedule
