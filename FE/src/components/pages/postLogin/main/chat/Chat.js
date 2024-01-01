import DisplayMessages from './chatdata/DisplayMessages'
import { useAuth } from '../../../../auth/authcontext/AuthContext'

import './chat.css'

function Chat () {
  const { darkMode } = useAuth()

  return (
    <div className={`panel-side-box ${darkMode && 'darkmode-on'}`}>
      <div className='chat'>
        <DisplayMessages />
      </div>
    </div>
  )
}

export default Chat
