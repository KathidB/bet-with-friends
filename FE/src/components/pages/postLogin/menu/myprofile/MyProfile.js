import { useState } from 'react'
import { useUser } from '../../context/UserContext'
import MyStats from './mystats/MyStats'
import MyAchiv from './myachiv/MyAchiv'
import MyHistory from './myhistory/MyHistory'
import MyConfig from './myconfig/MyConfig'
import './myprofile.css'

function MyProfile () {
  const { userProfile } = useUser()
  const [activeTab, setActiveTab] = useState('Statystyki')

  const handleTabClick = tab => {
    setActiveTab(tab)
  }

  return Object.keys(userProfile).length > 0 ? (
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
