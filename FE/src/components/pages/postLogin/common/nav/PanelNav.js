import { Link } from 'react-router-dom'
import UserMenu from '../usermenu/UserMenu'
import { useAuth } from '../../../../auth/authcontext/AuthContext'
import './panelnav.css'
// import RakunLogo from './images/raccoonlogo.png'
import { useTranslation } from 'react-i18next'

function PanelNav () {
  const { darkMode } = useAuth()
  const { t } = useTranslation()

  return (
    <>
      <nav className={`nav-panel ${darkMode && 'darkmode-on'}`}>
        <div className='nav-panel-box'>
          <Link
            style={darkMode ? { color: 'white' } : { color: 'black' }}
            to='/panel/'
            className='brand front-brand-logo'
          >
            <span className='showOnMobile'>
              BW<span className='span-brand'>F</span>
            </span>
            <span className='showOnDesktop'>
              Bet With <span className='span-brand'>Friends</span>
            </span>

            {/* <img
              src={RakunLogo}
              width={80}
              height={80}
              style={{ marginTop: '10px' }}
            /> */}
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
                {t('panelNav.typing')}
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
              <Link
                style={darkMode ? { color: 'white' } : { color: 'black' }}
                to='/panel/profile'
              >
                {t('panelFooter.profile')}
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
