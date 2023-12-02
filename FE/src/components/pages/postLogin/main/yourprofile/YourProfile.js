import { useUser } from '../../context/UserContext'

import './yourprofile.css'

function YourProfile () {
  const { userProfile } = useUser()

  if (!userProfile || !userProfile.rating) {
    // Możesz tutaj wyświetlić np. ładowanie, jeśli dane są jeszcze pobierane
    return <div>Loading...</div>
  }

  console.log(userProfile)

  return (
    <div className='panel-side-box'>
      <h2 className='panel-header'>
        Twój <span className='span-brand'>Profil</span>
        <div className='your-profile'>
          <img
            src={userProfile.avatar}
            alt=''
            className='avatar top-typer-avatar'
            height={110}
            width={110}
          />
          <p>{userProfile.name}</p>
          <p>Punkty: {userProfile.points}</p>
          <p>Trafienia: {userProfile.rating.wins}</p>
          <p>Pozycja: {userProfile.ranking.place}</p>
          <button>Twój profil</button>
        </div>
      </h2>
    </div>
  )
}

export default YourProfile