import { useState, useEffect } from 'react'
import './leaderboards.css'
import { useTranslation } from 'react-i18next'

function Leaderboard () {
  const { t } = useTranslation()
  const [leadersData, setLeadersData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://4.184.219.209:5000/api/v1/ranking',
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
          <span className='span-brand'> {t('leaderboard.headerA')}</span>
          {t('leaderboard.headerB')}
        </h2>
        <p className='table-caption'>{t('leaderboard.info')}</p>
        <table className='leaderboard-table  '>
          <thead>
            <tr>
              <th className='th-place'>{t('leaderboard.place')}</th>
              <th>{t('leaderboard.nick')}</th>
              <th className='th-hide'>{t('leaderboard.avatar')}</th>
              <th>{t('leaderboard.points')}</th>
              <th className='th-hide'>{t('leaderboard.bets')}</th>
              <th>{t('leaderboard.wins')}</th>
              <th className='th-hide'>{t('leaderboard.rating')}</th>
            </tr>
          </thead>
          <tbody>
            {leadersData.map(leader => (
              <tr key={leader.public_id}>
                <td className='th-place'>{leader.ranking.place}</td>
                <td className='leader-name'>{leader.name}</td>
                <td className='th-hide'>
                  <img
                    src={`http://4.184.219.209:5000/api/v1/avatar/${leader.avatar}`}
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
