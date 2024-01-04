import { Link } from 'react-router-dom'
import { useAuth } from '../../../../auth/authcontext/AuthContext'
import { useUser } from '../../context/UserContext'
import { useState } from 'react'
import { BiSolidMessageDetail } from 'react-icons/bi'
import NewMessages from './newmessages/NewMessages'
import './usermenu.css'

import GraphQLDataFetcher from './gglDataFetcher/GraphQLDataFetcher'

function UserMenu () {
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
      <button className='message-true' onClick={() => setShowMsg(!showMsg)}>
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
            Terminarz
          </Link>
        </li>
        <li className='panel-item'>
          <Link
            style={darkMode ? { color: 'white' } : { color: 'black' }}
            to='/panel/profile'
          >
            Mój profil
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
            Wyloguj
          </button>
        </li>
      </ul>
    </div>
  )
}

export default UserMenu
