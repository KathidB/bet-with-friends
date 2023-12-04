import { useEffect, useState } from 'react'
import { useUser } from '../../context/UserContext'
import MyStats from './mystats/MyStats'
import MyAchiv from './myachiv/MyAchiv'
import MyHistory from './myhistory/MyHistory'
import MyConfig from './myconfig/MyConfig'
import './myprofile.css'

function MyProfile () {
  const [avatar, setAvatar] = useState([])
  const [activeTab, setActiveTab] = useState('Statystyki')
  const { userProfile } = useUser()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://130.162.44.103:5000/api/v1/avatar',
          {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        const jsonData = await response.json()
        setAvatar(jsonData)
      } catch (error) {
        console.error('Błąd pobierania danych:', error)
      }
    }

    fetchData()
  }, [])

  const handleTabClick = tab => {
    setActiveTab(tab)
  }

  return Object.keys(avatar).length && Object.keys(userProfile).length > 0 ? (
    <section style={{ marginBottom: '30px' }} className='app-wrap'>
      <div>
        <h2 className='section-title'>
          Mój <span className='span-brand'>profil</span>{' '}
        </h2>
      </div>
      <div className='my-profile'>
        <div className='my-header'>
          <img src={userProfile.avatar} alt='' className='avatar' />
          <p className='your-name'>Witaj, {userProfile.name}</p>
        </div>
        <div className='tabs'>
          <button
            className={`tabs-btn ${
              activeTab === 'Statystyki' ? 'active-btn' : ''
            }`}
            onClick={() => handleTabClick('Statystyki')}
          >
            Statystyki
          </button>
          <button
            className={`tabs-btn ${
              activeTab === 'Osiągnięcia' ? 'active-btn' : ''
            }`}
            onClick={() => handleTabClick('Osiągnięcia')}
          >
            Osiągnięcia
          </button>
          <button
            className={`tabs-btn ${
              activeTab === 'Aktywność' ? 'active-btn' : ''
            }`}
            onClick={() => handleTabClick('Aktywność')}
          >
            Aktywność
          </button>
          <button
            className={`tabs-btn ${
              activeTab === 'Ustawienia' ? 'active-btn' : ''
            }`}
            onClick={() => handleTabClick('Ustawienia')}
          >
            Ustawienia
          </button>
        </div>

        <div className='tab-content'>
          {activeTab === 'Statystyki' && <MyStats props={userProfile} />}
          {activeTab === 'Osiągnięcia' && <MyAchiv props={userProfile} />}
          {activeTab === 'Aktywność' && <MyHistory props={userProfile} />}
          {activeTab === 'Ustawienia' && <MyConfig />}
        </div>
      </div>
    </section>
  ) : null
}

export default MyProfile
