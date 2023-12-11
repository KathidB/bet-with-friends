import { Link } from 'react-router-dom'
import { useUser } from '../../context/UserContext'

import './yourprofile.css'

function YourProfile () {
  const { userProfile } = useUser()

  return Object.keys(userProfile).length > 0 ? (
    <div className='panel-side-box'>
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
        <p>Pozycja: {userProfile.ranking.place}</p>
        <Link to='/panel/profile' className='your-profile-btn'>
          Profil
        </Link>
      </div>
    </div>
  ) : (
    'Loading...'
  )
}

export default YourProfile
