import { Link } from 'react-router-dom'
import { useAuth } from '../../../../auth/authcontext/AuthContext'
import { useUser } from '../../context/UserContext'
import { useState } from 'react'
import { BiSolidMessageDetail } from 'react-icons/bi'
import NewMessages from './newmessages/NewMessages'
import './usermenu.css'
import { useTranslation } from 'react-i18next'

import GraphQLDataFetcher from './gglDataFetcher/GraphQLDataFetcher'

function UserMenu () {
  const { t, i18n } = useTranslation()

  const { data } = GraphQLDataFetcher()
  const { userProfile } = useUser()
  const [showUserMenu, setUserMenu] = useState(false)
  const { logout, darkMode, handleDarkMode } = useAuth()
  const [showMsg, setShowMsg] = useState(false)

  const systemInfo = data?.getSystemInfo || []

  const filteredMessages = systemInfo.filter(message => {
    return message.status === false
  })

  const filteredMessagesLength = filteredMessages.length

  const handleLogout = () => {
    logout()
  }

  const handleUserMenu = () => {
    setUserMenu(!showUserMenu)
  }

  const changeLanguage = language => {
    i18n.changeLanguage(language)
  }

  return (
    <div className='user-menu-box'>
      <p
        className='user-menu-name'
        style={{ padding: '0 10px 0 0', fontWeight: 'bold' }}
      >
        {userProfile.name}
      </p>

      {/* // INFO O NOWEJ WIADOMOŚĆI  */}

      {filteredMessagesLength > 0 ? (
        <span className='span-true'>{filteredMessagesLength}!</span>
      ) : null}
      <button
        className='message-true'
        aria-label='New notifications button'
        onClick={() => setShowMsg(!showMsg)}
      >
        <BiSolidMessageDetail
          className={`message-none ${
            filteredMessagesLength <= 0 ? 'message-none' : 'message-true'
          }`}
        />
      </button>

      {showMsg && filteredMessagesLength > 0 && <NewMessages />}

      <img
        src={userProfile.avatar}
        alt=''
        className='user-menu-avatar'
        onClick={handleUserMenu}
      />

      <ul
        className={`user-menu ${showUserMenu ? 'open' : 'closed'} 
        ${darkMode ? 'darkmode-on' : ''}        
        `}
        onClick={handleUserMenu}
      >
        <li className='panel-item'>
          <Link
            style={darkMode ? { color: 'white' } : { color: 'black' }}
            to='/panel/'
          >
            Panel
          </Link>
        </li>
        <li className='panel-item'>
          <Link
            style={darkMode ? { color: 'white' } : { color: 'black' }}
            to='/panel/toptypers'
          >
            Leaderboard
          </Link>
        </li>
        <li className='panel-item'>
          <Link
            style={darkMode ? { color: 'white' } : { color: 'black' }}
            to='/panel/schedule'
          >
            {t('panelFooter.schedule')}
          </Link>
        </li>

        <li className='panel-item'>
          <label>
            <input
              type='radio'
              value='en'
              checked={i18n.language === 'en'}
              onChange={e => changeLanguage(e.target.value)}
            />
            ENG
          </label>
          <label>
            <input
              type='radio'
              value='pl'
              checked={i18n.language === 'pl'}
              onChange={e => changeLanguage(e.target.value)}
            />
            PL
          </label>
        </li>

        <li className='panel-item'>
          <Link
            style={darkMode ? { color: 'white' } : { color: 'black' }}
            to='/panel/profile'
          >
            {t('panelUM.MP')}
          </Link>
        </li>

        <li className='panel-item darkmode-input darkmode'>
          <input
            type='checkbox'
            id='toggle'
            checked={darkMode}
            onChange={handleDarkMode}
          />
          <label htmlFor='toggle' className='daylight'></label>
        </li>

        <li className='panel-item'>
          <button className='panel-logout-btn' onClick={handleLogout}>
            {t('panelUM.logout')}
          </button>
        </li>
      </ul>
    </div>
  )
}

export default UserMenu
