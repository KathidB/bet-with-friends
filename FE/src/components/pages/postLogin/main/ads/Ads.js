import patopoker from './images/patopokers.webp'
import { useAuth } from '../../../../auth/authcontext/AuthContext'

import './ads.css'

function Ads () {
  const { darkMode } = useAuth()

  return (
    <div className={`panel-side-box ${darkMode && 'darkmode-on'}`}>
      <h2 className='panel-header'>
        Twoja <span className='span-brand'>Reklama</span>
      </h2>
      <div className='adding-box'>
        <a href='https://youtu.be/NSk27elArTI?si=PL3xd-tZMm6MSja8'>
          <img className='patopoker' src={patopoker} alt='Pato Poker Game' />
        </a>
      </div>
    </div>
  )
}

export default Ads
