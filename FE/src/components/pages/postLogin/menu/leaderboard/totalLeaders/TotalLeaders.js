import { useState, useEffect } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { BsArrowLeft } from 'react-icons/bs'
import '../panelleaderboard.css'
import { useAuth } from '../../../../../auth/authcontext/AuthContext'

import { FaArrowDown } from 'react-icons/fa'
import { FaArrowUp } from 'react-icons/fa'
import { FaArrowDownUpAcrossLine } from 'react-icons/fa6'

function TotalLeaders () {
  const [leadersData, setLeadersData] = useState([])
  const [page, setPage] = useState(1)
  const [totalLeaders, setTotalLeaders] = useState(null)
  const [limit] = useState(6)
  const { ipMan } = useAuth()

  // MAIN API FOR TOTAL LEADERBOARD!
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://${ipMan}:5000/api/v1/ranking?page=${page}&limit=${limit}`

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
          setLeadersData(jsonData)
          setTotalLeaders(response.headers.get('X-Total-Count'))
        } else {
          const errorText = await response.text()
          console.error('Error fetching data:', errorText)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [page, limit, ipMan])

  return (
    leadersData &&
    leadersData.length > 0 && (
      <section className='app-wrap'>
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
              <tr
                key={leader.public_id}
                className={`top-panel-player ${
                  leader.ranking.place <= 3 ? 'top-players' : ''
                }`}
              >
                <td className={`th-place`}>
                  {leader.ranking.place}
                  {` `}

                  <span style={{ color: 'green' }}>
                    {leader.ranking.tendency === 2 && <FaArrowUp />}
                  </span>
                  <span style={{ color: 'red' }}>
                    {leader.ranking.tendency === 1 && <FaArrowDown />}
                  </span>
                  <span style={{ color: 'gray' }}>
                    {leader.ranking.tendency === 0 && (
                      <FaArrowDownUpAcrossLine />
                    )}
                  </span>
                </td>
                <td className='leader-name'>{leader.name}</td>
                <td className='th-hide'>
                  <img
                    className={`${
                      leader.ranking.place <= 3 ? 'top-avatar' : ''
                    }`}
                    src={`http://130.162.44.103:5000/api/v1/avatar/${leader.avatar}`}
                    alt=''
                  />
                </td>
                <td>{leader.points}</td>
                <td>{leader.rating.bets}</td>
                <td>{leader.rating.wins}</td>
                <td className='th-hide'>{leader.rating.rating} %</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* /// MOBILE */}

        <table className='panel-leader-mobile'>
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            {leadersData.map(leader => (
              <tr
                key={leader.public_id}
                className={`top-panel-player ${
                  leader.ranking.place <= 3 ? 'top-players' : ''
                }`}
              >
                <td className='leader-stats-box'>
                  <div className='top-leader-box'>
                    <span className='leader-place top-leader-box-item'>
                      {leader.ranking.place}
                    </span>

                    {leader.ranking.tendency === 2 && (
                      <span style={{ color: 'green' }}>
                        <FaArrowUp />
                      </span>
                    )}

                    {leader.ranking.tendency === 1 && (
                      <span style={{ color: 'red' }}>
                        <FaArrowDown />
                      </span>
                    )}

                    {leader.ranking.tendency === 0 && (
                      <span style={{ color: 'gray' }}>
                        <FaArrowDownUpAcrossLine />
                      </span>
                    )}

                    <p className='top-leader-box-item'> {leader.name} </p>
                    <img
                      className={` top-leader-box-item leader-box-img ${
                        leader.ranking.place <= 3 ? 'top-avatar' : ''
                      }`}
                      src={`http://130.162.44.103:5000/api/v1/avatar/${leader.avatar}`}
                      alt=''
                      width={40}
                    />
                  </div>
                  <div className='leader-stats'>
                    <p>
                      Punkty
                      <br /> {leader.points}
                    </p>
                    <p>
                      Bety <br />
                      {leader.rating.bets}
                    </p>
                    <p>
                      Winy <br />
                      {leader.rating.wins}
                    </p>
                    <p>
                      Rating <br />
                      {leader.rating.rating} %
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    )
  )
}
export default TotalLeaders
