import DisplayLocations from './chatdata/DisplayMessages'
import './chat.css'

function Chat () {
  return (
    <div className='panel-side-box'>
      <div className='chat'>
        <DisplayLocations />
      </div>
    </div>
  )
}

export default Chat
