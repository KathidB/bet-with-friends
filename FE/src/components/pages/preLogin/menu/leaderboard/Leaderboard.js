import { useState, useEffect } from 'react'
import './leaderboards.css'

function Leaderboard () {
  const [leadersData, setLeadersData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://130.162.44.103:5000/api/v1/ranking',
          {
            method: 'GET', // Metoda GET
            headers: {
              'Content-Type': 'application/json' // Opcjonalne, ustawienia nagłówka z typem treści
            }
          }
        )

        const jsonData = await response.json()
        setLeadersData(jsonData)
      } catch (error) {
        console.error('Błąd pobierania danych:', error)
      }
    }

    fetchData()
  }, [])

  return (
    leadersData &&
    leadersData.length > 0 && (
      <section className='app-wrap'>
        <h2 className='section-title'>
          <span className='span-brand'> Leader</span>board
        </h2>
        <p className='table-caption'>
          W sekcji "Top 5 Typerów Piłki Nożnej" prezentujemy najskuteczniejszych
          graczy w naszej społeczności. Tabela zawiera kluczowe statystyki,
          takie jak zdobyte punkty, skuteczność, ilość wygranych oraz ogólna
          ocena. To doskonała okazja, aby sprawdzić swoje umiejętności w
          typowaniu wyników i konkurować z innymi fanami piłki nożnej. Dołącz
          już dziś i poczuj emocje rywalizacji!
        </p>
        <table className='leaderboard-table  '>
          <thead>
            <tr>
              <th className='th-place'>Miejsce</th>
              <th>Nick</th>
              <th className='th-hide'>Avatar</th>
              <th>Punkty</th>
              <th className='th-hide'>Bety</th>
              <th>Winy</th>
              <th className='th-hide'>Rating</th>
            </tr>
          </thead>
          <tbody>
            {leadersData.map(leader => (
              <tr key={leader.public_id}>
                <td className='th-place'>{leader.ranking.place}</td>
                <td className='leader-name'>{leader.name}</td>
                <td className='th-hide'>
                  <img
                    src={`http://130.162.44.103:5000/api/v1/avatar/${leader.avatar}`}
                    alt=''
                    className='avatar'
                  />
                </td>
                <td>{leader.points}</td>
                <td className='th-hide'>{leader.rating.bets}</td>
                <td>{leader.rating.wins}</td>
                <td className='th-hide'>{leader.rating.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    )
  )
}

export default Leaderboard
