import { FcGlobe } from 'react-icons/fc'
import { FcRating } from 'react-icons/fc'
import { FcInspection } from 'react-icons/fc'
import { FcSalesPerformance } from 'react-icons/fc'
import { FcBullish } from 'react-icons/fc'
import { useAuth } from '../../../../../auth/authcontext/AuthContext'
import { useTranslation } from 'react-i18next'

import './mystats.css'
function MyStats (props) {
  const { t } = useTranslation()
  const userStats = props.props
  const { darkMode } = useAuth()

  return (
    <section>
      <div className='stats-box'>
        <p>{t('panelTopTyper.stats')}:</p>
        <div className='tab-stats'>
          <p className='stats-item'>
            <FcGlobe /> {t('panelTopTyper.place')} <br />{' '}
            <span>{userStats.ranking.place} </span>{' '}
          </p>
          <p className='stats-item'>
            <FcBullish /> {t('panelTopTyper.points')} <br />{' '}
            <span>{userStats.points}</span>
          </p>
          <p className='stats-item'>
            <FcSalesPerformance /> {t('panelTopTyper.bets')} <br />{' '}
            <span> {userStats.rating.bets}</span>
          </p>
          <p className='stats-item'>
            <FcInspection /> {t('panelTopTyper.wins')} <br />{' '}
            <span>{userStats.rating.wins}</span>
          </p>

          <p className={`stats-item ${darkMode && 'darkmode-on'}`}>
            <FcRating /> {t('panelTopTyper.rating')}
            <br />
            <span className='stats-item-chart'>{userStats.rating.rating}</span>%
          </p>
        </div>

        <p>{t('panelTopTyper.statsL')}:</p>
        <div className='tab-stats'>
          <ul className='tab-stats-ul'>
            {userStats.ranking_competetition.map(userComp => (
              <li
                className='tab-stats-item'
                key={userComp.competetition.public_id}
              >
                <div className='tab-stats-comp'>
                  <img
                    src={userComp.competetition.emblem}
                    alt='competition eblem'
                    width={30}
                    height={30}
                    style={{ backgroundColor: 'white' }}
                  />
                  <p>{userComp.competetition.name}</p>
                </div>
                <div className='tab-stats-span'>
                  <span>
                    {t('panelTopTyper.place')}: {` `}
                    {userComp.place}
                  </span>
                  <span>
                    {t('panelTopTyper.points')}: {` `}
                    {userComp.points}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default MyStats
