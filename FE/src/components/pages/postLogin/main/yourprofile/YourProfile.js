import { useUser } from '../../context/UserContext'
import { useAuth } from '../../../../auth/authcontext/AuthContext'
import { useTranslation } from 'react-i18next'

import './yourprofile.css'

function YourProfile () {
  const { userProfile } = useUser()
  const { darkMode } = useAuth()
  const { t } = useTranslation()

  return Object.keys(userProfile).length > 0 ? (
    <div className={`panel-side-box ${darkMode && 'darkmode-on'}`}>
      <h2 className='panel-header'>
        {t('panelTopTyper.your')}{' '}
        <span className='span-brand'>{t('panelTopTyper.profile')}</span>
      </h2>
      <div className='your-profile'>
        <img
          src={userProfile.avatar}
          alt=''
          className={`avatar ${
            userProfile.ranking.place <= 3 ? 'top-typer-avatar' : null
          } `}
          height={110}
          width={110}
        />
        <p className='your-name'>{userProfile.name}</p>
        <p>
          {t('panelTopTyper.points')}: {userProfile.points}
        </p>
        <p>
          {t('panelTopTyper.wins')}: {userProfile.rating.wins}
        </p>
        <p>
          {t('panelTopTyper.rating')}: {userProfile.rating.rating}%
        </p>
      </div>
    </div>
  ) : (
    'Loading...'
  )
}

export default YourProfile
