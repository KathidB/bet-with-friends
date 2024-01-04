import { Link } from 'react-router-dom'
import UserMenu from '../usermenu/UserMenu'
import { useAuth } from '../../../../auth/authcontext/AuthContext'
import './panelnav.css'

function PanelNav () {
  const { darkMode } = useAuth()

  return (
    <>
      <nav className={`nav-panel ${darkMode && 'darkmode-on'}`}>
        <div className='nav-panel-box'>
          <Link
            style={darkMode ? { color: 'white' } : { color: 'black' }}
            to='/panel/'
            className='brand front-brand-logo'
          >
            Bet With <span className='span-brand'>Friends</span>
          </Link>

          <hr
            className='border'
            style={
              !darkMode
                ? { backgroundColor: 'silver' }
                : { backgroundColor: 'transparent' }
            }
          />

          <ul className='panel-menu'>
            <li className='panel-item'>
              <Link
                to='/panel/'
                style={darkMode ? { color: 'white' } : { color: 'black' }}
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
                Profil
              </Link>
            </li>
          </ul>
        </div>
        <UserMenu />
      </nav>
    </>
  )
}

export default PanelNav
