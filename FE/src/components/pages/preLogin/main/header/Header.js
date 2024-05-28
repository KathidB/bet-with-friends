import { Link } from 'react-router-dom'
import headerLogo from './images/raccoon-header2.webp'
import headerLogoMobile from './images/raccoon-header2-mobile.webp'
import './header.css'
import { useTranslation } from 'react-i18next'

function Header () {
  const { t } = useTranslation()

  return (
    <header className='app-wrap'>
      <div className='header-front'>
        <div className='header-front-text'>
          <h1 className='header-h1'>
            {t('header.top')}
            <span className='span-brand'> {t('header.mid')}</span>
            {t('header.bot')}
          </h1>
          <p>{t('header.info')}</p>
          <Link to='/signup' className='header-front-btn'>
            {t('header.cta')}
          </Link>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img
            className='header-front-logo'
            src={headerLogo}
            alt='Bet With Friends main logo'
            width={450}
            height={450}
          />

          <img
            className='header-front-logo-mobile'
            src={headerLogoMobile}
            alt='Bet With Friends main logo'
            width={250}
            height={250}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
