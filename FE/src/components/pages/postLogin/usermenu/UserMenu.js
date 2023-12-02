import { Link } from 'react-router-dom'
import { useAuth } from '../../../auth/authcontext/AuthContext'
import { useUser } from '../context/UserContext'
import { useState } from 'react'

import './usermenu.css'

function UserMenu () {
  const { userProfile } = useUser()
  const [showUserMenu, setUserMenu] = useState(false)
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  const handleUserMenu = () => {
    setUserMenu(!showUserMenu)
  }

  return (
    <div className='user-menu-box'>
      <p className='user-menu-name' style={{ padding: '0 10px 0 0', fontWeight: 'bold' }}>
        {userProfile.name}
      </p>
      <img
        src={userProfile.avatar}
        alt=''
        className='user-menu-avatar'
        onClick={handleUserMenu}
      />
      <ul className={`user-menu ${showUserMenu ? 'open' : 'closed'}`}>
        <li className='panel-item'>
          <Link to='/panel/'>Panel</Link>
        </li>
        <li className='panel-item'>
          <Link to='/panel/toptypers'>Leaderboard</Link>
        </li>
        <li className='panel-item'>
          <Link to='/panel/schedule'>Terminarz</Link>
        </li>
        <li className='panel-item'>
          <Link to='/panel/profile'>Mój profil</Link>
        </li>
        <li className='panel-item'>
          <label htmlFor='darkmode'>Darkmode</label>
          <input type='checkbox' id='darkmode' />
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
