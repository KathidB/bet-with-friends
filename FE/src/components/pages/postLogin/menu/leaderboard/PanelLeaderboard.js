import { useState, useEffect } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { BsArrowLeft } from 'react-icons/bs'
import './panelleaderboard.css'

function PanelLeaderboard () {
  const [leadersData, setLeadersData] = useState([])
  const [page, setPage] = useState(1)
  const [totalLeaders, setTotalLeaders] = useState(null)
  const [limit] = useState(10)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://130.162.44.103:5000/api/v1/ranking?page=${page}&limit=${limit}`

        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
            'X-Total-Count': 'true'
          }
        })

        // Sprawdź, czy status odpowiedzi jest OK (200)
        if (response.ok) {
          const jsonData = await response.json()
          setLeadersData(jsonData)
          setTotalLeaders(response.headers.get('X-Total-Count'))
        } else {
          // Odczytaj treść odpowiedzi jako tekst, jeśli nie jest to JSON
          const errorText = await response.text()
          console.error('Błąd pobierania danych:', errorText)
        }
      } catch (error) {
        console.error('Błąd pobierania danych:', error)
      }
    }

    fetchData()
  }, [page, limit])

  return (
    leadersData &&
    leadersData.length > 0 && (
      <section className='app-wrap'>
        <h2 className='section-title'>
          <span className='span-brand'> Leader</span>board
        </h2>

        <p className='schedule-btns'>
          <button
            className='schedule-list-btn span-brand'
            disabled={page === 1 ? true : false}
            onClick={() => setPage(prevValue => prevValue - 1)}
          >
            <BsArrowLeft />
          </button>
          <span className='schedule-btn-span'>
            Przeglądaj listę {page} / {Math.ceil(totalLeaders / limit)}
          </span>
          <button
            className='schedule-list-btn span-brand'
            onClick={() => setPage(prevValue => prevValue + 1)}
            // total matches np. 16 przez 10 daje 1.6 i Ceil robi 2.
            disabled={page === Math.ceil(totalLeaders / limit)}
          >
            <BsArrowRight />
          </button>
        </p>
        <table className='panel-leader-table'>
          <thead>
            <tr>
              <th className='th-place'>Miejsce</th>
              <th>Nick</th>
              <th className='th-hide'>Avatar</th>
              <th>Punkty</th>
              <th>Bety</th>
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
                  />
                </td>
                <td>{leader.points}</td>
                <td>{leader.rating.bets}</td>
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
export default PanelLeaderboard
