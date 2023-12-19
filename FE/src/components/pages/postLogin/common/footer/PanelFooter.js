import { MdOutlineAlternateEmail } from 'react-icons/md'
import { Link } from 'react-router-dom'
import './Panelfooter.css'
import { useState } from 'react'

import { FcHome } from 'react-icons/fc'
import { FcSms } from 'react-icons/fc'
import { FcCalendar } from 'react-icons/fc'
import { FcBusinessman } from 'react-icons/fc'
import { FcBullish } from 'react-icons/fc'

import DisplayMessages from '../../main/chat/chatdata/DisplayMessages'

function PanelFooter () {
  const currentYear = new Date().getFullYear()
  const [isChatVisible, setIsChatVisible] = useState(false)

  const handleShowChat = () => {
    setIsChatVisible(!isChatVisible)
  }
  console.log('hell  o')

  return (
    <>
      <p className='brand panel-footer'>
        Bet With <span className='span-brand'>Friends</span>
        <MdOutlineAlternateEmail />
        {currentYear}
      </p>

      <div className={`show-chat${isChatVisible ? ' visible' : 'visible'}`}>
        {isChatVisible && <DisplayMessages />}
      </div>

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
          <button
            onClick={handleShowChat}
            className={`footer-panel-item footer-panel-chat ${
              isChatVisible && 'btn-chat-active'
            }`}
          >
            <FcSms /> <br /> Chat
          </button>
        </li>
      </ul>
    </>
  )
}

export default PanelFooter
