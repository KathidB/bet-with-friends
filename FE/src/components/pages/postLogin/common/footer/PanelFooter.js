import { MdOutlineAlternateEmail } from 'react-icons/md'
import { Link } from 'react-router-dom'
import './Panelfooter.css'

import { FcHome } from 'react-icons/fc'
import { FcSms } from 'react-icons/fc'
import { FcCalendar } from 'react-icons/fc'
import { FcBusinessman } from 'react-icons/fc'
import { FcBullish } from 'react-icons/fc'

function PanelFooter () {
  const currentYear = new Date().getFullYear()
  return (
    <>
      <p className='brand panel-footer'>
        Bet With <span className='span-brand'>Friends</span>
        <MdOutlineAlternateEmail />
        {currentYear}
      </p>

      <ul className='footer-panel'>
        <li className='footer-panel-li'>
          <Link to='/panel/' className='footer-panel-item'>
            <FcHome /> <br /> Panel
          </Link>
        </li>
        <li className='footer-panel-li'>
          <Link to='/panel/toptypers' className='footer-panel-item'>
            <FcBullish /> <br /> Tabela
          </Link>
        </li>
        <li className='footer-panel-li'>
          <Link to='/panel/schedule' className='footer-panel-item'>
            <FcCalendar /> <br /> Terminarz
          </Link>
        </li>
        <li className='footer-panel-li'>
          <Link to='/panel/profile' className='footer-panel-item'>
            <FcBusinessman /> <br /> Profil
          </Link>
        </li>
        <li className='footer-panel-li'>
          <Link
            to='/panel/profile'
            className='footer-panel-item footer-panel-chat'
          >
            <FcSms /> <br /> Chat
          </Link>
        </li>
      </ul>
    </>
  )
}

export default PanelFooter
