import React, { useState } from 'react'
import Euro2024 from './euro2024/Euro2024'
import ChampionsLeague from './CL/ChampionsLeague'
import './grouplist.css'

function YourComponent () {
  const [activeTab, setActiveTab] = useState('Euro2024')

  const handleTabClick = tab => {
    setActiveTab(tab)
  }

  return (
    <div className='panel-side-box'>
      <div className='tabs'>
        <button
          className={`tabs-btn ${activeTab === 'Euro2024' ? 'active-btn' : ''}`}
          onClick={() => handleTabClick('Euro2024')}
        >
          Euro 2024
        </button>
        <button
          className={`tabs-btn ${
            activeTab === 'ChampionsLeague' ? 'active-btn' : ''
          }`}
          onClick={() => handleTabClick('ChampionsLeague')}
        >
          Liga Mistrzów
        </button>
      </div>

      <div className='competition-groups'>
        {activeTab === 'Euro2024' ? <Euro2024 /> : <ChampionsLeague />}
      </div>
    </div>
  )
}

export default YourComponent
