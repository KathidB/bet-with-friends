import { Link } from 'react-router-dom'
import headerLogo from './images/raccoon-header2.webp'
import './header.css'

function Header () {
  return (
    <header className='app-wrap'>
      <div className='header-front'>
        <div className='header-front-text'>
          <h1 className='header-h1'>
            Obstawiaj wyniki rozgrywek
            <span className='span-brand'>
              {' '}
              najpopularniejszych lig piłkarskich{' '}
            </span>
            i rywalizuj ze znajomymi!
          </h1>
          <p>
            Przewiduj wyniki meczów oraz inne wydarzenia związane z grą,
            zdobywaj punkty za trafne typy. Po zakończonych rozgrywkach
            sprawdzaj swoją punktację i zobacz, jakie miejsce zajmujesz w tabeli
            zwycięzców.
          </p>
          <Link to='/signup' className='header-front-btn'>
            Dołącz Teraz
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
            width={500}
            height={500}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
