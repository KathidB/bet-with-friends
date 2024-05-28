import { Link } from 'react-router-dom'
import footerLogo from './images/footer-logo.webp'
import { ScrollToTop } from '../../../../utilities/ScrollToTop'
import { MdOutlineAlternateEmail } from 'react-icons/md'
import './footer.css'
import { useTranslation } from 'react-i18next'

function Footer () {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className='front-footer'>
      <div className='app-wrap'>
        <div className='footer-front-box footer-front-text '>
          <div className='footer-front-item'>
            <Link
              to='/'
              onClick={ScrollToTop}
              className='brand footer-brand footer-top-brand'
            >
              Bet With <span className='span-brand'>Friends</span>
            </Link>
            <p>{t('footer.desc')}</p>
          </div>

          <div className='footer-front-item '>
            <p style={{ fontSize: '24px' }}> {t('footer.nav')}</p>
            <ul className='footer-front-nav'>
              <li>
                <Link className='footer-menu-item' to='/' onClick={ScrollToTop}>
                  {t('footer.home')}
                </Link>
              </li>
              <li>
                <Link
                  className='footer-menu-item'
                  to='/matches'
                  onClick={ScrollToTop}
                >
                  {t('footer.matches')}
                </Link>
              </li>
              <li>
                <Link
                  className='footer-menu-item'
                  to='/leaderboard'
                  onClick={ScrollToTop}
                >
                  {t('footer.leaderboard')}
                </Link>
              </li>
              <li>
                <Link
                  className='footer-menu-item'
                  to='/about'
                  onClick={ScrollToTop}
                >
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link
                  className='footer-menu-item'
                  to='/login'
                  onClick={ScrollToTop}
                >
                  {t('footer.login')}
                </Link>
              </li>
              <li>
                <Link
                  className='footer-menu-item'
                  to='/signup'
                  onClick={ScrollToTop}
                >
                  {t('footer.signup')}
                </Link>
              </li>
            </ul>
          </div>

          <img
            className='footer-front-item footer-front-img'
            src={footerLogo}
            width={250}
            height={250}
            alt=''
          />
        </div>

        <hr />

        <p className='brand footer-brand footer-bot-brand'>
          Bet With <span className='span-brand'>Friends</span>{' '}
          <MdOutlineAlternateEmail />
          {currentYear}
        </p>
      </div>
    </footer>
  )
}

export default Footer
