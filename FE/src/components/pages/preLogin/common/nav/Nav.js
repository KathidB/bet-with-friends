import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import hamOpen from '../../../../../assets/images/hamburger/hamOpen.svg'
import hamClose from '../../../../../assets/images/hamburger/hamClose.svg'
import './nav.css'
import { useAuth } from '../../../../auth/authcontext/AuthContext'
import { useTranslation } from 'react-i18next'

function Nav () {
  const { t, i18n } = useTranslation()

  const [open, setOpen] = useState(false)
  const { loggedIn } = useAuth()
  const navigate = useNavigate()

  const hamburgerMenu = () => {
    setOpen(!open)
  }

  const handleLoginClick = () => {
    if (loggedIn) {
      navigate('/panel')
    }
    setOpen(false)
  }

  const changeLanguage = language => {
    i18n.changeLanguage(language)
  }

  return (
    <nav className='app-wrap nav-box'>
      <Link to='/' className='brand front-brand-logo'>
        Bet With <span className='span-brand'>Friends</span>
      </Link>

      <select
        aria-label='Language change'
        className='lang-btn'
        value={i18n.language}
        onChange={e => changeLanguage(e.target.value)}
      >
        <option value='en'>EN</option>
        <option value='pl'>PL</option>
      </select>

      <ul
        className={`nav-front ${
          open ? 'hamburger-display-flex' : 'hamburger-display-none'
        }`}
        onClick={hamburgerMenu}
      >
        <li>
          <NavLink className='nav-menu-item' to='/'>
            {t('nav.home')}
          </NavLink>
        </li>
        <li>
          <NavLink className='nav-menu-item' to='/matches'>
            {t('nav.matches')}
          </NavLink>
        </li>
        <li>
          <NavLink className='nav-menu-item' to='/leaderboard'>
            {t('nav.leaderboard')}
          </NavLink>
        </li>
        <li>
          <NavLink className='nav-menu-item' to='/about'>
            {t('nav.about')}
          </NavLink>
        </li>
        <li onClick={handleLoginClick}>
          <NavLink className='nav-menu-item nav-front-login-btn' to='/login'>
            {t('nav.login')}
          </NavLink>
        </li>
        <li>
          <NavLink to='/signup' className='nav-front-signup-btn '>
            {t('nav.signup')}
          </NavLink>
        </li>
      </ul>

      <button
        style={{ background: 'none', border: 'none' }}
        className='hamburger-btn'
        onClick={hamburgerMenu}
      >
        {open === false ? (
          <img
            width={60}
            height={60}
            src={hamOpen}
            alt='open hamburger menu icon'
          />
        ) : (
          <img
            width={60}
            height={60}
            src={hamClose}
            alt='close hamburger menu icon'
          />
        )}
      </button>
    </nav>
  )
}

export default Nav
