import { useUser } from '../../context/UserContext'
import { useAuth } from '../../../../auth/authcontext/AuthContext'

import './yourprofile.css'

function YourProfile () {
  const { userProfile } = useUser()
  const { darkMode } = useAuth()

  return Object.keys(userProfile).length > 0 ? (
    <div className={`panel-side-box ${darkMode && 'darkmode-on'}`}>
      <h2 className='panel-header'>
        Twój <span className='span-brand'>Profil</span>
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
        <p>Punkty: {userProfile.points}</p>
        <p>Trafienia: {userProfile.rating.wins}</p>
        <p>Rating: {userProfile.rating.rating}%</p>
      </div>
    </div>
  ) : (
    'Loading...'
  )
}

export default YourProfile
